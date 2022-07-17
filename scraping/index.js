const { createService } = require('./quote-service');

const app = createService();
app.listen(9000);
console.log("Service started and listening");
