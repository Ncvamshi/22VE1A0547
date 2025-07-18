import postdb from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = postdb;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
