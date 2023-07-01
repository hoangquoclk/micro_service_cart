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

  static isExpired(date: Date, date2 = new Date()): boolean {
    return date < date2;
  }
}
