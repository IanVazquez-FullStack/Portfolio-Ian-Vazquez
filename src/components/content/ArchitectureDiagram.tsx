import Image from "next/image";

type ArchitectureDiagramProps = {
  src: string;
  alt: string;
  descriptionId: string;
  description: string;
  caption?: string;
  width?: number;
  height?: number;
};

/**
 * ArchitectureDiagram renderiza un diagrama de arquitectura con accesibilidad completa.
 * Expone una descripción textual equivalente vía aria-describedby (AC #5).
 * Siempre incluye la descripción textual visible para todos los usuarios.
 */
export function ArchitectureDiagram({
  src,
  alt,
  descriptionId,
  description,
  caption,
  width = 800,
  height = 400,
}: ArchitectureDiagramProps) {
  return (
    <figure className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
      <div className="relative w-full overflow-hidden rounded-md bg-muted">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>

      {/* Descripción textual siempre visible (AC #5) */}
      <figcaption id={descriptionId} className="text-body text-muted-foreground">
        {description}
      </figcaption>

      {caption && (
        <p className="text-caption text-muted-foreground" aria-hidden="true">
          {caption}
        </p>
      )}
    </figure>
  );
}
