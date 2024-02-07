import fs from "fs";
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import {
  JsonLangMap,
  LANGUAGES,
  LANGUAGE_SHEET_ID,
  Language,
  NO_TRANSLATE_TEXT,
  loadSpreadSheet,
} from "./initJWT";

import EnDictionary from "../../src/common/i18n/lang/en/en.json";
import KoDictionary from "../../src/common/i18n/lang/ko/ko.json";

const getJsonMap = (
  rows: GoogleSpreadsheetRow<Record<string, any>>[]
): JsonLangMap => {
  const enJson: Record<string, string> = {};
  const koJson: Record<string, string> = {};

  rows.forEach((row) => {
    const [key, ko, en, valid] = [
      row.get("key"),
      row.get("ko"),
      row.get("en"),
      row.get("translated"),
    ];

    if (valid !== "X") {
      if (ko !== NO_TRANSLATE_TEXT) {
        koJson[key] = ko;
      }

      if (en !== NO_TRANSLATE_TEXT) {
        enJson[key] = en;
      }
    }
  });

  return {
    ko: koJson,
    en: enJson,
  };
};

/**
 * @description
 * 스프레드시트에는 있는데 소스코드에는 없는 다국어
 */
const saveDiffKeys = (jsonMap: JsonLangMap) => {
  const diffJsonKeys: JsonLangMap = {
    en: {},
    ko: {},
  };

  [
    { lang: "en", dic: EnDictionary },
    { lang: "ko", dic: KoDictionary },
  ].forEach(({ lang, dic }) => {
    Object.entries(jsonMap[lang as Language]).forEach(([key, value]) => {
      if (!(key in dic)) {
        diffJsonKeys[lang as Language][key] = value;
      }
    });
  });

  return diffJsonKeys;
};

const writeDiffJson = (jsonMap: JsonLangMap) => {
  const FILE_NAME = "sheet-diff";
  const diffJson = saveDiffKeys(jsonMap);

  LANGUAGES.forEach((lang) => {
    if (Object.keys(diffJson[lang as Language]).length > 0) {
      fs.mkdirSync("./lang/diff", { recursive: true });
      fs.writeFileSync(
        `./lang/diff/${FILE_NAME}.json`,
        JSON.stringify(diffJson)
      );
    } else {
      fs.unlink(`./lang/diff/${FILE_NAME}.json`, (err) => {
        console.error(`Not deleted ${FILE_NAME} file`);
      });
    }
  });
};

const main = async () => {
  const { rows } = await loadSpreadSheet(LANGUAGE_SHEET_ID);
  const jsonMap = getJsonMap(rows);
  writeDiffJson(jsonMap);

  Object.entries(jsonMap).forEach(([filename, jsonObject]) => {
    try {
      const language = filename;

      fs.mkdirSync("./lang", { recursive: true });
      fs.writeFileSync(
        `../../src/common/i18n/lang/${language}/${language}.json`,
        JSON.stringify(jsonObject)
      );
    } catch (err) {
      console.error("Failed to write spreadsheet : ", err);
    }
  });
};

main();
