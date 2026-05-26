"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { contactSchema, type ContactInput } from "@/lib/validation/contactSchema";

export type FormStatus = "idle" | "validating" | "loading" | "success" | "error";

type ContactFormProps = {
  onSubmit?: (data: ContactInput) => Promise<void>;
  defaultSubject?: string;
};

const fieldIds = {
  name: "contact-name",
  email: "contact-email",
  subject: "contact-subject",
  message: "contact-message",
  company: "contact-company",
} as const;

function errorId(field: keyof typeof fieldIds): string {
  return `${fieldIds[field]}-error`;
}

export function ContactForm({ onSubmit, defaultSubject }: ContactFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [globalError, setGlobalError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      subject: defaultSubject ?? "",
      message: "",
      company: "",
    },
  });

  async function handleFormSubmit(data: ContactInput) {
    setFormStatus("loading");
    setGlobalError("");
    clearErrors();

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const payload = (await response.json()) as {
          ok?: boolean;
          error?: string;
          fieldErrors?: Record<string, string[]>;
        };

        if (!response.ok) {
          if (payload.fieldErrors) {
            for (const [field, messages] of Object.entries(payload.fieldErrors)) {
              setError(field as keyof ContactInput, {
                type: "server",
                message: messages[0],
              });
            }
            setFormStatus("error");
            return;
          }

          throw new Error(payload.error ?? "No pude enviar el mensaje.");
        }
      }

      setFormStatus("success");
    } catch {
      setFormStatus("error");
      setGlobalError(
        "No pude enviar el mensaje. Revisá tu conexión e intentá de nuevo."
      );
    }
  }

  function handleReset() {
    reset({
      name: "",
      email: "",
      subject: defaultSubject ?? "",
      message: "",
      company: "",
    });
    clearErrors();
    setGlobalError("");
    setFormStatus("idle");
  }

  if (formStatus === "success") {
    return (
      <div className="rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
        <p role="status" className="text-body-lg text-foreground">
          Mensaje enviado correctamente.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Gracias por escribir. Me pondré en contacto a la brevedad.
        </p>
        <div className="mt-5">
          <Button type="button" onClick={handleReset}>
            Enviar otro mensaje
          </Button>
        </div>
      </div>
    );
  }

  const isLoading = formStatus === "loading";
  const isError = formStatus === "error";

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px" }}
      >
        <label htmlFor={fieldIds.company}>Company</label>
        <input
          id={fieldIds.company}
          {...register("company")}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldIds.name} className="text-sm font-medium text-foreground">
          Nombre
        </label>
        <input
          id={fieldIds.name}
          type="text"
          {...register("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? errorId("name") : undefined}
          className="min-h-11 rounded-lg border border-border bg-background px-4 py-2.5 text-body text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        {errors.name && (
          <p id={errorId("name")} role="alert" className="text-sm text-error">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldIds.email} className="text-sm font-medium text-foreground">
          Correo electrónico
        </label>
        <input
          id={fieldIds.email}
          type="email"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? errorId("email") : undefined}
          className="min-h-11 rounded-lg border border-border bg-background px-4 py-2.5 text-body text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        {errors.email && (
          <p id={errorId("email")} role="alert" className="text-sm text-error">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldIds.subject} className="text-sm font-medium text-foreground">
          Asunto
        </label>
        <input
          id={fieldIds.subject}
          type="text"
          {...register("subject")}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? errorId("subject") : undefined}
          className="min-h-11 rounded-lg border border-border bg-background px-4 py-2.5 text-body text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        {errors.subject && (
          <p id={errorId("subject")} role="alert" className="text-sm text-error">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldIds.message} className="text-sm font-medium text-foreground">
          Mensaje
        </label>
        <textarea
          id={fieldIds.message}
          {...register("message")}
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? errorId("message") : undefined}
          className="min-h-[120px] resize-y rounded-lg border border-border bg-background px-4 py-2.5 text-body text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        {errors.message && (
          <p id={errorId("message")} role="alert" className="text-sm text-error">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          className="min-h-11 w-full sm:w-auto"
        >
          {isLoading ? "Enviando..." : isError ? "Reintentar envío" : "Enviar"}
        </Button>

        <div aria-live="polite" aria-atomic="true">
          {isError && globalError && (
            <p role="alert" className="text-sm text-error">
              {globalError}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
