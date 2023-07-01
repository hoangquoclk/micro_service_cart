export class ParseUtil {
  static parseBool(value: string): boolean {
    return value.toLocaleLowerCase() === 'true';
  }
}
