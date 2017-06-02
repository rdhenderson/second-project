//Require sequelize models
const path = require('path');
// const db = require("../models");
const jqueryDocs = require('../search_modules/search-jquery.js');
const expressDocs = require('../search_modules/search-express.js');

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/test-search.html", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/test-search.html"));
  });

  //Returns array of objects with name and html keys
  app.get( '/api/jquery/methods/', ( req, res ) => {
    jqueryDocs.getMethods( (err, data ) => {
      if (err) throw err;
      res.send(data);
    });
  });

  //Returns array of objects with name and html keys
  app.get( '/api/updateData/', ( req, res ) => {
    jqueryDocs.updateDB( (err, data ) => {
      if (err) throw err;
      console.log("Updated jquery models");
    });
    expressDocs.updateDB( (err, data) => {
      if (err) throw err;
      console.log("Updated express models");
    })
  });

  app.get( '/api/jquery/detail/:id', ( req, res ) => {
    jqueryDocs.getDetails(req.params.id, ( err, data ) => {
      if ( err ) throw err;
      res.send(data);
    });
  });


  require('./express-routes.js')(app);
  require('./stack-routes.js')(app);
  require('./mdn-routes.js')(app);

};
