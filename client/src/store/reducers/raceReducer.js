import { ACTION_TYPES } from "../constants";
import { WebSocket } from "../../websocket";

function startRace(action) {
    console.log("reducer", action);
    WebSocket.startRace(action.time);
    return { inProgress: true, startTime: action.time };
}

function endRace(state) {
    WebSocket.endRace();
    return { inProgress: false, startTime: state.startTime };
}

const INITIAL_RACE = { inProgress: false, startTime: null };
function race(state = INITIAL_RACE, action) {
    switch(action.type) {
        case ACTION_TYPES.START_RACE:
            return startRace(action);
        case ACTION_TYPES.RACE_STARTED:
            return { inProgress: true, startTime: action.time };
        case ACTION_TYPES.END_RACE:
            return endRace(state);
        case ACTION_TYPES.RACE_ENDED:
            return { inProgress: false, startTime: state.startTime };
        default:
            return state;
    }
}

export default race;