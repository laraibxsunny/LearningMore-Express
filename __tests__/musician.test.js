const request = require("supertest");
const app = require("../src/app.js");
const syncSeed = require("../seed.js");
const Musician = require("../models/Musician.js");
let musicianQuantity;

beforeAll(async () => {
  await syncSeed();
  const musicians = await Musician.findAll();
  musicianQuantity = musicians.length;
});

afterAll(async () => {
  await syncSeed();
});

describe("Testing /musicians Route", () => {
  test("GET /musicians returns Status Code 200", async () => {
    //Arrange /Act
    const response = await request(app).get("/musicians");
    //Assert
    expect(response.statusCode).toBe(200);
  });

  test("GET /musicians returns an Array of Musicians", async () => {
    //Arrange /Act
    const response = await request(app).get("/musicians");
    //Assert
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].name).toBe("Mick Jagger");
  });

  test("GET /musicians returns the Correct Data", async () => {
    //Arrange /Act
    const response = await request(app).get("/musicians");
    //Assert
    expect(response.body).toContainEqual(
      expect.objectContaining({
        name: "Jimi Hendrix",
        instrument: "Guitar",
      })
    );
  });

  test("POST /musicians returns a larger Array", async () => {
    //Arrange /Act
    const response = await request(app).post("/musicians").send({
      name: "Tyler The Creator",
      instrument: "Voice",
    });
    //Assert
    expect(response.body.length).toBe(musicianQuantity + 1);
  });

  test("PUT /musicians updates items by ID", async () => {
    //Arrange
    await request(app).put("/musicians/1").send({
      name: "Frances",
      instrument: "Heart",
    });
    //Act
    const musician = await Musician.findByPk(1);
    //Assert
    expect(musician.name).toBe("Frances");
    expect(musician.instrument).toBe("Heart");
  });

  test("DELETE /musicians deletes items by ID", async () => {
    //Arrange
    await request(app).delete("/musicians/1");
    //Act
    const musician = await Musician.findAll();
    //Assert
    expect(musician[0].id).not.toBe(1);
  });
});
