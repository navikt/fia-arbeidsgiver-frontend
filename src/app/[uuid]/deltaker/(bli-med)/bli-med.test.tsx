import "@testing-library/jest-dom";
import Landingsside from "./page";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { act } from "react-dom/test-utils";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: jest.fn(() => null),
  })),
}));
expect.extend(toHaveNoViolations);

describe("bli-med", () => {
  test(`Viser sesjon utløpt varsel med sesjon`, () => {
    render(
      <Landingsside
        params={{ uuid: "uuid" }}
        searchParams={{ sesjon: "utløpt" }}
      />,
    );

    expect(
      screen.getByText("Sesjonen din har utløpt. Vennligst start på nytt."),
    ).toBeInTheDocument();
  });

  test(`Viser ikke sesjon utløpt varsel uten sesjon`, () => {
    render(<Landingsside params={{ uuid: "uuid" }} searchParams={{}} />);

    expect(
      screen.queryByText("Sesjonen din har utløpt. Vennligst start på nytt."),
    ).not.toBeInTheDocument();
  });

  test.each([{ sesjon: "utløpt" }, {}])(
    `axe UU-test, searchParams: %p`,
    async ({ sesjon }: { sesjon?: string }) => {
      const { container } = render(
        <Landingsside params={{ uuid: "uuid" }} searchParams={{ sesjon }} />,
      );

      await act(async () => {
        const result = await axe(container, {
          rules: {
            "svg-img-alt": { enabled: false }, // TODO: Fiks alt-tekst på svg (qr-kode) før denne testen kan slås på.
          },
        });
        expect(result).toHaveNoViolations();
      });
    },
  );
});
