import { fireEvent, render, screen, waitFor } from "@solidjs/testing-library";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          input: "Nitai Garcia Fernandes",
          normalized: "NITAIGARCIAFERNANDES",
          letters: [
            { char: "N", value: 5 },
            { char: "I", value: 9 },
            { char: "T", value: 2 },
            { char: "A", value: 1 },
            { char: "I", value: 9 },
            { char: "G", value: 7 },
            { char: "A", value: 1 },
            { char: "R", value: 9 },
            { char: "C", value: 3 },
            { char: "I", value: 9 },
            { char: "A", value: 1 },
            { char: "F", value: 6 },
            { char: "E", value: 5 },
            { char: "R", value: 9 },
            { char: "N", value: 5 },
            { char: "D", value: 4 },
            { char: "E", value: 5 },
            { char: "S", value: 1 }
          ],
          sum: 85,
          reduced: 4,
          is_master: false,
          meaning: "Estrutura"
        }),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders numerology result after submit", async () => {
    render(() => <App />);

    expect(screen.getByText("Numerologia pitagorica")).toBeInTheDocument();

    fireEvent.submit(screen.getByRole("button", { name: "Calcular numerologia" }));

    await waitFor(() => {
      expect(screen.getByText("Estrutura")).toBeInTheDocument();
    });

    expect(screen.getByText("NITAIGARCIAFERNANDES")).toBeInTheDocument();
    expect(screen.getByText("85")).toBeInTheDocument();
  });
});