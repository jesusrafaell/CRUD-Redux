import { 
  SHOW_ALERT, 
  HIDDEN_ALERT
} from '../types';

const initialState = {
  alert: null
}

export default function alert(state = initialState, action) {
  switch(action.type){
	case SHOW_ALERT:
	  return {
		...state,
		alert: action.payload
	  }
	case HIDDEN_ALERT:
	  return {
		...state,
		alert: null
	  }
	default:
	  return state;
  }
}
