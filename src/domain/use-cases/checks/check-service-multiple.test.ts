import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultipleUseCase } from "./check-service-multiple";

describe("CheckServiceMultiple UseCase", () => {
  const mockRepository = {
    saveLog: jest.fn(),
    getLog: jest.fn(),
    getAllLogs: jest.fn(),
  };

  const succesCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckServiceMultipleUseCase(
    [mockRepository],
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
    expect(mockRepository.saveLog).toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
  test("Should call error callback when fetch returns false", async () => {
    const itsOK = await checkService.execute("htts://google.badtest");
    expect(itsOK).toBe(false);
    expect(succesCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
