import type { ThemingConfig } from '@chakra-ui/react';

import type { ExcludeUndefined } from 'types/utils';

import config from 'configs/app';

export const BODY_TYPEFACE = config.UI.fonts.body?.name ?? 'Inter, InterFallback';
export const HEADING_TYPEFACE = config.UI.fonts.heading?.name ?? 'Poppins';

export const fonts: ExcludeUndefined<ThemingConfig['tokens']>['fonts'] = {
  heading: { value: `${ HEADING_TYPEFACE }, sans-serif` },
  body: { value: `${ BODY_TYPEFACE }, sans-serif` },
};

export const textStyles: ThemingConfig['textStyles'] = {
  heading: {
    xl: {
      value: {
        fontSize: { base: '28px', md: '32px' },
        lineHeight: { base: '36px', md: '40px' },
        fontWeight: '500',
        letterSpacing: '-0.5px',
        fontFamily: 'heading',
      },
    },
    lg: {
      value: {
        fontSize: { base: '22px', md: '24px' },
        lineHeight: { base: '30px', md: '32px' },
        fontWeight: '500',
        fontFamily: 'heading',
      },
    },
    md: {
      value: {
        fontSize: { base: '18px', md: '18px' },
        lineHeight: { base: '26px', md: '24px' },
        fontWeight: '500',
        fontFamily: 'heading',
      },
    },
    sm: {
      value: {
        fontSize: { base: '16px', md: '16px' },
        lineHeight: { base: '24px', md: '24px' },
        fontWeight: '500',
        fontFamily: 'heading',
      },
    },
    xs: {
      value: {
        fontSize: { base: '15px', md: '14px' },
        lineHeight: { base: '22px', md: '20px' },
        fontWeight: '600',
        fontFamily: 'heading',
      },
    },
  },
  text: {
    xl: {
      value: {
        fontSize: { base: '18px', md: '20px' },
        lineHeight: { base: '26px', md: '28px' },
        fontWeight: '400',
        fontFamily: 'body',
      },
    },
    md: {
      value: {
        fontSize: { base: '16px', md: '16px' },
        lineHeight: { base: '24px', md: '24px' },
        fontWeight: '400',
        fontFamily: 'body',
      },
    },
    sm: {
      value: {
        fontSize: { base: '15px', md: '14px' },
        lineHeight: { base: '22px', md: '20px' },
        fontWeight: '400',
        fontFamily: 'body',
      },
    },
    xs: {
      value: {
        fontSize: { base: '14px', md: '12px' },
        lineHeight: { base: '20px', md: '16px' },
        fontWeight: '400',
        fontFamily: 'body',
      },
    },
  },
};
