async function fetchEntriesWithPagination(callback) {
  try {
    const limit = 100;
    let skip = 0;
    const allEntries = [];

    while (true) {
      const response = await callback(skip);

      if (response.items.length === 0) {
        break;
      }

      allEntries.push(...response.items);
      skip += limit; // Increment the skip value by the limit
    }

    return allEntries;
  } catch (error) {
    console.error("Error while fetching entries", error);
    return [];
  }
}
