import type { SystemConfig } from '@chakra-ui/react';

import addressEntity from './globals/address-entity';
import entity from './globals/entity';
import recaptcha from './globals/recaptcha';
import scrollbar from './globals/scrollbar';

const webkitAutofillOverrides = {
  WebkitTextFillColor: 'var(--chakra-colors-input-fg)',
  '-webkit-box-shadow': '0 0 0px 1000px var(--chakra-colors-input-bg) inset',
  transition: 'background-color 5000s ease-in-out 0s',
};

const webkitAutofillRules = {
  '&:-webkit-autofill': webkitAutofillOverrides,
  '&:-webkit-autofill:hover': webkitAutofillOverrides,
  '&:-webkit-autofill:focus': webkitAutofillOverrides,
};

const globalCss: SystemConfig['globalCss'] = {
  body: {
    bg: 'global.body.bg',
    color: 'global.body.fg',
    WebkitTapHighlightColor: 'transparent',
    fontVariantLigatures: 'no-contextual',
    focusRingStyle: 'hidden',
    // iOS Safari optimizations
    WebkitTouchCallout: 'none',
  },
  mark: {
    bg: 'global.mark.bg',
    color: 'inherit',
  },
  'svg *::selection': {
    color: 'none',
    background: 'none',
  },

  // Mobile touch optimizations
  'button, [role="button"], input[type="button"], input[type="submit"], input[type="reset"]': {
    // Ensure minimum touch target size on mobile
    '@media (max-width: 999px)': {
      minHeight: '44px',
      minWidth: '44px',
    },
  },

  'a, button, [role="button"]': {
    // Remove default tap highlight on iOS
    WebkitTapHighlightColor: 'transparent',
    // Prevent text selection on touch
    WebkitTouchCallout: 'none',
  },

  // iOS Safari safe area support
  '@supports (padding: max(0px))': {
    '& .safe-area-top': {
      paddingTop: 'max(16px, env(safe-area-inset-top))',
    },
    '& .safe-area-bottom': {
      paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
    },
    '& .safe-area-left': {
      paddingLeft: 'max(16px, env(safe-area-inset-left))',
    },
    '& .safe-area-right': {
      paddingRight: 'max(16px, env(safe-area-inset-right))',
    },
    '& .safe-area-all': {
      paddingTop: 'max(16px, env(safe-area-inset-top))',
      paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
      paddingLeft: 'max(16px, env(safe-area-inset-left))',
      paddingRight: 'max(16px, env(safe-area-inset-right))',
    },
  },
  form: {
    w: '100%',
  },
  input: {
    // hide number input arrows in Google Chrome
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    ...webkitAutofillRules,
  },
  textarea: {
    ...webkitAutofillRules,
  },
  select: {
    ...webkitAutofillRules,
  },
  // Hide React Query DevTools
  '[data-react-query-devtools-root]': {
    display: 'none !important',
  },
  'button[aria-label*="React Query"]': {
    display: 'none !important',
  },
  'button[aria-label*="TanStack Query"]': {
    display: 'none !important',
  },
  'div[class*="react-query-devtools"]': {
    display: 'none !important',
  },
  'div[class*="tanstack-query-devtools"]': {
    display: 'none !important',
  },
  ...recaptcha,
  ...scrollbar,
  ...entity,
  ...addressEntity,
};

export default globalCss;
