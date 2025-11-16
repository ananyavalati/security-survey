// src/pages/home.tsx
import React from "react";
import PastResults from "../components/PastResults";

export default function Home() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 0" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Security Self-Assessment</h1>

      <section aria-labelledby="purpose" style={{ marginBottom: 24 }}>
        <h2 id="purpose" style={{ fontSize: 22, marginBottom: 8 }}>
          Purpose of the Security Self-Assessment
        </h2>
        <p style={{ color: "#666", lineHeight: 1.6 }}>
          This assessment provides a quick benchmark of your organization’s security readiness
          across core controls. Responses are converted into standardized scores that align to
          common best practices. Results are stored to your account so you can measure progress
          over time and prioritize remediation.
        </p>
      </section>

      <div style={{ marginBottom: 24 }}>
        <PastResults />
      </div>


      <section aria-labelledby="hygiene" style={{ marginBottom: 20 }}>
        <h2 id="hygiene" style={{ fontSize: 22, marginBottom: 8 }}>Basic Hygiene Score</h2>
        <p style={{ color: "#666", lineHeight: 1.6 }}>
          This score summarizes how well everyday safeguards are implemented and maintained across
          your environment. It considers whether multi-factor authentication is enforced on
          administrator and user accounts, the typical turnaround time for operating system and
          application security updates, whether a password manager is deployed and recommended, and
          whether critical data is backed up and restoration is tested on a schedule. It also looks
          at baseline device settings such as screen lock, disk encryption, and endpoint protection,
          as well as least-privilege access practices. Higher scores mean these controls are in
          place, consistently applied, and routinely verified. Lower scores suggest gaps in one or
          more of these areas and usually point to straightforward remediation, for example enabling
          MFA on all identities, tightening update cadences, rolling out a password manager, and
          validating backups with periodic restore tests.
        </p>
      </section>

      <section aria-labelledby="phishing" style={{ marginBottom: 20 }}>
        <h2 id="phishing" style={{ fontSize: 22, marginBottom: 8 }}>Phishing Awareness Score</h2>
        <p style={{ color: "#666", lineHeight: 1.6 }}>
          This score reflects how prepared your users and processes are to spot, report, and contain
          suspicious messages. It considers the frequency and coverage of awareness training,
          whether there is a simple reporting path in the mail client, how often users practice
          safe-click habits like checking sender addresses and hovering over links, and how quickly
          suspected messages reach the right team for triage. Higher scores indicate users recognize
          common phishing patterns, know how to escalate, and have clear playbooks. Lower scores
          point to training or workflow issues and are typically improved by short recurring
          training, simulated phishing exercises with feedback, a visible report-phish button, and a
          defined response loop so reported emails are reviewed and communicated back to users.
        </p>
      </section>
    </div>
  );
}
