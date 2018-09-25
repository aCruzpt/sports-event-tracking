export function msToTime(ms) {
    if (!ms) return;
    let minutes = Math.floor(ms/60000);
    let seconds = Math.floor((ms%60000)/1000);
    let milliseconds = ms%60000%1000;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let msZeros = "";
    if (milliseconds < 100) msZeros += "0";
    if (milliseconds < 10) msZeros += "0";
    milliseconds = msZeros + milliseconds;

    return `${minutes}:${seconds}.${milliseconds}`;
}

function sortAthletes(a, b) {
    if (a.finishTime && b.finishTime) return a.finishTime - b.finishTime;
    if (a.finishTime && !b.finishTime) return -1;
    if (!a.finishTime && b.finishTime) return 1;

    return a.corridorTime - b.corridorTime;
}

export function sortByTime(athletes) {
    return athletes.sort((a,b) => sortAthletes(a,b));
}