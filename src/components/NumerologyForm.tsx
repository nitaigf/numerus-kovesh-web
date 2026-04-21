interface NumerologyFormProps {
  text: string;
  loading: boolean;
  onTextChange: (value: string) => void;
  onSubmit: (event: SubmitEvent) => void;
}

export default function NumerologyForm(props: NumerologyFormProps) {
  return (
    <form class="oracle-form" onSubmit={props.onSubmit}>
      <label class="field">
        <span>Nome ou palavra</span>
        <textarea
          rows="3"
          value={props.text}
          onInput={(event) => props.onTextChange(event.currentTarget.value)}
          placeholder="Ex.: Nitai Garcia Fernandes"
          required
        />
      </label>

      <button type="submit" class="primary-btn" disabled={props.loading}>
        {props.loading ? "Interpretando simbolos..." : "Calcular numerologia"}
      </button>
    </form>
  );
}