module.exports = {
  input: [
    "./src/app/[lang]/**/*.{tsx}",
    // Use ! to filter out files or directories
    "!**/node_modules/**",
  ],
  output: "./",
  options: {
    debug: true,
    func: {
      list: ["i18nS.t", "i18nC.t"],
      extensions: [".ts", ".tsx"],
    },
    trans: {
      extensions: [".ts", ".tsx"],
    },
    lngs: ["en", "ko"],
    defaultLng: "en",
    defaultValue: function (lng, ns, key) {
      console.log(lng, ns, key);
      if (lng === "en" || lng === "ko") {
        return key;
      }
      return "__NOT_TRANSLATED__";
    },
    resource: {
      loadPath: "src/common/i18n/lang/{{lng}}/{{lng}}.json",
      savePath: "src/common/i18n/lang/_scanned/{{lng}}/{{lng}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
};
