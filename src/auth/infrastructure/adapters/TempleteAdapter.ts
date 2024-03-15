export interface TempleteAdapter {
  compile(templeteAbsolutePath: string, data: any): string;
}
