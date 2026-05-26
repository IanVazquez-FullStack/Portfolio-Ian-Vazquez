---
title: 'Fix script tag console error in RootLayout'
type: 'bugfix'
created: '2026-05-26'
status: 'done'
route: 'one-shot'
---

# Fix script tag console error in RootLayout

## Intent

**Problem:** Next.js 16.2.6 App Router throws a console error when encountering a raw `<script>` tag inside a React component during client render, preventing the theme initialization script from executing.

**Approach:** Replace the inline `<script dangerouslySetInnerHTML>` with the `Script` component from `next/script` using `strategy="beforeInteractive"`, which is the canonical App Router API for injecting scripts before hydration.

## Suggested Review Order

1. **[Injection method]** `src/app/layout.tsx:50` — Verify `Script` from `next/script` is correctly configured with `beforeInteractive` strategy and the same IIFE content.
2. **[Import]** `src/app/layout.tsx:1` — Confirm the `next/script` import is present and there are no leftover `<head>` wrappers.
