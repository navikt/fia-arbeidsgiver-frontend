import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Oversiktside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";

// @ts-ignore
import { dummyTemaoversikt } from "@/utils/dummyData/vert";

expect.extend(toHaveNoViolations);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: jest.fn(() => null),
  })),
  usePathname: jest.fn(() => "/"),
}));

jest.mock("@/app/_api_hooks/vert/useTemaoversikt", () => ({
  useTemaoversikt: () => ({
    data: dummyTemaoversikt,
    isLoading: false,
    error: undefined,
  }),
}));

describe("Oversiktside", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
