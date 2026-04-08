const test = require('node:test');
const assert = require('node:assert/strict');
const models = require('../models');

test('all primary models compile successfully', () => {
  assert.ok(models.User);
  assert.ok(models.BuyerProfile);
  assert.ok(models.SellerProfile);
  assert.ok(models.AgentProfile);
  assert.ok(models.Property);
  assert.ok(models.Inquiry);
  assert.ok(models.Review);
  assert.ok(models.Notification);
  assert.ok(models.SavedSearch);
  assert.ok(models.ActivityLog);
  assert.ok(models.Session);
});

test('property model exposes compatibility virtuals for legacy consumers', () => {
  const property = new models.Property({
    title: 'Luxury Villa',
    description: 'Large seafront villa',
    propertyType: 'villa',
    listingType: 'sale',
    location: {
      city: 'Goa',
      locality: 'Dona Paula',
    },
    specifications: {
      bedrooms: 4,
      bathrooms: 3,
      builtUpArea: 2500,
    },
    pricing: {
      amount: 550000,
    },
    media: {
      images: [
        { url: '/uploads/a.jpg' },
        { url: '/uploads/b.jpg' },
      ],
    },
  });

  assert.equal(property.price, 550000);
  assert.equal(property.type, 'villa');
  assert.equal(property.bedrooms, 4);
  assert.equal(property.bathrooms, 3);
  assert.equal(property.area, 2500);
  assert.deepEqual(property.images, ['/uploads/a.jpg', '/uploads/b.jpg']);
  assert.equal(property.locationLabel, 'Dona Paula, Goa');
});
