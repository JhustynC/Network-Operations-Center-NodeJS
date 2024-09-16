import { CronService } from "./cron-service";

describe("Cron Service", () => {
  const mockOnTick = jest.fn();

  const spyCronService = jest.spyOn(CronService, "createJob");

  afterEach(() => {
    jest.clearAllMocks();
    spyCronService.mockRestore();
  });

  test("Should create a job with correct arguments", () => {
    CronService.createJob("* * * * * *", mockOnTick);
    expect(spyCronService).toHaveBeenCalledWith("* * * * * *", mockOnTick);
  });

  test("Should create a job", (done) => {
    const job = CronService.createJob("* * * * * *", mockOnTick);
    setTimeout(() => {
      expect(mockOnTick).toHaveBeenCalledTimes(4);
      done();
    }, 2000);
  });
});
