import { BaseRepository } from "./base.repository";
import { CountryModel } from "../models/country.model";
import { ICountry } from "../interfaces/ICountry";

export class CountryRepository extends BaseRepository<ICountry> {
    constructor() {
        super(CountryModel);
    }

}