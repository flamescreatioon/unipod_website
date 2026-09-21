import React, { useEffect, useRef, useState } from "react";
import { interests } from "../../shared/enquiries";
import { useCollection } from "../features/content/ContentProvider";

export default function ContactForm({ initialKind = "", initialSubject = "" }) {
  const programmes = useCollection("programme");
  const [kind, setKind] = useState(initialKind);
  const [subject, setSubject] = useState(initialSubject);
  const [status, setStatus] = useState({ type: "", message: "" });
  const controller = useRef(null);
  const statusElement = useRef(null);
  const endpoint = `${import.meta.env.VITE_CONTACT_API_URL?.replace(/\/$/, "") || ""}/api/contact`;
  const sending = status.type === "sending";
  const programmeNames = [
    ...new Set([
      ...programmes.map((programme) => programme.name),
      ...(subject ? [subject] : []),
    ]),
  ];
  const localDate = new Date();
  const minimumDate = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, "0")}-${String(localDate.getDate()).padStart(2, "0")}`;

  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (status.type === "success" || status.type === "error")
      statusElement.current?.focus();
  }, [status]);

  async function submit(event) {
    event.preventDefault();
    if (controller.current) return;
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    const requestController = new AbortController();
    controller.current = requestController;
    const timeout = setTimeout(() => requestController.abort(), 15000);
    setStatus({ type: "sending", message: "Sending your enquiry…" });
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: requestController.signal,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok !== true) {
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : "Your enquiry could not be sent. Please try again in a moment.",
        );
      }
      form.reset();
      setStatus({
        type: "success",
        message:
          "Thank you — your enquiry has been saved. Programme places, facility access and visit dates still need confirmation.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.name === "AbortError"
            ? "The request took too long. We could not confirm whether your enquiry was saved. Please try again when your connection is stable."
            : error instanceof TypeError
              ? "We could not reach the enquiry service. Check your connection and try again. Your details are still here."
              : error.message,
      });
    } finally {
      clearTimeout(timeout);
      controller.current = null;
    }
  }

  return (
    <form
      className="contact-form grid gap-[18px] pt-1"
      onSubmit={submit}
      aria-label="Enquiry form"
      aria-busy={sending}
    >
      <p className="mb-0 text-sm leading-[1.65] text-[#dce6de]">
        Fields marked * are required. Your name, email and message are stored to
        handle your enquiry.
      </p>
      <fieldset className="grid min-w-0 gap-[18px] border-0 p-0 m-0 [&_label]:grid [&_label]:gap-[5px] [&_label]:text-sm [&_label]:font-bold [&_label]:leading-[1.65] [&_label]:text-[#dce6de] [&_input]:min-h-11 [&_input]:w-full [&_input]:rounded-none [&_input]:border-0 [&_input]:border-b [&_input]:border-[#ffffff73] [&_input]:bg-transparent [&_input]:px-1 [&_input]:py-[10px] [&_input]:font-sans [&_input]:text-base [&_input]:text-white [&_input]:outline-none [&_select]:min-h-11 [&_select]:w-full [&_select]:rounded-none [&_select]:border-0 [&_select]:border-b [&_select]:border-[#ffffff73] [&_select]:bg-transparent [&_select]:px-1 [&_select]:py-[10px] [&_select]:font-sans [&_select]:text-base [&_select]:text-white [&_textarea]:min-h-11 [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-none [&_textarea]:border-0 [&_textarea]:border-b [&_textarea]:border-[#ffffff73] [&_textarea]:bg-transparent [&_textarea]:px-1 [&_textarea]:py-[10px] [&_textarea]:font-sans [&_textarea]:text-base [&_textarea]:text-white [&_textarea]:outline-none [&_input::placeholder]:text-[#aec4b4] [&_textarea::placeholder]:text-[#aec4b4] [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-[#e4bd52] [&_input:focus-visible]:outline-offset-1 [&_select:focus-visible]:outline-2 [&_select:focus-visible]:outline-[#e4bd52] [&_select:focus-visible]:outline-offset-1 [&_textarea:focus-visible]:outline-2 [&_textarea:focus-visible]:outline-[#e4bd52] [&_textarea:focus-visible]:outline-offset-1 [&_option]:text-ink [&_input[type=date]]:[color-scheme:dark] disabled:opacity-70" disabled={sending}>
        <legend className="sr-only">Your enquiry details</legend>
        <label>
          Your name *
          <input
            required
            maxLength={120}
            name="name"
            autoComplete="name"
            placeholder="Enter your name"
          />
        </label>
        <label>
          Email address *
          <input
            required
            maxLength={254}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>
        <label>
          I’m interested in *
          <select
            required
            name="interest"
            value={interests[kind] || ""}
            onChange={(event) => {
              setKind(
                Object.keys(interests).find(
                  (key) => interests[key] === event.target.value,
                ) || "",
              );
              setSubject("");
            }}
          >
            <option value="">Select an option</option>
            {Object.entries(interests).map(([key, label]) => (
              <option key={key} value={label}>
                {label}
              </option>
            ))}
          </select>
        </label>
        {kind === "programmes" ? (
          <label>
            Programme
            <select
              name="subject"
              value={programmeNames.includes(subject) ? subject : ""}
              onChange={(event) => setSubject(event.target.value)}
            >
              <option value="">Help me choose a programme</option>
              {programmeNames.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
        ) : (
          subject && (
            <>
              <p className="m-0 border-l-2 border-gold pl-3 text-sm text-[#dce6de]">
                Enquiring about: <strong>{subject}</strong>
              </p>
              <input type="hidden" name="subject" value={subject} />
            </>
          )
        )}
        {kind === "visit" && (
          <div className="grid grid-cols-2 gap-5 max-[480px]:grid-cols-1 max-[480px]:gap-[18px]">
            <label>
              Preferred date (optional)
              <input className="[color-scheme:dark]" type="date" name="preferredDate" min={minimumDate} />
            </label>
            <label>
              Group size (optional)
              <input
                type="number"
                name="groupSize"
                min="1"
                max="1000"
                step="1"
                inputMode="numeric"
              />
            </label>
          </div>
        )}
        <label>
          Message *
          <textarea
            required
            maxLength={5000}
            name="message"
            rows="5"
            placeholder={
              kind === "visit"
                ? "What would your group like to explore? Include your organisation and any access requirements."
                : kind === "enterprise"
                  ? "Describe your venture, project stage and the support you need."
                  : "Tell us what you want to learn, make or support."
            }
          />
        </label>
        <label className="sr-only" aria-hidden="true">
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </fieldset>
      <button className="button button-gold mt-1 inline-flex justify-self-start items-center justify-center gap-[27px] border border-transparent px-[17px] py-[13px] font-sans text-[14px] font-extrabold no-underline cursor-pointer bg-gold text-ink disabled:cursor-wait disabled:opacity-70" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Send enquiry"} <b aria-hidden="true">→</b>
      </button>
      <p
        ref={statusElement}
        tabIndex={-1}
        className={`m-0 text-[15px] leading-[1.65] text-gold ${status.type === "error" ? "text-[#ffcfbf]" : ""} ${status.type === "success" ? "text-[#8dd4f7]" : ""} ${status.message ? "" : "hidden"}`}
        role="status"
        aria-live={status.type === "error" ? "assertive" : "polite"}
        aria-atomic="true"
      >
        {status.message}
      </p>
    </form>
  );
}
