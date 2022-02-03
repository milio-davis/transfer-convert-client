const Observer = require("./watcher");
const NetClient = require("./ownsender");
const userInput = require("./user_input")

const {directory, port, host} = gatherConstants()

// start directory observer
var observer = new Observer(directory);

// start netClient TCP sender
var netClient = new NetClient(port, host)

// event received when file is added
observer.on("file-added", (filePath, fileSize) => {
  console.log(
    `[${new Date().toLocaleString()}] ${filePath} has been created. [Size: ${fileSize}]`
  );

  // send file via TCP to LAN server
  console.log("starting transfer process");
  netClient.sendFile(filePath, fileSize);
});

observer.watchFolder(directory);

function gatherConstants() {
  let directory = userInput.question("specify input directory to watch: ")

  let port = userInput.question("specify port ['default' = 8000]: ")
  if (port === 'default') port = 8000;

  let host = userInput.question("specify host LAN IP number: ")

  console.log('input closed \n ---------')
  return {directory, port, host}
}