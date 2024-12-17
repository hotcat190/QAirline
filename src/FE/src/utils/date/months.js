const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
  
export function months(config) {
    var cfg = config || {};
    var count = cfg.count || 12;
    var section = cfg.section;
    var start = cfg.start || 0;
    var values = [];
    var i, value;

    for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i + start) % 12];
    values.push(value.substring(0, section));
    }

    return values;
}