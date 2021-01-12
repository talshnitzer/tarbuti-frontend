import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import moment from 'moment';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

import UsersContext from "../context/users-context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    margin: "auto",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cardActions: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
}));

const RecommendationListItem = ({ recommendation }) => {
  const classes = useStyles();
  const history = useHistory();
  console.log("RecommendationListItem recommendation:---", recommendation);
  const { user } = useContext(UsersContext);
  const isUserRecommendation = recommendation._creatorId._id === user._id;
  console.log("RecommendationListItem---user._id", user._id);
  console.log(
    "RecommendationListItem---recommendation._creatorId._id",
    recommendation._creatorId._id
  );
  console.log(
    "RecommendationListItem---isUserRecommendation",
    isUserRecommendation
  );
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEdit = () => {
    console.log("RecommendationListItem handleEdit");
    history.push(`/edit/${recommendation._id}`);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs container direction="column" spacing={2}>
            <Typography
              gutterBottom
              variant="subtitle1"
              style={{ fontWeight: "bold" }}
            >
              {recommendation.serviceName}
            </Typography>
            <Typography variant="subtitle1">
              הספק: {recommendation.providerName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {recommendation.description}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.08)",
                paddingRight: 6,
                paddingLeft: 6,
              }}
            >
              מחיר: {recommendation.servicePrice}
            </Typography>
            <Typography variant="body1">
              {recommendation.priceRemarks}
            </Typography>
          </Grid>
        </Grid>
        <CardActions className={classes.cardActions} disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          {isUserRecommendation ? (
            <Button onClick={handleEdit} aria-label="edit">
              <EditIcon fontSize="small" />
            </Button>
          ) : (
            ""
          )}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {/* P.Z: A word about hebrew systems. As you noticed, it's pretty messy!
            It's highly recommended to use a multilingual support solution like react-i18next or react-intl */}
            <Typography gutterBottom variant="subtitle1">
              תאריך רישום ההמלצה: {moment(recommendation.createdAt).format('DD/MM/YYYY')}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              תאריך הארוע: {recommendation.eventDate}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              אימייל הספק: {recommendation.providerEmail}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              הומלץ ע״י: {recommendation._creatorId.firstName}{" "}
              {recommendation._creatorId.lastName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              מהיישוב: {recommendation._creatorId.community}
            </Typography>
          </CardContent>
        </Collapse>
      </Paper>
    </div>
  );
};

export { RecommendationListItem as default };
