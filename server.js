const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
// imports for command execution vulnerability
const {exec} = require('child_process');
const pug = require('pug');
// routes
const commandeRoutes = require('./routes/commandeRoutes');
const homeRoutes = require('./routes/homeRoutes');
const clientRoutes = require('./routes/clientRoutes');
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
// // commande routes
app.use('/commandes', commandeRoutes);
// // client commande routes
app.use('/clients', clientRoutes);

// route for commande execution vulnerability demonstration
app.use('/commandexecution', (req, res) => {
    const folder = req.query.folder;
    if (folder) {
      // Run the command with the parameter the user gives us
      exec(`ls -l ${folder}`, (error, stdout, stderr) => {
        let output = stdout;
        if (error) {
          // If there are any errors, show that
          output = error;
        }
        res.send(
          pug.renderFile('./views/commandexecution.pug', {output: output, folder: folder})
        );
      });
    } else {
      res.send(pug.renderFile('./views/commandexecution.pug', {}));
    }

  });

// listen to server
app.listen(8080, ()=>{
    console.log("listenning at port 8080")
})
