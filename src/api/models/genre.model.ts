import { Schema, model } from "mongoose";
import { IGenre } from "../interfaces/IGenre";
import * as Joi from "@hapi/joi";

export const GenreValidationSchema = Joi.object().keys({
    _id: Joi.string(),
    name: Joi.string()
});

const genreSchema = new Schema({
    name: {
        type: String
    },

}, { timestamps: true });

export const GenreModel = model<IGenre>("Genre", genreSchema);