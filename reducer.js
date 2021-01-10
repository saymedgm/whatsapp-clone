export const initialState = {
     user: null,
};

//In initial state user is not logged in so its initial state is set null
//actionType defines function to be performed on initial state
//set user function will add user to the data layer 
export const actionTypes = {
    SET_USER: "SET_USER",
};

const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        case actionTypes.SET_USER:
            return{
              ...state,
              user: action.user,
            };

    default:
        return state;
    }
};

export default reducer;