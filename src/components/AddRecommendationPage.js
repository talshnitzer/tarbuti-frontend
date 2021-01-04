import React, { useReducer, useContext } from "react";
import { useHistory } from "react-router-dom";

import recommendationsReducer from "../reducers/recommendations";
import RecommendationForm from "./RecommendationForm";
import RecommendationsContext from "../context/recommendations-context";
import UsersContext from "../context/users-context";
import { sendAuthPostReq } from "../services/api.service";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const AddRecommendationPage = () => {
  const history = useHistory();
  const [, dispatch] = useReducer(recommendationsReducer, []); //the useReducer returns an array with my state and a dispatch function
  const { user } = useContext(UsersContext);
  const token = user.token;

  const myOnSubmit = async (values) => {
    console.log("RecommendationForm-----values token", values, token);
    const responseBody = await sendAuthPostReq(
      token,
      values,
      "/recommendation/create"
    );
    console.log(
      "RecommendationForm-----myOnSubmit---responseBody after await",
      responseBody
    );
    const recommendation = { ...responseBody };
    delete recommendation.__v;
    dispatch({
      type: "ADD_RECOMMENDATIONS",
      recommendation,
    });
    history.push("/dashboard");
  };

  return (
    <RecommendationsContext.Provider value={{ dispatch }}>
      <CssBaseline />
      <Container maxWidth="md" component="main">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          ההמלצה שלי
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          ארגנתם ארוע מוצלח? שתפו המלצה על המוצר/השרות שעזר לארוע שלכם להצליח.
          כך תעזרו לאחרים לארגן ארוע מוצלח ועל הדרך תעזרו גם לנותן השרות/מוצר
        </Typography>
        <RecommendationForm myOnSubmit={myOnSubmit} />
      </Container>
    </RecommendationsContext.Provider>
  );
};

export { AddRecommendationPage as default };
