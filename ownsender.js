const net = require("net");
const fs = require("fs");

class NetClient {
  constructor(port, host) {
    this.port = port;
    this.host = host;
  }

  sendFile(filePath, fileSize) {
    const fileName = filePath.split("\\").pop().split("/").pop();

    console.log(`sending file [${fileName}] to server`);

    console.log(`server log: file size: ${fileSize} bytes`);

    const socket = net.createConnection(this.port, this.host, () => {
      console.log("client connected to server");

      let fileNameObject = {
        fileName: fileName,
      };

      socket.write(`${JSON.stringify(fileNameObject)}`, 'utf8');
      socket.pause();      

      let stream = fs.createReadStream(filePath);
      stream.on("error", (err) => {
        console.log("stream err: " + err);
      });
      stream.on("open", () => {
        console.log("start streaming file to server");
      });
      stream.on("data", (data) => {
        socket.resume();
        socket.write(data);
      });
      stream.on("close", () => {
        console.log("data transfer complete");
        socket.end();
      });
    });

    socket.on("close", () => {
      console.log("socket closing \n-----");
    });
    socket.on("error", (err) => {
      console.log(" sock err :" + err);
    });
  }
};

module.exports = NetClient;