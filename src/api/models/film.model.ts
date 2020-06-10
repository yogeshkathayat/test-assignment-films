import { Schema, model } from "mongoose";
import { IFilm } from "../interfaces/IFilm";
import * as Joi from "@hapi/joi";

export const UserValidationSchema = Joi.object().keys({
    _id: Joi.string(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    releaseDate: Joi.string().required(),
    rating: Joi.number().valid(1, 2, 3, 4, 5).required(),
    ticketPrice: Joi.string().required(),
    country: Joi.string().required(),
    genre: Joi.string().required(),
    photo: Joi.string().required()
});


const filmSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    releaseDate: {
        type: String,
        required: true,

    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,

    },
    ticketPrice: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const FilmModel = model<IFilm>("Film", filmSchema);