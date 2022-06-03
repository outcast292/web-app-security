const router = express.Router();
const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "secwebdb",
  });

router.post('/', (req, res) => {

    const code = req.body.code;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const address = req.body.address;
    const telephone = req.body.telephone;

    db.query(
        `INSERT INTO clients (code, nom, prenom, address, telephone) VALUES ("${code}","${nom}","${prenom}", "${address}", "${telephone}");`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

router.get('/', (req, res) => {
    db.query("SELECT * FROM clients", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
});

router.put("/:nom", (req, res) => {
    const code = req.body.code;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const address = req.body.address;
    const telephone = req.body.telephone;
    db.query(
        `UPDATE clients SET code="${code}", nom = "${nom}", prenom = "${prenom}", address="${address}", telephone = "${telephone}" WHERE nom = ${nom}`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

router.delete("/:nom", (req, res) => {
    const nom = req.params.nom;
    db.query(`DELETE FROM clients WHERE nom = ${nom}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;