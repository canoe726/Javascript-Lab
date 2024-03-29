import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

export type Language = "en" | "ko";
export type JsonLangMap = {
  ko: Record<string, string>;
  en: Record<string, string>;
};

export const GOOGLE_SPREAD_SHEET_DOCUMENT_ID = "";
export const LANGUAGE_SHEET_ID = "";
export const REQUIRE_SHEET_ID = "";
export const NO_TRANSLATE_TEXT = "_N/A";
export const LANGUAGES = ["en", "ko"];

const GOOGLE_SPREAD_SHEET_EMAIL = "";
const GOOGLE_SPREAD_SHEET_KEY = "";

export const serviceAccountAuth = new JWT({
  // env var values here are copied from service account credentials generated by google
  // see "Authentication" section in docs for more info
  email: GOOGLE_SPREAD_SHEET_EMAIL,
  key: GOOGLE_SPREAD_SHEET_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const loadSpreadSheet = async (sheetId: string) => {
  const spreadSheet = new GoogleSpreadsheet(
    GOOGLE_SPREAD_SHEET_DOCUMENT_ID,
    serviceAccountAuth
  );
  await spreadSheet.loadInfo();
  const sheet = spreadSheet.sheetsById[sheetId as any];

  const rows = await sheet.getRows();
  return {
    sheet,
    rows,
  };
};
