import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the ClaimFlow recovery-pilot homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>ClaimFlow — Change Evidence for Specialty Contractors<\/title>/i);
  assert.match(html, /Find billable change work before the evidence disappears/i);
  assert.match(html, /East Corridor Conduit Reroute/i);
  assert.match(html, /30-Day Recovery Pilot/i);
  assert.match(html, /Human review required/i);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.doesNotMatch(html, /mailto:/i);
  assert.doesNotMatch(html, />Guaranteed recovery|customer-proven|SOC 2 Ready/i);
});

test("keeps the form, image and responsive safeguards explicit", async () => {
  const [home, form, css] = await Promise.all([
    readFile(new URL("../app/components/ClaimFlowHome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/PilotForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  await access(new URL("../public/east-corridor-field-capture.webp", import.meta.url));
  assert.match(home, /alt="Electrical foreman documenting conduit routing/);
  assert.match(home, /fetchPriority="high"/);
  assert.match(home, /aria-expanded=/);
  assert.match(form, /TODO: Replace this local demo response/);
  assert.match(form, /disabled=\{status === "loading"\}/);
  assert.match(form, /role="alert"/);
  assert.match(form, /Demo confirmation only/);
  assert.match(css, /@media\(max-width:360px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /overflow-x:hidden/);
  assert.match(css, /min-height:44px/);
});
