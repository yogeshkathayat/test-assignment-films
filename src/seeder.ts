'use strict';

import mongoose from "mongoose";
import path from "path";
import * as fs from 'fs';
import * as sha5 from "js-sha512";
import { UserModel } from "./api/models/user.model";
import { FilmModel } from "./api/models/film.model";
import { CountryModel } from "./api/models/country.model";
import { GenreModel } from "./api/models/genre.model";
import {comment} from "./api/interfaces/IFilm"
import {
    genreList,
    filmList
} from "./config/constants";

const logger = '[seeder]'
const sha512 = sha5.sha512;
const countryList = JSON.parse(fs.readFileSync(
    path.join(__dirname, "../src/config/countryList.json"),
    'utf8'));

export const seed = async function () {

    const methodName = '[seed]'
    try {
        await seedUser();
        await seedCountryList();
        await seedGenreList();
        await seedFilmList();
    } catch (error) {
        console.log(logger, methodName, error)
    }
};


const seedUser= async function () {

    const userList=[{
        name:"john doe",
        email:"john@doe.com",
        password: sha512("1234")
    }]
    const methodName = '[seedUserList]'
    try {
        let count = await UserModel.count({email:"john@doe.com"})
        if (count == 0) {
            for (let user of userList) {
                const userObj = new UserModel(user)
                await UserModel.create(userObj)
            }
            console.log('User Seeding Done');
        }
        else {
            console.log("User already seeded")
        }

    }
    catch (error) {
        console.log(logger, methodName, error)
    }
};

const seedCountryList = async function () {

    const methodName = '[seedCountryList]'
    try {
        let count = await CountryModel.count({})
        if (count == 0) {
            for (let country of countryList) {
                const countryObj = new CountryModel(country)
                await CountryModel.create(countryObj)
            }
            console.log('Country Seeding Done');
        }
        else {
            console.log("country already seeded")
        }

    }
    catch (error) {
        console.log(logger, methodName, error)
    }
};




const seedGenreList = async function () {

    const methodName = '[seedGenreList]'
    try {
        let count = await GenreModel.count({})
        if (count == 0) {
            for (let genre of genreList) {
                const genreObj = new GenreModel({name:genre})
                await GenreModel.create(genreObj)
            }
            console.log('Genre Seeding Done');
        }
        else {
            console.log("Genre already seeded")
        }

    }
    catch (error) {
        console.log(logger, methodName, error)
    }
};



const seedFilmList = async function () {

    const methodName = '[seedFilmList]'
    try {
        let count = await FilmModel.count({})
        if (count == 0) {
            for (let film of filmList) {
                let genreList=[];
                let commentList:comment[]=[];

                //check film.genre and put id of it
                for(let genre of film.genre){
                   let genreFound=await GenreModel.findOne({name:genre})
                   genreList.push(genreFound._id);
                }

                //check film.country and put id of it
                let countryFound=await CountryModel.findOne({code:film.country})
                
                
                //film.comment
                for(let comment of film.comment){
                    let userFound=await UserModel.findOne({email:"john@doe.com"});
                    commentList.push({
                        text:comment.text,
                        user:userFound._id
                    });
                 }
              

                film.genre=genreList;
                film.country=countryFound._id;
                film.comment=commentList;
                const filmObj = new FilmModel(film)
                await FilmModel.create(filmObj)
            }
            console.log('Film Seeding Done');
        }
        else {
            console.log("Film already seeded")
        }

    }
    catch (error) {
        console.log(logger, methodName, error)
    }
};