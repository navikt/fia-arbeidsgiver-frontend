import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Spørsmålsside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummySpørreundersøkelse } = require("@/utils/dummydata");

expect.extend(toHaveNoViolations);
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: jest.fn(() => null),
  })),
  usePathname: jest.fn(() => "/"),
}));

jest.mock("@/app/_api_hooks/vert/useVertSpørreundersøkelse", () => ({
  useVertSpørreundersøkelse: () => ({
    data: dummySpørreundersøkelse,
    isLoading: false,
    error: undefined,
  }),
}));
jest.mock("@/app/_api_hooks/vert/useAntallDeltakere", () => ({
  useAntallDeltakere: () => ({
    data: {
      antallDeltakere: 2,
      antallSvar: [
        {
          antall: 1,
          spørsmålId: "ef4d406d-abc2-4ed6-8de7-72a7feb40326",
        },
        {
          antall: 1,
          spørsmålId: "2",
        },
        {
          antall: 1,
          spørsmålId: "2",
        },
      ],
    },
    isLoading: false,
    error: undefined,
  }),
}));

jest.mock("@/app/_api_hooks/vert/useVertTemastatus", () => ({
  useVertTemastatus: () => ({
    data: {
      tema: "PARTSSAMARBEID",
      temastatus: [
        {
          antall: 1,
          antallSvar: 1,
        },
      ],
    },
    isLoading: false,
    error: undefined,
  }),
}));
describe("vert/spørsmålside", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("render fungerer", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: "ef4d406d-abc2-4ed6-8de7-72a7feb40326",
          vertId: "vertId",
        }}
      />,
    );
    const tittel = await screen.findByText(
      "Hvilke av disse faktorene tror du har størst innflytelse på sykefraværet der du jobber?",
    );
    expect(tittel).toBeInTheDocument();

    for (const svaralternativ of dummySpørreundersøkelse[0].svaralternativer) {
      const svar = await screen.findByText(svaralternativ.tekst);
      expect(svar).toBeInTheDocument();
    }
  });

  test("klikk gjennom neste og fullfør", async () => {
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
          uuid: "ef4d406d-abc2-4ed6-8de7-72a7feb40326",
          vertId: "vertId",
        }}
      />,
    );

    for (const dummySpørreundersøkelseElement of dummySpørreundersøkelse) {
      const førsteTittel = await screen.findByText(
        dummySpørreundersøkelseElement.spørsmål,
      );
      expect(førsteTittel).toBeInTheDocument();

      const nesteKnapp = screen.getByText(
        dummySpørreundersøkelse.indexOf(dummySpørreundersøkelseElement) !==
          dummySpørreundersøkelse.length - 1
          ? "Neste"
          : "Fullfør",
      );
      expect(nesteKnapp).toBeInTheDocument();
      expect(pushFunction).toHaveBeenCalledTimes(0);
      act(() => {
        nesteKnapp.click();
      });
    }
    expect(pushFunction).toHaveBeenCalledTimes(1);
    expect(pushFunction).toHaveBeenCalledWith("../../oversikt");
  });

  test("klikk på tilbake", async () => {
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
          uuid: "ef4d406d-abc2-4ed6-8de7-72a7feb40326",
          vertId: "vertId",
        }}
      />,
    );

    expect(pushFunction).toHaveBeenCalledTimes(0);
    expect(
      await screen.findByText(dummySpørreundersøkelse[0].spørsmål),
    ).toBeInTheDocument();

    const neste = await screen.findByRole("button", { name: /Neste/i });
    const tilbake = await screen.findByRole("button", { name: /Tilbake/i });
    await act(async () => neste.click());
    expect(pushFunction).toHaveBeenCalledTimes(0);
    expect(
      await screen.findByText(dummySpørreundersøkelse[1].spørsmål),
    ).toBeInTheDocument();

    await act(async () => neste.click());
    expect(pushFunction).toHaveBeenCalledTimes(0);
    expect(
      await screen.findByText(dummySpørreundersøkelse[2].spørsmål),
    ).toBeInTheDocument();

    await act(async () => tilbake.click());
    expect(pushFunction).toHaveBeenCalledTimes(0);
    expect(
      await screen.findByText(dummySpørreundersøkelse[1].spørsmål),
    ).toBeInTheDocument();

    await act(async () => tilbake.click());
    expect(pushFunction).toHaveBeenCalledTimes(0);
    expect(
      await screen.findByText(dummySpørreundersøkelse[0].spørsmål),
    ).toBeInTheDocument();

    await act(async () => tilbake.click());
    expect(pushFunction).toHaveBeenCalledTimes(1);
    expect(pushFunction).toHaveBeenCalledWith(".");
  });

  test("axe UU-test", async () => {
    const { container } = render(
      <Spørsmålsside
        params={{
          uuid: "ef4d406d-abc2-4ed6-8de7-72a7feb40326",
          vertId: "vertId",
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
          uuid: "ef4d406d-abc2-4ed6-8de7-72a7feb40326",
          vertId: "vertId",
        }}
      />,
    );

    for (const dummySpørreundersøkelseElement of dummySpørreundersøkelse) {
      const førsteTittel = await screen.findByText(
        dummySpørreundersøkelseElement.spørsmål,
      );
      expect(førsteTittel).toBeInTheDocument();

      const nesteKnapp = screen.getByText(
        dummySpørreundersøkelse.indexOf(dummySpørreundersøkelseElement) !==
          dummySpørreundersøkelse.length - 1
          ? "Neste"
          : "Fullfør",
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
    }
  });
});
