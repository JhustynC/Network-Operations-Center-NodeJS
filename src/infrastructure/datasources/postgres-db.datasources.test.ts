import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PostgresDbLogDatasource } from "./postgres-db.datasources";

describe("postegres-db.datasources.ts", () => {
  const logDatasource = new PostgresDbLogDatasource();

  const testLog: LogEntity = {
    message: "Test log message",
    createAt: new Date(),
    level: LogSeverityLevel.medium,
    origin: "mongo-db.datasources.test.ts",
  };

  const prisma = new PrismaClient();

  test("Should create a log", async () => {
    await logDatasource.saveLog(testLog);
  });

  beforeAll(async () => {
    await prisma.logModel.deleteMany({});
  });

  afterAll(async () => {
    await prisma.logModel.deleteMany({});
  });

  test("Should return a logs serverity medium list", async () => {
    const logs = await logDatasource.getLog(LogSeverityLevel.medium);
    expect(logs.length).toBe(1);
    // console.log(logs);
    expect(LogEntity.fromObject(logs[0])).toEqual(
      expect.objectContaining({
        ...testLog,
        createAt: expect.any(Date),
      })
    );
  });

  test("Should return all logs", async () => {
    const logs = await logDatasource.getAllLogs();
    expect(logs.length).toBeDefined();
    // console.log(logs);
    expect(logs).toEqual([testLog]);
  });
});
