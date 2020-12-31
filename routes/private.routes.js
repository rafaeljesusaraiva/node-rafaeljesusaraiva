const { authJwt, admin } = require("../middleware");
const adminController = require("../controllers/admin.controller");
const clientController = require("../controllers/client.controller");
const projectController = require("../controllers/project.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/private", [ authJwt.verifyToken, authJwt.isWhich], (req, res, next) => {
    console.log(res.locals.userType);
    if (res.locals.userType == 'admin')
      res.redirect('/admin/dashboard');
    else if (res.locals.userType == 'client')
      res.redirect('/cliente');
    else res.redirect('/');
  });

  app.get("/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminController.adminRedirectDash
  );

  app.get("/admin/configuracoes",
    adminController.adminConfig
  );

  app.get("/admin/projeto/:projName",
    [authJwt.verifyToken, authJwt.isAdmin, admin.getAllClients, projectController.showOne],
    adminController.adminProject
  );

  app.get("/admin/:pageName",
    [authJwt.verifyToken, authJwt.isAdmin, admin.getAllClients, projectController.showAll],
    adminController.adminDasboard
  );

  app.get("/cliente",
    [authJwt.verifyToken, authJwt.isClient],
    clientController.clientDashboard
  );

  app.get("/cliente/sessoes",
    [authJwt.verifyToken, authJwt.isClient, projectController.showAllClient],
    clientController.clientWorks
  );

  app.get("/cliente/sessao/:projName",
    [authJwt.verifyToken, authJwt.isClient, projectController.showOneClient],
    clientController.clientWork
  );

  app.get("/cliente/configuracoes",
    [authJwt.verifyToken, authJwt.isClient],
    clientController.clientConfig
  );
};