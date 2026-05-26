// Minimal test setup for Vitest (JSDOM)
// Polyfill IntersectionObserver and other browser APIs used by framer-motion

class MockIntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

// @ts-ignore
global.IntersectionObserver = global.IntersectionObserver || MockIntersectionObserver;

// Provide a minimal URL constructor in case environment lacks it (usually present)
if (typeof global.URL === 'undefined') {
  // @ts-ignore
  global.URL = function URL(s) { return { href: String(s) }; };
}
