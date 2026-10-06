"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { company } from "@/data/company";

const inputClass =
  "w-full rounded-sm border border-navy-200 bg-white px-4 py-3 text-sm text-navy-950 transition-colors placeholder:text-navy-500 hover:border-navy-300 focus:border-aqua-600 focus:outline-none focus:ring-2 focus:ring-aqua-600/20";
const labelClass = "mb-2 block text-sm font-semibold text-navy-800";
const errorClass = "mt-2 block text-xs font-medium text-red-700";

type Errors = Partial<Record<"name" | "phone" | "email" | "message", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const get = (key: string) => String(data.get(key) ?? "").trim();

    if (!get("name")) next.name = "Please enter your name.";

    const phone = get("phone");
    if (!phone) next.phone = "Please enter a phone number.";
    else if (!/^[+\d][\d\s\-()]{7,}$/.test(phone))
      next.phone = "Please enter a valid phone number.";

    const email = get("email");
    if (email && !emailPattern.test(email)) next.email = "Please enter a valid email address.";

    if (!get("message")) next.message = "Please add a short message.";

    return next;
  }

  // No backend: hand the message to the visitor's email client so nothing is lost.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    const subject = `Website message from ${get("name")}`;
    const body = [
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      get("email") && `Email: ${get("email")}`,
      get("service") && `Service: ${get("service")}`,
      "",
      get("message"),
    ]
      .filter((line): line is string => typeof line === "string")
      .join("\n");

    window.location.href = `mailto:${company.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="py-10 text-center" role="status">
        <span aria-hidden="true" className="mx-auto mb-6 block h-px w-12 bg-aqua-600" />
        <p className="font-display text-2xl text-navy-950">Your email app should now be open</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-600">
          Send the message from there to reach us. If nothing opened, write to{" "}
          <a className="link-inline" href={company.contact.emailHref}>
            {company.contact.email}
          </a>{" "}
          or call{" "}
          <a className="link-inline" href={company.contact.phoneHref}>
            {company.contact.phone}
          </a>
          .
        </p>
        <button
          type="button"
          className="mt-6 text-sm font-semibold text-aqua-700 underline underline-offset-4"
          onClick={() => setSubmitted(false)}
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Your details</legend>
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span aria-hidden="true" className="text-aqua-700">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
          {errors.name && (
            <span id="name-error" className={errorClass}>
              {errors.name}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span aria-hidden="true" className="text-aqua-700">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-required="true"
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClass}
          />
          {errors.phone && (
            <span id="phone-error" className={errorClass}>
              {errors.phone}
            </span>
          )}
        </div>
      </fieldset>
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Contact preference</legend>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
          {errors.email && (
            <span id="email-error" className={errorClass}>
              {errors.email}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="service" className={labelClass}>
            Service interest
          </label>
          <select id="service" name="service" className={inputClass} defaultValue="">
            <option value="">Select…</option>
            <option value="Water Treatment System">Water Treatment System</option>
            <option value="Sewage Treatment System">Sewage Treatment System</option>
            <option value="Reverse Osmosis System">Reverse Osmosis System</option>
            <option value="Water, Waste Water Analysis">Water, Waste Water Analysis</option>
            <option value="Other / General">Other / General</option>
          </select>
        </div>
      </fieldset>
      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span aria-hidden="true" className="text-aqua-700">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-required="true"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass} resize-y`}
        />
        {errors.message && (
          <span id="message-error" className={errorClass}>
            {errors.message}
          </span>
        )}
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto" arrow>
        Send message
      </Button>
    </form>
  );
}
