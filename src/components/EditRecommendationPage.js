import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import RecommendationForm from "./RecommendationForm";
import RecommendationsContext from "../context/recommendations-context";
import UsersContext from "../context/users-context";
import { sendAuthPostReq } from "../services/api.service";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const EditRecommendationPage = () => {
  const { user } = useContext(UsersContext);
  const { recommendations, dispatch } = useContext(RecommendationsContext);
  const token = user.token;
  const history = useHistory();
  const { id } = useParams();

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
    const response = await sendAuthPostReq(
      token,
      values,
      `/recommendation/update/${id}`
    );
    console.log(
      "EditRecommendationPage-----myOnSubmit---responseBody after await",
      response.body
    );
    const recommendation = { ...response.body };
    delete recommendation.__v;
    dispatch({
      type: "UPDATE_RECOMMENDATIONS",
      recommendation,
    });
    history.push("/");
  };

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
