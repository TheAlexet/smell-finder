const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const child_process = require('child_process');

function createWindow () {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon:'./src/assets/logo.png',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule:true,
      contextIsolation: false
    }
  })
  win.removeMenu()
  win.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('run-script', (event, args) => {
  const scriptName = args[0]
  let scriptArgs = args
  scriptArgs.shift()
  runScript('python ./src/scripts/' + scriptName, scriptArgs, null)
})

function runScript(command, args, callback) {
  var child = child_process.spawn(command, args, {
      encoding: 'utf8',
      shell: true
  });
  child.on('error', (error) => {
      dialog.showMessageBox({
          title: 'Title',
          type: 'warning',
          message: 'Error occured.\r\n' + error
      });
  });

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (data) => {
      data=data.toString();   
      console.log(data);      
  });

  /*child.stderr.setEncoding('utf8');
  child.stderr.on('data', (data) => {
      mainWindow.webContents.send('mainprocess-response', data);
      console.log(data);  
  });*/

  if (typeof callback === 'function')
      callback();
}