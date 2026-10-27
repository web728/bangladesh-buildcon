"use client";
import { useEffect, useRef, useState } from "react";
import type { VisitorRegistrationInput } from "@/lib/validation/visitorRegistration";

type Fields = Partial<VisitorRegistrationInput>;
type SaveStatus = "idle" | "saving" | "saved" | "offline" | "error";
const SESSION_KEY = "bb-visitor-draft-id-v1";
function currentId() {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored && /^[0-9a-f-]{36}$/i.test(stored)) return stored;
    const id = crypto.randomUUID(); sessionStorage.setItem(SESSION_KEY, id); return id;
  } catch { return crypto.randomUUID(); }
}
export function useVisitorDraftAutosave(values: Fields, enabled: boolean) {
  const [draftId, setDraftId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [retry, setRetry] = useState(0);
  const lastSaved = useRef("");
  useEffect(() => { setDraftId(currentId()); }, []);
  const signature = JSON.stringify({
    fullName: values.fullName || "", company: values.company || "",
    designation: values.designation || "", mobile: values.mobile || "",
    email: values.email || "", businessCategory: values.businessCategory || "",
    country: values.country || "", website_hp: values.website_hp || "",
  });
  useEffect(() => {
    if (!draftId || !enabled || signature === lastSaved.current) return;
    const current = JSON.parse(signature) as Fields;
    if (!(String(current.email || "").includes("@") || String(current.mobile || "").replace(/\D/g, "").length >= 7)) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      if (!navigator.onLine) { setSaveStatus("offline"); return; }
      setSaveStatus("saving");
      try {
        const response = await fetch("/api/visitor-draft", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...current, draftId, landingPage: location.pathname }),
          signal: controller.signal, cache: "no-store", keepalive: true,
        });
        if (!response.ok) throw new Error("Draft save failed");
        if (!controller.signal.aborted) { lastSaved.current = signature; setSaveStatus("saved"); }
      } catch {
        if (!controller.signal.aborted) setSaveStatus("error");
      }
    }, 1800);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [draftId, enabled, signature, retry]);
  useEffect(() => {
    if (!enabled) return;
    const onOnline = () => setRetry((n) => n + 1);
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [enabled]);
  return { draftId, saveStatus };
}
