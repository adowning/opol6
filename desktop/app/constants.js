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
    useWindowsShell: false,   // Win: use custom shell from src/shellWIndows.html
    useLinuxShell: false,     // all 3 require 'nodeIntegrationEnabled: true'.
  },
  mainWindow: {
    width: 1420,
    height: 860,
    largeWidth: 1420,
    largeHeight: 860,
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
      label: 'Datei',
    },
    edit: {
      label: 'Bearbeiten',
      undo: 'Rückgänging',
      redo: 'Wiederholen',
      cut: 'Ausschneiden',
      copy: 'Kopieren',
      paste: 'Einfügen',
      selectall: 'Alles auswählen'
    },
    view: {
      label: 'Ansicht',
      fullscreen: 'Vollbild de-/aktivieren'
    },
    window: {
      label: 'Fenster',
      minimize: 'Minimieren',
      close: 'Schließen',
      front: 'Alle in den Vordergrund',
    },
    help: {
      label: 'Hilfe',
      contact: 'Kontakt'
    },
    leasing: {
      label: 'Berechnen',
      car: 'Kfz Leasing berechnen',
      movables: 'Mobilien Leasing berechnen',
      inquiry: 'Leasing Angebot anfordern',
    },
  },
  touchBar: {
    label: 'Leasing',
    car: 'Kfz Rechner',
    movables: 'Mobilien Rechner',
    inquiry: 'Angebot anfordern',
  }
};

module.exports = Constants;