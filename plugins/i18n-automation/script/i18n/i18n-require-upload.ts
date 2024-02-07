import fs from "fs";
import {
  JsonLangMap,
  LANGUAGES,
  Language,
  NO_TRANSLATE_TEXT,
  REQUIRE_SHEET_ID,
  loadSpreadSheet,
} from "./initJWT";

type Row = { key: string; en: string; ko: string };

function getLangFiles(path: string) {
  const langMap: JsonLangMap = {
    en: {},
    ko: {},
  };

  try {
    LANGUAGES.forEach((lang) => {
      const jsonFile = fs.readFileSync(`${path}/${lang}/${lang}.json`, "utf-8");
      const jsonData = JSON.parse(jsonFile);

      langMap[lang as Language] = jsonData;
    });

    return langMap;
  } catch (err) {
    return null;
  }
}

function readScannedFiles(): JsonLangMap | null {
  return getLangFiles("../../src/common/i18n/lang/_scanned");
}

function readLangFiles(): JsonLangMap | null {
  return getLangFiles("../../src/common/i18n/lang");
}

function readRequireFile(): Record<string, string> | null {
  try {
    const jsonFile = fs.readFileSync(`./lang/upload/require.json`, "utf-8");

    if (jsonFile) {
      const jsonData = JSON.parse(jsonFile) as Record<string, string>;
      return jsonData;
    }
    return null;
  } catch (err) {
    return null;
  }
}

function getUniqueKeys(jsonMap: JsonLangMap) {
  const keys = LANGUAGES.map((lang) =>
    Object.keys(jsonMap[lang as Language])
  ).flat();
  const uniqueKeys = [...new Set(keys)];

  return uniqueKeys;
}

function fillMissingKeys(
  jsonMap: JsonLangMap,
  uniqueKeys: string[],
  defaultValue = NO_TRANSLATE_TEXT
) {
  LANGUAGES.forEach((lang) => {
    const language = lang as Language;

    uniqueKeys.forEach((uniqueKey) => {
      if (!(uniqueKey in jsonMap[language])) {
        jsonMap[language][uniqueKey] = defaultValue;
      }
    });
  });
}

async function uploadRequirementsToGoogleSpreadSheet(diffJson: JsonLangMap) {
  const uniqueKeys = getUniqueKeys(diffJson);
  fillMissingKeys(diffJson, uniqueKeys);
  const { sheet, rows } = await loadSpreadSheet(REQUIRE_SHEET_ID);
  const addRowList: Row[] = [];

  uniqueKeys.forEach((uniqueKey) => {
    const row: { key: string; en: string; ko: string } = {
      key: uniqueKey,
      en: NO_TRANSLATE_TEXT,
      ko: NO_TRANSLATE_TEXT,
    };

    const index = rows.findIndex((row) => row.get("key") === uniqueKey);
    if (index < 0) {
      LANGUAGES.forEach((lang) => {
        const language = lang as Language;
        row[language] = diffJson[language][uniqueKey];
      });

      addRowList.push(row);
    }
  });

  if (addRowList.length === 0) {
    return null;
  }

  try {
    await sheet.addRows(addRowList);
    await sheet.saveUpdatedCells();
  } catch (err) {
    console.error(`Not updated i18n requirements : ${err}`);
  }
}

/**
 * 1. 언어별로 scanned 랑 기존 파일이랑 비교함
 * 2. 언어별로 upload 할 파일 생성함
 * 3. require.json 에 추가 요청할 다국어 추가함
 * 4. 하나로 합쳐서 엑셀에 업로드함
 */
function main() {
  const langFiles = readLangFiles();
  const scannedFiles = readScannedFiles();
  const requireFile = readRequireFile();
  const diffJson: JsonLangMap = {
    en: {},
    ko: {},
  };

  if (!langFiles) {
    return null;
  }

  if (scannedFiles) {
    LANGUAGES.forEach((lang) => {
      const language = lang as Language;
      const scannedJson = scannedFiles[language];
      const langJson = langFiles[language];

      Object.entries(scannedJson).map(([key, value]) => {
        if (!(key in langJson)) {
          diffJson[language][key] = value;
        }
      });
    });
  }

  if (requireFile && Object.keys(requireFile).length > 0) {
    Object.entries(requireFile).forEach(([key, value]) => {
      LANGUAGES.forEach((lang) => {
        const language = lang as Language;
        const langJson = langFiles[language];

        if (!(key in langJson)) {
          diffJson[language][key] = value;
        }
      });
    });
  }

  uploadRequirementsToGoogleSpreadSheet(diffJson);
}

main();
