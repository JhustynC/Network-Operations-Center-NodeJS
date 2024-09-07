import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe("data/mongo/init.ts", () => {
  afterEach(() => {
    mongoose.connection.close();
  });

  test("Should connect to MongoDb", async () => {
    const connected = await MongoDatabase.conecct({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    });

    expect(connected).not.toBeNull();
  });

  test("Should throw an error when MongoDb connection fails", async () => {
    try {
      await MongoDatabase.conecct({
        mongoUrl: "mongodb://localhost:badTestPort/",
        dbName: "test_db",
      });
    } catch (error) {
      expect(error).toContain("Mongo conection database error");
    }
  });
});
