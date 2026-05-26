"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validation/contactSchema";
import { Button } from "@/components/ui/Button";

export type FormStatus = "idle" | "validating" | "loading" | "success" | "error";

type ContactFormProps = {
  onSubmit?: (data: ContactInput) => Promise<void>;
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

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  async function handleFormSubmit(data: ContactInput) {
    setFormStatus("loading");

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Placeholder: simula envío hasta integración con endpoint (Story 3.5)
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  }

  const isLoading = formStatus === "loading";
  const isSuccess = formStatus === "success";
  const isError = formStatus === "error";

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      {/* Honeypot — invisible para humanos, accesible para bots */}
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

      {/* Name */}
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

      {/* Email */}
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

      {/* Subject */}
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

      {/* Message */}
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

      {/* Submit */}
      <Button
        type="submit"
        loading={isLoading}
        disabled={isLoading || isSuccess}
        className="min-h-11 w-full sm:w-auto"
      >
        {isLoading
          ? "Enviando..."
          : isSuccess
            ? "Enviado"
            : isError
              ? "Reintentar envío"
              : "Enviar"}
      </Button>

      {/* Estado global del formulario */}
      {isSuccess && (
        <p role="status" className="text-sm text-success">
          Mensaje enviado correctamente.
        </p>
      )}
      {isError && (
        <p role="alert" className="text-sm text-error">
          Ocurrió un error al enviar. Por favor, intenta de nuevo.
        </p>
      )}
    </form>
  );
}
