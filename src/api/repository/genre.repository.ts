import { BaseRepository } from "./base.repository";
import { GenreModel } from "../models/genre.model";
import { IGenre } from "../interfaces/IGenre";

export class GenreRepository extends BaseRepository<IGenre> {
    constructor() {
        super(GenreModel);
    }

}