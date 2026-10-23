"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import { contactConfig } from "@/config/site";
import { spaces } from "@/content/projects";
import { services } from "@/content/services";
import { whatsappUrl } from "@/lib/contact";

type FormState = InquiryState & { attempt: number };

const initialState: FormState = { status: "idle", message: "", attempt: 0 };

const field =
  "mt-2 block w-full border-0 border-b border-charcoal/25 bg-transparent px-0 py-3 text-[0.9375rem] text-charcoal placeholder:text-muted/70 focus:border-charcoal focus:ring-0 focus:outline-none aria-[invalid=true]:border-[#a2402f]";

/**
 * Project inquiry form. Submits to a Server Action that emails and WhatsApps the details to
 * Wall Art Expert (see src/lib/notify.ts), so the visitor only has to press "Send inquiry".
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(async (prev, data) => {
    const result = await submitInquiry(prev, data);
    return { ...result, attempt: prev.attempt + 1 };
  }, initialState);
  const [dismissed, setDismissed] = useState<FormState | null>(null);
  const startedAt = useRef<HTMLInputElement>(null);
  const errors = state.fieldErrors ?? {};
  const wa = whatsappUrl();

  // Records when the visitor started filling the form (a simple anti-bot signal).
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, [state.attempt]);

  if (state.status === "success" && dismissed !== state) {
    return (
      <div className="bg-ivory p-6 text-charcoal sm:p-10 lg:p-12" role="status" aria-live="polite">
        <span className="flex size-12 items-center justify-center rounded-full border border-bronze text-bronze-deep">
          <Check aria-hidden strokeWidth={1.5} className="size-5" />
        </span>
        <h4 className="mt-6 font-display text-subtitle">Thank you</h4>
        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted">{state.message}</p>
        <button
          type="button"
          onClick={() => setDismissed(state)}
          className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-charcoal/30 text-[0.75rem] font-medium tracking-[0.14em] uppercase hover:border-charcoal"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const v = state.status === "error" ? (state.values ?? {}) : {};
  const describe = (id: string, hasError: boolean) => (hasError ? `${id}-error` : undefined);

  return (
    <form
      key={state.attempt}
      action={formAction}
      noValidate
      className="bg-ivory p-6 text-charcoal sm:p-10 lg:p-12"
      aria-describedby="form-note"
    >
      {/* Anti-spam: honeypot field hidden from people, plus a start timestamp. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-website">Leave this field empty</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input ref={startedAt} type="hidden" name="started_at" defaultValue="" />

      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="eyebrow text-muted">
            Your name <span aria-hidden>*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            defaultValue={v.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describe("cf-name", Boolean(errors.name))}
            className={field}
          />
          <FieldError id="cf-name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="cf-contact" className="eyebrow text-muted">
            Phone or email <span aria-hidden>*</span>
          </label>
          <input
            id="cf-contact"
            name="contact"
            required
            maxLength={150}
            autoComplete="email"
            defaultValue={v.contact}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={describe("cf-contact", Boolean(errors.contact))}
            className={field}
          />
          <FieldError id="cf-contact-error" message={errors.contact} />
        </div>
        <div>
          <label htmlFor="cf-space" className="eyebrow text-muted">
            Type of space
          </label>
          <select id="cf-space" name="space" defaultValue={v.space ?? ""} className={`${field} cursor-pointer`}>
            <option value="">Select a space</option>
            {spaces.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="cf-service" className="eyebrow text-muted">
            Service
          </label>
          <select id="cf-service" name="service" defaultValue={v.service ?? ""} className={`${field} cursor-pointer`}>
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="eyebrow text-muted">
            Tell us about your wall <span aria-hidden>*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={4}
            maxLength={3000}
            defaultValue={v.message}
            placeholder="The room, the approximate wall size, and the feeling you'd like to create…"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describe("cf-message", Boolean(errors.message))}
            className={`${field} resize-y`}
          />
          <FieldError id="cf-message-error" message={errors.message} />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="max-w-xs text-xs leading-relaxed text-muted">
          Fields marked * are required. Your inquiry goes straight to our team by email and WhatsApp.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex min-h-12 items-center justify-center gap-3 bg-charcoal px-7 text-[0.8125rem] font-medium tracking-[0.08em] text-ivory uppercase transition-colors duration-300 hover:bg-[#23211d] active:bg-black disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : "Send inquiry"}
          {pending ? (
            <LoaderCircle aria-hidden strokeWidth={1.5} className="size-4 animate-spin" />
          ) : (
            <ArrowRight aria-hidden strokeWidth={1.5} className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </button>
      </div>

      <div aria-live="polite" className="empty:hidden">
        {state.status === "error" ? (
          <div className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-[#a2402f]">
            <p>{state.message}</p>
            {!state.fieldErrors ? (
              <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-charcoal">
                {wa ? (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="underline decoration-bronze underline-offset-4">
                    WhatsApp {contactConfig.whatsappDisplay}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
                {contactConfig.phoneNumber ? (
                  <a href={`tel:+${contactConfig.phoneNumber}`} className="underline decoration-bronze underline-offset-4">
                    Call {contactConfig.phoneDisplay}
                  </a>
                ) : null}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-xs text-[#a2402f]">
      {message}
    </p>
  );
}
