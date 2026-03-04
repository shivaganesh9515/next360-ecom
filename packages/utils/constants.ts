export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry',
] as const

export const CATEGORIES = [
  { slug: 'vegetables',  name: 'Vegetables',    icon: '🥦' },
  { slug: 'fruits',      name: 'Fruits',         icon: '🍎' },
  { slug: 'dairy-eggs',  name: 'Dairy & Eggs',   icon: '🥛' },
  { slug: 'grains',      name: 'Grains & Pulses',icon: '🌾' },
  { slug: 'herbs-spices',name: 'Herbs & Spices', icon: '🧄' },
  { slug: 'oils-ghee',   name: 'Oils & Ghee',    icon: '🫒' },
] as const

export const HEALTH_GOALS = [
  { id: 'protein',    label: 'High Protein',    emoji: '💪' },
  { id: 'detox',      label: 'Detox',           emoji: '🧘' },
  { id: 'immunity',   label: 'Immunity Boost',  emoji: '🛡️' },
  { id: 'energy',     label: 'More Energy',     emoji: '⚡' },
  { id: 'weightloss', label: 'Weight Loss',     emoji: '🥗' },
  { id: 'digestion',  label: 'Better Digestion',emoji: '🌿' },
  { id: 'sleep',      label: 'Better Sleep',    emoji: '🌙' },
  { id: 'kids',       label: 'Kids Nutrition',  emoji: '👶' },
] as const

export const CERTIFICATIONS = [
  'India Organic',
  'USDA Organic',
  'FSSAI Certified',
  'Non-GMO',
] as const

export const MOOD_OPTIONS = [
  { id: 'clean',   label: 'Eating Clean',     emoji: '🥗', goals: ['weightloss', 'detox'] },
  { id: 'muscle',  label: 'Building Muscle',  emoji: '💪', goals: ['protein', 'energy'] },
  { id: 'detox',   label: 'Detox Week',       emoji: '🧘', goals: ['detox', 'digestion'] },
  { id: 'kids',    label: 'For My Kids',      emoji: '👶', goals: ['kids', 'immunity'] },
  { id: 'sick',    label: 'Feeling Sick',     emoji: '🤒', goals: ['immunity'] },
  { id: 'sleep',   label: 'Better Sleep',     emoji: '🌙', goals: ['sleep'] },
] as const

export const SEEDS_ACTIONS = {
  FIRST_ORDER_OF_DAY:   50,
  NEW_PRODUCT_TRIED:    30,
  REVIEW_WITH_PHOTO:    40,
  REVIEW_WITHOUT_PHOTO: 20,
  GOAL_COMPLETED:       100,
  REFERRAL_SUCCESS:     300,
  STREAK_7_DAY:         200,
  SUBSCRIPTION_CREATED: 75,
} as const

export const SEEDS_LEVELS = [
  { name: '🌱 Seedling',     min: 0,     max: 499   },
  { name: '🪴 Sprout',       min: 500,   max: 1999  },
  { name: '🌿 Plant',        min: 2000,  max: 4999  },
  { name: '🌳 Tree',         min: 5000,  max: 11999 },
  { name: '🌲 Forest Keeper',min: 12000, max: Infinity },
] as const

export const FREE_DELIVERY_THRESHOLD = 49900  // ₹499 in paise
export const DELIVERY_FEE = 4900               // ₹49 in paise
export const COD_FEE = 2500                    // ₹25 in paise
export const COD_MAX_ORDER = 200000            // ₹2000 in paise
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''
