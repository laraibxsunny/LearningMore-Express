// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const { seedMusician } = require("./seedData");

describe("./musicians endpoint", () => {
  test("Testing The Endpoint", async () => {
    //Arrange / Act
    const response = await request(app).get("/musicians");
    //Assert
    expect(response.statusCode).toBe(200);
  });
  test("Testing Data Recovery/Accuracy", async () => {
    //Arrange
    const response = await request(app).get("/musicians");

    //Act
    const responseData = JSON.parse(response.text);

    //Assert
    expect(responseData[0].name).toBe("Mick Jagger");
    expect(responseData[1].instrument).toBe("Voice");
    expect(responseData[2].id).toBe(3);
  });
});

describe("./bands endpoint", () => {
  test("Testing The Endpoint", async () => {
    //Arrange / Act
    const response = await request(app).get("/bands");
    //Assert
    expect(response.statusCode).toBe(200);
  });
  test("Testing Data Recovery/Accuracy", async () => {
    //Arrange
    const response = await request(app).get("/bands");

    //Act
    const responseData = JSON.parse(response.text);

    //Assert
    expect(responseData[0].name).toBe("The Beatles");
    expect(responseData[1].genre).toBe("Pop");
    expect(responseData[2].id).toBe(3);
  });
});
