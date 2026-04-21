import { Show, createSignal } from "solid-js";
import NumerologyForm from "./components/NumerologyForm";
import NumerologyResult from "./components/NumerologyResult";
import StarfieldCanvas from "./components/StarfieldCanvas";
import { fetchNumerology } from "./services/api";
import type { NumerologyResponse } from "./types/numerology";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8010").replace(/\/+$/, "");
const OPENAPI_URL = `${API_BASE_URL}/?doc=openapi`;
const REDOC_URL = `${API_BASE_URL}/?doc=redoc`;

export default function App() {
  const [text, setText] = createSignal("Nitai Embrás");
  const [result, setResult] = createSignal<NumerologyResponse | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const nextResult = await fetchNumerology({ text: text() });
      setResult(nextResult);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha inesperada ao consultar a API.";
      setError(message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main class="page-shell">
      <StarfieldCanvas />
      <div class="page-veils" aria-hidden="true" />

      <section class="oracle-panel">
        <div class="intro-copy">
          <p class="eyebrow">Numerologia pitagorica</p>
          <h1>Converta nomes em simbolos numericos com uma leitura limpa e imediata.</h1>
          <p class="lede">
            O calculo normaliza o texto, mapeia cada letra, soma os valores e reduz o resultado ate um numero base ou mestre.
          </p>

          <div class="docs-links" aria-label="Links da documentacao da API">
            <a class="doc-link" href={OPENAPI_URL} target="_blank" rel="noreferrer">
              OpenAPI
            </a>
            <a class="doc-link" href={REDOC_URL} target="_blank" rel="noreferrer">
              ReDoc
            </a>
          </div>
        </div>

        <NumerologyForm text={text()} loading={loading()} onTextChange={setText} onSubmit={submit} />

        <Show when={error()}>
          <div class="error-box" role="alert">
            {error()}
          </div>
        </Show>

        <Show when={result()}>{(current) => <NumerologyResult result={current()} />}</Show>
      </section>
    </main>
  );
}