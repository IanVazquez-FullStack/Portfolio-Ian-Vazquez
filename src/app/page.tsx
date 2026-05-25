export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background text-foreground">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-8">
        <div className="flex flex-col items-center gap-8 text-center w-full">
          <h1 className="text-display text-foreground">Display Text</h1>
          <h2 className="text-h1 text-foreground">H1 Heading</h2>
          <h3 className="text-h2 text-foreground">H2 Heading</h3>
          <h4 className="text-h3 text-foreground">H3 Heading</h4>
          <p className="text-body-lg text-muted-foreground max-w-md">
            Body Large — Este es un texto de cuerpo grande para demostrar la
            escala tipográfica fluida.
          </p>
          <p className="text-body text-muted-foreground max-w-md">
            Body — Texto de cuerpo estándar que usa los tokens semánticos del
            sistema de diseño.
          </p>
          <p className="text-caption text-muted-foreground">
            Caption — Texto pequeño para etiquetas y metadatos.
          </p>
          <code className="text-code bg-muted px-2 py-1 rounded text-foreground">
            const code = &quot;JetBrains Mono&quot;;
          </code>

          <div className="flex flex-wrap gap-4 mt-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded bg-background border border-border" />
              <span className="text-caption text-muted-foreground">bg</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded bg-foreground" />
              <span className="text-caption text-muted-foreground">fg</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded bg-accent" />
              <span className="text-caption text-muted-foreground">accent</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded bg-muted" />
              <span className="text-caption text-muted-foreground">muted</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded bg-success" />
              <span className="text-caption text-muted-foreground">
                success
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded bg-error" />
              <span className="text-caption text-muted-foreground">error</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
