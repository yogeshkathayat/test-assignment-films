import request from "supertest";
import app from "../src/config/app";
import { FilmModel } from "../src/api/models/film.model";
import { CountryModel } from "../src/api/models/country.model";
import { GenreModel } from "../src/api/models/genre.model";


let filmId='';

/**
 * Connecting with database before running test cases
 */
beforeAll(async () => {

    setTimeout(async () => {
        import("../src/config/mongoose");
    }, 4000);
});


/**
 * Testing health api
 */
describe("GET /api/v1/health", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api/v1/health")
            .expect(200);
    });
});



/**
 * Testing get films api
 */
describe("GET /api/v1/films", function () {
    let data = {
        // no parameters
    };
    it("It should return 200 OK", function (done) {
        request(app)
            .get("/api/v1/films")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

});

/**
 * Testing get film by film slug name
 */

describe("GET /api/v1/films/:filmSlugName", () => {

    it("It should return 200 OK with no records if we put wrong filmslugname", function (done) {
        request(app)
            .get("/api/v1/films/wrongfilm")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    it("It should return 200 OK with records if we put right filmSlugName", function (done) {
        request(app)
            .get("/api/v1/films/the-avengers")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


});



/**
 * Testing post /films/create endpoint
 */
describe("POST /api/v1/films/create", function () {
    let data = {
        // no parameters
    };
    it("It should return 400 BAD REQUEST without parameters", function (done) {
        request(app)
            .post("/api/v1/films/create")
            .send(data)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    let data2 = {
        // no parameters
        name:"test film"

    };
    it("It should return 400 BAD REQUEST with only name parameters", function (done) {
        request(app)
            .post("/api/v1/films/create")
            .send(data2)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    let data3 =  {
        "name": "The Avengers 2",
        "slugName": "the-avengers",
        "releaseDate": "04 May 2012",
        "genre": ['5ee2757cd0ee7da8a4315081'],
        "description": "Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.",
        "country": "5ee2757cd0ee7da8a4315067",
        "ticketPrice": "69",
        "rating": "4",
        "photo": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTA0NjY0NzE4OTReQTJeQWpwZ15BbWU3MDczODg2Nzc@._V1_SX1777_CR0,0,1777,999_AL_.jpg",
    
    };

    it("It should return 201 OK with correct parameters", function (done) {
        request(app)
            .post("/api/v1/films/create")
            .send(data3)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});



/**
 * Testing post /films/comment endpoint
 */
describe("POST /api/v1/films/comment", function () {
    let data = {
        // no parameters
    };
    it("It should return 400 BAD REQUEST without parameters", function (done) {
        request(app)
            .post("/api/v1/films/comment")
            .send(data)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    let data2 = {
        id:"123"

    };
    it("It should return 400 BAD REQUEST with only name parameters", function (done) {
        request(app)
            .post("/api/v1/films/comment")
            .send(data2)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    let data3 = {
        id:"123",
        comment:{
            text:" just a comment",
            user:"123"
        }

    };
    it("It should return 400 BAD REQUEST with wrong parameters", function (done) {
        request(app)
            .post("/api/v1/films/comment")
            .send(data3)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    let data4 = {
            "id":"5ee2757cd0ee7da8a431508a",
               "comment":{
                   "text":"nice movie",
                   "user":"5ee24b5894982a9bce7bb844"
               }
    };
    it("It should return 201 OK with correct parameters", function (done) {
        request(app)
            .post("/api/v1/films/comment")
            .send(data4)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    console.log("filmId after",filmId)

});