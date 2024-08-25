interface ICheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

export class CheckService implements ICheckServiceUseCase {
  async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error on check service; ${url}`);
      console.log(`Service is ok: ${url}`);
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
}
