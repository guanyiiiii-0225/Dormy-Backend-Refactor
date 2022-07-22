const db = require('../../db')

const getUsers = (request, response) => {
  userQuery =  'SELECT * FROM users ORDER BY id ASC';
  db.pool(function(err, con) { // the function is called when you have a connection
    if(err) throw err; // or handle it differently than throwing it
    console.log("con: " + con); // not undefined anymore
    con.query(userQuery,function(error, res){
        if (error) {
          throw error
        }
        response.status(200).json(res.rows)
        con.release();
    })
  })
}

module.exports = {
    getUsers
}
