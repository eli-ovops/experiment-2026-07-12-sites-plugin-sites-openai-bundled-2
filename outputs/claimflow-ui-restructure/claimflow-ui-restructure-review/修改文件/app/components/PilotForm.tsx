"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

const initialValues = {
  name: "", email: "", company: "", trade: "", revenue: "", projects: "",
  system: "", problem: "", projectType: "",
};

export function PilotForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");

  const update = (field: keyof typeof values, value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading" || status === "success") return;
    if (!values.email.includes("@") || !values.name || !values.company || !values.trade) {
      setError("Complete the required fields before submitting.");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      // TODO: Replace this local demo response with an approved CRM/API endpoint.
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("success");
    } catch {
      setError("The demo submission could not be completed. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return <div className="form-success" role="status"><span>✓</span><h3>Thank you.</h3><p>We will review your project fit and respond with a proposed pilot scope.</p><small>Demo confirmation only — no CRM or external system was contacted.</small></div>;
  }

  return (
    <form className="pilot-form" onSubmit={submit} noValidate aria-describedby="form-note">
      <div className="field"><label htmlFor="name">Full name *</label><input id="name" autoComplete="name" required value={values.name} onChange={(e)=>update("name",e.target.value)} /></div>
      <div className="field"><label htmlFor="email">Work email *</label><input id="email" type="email" autoComplete="email" required value={values.email} onChange={(e)=>update("email",e.target.value)} /></div>
      <div className="field"><label htmlFor="company">Company *</label><input id="company" autoComplete="organization" required value={values.company} onChange={(e)=>update("company",e.target.value)} /></div>
      <div className="field"><label htmlFor="trade">Trade *</label><select id="trade" required value={values.trade} onChange={(e)=>update("trade",e.target.value)}><option value="">Select trade</option><option>Electrical</option><option>Mechanical</option><option>HVAC</option><option>Plumbing</option><option>Fire Protection</option><option>Other Specialty Trade</option></select></div>
      <div className="field"><label htmlFor="revenue">Annual revenue range</label><select id="revenue" value={values.revenue} onChange={(e)=>update("revenue",e.target.value)}><option value="">Select range</option><option>Under $10M</option><option>$10M–$25M</option><option>$25M–$100M</option><option>$100M+</option></select></div>
      <div className="field"><label htmlFor="projects">Active projects</label><select id="projects" value={values.projects} onChange={(e)=>update("projects",e.target.value)}><option value="">Select range</option><option>1–5</option><option>6–15</option><option>16–40</option><option>40+</option></select></div>
      <div className="field"><label htmlFor="system">Project management system</label><input id="system" placeholder="e.g. Procore, Autodesk, spreadsheets" value={values.system} onChange={(e)=>update("system",e.target.value)} /></div>
      <div className="field"><label htmlFor="projectType">Preferred pilot project</label><input id="projectType" placeholder="e.g. hospital electrical fit-out" value={values.projectType} onChange={(e)=>update("projectType",e.target.value)} /></div>
      <div className="field field-wide"><label htmlFor="problem">Biggest change order problem</label><textarea id="problem" rows={3} value={values.problem} onChange={(e)=>update("problem",e.target.value)} /></div>
      {status === "error" && <p className="form-error" role="alert">{error}</p>}
      <button className="button form-submit" type="submit" disabled={status === "loading"}>{status === "loading" ? "Reviewing form…" : "Apply for a Recovery Pilot"}<span aria-hidden="true">↗</span></button>
      <p className="form-note" id="form-note">Private pilot inquiry. This local prototype does not transmit or store your information. Do not enter confidential project data.</p>
    </form>
  );
}
