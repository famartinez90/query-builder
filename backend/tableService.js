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

	getTables() {
		let that = this;

		return new Promise(function (accept, reject) {
			try {
				that.connection.query('SHOW TABLES;', function (err, result) {
					if (err) reject(err);
	
					let tables = [];
					for (let table of result) {
						tables.push(table[Object.keys(table)[0]]);
					}
	
					accept(tables);
				});
			} catch (exception) {
				reject(exception);
			}
		});
	}

	getTable(table) {
		let that = this;
		
		return new Promise(function (accept, reject) {
			try {
				that.connection.query(`SELECT * FROM ${table} LIMIT 1;`, function (err, result) {
					if (err) reject(err);
					accept(result);
				});
			} catch (exception) {
				reject(exception);
			}
		});
	}

	executeQuery(params) {
		let statement = this.generateQueryStatement(params);
		let that = this;

		return new Promise(function (accept, reject) {
			try {
				that.connection.query(statement, function (err, result) {
					if (err) reject(err);
					accept(result);
				});
			} catch (exception) {
				reject(exception);
			}
		});
	}

	generateQueryStatement(params) {
		let query = 'SELECT ';
		
		query += params.fields !== undefined ? params.fields.join(',') : '*';
		query += ' ';
		query += params.from !== undefined ? `FROM ${params.from}` : '';
		query += ' ';
		
		if (params.joins !== undefined) {
			for (let join of params.joins) {
				query += `JOIN ${join.table} ON ${join.table}.id = ${params.from}.${join.on} `;
			}
		}
		
		query += params.where !== undefined ? `WHERE ${params.where}` : 'WHERE 1';
		query += ' ';
		query += params.limit !== undefined ? `LIMIT ${params.limit}` : 'LIMIT 10';

		return query+';';
	}
}

module.exports = DatabaseAdapter;
