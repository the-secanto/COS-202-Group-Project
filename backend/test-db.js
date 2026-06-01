import 'dotenv/config';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;
console.log('Testing connection to:', connectionString ? connectionString.substring(0, 15) + '...' : 'MISSING');

const pool = new pg.Pool({
  connectionString,
  ssl: connectionString && !connectionString.includes('localhost') ? { rejectUnauthorized: false } : false
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Connection successful:', result.rows[0]);
    process.exit(0);
  });
});
