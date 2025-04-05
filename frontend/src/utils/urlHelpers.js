export function buildPaginatedUrl(endpoint, page, itemsPerPage, search = "") {
    const cleanedSearch = typeof search === "string" ? search.trim() : "";
    const base = `${endpoint}?page=${page}&items_per_page=${itemsPerPage}`;
    return cleanedSearch
        ? `${base}&search=${encodeURIComponent(cleanedSearch)}`
        : base;
}
