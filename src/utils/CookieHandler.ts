import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import {
  COOKIE_MAX_AGE,
  SESSION_ID_STORAGE_KEY,
  SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY,
  SPØRREUNDERSØKELSE_ID_STORAGE_KEY,
  SVAR_PÅ_SPØRSMÅL_ID_STORAGE_KEY,
} from "./consts";

export default class CookieHandler {
  spørreundersøkelseId: string;
  static clear() {
    deleteCookie(SESSION_ID_STORAGE_KEY);
    deleteCookie(SPØRREUNDERSØKELSE_ID_STORAGE_KEY);
    deleteCookie(SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY);
    deleteCookie(SVAR_PÅ_SPØRSMÅL_ID_STORAGE_KEY);
  }

  static svarPåSpørsmål(spørsmålId: string): string | undefined {
    return JSON.parse(getCookie(SVAR_PÅ_SPØRSMÅL_ID_STORAGE_KEY) || "{}")?.[
      spørsmålId
    ];
  }

  constructor(spørreundersøkelseId: string) {
    this.spørreundersøkelseId = spørreundersøkelseId;

    if (
      hasCookie(SPØRREUNDERSØKELSE_ID_STORAGE_KEY) &&
      getCookie(SPØRREUNDERSØKELSE_ID_STORAGE_KEY) !== spørreundersøkelseId
    ) {
      CookieHandler.clear();
    }
  }

  nyUndersøkelse(nySessionID: string) {
    setCookie(SPØRREUNDERSØKELSE_ID_STORAGE_KEY, this.spørreundersøkelseId, {
      maxAge: COOKIE_MAX_AGE,
    });
    setCookie(SESSION_ID_STORAGE_KEY, nySessionID, {
      maxAge: COOKIE_MAX_AGE,
    });
    deleteCookie(SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY);
    deleteCookie(SVAR_PÅ_SPØRSMÅL_ID_STORAGE_KEY);
  }

  oppdaterSisteSvarteSpørsmål(spørsmålId: string) {
    setCookie(SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY, spørsmålId, {
      maxAge: COOKIE_MAX_AGE,
    });
  }

  setSvarPåSpørsmål(spørsmålId: string, svarId: string) {
    const svarPåSpørsmål = JSON.parse(
      getCookie(SVAR_PÅ_SPØRSMÅL_ID_STORAGE_KEY) || "{}",
    );
    svarPåSpørsmål[spørsmålId] = svarId;
    setCookie(SVAR_PÅ_SPØRSMÅL_ID_STORAGE_KEY, JSON.stringify(svarPåSpørsmål), {
      maxAge: COOKIE_MAX_AGE,
    });
  }

  setSvarPåSpørsmålOgMarkerSomSisteSvarte(spørsmålId: string, svarId: string) {
    this.setSvarPåSpørsmål(spørsmålId, svarId);
    this.oppdaterSisteSvarteSpørsmål(spørsmålId);
  }

  getSvarPåSpørsmål(spørsmålId: string): string | undefined {
    return JSON.parse(getCookie(SVAR_PÅ_SPØRSMÅL_ID_STORAGE_KEY) || "{}")?.[
      spørsmålId
    ];
  }

  get finnesFraFør(): boolean {
    return (
      hasCookie(SESSION_ID_STORAGE_KEY) &&
      hasCookie(SPØRREUNDERSØKELSE_ID_STORAGE_KEY)
    );
  }

  get sesjonsID(): string {
    return getCookie(SESSION_ID_STORAGE_KEY) || "";
  }

  get sisteSvarteSpørsmålId(): string {
    return getCookie(SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY) || "";
  }
}
