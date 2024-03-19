import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Spørsmålsside from "./page";
import {
  spørsmålOgSvarDTO,
  svaralternativDTO,
} from "@/app/_types/sporreundersokelseDTO";
// @ts-ignore
import { dummySpørreundersøkelse } from "@/utils/dummydata";
import { axe, toHaveNoViolations } from "jest-axe";
import { postEnkeltSvar } from "@/app/_api_hooks/deltaker/svar";
import { useRouter } from "next/navigation";
import mockCookieHandler from "@/utils/jest-mocks/CookieHandler";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/deltaker/useSpørsmålOgSvar";
import CookieHandler from "@/utils/CookieHandler";
import { Tema } from "@/app/_types/temaDTO";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: jest.fn(() => null),
  })),
}));

jest.mock("@/app/_api_hooks/deltaker/useSpørsmålOgSvar", () => ({
  useSpørsmålOgSvar: jest.fn(),
}));

mockCookieHandler();

jest.mock("@/app/_api_hooks/deltaker/svar", () => ({
  postEnkeltSvar: jest.fn(() => Promise.resolve()),
}));

expect.extend(toHaveNoViolations);
describe("Spørsmålsside", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: dummySpørreundersøkelse[0],
      isLoading: false,
      error: null,
      mutate: jest.fn(() => Promise.resolve(dummySpørreundersøkelse[0])),
      isValidating: false,
    });

    jest
      .spyOn(CookieHandler, "getSvarPåSpørsmål")
      .mockImplementation(() => undefined);
  });
  test("render fungerer", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: "a",
          sporsmalId: "b",
          temaId: Tema.REDUSERE_SYKEFRAVÆR,
        }}
      />,
    );

    const tittel = await screen.findByText(dummySpørreundersøkelse[0].spørsmål);

    expect(tittel).toBeInTheDocument();

    dummySpørreundersøkelse[0].svaralternativer.forEach(
      (svar: svaralternativDTO) => {
        expect(screen.getByText(svar.tekst)).toBeInTheDocument();
      },
    );
  });

  test("klikk på svaralternativ", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: "a",
          sporsmalId: dummySpørreundersøkelse[0].id,
          temaId: Tema.REDUSERE_SYKEFRAVÆR,
        }}
      />,
    );

    const svar = await screen.findByText(
      dummySpørreundersøkelse[0].svaralternativer[0].tekst,
    );
    act(() => svar.click());

    const neste = await screen.findByRole("button", { name: /Svar/i });
    await act(async () => neste.click());

    expect(postEnkeltSvar).toHaveBeenCalledTimes(1);
    expect(postEnkeltSvar).toHaveBeenCalledWith({
      spørreundersøkelseId: "a",
      temaId: Tema.REDUSERE_SYKEFRAVÆR,
      spørsmålId: dummySpørreundersøkelse[0].id,
      svarId: dummySpørreundersøkelse[0].svaralternativer[0].id,
    });
  });

  // TODO: denne testen virker ikke med endring av neste-side
  // test("klikk på tilbake", async () => {
  //   const pushFunction = jest.fn();
  //
  //   jest.mocked(useRouter).mockReturnValue({
  //     push: pushFunction,
  //     back: jest.fn(),
  //     prefetch: jest.fn(),
  //     forward: jest.fn(),
  //     replace: jest.fn(),
  //     refresh: jest.fn(),
  //   });
  //   render(
  //     <Spørsmålsside
  //       params={{
  //         uuid: "a",
  //         sporsmalId: "b",
  //         temaId: Tema.REDUSERE_SYKEFRAVÆR,
  //       }}
  //     />,
  //   );
  //   expect(pushFunction).toHaveBeenCalledTimes(0);
  //
  //   const tilbake = await screen.findByRole("button", { name: /Tilbake/i });
  //   await act(async () => tilbake.click());
  //
  //   expect(pushFunction).toHaveBeenCalledTimes(1);
  //   expect(pushFunction).toHaveBeenCalledWith("./b/tilbake");
  // });

  test.each<spørsmålOgSvarDTO>(dummySpørreundersøkelse)(
    "Velg og send svar",
    async (undersøkelse) => {
      const { id, svaralternativer } = undersøkelse;
      jest.mocked(useSpørsmålOgSvar).mockReturnValue({
        data: undersøkelse,
        isLoading: false,
        error: null,
        mutate: jest.fn(() => Promise.resolve(undersøkelse)),
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
            uuid: "a",
            sporsmalId: id,
            temaId: Tema.REDUSERE_SYKEFRAVÆR,
          }}
        />,
      );

      const svar = screen.getByText(svaralternativer[0].tekst);
      act(() => svar.click());

      const neste = screen.getByRole("button", { name: /Svar/i });
      await act(async () => neste.click());

      expect(postEnkeltSvar).toHaveBeenCalledTimes(1);
      expect(postEnkeltSvar).toHaveBeenCalledWith({
        spørreundersøkelseId: "a",
        spørsmålId: id,
        temaId: Tema.REDUSERE_SYKEFRAVÆR,
        svarId: svaralternativer[0].id,
      });
    },
  );

  test.each<spørsmålOgSvarDTO>(dummySpørreundersøkelse)(
    "axe UU-test",
    async (undersøkelse) => {
      const { id } = undersøkelse;
      jest.mocked(useSpørsmålOgSvar).mockReturnValue({
        data: undersøkelse,
        isLoading: false,
        error: null,
        mutate: jest.fn(() => Promise.resolve(undersøkelse)),
        isValidating: false,
      });

      const { container } = render(
        <Spørsmålsside
          params={{
            uuid: "a",
            sporsmalId: id,
            temaId: Tema.REDUSERE_SYKEFRAVÆR,
          }}
        />,
      );

      await act(async () => {
        const result = await axe(container);
        expect(result).toHaveNoViolations();
      });
    },
  );

  test("Bruker valgt svaralternativ fra cookieHandler", async () => {
    const forhåndssvart = dummySpørreundersøkelse[0].svaralternativer[1];
    jest
      .spyOn(CookieHandler, "getSvarPåSpørsmål")
      .mockImplementation(() => forhåndssvart.id);

    render(
      <Spørsmålsside
        params={{ uuid: "a", sporsmalId: dummySpørreundersøkelse[0].id }}
      />,
    );

    const svar = await screen.findByRole("radio", {
      name: forhåndssvart.tekst,
    });

    expect(svar).toHaveAttribute("checked");

    const feilSvar = await screen.findByRole("radio", {
      name: dummySpørreundersøkelse[0].svaralternativer[0].tekst,
    });

    expect(feilSvar).not.toHaveAttribute("checked");
  });

  test("Viser riktig tekst i svarknapp i forhold til lagret svar", async () => {
    const forhåndssvart = dummySpørreundersøkelse[0].svaralternativer[1];
    jest
      .spyOn(CookieHandler, "getSvarPåSpørsmål")
      .mockImplementation(() => forhåndssvart.id);

    render(
      <Spørsmålsside
        params={{
          uuid: "a",
          sporsmalId: dummySpørreundersøkelse[0].id,
          temaId: Tema.REDUSERE_SYKEFRAVÆR,
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
        name: dummySpørreundersøkelse[0].svaralternativer[0].tekst,
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
          uuid: "a",
          sporsmalId: dummySpørreundersøkelse[0].id,
          temaId: Tema.REDUSERE_SYKEFRAVÆR,
        }}
      />,
    );

    await screen
      .findByRole("radio", {
        name: dummySpørreundersøkelse[0].svaralternativer[0].tekst,
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
});
