import React, {useReducer,  useEffect} from 'react'

import recommendationsReducer from '../reducers/recommendations'
import RecommendationList from './RecommendationList'
import RecommendationForm from './RecommendationForm'
import RecommendationsContext from '../context/recommendations-context'

const RecommendationPage = () => {
  
    //const [recommendations, setRecommendations] = useState([])
    const [recommendations, dispatch] = useReducer(recommendationsReducer, []) //the useReducer returns an array with my state and a dispatch function

  
    useEffect(() => {
      console.log('This should only run once'); //this function is going to run once when the component first mounts but it's never going
                                                //to run again because it depends on nothing,so there's nothing that could cause this behavior to change.
      const recommendationsData = JSON.parse(localStorage.getItem('recommendations'))
      if (recommendationsData) {
        //setRecommendations(recommendationsData)
        dispatch({type: 'POPULATES_RECOMMENDATIONS' ,recommendations: recommendationsData})
      }
                                              },[])
  
    useEffect(()=> {
      localStorage.setItem('recommendations', JSON.stringify(recommendations))
      console.log('set item to local storage', recommendations);
    },[recommendations])
  
    return (
      <RecommendationsContext.Provider value={ { recommendations,  dispatch }}>
        <h1>ההמלצה שלי</h1>
        <RecommendationList/>
        <p></p>
        <p>הוסף המלצה</p>
        <RecommendationForm />
      </RecommendationsContext.Provider>
    )
  }

  export {RecommendationPage as default}