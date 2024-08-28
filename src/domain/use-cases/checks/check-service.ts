import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { AbsLogRepository } from "../../repository/log.repository";

interface ICheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (erro: string) => void;

export class CheckService implements ICheckServiceUseCase {
  constructor(
    private readonly logRepository: AbsLogRepository,
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error on check service; ${url}`);

      const logEntity = new LogEntity(
        LogSeverityLevel.low,
        `Service ${url} working`
      );

      this.logRepository.saveLog(logEntity);
      //Forma de corta de hcaer un if
      this.successCallback?.();
    } catch (error) {
      const errorMessage = `${url} is not ok: ${error}`;
      const logEntity = new LogEntity(LogSeverityLevel.high, errorMessage);
      this.logRepository.saveLog(logEntity);
      this.errorCallback?.(errorMessage);
      return false;
    }
    return true;
  }
}
