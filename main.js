let electron =  require('electron');
let path = require('path');


// To avoid being garbage collected
let mainWindow;
let WINDOW_WIDTH = 1020
let WINDOW_HEIGHT = 600

electron.app.on('ready', async () => {

  let bounds = electron.screen.getPrimaryDisplay().bounds;
  let x = bounds.x + ((bounds.width - WINDOW_WIDTH) / 2);
  let y = bounds.y + ((bounds.height - WINDOW_HEIGHT) / 2);


  let mainWindow = new electron.BrowserWindow({
    show: false,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    frame: false,
    minWidth: 987,
    minHeight: 700,
    x: x,
    y: y,
    backgroundColor: '#1D212D'})

    let p = path.join(__dirname, '/dist/index.html');
    mainWindow.loadURL(`file://${p}`)


    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
      mainWindow.focus();
    });



    mainWindow.on('closed', () => {
      mainWindow = null;
    });


  })
