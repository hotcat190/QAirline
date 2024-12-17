export const searchFilter = (item, searchQuery) => {
    return Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())   
}