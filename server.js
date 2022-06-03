const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
// routes
// const commandeRoutes = require('./routes/commandeRoutes');
const homeRoutes = require('./routes/homeRoutes');
// const clientRoutes = require('./routes/clientRoutes');
// express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// register view engine
app.set('view engine', 'ejs');
// client routes
app.use('/', homeRoutes);
// // product routes
// app.use('/commandes', commandeRoutes);
// // client commande routes
// app.use('/clients', clientRoutes);
// listen to server
app.listen(3000, ()=>{
    console.log("listenning at port 3000")
})