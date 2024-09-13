import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("Log Entity", () => {
  const testLog = {
    level: LogSeverityLevel.low,
    message: "test-message",
    origin: "log-model.test.ts",
  };

  test("Should create a LogEntoty instance", () => {
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: "test-message",
      origin: "log-model.test.ts",
    });
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(testLog.message);
    expect(log.level).toBe(testLog.level);
    expect(log.origin).toBe(testLog.origin);
    expect(log.createAt).toBeInstanceOf(Date);
  });

  it("Should create a LogEntity instance from JSON", () => {
    const logJSON = `{"level":"low","message":"Service http://google.com working","createAt":"2024-09-10T05:05:15.604Z","origin":"check-service.ts"}`;
    const logEntity = LogEntity.fromJSON(logJSON);
    expect(logEntity).toBeInstanceOf(LogEntity);
    expect(logEntity!.message).toBe("Service http://google.com working");
    expect(logEntity!.level).toBe(LogSeverityLevel.low);
    expect(logEntity!.origin).toBe("check-service.ts");
    expect(logEntity!.createAt).toBeInstanceOf(Date);
  });

  test("Shoulf create a LogEntity instance from Object", () => {
    const logEntity = LogEntity.fromObject(testLog);
    expect(logEntity).toBeInstanceOf(LogEntity);
    expect(logEntity.message).toBe(testLog.message);
    expect(logEntity.level).toBe(testLog.level);
    expect(logEntity.origin).toBe(testLog.origin);
    expect(logEntity.createAt).toBeInstanceOf(Date);
  });
});
