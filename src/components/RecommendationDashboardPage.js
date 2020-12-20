import React, {useReducer, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import RemmendationList from '../components/RecommendationList'
import RecommendationsContext from '../context/recommendations-context'
import recommendationsReducer from '../reducers/recommendations'
import RecommendationsFilters from '../components/RecommendationsFilters'
import FiltersContext from '../context/filters-context'
import filtersReducer from '../reducers/filtersReducer'

const RecommendationDashboardPage = () => {
     
    const [recommendations, dispatch] = useReducer(recommendationsReducer, [])
    const initialState = {tags1: [],tags2: [],tags3: [],tags4: [],sortBy: 'date'};
    const [filters, filtersDispatch] = useReducer(filtersReducer, initialState)

    useEffect(() => {
      const recommendationsData = JSON.parse(localStorage.getItem('recommendations'))
      if (recommendationsData) {
        dispatch({type: 'POPULATES_RECOMMENDATIONS' ,recommendations: recommendationsData})
      }
    },[])

    console.log('RecommendationDashboardPage recommendations:---',recommendations);
    return (
        <RecommendationsContext.Provider value={ { recommendations, dispatch }}>
            <FiltersContext.Provider value={ { filters, filtersDispatch }}>
            <CssBaseline/>
                <Container maxWidth="md" component="main">
                    <Link  to="/create">הוסף המלצה</Link>
                </Container>
                <Container maxWidth="md" component="main" >
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        המלצות ממארגני אירועי תרבות במשגב
                    </Typography>
                    <Grid container  spacing={4}>
                        <Grid item xs={3} >
                            <RecommendationsFilters />
                        </Grid>
                        <Grid container spacing={2}>
                            <RemmendationList/>
                        </Grid>
                    </Grid>
                </Container>
            </FiltersContext.Provider>    
        </RecommendationsContext.Provider>
    )
}

export {RecommendationDashboardPage as default}