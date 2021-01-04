import React, { useReducer, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import recommendationsReducer from "../reducers/recommendations";
import RecommendationForm from "./RecommendationForm";
import RecommendationsContext from "../context/recommendations-context";
import UsersContext from "../context/users-context";
import { sendAuthPostReq, sendGetReq } from "../services/api.service";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const superagent = require("superagent");

const baseUrl = process.env.API_URL || "http://localhost:8080";

const EditRecommendationPage = () => {
  const { user } = useContext(UsersContext);
  const token = user.token;
  const history = useHistory();

  const { id } = useParams();
  const [recommendations, dispatch] = useReducer(recommendationsReducer, []); //the useReducer returns an array with my state and a dispatch function
  console.log(
    "EditRecommendationPage---recommendations array: ",
    recommendations
  );
  const recommendation =
    recommendations !== undefined
      ? recommendations.find(
          (recommendationItem) => recommendationItem._id === id
        )
      : {};

  const myOnSubmit = async (values) => {
    console.log("EditRecommendationPage-----values", values);
    const responseBody = await sendAuthPostReq(
      token,
      values,
      `/recommendation/update/${id}`
    );
    console.log(
      "EditRecommendationPage-----myOnSubmit---responseBody after await",
      responseBody
    );
    const recommendation = { ...responseBody };
    delete recommendation.__v;
    dispatch({
      type: "UPDATE_RECOMMENDATIONS",
      recommendation,
    });
    history.push("/dashboard");
  };

  useEffect(() => {
    async function fetchData() {
      const response = await sendGetReq(token);
      console.log(
        "RecommendationDashboardPage--- response from sendGetReq",
        response
      );
      if (response.length > 0) {
        dispatch({
          type: "POPULATES_RECOMMENDATIONS",
          recommendations: response,
        });
      }
    }
    fetchData();
  }, []);

  return (
    <RecommendationsContext.Provider value={{ recommendation, dispatch }}>
      <CssBaseline />
      <Container maxWidth="md" component="main">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          עריכת ההמלצה שלי
        </Typography>
        {recommendation !== undefined ? (
          <RecommendationForm
            recommendation={{ ...recommendation }}
            myOnSubmit={(values) => {
              myOnSubmit(values);
            }}
          />
        ) : (
          <p></p>
        )}
      </Container>
    </RecommendationsContext.Provider>
  );
};

export { EditRecommendationPage as default };
