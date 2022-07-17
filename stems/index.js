const { createService } = require("./stem-service");

createService().then(app => {
  app.listen(9000);
  console.log("Stem service is listening.")
});