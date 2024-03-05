import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Resultatgraf from "@/app/_components/Resultatgraf/index";

describe("Resultatgraf", () => {
  test("Tegner graf", () => {
    render(
      <Resultatgraf
        spørsmål={{
          spørsmålId: "1",
          tekst: "Hva er din favorittfarge?",
          svarListe: [
            { svarId: "1", tekst: "QWER", antallSvar: 10, prosent: 20 },
            { svarId: "2", tekst: "ASDF", antallSvar: 20, prosent: 40 },
            { svarId: "3", tekst: "ZXCV", antallSvar: 10, prosent: 20 },
            { svarId: "4", tekst: "ÆØÅ", antallSvar: 10, prosent: 20 },
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
          spørsmålId: "1",
          tekst: "Hva er din favorittfarge?",
          svarListe: farger.map((farge, index) => ({
            svarId: (index + 1).toString(),
            tekst: farge,
            antallSvar: index + 1,
            prosent: (index + 1) * 10,
          })),
        }}
        farger={farger}
      />,
    );

    farger.forEach((farge, index) => {
      const bar = screen.getByText(`${(index + 1) * 10}%`);
      expect(bar).toHaveStyle({
        backgroundColor: farge,
        width: `${(index + 1) * 10}%`,
      });
    });
  });
});
