// src/securitySurvey/questions.js

// 1–5 Likert where 1 = "Never/No" (bad) and 5 = "Always/Yes" (good)
export const SCALE = {
  min: 1,
  max: 5,
  labels: ["Never", "Rarely", "Sometimes", "Often", "Always"],
};

export const CATEGORIES = {
  PHISHING: "Phishing Awareness",
  HYGIENE: "Basic Hygiene",
  OVERALL: "Overall Risk",
};

export const QUESTIONS = [
  { id: "phish_training", text: "Employees receive phishing-awareness training at least twice a year.", category: CATEGORIES.PHISHING, weight: 1 },
  { id: "report_button", text: "There is an easy way in the email client to report suspected phishing.", category: CATEGORIES.PHISHING, weight: 1 },
  { id: "link_hover", text: "Staff are taught to hover/check links and sender addresses before clicking.", category: CATEGORIES.PHISHING, weight: 1 },

  { id: "mfa_enabled", text: "Multi-factor authentication (MFA) is enabled for all admin and user accounts.", category: CATEGORIES.HYGIENE, weight: 1 },
  { id: "password_manager", text: "A password manager is provided and recommended for all employees.", category: CATEGORIES.HYGIENE, weight: 1 },
  { id: "patching", text: "Devices and apps are patched within 14 days of security updates.", category: CATEGORIES.HYGIENE, weight: 1 },
  { id: "backups", text: "Critical data is backed up and restore is tested at least quarterly.", category: CATEGORIES.HYGIENE, weight: 1 },
  { id: "least_privilege", text: "Access is granted by least-privilege (users only get what they need).", category: CATEGORIES.HYGIENE, weight: 1 },
  { id: "device_management", text: "Company devices are enrolled in MDM/endpoint security (screen lock, disk encryption, AV).", category: CATEGORIES.HYGIENE, weight: 1 },
  { id: "incident_drill", text: "We have an incident-response contact and we’ve run at least one tabletop drill.", category: CATEGORIES.HYGIENE, weight: 1 },
];
