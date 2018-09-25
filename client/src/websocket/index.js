import openSocket from 'socket.io-client';
import { ACTION_TYPES } from "../store/constants";
import {athleteEnteredCorridor, athleteFinished, raceEnded, raceStarted, receiveAthletes} from "../store/actions";

const API_URL = 'http://localhost:8000';
const socket = openSocket(API_URL);

// for sending
export const WebSocket = {
    startRace: function(time) { socket.emit(ACTION_TYPES.START_RACE, time) },
    endRace: function () { socket.emit(ACTION_TYPES.END_RACE) },
    fetchAthletes: function () { socket.emit(ACTION_TYPES.FETCH_ATHLETES) },
    enterCorridor: function (athleteChipId, time) {
        socket.emit(ACTION_TYPES.ENTER_CORRIDOR, {athleteChipId, time})
    },
    finish: function (athleteChipId, time) {
        socket.emit(ACTION_TYPES.FINISH, {athleteChipId, time})
    }
};

// receive
export function initWebSocket(store) {
    socket.on(ACTION_TYPES.RACE_STARTED, startTime => store.dispatch(raceStarted(startTime)));
    socket.on(ACTION_TYPES.RACE_ENDED, () => store.dispatch(raceEnded()));
    socket.on(ACTION_TYPES.RECEIVE_ATHLETES, athletes => store.dispatch(receiveAthletes(athletes)));
    socket.on(ACTION_TYPES.ATHLETE_ENTERED_CORRIDOR, (athlete) => store.dispatch(athleteEnteredCorridor(athlete)));
    socket.on(ACTION_TYPES.ATHLETE_FINISHED, (athlete) => store.dispatch(athleteFinished(athlete)));
}