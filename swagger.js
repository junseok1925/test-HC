const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "THE HERA CLASS APIS",
    description: "THE HERA CLASS APIS",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./app.js",
  "./routes/exam.route.js",
  "./routes/examinfo.route.js",
  "./routes/image.router.js",
  "./routes/login.route.js",
  "./routes/user.route.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc);