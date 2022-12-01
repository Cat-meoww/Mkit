import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */

const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $Components: "./src/lib/Components",
      $db: "./src/lib/server/db",
    },
  },
  csrf: {
    checkOrigin: true,
  },
};


export default config;

let ok = {
  "editor.suggestSelection": "first",
  "vsintellicode.modify.editor.suggestSelection":
    "automaticallyOverrodeDefaultValue",
  "files.exclude": {
    "**/.classpath": true,
    "**/.project": true,
    "**/.settings": true,
    "**/.factorypath": true,
  },
  "editor.fontSize": 20,
  "editor.formatOnPaste": true,
  "editor.multiCursorModifier": "ctrlCmd",
  "editor.snippetSuggestions": "top",
  "workbench.colorTheme": "Material Theme Darker High Contrast",
  "git.autofetch": true,
  "liveServer.settings.useBrowserPreview": false,
  "liveServer.settings.ChromeDebuggingAttachment": false,
  "liveServer.settings.fullReload": false,
  "liveServer.settings.CustomBrowser": "chrome",
  "liveServer.settings.donotShowInfoMsg": true,
  "java.jdt.ls.java.home": "C:\\Program Files\\Java\\jdk1.8.0_261",
  "php.validate.executablePath": "C:/xampp/php/php.exe",
  "liveServer.settings.donotVerifyTags": true,
  "liveServer.settings.useLocalIp": false,
  "liveServer.settings.useWebExt": false,
  "markdown.preview.breaks": true,
  "markdown.preview.doubleClickToSwitchToEditor": false,
  "debug.console.fontSize": 24,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.fontLigatures": true,
  "editor.formatOnSave": true,
  miDebuggerPath: "C:\\MinGW\\bin\\gcc.exe",
  "[json]": {
    "editor.quickSuggestions": {
      strings: true,
    },
    "editor.suggest.insertMode": "replace",
    "editor.defaultFormatter": "HookyQR.beautify",
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.suggest.insertMode": "replace",
    "diffEditor.codeLens": false,
    "emmet.triggerExpansionOnTab": false,
  },
  "explorer.confirmDelete": false,
  "security.workspace.trust.untrustedFiles": "open",
  "liveServer.settings.NoBrowser": false,
  "liveServer.settings.port": 5500,
  "[php]": {
    "editor.quickSuggestions": {
      strings: true,
    },
    "editor.defaultFormatter": "bmewburn.vscode-intelephense-client",
    "editor.suggest.insertMode": "replace",
  },
  "cmake.configureOnOpen": true,
  "explorer.confirmDragAndDrop": false,
  "workbench.startupEditor": "none",
  "editor.bracketPairColorization.enabled": false,
  "beautify.ignore": "",
  "beautify.language": {
    js: {
      type: ["javascript", "json", "jsonc", "js"],
      filename: [".jshintrc", ".jsbeautifyrc"],
    },
    css: ["css", "less", "scss"],
    html: ["htm", "html", "svelte"],
  },
  "[svelte]": {
    "editor.defaultFormatter": "svelte.svelte-vscode",
    "editor.suggest.insertMode": "replace",
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "svelte.enable-ts-plugin": true,
  "diffEditor.ignoreTrimWhitespace": false,
  "svelte.plugin.svelte.note-new-transformation": false,
  "window.zoomLevel": -1,
  "files.autoSave": "afterDelay",
};
