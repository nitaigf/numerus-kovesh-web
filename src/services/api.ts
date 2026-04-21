import type { NumerologyRequestPayload, NumerologyResponse } from "../types/numerology";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8010").replace(/\/+$/, "");

export async function fetchNumerology(payload: NumerologyRequestPayload): Promise<NumerologyResponse> {
  const response = await fetch(`${API_BASE_URL}/v1/numerology`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData?.detail?.message || errorData?.detail || "Falha ao calcular numerologia. Verifique o texto e tente novamente.";
    throw new Error(String(message));
  }

  return (await response.json()) as NumerologyResponse;
}