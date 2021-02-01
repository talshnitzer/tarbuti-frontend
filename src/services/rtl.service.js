
import { create } from "jss";
import rtl from "jss-rtl";
import {
  createMuiTheme,
  StylesProvider,
  jssPreset,
} from "@material-ui/core/styles";
import { heIL } from "@material-ui/core/locale";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme(
  {
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

export {theme, RTL}