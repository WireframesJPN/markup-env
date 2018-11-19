var fs = require("fs");
var _less = require("less");

module.exports = function (style_bases, less) {

  less.forEach(function (less, i) {
    var css = less.replace(/\.less$/, ".css");
    var FS = fs.createWriteStream(`${style_bases.dist}/${css}`);
    var R = fs.readFileSync(`${style_bases.dev}/${less}`, "utf-8");

    FS.on("finish", function () {
      console.log(`${style_bases.dist}/${less} => ${style_bases.dev}/${css} is done successfuly.`)
    });

    _less.render(R, { paths: [ style_bases.dev ] })
      .then(function (output) {
        FS.write(output.css);
        FS.end();
      })
      .catch(function (e) {
        console.log(e);
      });

    //
  });

};