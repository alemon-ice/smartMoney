const EntrySchema = {
  name: 'entry',
  primaryKey: 'id',
  properties: {
    id: 'string',
    amount: 'double',
    description: 'string?',
    entryAt: 'date',
    latitude: 'float?',
    longitude: 'float?',
    address: 'string?',
    photo: 'string?',
    isInit: 'bool',
    category: 'Category',
  },
};

export default EntrySchema;
