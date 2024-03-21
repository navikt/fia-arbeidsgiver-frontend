import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Spørsmålsside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";
import { useRouter } from "next/navigation";

import {
  dummySpørreundersøkelseId,
  dummyFørsteSpørsmål,
  dummyAndreSpørsmål,
  dummyTredjeSpørsmål,
  førsteTemaFørsteSpørsmål,
  // @ts-ignore
} from "@/utils/dummyData/dummyInnholdForSpørreundersøkelse";
// @ts-ignore
import { dummyVertId } from "@/utils/dummyData/vert";

const dummySpørsmålId = førsteTemaFørsteSpørsmål.spørsmålId;
const dummyTemaId = førsteTemaFørsteSpørsmål.temaId;
const dummySpørsmålOgSvar = dummyFørsteSpørsmål;

expect.extend(toHaveNoViolations);
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: jest.fn(() => null),
  })),
  usePathname: jest.fn(() => "/"),
}));

jest.mock("@/app/_api_hooks/vert/useAntallDeltakere", () => ({
  useAntallDeltakere: () => ({
    data: "2",
    isLoading: false,
    error: undefined,
  }),
}));

jest.mock("@/app/_api_hooks/vert/useAntallSvar", () => ({
  useAntallSvar: () => ({
    data: "3",
    isLoading: false,
    error: undefined,
  }),
}));

jest.mock("@/app/_api_hooks/vert/useSpørsmålOgSvar", () => ({
  useSpørsmålOgSvar: () => ({
    data: dummySpørsmålOgSvar,
    isLoading: false,
    error: undefined,
  }),
}));

describe("vert/spørsmålside", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Spørsmålside får rett tekst for spørsmål og svaralternativer", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: dummyTemaId,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );
    const tittel = await screen.findByText(dummySpørsmålOgSvar.spørsmålTekst);

    expect(tittel).toBeInTheDocument();

    for (const svaralternativ of dummySpørsmålOgSvar.svaralternativer) {
      const svar = await screen.findByText(svaralternativ.svartekst);
      expect(svar).toBeInTheDocument();
    }
  });

  test("vert blir routet til rett spørsmålside ved trykk på neste basert på IdentifiserbartSpørsmål", async () => {
    //TODO: Test at man kan gå til neste spørsmålID ved trykk på neste
    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: dummyTemaId,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );
    expect(2).toBe(2);
  });

  test("vert blir routet til oversikt om neste IdentifiserbartSpørsmål er null", async () => {
    //TODO: Test at man kommer til overskt om neste IdentifiserbartSpørsmål er null
    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: dummyTemaId,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );
    expect(2).toBe(2);
  });

  test("vert blir routet til rett spørsmålside ved trykk på forrige basert på IdentifiserbartSpørsmål", async () => {
    //TODO: Test at man kan gå til forrige spørsmålID ved trykk på forrige
    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: dummyTemaId,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );
    expect(2).toBe(2);
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip("vert skal kunne trykke på tilbake", async () => {
    const pushFunction = jest.fn();
    jest.mocked(useRouter).mockReturnValue({
      push: pushFunction,
      back: jest.fn(),
      prefetch: jest.fn(),
      forward: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
    });

    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: dummyTemaId,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );

    expect(pushFunction).toHaveBeenCalledTimes(0);
    expect(
      await screen.findByText(dummyFørsteSpørsmål.spørsmålTekst),
    ).toBeInTheDocument();

    const neste = await screen.findByRole("button", { name: /Neste/i });
    const tilbake = await screen.findByRole("button", { name: /Tilbake/i });
    await act(async () => neste.click());
    expect(pushFunction).toHaveBeenCalledTimes(0);
    expect(
      await screen.findByText(dummyAndreSpørsmål.spørsmålTekst),
    ).toBeInTheDocument();

    await act(async () => neste.click());
    expect(pushFunction).toHaveBeenCalledTimes(0);
    expect(
      await screen.findByText(dummyTredjeSpørsmål.spørsmålTekst),
    ).toBeInTheDocument();

    await act(async () => tilbake.click());
    expect(pushFunction).toHaveBeenCalledTimes(0);
    expect(
      await screen.findByText(dummyAndreSpørsmål.spørsmålTekst),
    ).toBeInTheDocument();

    await act(async () => tilbake.click());
    expect(pushFunction).toHaveBeenCalledTimes(0);
    expect(
      await screen.findByText(dummyFørsteSpørsmål.spørsmålTekst),
    ).toBeInTheDocument();

    await act(async () => tilbake.click());
    expect(pushFunction).toHaveBeenCalledTimes(1);
    expect(pushFunction).toHaveBeenCalledWith(".");
  });

  test("axe UU-test", async () => {
    const { container } = render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: dummyTemaId,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );

    const results = await axe(container, {
      rules: {
        "svg-img-alt": { enabled: false }, // TODO: Fiks alt-tekst på svg (qr-kode) før denne testen kan slås på.
      },
    });
    expect(results).toHaveNoViolations();
  });

  test("axe UU-test for alle spørsmål", async () => {
    const { container } = render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: dummyTemaId,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );

    const førsteTittel = await screen.findByText(
      dummySpørsmålOgSvar.spørsmålTekst,
    );
    expect(førsteTittel).toBeInTheDocument();

    const nesteKnapp = screen.getByText(
      dummySpørsmålOgSvar.nesteSpørsmål !== null ? "Neste" : "Fullfør",
    );

    expect(nesteKnapp).toBeInTheDocument();

    act(() => {
      nesteKnapp.click();
    });

    const results = await axe(container, {
      rules: {
        "svg-img-alt": { enabled: false }, // TODO: Fiks alt-tekst på svg (qr-kode) før denne testen kan slås på.
      },
    });
    expect(results).toHaveNoViolations();
  });
});
