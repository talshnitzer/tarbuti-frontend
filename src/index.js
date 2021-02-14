import React, { useReducer, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import AppRouter from "./routers/AppRouters";
import UsersContext from "./context/users-context";
import usersReducer from "./reducers/usersReduder";
import LoadingPage from "./components/LoadingPage";
import RecommendationsContext from "./context/recommendations-context";
import recommendationsReducer from "./reducers/recommendations";
import ErrorContext from "./context/error-context";
import { sendGetReq } from "./services/api.service";
import { theme, RTL } from "./services/theme.service";

import { ThemeProvider } from "@material-ui/core/styles";

let userGet = false;
//define the user state with useReducer.
//upload the user details from local storage if exist
const App = () => {
  const [user, dispatchUser] = useReducer(usersReducer, undefined);
  console.log("App--- user", user);
  const [recommendations, dispatch] = useReducer(recommendationsReducer, []);

  const [error, setError] = useState(undefined);
  const [open, setOpen] = React.useState(false);

  const handleOpenError = (errorMsg) => {
    console.log("handleOpenError (errorMsg)", errorMsg);
    setError(`${errorMsg}`);
    setOpen(true);
  };

  //handle error dialog box
  const handleCloseError = () => {
    setOpen(false);
    setError(null);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    dispatchUser({ type: "POPULATES_USER", user: userData });
    userGet = true;
    console.log("App---useEffect userGet", userGet);
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log("App---fetchData-enter");
      const response = await sendGetReq("/recommendation/all");
      console.log("App--- response from sendGetReq", response);
      if (response.body.length > 0) {
        console.log(
          "App---useEffect---fetchData response.length",
          response.body.length
        );
        dispatch({
          type: "POPULATES_RECOMMENDATIONS",
          recommendations: response.body,
        });
      }
    }
    fetchData();
  }, []);

  if (userGet === true) {
    return (
      <RTL>
        <RecommendationsContext.Provider value={{ recommendations, dispatch }}>
          <UsersContext.Provider value={{ user, dispatchUser }}>
            <ErrorContext.Provider
              value={{ error, open, handleOpenError, handleCloseError }}
            >
              <ThemeProvider theme={theme}>
                <AppRouter />
              </ThemeProvider>
            </ErrorContext.Provider>
          </UsersContext.Provider>
        </RecommendationsContext.Provider>
      </RTL>
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
