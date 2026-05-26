import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export type TechStackVariant = "compact" | "detailed" | "grouped";

type TechStackBadgesProps = {
  stack: string[];
  variant?: TechStackVariant;
  className?: string;
};

/**
 * Mapeo semántico de tecnologías a variantes de Badge.
 * Permite distinguir visualmente sin depender solo del color.
 */
function techToVariant(tech: string): "default" | "accent" | "success" {
  const lower = tech.toLowerCase();
  if (["react", "next.js", "typescript", "vue", "angular", "svelte"].includes(lower)) {
    return "accent";
  }
  if (["node.js", "python", "go", "rust", "java", "postgresql", "mongodb", "redis"].includes(lower)) {
    return "success";
  }
  return "default";
}

export function TechStackBadges({ stack, variant = "compact", className }: TechStackBadgesProps) {
  if (!stack.length) return null;

  const displayedStack = variant === "compact" ? stack.slice(0, 3) : stack;
  const remainingCount = variant === "compact" ? Math.max(0, stack.length - 3) : 0;

  if (variant === "grouped") {
    return (
      <div
        className={cn("flex flex-wrap items-center gap-1", className)}
        role="list"
        aria-label={`Stack tecnológico: ${stack.length} tecnologías`}
      >
        {stack.map((tech, index) => (
          <span key={`${tech}-${index}`} role="listitem">
            <Badge variant={techToVariant(tech)}>
              <span className="sr-only">Tecnología:</span>
              {tech}
            </Badge>
            {index < stack.length - 1 && (
              <span className="sr-only">, </span>
            )}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        variant === "detailed" ? "gap-2.5" : "gap-1.5",
        className,
      )}
      role="list"
      aria-label={`Stack tecnológico: ${stack.length} tecnologías`}
    >
      {displayedStack.map((tech, index) => (
        <span key={`${tech}-${index}`} role="listitem">
          <Badge variant={techToVariant(tech)}>
            {variant === "detailed" && (
              <span className="sr-only">Tecnología:</span>
            )}
            {tech}
          </Badge>
        </span>
      ))}
      {remainingCount > 0 && (
        <Badge variant="default" aria-label={`Y ${remainingCount} tecnologías más`}>
          +{remainingCount}
        </Badge>
      )}
    </div>
  );
}
