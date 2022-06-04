const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "secwebdb",
  });

router.get('/', (req, res)=>{
    db.query("SELECT * FROM commandes", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('commande', {result});
            console.log(result);
        }
    });
})
router.post('/', (req, res) => {

    const codecommande = req.body.codecommande;
    const nomclient = req.body.nomclient;
    const codeclient = req.body.codeclient;
    const date = req.body.date;

    db.query(
        `INSERT INTO commandes (codecommande, nomclient, codeclient, date) VALUES ("${codecommande}","${nomclient}","${codeclient}", "${date}");`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/commandes')
            }
        }
    );
});



router.post("/modify", (req, res) => {
    const codecommande = req.body.codecommande;
    const nomclient = req.body.nomclient;
    const codeclient = req.body.codeclient;
    const date = req.body.date;
    db.query(
        `UPDATE commandes SET codecommande="${codecommande}", nomclient = "${nomclient}", codeclient = "${codeclient}", date="${date}" WHERE nomclient = "${nomclient}"`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/commandes')
            }
        }
    );
});

router.post("/delete", (req, res) => {
    const nomclient = req.body.nomclient;
    db.query(`DELETE FROM commandes WHERE nomclient = "${nomclient}"`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/commandes')
        }
    });
});

module.exports = router;