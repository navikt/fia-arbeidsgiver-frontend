import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

import CookieHandler from "@/utils/CookieHandler";

export default function mockCookieHandler() {
  jest.spyOn(CookieHandler, "clear").mockImplementation(() => {});

  jest.spyOn(CookieHandler, "nyUndersøkelse").mockImplementation(() => {});
  jest
    .spyOn(CookieHandler, "oppdaterSisteSvarteSpørsmål")
    .mockImplementation(() => {});
  jest.spyOn(CookieHandler, "finnesFraFør").mockImplementation(() => false);
  jest.spyOn(CookieHandler, "sesjonsID", "get").mockImplementation(() => "a");
  jest
    .spyOn(CookieHandler, "sisteSvarteSpørsmålId", "get")
    .mockImplementation(() => "b");
  jest.spyOn(CookieHandler, "getSvarPåSpørsmål").mockImplementation(() => "c");
  jest
    .spyOn(CookieHandler, "harSvartAlleSpørsmål", "get")
    .mockImplementation(() => false);
}

export const mockCookieHandlerEmpty = () => {
  jest.spyOn(CookieHandler, "clear").mockImplementation(() => {});

  jest.spyOn(CookieHandler, "nyUndersøkelse").mockImplementation(() => {});
  jest
    .spyOn(CookieHandler, "oppdaterSisteSvarteSpørsmål")
    .mockImplementation(() => {});
  jest.spyOn(CookieHandler, "finnesFraFør").mockImplementation(() => false);
  jest.spyOn(CookieHandler, "sesjonsID", "get").mockImplementation(() => "");
  jest
    .spyOn(CookieHandler, "sisteSvarteSpørsmålId", "get")
    .mockImplementation(() => "");
  jest
    .spyOn(CookieHandler, "getSvarPåSpørsmål")
    .mockImplementation(() => undefined);
  jest
    .spyOn(CookieHandler, "harSvartAlleSpørsmål", "get")
    .mockImplementation(() => false);
};
