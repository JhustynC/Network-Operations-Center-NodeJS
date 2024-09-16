import { Server } from "./server";
import { CronService } from "./cron/cron-service";
import { CheckServiceMultipleUseCase } from "../domain/use-cases/checks/check-service-multiple";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.imp";

// Mockeamos las dependencias
jest.mock("./cron/cron-service");
jest.mock("../domain/use-cases/checks/check-service-multiple");
jest.mock("../infrastructure/repositories/log.repository.imp");

describe("Server", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should start the server and schedule a job", async () => {
    // Mock del método createJob
    const mockJob = {
      start: jest.fn(),
    };
    
    // Espía en CronService.createJob
    (CronService.createJob as jest.Mock).mockReturnValue(mockJob);

    // Espía en console.log
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

    // Llamamos al método start
    await Server.start();

    expect(consoleLogSpy).toHaveBeenCalledWith("Server started...");

    // Verificamos que CronService.createJob fue llamado correctamente
    expect(CronService.createJob).toHaveBeenCalledWith(
      "*/5 * * * * *",
      expect.any(Function)
    );

    // Obtenemos la función del trabajo programado
    const jobFunction = (CronService.createJob as jest.Mock).mock.calls[0][1];

    // Mock de CheckServiceMultipleUseCase
    const mockCheckServiceMultipleUseCase = new CheckServiceMultipleUseCase(
      [],
      jest.fn(),
      jest.fn()
    );

    (CheckServiceMultipleUseCase as jest.Mock).mockImplementation(
      () => mockCheckServiceMultipleUseCase
    );
    mockCheckServiceMultipleUseCase.execute = jest.fn();

    // Ejecutamos la función del trabajo
    await jobFunction();

    // Verificamos que CheckServiceMultipleUseCase fue instanciado y ejecutado
    expect(CheckServiceMultipleUseCase).toHaveBeenCalled();
    expect(mockCheckServiceMultipleUseCase.execute).toHaveBeenCalledWith(
      "http://google.com"
    );

    // Restauramos el mock de console.log
    consoleLogSpy.mockRestore();
  });
});
