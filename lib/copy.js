var shell = require("shelljs");

module.exports = function (file_base) {
  shell.cp("-r", file_base.dev, file_base.dist);
  if (!shell.error()) {
    console.log(`${file_base.dev} => ${file_base.dist} is done successfuly`);
  }
};