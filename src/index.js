import React, { useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import AppRouter from "./routers/AppRouters";
import UsersContext from "./context/users-context";
import usersReducer from "./reducers/usersReduder";
import LoadingPage from "./components/LoadingPage";
import RecommendationsContext from "./context/recommendations-context";
import recommendationsReducer from "./reducers/recommendations";
import { sendGetReq } from "./services/api.service";

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
  const [user, dispatchUser] = useReducer(usersReducer, undefined);
  console.log("App--- user", user);
  const [recommendations, dispatch] = useReducer(recommendationsReducer, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      dispatchUser({ type: "POPULATES_USER", user: userData });
    }
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
      <RecommendationsContext.Provider value={{ recommendations, dispatch }}>
        <UsersContext.Provider value={{ user, dispatchUser }}>
          <ThemeProvider theme={theme}>
            <AppRouter />
          </ThemeProvider>
        </UsersContext.Provider>
      </RecommendationsContext.Provider>
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
