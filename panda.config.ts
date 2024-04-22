import { defineConfig, definePreset } from '@pandacss/dev';

export const preset = definePreset({
  globalCss: {
    html: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontWeight: 'normal',
      lineHeight: '1.5rem',
      color: 'black.500',
    },
    img: {
      display: 'inline-block',
    },
    svg: {
      pointerEvents: 'none',
      display: 'inline-flex',
      transition: 'all 200ms ease-in',
    },
    b: {
      fontWeight: 'bold',
    },
    strong: {
      fontWeight: 'bold',
    },
    i: {
      fontStyle: 'italic',
    },
    em: {
      fontStyle: 'italic',
    },
    a: {
      color: 'primary.blue.5',
      transitionProperty: 'opacity',
      transitionDuration: 'fast',
      transitionTimingFunction: 'ease',
    },
    table: {
      borderSpacing: '0',
    },
    // Rich text content classes
    '.h1': {
      fontWeight: 'bold',
      textStyle: '2xl',
    },
    '.h2': {
      fontWeight: 'bold',
      textStyle: 'xl',
    },
    '.h3': {
      fontWeight: 'bold',
      textStyle: 'large',
    },
    '.bold': {
      fontWeight: 'bold',
    },
    '.italic': {
      fontStyle: 'italic',
    },
    '.strikethrough': {
      textDecoration: 'line-through',
    },
    '.subscript': {
      verticalAlign: 'sub',
      fontStyle: 'xs',
    },
    '.superscript': {
      verticalAlign: 'super',
      fontStyle: 'xs',
    },
    '.underline': {
      textDecoration: 'underline',
    },
    '.underline-strikethrough': {
      textDecoration: 'underline line-through',
    },
    '.ul': {
      listStylePosition: 'inside',
      paddingLeft: 'base',
    },
    '.ul1': {
      listStyleType: 'disc',
    },
    '.ul2': {
      listStyleType: 'circle',
    },
    '.ul3': {
      listStyleType: 'square',
    },
    '.ol': {
      listStylePosition: 'inside',
      paddingLeft: 'base',
    },
    '.ol1': {
      listStyleType: 'decimal',
    },
    '.ol2': {
      listStyleType: 'lower-alpha',
    },
    '.ol3': {
      listStyleType: 'lower-roman',
    },
    '.nested-li': {
      listStyleType: 'none',
    },
  },
  theme: {
    tokens: {
      colors: {
        primary: {
          10: { value: '#FEF1F0' },
          20: { value: '#FA7470' },
          30: { value: '#FF453F' },
          40: { value: '#B10A04' },
          50: { value: '#540503' },
        },
        secondary: {
          10: { value: '#F8F0FF' },
          20: { value: '#C17DF7' },
          30: { value: '#991FF9' },
          40: { value: '#5B029F' },
          50: { value: '#310155' },
        },
        success: {
          10: { value: '#F1FDFC' },
          20: { value: '#63EBDA' },
          30: { value: '#00C6AD' },
          40: { value: '#039E8B' },
          50: { value: '#026054' },
        },
        info: {
          10: { value: '#F1FAFE' },
          20: { value: '#6ECEF7' },
          30: { value: '#0EACF0' },
          40: { value: '#0782B6' },
          50: { value: '#055679' },
        },
        warning: {
          10: { value: '#FEFAF1' },
          20: { value: '#FBDC8D' },
          30: { value: '#FFC024' },
          40: { value: '#C28D08' },
          50: { value: '#6C4E03' },
        },
        error: {
          10: { value: '#FEF1F2' },
          20: { value: '#F99096' },
          30: { value: '#DC101C' },
          40: { value: '#B0030D' },
          50: { value: '#790209' },
        },
        inherit: {
          10: { value: '#F4F5F6' },
          20: { value: '#E0E2E6' },
          30: { value: '#616975' },
          40: { value: '#979FAA' },
          50: { value: '#616975' },
        },
        light: {
          foreground: {
            10: { value: '#FFFFFF' },
            20: { value: '#EFF0F0' },
            30: { value: '#E0E2E6' },
            40: { value: '#CACED3' },
            50: { value: '#979FAA' },
            60: { value: '#616975' },
            70: { value: '#141517' },
          },
          background: {
            10: { value: '#141517' },
            20: { value: '#535A64' },
            30: { value: '#7F8894' },
            40: { value: '#D2D5DA' },
            50: { value: '#E9EBED' },
            60: { value: '#F4F5F6' },
            70: { value: '#FFFFFF' },
          },
        },
        dark: {
          foreground: {
            10: { value: '#141517' },
            20: { value: '#292D32' },
            30: { value: '#434951' },
            40: { value: '#707B89' },
            50: { value: '#DADDE1' },
            60: { value: '#EFF0F0' },
            70: { value: '#FFFFFF' },
          },
          background: {
            10: { value: '#E9EAED' },
            20: { value: '#F4F5F6' },
            30: { value: '#FFFFFF' },
            40: { value: '#CACED3' },
            50: { value: '#141517' },
            60: { value: '#22252A' },
            70: { value: '#2E3138' },
          },
        },
        accent: {
          neutral: {
            base: { value: '#FFFFFF' },
            soft: { value: '#EFF0F0' },
            main: { value: '#DADDE1' },
            robust: { value: '#BEC3CA' },
            heavy: { value: '#7F8894' },
            super: { value: '#535A64' },
            max: { value: '#141517' },
          },
          overlay: {
            base: { value: '#141517' },
            soft: { value: '#141517' },
          },
        },
        gradient_dark: { value: '#2c445b' },
        dark_overlay: { value: '#001122' },
        line: {
          primary: { value: '#cfdcee' },
          secondary: { value: '#edf3fc' },
        },
      },
      spacing: {
        '0': { value: 0 },
        '6xs': { value: '0.125rem' }, // 2px
        '5xs': { value: '0.25rem' }, // 4px
        '4xs': { value: '0.375rem' }, // 6px
        '3xs': { value: '0.5rem' }, // 8px
        '2xs': { value: '0.625rem' }, // 10px
        xs: { value: '0.75rem' }, // 12px
        small: { value: '0.875rem' }, // 14px
        base: { value: '1rem' }, // 16px
        large: { value: '1.25rem' }, // 20px
        xl: { value: '1.5rem' }, // 24px
        '2xl': { value: '2rem' }, // 32px
        '3xl': { value: '2.5rem' }, // 40px
        '4xl': { value: '3rem' }, // 48px
        '5xl': { value: '3.5rem' }, // 56px
        '6xl': { value: '4rem' }, // 64px
        '7xl': { value: '5rem' }, // 80px
        '8xl': { value: '6rem' }, // 96px
        full: { value: '100%' },
        '1/2': { value: '50%' },
      },
      sizes: {
        '0': { value: '0' },
        '6xs': { value: '0.125rem' }, // 2px
        '5xs': { value: '0.25rem' }, // 4px
        '4xs': { value: '0.375rem' }, // 6px
        '3xs': { value: '0.5rem' }, // 8px
        '2xs': { value: '0.625rem' }, // 10px
        xs: { value: '0.75rem' }, // 12px
        small: { value: '0.875rem' }, // 14px
        base: { value: '1rem' }, // 16px
        large: { value: '1.25rem' }, // 20px
        xl: { value: '1.5rem' }, // 24px
        '2xl': { value: '2rem' }, // 32px
        '3xl': { value: '2.5rem' }, // 40px
        '4xl': { value: '3rem' }, // 48px
        '5xl': { value: '3.5rem' }, // 56px
        '6xl': { value: '4rem' }, // 64px
        '7xl': { value: '5rem' }, // 80px
        '8xl': { value: '6rem' }, // 96px
        '9xl': { value: '8rem' }, // 128px
        '10xl': { value: '9rem' }, // 144px
        '11xl': { value: '10rem' }, // 160px
        '12xl': { value: '11rem' }, // 176px
        '13xl': { value: '12rem' }, // 192px
        '14xl': { value: '13rem' }, // 208px
        '15xl': { value: '14rem' }, // 224px
        '16xl': { value: '15rem' }, // 240px
        '17xl': { value: '16rem' }, // 256px
        '18xl': { value: '18rem' }, // 288px
        '19xl': { value: '20rem' }, // 320px
        '20xl': { value: '24rem' }, // 384px
        'max-content': { value: 'max-content' },
        '9/10': { value: '90%' },
        '1/4': { value: '25%' },
        '1/2': { value: '50%' },
        full: { value: '100%' },
        '50vh': { value: '50vh' },
        '50vw': { value: '50vw' },
        '100vh': { value: '100vh' },
        '100vw': { value: '100vw' },
        'modal-width': { value: '600px' },
        'desktop-container': { value: '1280px' },
      },
      radii: {
        none: { value: 'none' },
        small: { value: '4px' },
        base: { value: '8px' },
        large: { value: '16px' },
        xl: { value: '24px' },
        full: { value: '50%' },
      },
      opacity: {
        normal: { value: 1 },
        hover: { value: 0.8 },
        active: { value: 0.7 },
        hidden: { value: 0 },
      },
      shadows: {
        default: {
          value:
            '0px 1px 1px rgba(81, 113, 145, 0.08), 0px 2px 1px rgba(81, 113, 145, 0.07), 0px 1px 7px rgba(81, 113, 145, 0.14)',
        },
        sticky: {
          value:
            '0px 0px 1px rgba(81, 113, 145, 0.48), 0px 2px 11px rgba(81, 113, 145, 0.1)',
        },
        float: {
          value:
            '0px 0px 1px rgba(81, 113, 145, 0.48), 0px 0px 56px rgba(81, 113, 145, 0.08), 0px 14px 42px rgba(81, 113, 145, 0.16)',
        },
        high: { value: '0px 2px 22px 3px rgba(86, 110, 143, 0.1)' },
      },
      fontSizes: {
        '2xs': { value: '0.625rem' }, // 10px
        xs: { value: '0.75rem' }, // 12px
        small: { value: '0.875rem' }, // 14px
        base: { value: '1rem' }, // 16px
        large: { value: '1.125rem' }, // 18px
        xl: { value: '1.25rem' }, // 20px
        '2xl': { value: '1.5rem' }, // 24px
        '3xl': { value: '1.75rem' }, // 28px
        '4xl': { value: '2rem' }, // 32px
        '5xl': { value: '2.5rem' }, // 40px
        '6xl': { value: '3rem' }, // 48px
        '7xl': { value: '3.5rem' }, // 56px
        '8xl': { value: '4rem' }, // 64px
      },
      lineHeights: {
        '2xs': { value: '0.875rem' }, // 14px
        xs: { value: '1rem' }, // 16px
        small: { value: '1.25rem' }, // 20px
        base: { value: '1.5rem' }, // 24px
        large: { value: '1.625rem' }, // 26px
        xl: { value: '1.75rem' }, // 28px
        '2xl': { value: '2rem' }, // 32px
        '3xl': { value: '2.25rem' }, // 36px
        '4xl': { value: '2.5rem' }, // 40px
        '5xl': { value: '3rem' }, // 48px
        '6xl': { value: '3.5rem' }, // 56px
        '7xl': { value: '4rem' }, // 64px
        '8xl': { value: '4.5rem' }, // 72px
      },
      fontWeights: {
        reguler: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },
      zIndex: {
        snackbar: { value: 1001 },
        modal: { value: 1000 },
        dropdown: { value: 999 },
        sidebar: { value: 900 },
        navbar: { value: 100 },
        overlay: { value: 10 },
      },
      easings: {
        ease: { value: 'ease' },
        easeIn: { value: 'ease-in' },
        easeOut: { value: 'ease-out' },
        easeInOut: { value: 'ease-in-out' },
      },
      durations: {
        fast: { value: '200ms' },
        medium: { value: '300ms' },
      },
      borders: {
        none: { value: 'none' },
        primary: { value: '1px solid {colors.primary.30}' },
        secondary: { value: '1px solid {colors.secondary.30}' },
        success: { value: '1px solid {colors.success.30}' },
        info: { value: '1px solid {colors.info.30}' },
        error: { value: '1px solid {colors.error.30}' },
        warning: { value: '1px solid {colors.warning.30}' },
        neutral: { value: '1px solid {colors.line.primary}' },
        disabled: { value: '1px solid {colors.line.secondary}' },
      },
    },
    textStyles: {
      '2xs': { value: { fontSize: '0.625rem', lineHeight: '0.875rem' } },
      xs: { value: { fontSize: '0.75rem', lineHeight: '1rem' } },
      small: { value: { fontSize: '0.875rem', lineHeight: '1.25rem' } },
      base: { value: { fontSize: '1rem', lineHeight: '1.5rem' } },
      large: { value: { fontSize: '1.125rem', lineHeight: '1.625rem' } },
      xl: { value: { fontSize: '1.25rem', lineHeight: '1.75rem' } },
      '2xl': { value: { fontSize: '1.5rem', lineHeight: '2rem' } },
      '3xl': { value: { fontSize: '1.75rem', lineHeight: '2.25rem' } },
      '4xl': { value: { fontSize: '2rem', lineHeight: '2.5rem' } },
      '5xl': { value: { fontSize: '2.5rem', lineHeight: '3rem' } },
      '6xl': { value: { fontSize: '3rem', lineHeight: '3.5rem' } },
      '7xl': { value: { fontSize: '3.5rem', lineHeight: '4rem' } },
      '8xl': { value: { fontSize: '4rem', lineHeight: '4.5rem' } },
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    keyframes: {
      skeleton: {
        '0%': { backgroundColor: '#c8c8c8' },
        '50%': { backgroundColor: '#eff0f6' },
        '100%': { backgroundColor: '#c8c8c8' },
      },
    },
  },
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/app/**/*.{ts,tsx,js,jsx}',
  ],

  // Files to exclude
  exclude: [],
  presets: [preset],
  strictTokens: true,
  outExtension: 'js',
  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',
});
