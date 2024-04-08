import { arbeidsgiverApiFetcherVert } from "@/app/api/_arbeidsgiverApiFetcherVert";
import { NextRequest } from "next/server";
import { getToken, requestAzureOboToken, validateToken } from "@navikt/oasis";

jest.mock("@navikt/oasis", () => ({
  getToken: jest.fn(() => "token"),
  requestAzureOboToken: jest.fn(() =>
    Promise.resolve({ ok: true, token: "tooooken" }),
  ),
  validateToken: jest.fn(() => Promise.resolve({ ok: true })),
}));

global.fetch = jest.fn(() => Promise.resolve(new Response("safe response")));
describe("arbeidsgiverApiFetcherVert", () => {
  const OLD_ENV = process.env;

  afterEach(() => {
    process.env = { ...OLD_ENV };
  });

  test("Ikke feil dersom alt er som det skal", async () => {
    process.env = {
      ...process.env,
      FIA_ARBEIDSGIVER_HOSTNAME: "asdf",
    };
    const result = await arbeidsgiverApiFetcherVert(
      "endpoint",
      "vertId",
      {} as NextRequest,
    )();

    expect(result.status).toEqual(200);
  });

  test("Feil om hostname mangler i config", async () => {
    const result = await arbeidsgiverApiFetcherVert(
      "endpoint",
      "vertId",
      {} as NextRequest,
    )();

    expect(await result.json()).toStrictEqual({
      error: "missing hostname in config",
    });
  });

  test("Feil dersom token ikke returnerer", async () => {
    jest.mocked(getToken).mockReturnValue(null);
    process.env = {
      ...process.env,
      FIA_ARBEIDSGIVER_HOSTNAME: "asdf",
    };
    const result = await arbeidsgiverApiFetcherVert(
      "endpoint",
      "vertId",
      {} as NextRequest,
    )();

    expect(await result.json()).toEqual({
      tokenError: "No token found",
      code: 401,
    });
    jest.mocked(getToken).mockReturnValue("token");
  });

  test("Feil dersom token ikke validerer", async () => {
    // @ts-ignore
    jest.mocked(validateToken).mockReturnValue({ ok: false, error: "asdf" });
    process.env = {
      ...process.env,
      FIA_ARBEIDSGIVER_HOSTNAME: "asdf",
    };
    const result = await arbeidsgiverApiFetcherVert(
      "endpoint",
      "vertId",
      {} as NextRequest,
    )();

    expect(await result.json()).toEqual({
      validationError: "asdf",
      code: 401,
    });

    // @ts-ignore
    jest.mocked(validateToken).mockReturnValue({ ok: true });
  });

  test("Feil dersom vi ikke for OBO-token", async () => {
    jest
      .mocked(requestAzureOboToken)
      // @ts-ignore
      .mockReturnValue({ ok: false, error: "asdf" });
    process.env = {
      ...process.env,
      FIA_ARBEIDSGIVER_HOSTNAME: "asdf",
    };
    const result = await arbeidsgiverApiFetcherVert(
      "endpoint",
      "vertId",
      {} as NextRequest,
    )();

    expect(await result.json()).toEqual({
      oboError: "asdf",
      code: 500,
    });

    // @ts-ignore
    jest.mocked(requestAzureOboToken).mockReturnValue({ ok: true });
  });
});
