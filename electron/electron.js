import {app, BrowserWindow,screen} from 'electron';
import MenuBuilder from './menu';
import installExtension,{REACT_DEVELOPER_TOOLS,REDUX_DEVTOOLS} from 'electron-devtools-installer';

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)

// To avoid being garbage collected
let mainWindow;
let WINDOW_WIDTH = 1020
let WINDOW_HEIGHT = 600


const installExtensions = async () => {
  const extensions = [
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
  ];

  return Promise
  .all(extensions.map(name => installExtension(name)))
  .catch(console.log)
};


app.on('ready', async () => {

  if (process.env.NODE_ENV === 'development') {
    await installExtensions();
  }


  let bounds = screen.getPrimaryDisplay().bounds;
  let x = bounds.x + ((bounds.width - WINDOW_WIDTH) / 2);
  let y = bounds.y + ((bounds.height - WINDOW_HEIGHT) / 2);


  let mainWindow = new BrowserWindow({
    show: false,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    frame: false,
    minWidth: 500,
    minHeight: 700,
    x: x,
    y: y,
    backgroundColor: '#1D212D'})

    mainWindow.loadURL(`http://localhost:3000/`)


    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
      mainWindow.focus();
    });



    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

  })
