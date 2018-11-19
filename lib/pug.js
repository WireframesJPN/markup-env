var _pug = require("pug");
var fs = require("fs");
var JSDOM = require("jsdom").JSDOM;

module.exports = function (html_bases, htmls, url_base, js_base, style_base) {

  htmls.forEach(function (pug, i) {

    var html = pug.replace(/\.pug$/, ".html");
    var FS = fs.createWriteStream(`${html_bases.dist}/${html}`);

    FS.on("finish", function () {
      console.log(`${html_bases.dev}/${pug} => ${html_bases.dist}/${html} is done successfuly.`)
    });

    var fn = _pug.compileFile(`${html_bases.dev}/${pug}`, { pretty: true });
    var HTML = fn();

    var $html;
    var document;
    var window;
    var jQuery;
    var $;
    var isFullHTML = false;

    if (HTML.match("<html>")) {
      isFullHTML = true;
      document = new JSDOM(HTML, {});
    } else {
      document = new JSDOM(`<!DOCTYPE html><html><body>${HTML}</body></html>`, {});
    }


    window = document.window;
    $ = jQuery = require("jquery")(window);


    // replace src and href
    var $html = $("html");

    $html.find("script, img, video, iframe").each(function () {
      var $elem = $(this);
      var src = $elem.attr("src");
      if (src && $elem[0].tagName === "SCRIPT") {
        var dev_base = (Array.isArray(js_base) ? js_base[0] : js_base).replace(/^\//, "");
        var dist_base = (Array.isArray(js_base) ? js_base[1] : js_base).replace(/^\//, "");
        if (src.match(/\.js$/)) {
          var reg = new RegExp( dev_base + "/(.*)\\.js$");
          src = src.replace(reg, (dist_base + "/$1.js"));
        }
      }
      if (src !== undefined && !src.match(/^https?:\/\//)) {
        $elem.attr("src", `${url_base}/${src}`);
      }
    });

    $html.find("a").each(function () {
      var $elem = $(this);
      var href = $(this).attr("href");
      var reg = new RegExp(".pug((#(.*))?)$")
      if (href) {
        if (href.match(reg)) {
          $elem.attr("href", href.replace(reg, ".html$1"))
        };
      }
    });

    $html.find("link").each(function () {

      var $elem = $(this);
      var href = $elem.attr("href");
      var dev_base = (Array.isArray(style_base) ? style_base[0] : style_base).replace(/^\//, "");
      var dist_base = (Array.isArray(style_base) ? style_base[1] : style_base).replace(/^\//, "");

      if (href.match(/\.less$/)) {
        var reg = new RegExp( dev_base + "/(.*)\\.less$");
        href = href.replace(reg, (dist_base + "/$1.css"));
      }
      if (href !== undefined && !href.match(/^https?:\/\//)) {
        $elem.attr("href", `${url_base}/${href}`);
      }
    });

    // Output
    HTML = isFullHTML ? `<!DOCTYPE html>
<html>
${$html[0].innerHTML}
</html>
` :
      $html.find("body")[0].innerHTML;

    FS.write(HTML);
    FS.end();

  });

};