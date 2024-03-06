import "@testing-library/jest-dom";

import CookieHandler from "@/utils/CookieHandler";
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import {
  COOKIE_MAX_AGE,
  SESSION_ID_STORAGE_KEY,
  SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY,
  SPØRREUNDERSØKELSE_ID_STORAGE_KEY,
  SVAR_PÅ_SPØRSMÅL_ID_STORAGE_KEY,
} from "@/utils/consts";

let dummyCookieStore: { [key: string]: string } = {};

jest.mock("cookies-next", () => ({
  deleteCookie: jest.fn((key: string) => delete dummyCookieStore[key]),
  getCookie: jest.fn((key: string) => dummyCookieStore[key]),
  hasCookie: jest.fn((key: string) => !!dummyCookieStore[key]),
  setCookie: jest.fn((key: string, value: string) => {
    dummyCookieStore[key] = value;
  }),
}));
describe("CookieHandler", () => {
  beforeEach(() => {
    dummyCookieStore = {};
    jest.clearAllMocks();
  });

  test("kaller bare hasCookie dersom det ikke finnes", () => {
    const myCookieHandler = new CookieHandler("spørreundersøkelseId123");

    expect(myCookieHandler.spørreundersøkelseId).toBe(
      "spørreundersøkelseId123",
    );

    expect(myCookieHandler).toBeInstanceOf(CookieHandler);
    expect(hasCookie).toHaveBeenCalledWith(SPØRREUNDERSØKELSE_ID_STORAGE_KEY);
    expect(getCookie).not.toHaveBeenCalled();
    expect(deleteCookie).not.toHaveBeenCalled();
    expect(setCookie).not.toHaveBeenCalled();
  });

  test("kaller hasCookie og getCookie dersom det finnes i cookie", () => {
    dummyCookieStore[SPØRREUNDERSØKELSE_ID_STORAGE_KEY] =
      "spørreundersøkelseId123";
    const myCookieHandler = new CookieHandler("spørreundersøkelseId123");

    expect(myCookieHandler.spørreundersøkelseId).toBe(
      "spørreundersøkelseId123",
    );

    expect(myCookieHandler).toBeInstanceOf(CookieHandler);
    expect(hasCookie).toHaveBeenCalledWith(SPØRREUNDERSØKELSE_ID_STORAGE_KEY);
    expect(getCookie).toHaveBeenCalledWith(SPØRREUNDERSØKELSE_ID_STORAGE_KEY);
    expect(deleteCookie).not.toHaveBeenCalled();
    expect(setCookie).not.toHaveBeenCalled();
  });

  test("kaller hasCookie, getCookie og deleteCookie dersom det finnes en annen id i cookie", () => {
    dummyCookieStore[SPØRREUNDERSØKELSE_ID_STORAGE_KEY] =
      "noe annet enn spørreundersøkelseId123";
    const myCookieHandler = new CookieHandler("spørreundersøkelseId123");

    expect(myCookieHandler.spørreundersøkelseId).toBe(
      "spørreundersøkelseId123",
    );

    expect(myCookieHandler).toBeInstanceOf(CookieHandler);
    expect(hasCookie).toHaveBeenCalledWith(SPØRREUNDERSØKELSE_ID_STORAGE_KEY);
    expect(getCookie).toHaveBeenCalledWith(SPØRREUNDERSØKELSE_ID_STORAGE_KEY);
    expect(deleteCookie).toHaveBeenCalledTimes(5);
    expect(deleteCookie).toHaveBeenCalledWith(SESSION_ID_STORAGE_KEY);
    expect(deleteCookie).toHaveBeenCalledWith(
      SPØRREUNDERSØKELSE_ID_STORAGE_KEY,
    );
    expect(deleteCookie).toHaveBeenCalledWith(
      SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY,
    );
    expect(deleteCookie).toHaveBeenCalledWith(SVAR_PÅ_SPØRSMÅL_ID_STORAGE_KEY);
    expect(setCookie).not.toHaveBeenCalled();
  });

  test("Sjekk at ny undersøkelse fungerer", () => {
    const myCookieHandler = new CookieHandler("spørreundersøkelseId123");
    myCookieHandler.nyUndersøkelse("nySessionId123");

    expect(setCookie).toHaveBeenCalledTimes(2);
    expect(setCookie).toHaveBeenCalledWith(
      SPØRREUNDERSØKELSE_ID_STORAGE_KEY,
      "spørreundersøkelseId123",
      { maxAge: COOKIE_MAX_AGE },
    );
    expect(setCookie).toHaveBeenCalledWith(
      SESSION_ID_STORAGE_KEY,
      "nySessionId123",
      { maxAge: COOKIE_MAX_AGE },
    );

    expect(deleteCookie).toHaveBeenCalledTimes(3);
    expect(deleteCookie).toHaveBeenCalledWith(
      SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY,
    );
    expect(deleteCookie).toHaveBeenCalledWith(SVAR_PÅ_SPØRSMÅL_ID_STORAGE_KEY);
  });

  test("Sjekk at oppdatere siste svarte fungerer", () => {
    const myCookieHandler = new CookieHandler("spørreundersøkelseId123");
    myCookieHandler.nyUndersøkelse("nySessionId123");

    myCookieHandler.oppdaterSisteSvarteSpørsmål("sisteSvarteSpørsmålId123");

    expect(setCookie).toHaveBeenCalledTimes(3);
    expect(setCookie).toHaveBeenCalledWith(
      SPØRREUNDERSØKELSE_ID_STORAGE_KEY,
      "spørreundersøkelseId123",
      { maxAge: COOKIE_MAX_AGE },
    );
    expect(setCookie).toHaveBeenCalledWith(
      SESSION_ID_STORAGE_KEY,
      "nySessionId123",
      { maxAge: COOKIE_MAX_AGE },
    );
    expect(setCookie).toHaveBeenCalledWith(
      SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY,
      "sisteSvarteSpørsmålId123",
      { maxAge: COOKIE_MAX_AGE },
    );

    expect(myCookieHandler.finnesFraFør).toBe(true);
    expect(myCookieHandler.sesjonsID).toBe("nySessionId123");
    expect(myCookieHandler.sisteSvarteSpørsmålId).toBe(
      "sisteSvarteSpørsmålId123",
    );
  });

  test("Sjekk at lagring av svar fungerer", () => {
    const myCookieHandler = new CookieHandler("spørreundersøkelseId123");
    myCookieHandler.nyUndersøkelse("nySessionId123");

    expect(myCookieHandler.getSvarPåSpørsmål("spm1")).toBe(undefined);
    expect(myCookieHandler.getSvarPåSpørsmål("spm2")).toBe(undefined);
    expect(myCookieHandler.getSvarPåSpørsmål("spm3")).toBe(undefined);

    myCookieHandler.setSvarPåSpørsmål("spm1", "svar1");
    myCookieHandler.oppdaterSisteSvarteSpørsmål("spm1");
    myCookieHandler.setSvarPåSpørsmål("spm2", "svar2");
    myCookieHandler.oppdaterSisteSvarteSpørsmål("spm2");
    myCookieHandler.setSvarPåSpørsmål("spm3", "svar3");
    myCookieHandler.oppdaterSisteSvarteSpørsmål("spm3");

    expect(myCookieHandler.sisteSvarteSpørsmålId).toBe("spm3");

    expect(myCookieHandler.getSvarPåSpørsmål("spm1")).toBe("svar1");
    expect(myCookieHandler.getSvarPåSpørsmål("spm2")).toBe("svar2");
    expect(myCookieHandler.getSvarPåSpørsmål("spm3")).toBe("svar3");

    myCookieHandler.setSvarPåSpørsmålOgMarkerSomSisteSvarte("spm1", "svar4");

    expect(myCookieHandler.sisteSvarteSpørsmålId).toBe("spm1");

    expect(myCookieHandler.getSvarPåSpørsmål("spm1")).toBe("svar4");
  });

  test("Sletting av svar fungerer", () => {
    const myCookieHandler = new CookieHandler("spørreundersøkelseId123");
    myCookieHandler.nyUndersøkelse("nySessionId123");

    myCookieHandler.setSvarPåSpørsmålOgMarkerSomSisteSvarte("spm1", "svar1");

    expect(myCookieHandler.getSvarPåSpørsmål("spm1")).toBe("svar1");
    expect(myCookieHandler.sisteSvarteSpørsmålId).toBe("spm1");

    CookieHandler.clear();

    expect(myCookieHandler.getSvarPåSpørsmål("spm1")).toBe(undefined);
    expect(myCookieHandler.sisteSvarteSpørsmålId).toBeUndefined();
  });
});
