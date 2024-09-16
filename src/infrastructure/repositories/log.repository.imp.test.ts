import { AbsLogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.imp";

describe("Log repository implementation ", () => {
  const mockLogDatasource: AbsLogDatasource = {
    saveLog: jest.fn(),
    getLog: jest.fn(),
    getAllLogs: jest.fn(),
  };

  const logRepository = new LogRepositoryImpl(mockLogDatasource);
  const log: LogEntity = {
    level: LogSeverityLevel.medium,
    message: "Test log",
    origin: "Test origin",
    createAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should call the datasource functions with args", async () => {
    await logRepository.saveLog(log);
    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);

    await logRepository.getLog(LogSeverityLevel.medium);
    expect(mockLogDatasource.getLog).toHaveBeenCalledWith(
      LogSeverityLevel.medium
    );

    await logRepository.getAllLogs();
    expect(mockLogDatasource.getAllLogs).toHaveBeenCalled();
  });
});
