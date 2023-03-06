const express = require("express");
const router = require("..");
const route = express.Router();
const validator = require("../../middleware/validator.middleware");
const controller = require("./controller");
const validation = require("./validator");

route.post("/jokes/create", validator(validation.create), controller.create);

route.get("/jokes/get-one", controller.getOne);

route.post("/jokes/:id/vote", validator(validation.vote), controller.voteJoke);

route.get("/jokes/:id/rating", controller.getRating);

module.exports = route;

/**
 * @swagger
 * /api/jokes/create:
 *  post:
 *      summary: Create joke
 *      tags:
 *          - Joke
 *      parameters:
 *          - in: body
 *            name: body
 *            type: object
 *            properties:
 *              content:
 *                type: string
 *                required: true
 *              created_by:
 *                type: string
 *      responses:
 *          200:
 *              description: OK
 */

/**
 * @swagger
 * /api/jokes/get-one:
 *  get:
 *      summary: Get one joke
 *      tags:
 *          - Joke
 *      responses:
 *          200:
 *              description: OK
 */

/**
 * @swagger
 * /api/jokes/{id}/vote:
 *  post:
 *      summary: Vote joke - like = true, dislike = false
 *      tags:
 *          - Joke
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *          - in: body
 *            name: body
 *            type: object
 *            properties:
 *              vote:
 *                type: boolean
 *      responses:
 *          200:
 *              description: OK
 */

/**
 * @swagger
 * /api/jokes/{id}/rating:
 *  get:
 *      summary: Get like/dislike of a joke
 *      tags:
 *          - Joke
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: OK
 */
