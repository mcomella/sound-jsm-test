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

const FENNEC_EVENTS = [
  'OptionsItem:Selected',
];

// An example of how to import a helper module.
XPCOMUtils.defineLazyGetter(this, "Helper", function() {
  let sandbox = {};
  Services.scriptloader.loadSubScript("chrome://youraddon/content/helper.js", sandbox);
  return sandbox["Helper"];
});

let observer = {
  observe: function observe(subject, topic, data) {
    Log.d('lol', 'Event received: ' + subject + topic + data);
    s.play();
  },
};

let s;

function startup(data, reason) {
  switch(reason) {
    case ADDON_INSTALL:
    case ADDON_ENABLE:
      break;

    case ADDON_UPGRADE:
    case ADDON_DOWNGRADE:
      break;
  }

  FENNEC_EVENTS.forEach(function (e) {
    Services.obs.addObserver(observer, e, false);
  });

  //let uri = Services.io.newURI('chrome://sound/content/clonepop.wav', null, null);
  /*
  let s = new Sound('chrome://sound/content/clonepop.wav', function () {
    s.play(function () {
      s.play();
      s.play();
    });
  });
    */
  s = new Sound('chrome://sound/content/clonepop.wav');
}

function shutdown(data, reason) {
  FENNEC_EVENTS.forEach(function (e) {
    Services.obs.removeObserver(observer, e);
  });
}

function install(data, reason) {}

function uninstall(data, reason) {}
