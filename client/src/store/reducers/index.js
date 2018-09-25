import race from './raceReducer';
import athletes from './athleteReducer';
import { combineReducers } from 'redux'


export default combineReducers({race, athletes});