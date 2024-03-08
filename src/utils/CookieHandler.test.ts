import "@testing-library/jest-dom";

import CookieHandler from "@/utils/CookieHandler";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { COOKIE_MAX_AGE, COOKIE_STORAGE_KEY } from "@/utils/consts";

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

  test("kaller getCookie, deleteCookie og setCookie dersom det finnes en annen id i cookie", () => {
    dummyCookieStore[COOKIE_STORAGE_KEY] = JSON.stringify({
      spørreundersøkelseId: "noe annet enn spørreundersøkelseId123",
    });
    CookieHandler.nyUndersøkelse("spørreundersøkelseId123", "nySessionId123");

    expect(CookieHandler.spørreundersøkelseId).toBe("spørreundersøkelseId123");

    expect(getCookie).toHaveBeenCalledTimes(2); // 1 for å hente ut, 1 for å sette nye verdier uten
    expect(getCookie).toHaveBeenCalledWith(COOKIE_STORAGE_KEY);
    expect(deleteCookie).toHaveBeenCalledTimes(1);
    expect(deleteCookie).toHaveBeenCalledWith(COOKIE_STORAGE_KEY);
    expect(setCookie).toHaveBeenCalled();
  });

  test("Sjekk at ny undersøkelse fungerer", () => {
    CookieHandler.nyUndersøkelse("spørreundersøkelseId123", "nySessionId123");

    expect(setCookie).toHaveBeenCalledTimes(1);
    expect(setCookie).toHaveBeenCalledWith(
      COOKIE_STORAGE_KEY,
      JSON.stringify({
        spørreundersøkelseId: "spørreundersøkelseId123",
        sesjonsID: "nySessionId123",
        sisteSvarteSpørsmålId: undefined,
        svarPåSpørsmål: {},
        harSvartAlleSpørsmål: false,
      }),
      { maxAge: COOKIE_MAX_AGE },
    );
    expect(deleteCookie).not.toHaveBeenCalled();
  });

  test("Sjekk at oppdatere siste svarte fungerer", () => {
    CookieHandler.nyUndersøkelse("spørreundersøkelseId123", "nySessionId123");

    CookieHandler.oppdaterSisteSvarteSpørsmål("sisteSvarteSpørsmålId123");

    expect(setCookie).toHaveBeenCalledTimes(2);
    expect(setCookie).toHaveBeenCalledWith(
      COOKIE_STORAGE_KEY,
      JSON.stringify({
        spørreundersøkelseId: "spørreundersøkelseId123",
        sesjonsID: "nySessionId123",
        sisteSvarteSpørsmålId: undefined,
        svarPåSpørsmål: {},
        harSvartAlleSpørsmål: false,
      }),
      { maxAge: COOKIE_MAX_AGE },
    );
    expect(setCookie).toHaveBeenCalledWith(
      COOKIE_STORAGE_KEY,
      JSON.stringify({
        spørreundersøkelseId: "spørreundersøkelseId123",
        sesjonsID: "nySessionId123",
        svarPåSpørsmål: {},
        harSvartAlleSpørsmål: false,
        sisteSvarteSpørsmålId: "sisteSvarteSpørsmålId123",
      }),
      { maxAge: COOKIE_MAX_AGE },
    );

    expect(CookieHandler.finnesFraFør("spørreundersøkelseId123")).toBe(true);
    expect(CookieHandler.sesjonsID).toBe("nySessionId123");
    expect(CookieHandler.sisteSvarteSpørsmålId).toBe(
      "sisteSvarteSpørsmålId123",
    );
  });

  test("Sjekk at lagring av svar fungerer", () => {
    CookieHandler.nyUndersøkelse("spørreundersøkelseId123", "nySessionId123");

    expect(CookieHandler.getSvarPåSpørsmål("spm1")).toBe(undefined);
    expect(CookieHandler.getSvarPåSpørsmål("spm2")).toBe(undefined);
    expect(CookieHandler.getSvarPåSpørsmål("spm3")).toBe(undefined);

    CookieHandler.setSvarPåSpørsmål("spm1", "svar1");
    CookieHandler.oppdaterSisteSvarteSpørsmål("spm1");
    CookieHandler.setSvarPåSpørsmål("spm2", "svar2");
    CookieHandler.oppdaterSisteSvarteSpørsmål("spm2");
    CookieHandler.setSvarPåSpørsmål("spm3", "svar3");
    CookieHandler.oppdaterSisteSvarteSpørsmål("spm3");

    expect(CookieHandler.sisteSvarteSpørsmålId).toBe("spm3");

    expect(CookieHandler.getSvarPåSpørsmål("spm1")).toBe("svar1");
    expect(CookieHandler.getSvarPåSpørsmål("spm2")).toBe("svar2");
    expect(CookieHandler.getSvarPåSpørsmål("spm3")).toBe("svar3");

    CookieHandler.setSvarPåSpørsmålOgMarkerSomSisteSvarte("spm1", "svar4");

    expect(CookieHandler.sisteSvarteSpørsmålId).toBe("spm1");

    expect(CookieHandler.getSvarPåSpørsmål("spm1")).toBe("svar4");
  });

  test("Sletting av svar fungerer", () => {
    CookieHandler.nyUndersøkelse("spørreundersøkelseId123", "nySessionId123");

    CookieHandler.setSvarPåSpørsmålOgMarkerSomSisteSvarte("spm1", "svar1");

    expect(CookieHandler.getSvarPåSpørsmål("spm1")).toBe("svar1");
    expect(CookieHandler.sisteSvarteSpørsmålId).toBe("spm1");

    CookieHandler.clear();

    expect(CookieHandler.getSvarPåSpørsmål("spm1")).toBe(undefined);
    expect(CookieHandler.sisteSvarteSpørsmålId).toBeUndefined();
  });
});
