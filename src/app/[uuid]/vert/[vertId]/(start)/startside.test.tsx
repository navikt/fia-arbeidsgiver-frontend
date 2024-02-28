import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Startside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";
import { dummyKartleggingStatus } from "../../../../../../mocks/dummydata";

expect.extend(toHaveNoViolations);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: jest.fn(() => null),
  })),
  usePathname: jest.fn(() => "/"),
}));
jest.mock("@/app/_api_hooks/vert/useKartleggingstatus", () => ({
  useKartleggingstatus: () => ({
    data: dummyKartleggingStatus,
    isLoading: false,
    error: undefined,
  }),
}));
jest.mock("@/app/_api_hooks/vert/useAntallSvar", () => ({
  useAntallDeltakere: () => ({
    data: {
      antallDeltakere: 0,
    },
    isLoading: false,
    error: undefined,
  }),
}));

describe("Startside", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("render fungerer", async () => {
    render(<Startside params={{ uuid: "uuid", vertId: "vertId" }} />);
    const tittel = await screen.findByText(
      "Skann QR-koden for å bli med i undersøkelsen",
    );
    expect(tittel).toBeInTheDocument();
  });

  it("axe UU-test", async () => {
    const { container } = render(
      <Startside params={{ uuid: "uuid", vertId: "vertId" }} />,
    );
    const results = await axe(container, {
      rules: {
        "svg-img-alt": { enabled: false }, // TODO: Fiks alt-tekst på svg (qr-kode) før denne testen kan slås på.
      },
    });
    expect(results).toHaveNoViolations();
  });
});
