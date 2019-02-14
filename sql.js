let sql = require('sqlite3');
	db = new sql.Database('./data/src.sqlite');
	log = (msg) => { console.log(`| ${moment().format('DD-MM-YYYY | HH:mm:ss')} | ${msg} |`); };
	log(`SQL | Initialized database connection`);

var tables = {
	blacklist: [
		'id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
		'snowflake TEXT NOT NULL',
		'guild TEXT NOT NULL'
	]
}

for (var table in tables) {
	db.run(`CREATE TABLE ${table} (${tables[table].join(', ')})`, () => {
		log(`SQL | Initialized table: "${table}"`);
	});
}

module.exports = db;