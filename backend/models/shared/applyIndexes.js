function applyIndexes(schema, indexes) {
  indexes.forEach(([fields, options]) => {
    schema.index(fields, options);
  });

  return schema;
}

module.exports = applyIndexes;
