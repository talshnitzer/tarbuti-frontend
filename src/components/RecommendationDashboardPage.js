import React, {useReducer, useEffect} from 'react'
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

const superagent = require('superagent');

const baseUrl = process.env.API_URL || 'http://localhost:8080'

const RecommendationDashboardPage = () => {
     
    const [recommendations, dispatch] = useReducer(recommendationsReducer, [])
    const initialState = {tags1: [],tags2: [],tags3: [],tags4: [],sortBy: 'date'};
    const [filters, filtersDispatch] = useReducer(filtersReducer, initialState)

    useEffect( () => {
        async function fetchData() {
            const response = await sendGetReq();
            console.log('RecommendationDashboardPage--- response from sendGetReq', response);
            if (response.length >0) {
                dispatch({type: 'POPULATES_RECOMMENDATIONS' ,recommendations: response})
            }
          }
          fetchData();
    },[])

    const sendGetReq = async () => {
        const response = await superagent.get(`${baseUrl}/recommendation/all`)
        .set('Content-Type', 'application/json')
        const {body} = response
        console.log('RecommendationDashboardPage---sendGetReq--- body from res.body', body);
        return body    
        }

    console.log('RecommendationDashboardPage recommendations:---',recommendations);
    return (
        <RecommendationsContext.Provider value={ { recommendations, dispatch }}>
            <FiltersContext.Provider value={ { filters, filtersDispatch }}>
            <CssBaseline/>
                <Container maxWidth="md" component="main" >
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        המלצות ממארגני אירועי תרבות במשגב
                    </Typography>
                    <Grid container spacing={4} >
                            <RecommendationsFilters />
                    </Grid>
                    <br/>
                    <br/>
                    <Grid container spacing={2}>
                        <RemmendationList/>
                    </Grid>
                </Container>
            </FiltersContext.Provider>    
        </RecommendationsContext.Provider>
    )
}

export {RecommendationDashboardPage as default}