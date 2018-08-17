const bcrypt = require('bcrypt');
const uid = require('uid');
const jwt = require('jsonwebtoken');

const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.QUODL_DATABASE_USER,
  password: process.env.QUODL_DATABASE_PASSWORD,
  host: process.env.QUODL_DATABASE_HOST,
  port: process.env.QUODL_DATABASE_PORT,
  database: process.env.QUODL_DATABASE_NAME,
  ssl: true,
});

const parsePayload = require('../helpers/parsePayload');

async function login(request, h) {
  const {email, password} = parsePayload(request.payload);

  var userQuery = 'SELECT * FROM users WHERE email = $1;';
  var userValue = [email];

  const client = await pool.connect()

  const res = await client.query(userQuery, userValue);

  if (await bcrypt.compare(password, res.rows[0].password)) {
    await client.release();

    const userObject = { user_details: res.rows[0], uid: uid, scope: [res.rows[0].is_super_admin ? "super-admin" : "", res.rows[0].is_group_admin ? "group-admin" : ""] };
    const token = jwt.sign(userObject, process.env.JWT_SECRET);
    const options = { path: "/", isSecure: false, isHttpOnly: false };

    h.state('token', token, options);

    return h.response({ok: true});
  } else {
    await client.release();

    return {message: 'Incorrect password'};
  }
}

module.exports = {
  login
}
