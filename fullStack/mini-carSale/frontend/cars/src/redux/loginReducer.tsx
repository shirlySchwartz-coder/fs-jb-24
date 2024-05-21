import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './loginActions';

interface LoginState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  token: null,
  isLoading: false,
  error: null,
};

const loginReducer = (state = initialState, action: any): LoginState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, token: action.payload };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default loginReducer;