"use client";

import { useEffect, useRef, useState } from "react";
import type { ExhibitorEnquiryInput } from "@/lib/validation/exhibitorEnquiry";

type DraftFields = Partial<ExhibitorEnquiryInput>;
type SaveStatus = "idle" | "saving" | "saved" | "offline" | "error";
const SESSION_KEY = "bb-exhibitor-draft-id-v1";

function getDraftId() {
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
      id = crypto.randomUUID();
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

export function useExhibitorDraftAutosave(values: DraftFields, enabled: boolean) {
  const [draftId, setDraftId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [retryToken, setRetryToken] = useState(0);
  const sequence = useRef(0);
  const lastSaved = useRef("");
  const latest = useRef<DraftFields>({});
  const enabledRef = useRef(enabled);
  latest.current = values;
  enabledRef.current = enabled;

  useEffect(() => setDraftId(getDraftId()), []);

  const signature = JSON.stringify({
    companyName: values.companyName ?? "",
    contactPerson: values.contactPerson ?? "",
    designation: values.designation ?? "",
    mobile: values.mobile ?? "",
    email: values.email ?? "",
    country: values.country ?? "",
    productsServices: values.productsServices ?? "",
    preferredBoothSize: values.preferredBoothSize ?? "",
    website_hp: values.website_hp ?? "",
  });

  useEffect(() => {
    if (!draftId || !enabled) return;
    const fields = latest.current;
    const hasReachableContact =
      String(fields.email || "").includes("@") ||
      String(fields.mobile || "").replace(/\D/g, "").length >= 7;
    if (!hasReachableContact || signature === lastSaved.current) return;

    let cancelled = false;
    const version = ++sequence.current;
    const timer = window.setTimeout(async () => {
      if (cancelled || !enabledRef.current) return;
      if (!navigator.onLine) {
        setSaveStatus("offline");
        return;
      }
      setSaveStatus("saving");
      try {
        const body = {
          ...JSON.parse(signature),
          draftId,
          landingPage: window.location.pathname,
        };
        const result = await fetch("/api/exhibitor-draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          cache: "no-store",
          keepalive: true,
        });
        if (!result.ok) throw new Error("Draft endpoint unavailable");
        if (!cancelled && version === sequence.current) {
          lastSaved.current = signature;
          setSaveStatus("saved");
        }
      } catch {
        if (!cancelled && version === sequence.current) setSaveStatus("error");
      }
    }, 1800);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [draftId, enabled, signature, retryToken]);

  // Recover after connectivity returns, without requiring another keystroke.
  useEffect(() => {
    if (!enabled) return;
    const onOnline = () => {
      if (latest.current && draftId) {
        // React won't re-run the watcher without a state change; below
        // increments retry token to request another save.
        setRetryToken((value) => value + 1);
      }
    };
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [draftId, enabled]);

  return { draftId, saveStatus };
}
