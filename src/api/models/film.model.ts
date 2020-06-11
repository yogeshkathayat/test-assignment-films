import { Schema, model } from "mongoose";
import { IFilm } from "../interfaces/IFilm";
import * as Joi from "@hapi/joi";

export const FilmValidationSchema = Joi.object().keys({
    _id: Joi.string(),
    name: Joi.string().required(),
    slugName: Joi.string(),
    description: Joi.string().required(),
    releaseDate: Joi.string().required(),
    rating: Joi.number().valid(1, 2, 3, 4, 5).required(),
    ticketPrice: Joi.string().required(),
    country: Joi.string().required(),
    genre: Joi.string().required(),
    photo: Joi.string().required(),
    comment:Joi.array()
});


const filmSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    slugName: {
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
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true,
    },
    genre: [{
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    }],
    photo: {
        type: String,
        required: true,
    },
    comment: [{
        text: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    }],
}, { timestamps: true });

export const FilmModel = model<IFilm>("Film", filmSchema);