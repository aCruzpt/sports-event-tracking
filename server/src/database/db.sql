CREATE TABLE IF not exists athletes (
 chipId integer PRIMARY KEY,
 fullName text NOT NULL,
 startNumber integer NOT NULL UNIQUE,
 country text NOT NULL
);

INSERT INTO athletes(chipId, fullName, startNumber, country) VALUES
(914321, 'Andrew Simon', 123, 'au'),
(914322, 'Evelyn Davis', 451, 'br'),
(914323, 'Laura Krogh', 593, 'dk'),
(914324, 'Kiyomichi Daikawa', 910, 'jp'),
(914325, 'Ida Agafonova', 648, 'ru'),
(914326, 'Antonia Donaldson', 725, 'us'),
(914327, 'Muawiyah Kamal Bazzi', 209, 'lk'),
(914328, 'Otávio Sousa Gomes', 417, 'br'),
(914329, 'Timothy S. Ellison', 207, 'us'),
(914330, 'Jukka-Pekk Laatikainen', 720, 'fi'),
(914331, 'Janina Shuster', 345, 'de'),
(914332, 'Miroslav Bazarov', 715, 'ru'),
(914333, 'Tanel Raidle', 681, 'ee'),
(914334, 'Mette T. Kristensen', 989, 'dk'),
(914335, 'Donatien Miron', 172, 'fr')