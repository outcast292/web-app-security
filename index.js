const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "securityappdb",
});

//CLIENT ROUTES

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
// register view engine
app.set('view engine', 'ejs');
app.get("/", (req, res) => { res.render('client')})

app.get("/clients", (req, res) => {
  db.query("SELECT * FROM clients", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

app.get("/clients/:id", (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM clients where id=${id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

app.put("/clients/:id", (req, res) => {
  const id = req.params.id;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const adresse = req.body.adresse;
  db.query(
    `UPDATE clients SET email="${email}", firstName = "${firstName}", lastName = "${lastName}",phone="${phone}", adresse = "${adresse}" WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/clients/:id", (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM clients WHERE id = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//ORDER ROUTES

app.post("/orders/:id", (req, res) => {
  const clientId = req.params.id;
  const orderName = req.body.orderName;
  const date = req.body.date;

  db.query(
    `INSERT INTO orders (clientId, orderName, date) VALUES (${clientId},"${orderName}", "${date}")`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/orders/:id", (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM orders where id=${id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/orders/:id", (req, res) => {
  const id = req.params.id;
  const orderName = req.body.orderName;
  db.query(
    `UPDATE orders SET orderName = "${orderName}" WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/orders/:id", (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM orders WHERE id = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3000, () => {
  console.log("Yey, your server is running on port 3000");
});
