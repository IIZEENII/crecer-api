import { readFileSync } from 'fs';
import { TempleteAdapter } from './TempleteAdapter';
import { compile } from 'handlebars';
import { TempleteNotFoundExeption } from './TempleteNotFoundExeption';

export class HandlebarsAdapter implements TempleteAdapter {
  compile(templeteAbsolutePath: string, data: any): string {
    const templeteFile = this.readTemplete(templeteAbsolutePath);
    const compiledTemplete = compile(templeteFile);
    return compiledTemplete(data);
  }

  private readTemplete(templeteAbsolutePath: string): string {
    try {
      return readFileSync(templeteAbsolutePath, 'utf-8');
    } catch (error) {
      throw new TempleteNotFoundExeption(templeteAbsolutePath);
    }
  }
}
