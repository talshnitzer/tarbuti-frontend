const filtersReducer = (state, action) => {
  switch (action.type) {
    // P.Z: Please read my comment on index.js:38. It's highly recommended to create an "actions" dir with
      // filtersActions, recommendationsActions and usersActions.
    case "SET_TAGS1":
      return { ...state, tags1: action.filters };
    case "SET_TAGS2":
      return { ...state, tags2: action.filters };
    case "SET_TAGS3":
      return { ...state, tags3: action.filters };
    case "SET_TAGS4":
      return { ...state, tags4: action.filters };
    case "SORT_BY_DATE":
      return state;
    case "SORT_BY_PRICE":
      return state;
    default:
      return state;
  }
};

export { filtersReducer as default };
