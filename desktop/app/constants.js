console.log(process.env)
const Constants = {
  settings: {
    appName: 'Andrews Admin',
    appUrl: 'https://opol-fred.mybluemix.net/#/auth/signin', // without trailing slash!
    nodeIntegrationEnabled: false, // keep disabled unless you run into ipcRenderer-specific troubles
    enableDevMenu: false, // enable for dev-builds only!
    userAgentPostfixWindows: 'WindowsApp', // custom user agent postfixes to distinguish traffic in Analytics
    userAgentPostfixOSX: 'MacOSXApp',
    userAgentPostfixLinux: 'LinuxApp',
    showLoader: false, // show src/loader.html window until your app is fully loaded - may increase loading time
    themeColor: '#41b883',
    windowBackgroundColor: '#FFFFFF', // set to false to disable
    titleBarStyle: 'default', // use 'hidden' or 'hiddenInset' for Frameless windows
    frame: true, // set to false for Frameless windows
    useTouchBar: false, // edit in app/touch_bar.js
    usePhotonKitShell: false, // macOS: loads src/shellMacOS.html with PhotonKit instead of the appUrl.
    useWindowsShell: false, // Win: use custom shell from src/shellWIndows.html
    useLinuxShell: false, // all 3 require 'nodeIntegrationEnabled: true'.
  },
  mainWindow: {
    width: 1600,
    height: 900,
    largeWidth: 1600,
    largeHeight: 900,
  },
  strings: {
    open: 'Open',
  },
  menu: {
    app: {
      about: 'About',
      quit: 'Quit',
      hide: 'hide',
      hideothers: 'hide others',
      unhide: 'Unhide',
    },
    file: {
      label: 'File',
    },

    edit: {
      label: 'Edit',
      undo: 'Returning',
      redo: 'repeat',
      cut: 'cut',
      copy: 'Copy',
      paste: 'Paste',
      selectall: 'Select all'
    },
    view: {
      label: 'View',
      fullscreen: 'Enable / disable full screen'
    },
    window: {
      label: 'Window',
      minimize: 'Minimize',
      close: 'Close',
      front: 'all in the foreground',
    },
    help: {
      label: 'Help',
      contact: 'contact'
    },
    leasing: {
      label: 'Development',
      car: 'Test 1',
      movables: 'Test 2',
      inquiry: 'Test 3',
    },
  },
  touchBar: {
    label: 'Leasing',
    car: 'car computer',
    movables: 'Mobilien Rechner',
    inquiry: 'Request a quote',
  }
};

module.exports = Constants;