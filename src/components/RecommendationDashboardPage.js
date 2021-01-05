import React, { useReducer } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import RemmendationList from "../components/RecommendationList";
import RecommendationsFilters from "../components/RecommendationsFilters";
import FiltersContext from "../context/filters-context";
import filtersReducer from "../reducers/filtersReducer";

const RecommendationDashboardPage = () => {
  const initialState = {
    tags1: [],
    tags2: [],
    tags3: [],
    tags4: [],
    sortBy: "date",
  };
  const [filters, filtersDispatch] = useReducer(filtersReducer, initialState);

  return (
    <FiltersContext.Provider value={{ filters, filtersDispatch }}>
      <CssBaseline />
      <Container maxWidth="md" component="main">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          המלצות ממארגני אירועי תרבות במשגב
        </Typography>
        <Grid container spacing={4}>
          <RecommendationsFilters />
        </Grid>
        <br />
        <br />
        <Grid container spacing={2}>
          <RemmendationList />
        </Grid>
      </Container>
    </FiltersContext.Provider>
  );
};

export { RecommendationDashboardPage as default };
