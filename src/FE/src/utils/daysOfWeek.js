export const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function daysOfWeek(config) {
    var cfg = config || {};
    var count = cfg.count || 7;
    var start = cfg.start || 0;
    var values = [];
    var i, value;

    for (i = 0; i < count; ++i) {
        value = DAYS_OF_WEEK[Math.ceil(i + start) % 7];
        values.push(value);
    }

    return values;
}
