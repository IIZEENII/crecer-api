export class TempleteNotFoundExeption extends Error {
  constructor(pathConflict: string) {
    super(`Templete not found on path: ${pathConflict}`);
  }
}
