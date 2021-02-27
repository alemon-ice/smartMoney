const CategorySchema = {
  name: 'Category',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    color: 'string',
    entryType: 'string',
    order: { type: 'int', default: 0 },
    entries: 'Entry[]',
  },
};

export default CategorySchema;
