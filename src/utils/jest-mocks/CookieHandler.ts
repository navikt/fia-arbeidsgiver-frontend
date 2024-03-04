import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

import CookieHandler from "@/utils/CookieHandler";

export default function mockCookieHandler() {
  jest.spyOn(CookieHandler, "clear").mockImplementation(() => {});

  jest
    .spyOn(CookieHandler.prototype, "nyUndersøkelse")
    .mockImplementation(() => {});
  jest
    .spyOn(CookieHandler.prototype, "oppdaterSisteSvarteSpørsmål")
    .mockImplementation(() => {});
  jest
    .spyOn(CookieHandler.prototype, "finnesFraFør", "get")
    .mockImplementation(() => false);
  jest
    .spyOn(CookieHandler.prototype, "sesjonsID", "get")
    .mockImplementation(() => "a");
  jest
    .spyOn(CookieHandler.prototype, "sisteSvarteSpørsmålId", "get")
    .mockImplementation(() => "b");
  jest
    .spyOn(CookieHandler.prototype, "getSvarPåSpørsmål")
    .mockImplementation(() => "c");
}

export const mockCookieHandlerEmpty = () => {
  jest.spyOn(CookieHandler, "clear").mockImplementation(() => {});

  jest
    .spyOn(CookieHandler.prototype, "nyUndersøkelse")
    .mockImplementation(() => {});
  jest
    .spyOn(CookieHandler.prototype, "oppdaterSisteSvarteSpørsmål")
    .mockImplementation(() => {});
  jest
    .spyOn(CookieHandler.prototype, "finnesFraFør", "get")
    .mockImplementation(() => false);
  jest
    .spyOn(CookieHandler.prototype, "sesjonsID", "get")
    .mockImplementation(() => "");
  jest
    .spyOn(CookieHandler.prototype, "sisteSvarteSpørsmålId", "get")
    .mockImplementation(() => "");
  jest
    .spyOn(CookieHandler.prototype, "getSvarPåSpørsmål")
    .mockImplementation(() => undefined);
};
