const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "secwebdb",
});
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage }); //multer : midlleware for uploading files

router.get('/', (req, res) => {
    db.query("SELECT * FROM clients", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { result });
            console.log(result);
        }
    });
})
router.post('/',upload.single("file"), (req, res) => {

    const code = req.body.code;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const address = req.body.address;
    const telephone = req.body.telephone;
    const image = req.body.image;
    db.query(
        `INSERT INTO clients (code, nom, prenom, address, telephone, image) VALUES ("${code}","${nom}","${prenom}", "${address}", "${telephone}", "${image}");`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/')
            }
        }
    );
});



router.post("/modify", (req, res) => {
    const code = req.body.code;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const address = req.body.address;
    const telephone = req.body.telephone;
    const image = req.body.image;
    db.query(
        `UPDATE clients SET code="${code}", nom = "${nom}", prenom = "${prenom}", address="${address}", telephone = "${telephone}, image = "${image}" WHERE nom = "${nom}"`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/')
            }
        }
    );
});

router.post("/delete", (req, res) => {
    const nom = req.body.nom;
    db.query(`DELETE FROM clients WHERE nom = "${nom}"`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/')
        }
    });
});

module.exports = router;