import React, { useReducer } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import RemmendationList from "../components/RecommendationList";
import RecommendationsFilters from "./RecommendationsFilters";
import FiltersContext from "../context/filters-context";
import filtersReducer from "../reducers/filtersReducer";
import homeTitleBgImage from "../img/homeTitleBg.png";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `url(${homeTitleBgImage}) right no-repeat #69EAEF`,
    height: "2.3em",
  },
});

const RecommendationDashboardPage = () => {
  const classes = useStyles();
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
      <Typography
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
        className={classes.title}
      >
        המלצות ממארגני אירועי תרבות במשגב
      </Typography>
      <Container maxWidth="md" component="main">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <RecommendationsFilters />
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={2}>
              <RemmendationList />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </FiltersContext.Provider>
  );
};

export { RecommendationDashboardPage as default };
