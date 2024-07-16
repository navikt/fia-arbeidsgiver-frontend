import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Resultatgraf from "@/app/_components/Resultatgraf/index";

describe("Resultatgraf", () => {
  test("Tegner graf", () => {
    render(
      <Resultatgraf
        spørsmål={{
          id: "a1",
          tekst: "Hva er din favorittfarge?",
          svar: [
            { id: "b1", tekst: "QWER", antallSvar: 10 },
            { id: "b2", tekst: "ASDF", antallSvar: 20 },
            { id: "b3", tekst: "ZXCV", antallSvar: 10 },
            { id: "b4", tekst: "ÆØÅ", antallSvar: 10 },
          ],
          flervalg: false,
        }}
      />,
    );
    expect(screen.getByText("Hva er din favorittfarge?")).toBeInTheDocument();
  });

  test("Tegner riktig farge og bredde på svar.", () => {
    const farger = [
      { bakgrunn: "#f0f" },
      { bakgrunn: "#ff0" },
      { bakgrunn: "#0ff" },
      { bakgrunn: "#0f0" },
    ];
    render(
      <Resultatgraf
        spørsmål={{
          id: "a1",
          tekst: "Hva er din favorittfarge?",
          svar: farger.map((farge, index) => ({
            id: `b${index + 1}`,
            tekst: farge.bakgrunn,
            antallSvar: index + 1,
          })),
          flervalg: false,
        }}
        farger={farger}
        barTestIds={farger.map((_, index) => `bar-${index}`)}
      />,
    );

    farger.forEach((farge, index) => {
      const bar = screen.getByTestId(`bar-${index}`);
      expect(bar).toHaveStyle({
        backgroundColor: farge,
        width: `${(index + 1) * 10}%`,
      });
    });
  });
});
