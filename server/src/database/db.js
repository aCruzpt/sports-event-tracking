const path = require('path')
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.resolve(__dirname, 'athletes.sqlite3')
const SELECT_ATHLETES = `SELECT * FROM athletes`;

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE);

function fetchAthletes() {
    return new Promise( ( resolve, reject ) => {
        db.all(SELECT_ATHLETES, [], (err, athletes) => {
            if (err)
                return reject(err);
            resolve(athletes);
        });
    });
}

module.exports = fetchAthletes;