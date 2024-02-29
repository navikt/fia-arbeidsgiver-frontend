import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Tilbakeside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";
import mockCookieHandler, {
  mockCookieHandlerEmpty,
} from "@/utils/jest-mocks/CookieHandler";
import { useNesteSpørsmål } from "@/app/_api_hooks/deltaker/navigasjon/nesteSpørsmål";
import { SWRResponse } from "swr";
import { nesteSpørsmålDTO } from "@/app/_types/nesteSpørsmålDTO";

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
describe("deltaker/Tilbakeside", () => {
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
    render(<Tilbakeside params={{ uuid: "a", sporsmalId: "b" }} />);
    const tittel = await screen.findByText("Laster");
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
      "../a",
    ],
    [
      {
        data: {
          hvaErNesteSteg: "NYTT_SPØRSMÅL",
          nesteSpørsmålId: "c",
          erNesteÅpnetAvVert: true,
          forrigeSpørsmålId: "asdf",
        },
        isLoading: false,
        isValidating: false,
        error: null,
        mutate: () => Promise.resolve(undefined),
      },
      "../asdf",
    ],
    [
      {
        data: {
          hvaErNesteSteg: "NYTT_SPØRSMÅL",
          nesteSpørsmålId: "c",
          erNesteÅpnetAvVert: true,
          forrigeSpørsmålId: null,
        },
        isLoading: false,
        isValidating: false,
        error: null,
        mutate: () => Promise.resolve(undefined),
      },
      ".",
    ],
  ])(
    "at den prøver å navigere riktig",
    async (nesteSpørsmålVerdi, forventet) => {
      jest.mocked(useNesteSpørsmål).mockReturnValue(nesteSpørsmålVerdi);
      render(<Tilbakeside params={{ uuid: "a", sporsmalId: "b" }} />);
      expect(pushFunction).toHaveBeenCalledWith(forventet);
    },
  );

  test("Den prøver å navigere vekk uten cookie", async () => {
    mockCookieHandlerEmpty();
    expect(pushFunction).not.toHaveBeenCalled();
    render(<Tilbakeside params={{ uuid: "a", sporsmalId: "b" }} />);
    expect(pushFunction).toHaveBeenCalledWith("../..");
    expect(pushFunction).toHaveBeenCalledWith("../..");
  });

  test("axe UU-test", async () => {
    const { container } = render(
      <Tilbakeside params={{ uuid: "a", sporsmalId: "b" }} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(pushFunction).not.toHaveBeenCalled();
  });
});
