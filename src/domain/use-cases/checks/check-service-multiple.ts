import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { AbsLogRepository } from "../../repository/log.repository";

interface ICheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (erro: string) => void;

export class CheckServiceMultipleUseCase implements ICheckServiceUseCase {
  private origin: string = "check-service.ts";

  constructor(
    private readonly logRepositories: AbsLogRepository[],
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback
  ) {}

  private saveWithAllRepositories(log: LogEntity) {
    this.logRepositories.forEach((repository) => {
      repository.saveLog(log);
    });
  }

  async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error on check service; ${url}`);

      const logEntity = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Service ${url} working`,
        origin: this.origin,
      });

      this.saveWithAllRepositories(logEntity);
      this.successCallback?.();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok: ${error}`;
      const logEntity = new LogEntity({
        level: LogSeverityLevel.high,
        message: errorMessage,
        origin: this.origin,
      });
      // this.logRepository.saveLog(logEntity);
      this.saveWithAllRepositories(logEntity);
      this.errorCallback?.(errorMessage);
      return false;
    }
  }
}
