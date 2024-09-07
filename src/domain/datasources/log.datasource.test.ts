import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { AbsLogDatasource } from "./log.datasource"; // Assuming the file is named log.datasources.ts

describe("log.datasources.ts AbsLogDatasource", () => {
  // test.todo("Should return a instace");

  const testLog: LogEntity = {
    level: LogSeverityLevel.low,
    origin: "log-model.test.ts",
    message: "test-message",
    createAt: new Date(),
  };

  class MockLogDatasource implements AbsLogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLog(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [testLog];
    }
    async getAllLogs(): Promise<LogEntity[]> {
      return [testLog];
    }
  }

  test("should test the abstract class", async () => {
    const mockLogDatasource = new MockLogDatasource();
    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
    expect(mockLogDatasource).toHaveProperty("saveLog");
    expect(mockLogDatasource).toHaveProperty("getLog");
    expect(mockLogDatasource).toHaveProperty("getAllLogs");

    await mockLogDatasource.saveLog(testLog);

    const logs = await mockLogDatasource.getLog(LogSeverityLevel.low);
    expect(logs).toEqual([testLog]);

    const allLogs = await mockLogDatasource.getAllLogs();
    expect(allLogs).toEqual([testLog]);
  });
});
