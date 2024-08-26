interface ICheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (erro: string) => void;

export class CheckService implements ICheckServiceUseCase {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error on check service; ${url}`);
      this.successCallback()
      // console.log(`Service is ok: ${url}`);
    } catch (error) {
      this.errorCallback(`${error}`)
      // console.error(error);
      return false;
    }
    return true;
  }
}
