import { Server } from "././presentation/server";
import { MongoDatabase } from "./data/mongo";

describe("App", () => {
  const mockServerStart = jest.fn();
  Server.start = mockServerStart;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should start the server", () => {
    Server.start();
    expect(mockServerStart).toHaveBeenCalled();
  });

  test("Should connect mongo database", () => {
    const mongoOptions = {
      mongoUrl: "mongodb://localhost:27017",
      dbName: "noc",
    };

    // Mock connection to MongoDB
    const mockMogoDatabase = jest.fn();
    MongoDatabase.conecct = mockMogoDatabase;
    MongoDatabase.conecct(mongoOptions);
    expect(mockMogoDatabase).toHaveBeenCalledWith(mongoOptions);
  });
});
