import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugin";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";

describe("log.model.test.ts", () => {
  beforeAll(async () => {
    await MongoDatabase.conecct({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  //)
  test("Should return logModel", async () => {
    const logData = {
      origin: "log-model.test.ts",
      message: "test-message",
      level: "low",
    };

    const log = await LogModel.create(logData);
    // console.log(log);
    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        createAt: expect.any(Date),
        id: expect.any(String),
      })
    );

    await LogModel.findByIdAndDelete({ _id: log.id });
  });

  test("should return a schema object", () => {
    const schema = LogModel.schema.obj;
    // console.log(schema);
    expect(schema).toEqual(
      expect.objectContaining({
        level: {
          type: expect.any(Function),
          enum: ["low", "medium", "high", "mailer"],
          required: true,
          default: "low",
        },
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function), required: true },
        createAt: { type: expect.any(Function), default: expect.any(Date) },
      })
    );
  });
});
