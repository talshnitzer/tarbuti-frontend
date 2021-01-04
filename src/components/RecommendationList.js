import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";

import Recommendation from "./RecommendationListItem";
import RecommendationContext from "../context/recommendations-context";
import FiltersContext from "../context/filters-context";
import filtersFunc from "../services/filters";

const RecommendationList = () => {
  const { recommendations } = useContext(RecommendationContext);
  const { filters } = useContext(FiltersContext);
  console.log("RecommendationList recommendations:----", recommendations);
  console.log("RecommendationList filters:----", filters);
  const filteredRecommendations = filtersFunc(recommendations, filters);
  return filteredRecommendations.map((recommendation) => (
    <Grid item xs={12} key={recommendation._id}>
      <Recommendation
        key={recommendation._id}
        recommendation={recommendation}
      />
    </Grid>
  ));
};

export { RecommendationList as default };
