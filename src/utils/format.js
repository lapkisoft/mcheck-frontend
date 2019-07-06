import {DateTime} from 'luxon';

export function formatDate(value) {
    return DateTime.fromJSDate(new Date(value)).toLocaleString(DateTime.DATE_SHORT);
}

export function formatTime(value) {
    return DateTime.fromJSDate(new Date(value)).toLocaleString(DateTime.TIME_24_SIMPLE).padStart(5, '0');
}
