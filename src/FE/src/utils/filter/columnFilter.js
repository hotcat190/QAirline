export const columnFilter = (item, filters) => {   
    return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const itemValue = item[key]?.toString().toLowerCase();
        if (Array.isArray(value)) {
            return value.some((valueItem) => {
                return itemValue?.includes(valueItem.toLowerCase());
            });
        }
        return itemValue?.includes(value.toLowerCase());
    });
}