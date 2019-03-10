import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    primary: { main: '#0477BE' },
    secondary: { main: '#ff9103'},
    error: { main: '#ff3203' },
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    useNextVariants: true,
  },
});
const MuiTheme = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
);

export default MuiTheme;
