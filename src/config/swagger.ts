import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

export const specs = swaggerJSDoc({
    swaggerDefinition: {
        openapi: "3.0.3",
        info: {
            title: "FILMS",
            version: "1.0.0",
            description: "API Documentation for Films"
        }
    },
    apis: [path.join(__dirname, "../api/routes/*.route.js")]
});