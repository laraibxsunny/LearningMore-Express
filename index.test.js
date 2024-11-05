// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const { seedMusician } = require("./seedData");


describe("/musicians endpoint", () => {
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

describe("/bands endpoint", () => {
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

describe("/musicians/:id endpoint", () => {
  test("Testing The Endpoint", async () => {
    //Arrange / Act
    const response = await request(app).get("/musicians/1");
    //Assert
    expect(response.statusCode).toBe(200);
  });

  test("Testing Data Recovery/Accuracy", async () => {
    //Arrange
    const response1 = await request(app).get("/musicians/1");
    const response2 = await request(app).get("/musicians/2");
    const response3 = await request(app).get("/musicians/3");

    //Act
    const responseData1 = JSON.parse(response1.text);
    const responseData2 = JSON.parse(response2.text);
    const responseData3 = JSON.parse(response3.text);

    //Assert
    expect(responseData1.name).toBe("Mick Jagger");
    expect(responseData2.instrument).toBe("Voice");
    expect(responseData3.instrument).toBe("Guitar");
  });

  describe("Testing CRUD Operations", () => {
    test("Create/Post Endpoint", async () => {
      //Arrange /Act
      const response = await request(app).post("/musicians");
      //Assert
      expect(response.statusCode).toBe(200);
    });

    test("Read/Get Endpoint", async () => {
      //Arrange /Act
      const response = await request(app).get("/musicians/1");
      //Assert
      expect(response.statusCode).toBe(200);
    });

    test("Update/Put Endpoint", async () => {
      //Arrange /Act
      const response = await request(app).put("/musicians/1");
      //Assert
      expect(response.statusCode).toBe(200);
    });

    test("Delete Endpoint", async () => {
      //Arrange /Act
      const response = await request(app).delete("/musicians/3");
      //Assert
      expect(response.statusCode).toBe(200);
    });
  });
});
