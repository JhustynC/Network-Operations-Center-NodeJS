import fs, { access } from "fs";
import path from "path";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { FileSystemDatasource } from "./file-system.datasources";

describe("File-System Datasources", () => {
  const logPath = path.join(__dirname, "../../../logs");

  beforeEach(() => {
    // console.log(logPath);
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  afterAll(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  test("Should create log file if they not exists", () => {
    new FileSystemDatasource();

    const files = fs.readdirSync(logPath);
    expect(files).toEqual([
      "logs-all.log",
      "logs-high.log",
      "logs-mailer.log",
      "logs-medium.log",
    ]);
  });

  test("Should save log in logs-all.log file", () => {
    const logDatasource = new FileSystemDatasource();
    const testLog = {
      message: "Test log message",
      createAt: new Date(),
      level: LogSeverityLevel.low,
      origin: "file-system.datasources.test.ts",
    };

    logDatasource.saveLog(testLog);

    const logs = fs.readFileSync(path.join(logPath, "logs-all.log"), "utf8");
    // console.log(logs);
    expect(logs).toContain(JSON.stringify(testLog));
  });

  test("Should save log in logs-all.log and logs-medium.log file", () => {
    const logDatasource = new FileSystemDatasource();
    const testLog = {
      message: "Test log message",
      createAt: new Date(),
      level: LogSeverityLevel.medium,
      origin: "file-system.datasources.test.ts",
    };

    logDatasource.saveLog(testLog);

    const allLogs = fs.readFileSync(path.join(logPath, "logs-all.log"), "utf8");
    const mediumLogs = fs.readFileSync(
      path.join(logPath, "logs-medium.log"),
      "utf8"
    );
    // console.log(logs);
    expect(allLogs).toContain(JSON.stringify(testLog));
    expect(mediumLogs).toContain(JSON.stringify(testLog));
  });

  test("Should save log in logs-all.log and logs-high.log file", () => {
    const logDatasource = new FileSystemDatasource();
    const testLog = {
      message: "Test log message",
      createAt: new Date(),
      level: LogSeverityLevel.high,
      origin: "file-system.datasources.test.ts",
    };

    logDatasource.saveLog(testLog);

    const allLogs = fs.readFileSync(path.join(logPath, "logs-all.log"), "utf8");
    const highLogs = fs.readFileSync(
      path.join(logPath, "logs-high.log"),
      "utf8"
    );
    // console.log(logs);
    expect(allLogs).toContain(JSON.stringify(testLog));
    expect(highLogs).toContain(JSON.stringify(testLog));
  });

  test("Should return all logs", async () => {
    const logDatasource = new FileSystemDatasource();
    const logLow = {
      message: "Test log message",
      createAt: new Date(),
      level: LogSeverityLevel.low,
      origin: "file-system.datasources.test.ts",
    };
    const logMedim = {
      message: "Test log message",
      createAt: new Date(),
      level: LogSeverityLevel.medium,
      origin: "file-system.datasources.test.ts",
    };
    const logHigh = {
      message: "Test log message",
      createAt: new Date(),
      level: LogSeverityLevel.high,
      origin: "file-system.datasources.test.ts",
    };
    const logMailer = {
      message: "Test log message",
      createAt: new Date(),
      level: LogSeverityLevel.mailer,
      origin: "file-system.datasources.test.ts",
    };

    await logDatasource.saveLog(logLow);
    await logDatasource.saveLog(logMedim);
    await logDatasource.saveLog(logHigh);
    await logDatasource.saveLog(logMailer);

    const allLogs = await logDatasource.getAllLogs();
    // console.log(allLogs);
    expect(allLogs).toEqual([logLow, logMedim, logHigh, logMailer]);
  });

  test("Should return logs for severity level", async () => {
    const logDatasource = new FileSystemDatasource();
    const logLow: LogEntity = {
      message: "Test log message",
      createAt: new Date(),
      level: LogSeverityLevel.low,
      origin: "file-system.datasources.test.ts",
    };
    const logMedium: LogEntity = {
      message: "Test log message",
      createAt: new Date(),
      level: LogSeverityLevel.medium,
      origin: "file-system.datasources.test.ts",
    };
    const logHigh: LogEntity = {
      message: "Test log message",
      createAt: new Date(),
      level: LogSeverityLevel.high,
      origin: "file-system.datasources.test.ts",
    };
    const logMailer: LogEntity = {
      message: "Test log message",
      createAt: new Date(),
      level: LogSeverityLevel.mailer,
      origin: "file-system.datasources.test.ts",
    };

    await logDatasource.saveLog(logLow);
    await logDatasource.saveLog(logMedium);
    await logDatasource.saveLog(logHigh);
    await logDatasource.saveLog(logMailer);

    const allLowLogs = await logDatasource.getLog(LogSeverityLevel.low);
    expect(allLowLogs).toEqual([logLow, logMedium, logHigh, logMailer]);

    const allMediumLogs = await logDatasource.getLog(LogSeverityLevel.medium);
    expect(allMediumLogs).toEqual([logMedium]);

    const allHighLogs = await logDatasource.getLog(LogSeverityLevel.high);
    expect(allHighLogs).toEqual([logHigh]);

    const allMailerLogs = await logDatasource.getLog(LogSeverityLevel.mailer);
    expect(allMailerLogs).toEqual([logMailer]);
  });

  test("Should return an error if severity level is not define", async () => {
    const logDatasource = new FileSystemDatasource();
    const customSeverityLevel = "custom" as LogSeverityLevel;
    try {
      await logDatasource.getLog(customSeverityLevel);
    } catch (error) {
      const errorString = `${error}`;
      expect(errorString).toContain("Severity level not supported");
    }
  });

  test("Should return an error if log parsing is not correct", async () => {
    const logDatasource = new FileSystemDatasource();

    fs.writeFileSync(
      path.join(logPath, "logs-all.log"),
      JSON.stringify({ test: "test" })
    );
    try {
      const logs = await logDatasource.getLog(LogSeverityLevel.low);
      console.log(logs);
    } catch (err) {
      const errString = `${err}`;
      console.log(errString);
      expect(errString).toContain('Error parsing log: {"test":"test"}');
    }
  });
});
