import express from "express";
import { FilmController } from "../controllers/film.controller";
import validateFilm from "../validations/film.validation";

const router = express.Router();
const filmController = new FilmController();



/**
*  @swagger
*  /api/v1/films/:
*  get:
*      tags:
*          - Films
*      operationId: getFilms
*      summary: get list of films
*      produces:
*          - application/json
*      responses:
*          '201':
*              description: Films List
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/FilmResponseArray'
*          '400':
*              description: Bad request
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/ErrorResponse'
*/
router.get("/", filmController.getFilms);

/**
*  @swagger
*  /api/v1/films/{filmSlugName}:
*  get:
*      tags:
*          - Films
*      operationId: getFilm
*      summary: get details of film
*      produces:
*          - application/json
*      responses:
*          '201':
*              description: Film object
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/FilmResponseObject'
*          '400':
*              description: Bad request
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/ErrorResponse'
*/
router.get("/:filmSlugName", filmController.getFilm);

/**
*  @swagger
*  /api/v1/films/create:
*  post:
*      tags:
*          - Films
*      operationId: createFilm
*      summary: Create a new film
*      requestBody:
*          description: film data
*          required: true
*          content:
*              application/json:
*                  schema:
*                      type: object
*                      properties:
*                          name:
*                              type: string
*                              required: true
*                          description:
*                              type: string
*                              required: true
*                          releaseDate:
*                              type: string
*                              required: true
*                          rating:
*                              type: string
*                              enum: [1, 2, 3, 4, 5]
*                              required: true
*                          ticketPrice:
*                              type: string
*                              required: true
*                          country:
*                              type: string
*                              required: true 
*                          genre:
*                              type: array
*                              required: true
*                          photo:
*                              type: string
*                              required: true   
*      produces:
*          - application/json
*      responses:
*          '201':
*              description: Created Film
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/FilmResponseObj'
*          '200':
*              description: Film Already Exists
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/FilmResponseObj'
*          '400':
*              description: Bad request
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/ErrorResponse'
*/
router.post("/create", validateFilm, filmController.create);

/**
*  @swagger
*  /api/v1/films/comment:
*  post:
*      tags:
*          - Films
*      operationId: comment
*      summary: add a comment to a film
*      requestBody:
*          description: comment data
*          required: true
*          content:
*              application/json:
*                  schema:
*                      type: object
*                      properties:
*                          id:
*                              type: string
*                              required: true
*                          comment:
*                              type: object
*                              properties:
*                                   text:
*                                       type: string
*                                       required: true
*                                   user:
*                                       type: string
*                                       required: true
*      produces:
*          - application/json
*      responses:
*          '200':
*              description: comment added
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/SuccessResponseObj'
*          '400':
*              description: Bad request
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/ErrorResponse'
*/
router.post("/comment", validateFilm, filmController.addComment);


export default router;


/**
* @swagger
* components:
*  schemas:
*      Film:
*          type: object
*          properties:
*              _id:
*                  type: string
*              name:
*                  type: string
*              slugName:
*                  type: string
*              description:
*                  type: string
*              releaseDate:
*                  type: string
*              rating:
*                  type: string
*                  enum: [1, 2, 3, 4, 5]
*              ticketPrice:
*                  type: string
*              country:
*                  type: string
*              genre:
*                  type: array
*              photo:
*                  type: string
*              comment:
*                  type: array
*              createdAt:
*                  type: string
*              updatedAt:
*                  type: string
*      FilmResponseObj:
*          type: object
*          properties:
*              success:
*                  type: boolean
*              code:
*                  type: number
*                  example: 201
*              message:
*                  type: string
*              appVersion:
*                  type: string
*              data:
*                  type: object
*                  $ref: '#/components/schemas/Film'
*      FilmResponseArray:
*          type: object
*          properties:
*              success:
*                  type: boolean
*              code:
*                  type: number
*                  example: 201
*              message:
*                  type: string
*              appVersion:
*                  type: string
*              data:
*                  type: array
*                  $ref: '#/components/schemas/Film'
*      SuccessResponseObj:
*          type: object
*          properties:
*              success:
*                  type: boolean
*              code:
*                  type: number
*                  example: 201
*              message:
*                  type: string
*              appVersion:
*                  type: string
*              data:
*                  type: array | object
*      ErrorResponse:
*          type: object
*          properties:
*              success:
*                  type: boolean
*              code:
*                  type: number
*                  example: 404
*              message:
*                  type: string
*              appVersion:
*                  type: string
*              data:
*                  type: array |object
*/