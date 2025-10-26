export const updateCache = (cache, query, addedItem, key, mergeFn) => {
  cache.updateQuery(query, (data) => {
    if (!data) return data;
    const fieldKey = key || Object.keys(data)[0];

    const merged = mergeFn
      ? mergeFn(data[fieldKey], addedItem)
      : [...data[fieldKey], addedItem];
    return {
      ...data,
      [fieldKey]: merged,
    };
  });
};

export const mergeAuthors = (existingAuthors, newAuthor) => {
  const updated = existingAuthors.map((a) => ({ ...a }));
  const existing = updated.find((a) => a.name === newAuthor.name);

  if (existing) {
    existing.bookCount = (existing.bookCount || 0) + 1;
  } else {
    updated.push({ ...newAuthor, bookCount: 1 });
  }

  return updated;
};
