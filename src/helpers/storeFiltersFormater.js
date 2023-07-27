export default function formatFilters(filtersObj) {
    let localFiltersObj = {}
    for(let key in filtersObj) {
        if(filtersObj[key] === '') localFiltersObj[key] = 'null'
        else localFiltersObj[key] = filtersObj[key]
    }
    return localFiltersObj
}