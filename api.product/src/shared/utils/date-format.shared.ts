export class DateFormat {
  static formatDate(date: Date, language = 'pt-BR') {
    return new Intl.DateTimeFormat(language, {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  }

  static addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);

    return newDate;
  }

  static isGreaterThan(date: Date, date2 = new Date()): boolean {
    return date < date2;
  }

  static compareInDays(date1: Date, date2 = new Date()) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const utc1 = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate(),
    );

    const utc2 = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate(),
    );

    return Math.floor((utc2 - utc1) / _MS_PER_DAY) + 1;
  }

  static getDateWithoutMS(date: Date = new Date()) {
    date.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), 0);

    return date;
  }
}
