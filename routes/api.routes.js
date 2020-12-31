const { verifySignUp, authJwt, admin } = require("../middleware");
const authController = require("../controllers/auth.controller");
const projController = require('../controllers/project.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/auth/signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], authController.signup);
  app.post("/api/auth/signin", authController.signin);
  app.post("/api/auth/signout", authController.signout);

  app.post("/api/project/add", [authJwt.verifyToken, authJwt.isAdmin], projController.addProject);
  app.post("/api/project/remove", [authJwt.verifyToken, authJwt.isAdmin], projController.removeProject);
  // app.post("/api/project/edit", [authJwt.verifyToken, authJwt.isAdmin], projController.editProject);
  app.post("/api/project/all", [authJwt.verifyToken, authJwt.isAdmin], projController.getAll);
  app.post("/api/project/info/:name", [authJwt.verifyToken, authJwt.isAdminOrClient], projController.showOne);
  app.post("/api/project/feedback/:name", [authJwt.verifyToken, authJwt.isAdminOrClient], projController.addFeedback);
};