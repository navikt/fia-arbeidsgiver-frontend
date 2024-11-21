import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import Spørsmålsside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";
import { sendSvar } from "@/app/_api_hooks/deltaker/sendSvar";
import { useRouter } from "next/navigation";
import mockCookieHandler from "@/utils/jest-mocks/CookieHandler";
import { useDeltakerSpørsmål } from "@/app/_api_hooks/deltaker/useDeltakerSpørsmål";
import CookieHandler from "@/utils/CookieHandler";
import { DeltakerSpørsmålDto } from "@/app/_types/DeltakerSpørsmålDto";
import { harGyldigSesjonsID } from "@/utils/harGyldigSesjonsID";
import { SvaralternativDto } from "@/app/_types/SvaralternativDto";
import {
  arbeidsmiljøDeltaker2,
  partssamarbeidDeltaker1,
  partssamarbeidDeltaker2,
  partssamarbeidDeltaker4,
  //@ts-ignore
} from "@/utils/dummydata";

const testSpørreundersøkelseId: string = "85ed4b72-d93c-443e-8bb1-101e9e64b667";
const testSpørsmålId: string = partssamarbeidDeltaker1.spørsmål.id;
const testTemaId: number = 1;
const førsteSpørsmålPartssamarbeid: DeltakerSpørsmålDto =
  partssamarbeidDeltaker1;

const sisteSpørsmålPartssamarbeid: DeltakerSpørsmålDto =
  partssamarbeidDeltaker4;
const sisteSpørsmålArbeidsmiljø: DeltakerSpørsmålDto = arbeidsmiljøDeltaker2;

const flervalgSpørsmålPartssamarbeid: DeltakerSpørsmålDto =
  partssamarbeidDeltaker2;

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: jest.fn(() => null),
  })),
}));

jest.mock("@/app/_api_hooks/deltaker/sendSvar", () => ({
  sendSvar: jest.fn(() => Promise.resolve()),
}));

jest.mock("@/app/_api_hooks/deltaker/useDeltakerSpørsmål", () => ({
  useDeltakerSpørsmål: jest.fn(),
}));

jest.mock("@/utils/harGyldigSesjonsID", () => ({
  harGyldigSesjonsID: jest.fn(() => Promise.resolve(false)),
}));

mockCookieHandler();

expect.extend(toHaveNoViolations);

