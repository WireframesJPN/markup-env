var fs = require("fs");
var browserify = require("browserify");

module.exports = function (js_bases, js) {
  js.forEach(function (js, i) {
    var FS = fs.createWriteStream(`${js_bases.dist}/${js}`);
    browserify(`${js_bases.dev}/${js}`, { transform: [ "babelify" ] }).bundle().pipe(FS)
    FS.on("finish", function () {
      console.log(`${js_bases.dist}/${js} => ${js_bases.dev}/${js} is done successfuly.`)
    });
  });
};