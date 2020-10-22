const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post(
    "/api/test/add",
    controller.create
  );

  app.get(
    "/api/test/find",
    controller.findAll
  );

  app.get(
    "/api/test/find/:id",
    controller.findOne
  );

  app.delete(
    "/api/test/delete/:id",
    controller.delete
  );

  app.delete(
    "/api/test/delete",
    controller.deleteAll
  );
}
