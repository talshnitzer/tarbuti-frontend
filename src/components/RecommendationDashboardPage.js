import React, { useReducer } from "react";
import PropTypes from "prop-types";

import CssBaseline from "@material-ui/core/CssBaseline";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TuneRoundedIcon from "@material-ui/icons/TuneRounded";
import Grid from "@material-ui/core/Grid";

import RecommendationsFilters from "./RecommendationsFilters";
import FiltersContext from "../context/filters-context";
import filtersReducer from "../reducers/filtersReducer";
import RemmendationList from "../components/RecommendationList";
import homeTitleBgImage from "../img/homeTitleBg.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `#69EAEF`,
    height: "2.3em",
    color: theme.palette.info.dark,
    paddingRight: "24px",
    [theme.breakpoints.up("sm")]: {
      background: `url(${homeTitleBgImage}) right no-repeat #69EAEF`,
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
      paddingTop: "24px",
    },
  },
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
    position: "sticky",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function RecommendationDashboardPage(props) {
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const initialState = {
    tags1: [],
    tags2: [],
    tags3: [],
    tags4: [],
    sortBy: "date",
  };
  const [filters, filtersDispatch] = useReducer(filtersReducer, initialState);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <RecommendationsFilters />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <FiltersContext.Provider value={{ filters, filtersDispatch }}>
      <CssBaseline />
      <div>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          className={classes.title}
        >
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <TuneRoundedIcon />
          </IconButton>
          המלצות מארגני אירועי תרבות במשגב
        </Typography>
      </div>

      <div className={classes.root}>
        <div className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </div>

        <main className={classes.content}>
          <Grid container spacing={2}>
            <RemmendationList />
          </Grid>
        </main>
      </div>
    </FiltersContext.Provider>
  );
}

RecommendationDashboardPage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default RecommendationDashboardPage;
