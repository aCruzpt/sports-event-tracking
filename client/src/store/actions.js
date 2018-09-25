import { ACTION_TYPES } from "./constants";

export function startRace(time) {
    console.log("action", time);
    return { type: ACTION_TYPES.START_RACE, time }
}

export function enterCorridor(athleteChipId, time) {
    return { type: ACTION_TYPES.ENTER_CORRIDOR, athleteChipId, time }
}

export function finish(athleteChipId, time) {
    return { type: ACTION_TYPES.FINISH, athleteChipId, time }
}

export function endRace() {
    return { type: ACTION_TYPES.END_RACE }
}

export function raceStarted(time) {
    return { type: ACTION_TYPES.RACE_STARTED, time }
}

export function athleteEnteredCorridor(athlete) {
    return { type: ACTION_TYPES.ATHLETE_ENTERED_CORRIDOR, athlete }
}

export function athleteFinished(athlete) {
    return { type: ACTION_TYPES.ATHLETE_FINISHED, athlete }
}

export function raceEnded() {
    return { type: ACTION_TYPES.RACE_ENDED }
}

export function fetchAthletes() {
    return { type: ACTION_TYPES.FETCH_ATHLETES }
}

export function receiveAthletes(athletes) {
    return { type: ACTION_TYPES.RECEIVE_ATHLETES, athletes }
}