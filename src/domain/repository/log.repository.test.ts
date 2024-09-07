import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { AbsLogRepository } from "./log.repository";

describe("log.respository.ts AbsLogRespositoty", () => {
  const testLog: LogEntity = {
    level: LogSeverityLevel.low,
    origin: "log-model.test.ts",
    message: "test-message",
    createAt: new Date(),
  };

  class MockLogRepository implements AbsLogRepository {
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

  const mockLogRepository = new MockLogRepository();

  test("Shopuld expect a AbsLogRepository instance", async () => {
    expect(mockLogRepository).toBeInstanceOf(MockLogRepository);
    expect(mockLogRepository).toHaveProperty("saveLog");
    expect(mockLogRepository).toHaveProperty("getLog");
    expect(mockLogRepository).toHaveProperty("getAllLogs");

    expect(mockLogRepository.saveLog).toBeInstanceOf(Function);
    expect(mockLogRepository.getLog).toBeInstanceOf(Function);
    expect(mockLogRepository.getAllLogs).toBeInstanceOf(Function);

    await mockLogRepository.saveLog(testLog);
    const logs = await mockLogRepository.getLog(LogSeverityLevel.low);
    expect(logs).toEqual([testLog]);

    const allLogs = await mockLogRepository.getAllLogs();
    expect(allLogs).toEqual([testLog]);
  });
});
