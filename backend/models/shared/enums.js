const USER_ROLES = ['buyer', 'seller', 'agent', 'admin'];
const AUTH_PROVIDERS = ['local', 'google', 'facebook'];
const LANGUAGES = ['en', 'hi', 'or'];

const PROPERTY_TYPES = [
  'apartment',
  'villa',
  'plot',
  'commercial',
  'farmhouse',
  'house',
];
const LISTING_TYPES = ['sale', 'rent', 'lease', 'pg'];
const PROPERTY_STATUSES = ['draft', 'active', 'sold', 'rented', 'expired', 'inactive'];
const VERIFICATION_STATUSES = ['pending', 'verified', 'rejected'];

const FURNISHING_TYPES = ['unfurnished', 'semi-furnished', 'fully-furnished'];
const FACING_DIRECTIONS = ['North', 'South', 'East', 'West'];
const POSSESSION_STATUSES = ['ready_to_move', 'under_construction'];
const CONTACT_VISIBILITY = ['public', 'verified_only', 'premium_only'];

const DOCUMENT_TYPES = ['aadhar', 'pan', 'ownership_deed'];
const SUBSCRIPTION_PLANS = ['free', 'basic', 'premium'];
const AGENT_SUBSCRIPTION_TIERS = ['basic', 'pro', 'enterprise'];
const SPECIALIZATIONS = ['residential', 'commercial', 'luxury', 'rental'];
const COMMISSION_TYPES = ['percentage', 'flat'];
const WORKING_DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const INQUIRY_TYPES = ['viewing', 'price_negotiation', 'purchase', 'general'];
const CONTACT_METHODS = ['phone', 'email', 'whatsapp', 'chat'];
const INQUIRY_STATUSES = [
  'pending',
  'contacted',
  'scheduled',
  'completed',
  'cancelled',
  'no_response',
];
const PRIORITIES = ['low', 'medium', 'high', 'urgent'];
const INQUIRY_OUTCOMES = ['interested', 'not_interested', 'converted', 'pending'];
const INQUIRY_SOURCES = ['website', 'mobile_app', 'phone', 'walk_in'];

const REVIEW_TYPES = ['agent', 'property', 'transaction'];
const REVIEWER_ROLES = ['buyer', 'seller'];
const REVIEW_STATUSES = ['pending', 'approved', 'rejected', 'flagged'];

const NOTIFICATION_TYPES = ['inquiry', 'property_update', 'message', 'price_drop', 'review'];
const NOTIFICATION_CATEGORIES = ['transactional', 'promotional', 'alert'];
const NOTIFICATION_CHANNELS = ['push', 'email', 'sms', 'in_app'];
const DELIVERY_STATUSES = ['pending', 'sent', 'delivered', 'failed'];

const ALERT_FREQUENCIES = ['instant', 'daily', 'weekly'];
const PROPERTY_OWNER_ROLES = ['seller', 'agent'];

const LEGACY_PROPERTY_TYPE_MAP = {
  Apartment: 'apartment',
  House: 'house',
  Villa: 'villa',
  Commercial: 'commercial',
};

const LEGACY_LISTING_TYPE_MAP = {
  'For Sale': 'sale',
  'For Rent': 'rent',
};

module.exports = {
  AGENT_SUBSCRIPTION_TIERS,
  ALERT_FREQUENCIES,
  AUTH_PROVIDERS,
  COMMISSION_TYPES,
  CONTACT_METHODS,
  CONTACT_VISIBILITY,
  DELIVERY_STATUSES,
  DOCUMENT_TYPES,
  FACING_DIRECTIONS,
  FURNISHING_TYPES,
  INQUIRY_OUTCOMES,
  INQUIRY_SOURCES,
  INQUIRY_STATUSES,
  INQUIRY_TYPES,
  LANGUAGES,
  LEGACY_LISTING_TYPE_MAP,
  LEGACY_PROPERTY_TYPE_MAP,
  LISTING_TYPES,
  NOTIFICATION_CATEGORIES,
  NOTIFICATION_CHANNELS,
  NOTIFICATION_TYPES,
  POSSESSION_STATUSES,
  PRIORITIES,
  PROPERTY_OWNER_ROLES,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
  REVIEW_STATUSES,
  REVIEW_TYPES,
  REVIEWER_ROLES,
  SPECIALIZATIONS,
  SUBSCRIPTION_PLANS,
  USER_ROLES,
  VERIFICATION_STATUSES,
  WORKING_DAYS,
};
