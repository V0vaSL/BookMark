const mysql = require('mysql');
const util = require('util');
const config = require('config');

exports.dataBase = () => {
  try {
    const connection = mysql.createConnection(config.get('mySQLConfig'));
    return {
      query(sql, args) {
        return util.promisify(connection.query).call(connection, sql, args);
      },
      close() {
        return util.promisify(connection.end).call(connection);
      },
    };
  } catch (err) {
    process.exit(1);
  }
};
