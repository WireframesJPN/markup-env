var yaml = require("js-yaml");
var fs = require("fs");
var path = require("path");
var shell = require("shelljs");

var dir_base = path.resolve(__dirname + "/../");

var doc = yaml.safeLoad(fs.readFileSync(path.resolve(dir_base + "/config.yaml"), "utf-8"));

var dev_base = `${dir_base}${doc.dev_base}`;
var dist_base = `${dir_base}${doc.dist_base}`;

var js_bases = createBase(doc.js_base, dev_base, dist_base);
var style_bases = createBase(doc.css_base, dev_base, dist_base);
var html_bases = createBase(doc.html_base, dev_base, dist_base);


var jsLoader = require("./js");
var lessLoader = require("./less");
var copyLoader = require("./copy");
var pugLoader = require("./pug");

// create directory
shell.mkdir("-p", js_bases.dist);
shell.mkdir("-p", style_bases.dist);

// JavaScript
if (doc.js) {
  jsLoader(js_bases, doc.js);
}

// Less
if (doc.less) {
  lessLoader(style_bases, doc.less);
}

// Pug
if (doc.html) {
  pugLoader(html_bases, doc.html, doc.file_base_url, doc.js_base, doc.css_base);
}

// FileCopy
if (doc.copy_files) {
  doc.copy_files.forEach(function (file, i) {
    var file_bases = createBase(file, dev_base, dist_base);
    copyLoader(file_bases);
  })
}



// Base Dirを作成
function createBase (base, dev, dist) {

  if (Array.isArray(base)) {
    return {
      dev: `${dev}${base[0]}`,
      dist: `${dist}${base[1]}`,
    }
  }

  return {
    dev: `${dev}${base}`,
    dist: `${dist}${base}`,
  }
}