require("es6-shim");
var solc = require("solc/wrapper");

function loadScript(name, url, callback) {
  var script = document.getElementById("script-" + name);
  if (script != null) {
    script.parentElement.removeChild(script);
  }

  script = document.createElement("script");
  script.type = "text/javascript";
  script.setAttribute("id", "script-" + name);

  if (script.readyState) {
    //IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    //Others
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function loadVersion(version, callback) {
  delete window.Module;
  // NOTE: workaround some browsers
  window.Module = undefined;

  var url = "https://tronsuper.github.io/tron-solc-bin/bin/" + version;
  loadScript("solc", url, function () {
    var compiler = solc(window.Module);
    callback(compiler);
  });
}

// Also loads global variables called "soljsonSources" and "soljsonReleases"
function getVersions(callback) {
  var url =
    "https://rawcdn.githack.com/Clownsss/tron-solc-bin/0675107ba213b414f410b432baf8386dcc811f68/bin/index.js";
  loadScript("solc-list", url, function () {
    callback(soljsonSources, soljsonReleases);
  });
}

module.exports = {
  getVersions: getVersions,
  loadVersion: loadVersion,
};
