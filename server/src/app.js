let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
//let cors = require('cors');
//app.use(cors());

const ACTION_TYPES = require('./constants');

let RaceObj = require('./Race');
let race = new RaceObj();

io.on('connection', function(socket){
    if (race.inProgress) {
        socket.emit(ACTION_TYPES.RACE_STARTED, race.startTime);
    }

    socket.on(ACTION_TYPES.START_RACE, function(startTime) {
        race.startRace(startTime);
        io.emit(ACTION_TYPES.RACE_STARTED, startTime);
    });

    socket.on(ACTION_TYPES.END_RACE, function(){
        race.endRace();
        socket.broadcast.emit(ACTION_TYPES.RACE_ENDED);
    });

    socket.on(ACTION_TYPES.FETCH_ATHLETES, function(){
        socket.emit(ACTION_TYPES.RECEIVE_ATHLETES, race.athletes);
    });

    socket.on(ACTION_TYPES.ENTER_CORRIDOR, function(data){
        let athlete = race.athleteEnteredFinishCorridor(data.athleteChipId, data.time);
        socket.broadcast.emit(ACTION_TYPES.ATHLETE_ENTERED_CORRIDOR, athlete);
    });

    socket.on(ACTION_TYPES.FINISH, function(data){
        let athlete = race.athleteCrossedFinishLine(data.athleteChipId, data.time);
        socket.broadcast.emit(ACTION_TYPES.ATHLETE_FINISHED, athlete);

        if (race.isOver()) {
            race.endRace();
            io.emit(ACTION_TYPES.RACE_ENDED);
        }
    });
});

http.listen(8000, function(){
    console.log('listening on *:8000');
});