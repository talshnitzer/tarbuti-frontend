const usersReducer = (state, action) => {
  switch (action.type) {
    case "POPULATES_USER":
      console.log(
        "usersReducer--- enter POPULATES_USER---state---action.user",
        state,
        action.user
      );
      return action.user;
    default:
      return state;
  }
};

export { usersReducer as default };
