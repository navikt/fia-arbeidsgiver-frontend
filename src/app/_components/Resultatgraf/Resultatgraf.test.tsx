import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Resultatgraf from "@/app/_components/Resultatgraf/index";

describe("Resultatgraf", () => {
  test("Tegner graf", () => {
    render(
      <Resultatgraf
        spørsmål={{
          tekst: "Hva er din favorittfarge?",
          svarListe: [
            { tekst: "QWER", antallSvar: 10 },
            { tekst: "ASDF", antallSvar: 20 },
            { tekst: "ZXCV", antallSvar: 10 },
            { tekst: "ÆØÅ", antallSvar: 10 },
          ],
        }}
      />,
    );
    expect(screen.getByText("Hva er din favorittfarge?")).toBeInTheDocument();
  });

  test("Tegner riktig farge og bredde på svar.", () => {
    const farger = ["#f0f", "#ff0", "#0ff", "#0f0"];
    render(
      <Resultatgraf
        spørsmål={{
          tekst: "Hva er din favorittfarge?",
          svarListe: farger.map((farge, index) => ({
            tekst: farge,
            antallSvar: index + 1,
          })),
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
