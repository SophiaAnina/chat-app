import mysql from 'mysql2/promise';

try {
  // create the connection to database
  const connection = await mysql.createConnection({
    host: 'localhost',
    port:'3306',
    user: 'root',
    database: 'test',
  });

  // execute will internally call prepare and query
  const [results, fields] = await connection.execute(
    'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
    ['Rick C-137', 53]
  );

  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
} catch (err) {
  console.log(err);
}

// Close the connection
await connection.end(); 