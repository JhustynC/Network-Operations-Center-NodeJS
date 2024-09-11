import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoDbLogDatasource } from "./mongo-db.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("MongoDb Log Datasource", () => {
  const logDatasource = new MongoDbLogDatasource();

  const testLog: LogEntity = {
    message: "Test log message",
    createAt: new Date(),
    level: LogSeverityLevel.medium,
    origin: "mongo-db.datasources.test.ts",
  };

  beforeAll(async () => {
    await MongoDatabase.conecct({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany({});
  });

  afterAll(async () => {
    mongoose.connection.close();
    await mongoose.disconnect();
  });

  test("Should create a log", async () => {
    await logDatasource.saveLog(testLog);
  });

  test("Should return a log", async () => {
    await logDatasource.saveLog(testLog);
    const logs = await logDatasource.getLog(LogSeverityLevel.medium);
    expect(logs.length).toBe(1);
    expect(LogEntity.fromObject(logs[0])).toEqual(
      expect.objectContaining({
        ...testLog,
        createAt: expect.any(Date),
      })
    );
  });

  test("Should return all logs", async () => {
    await logDatasource.saveLog(testLog);
    const logs = await logDatasource.getAllLogs();
    expect(logs.length).toBeDefined();
    expect(LogEntity.fromObject(logs[0])).toEqual(
      expect.objectContaining({
        ...testLog,
        createAt: expect.any(Date),
      })
    );
    const logsEntities = logs.map((log) => LogEntity.fromObject(log));
    expect(logsEntities).toEqual([testLog]);
  });
});
