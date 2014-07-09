const { classes: Cc, interfaces: Ci, utils: Cu } = Components;

// TODO: Cleanup.
Cu.import("resource://gre/modules/AddonManager.jsm");
Cu.import("resource://gre/modules/Home.jsm");
Cu.import("resource://gre/modules/HomeProvider.jsm");
Cu.import("resource://gre/modules/Messaging.jsm");
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/Task.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

Cu.import("resource://gre/modules/Sound.jsm");

let cr = Cc['@mozilla.org/chrome/chrome-registry;1'].getService(Ci["nsIChromeRegistry"]);

let Log = Cu.import("resource://gre/modules/AndroidLog.jsm", {}).AndroidLog;

// An example of how to import a helper module.
XPCOMUtils.defineLazyGetter(this, "Helper", function() {
  let sandbox = {};
  Services.scriptloader.loadSubScript("chrome://youraddon/content/helper.js", sandbox);
  return sandbox["Helper"];
});

function startup(data, reason) {
  switch(reason) {
    case ADDON_INSTALL:
    case ADDON_ENABLE:
      break;

    case ADDON_UPGRADE:
    case ADDON_DOWNGRADE:
      break;
  }

  let uri = Services.io.newURI('chrome://sound/content/clonepop.wav', null, null);
  let s = new Sound('chrome://sound/content/clonepop.wav', function () {
    s.play(function () {
      s.play();
      s.play();
    });
  });
}

function shutdown(data, reason) {}

function install(data, reason) {}

function uninstall(data, reason) {}