describe("deltaker/Spørsmålsside", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useDeltakerSpørsmål).mockReturnValue({
      data: førsteSpørsmålPartssamarbeid,
      isLoading: false,
      error: null,
      mutate: jest.fn(() => Promise.resolve(førsteSpørsmålPartssamarbeid)),
      isValidating: false,
    });

    jest.mocked(harGyldigSesjonsID).mockReturnValue(Promise.resolve(true));

    jest
      .spyOn(CookieHandler, "getSvarPåSpørsmål")
      .mockImplementation(() => undefined);
  });

  test("rett innhold blir tegnet opp", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTemaId,
        }}
      />,
    );

    expect(
      screen.getByText(førsteSpørsmålPartssamarbeid.spørsmål.tekst),
    ).toBeInTheDocument();

    førsteSpørsmålPartssamarbeid.spørsmål.svaralternativer.forEach(
      (svar: SvaralternativDto) => {
        expect(screen.getByText(svar.tekst)).toBeInTheDocument();
      },
    );
  });

  test("klikk på svaralternativ", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTemaId,
        }}
      />,
    );

    const svar = await screen.findByText(
      førsteSpørsmålPartssamarbeid.spørsmål.svaralternativer[0].tekst,
    );
    act(() => svar.click());

    const neste = await screen.findByRole("button", { name: /Svar/i });
    await act(async () => neste.click());

    expect(sendSvar).toHaveBeenCalledTimes(1);
    expect(sendSvar).toHaveBeenCalledWith({
      spørreundersøkelseId: testSpørreundersøkelseId,
      temaId: testTemaId,
      spørsmålId: testSpørsmålId,
      svarIder: [førsteSpørsmålPartssamarbeid.spørsmål.svaralternativer[0].id],
    });
  });

  test("Velg og send svar", async () => {
    jest.mocked(useDeltakerSpørsmål).mockReturnValue({
      data: førsteSpørsmålPartssamarbeid,
      isLoading: false,
      error: null,
      mutate: jest.fn(() => Promise.resolve(førsteSpørsmålPartssamarbeid)),
      isValidating: false,
    });
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
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTemaId,
        }}
      />,
    );

    const svar = screen.getByText(
      førsteSpørsmålPartssamarbeid.spørsmål.svaralternativer[0].tekst,
    );
    act(() => svar.click());

    const neste = screen.getByRole("button", { name: /Svar/i });
    await act(async () => neste.click());

    expect(sendSvar).toHaveBeenCalledTimes(1);
    expect(sendSvar).toHaveBeenCalledWith({
      spørreundersøkelseId: testSpørreundersøkelseId,
      spørsmålId: testSpørsmålId,
      temaId: testTemaId,
      svarIder: [førsteSpørsmålPartssamarbeid.spørsmål.svaralternativer[0].id],
    });

    expect(pushFunction).toHaveBeenCalledTimes(1);
    expect(pushFunction).toHaveBeenCalledWith(
      `../../../tema/${førsteSpørsmålPartssamarbeid.nesteSpørsmål?.temaId}/sporsmal/${førsteSpørsmålPartssamarbeid.nesteSpørsmål?.spørsmålId}`,
    );
  });

  test("Siste spørsmål i tema redirecter til første i neste tema", async () => {
    jest.mocked(useDeltakerSpørsmål).mockReturnValue({
      data: sisteSpørsmålPartssamarbeid,
      isLoading: false,
      error: null,
      mutate: jest.fn(() => Promise.resolve(førsteSpørsmålPartssamarbeid)),
      isValidating: false,
    });
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
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTemaId,
        }}
      />,
    );

    const svar = screen.getByText(
      sisteSpørsmålPartssamarbeid.spørsmål.svaralternativer[0].tekst,
    );
    act(() => svar.click());

    const neste = screen.getByRole("button", { name: /Svar/i });
    await act(async () => neste.click());

    expect(sendSvar).toHaveBeenCalledTimes(1);
    expect(sendSvar).toHaveBeenCalledWith({
      spørreundersøkelseId: testSpørreundersøkelseId,
      spørsmålId: testSpørsmålId,
      temaId: testTemaId,
      svarIder: [sisteSpørsmålPartssamarbeid.spørsmål.svaralternativer[0].id],
    });

    expect(pushFunction).toHaveBeenCalledTimes(1);
    expect(pushFunction).toHaveBeenCalledWith(
      `../../../tema/${sisteSpørsmålPartssamarbeid.nesteSpørsmål?.temaId}/sporsmal/${sisteSpørsmålPartssamarbeid.nesteSpørsmål?.spørsmålId}`,
    );
  });

  test("Siste spørsmål i siste tema redirecter til ferdigside", async () => {
    jest.mocked(useDeltakerSpørsmål).mockReturnValue({
      data: sisteSpørsmålArbeidsmiljø,
      isLoading: false,
      error: null,
      mutate: jest.fn(() => Promise.resolve(førsteSpørsmålPartssamarbeid)),
      isValidating: false,
    });
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
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTemaId,
        }}
      />,
    );

    const svar = screen.getByText(
      sisteSpørsmålArbeidsmiljø.spørsmål.svaralternativer[0].tekst,
    );
    act(() => svar.click());

    const neste = screen.getByRole("button", { name: /Svar/i });
    await act(async () => neste.click());

    expect(sendSvar).toHaveBeenCalledTimes(1);
    expect(sendSvar).toHaveBeenCalledWith({
      spørreundersøkelseId: testSpørreundersøkelseId,
      spørsmålId: testSpørsmålId,
      temaId: testTemaId,
      svarIder: [sisteSpørsmålArbeidsmiljø.spørsmål.svaralternativer[0].id],
    });

    expect(pushFunction).toHaveBeenCalledTimes(1);
    expect(pushFunction).toHaveBeenCalledWith(`../../../ferdig`);
  });

  test("axe UU-test", async () => {
    jest.mocked(useDeltakerSpørsmål).mockReturnValue({
      data: førsteSpørsmålPartssamarbeid,
      isLoading: false,
      error: null,
      mutate: jest.fn(() => Promise.resolve(førsteSpørsmålPartssamarbeid)),
      isValidating: false,
    });

    const { container } = render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTemaId,
        }}
      />,
    );

    await act(async () => {
      const result = await axe(container);
      expect(result).toHaveNoViolations();
    });
  });

  test("Bruker valgt svaralternativ fra cookieHandler", async () => {
    const forhåndssvart =
      førsteSpørsmålPartssamarbeid.spørsmål.svaralternativer[1];
    jest
      .spyOn(CookieHandler, "getSvarPåSpørsmål")
      .mockImplementation(() => [forhåndssvart.id]);

    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          temaId: testTemaId,
          sporsmalId: testSpørsmålId,
        }}
      />,
    );

    const svar = await screen.findByRole("radio", {
      name: forhåndssvart.tekst,
    });

    expect(svar).toHaveAttribute("checked");

    const feilSvar = await screen.findByRole("radio", {
      name: førsteSpørsmålPartssamarbeid.spørsmål.svaralternativer[0].tekst,
    });

    expect(feilSvar).not.toHaveAttribute("checked");
  });

  test("Viser riktig tekst i svarknapp i forhold til lagret svar", async () => {
    const forhåndssvart =
      førsteSpørsmålPartssamarbeid.spørsmål.svaralternativer[1];
    jest
      .spyOn(CookieHandler, "getSvarPåSpørsmål")
      .mockImplementation(() => [forhåndssvart.id]);

    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: 2,
        }}
      />,
    );

    expect(screen.getByRole("button", { name: /Neste/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Endre Svar/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /^Svar/i }),
    ).not.toBeInTheDocument();

    await screen
      .findByRole("radio", {
        name: førsteSpørsmålPartssamarbeid.spørsmål.svaralternativer[0].tekst,
      })
      .then((radio) => {
        act(() => radio.click());
      });

    expect(
      screen.getByRole("button", { name: /Endre Svar/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Neste/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /^Svar/i }),
    ).not.toBeInTheDocument();
  });

  test("Viser riktig tekst i svarknapp uten lagret svar", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTemaId,
        }}
      />,
    );

    await screen
      .findByRole("radio", {
        name: førsteSpørsmålPartssamarbeid.spørsmål.svaralternativer[0].tekst,
      })
      .then((radio) => {
        act(() => radio.click());
      });

    expect(screen.getByRole("button", { name: /^Svar/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Neste/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Endre Svar/i }),
    ).not.toBeInTheDocument();
  });

  test("Viser feilmelding dersom vi har error og loading", () => {
    jest.mocked(useDeltakerSpørsmål).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: new Error("Noe gikk galt."),
      mutate: jest.fn(() => Promise.resolve(førsteSpørsmålPartssamarbeid)),
      isValidating: false,
    });

    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTemaId,
        }}
      />,
    );

    expect(screen.getByText("Noe gikk galt.")).toBeInTheDocument();
  });

  test("Viser 'venter på vert' dersom vi ikke har spørsmål, men loading", () => {
    window.localStorage.setItem("sisteTema", JSON.stringify("Partssamarbeid"));
    jest.mocked(useDeltakerSpørsmål).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      mutate: jest.fn(() => Promise.resolve(førsteSpørsmålPartssamarbeid)),
      isValidating: false,
    });

    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTemaId,
        }}
      />,
    );

    expect(screen.getByText("Takk!")).toBeInTheDocument();
  });

  test("Viser checkbokser for flervalgsspørsmål", async () => {
    jest.mocked(useDeltakerSpørsmål).mockReturnValue({
      data: flervalgSpørsmålPartssamarbeid,
      isLoading: false,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
    });

    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          temaId: testTemaId,
          sporsmalId: testSpørsmålId,
        }}
      />,
    );

    const checkbokser = screen.queryAllByRole("checkbox");

    expect(checkbokser.length).toBe(
      flervalgSpørsmålPartssamarbeid.spørsmål.svaralternativer.length,
    );

    const radiobuttons = screen.queryAllByRole("radio");
    expect(radiobuttons.length).toBe(0);
  });

  test("Viser radio buttons for vanlige spørsmål", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          temaId: testTemaId,
          sporsmalId: testSpørsmålId,
        }}
      />,
    );

    const checkbokser = screen.queryAllByRole("checkbox");

    expect(checkbokser.length).toBe(0);

    const radiobuttons = screen.queryAllByRole("radio");
    expect(radiobuttons.length).toBe(
      førsteSpørsmålPartssamarbeid.spørsmål.svaralternativer.length,
    );
  });

  test("Redirecter tilbake til bli-med dersom vi ikke har en sesjon", async () => {
    jest.mocked(harGyldigSesjonsID).mockReturnValue(Promise.resolve(false));
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
          uuid: testSpørreundersøkelseId,
          temaId: testTemaId,
          sporsmalId: testSpørsmålId,
        }}
      />,
    );

    await waitFor(() => {
      expect(pushFunction).toHaveBeenCalledTimes(1);
    });
    expect(pushFunction).toHaveBeenCalledWith("../../deltaker?sesjon=utløpt");
  });

  test("Redirecter ikke hvis vi har en sesjon", async () => {
    jest.mocked(harGyldigSesjonsID).mockReturnValue(Promise.resolve(true));
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
          uuid: testSpørreundersøkelseId,
          temaId: testTemaId,
          sporsmalId: testSpørsmålId,
        }}
      />,
    );

    await waitFor(() => {
      expect(pushFunction).toHaveBeenCalledTimes(0);
    });
  });
});
