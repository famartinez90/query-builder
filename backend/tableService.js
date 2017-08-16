let mysql = require('mysql');

class DatabaseAdapter {
	constructor() {
		this.connection = mysql.createConnection({
			host: "localhost",
			user: "test",
			password: "test",
			port: '/opt/lampp/var/mysql/mysql.sock',
			database: 'previsite_ar'
		});
		
		this.connection.connect(function(err) {
			if (err) throw err;
		});
	}

	query(statement, callback) {
		this.connection.query(statement, function (err, result) {
			if (err) throw err;
			callback(result);
		});
	}
}

module.exports = DatabaseAdapter;
