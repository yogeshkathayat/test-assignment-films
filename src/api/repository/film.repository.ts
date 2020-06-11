import { BaseRepository } from "./base.repository";
import { FilmModel } from "../models/film.model";
import { IFilm } from "../interfaces/IFilm";

export class FilmRepository extends BaseRepository<IFilm> {
    constructor() {
        super(FilmModel);
    }
    async findFilmByFilmName(filmName: string): Promise<IFilm> {
        return await FilmModel.findOne({ name: filmName })
            .populate('country', '_id name code')
            .populate('genre', '_id name')
            .populate('comment.user', '_id name email')
            .lean();
    }

    async filmExists(filmName: string): Promise<IFilm> {
        return await FilmModel.findOne({ name: filmName }).lean();
    }

    async findFilmByFilmSlugName(filmSlugName: string): Promise<IFilm> {
        return await FilmModel.findOne({ slugName: filmSlugName })
            .populate('country', '_id name code')
            .populate('genre', '_id name')
            .populate('comment.user', '_id name email')
            .lean();
    }

    async getFilmList(): Promise<IFilm[]> {

        return await FilmModel.find()
            .populate('country', '_id name code')
            .populate('genre', '_id name')
            .populate('comment.user', '_id name email')
            .lean();
    }


    async addComment(id: string, comment: any): Promise<IFilm> {
        return await FilmModel.findOneAndUpdate(
            {
                _id: id
            },
            {
                $push: {
                    comments: {
                        text: comment.text,
                        user: comment.user
                    }
                }
            });
    }




}