
import { create } from "jss";
import rtl from "jss-rtl";
import {
  createMuiTheme,
  StylesProvider,
  jssPreset,
  responsiveFontSizes
} from "@material-ui/core/styles";
import { heIL } from "@material-ui/core/locale";

//RTL support
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

let theme = createMuiTheme(
  {
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
      primary: { main: "#1976d2" },
    },
    direction: "rtl",
  },
  heIL
);

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}

//responsive font

theme = responsiveFontSizes(theme);

export {theme, RTL}