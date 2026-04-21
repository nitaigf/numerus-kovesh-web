export interface NumerologyRequestPayload {
  text: string;
}

export interface LetterValue {
  char: string;
  value: number;
}

export interface NumerologyResponse {
  input: string;
  normalized: string;
  letters: LetterValue[];
  sum: number;
  reduced: number;
  is_master: boolean;
  meaning: string;
}