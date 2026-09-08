import { useState, type FormEvent } from "react";
import { Check, Copy, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

import { portfolio } from "@/lib/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(10, "Please add a little more detail").max(2000),
});

export function ContactForm() {
  const form = portfolio.contact.form;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
    toast.success(form.successMessage);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={onSubmit} noValidate className="glass-card grid gap-5 p-6 sm:p-8">
      {form.fields.map((field) => (
        <div key={field.name} className="grid gap-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          {field.type === "textarea" ? (
            <Textarea
              id={field.name}
              name={field.name}
              rows={5}
              placeholder={field.placeholder}
              aria-invalid={Boolean(errors[field.name])}
              className="rounded-xl border-glass-border bg-glass"
            />
          ) : (
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              aria-invalid={Boolean(errors[field.name])}
              className="h-11 rounded-xl border-glass-border bg-glass"
            />
          )}
          {errors[field.name] ? (
            <p className="text-xs text-destructive">{errors[field.name]}</p>
          ) : null}
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="hero" size="lg">
          {sent ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
          {form.submitLabel}
        </Button>
        <CopyEmail />
      </div>
    </form>
  );
}

export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const email = portfolio.contact.email;

  return (
    <Button
      type="button"
      variant="glass"
      size="lg"
      onClick={() => {
        void navigator.clipboard.writeText(email);
        setCopied(true);
        toast.success("Email copied to clipboard");
        window.setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      Copy email
    </Button>
  );
}
