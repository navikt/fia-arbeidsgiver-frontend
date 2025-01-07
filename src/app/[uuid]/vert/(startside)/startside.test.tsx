import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Startside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";
import { useRouter } from "next/navigation";

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
    data: 0,
    isLoading: false,
    error: undefined,
  }),
}));

jest.mock("@/app/_api_hooks/vert/useSpørreundersøkelseInfo", () => ({
  useSpørreundersøkelseInfo: jest.fn(() => ({
    data: {
      type: "Behovsvurdering",
      virksomhetsnavn: "Virksomhetsnavn",
      samarbeidsnavn: "Samarbeidsnavn"
    },
    isLoading: false,
    error: undefined,
  })),
}));

describe("Startside", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("rett innhold blir tegnet opp", async () => {
    render(<Startside params={{ uuid: "uuid" }} />);
    const tittel = await screen.findByText(
      "Psst! Har du med mobiltelefonen din?",
    );
    expect(tittel).toBeInTheDocument();
  });

  test("Klikk på kom i gang", async () => {
    const pushFunction = jest.fn();
    jest.mocked(useRouter).mockReturnValue({
      push: pushFunction,
      back: jest.fn(),
      prefetch: jest.fn(),
      forward: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
    });
    render(<Startside params={{ uuid: "uuid" }} />);

    const komIGang = await screen.findByRole("button", { name: /Start behovsvurderingen/i });
    act(() => komIGang.click());
    expect(pushFunction).toHaveBeenCalledTimes(1);
    expect(pushFunction).toHaveBeenCalledWith(
      `./vert/introside`,
    );
  });

  test("axe UU-test", async () => {
    const { container } = render(<Startside params={{ uuid: "uuid" }} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
