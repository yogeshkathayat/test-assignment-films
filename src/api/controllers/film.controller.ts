
import { Request, Response } from "express";
import ResponseHandler from "../../util/responseHandler";
import * as HttpStatus from "http-status";
import logger from "../../config/logger";
import {
    errorMessage,
    version
} from "../../config/constants";
import { FilmRepository } from "../repository/film.repository";
import { CountryRepository } from "../repository/country.repository";
import { GenreRepository } from "../repository/genre.repository";
import { UserRepository } from "../repository/user.repository";


const fileName = "[film.controller.js]";


/**
 * FilmController class
 * contains methods related to
 * Film
 * @class
 */
export class FilmController {

    private _filmRepository: FilmRepository;
    private _countryRepository: CountryRepository;
    private _genreRepository: GenreRepository;
    private _userRepository: UserRepository


    constructor() {
        this._filmRepository = new FilmRepository();
        this._countryRepository = new CountryRepository();
        this._genreRepository = new GenreRepository();
        this._userRepository = new UserRepository();

    }


    /**
    * @description method to create film
    * @param {Request} req req object containing film fields
    * @param {Response} res response object
    */
    public create = async (req: Request, res: Response): Promise<any> => {
        const methodName = "[create]";
        try {

            // find if country is valid
            const countryExists = await this._countryRepository.findOne(req.body.country);
            if (!countryExists) {
                return ResponseHandler.setResponse(
                    res,
                    false,
                    HttpStatus.BAD_REQUEST,
                    errorMessage.BAD_REQUEST,
                    version.v1,
                    {}
                );
            }

            // find if genre is valid
            for (let genre of req.body.genre) {

                const genreExists = await this._genreRepository.findOne(genre);
                if (!genreExists) {
                    return ResponseHandler.setResponse(
                        res,
                        false,
                        HttpStatus.BAD_REQUEST,
                        errorMessage.BAD_REQUEST,
                        version.v1,
                        {}
                    );
                }
            }

            // find if film already exists
            const existingFilm = await this._filmRepository.filmExists(req.body.name);

            if (existingFilm) {
                return ResponseHandler.setResponse(
                    res,
                    true,
                    HttpStatus.OK,
                    `Film ${errorMessage.ALREADY_EXISTS}`,
                    version.v1,
                    existingFilm
                );
            }


            //create the film
            const createdFilm = await this._filmRepository.create(req.body);

    
            return ResponseHandler.setResponse(
                res,
                true,
                HttpStatus.CREATED,
                errorMessage.SUCCESS,
                version.v1,
                createdFilm
            );
        }
        catch (error) {

            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(
                res,
                false,
                HttpStatus.INTERNAL_SERVER_ERROR,
                `${error}`,
                version.v1,
                {}
            );
        }
    }


    /**
   * @description method to get list of films
   * @param {Request} req req object containing film fields
   * @param {Response} res response object
   */
    public getFilms = async (req: Request, res: Response): Promise<any> => {
        const methodName = "[getFilms]";
        try {

            // find if user exists
            const filmList = await this._filmRepository.getFilmList();

            if (filmList) {
                return ResponseHandler.setResponse(
                    res,
                    true,
                    HttpStatus.OK,
                    errorMessage.SUCCESS,
                    version.v1,
                    filmList
                );
            }
            else {
                return ResponseHandler.setResponse(
                    res,
                    true,
                    HttpStatus.OK,
                    errorMessage.NO_RECORD_FOUND,
                    version.v1,
                    []
                );
            }
        }
        catch (error) {

            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(
                res,
                false,
                HttpStatus.INTERNAL_SERVER_ERROR,
                `${error}`,
                version.v1,
                []
            );
        }
    }


    /**
   * @description method to get detail of a film
   * @param {Request} req req object containing film fields
   * @param {Response} res response object
   */
    public getFilm = async (req: Request, res: Response): Promise<any> => {
        const methodName = "[getFilm]";
        try {
            const { filmSlugName } = req.params;

            // find if FILM exists
            const filmObj = await this._filmRepository.findFilmByFilmSlugName(filmSlugName);
            if (filmObj) {
                return ResponseHandler.setResponse(
                    res,
                    true,
                    HttpStatus.OK,
                    errorMessage.SUCCESS,
                    version.v1,
                    filmObj
                );
            }
            else {
                return ResponseHandler.setResponse(
                    res,
                    true,
                    HttpStatus.OK,
                    errorMessage.NO_RECORD_FOUND,
                    version.v1,
                    {}
                );
            }

        }
        catch (error) {

            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(
                res,
                false,
                HttpStatus.INTERNAL_SERVER_ERROR,
                `${error}`,
                version.v1,
                []
            );
        }
    }

    /**
    * @description method to add comment
    * @param {Request} req req object containing film fields
    * @param {Response} res response object
    */
    public addComment = async (req: Request, res: Response): Promise<any> => {
        const methodName = "[addComment]";
        try {


            // find if film already exists
            const existingFilm = await this._filmRepository.findOne(req.body.id);

            if (existingFilm) {

                //check user is valid
                const existingUser = await this._userRepository.findOne(req.body.comment.user);


                if (existingUser) {
                    //add comment

                    await this._filmRepository.addComment(req.body.id, req.body.comment)
                    return ResponseHandler.setResponse(
                        res,
                        true,
                        HttpStatus.CREATED,
                        errorMessage.SUCCESS,
                        version.v1,
                        {}
                    );

                }
                else {
                    return ResponseHandler.setResponse(
                        res,
                        false,
                        HttpStatus.BAD_REQUEST,
                        errorMessage.BAD_REQUEST,
                        version.v1,
                        {}
                    );
                }


            }
            else {
                return ResponseHandler.setResponse(
                    res,
                    false,
                    HttpStatus.BAD_REQUEST,
                    errorMessage.BAD_REQUEST,
                    version.v1,
                    {}
                );
            }

        }
        catch (error) {

            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(
                res,
                false,
                HttpStatus.INTERNAL_SERVER_ERROR,
                `${error}`,
                version.v1,
                {}
            );
        }
    }


}