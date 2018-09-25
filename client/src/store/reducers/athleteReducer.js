import {ACTION_TYPES} from "../constants";
import { WebSocket } from "../../websocket";

function fetchAthletes() {
    WebSocket.fetchAthletes();
    return [];
}

function updateAthlete(state, athleteChipId, valueToUpdate, updatedValue) {
    let athletes = [...state];
    let athleteIndex = athletes.findIndex(athlete => athlete.chipId === athleteChipId);
    if (athleteIndex > -1) {
        let athlete = athletes[athleteIndex];
        athlete[valueToUpdate] = updatedValue;
    }
    return athletes;
}

function enterCorridor(state, action) {
    WebSocket.enterCorridor(action.athleteChipId, action.time);
    return updateAthlete(state, action.athleteChipId, "corridorTime", action.time);
}

function athleteEnteredCorridor(state, action) {
    return updateAthlete(state, action.athlete.chipId, "corridorTime", action.athlete.corridorTime);
}

function finish(state, action) {
    WebSocket.finish(action.athleteChipId, action.time);
    return updateAthlete(state, action.athleteChipId, "finishTime", action.time);
}

function athleteFinished(state, action) {
    return updateAthlete(state, action.athlete.chipId, "finishTime", action.athlete.finishTime);
}

function raceStarted(state) {
    return state.map(athlete => {
        let tempAthlete = {...athlete};
        tempAthlete.corridorTime = null;
        tempAthlete.finishTime = null;
        return tempAthlete;
    })
}

const INITIAL_ATHLETES = [];
function athletes(state = INITIAL_ATHLETES, action) {
    switch(action.type) {
        case ACTION_TYPES.FETCH_ATHLETES:
            return fetchAthletes();
        case ACTION_TYPES.RECEIVE_ATHLETES:
            return action.athletes;
        case ACTION_TYPES.ENTER_CORRIDOR:
            return enterCorridor(state, action);
        case ACTION_TYPES.ATHLETE_ENTERED_CORRIDOR:
            return athleteEnteredCorridor(state, action);
        case ACTION_TYPES.FINISH:
            return finish(state, action);
        case ACTION_TYPES.ATHLETE_FINISHED:
            return athleteFinished(state, action);
        case ACTION_TYPES.RACE_STARTED:
            return raceStarted(state);
        default:
            return state;
    }
}

export default athletes;