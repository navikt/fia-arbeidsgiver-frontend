import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Nesteside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";
import mockCookieHandler, {
  mockCookieHandlerEmpty,
} from "@/utils/jest-mocks/CookieHandler";
import { useNesteSpørsmål } from "@/app/_api_hooks/deltaker/navigasjon/nesteSpørsmål";
import { nesteSpørsmålDTO } from "@/app/_types/nesteSpørsmålDTO";
import { SWRResponse } from "swr";

const pushFunction = jest.fn(() => null);
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: pushFunction,
  })),
}));

expect.extend(toHaveNoViolations);

jest.mock("@/app/_api_hooks/deltaker/navigasjon/nesteSpørsmål", () => ({
  useNesteSpørsmål: jest.fn(),
}));

describe("deltaker/Nesteside", () => {
  beforeEach(() => {
    mockCookieHandler();
    jest.clearAllMocks();
    jest.mocked(useNesteSpørsmål).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      mutate: () => Promise.resolve(undefined),
      isValidating: false,
    });
  });

  test("render fungerer", async () => {
    render(<Nesteside params={{ uuid: "a", sporsmalId: "b" }} />);
    const tittel = await screen.findByText(
      "Venter på at verten skal åpne neste spørsmål",
    );
    expect(tittel).toBeInTheDocument();
    expect(pushFunction).not.toHaveBeenCalled();
  });

  test("render fungerer fra start", async () => {
    render(<Nesteside params={{ uuid: "a", sporsmalId: "START" }} />);
    const tittel = await screen.findByText(
      "Venter på at verten skal starte kartlegging",
    );
    expect(tittel).toBeInTheDocument();
    expect(pushFunction).not.toHaveBeenCalled();
  });

  test.each<[SWRResponse<nesteSpørsmålDTO>, string]>([
    [
      {
        data: {
          hvaErNesteSteg: "FERDIG",
          nesteSpørsmålId: null,
          erNesteÅpnetAvVert: false,
          forrigeSpørsmålId: "a",
        },
        isLoading: false,
        isValidating: false,
        error: null,
        mutate: () => Promise.resolve(undefined),
      },
      "../../ferdig",
    ],
    [
      {
        data: {
          hvaErNesteSteg: "NYTT_SPØRSMÅL",
          nesteSpørsmålId: "c",
          erNesteÅpnetAvVert: true,
          forrigeSpørsmålId: "a",
        },
        isLoading: false,
        isValidating: false,
        error: null,
        mutate: () => Promise.resolve(undefined),
      },
      "../c",
    ],
  ])(
    "at den prøver å navigere riktig",
    async (nesteSpørsmålVerdi, forventet) => {
      const { rerender } = render(
        <Nesteside params={{ uuid: "a", sporsmalId: "b" }} />,
      );
      expect(pushFunction).not.toHaveBeenCalled();

      jest.mocked(useNesteSpørsmål).mockReturnValue(nesteSpørsmålVerdi);

      rerender(<Nesteside params={{ uuid: "a", sporsmalId: "b" }} />);

      expect(pushFunction).toHaveBeenCalledTimes(1);
      expect(pushFunction).toHaveBeenCalledWith(forventet);
    },
  );

  test("Den prøver å navigere vekk uten cookie", async () => {
    mockCookieHandlerEmpty();
    expect(pushFunction).not.toHaveBeenCalled();
    render(<Nesteside params={{ uuid: "a", sporsmalId: "b" }} />);
    expect(pushFunction).toHaveBeenCalledTimes(1);
    expect(pushFunction).toHaveBeenCalledWith("../..");
  });

  test("axe UU-test", async () => {
    let results = await axe(
      render(<Nesteside params={{ uuid: "a", sporsmalId: "b" }} />).container,
    );
    expect(results).toHaveNoViolations();
    expect(pushFunction).not.toHaveBeenCalled();

    results = await axe(
      render(<Nesteside params={{ uuid: "START", sporsmalId: "b" }} />)
        .container,
    );
    expect(results).toHaveNoViolations();
    expect(pushFunction).not.toHaveBeenCalled();
  });
});
