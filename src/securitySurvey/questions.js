

export const CATEGORIES = {
  PHISHING: 'Phishing Awareness',
  HYGIENE: 'Basic Hygiene',
  OVERALL: 'Overall Risk',
};

/**
 * Multiple-choice format
 * - options: array of answer strings
 * - correct: the index (0-based) of the correct option
 * - weight: 1 
 */
export const QUESTIONS = [
  // PHISHING AWARENESS 
  {
    id: 'phish_sender_domain',
    text: 'You receive an email from “support@paypaI.com” asking you to confirm your account. What is the safest first check?',
    category: CATEGORIES.PHISHING,
    weight: 1,
    options: [
      'Click the link to see where it goes',
      'Reply and ask if it is real',
      'Hover or tap the address and link to inspect the real domain',
      'Forward it to a friend',
    ],
    correct: 2,
  },
  {
    id: 'phish_report_button',
    text: 'Your company provides a “Report Phish” button in the mail client. What should you do with a suspicious email?',
    category: CATEGORIES.PHISHING,
    weight: 1,
    options: [
      'Delete it without telling anyone',
      'Report it with the button, then leave it alone',
      'Reply asking for more info',
      'Move it to a new folder',
    ],
    correct: 1,
  },
  {
    id: 'phish_urgency',
    text: 'A message says “ACT NOW or your account will be closed in 1 hour.” What is the best response?',
    category: CATEGORIES.PHISHING,
    weight: 1,
    options: [
      'Click quickly to avoid being locked out',
      'Search the web for the exact message and follow any link you find',
      'Ignore urgency and verify through the official website or app directly',
      'Forward to teammates to crowdsource',
    ],
    correct: 2,
  },
  {
    id: 'phish_attachment',
    text: 'An unexpected invoice attachment arrives from a vendor. What should you do first?',
    category: CATEGORIES.PHISHING,
    weight: 1,
    options: [
      'Open it to see what it is',
      'Upload it to a personal drive',
      'Verify with the vendor via a known good channel before opening',
      'Print it',
    ],
    correct: 2,
  },
  {
    id: 'phish_link_preview',
    text: 'What is a safe way to check a link before clicking?',
    category: CATEGORIES.PHISHING,
    weight: 1,
    options: [
      'Hover or long-press to preview the true URL and domain',
      'Click it and close fast',
      'Copy it to a new mail',
      'Paste it into any website',
    ],
    correct: 0,
  },
  {
    id: 'phish_sms',
    text: 'You get a text with a password reset link. What is the safest action?',
    category: CATEGORIES.PHISHING,
    weight: 1,
    options: [
      'Tap the link because texts are trusted',
      'Type the company’s official site address yourself in the browser or use the official app',
      'Screenshot it and share on social media',
      'Ignore all texts always',
    ],
    correct: 1,
  },
  {
    id: 'phish_spoofed_display',
    text: 'The display name shows your CFO, but the email domain looks off. What is true?',
    category: CATEGORIES.PHISHING,
    weight: 1,
    options: [
      'Display name proves identity',
      'It is safe if they ask for gift cards',
      'Display names can be spoofed. Check the real sender domain',
      'All internal emails end in .org',
    ],
    correct: 2,
  },
  {
    id: 'phish_training_frequency',
    text: 'Best practice for phishing awareness is to run which of the following?',
    category: CATEGORIES.PHISHING,
    weight: 1,
    options: [
      'One long training every 5 years',
      'Short recurring training and periodic simulations with feedback',
      'No training since filters catch all phish',
      'Only new hires need training',
    ],
    correct: 1,
  },

  // BASIC HYGIENE
  {
    id: 'hyg_mfa_scope',
    text: 'Which accounts should have multi-factor authentication enabled?',
    category: CATEGORIES.HYGIENE,
    weight: 1,
    options: [
      'Only admin users',
      'Only remote workers',
      'All users and admins where supported',
      'Nobody. MFA is optional',
    ],
    correct: 2,
  },
  {
    id: 'hyg_updates',
    text: 'Security updates for systems and apps should be applied within what general time frame?',
    category: CATEGORIES.HYGIENE,
    weight: 1,
    options: [
      'Within 14 to 30 days depending on severity',
      'Once per year',
      'Only before audits',
      'Whenever someone remembers',
    ],
    correct: 0,
  },
  {
    id: 'hyg_password_manager',
    text: 'Why use a password manager?',
    category: CATEGORIES.HYGIENE,
    weight: 1,
    options: [
      'To reuse the same strong password everywhere',
      'To store unique strong passwords and reduce phishing by auto-filling only on correct domains',
      'To share passwords in chat',
      'To avoid MFA',
    ],
    correct: 1,
  },
  {
    id: 'hyg_backups',
    text: 'Which statement best matches good backup practice?',
    category: CATEGORIES.HYGIENE,
    weight: 1,
    options: [
      'Backups are enough even if we never test restore',
      'Backups should be regular, versioned, and restore should be tested',
      'Only back up laptops',
      'Backups are unnecessary with cloud apps',
    ],
    correct: 1,
  },
  {
    id: 'hyg_least_privilege',
    text: 'Least privilege means what?',
    category: CATEGORIES.HYGIENE,
    weight: 1,
    options: [
      'Give everyone admin to move fast',
      'Grant only the minimum access needed for a role',
      'Block all access by default forever',
      'Rotate people weekly',
    ],
    correct: 1,
  },
  {
    id: 'hyg_device_baseline',
    text: 'A secure device baseline usually includes which items?',
    category: CATEGORIES.HYGIENE,
    weight: 1,
    options: [
      'Screen lock, disk encryption, EDR/antivirus, and MDM enrollment',
      'No screen lock for convenience',
      'Browser toolbars',
      'Torrent clients',
    ],
    correct: 0,
  },
  {
    id: 'hyg_incident_contact',
    text: 'What improves incident readiness?',
    category: CATEGORIES.HYGIENE,
    weight: 1,
    options: [
      'A named incident contact and at least one tabletop exercise',
      'Rely on good luck',
      'Only buy cyber insurance',
      'Store response docs only on one laptop',
    ],
    correct: 0,
  },
  {
    id: 'hyg_shadow_it',
    text: 'Which is the best approach to shadow IT apps discovered in use?',
    category: CATEGORIES.HYGIENE,
    weight: 1,
    options: [
      'Ignore them if popular',
      'Block everything without review',
      'Evaluate risk, provide approved alternatives, and guide users to safer tools',
      'Move them to a personal email',
    ],
    correct: 2,
  },
];
