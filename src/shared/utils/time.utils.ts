import { DateTime } from 'luxon';

export class TimeUtils {
  static formatDateTime = (dateTime?: Date): string => {
    return dateTime ? DateTime.fromJSDate(dateTime).toFormat('dd.MM.yyyy HH:mm:ss') : '';
  };
}
