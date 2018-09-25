let fetchAthletes = require('./database/db');

class Race {
    constructor() {
        this.inProgress = false;
        this.startTime = null;
        this.athletes = [];
        this.resetAthletes();
    }

    resetAthletes() {
        fetchAthletes().then(athletes => this.setAthletes(athletes));
    }

    startRace(start) {
        this.inProgress = true;
        this.startTime = start;
    }

    isOver() {
        let finishedAthletes = this.athletes.filter(athlete => athlete.finishTime);
        return finishedAthletes.length === this.athletes.length;
    }

    endRace() {
        this.inProgress = false;
        this.startTime = null;
        this.resetAthletes();
    }

    setAthletes(athletes) {
        this.athletes = athletes;
    }

    calculateTime(time) {
        let startTime = new Date(this.startTime).getTime();
        let athleteTime = new Date(time).getTime();
        return athleteTime - startTime;
    }

    updateAthlete(chipId, valueToUpdate, updatedValue) {
        let athleteIndex = this.athletes.findIndex(athlete => athlete.chipId === chipId);
        if (athleteIndex > -1) {
            let athlete = this.athletes[athleteIndex];
            athlete[valueToUpdate] = this.calculateTime(updatedValue);
            return athlete;
        }
        return null;
    }

    athleteEnteredFinishCorridor(chipId, time) {
        return this.updateAthlete(chipId, "corridorTime", time);
    }

    athleteCrossedFinishLine(chipId, time) {
        return this.updateAthlete(chipId, "finishTime", time);
    }
}

module.exports = Race;