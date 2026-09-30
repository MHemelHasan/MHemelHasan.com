# v3-brand — Portfolio & Brand Website

This is the primary personal brand and portfolio web application for **MHemelHasan.com**, built using Next.js (App Router), React 19, Tailwind CSS v4, and TypeScript.

---

## ⚠️ TEMPORARY ROUTE NOTICE: Short Saver Privacy Policy

> **Important**: This repository currently hosts a temporary, standalone Privacy Policy page for our external mobile application, **Short Saver**.
> This page is **NOT** part of the main `v3-brand` portfolio. It was created here temporarily to provide an active, public privacy policy URL for Google Play Store review/listing before the dedicated sub-folder or landing page for Short Saver is established.

### Route Details

- **Public Route Link:** `maindomain/ShortSaver/privacy-policy/`
- **Case-insensitive Route:** `maindomain/ShortSaver/privacy-policy` (and `maindomain/shortsaver/privacy-policy`)
- **File System Locations:**
  - Page Entrypoint: [`app/ShortSaver/privacy-policy/page.tsx`](file:///run/media/mhemelhasan/New%20Volume/My%20Projects/Working%20no/Other%20Work/MHemelHasan.com/v3-brand/app/ShortSaver/privacy-policy/page.tsx)
  - Helper Components: [`components/shortsaver/policy-actions.tsx`](file:///run/media/mhemelhasan/New%20Volume/My%20Projects/Working%20no/Other%20Work/MHemelHasan.com/v3-brand/components/shortsaver/policy-actions.tsx)

### How to Remove this Temporary Page

When the dedicated landing page or subfolder for **Short Saver** is ready:

1. **Delete the Route Directory:**
   ```bash
   rm -rf app/ShortSaver
   ```
2. **Delete the Component Directory:**
   ```bash
   rm -rf components/shortsaver
   ```
3. **Rebuild the project:**
   ```bash
   npm run build
   ```
