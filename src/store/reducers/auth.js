import { AUTH_SUCCESS, AUTH_ERROR, AUTH_START} from "../actions/actionTypes";

const initialState = {
  authSuccess: false,
  authLoading: false,
  authError: null,
  name: ""
 
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_START:
      return{
        ...state,
        authLoading: true,
        authError: null
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        authError: false,
        authSuccess: true,
        authLoading: false,
        name: action.name
      }
    case AUTH_ERROR:
      return{
        ...state,
        authError: action.error,
        authLoading: false
      }
    default:
      return state;
  }
}
