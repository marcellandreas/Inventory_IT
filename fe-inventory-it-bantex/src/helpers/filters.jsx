function filterDataBySearch(data, search) {
  return data.filter((item) => {
    const searchableFields = Object.values(item).join(" ").toLowerCase();
    return searchableFields.includes(search.toLowerCase());
  });
}

export { filterDataBySearch };
