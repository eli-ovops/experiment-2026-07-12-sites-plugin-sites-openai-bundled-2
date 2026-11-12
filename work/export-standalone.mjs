import { readFile, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "outputs/ClaimFlow-独立预览.html");
const files = await readdir(resolve(root, "dist/client/assets"));
const cssName = files.find((name) => /^index-.*\.css$/.test(name));
if (!cssName) throw new Error("Built CSS asset not found");

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("export", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);
if (!response.ok) throw new Error(`SSR render failed: ${response.status}`);

const rendered = await response.text();
const bodyMatch = rendered.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!bodyMatch) throw new Error("Rendered body not found");

const css = await readFile(resolve(root, "dist/client/assets", cssName), "utf8");
const image = await readFile(resolve(root, "public/east-corridor-field-capture.webp"));
const imageData = `data:image/webp;base64,${image.toString("base64")}`;
let body = bodyMatch[1]
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<link\b[^>]*>/gi, "")
  .replaceAll("/east-corridor-field-capture.webp", imageData)
  .replace(/<!--\s*-->/g, "");

const faqAnswers = {
  "What is available in the private pilot?": "Authorized file imports, assisted change-event review, contract notice extraction, evidence-gap review and a review-ready package for one selected project.",
  "Does ClaimFlow connect directly to Procore or Autodesk?": "Not by default in this prototype. The pilot starts with authorized exports and uploaded records. API integrations require a scoped implementation and vendor permissions.",
  "Does ClaimFlow submit or approve change orders?": "No. A project manager or authorized commercial reviewer verifies the facts, costs and notice before anything is exported or submitted.",
  "Does ClaimFlow provide legal advice or guarantee recovery?": "No. It organizes commercial evidence and highlights contract requirements. Legal interpretation, entitlement and recovery decisions remain with qualified people.",
  "How is project data handled?": "Production handling, retention and security terms must be agreed during pilot scoping. This standalone file stores and transmits nothing."
};

const interaction = `
const answers = ${JSON.stringify(faqAnswers)};
document.querySelectorAll('.faq-item button').forEach((button) => {
  const title = button.querySelector('span')?.textContent?.trim() || '';
  let answer = button.closest('.faq-item').querySelector('p');
  if (answer) answer.hidden = false;
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-item button').forEach((other) => {
      other.setAttribute('aria-expanded', 'false');
      other.querySelector('b').textContent = '+';
      const p = other.closest('.faq-item').querySelector('p');
      if (p) p.hidden = true;
    });
    if (!expanded) {
      answer ||= document.createElement('p');
      answer.textContent = answers[title] || '';
      if (!answer.parentElement) button.closest('.faq-item').appendChild(answer);
      answer.hidden = false;
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('b').textContent = '−';
    }
  });
});
const form = document.querySelector('.pilot-form');
if (form) form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const submit = form.querySelector('button[type="submit"]');
  if (submit.disabled) return;
  submit.disabled = true;
  submit.textContent = 'Reviewing form…';
  window.setTimeout(() => {
    form.outerHTML = '<div class="form-success" role="status"><span>✓</span><h3>Thank you.</h3><p>We will review your project fit and respond with a proposed pilot scope.</p><small>Standalone demo only — no information was transmitted or stored.</small></div>';
  }, 600);
});`;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>ClaimFlow — Standalone Preview</title>
  <meta name="description" content="ClaimFlow standalone recovery-pilot preview">
  <style>:root{--font-geist-sans:Arial,Helvetica,sans-serif;--font-geist-mono:ui-monospace,SFMono-Regular,Menlo,monospace}${css}</style>
</head>
<body>${body}<script>${interaction}<\/script></body>
</html>`;

await writeFile(output, html);
console.log(output);
