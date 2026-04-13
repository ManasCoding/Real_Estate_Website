const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config();

async function checkData() {
    await mongoose.connect(process.env.MONGO_URI);
    const count = await Property.countDocuments({ featured: true });
    const props = await Property.find({ featured: true });
    console.log(`Featured Count: ${count}`);
    console.log(`Properties:`, JSON.stringify(props, null, 2));
    process.exit(0);
}
checkData();
