import { useTemaoversikter } from "@/app/_api_hooks/vert/useTemaoversikter";
import { TemaStatus } from "@/app/_types/TemaStatus";
// @ts-ignore
import { helSpørreundersøkelse } from "@/utils/dummydata";
import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Oversiktside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

const pushMock = jest.fn(() => null);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: pushMock,
  })),
  usePathname: jest.fn(() => "/"),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => null),
  })),
}));

jest.mock("@/app/_api_hooks/vert/useTemaoversikter", () => ({
  useTemaoversikter: jest.fn(() => ({
    data: helSpørreundersøkelse,
    isLoading: false,
    error: undefined,
  })),
}));

describe("Oversiktside", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useTemaoversikter).mockReturnValue({
      data: helSpørreundersøkelse,
      isLoading: false,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
    });
  });

  test("rett innhold blir tegnet opp", async () => {
    render(<Oversiktside params={{ uuid: "uuid" }} />);
    const tittel = await screen.findByText("Vis QR-kode");
    expect(tittel).toBeInTheDocument();
  });

  test("axe UU-test", async () => {
    const { container } = render(<Oversiktside params={{ uuid: "uuid" }} />);
    const results = await axe(container, {
      rules: {
        "svg-img-alt": { enabled: false }, // TODO: Fiks alt-tekst på svg (qr-kode) før denne testen kan slås på.
      },
    });
    expect(results).toHaveNoViolations();
  });

  test("Andre tema er ikke åpnet før første tema er besvart", async () => {
    jest.mocked(useTemaoversikter).mockReturnValue({
      data: [
        {
          ...helSpørreundersøkelse[0],
          status: TemaStatus.ÅPNET,
        },
        {
          ...helSpørreundersøkelse[1],
          status: TemaStatus.IKKE_ÅPNET,
        },
      ],
      isLoading: false,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
    });
    render(<Oversiktside params={{ uuid: "uuid" }} />);
    const fortsettKnapp = screen.queryByText("Gjenoppta");
    expect(fortsettKnapp).not.toBeInTheDocument();

    const startknapper = screen.getAllByRole("button", { name: "Start" });
    expect(startknapper).toHaveLength(2);
    expect(startknapper[0]).not.toBeDisabled();
    expect(startknapper[1]).toBeDisabled();

    expect(pushMock).not.toHaveBeenCalled();

    act(() => startknapper[0].click());
    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith(
      `./tema/${helSpørreundersøkelse[0].id}`,
    );
    act(() => startknapper[1].click());
    expect(pushMock).toHaveBeenCalledTimes(1);
  });

  test("Andre tema er åpnet når første tema er besvart", async () => {
    jest.mocked(useTemaoversikter).mockReturnValue({
      data: [
        {
          ...helSpørreundersøkelse[0],
          status: TemaStatus.ALLE_SPØRSMÅL_ÅPNET,
        },
        {
          ...helSpørreundersøkelse[1],
          status: TemaStatus.ÅPNET,
        },
      ],
      isLoading: false,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
    });
    render(<Oversiktside params={{ uuid: "uuid" }} />);
    const fortsettKnapp = screen.getByText("Vis spørsmål");
    expect(fortsettKnapp).toBeInTheDocument();
    expect(fortsettKnapp).not.toBeDisabled();

    const startknapper = screen.getAllByRole("button", { name: "Start" });
    expect(startknapper).toHaveLength(1);
    expect(startknapper[0]).not.toBeDisabled();

    expect(pushMock).not.toHaveBeenCalled();
    act(() => startknapper[0].click());
    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith(
      `./tema/${helSpørreundersøkelse[1].id}`,
    );
    act(() => fortsettKnapp.click());
    expect(pushMock).toHaveBeenCalledTimes(2);
    expect(pushMock).toHaveBeenCalledWith(
      `./tema/${helSpørreundersøkelse[0].id}`,
    );
  });
});
