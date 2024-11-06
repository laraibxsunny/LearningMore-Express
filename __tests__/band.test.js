const request = require("supertest");
const app = require("../src/app.js");
const syncSeed = require("../seed.js");
const { Band, Musician } = require("../models");
let bandQuantity;

beforeAll(async () => {
  await syncSeed();
  const bands = await Band.findAll();
  bandQuantity = bands.length;
});

afterAll(async () => {
  await syncSeed();
});

describe("Testing /bands Route", () => {
  test("GET /bands returns Status Code 200", async () => {
    //Arrange /Act
    const response = await request(app).get("/bands");
    //Assert
    expect(response.statusCode).toBe(200);
  });

  test("GET /bands returns an Array of Bands with Musicians", async () => {
    //Arrange
    const band = await Band.create({
      name: "One Direction",
      genre: "Pop",
    });

    const musician1 = await Musician.create({
      name: "Harry Styles",
      instrument: "Voice",
    });

    const musician2 = await Musician.create({
      name: "Zayn Malek",
      instrument: "Voice",
    });

    const response = await request(app).get("/bands");
    //Act
    await band.setMusicians([musician1, musician2]);

    const bandWithMusicians = await Band.findOne({
      where: { name: "One Direction" },
      include: Musician,
    });
    //Assert
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].name).toBe("The Beatles");
    expect(bandWithMusicians.Musicians.length).toBe(2);
    expect(bandWithMusicians.Musicians[0].name).toBe("Harry Styles");
  });
});
