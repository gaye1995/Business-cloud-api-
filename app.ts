require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const routes = require('./src/routes/auth.route');
// PORT
 const PORT=  5000;

// LANCEMENT SERVEUR
try {
  http.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
   
  });
} catch (error) {
  console.error(error);
}
app.use(routes);
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
  console.log('hello');
});

module.exports = app;