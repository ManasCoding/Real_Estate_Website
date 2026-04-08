const test = require('node:test');
const assert = require('node:assert/strict');
const { buildPropertyQuery, normalizePropertyPayload } = require('../utils/propertyUtils');

test('normalizePropertyPayload trims and coerces create payload fields', () => {
  const { data, errors } = normalizePropertyPayload(
    {
      title: '  Modern Villa  ',
      description: '  Ocean-facing home  ',
      price: '550000',
      location: '  Goa  ',
      type: 'Villa',
      status: 'For Sale',
      bedrooms: '4',
      bathrooms: '3',
      area: '2500',
      existingImages: '["/uploads/hero.jpg"]',
    },
    'create'
  );

  assert.deepEqual(errors, {});
  assert.equal(data.title, 'Modern Villa');
  assert.equal(data.description, 'Ocean-facing home');
  assert.equal(data.location.city, 'Goa');
  assert.equal(data.pricing.amount, 550000);
  assert.equal(data.propertyType, 'villa');
  assert.equal(data.listingType, 'sale');
  assert.equal(data.specifications.bedrooms, 4);
  assert.equal(data.specifications.bathrooms, 3);
  assert.equal(data.specifications.builtUpArea, 2500);
  assert.deepEqual(data.existingImages, ['/uploads/hero.jpg']);
});

test('normalizePropertyPayload reports invalid update fields', () => {
  const { data, errors } = normalizePropertyPayload(
    {
      price: '-100',
      bedrooms: '2.5',
      status: 'Leased',
      existingImages: '{bad json}',
    },
    'update'
  );

  assert.deepEqual(data, {});
  assert.equal(errors.price, 'price must be at least 0.');
  assert.equal(errors.bedrooms, 'bedrooms must be a whole number.');
  assert.match(errors.status, /status must be one of/);
  assert.equal(
    errors.existingImages,
    'existingImages must be valid JSON when sent as a string.'
  );
});

test('buildPropertyQuery creates filters, paging, and sort metadata', () => {
  const result = buildPropertyQuery({
    search: 'beach',
    location: 'Goa',
    type: 'Villa',
    status: 'For Sale',
    minPrice: '1000',
    maxPrice: '5000',
    minBedrooms: '3',
    minBathrooms: '2',
    minArea: '1200',
    page: '2',
    limit: '5',
    sort: 'price_desc',
  });

  assert.equal(result.page, 2);
  assert.equal(result.limit, 5);
  assert.equal(result.skip, 5);
  assert.deepEqual(result.sort, { 'pricing.amount': -1, createdAt: -1 });
  assert.equal(result.sortBy, 'price_desc');
  assert.equal(result.filter.propertyType, 'villa');
  assert.equal(result.filter.listingType, 'sale');
  assert.equal(result.filter['pricing.amount'].$gte, 1000);
  assert.equal(result.filter['pricing.amount'].$lte, 5000);
  assert.equal(result.filter['specifications.bedrooms'].$gte, 3);
  assert.equal(result.filter['specifications.bathrooms'].$gte, 2);
  assert.equal(result.filter['specifications.builtUpArea'].$gte, 1200);
  assert.equal(result.filter.$and[1].$or[0]['location.city'].source, 'Goa');
  assert.equal(result.filter.$and[0].$or[0].title.flags, 'i');
});
