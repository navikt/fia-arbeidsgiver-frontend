import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Oversiktside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";

// @ts-ignore
import { dummyTemaoversikt } from "@/utils/dummyData/vert";
import { useTemaoversikt } from "@/app/_api_hooks/vert/useTemaoversikt";
import { TemaStatus } from "@/app/_types/TemaoversiktDTO";

expect.extend(toHaveNoViolations);

const pushMock = jest.fn(() => null);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: pushMock,
  })),
  usePathname: jest.fn(() => "/"),
}));

jest.mock("@/app/_api_hooks/vert/useTemaoversikt", () => ({
  useTemaoversikt: jest.fn(() => ({
    data: dummyTemaoversikt,
    isLoading: false,
    error: undefined,
  })),
}));

describe("Oversiktside", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useTemaoversikt).mockReturnValue({
      data: dummyTemaoversikt,
      isLoading: false,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
    });
  });

  test("rett innhold blir tegnet opp", async () => {
    render(<Oversiktside params={{ uuid: "uuid", vertId: "vertId" }} />);
    const tittel = await screen.findByText("Vis QR-kode");
    expect(tittel).toBeInTheDocument();
  });

  test("axe UU-test", async () => {
    const { container } = render(
      <Oversiktside params={{ uuid: "uuid", vertId: "vertId" }} />,
    );
    const results = await axe(container, {
      rules: {
        "svg-img-alt": { enabled: false }, // TODO: Fiks alt-tekst på svg (qr-kode) før denne testen kan slås på.
      },
    });
    expect(results).toHaveNoViolations();
  });

  test("Andre tema er ikke åpnet før første tema er besvart", async () => {
    jest.mocked(useTemaoversikt).mockReturnValue({
      data: [
        {
          ...dummyTemaoversikt[0],
          status: TemaStatus.ÅPNET,
        },
        {
          ...dummyTemaoversikt[1],
          status: TemaStatus.IKKE_ÅPNET,
        },
      ],
      isLoading: false,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
    });
    render(<Oversiktside params={{ uuid: "uuid", vertId: "vertId" }} />);
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
      `./tema/${dummyTemaoversikt[0].temaId}`,
    );
    act(() => startknapper[1].click());
    expect(pushMock).toHaveBeenCalledTimes(1);
  });

  test("Andre tema er åpnet når første tema er besvart", async () => {
    jest.mocked(useTemaoversikt).mockReturnValue({
      data: [
        {
          ...dummyTemaoversikt[0],
          status: TemaStatus.ALLE_SPØRSMÅL_ÅPNET,
        },
        {
          ...dummyTemaoversikt[1],
          status: TemaStatus.ÅPNET,
        },
      ],
      isLoading: false,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
    });
    render(<Oversiktside params={{ uuid: "uuid", vertId: "vertId" }} />);
    const fortsettKnapp = screen.getByText("Gjenoppta");
    expect(fortsettKnapp).toBeInTheDocument();
    expect(fortsettKnapp).not.toBeDisabled();

    const startknapper = screen.getAllByRole("button", { name: "Start" });
    expect(startknapper).toHaveLength(1);
    expect(startknapper[0]).not.toBeDisabled();

    expect(pushMock).not.toHaveBeenCalled();
    act(() => startknapper[0].click());
    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith(
      `./tema/${dummyTemaoversikt[1].temaId}`,
    );
    act(() => fortsettKnapp.click());
    expect(pushMock).toHaveBeenCalledTimes(2);
    expect(pushMock).toHaveBeenCalledWith(
      `./tema/${dummyTemaoversikt[0].temaId}`,
    );
  });
});
