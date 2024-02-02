import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Product Test",
      description: "Node.js with tdd",
      contact: {
        name: "youngkim",
        email: "canoe918@gmail.com"
      }
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/**/*.ts", "./routes/**/*.js"]
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
