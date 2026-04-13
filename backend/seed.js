const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('./models/Property');
const User = require('./models/User');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function seedData() {
    try {
        await mongoose.connect(MONGO_URI);
        await Property.deleteMany({});
        await User.deleteMany({});

        // Create Admin
        await User.create({
            name: 'Manas Kumar Gumansingh',
            email: 'admin@adityaraj.com',
            password: 'password123',
            userRole: ['admin'],
            isActive: true,
            isVerified: true
        });

        const properties = [
            {
                title: 'Prachi Enclave Mansion',
                description: 'Elite residence in Bhubaneswar.',
                propertyType: 'house',
                listingType: 'sale',
                location: { address: 'Prachi Enclave', city: 'Bhubaneswar', state: 'Odisha', country: 'India' },
                specifications: { bedrooms: 5, bathrooms: 5, builtUpArea: 4500 },
                pricing: { amount: 45000000, currency: 'INR' },
                media: { images: [{ url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1200' }] },
                status: 'active',
                featured: true
            },
            {
                title: 'Kathajodi River View',
                description: 'Peaceful riverfront living in Cuttack.',
                propertyType: 'house',
                listingType: 'rent',
                location: { address: 'Link Road', city: 'Cuttack', state: 'Odisha', country: 'India' },
                specifications: { bedrooms: 3, bathrooms: 2, builtUpArea: 1800 },
                pricing: { amount: 25000, currency: 'INR' },
                media: { images: [{ url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200' }] },
                status: 'active',
                featured: true
            },
            {
                title: 'Sahid Nagar Family Flat',
                description: 'Premium modern family flat in the heart of the city.',
                propertyType: 'apartment',
                listingType: 'sale',
                location: { address: 'Sahid Nagar', city: 'Bhubaneswar', state: 'Odisha', country: 'India' },
                specifications: { bedrooms: 3, bathrooms: 2, builtUpArea: 1600 },
                pricing: { amount: 12000000, currency: 'INR' },
                media: { images: [{ url: 'http://localhost:5000/uploads/sahid_nagar_flat.png' }] }, // FIXED IMAGE
                status: 'active',
                featured: true
            }
        ];

        await Property.insertMany(properties);
        console.log(`Successfully seeded ${properties.length} properties.`);
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seedData();
