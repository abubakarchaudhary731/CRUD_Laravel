import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#FA7317',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1F2937',
    },
    error: {
      main: '#c62828',
    },
    warning: {
      main: '#E3A008',
    },
    success: {
      main: '#ffffff',
    },
    background: {
      default: '#f7f8fa',
      // paper: '#f7f8fa',
    },
    text: {
      // primary: '#E3A008',
    },
  },

});

export default theme;
