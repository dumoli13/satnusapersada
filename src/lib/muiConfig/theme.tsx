import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#FEF1F0',
      main: '#FF453F',
      dark: '#B10A04',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#F8F0FF',
      main: '#991FF9',
      dark: '#5B029F',
      contrastText: '#FFFFFF',
    },
    error: {
      light: '#FEF1F2',
      main: '#B0030D',
      dark: '#B0030D',
      contrastText: '#FEF1F2',
    },
    warning: {
      light: '#FEFAF1',
      main: '#FFC024',
      dark: '#C28D08',
      contrastText: '#FEFAF1',
    },
    info: {
      light: '#F1FAFE',
      main: '#0EACF0',
      dark: '#0782B6',
      contrastText: '#F1FAFE',
    },
    success: {
      light: '#F1FDFC',
      main: '#00C6AD',
      dark: '#039E8B',
      contrastText: '#F1FDFC',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 16px 12px 16px',
          fontWeight: 700,
          fontSize: '1rem',
          borderRadius: '6px',
        },
        sizeLarge: {
          height: 48,
        },
        sizeMedium: {
          height: 37,
        },
        sizeSmall: {
          height: 30,
        },
      },
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
