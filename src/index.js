import React, { useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import AppRouter from "./routers/AppRouters";
import UsersContext from "./context/users-context";
import usersReducer from "./reducers/usersReduder";
import LoadingPage from "./components/LoadingPage";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { heIL } from "@material-ui/core/locale";

const theme = createMuiTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  heIL
);

let userGet = false;
//define the user state with useReducer.
//upload the user details from local storage if exist
const App = () => {
  const [user, dispatch] = useReducer(usersReducer, undefined);
  console.log("App--- user", user);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      dispatch({ type: "POPULATES_USER", user: userData });
    }
    userGet = true;
    console.log("App---useEffect userGet", userGet);
  }, []);

  if (userGet === true) {
    return (
      <UsersContext.Provider value={{ user, dispatch }}>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </UsersContext.Provider>
    );
  } else {
    return <LoadingPage />;
  }
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
