const translator = require("i18n");

translator.configure({
  locales: ["cat", "en", "es"],
  defaultLocale: "en",
  directory: __dirname + "/lang",
  updateFiles: false,
  indent: "\t",
  extension: ".json",
  queryParameter: "lang",
  cookie: "lang",
});

module.exports = translator;
