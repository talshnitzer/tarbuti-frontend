import React, { useState }from 'react';
import ReactDOM from 'react-dom';


const RecommendationPage = (props) => {
  const [recommendOn, setRecommendOn] = useState(props.recommendOn) //useState returns an array of 2:
                                  //the current state value that's going to change over time.
                                  //And a function we can call in order to update the state.
  const [recommendedBy, setRecommendedBy] = useState('')
                                  const changeRecommend = () => {
    setRecommendOn(recommendOn + '!')
  }

  return (
    <div>
      <h2> המלצה על {recommendOn}</h2>
      <p>מומלץ על ידי {recommendedBy || 'אנונימי'}</p>
      <button onClick={changeRecommend}>!</button>
      <button onClick={()=>{setRecommendOn(props.recommendOn)}}>reset</button>
      <button onClick={()=> setRecommendOn(recommendOn.substr(0,recommendOn.length-1))}>-!</button>
      <input value={recommendedBy} onChange={(e)=>{setRecommendedBy(e.target.value)}}/>
    </div>
  )
}

RecommendationPage.defaultProps = {
  recommendOn: 'הצגה'
}

ReactDOM.render(
  <React.StrictMode>
    <RecommendationPage recommendOn='סרט'/>
  </React.StrictMode>,
  document.getElementById('root')
);