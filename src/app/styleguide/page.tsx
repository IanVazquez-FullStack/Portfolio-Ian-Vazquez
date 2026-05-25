import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CodeBlock,
  Container,
  Section,
  VisuallyHidden,
} from "@/components/ui";

const buttonVariants = ["primary", "secondary", "ghost", "link"] as const;
const badgeVariants = ["default", "accent", "success", "error"] as const;

export default function StyleguidePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Section>
        <Container className="space-y-12">
          <div className="max-w-3xl space-y-4">
            <Badge variant="accent">Styleguide</Badge>
            <h1 className="text-display">Primitivas UI</h1>
            <p className="text-body-lg text-muted-foreground">
              Vista manual de los componentes reutilizables del sistema de diseño.
            </p>
          </div>

          <Card>
            <CardHeader>
              <h2 className="text-h2">Button</h2>
              <p className="text-body text-muted-foreground">
                Variantes, estado loading, disabled y renderizado como enlace.
              </p>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4">
              {buttonVariants.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant}
                </Button>
              ))}
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button as="a" href="#card-example" variant="secondary">
                Anchor button
              </Button>
            </CardContent>
          </Card>

          <Card id="card-example">
            <CardHeader>
              <h2 className="text-h2">Card y Badge</h2>
              <p className="text-body text-muted-foreground">
                Card organiza contenido con secciones tipadas y Badge muestra metadatos breves.
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {badgeVariants.map((variant) => (
                  <Badge key={variant} variant={variant}>
                    {variant}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="primary">Acción principal</Button>
              <Button variant="ghost">Acción secundaria</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-h2">CodeBlock</h2>
              <p className="text-body text-muted-foreground">
                Bloque de código con JetBrains Mono, alto contraste y scroll horizontal enfocable.
              </p>
            </CardHeader>
            <CardContent>
              <CodeBlock language="tsx">
                {'export function Example() {\n  return <Button variant="primary">Hola</Button>;\n}'}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-h2">VisuallyHidden</h2>
              <p className="text-body text-muted-foreground">
                El texto oculto permanece disponible para tecnologías asistivas.
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-body">
                Texto visible.
                <VisuallyHidden> Texto solo para lectores de pantalla.</VisuallyHidden>
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
