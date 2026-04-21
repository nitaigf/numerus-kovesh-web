import { fireEvent, render, screen, waitFor } from "@solidjs/testing-library";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          input: "Nitai Embrás",
          normalized: "NITAIEMBRAS",
          letters: [
            { char: "N", value: 5 },
            { char: "I", value: 9 },
            { char: "T", value: 2 },
            { char: "A", value: 1 },
            { char: "I", value: 9 },
            { char: "E", value: 5 },
            { char: "M", value: 4 },
            { char: "B", value: 2 },
            { char: "R", value: 9 },
            { char: "A", value: 1 },
            { char: "S", value: 1 }
          ],
          sum: 48,
          reduced: 3,
          is_master: false,
          meaning: "Comunicacao"
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
      expect(screen.getByText("Comunicacao")).toBeInTheDocument();
    });

    expect(screen.getByText("NITAIEMBRAS")).toBeInTheDocument();
    expect(screen.getByText("48")).toBeInTheDocument();
  });
});