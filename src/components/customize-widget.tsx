import { useState } from "react";
import { MessageCircle, Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";

const WHATSAPP = "919322520620";

const OCCASIONS = ["Anniversary", "Valentine", "Birthday", "Rakhi", "Wedding", "Corporate", "Other"];
const BUDGETS = ["₹500 – ₹1,000", "₹1,000 – ₹2,000", "₹2,000 – ₹3,500", "₹3,500+", "Not sure yet"];

type Form = { name: string; phone: string; occasion: string; budget: string; details: string };
type Errors = Partial<Record<keyof Form, string>>;

function validate(f: Form): Errors {
  const e: Errors = {};
  if (!f.name.trim())                          e.name    = "Name is required";
  if (!/^[6-9]\d{9}$/.test(f.phone.trim()))   e.phone   = "Enter a valid 10-digit number";
  if (!f.occasion)                             e.occasion = "Pick an occasion";
  if (!f.budget)                               e.budget  = "Pick a budget";
  if (!f.details.trim())                       e.details = "Tell us what you have in mind";
  return e;
}

function buildMessage(f: Form) {
  return [
    "✨ *Custom Hamper Inquiry — VYROX*",
    "━━━━━━━━━━━━━━━━━━━",
    `Name     : ${f.name}`,
    `Phone    : ${f.phone}`,
    `Occasion : ${f.occasion}`,
    `Budget   : ${f.budget}`,
    "━━━━━━━━━━━━━━━━━━━",
    `*What they want:*\n${f.details}`,
    "━━━━━━━━━━━━━━━━━━━",
    "_Please reach out to discuss the customization. Thank you!_ 🙏",
  ].join("\n");
}

export function CustomizeWidget() {
  const [open, setOpen]     = useState(false);
  const [sent, setSent]     = useState(false);
  const [form, setForm]     = useState<Form>({ name: "", phone: "", occasion: "", budget: "", details: "" });
  const [errors, setErrors] = useState<Errors>({});

  const set = (field: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(p => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors(p => ({ ...p, [field]: undefined }));
    };

  const submit = () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildMessage(form))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => setSent(false), 400);
  };

  const inputCls = (f: keyof Form) =>
    `h-10 w-full border bg-background/60 px-3 text-sm outline-none transition-colors focus:border-primary ${errors[f] ? "border-primary/70" : "border-border"}`;

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Customize a hamper"
        className="fixed bottom-24 right-4 z-50 flex items-center gap-2 border border-gold/40 bg-card px-4 py-2.5 shadow-lg backdrop-blur transition-transform hover:scale-105 active:scale-95 md:bottom-6 md:right-6"
      >
        <Sparkles className="size-4 text-gold" />
        <span className="font-display text-[10px] font-bold uppercase tracking-widest text-foreground">
          Customize
        </span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* Drawer — slides up from bottom */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[160] flex flex-col border-t border-border bg-background transition-transform duration-300 ease-out md:left-auto md:right-6 md:bottom-6 md:w-[420px] md:border md:border-border ${
          open ? "translate-y-0" : "translate-y-full md:translate-y-[calc(100%+24px)]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-gold" />
            <h2 className="font-display text-sm font-bold uppercase tracking-wider">
              Custom Hamper Inquiry
            </h2>
          </div>
          <button onClick={close} aria-label="Close" className="text-muted-foreground hover:text-primary">
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="flex size-16 items-center justify-center border border-gold/40 bg-gold/10 text-3xl">✨</div>
              <div>
                <p className="font-display text-xl font-black uppercase">Inquiry Sent!</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We've received your request on WhatsApp and will get back to you shortly.
                </p>
              </div>
              <Button onClick={close} className="h-10 px-8">Done</Button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Tell us what you have in mind — we'll build it just for you.
              </p>

              {/* Name + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Name *</label>
                  <input type="text" placeholder="Rahul" value={form.name} onChange={set("name")} className={inputCls("name")} />
                  {errors.name && <p className="mt-0.5 text-[10px] text-primary">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone *</label>
                  <input type="tel" placeholder="9876543210" maxLength={10} value={form.phone} onChange={set("phone")} className={inputCls("phone")} />
                  {errors.phone && <p className="mt-0.5 text-[10px] text-primary">{errors.phone}</p>}
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Occasion *</label>
                <select value={form.occasion} onChange={set("occasion")} className={`${inputCls("occasion")} cursor-pointer`}>
                  <option value="">Select occasion...</option>
                  {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                {errors.occasion && <p className="mt-0.5 text-[10px] text-primary">{errors.occasion}</p>}
              </div>

              {/* Budget */}
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Budget *</label>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => { setForm(p => ({ ...p, budget: b })); if (errors.budget) setErrors(p => ({ ...p, budget: undefined })); }}
                      className={`border px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        form.budget === b ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                {errors.budget && <p className="mt-0.5 text-[10px] text-primary">{errors.budget}</p>}
              </div>

              {/* Details */}
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">What do you want? *</label>
                <textarea
                  placeholder="E.g. A hamper for my girlfriend's birthday — she loves roses, perfume and anything gold. Budget around ₹1500."
                  value={form.details}
                  onChange={set("details")}
                  rows={3}
                  className="w-full resize-none border border-border bg-background/60 px-3 py-2 text-sm outline-none transition-colors focus:border-primary placeholder:text-muted-foreground/40"
                />
                {errors.details && <p className="mt-0.5 text-[10px] text-primary">{errors.details}</p>}
              </div>

              {/* Submit */}
              <button
                onClick={submit}
                className="flex h-12 w-full items-center justify-center gap-2 bg-[#25D366] font-display text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle className="size-4" /> Send on WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
