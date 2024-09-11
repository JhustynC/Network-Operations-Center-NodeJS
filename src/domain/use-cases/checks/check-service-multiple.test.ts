import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultipleUseCase } from "./check-service-multiple";

describe("CheckServiceMultiple UseCase", () => {
  const mockRepository1 = {
    saveLog: jest.fn(),
    getLog: jest.fn(),
    getAllLogs: jest.fn(),
  };

  const mockRepository2 = {
    saveLog: jest.fn(),
    getLog: jest.fn(),
    getAllLogs: jest.fn(),
  };

  const succesCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckServiceMultipleUseCase(
    [mockRepository1, mockRepository2],
    succesCallback,
    errorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should call success callback when fetch returns true", async () => {
    const itsOK = await checkService.execute("https://google.com");
    expect(itsOK).toBe(true);
    expect(succesCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepository1.saveLog).toHaveBeenCalled();
    expect(mockRepository2.saveLog).toHaveBeenCalled();
    expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
  test("Should call error callback when fetch returns false", async () => {
    const itsOK = await checkService.execute("htts://google.badtest");
    expect(itsOK).toBe(false);
    expect(succesCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepository1.saveLog).toHaveBeenCalled();
    expect(mockRepository2.saveLog).toHaveBeenCalled();
    expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
