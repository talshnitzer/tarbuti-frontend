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

// P.Z: General comment, It's recommended to make a habit to auto-format when after each coding session.
const theme = createMuiTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  heIL
);
//Code review branch
let userGet = false;
//define the user state with useReducer.
//upload the user details from local storage if exist
const App = () => {
  const [user, dispatchUser] = useReducer(usersReducer, undefined);
  //P.Z: It's not so common to use so many logs. those logs are obviously for debugging.
  //     Try to make a habit of cleaning the code after you done debugging.
  console.log("App--- user", user);
  const [recommendations, dispatch] = useReducer(recommendationsReducer, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    //P.Z: It's usually common to create a const action object (or objects) that will contain those strings.
    //    const ACTIONS = {POPULATES_USER: "POPULATES_USER"}
    //    Generally, Try to avoid using magics in your code.
    dispatchUser({ type: "POPULATES_USER", user: userData });
    userGet = true;
    console.log("App---useEffect userGet", userGet);
  }, []);

  //P.Z: why would you use two separate useEffects when they both have the same dependency list?
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

  // P.Z: In this cases I would prefer to use actually the data that you are looking for.
  // In this case, I would use "user.id" or just "user".
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
