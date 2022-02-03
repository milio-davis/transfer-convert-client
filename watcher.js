const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;
const fsExtra = require('fs-extra');

const nowDateTime = new Date()

class Observer extends EventEmitter {
  
  constructor(folder) {
    super();
    this.folder = folder; // folder watch filePath
  }

  watchFolder() {
    try {      
      var watcher = chokidar.watch(this.folder);
      console.log(`[${new Date().toLocaleString()}] Watching for folder changes on: ${this.folder}`);

      watcher
        .on('add', async (filePath, stats) => {
          //file creation time
          const statsTime = new Date(stats.birthtime)
          
          //ignore old files in folder
          if (statsTime > nowDateTime) {
            // emit an event when new file has been added
            this.emit('file-added', filePath, stats.size);
          }
        
        })
        .on('error', error => log(`Watcher error: ${error}`))
        .on('unlink', async filePath => console.log(filePath + ' erased')) // erased file
        .on('change', async filePath => console.log(filePath + ' modified'))
      
    } catch (error) {
      console.log('Catched error: ' + error);
    }

  }

}

module.exports = Observer;