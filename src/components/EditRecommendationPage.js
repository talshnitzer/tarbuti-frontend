import React, {useReducer, useEffect, useContext} from 'react'
import { Link, useParams, useHistory} from 'react-router-dom';

import recommendationsReducer from '../reducers/recommendations'
import RecommendationForm from './RecommendationForm'
import RecommendationsContext from '../context/recommendations-context'

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const superagent = require('superagent');

const baseUrl = process.env.API_URL || 'http://localhost:8080'

const EditRecommendationPage = () => {

    const history = useHistory()
    
    const { id } = useParams();
    const [recommendations, dispatch] = useReducer(recommendationsReducer, []) //the useReducer returns an array with my state and a dispatch function
    console.log('EditRecommendationPage---recommendations array: ', recommendations);
    const recommendation = (recommendations !== undefined) ? 
        recommendations.find((recommendationItem) =>  recommendationItem._id === id) : {};

    const myOnSubmit = async (values) => {
        console.log("EditRecommendationPage-----values", values);
        const responseBody = await sendReq(values)
        console.log('EditRecommendationPage-----myOnSubmit---responseBody after await',responseBody);
        const recommendation = {...responseBody}
        delete recommendation.__v
        dispatch({ 
            type: 'UPDATE_RECOMMENDATIONS',
            recommendation
        })
        history.push('/dashboard')
        }
        
        const sendReq = async (values) => {
        const response = await superagent.post(`${baseUrl}/recommendation/update/${id}`)
        .send({...values})
        .set('Content-Type', 'application/json')
        const {body} = response
        console.log('EditRecommendationPage---sendReq--- body from res.body', body);
        return body    
        }


    useEffect(() => {
      const recommendationsData = JSON.parse(localStorage.getItem('recommendations'))
      if (recommendationsData) {
        dispatch({type: 'POPULATES_RECOMMENDATIONS' ,recommendations: recommendationsData})
      }},[])

    useEffect(()=> {
        localStorage.setItem('recommendations', JSON.stringify(recommendations))
        console.log('set item to local storage', recommendations);
      },[recommendations])
  
    return (
      <RecommendationsContext.Provider value={ { recommendation,  dispatch }}>
        <CssBaseline/>
          <Container maxWidth="md" component="main">
            <Link  to="/dashboard">מסך הבית</Link>
          </Container>
          <Container maxWidth="md" component="main" >
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              עריכת ההמלצה שלי
            </Typography>
            {
                recommendation !== undefined ?(
                    <RecommendationForm recommendation={{...recommendation}} myOnSubmit={(values) => {myOnSubmit(values)}}/>
                ) : (<p></p>)
            }
            
          </Container>
      </RecommendationsContext.Provider>
    )
}

export {EditRecommendationPage as default}