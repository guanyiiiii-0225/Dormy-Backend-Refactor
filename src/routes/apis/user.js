const pool = require('../../db').pool

const getUsers = async (request, response) => {
    userQuery =  'SELECT * FROM users ORDER BY id ASC';
    res = await pool.query(userQuery)
    response.status(200).json(res.rows)
}

module.exports = {
    getUsers
}
