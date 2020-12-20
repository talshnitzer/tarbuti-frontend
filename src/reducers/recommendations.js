const recommendationsReducer = (state, action) => {
    switch (action.type) {
      case 'POPULATES_RECOMMENDATIONS':
        console.log('recommendationsReducer POPULATES_RECOMMENDATIONS--- enter');
        return action.recommendations
      case 'ADD_RECOMMENDATIONS':
        console.log('recommendationsReducer ADD_RECOMMENDATIONS--- enter');
        console.log('recommendationsReducer ADD_RECOMMENDATIONS--- enter state action.recommendation'
        , state ,action.recommendation);
        return [
          ...state, 
          {...action.recommendation}
          // {
          // itemRecommended: action.itemRecommended, 
          // description: action.description
          // }
        ]
        case 'UPDATE_RECOMMENDATIONS':
          console.log('recommendationsReducer UPDATE_RECOMMENDATIONS--- enter');
          return state.map((recommendation) => {
            console.log('recommendationsReducer UPDATE_RECOMMENDATIONS--- enter map action.recommendation.recommendation._id'
            ,recommendation._id, action.recommendation._id);
            if (recommendation._id === action.recommendation._id) {
              console.log('recommendationsReducer UPDATE_RECOMMENDATIONS--- match');
                return {...action.recommendation}          
            } else {
                return recommendation;
            }
        });
      case 'REMOVE_RECOMMENDATION':
        return state.filter((recommendation) => recommendation.itemRecommended!== action.itemRecommended)
      default:
        return state
    }
  }

  export { recommendationsReducer as default}