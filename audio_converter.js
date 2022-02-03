var ffmpeg = require("fluent-ffmpeg");
const path = require("path");

function isWavFile(filePath) {
  return path.extname(filePath) === ".wav";
}

module.exports.convertWavToMp3 = function convertWavToMp3(filePath) {
  if (!isWavFile(filePath)) {
    throw new Error(`Not a wav file`);
  }

  const outputFile = filePath.replace(".wav", ".mp3");

  ffmpeg({
    source: filePath,
  })
    .on("error", (err) => {
      console.log('converter error: ' + err);
      throw err
    })
    .on("end", () => {
      console.log('file converted: ' + outputFile);
    })
    .save(outputFile);
};
