import express from "express";
import { UserController } from "../controllers/user.controller";
import validateUser from "../validations/user.validation";

const router = express.Router();
const userController = new UserController();



/**
*  @swagger
*  /api/v1/user/signup:
*  post:
*      tags:
*          - User
*      operationId: signup
*      summary: register a user
*      produces:
*          - application/json
*      responses:
*          '201':
*              description: User Created
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/UserResponseObj'
*          '400':
*              description: Bad request
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/ErrorResponse'
*/
router.post("/signup", validateUser, userController.signup);

/**
*  @swagger
*  /api/v1/user/login:
*  post:
*      tags:
*          - User
*      operationId: login
*      summary: login a user
*      produces:
*          - application/json
*      responses:
*          '200':
*              description: User succesfully logged in
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
router.post("/login", validateUser, userController.login);

export default router;


/**
* @swagger
* components:
*  schemas:
*      User:
*          type: object
*          properties:
*              _id:
*                  type: string
*              userName:
*                  type: string
*              email:
*                  type: string
*              role:
*                  type: string
*                  enum: ['user','admin']
*              active:
*                  type: boolean
*              gender:
*                  type: string
*              createdAt:
*                  type: string
*              updatedAt:
*                  type: string
*      UserResponseObj:
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
*                  $ref: '#/components/schemas/User'
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