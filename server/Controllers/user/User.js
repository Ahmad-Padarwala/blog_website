const connection = require("../../db/conn");

//GET USERS DATA
const getUser = (req, res) => {
  let uname = req.query.uname;
  const sql = `SELECT * FROM bg_blog_user WHERE uname='${uname}'`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from bg_blog_user Table in server.js" + error
      );
    }
    return res.json(result);
  });
};

module.exports = { getUser };
