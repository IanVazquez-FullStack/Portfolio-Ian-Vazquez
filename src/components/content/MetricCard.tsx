type MetricCardProps = {
  value: string;
  label: string;
  context?: string;
};

/**
 * MetricCard muestra una métrica con valor, etiqueta y contexto opcional.
 * Diseñado para no depender únicamente del color como diferenciador semántico (UX-DR9).
 * Incluye texto descriptivo adicional y estructura visual clara.
 */
export function MetricCard({ value, label, context }: MetricCardProps) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
      <span
        className="text-display text-foreground"
        aria-label={`${label}: ${value}${context ? `, ${context}` : ""}`}
      >
        {value}
      </span>
      <span className="text-body font-medium text-muted-foreground">{label}</span>
      {context && (
        <span className="text-caption text-muted-foreground" aria-hidden="false">
          {context}
        </span>
      )}
    </div>
  );
}
