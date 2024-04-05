import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { COOKIE_MAX_AGE, COOKIE_STORAGE_KEY } from "./consts";

type CookieContents = {
  spørreundersøkelseId: string;
  sisteSvarteSpørsmålId: string | undefined;
  svarPåSpørsmål: Record<string, string[]>;
  harSvartAlleSpørsmål: boolean;
  sesjonsID: string;
};

export default abstract class CookieHandler {
  public static clear() {
    deleteCookie(COOKIE_STORAGE_KEY);
  }

  private static get cookieContents(): CookieContents | undefined {
    const cookie = getCookie(COOKIE_STORAGE_KEY);
    return cookie ? JSON.parse(cookie) : undefined;
  }

  private static setCookieVerdi<Key extends keyof CookieContents>(
    key: Key,
    value: CookieContents[Key],
  ) {
    setCookie(
      COOKIE_STORAGE_KEY,
      JSON.stringify({
        ...CookieHandler.cookieContents,
        [key]: value,
      }),
      {
        maxAge: COOKIE_MAX_AGE,
      },
    );
  }

  public static svarPåSpørsmål(spørsmålId: string): string[] | undefined {
    return CookieHandler.cookieContents?.svarPåSpørsmål?.[spørsmålId];
  }

  public static setSvarPåSpørsmål(spørsmålId: string, svarIder: string[]) {
    const svarPåSpørsmål = CookieHandler.cookieContents?.svarPåSpørsmål || {};
    svarPåSpørsmål[spørsmålId] = svarIder;

    CookieHandler.setCookieVerdi("svarPåSpørsmål", svarPåSpørsmål);
  }

  public static oppdaterSisteSvarteSpørsmål(spørsmålId: string) {
    CookieHandler.setCookieVerdi("sisteSvarteSpørsmålId", spørsmålId);
  }

  public static setHarSvartAlleSpørsmål() {
    CookieHandler.setCookieVerdi("harSvartAlleSpørsmål", true);
  }
  public static setSvarPåSpørsmålOgMarkerSomSisteSvarte(
    spørsmålId: string,
    svarIder: string[],
  ) {
    CookieHandler.setSvarPåSpørsmål(spørsmålId, svarIder);
    CookieHandler.oppdaterSisteSvarteSpørsmål(spørsmålId);
  }
  public static getSvarPåSpørsmål(spørsmålId: string): string[] | undefined {
    return CookieHandler.cookieContents?.svarPåSpørsmål?.[spørsmålId];
  }

  public static get harSvartAlleSpørsmål(): boolean {
    return CookieHandler.cookieContents?.harSvartAlleSpørsmål || false;
  }

  public static get sesjonsID(): string {
    return CookieHandler.cookieContents?.sesjonsID || "";
  }

  public static get sisteSvarteSpørsmålId(): string | undefined {
    return CookieHandler.cookieContents?.sisteSvarteSpørsmålId;
  }

  public static get spørsmålÅStartePå(): string {
    if (CookieHandler.harSvartAlleSpørsmål) {
      return "START";
    }

    return CookieHandler.sisteSvarteSpørsmålId || "START";
  }

  public static get spørreundersøkelseId(): string | undefined {
    return CookieHandler.cookieContents?.spørreundersøkelseId;
  }

  public static finnesFraFør(spørreundersøkelseId: string): boolean {
    return (
      CookieHandler.cookieContents?.spørreundersøkelseId ===
      spørreundersøkelseId
    );
  }
  public static nyUndersøkelse(
    spørreundersøkelseId: string,
    nySessionID: string,
  ) {
    const cookie = CookieHandler.cookieContents;

    if (cookie && cookie.spørreundersøkelseId !== spørreundersøkelseId) {
      CookieHandler.clear();
    }
    setCookie(
      COOKIE_STORAGE_KEY,
      JSON.stringify({
        spørreundersøkelseId,
        sesjonsID: nySessionID,
        sisteSvarteSpørsmålId: undefined,
        svarPåSpørsmål: {},
        harSvartAlleSpørsmål: false,
      } as CookieContents),
      {
        maxAge: COOKIE_MAX_AGE,
      },
    );
  }
}
