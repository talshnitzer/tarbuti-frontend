import React, { useContext} from 'react'
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import RecommendationsContext from '../context/recommendations-context'
import UsersContext from '../context/users-context'


const RecommendationListItem = ({ recommendation }) => {
    const { dispatch } = useContext(RecommendationsContext)
    console.log('RecommendationListItem recommendation:---', recommendation);
    const {user} = useContext(UsersContext)
    const isUserRecommendation = recommendation._creatorId._id === user._id
    console.log('RecommendationListItem---user._id', user._id);
    console.log('RecommendationListItem---recommendation._creatorId._id', recommendation._creatorId._id);
    console.log('RecommendationListItem---isUserRecommendation', isUserRecommendation);
    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        margin: 'auto'
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
    }));
    
    
      const classes = useStyles();
    
      return (
        <Link className="list-item" to={`/edit/${recommendation._id}`} >
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                      {recommendation.serviceName}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                      {recommendation.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                      {recommendation.providerName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" style={{ cursor: 'pointer' }}>
                        <button onClick={() => dispatch({type: 'REMOVE_RECOMMENDATION', itemRecommended: recommendation.itemRecommended})}>פרטים</button>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item >
                    <Typography variant="subtitle1" gutterBottom>{recommendation.servicePrice}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Link>
        
      );  
  }

  export {RecommendationListItem as default}