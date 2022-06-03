const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "securityappdb",
  });

  app.post("/clients", (req, res) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const adresse = req.body.adresse;
    const phone = req.body.phone;
    const age = req.body.age;

    db.query(
      `INSERT INTO clients (firstName, lastName, adresse, phone, email) VALUES ("${firstName}","${lastName}","${adresse}", "${phone}", "${email}");`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });

/**
 * handling message requests
 */
const MessageController = {



    /**
     * Send Message
     * @param {*} req
     * @param {*} res
     */
     async postMessage(req, res) {
        try {

            await sequelize.query(`
            INSERT INTO messages (user_id, content)
            VALUES ('${req.user.googleId}', '${req.body.message}');
            `, {type: sequelize.QueryTypes.INSERT});
            return res.redirect('/');
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },


}

module.exports = MessageController