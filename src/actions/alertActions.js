import { 
  SHOW_ALERT, 
  HIDDEN_ALERT
} from '../types';

export function showAlert(alert) {
  return (dispatch) => {
	dispatch( createAlert(alert) )
  }
}

const createAlert = alert => ({
  type: SHOW_ALERT,
  payload: alert
});

//hidden alert
export function hiddenAlertAction(){
  return (dispatch) => {
	dispatch( hiddenAlert() )
  }
}

const hiddenAlert = () => ({
  type: HIDDEN_ALERT
});
