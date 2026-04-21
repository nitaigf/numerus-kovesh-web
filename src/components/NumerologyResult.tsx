import { For, Show } from "solid-js";
import type { NumerologyResponse } from "../types/numerology";

interface NumerologyResultProps {
  result: NumerologyResponse;
}

export default function NumerologyResult(props: NumerologyResultProps) {
  return (
    <section class="result-shell" aria-live="polite">
      <div class="result-hero">
        <p class="hero-label">Numero final</p>
        <div class="result-number">{props.result.reduced}</div>
        <p class="hero-meaning">{props.result.meaning}</p>
        <Show when={props.result.is_master}>
          <p class="master-badge">Numero mestre reconhecido</p>
        </Show>
      </div>

      <div class="result-grid">
        <article class="result-card">
          <h2>Leitura</h2>
          <p><strong>Entrada:</strong> {props.result.input}</p>
          <p><strong>Normalizado:</strong> {props.result.normalized}</p>
          <p><strong>Soma:</strong> {props.result.sum}</p>
          <p><strong>Reducao:</strong> {props.result.reduced}</p>
        </article>

        <article class="result-card">
          <h2>Letras e valores</h2>
          <div class="letter-grid">
            <For each={props.result.letters}>
              {(item) => (
                <div class="letter-chip">
                  <span>{item.char}</span>
                  <strong>{item.value}</strong>
                </div>
              )}
            </For>
          </div>
        </article>
      </div>
    </section>
  );
}