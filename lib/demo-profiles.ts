export type DirectoryProfile = {
  slug: string
  name: string
  category: string
  location: string
  description: string
  image: string
  specialty: string
  featured?: boolean
  // New fields for enhanced profiles
  galleryImages?: string[]
  interests?: string[]
  personality?: string
  languages?: string[]
  availability?: string
  age?: number
  height?: string
  education?: string
  profession?: string
  email?: string
  phone?: string
  whatsapp?: string
}

// Real authentic photography of women present on the web
const availablePortraits = [
  '/portraits/priya.jpg',
  '/portraits/ananya.jpg',
  '/portraits/meera.jpg',
  '/portraits/aisha.jpg',
  '/portraits/neha.jpg',
  '/portraits/zoya.jpg',
  '/portraits/divya.jpg',
  '/portraits/radhika.jpg',
  '/portraits/gallery-1.jpg',
  '/portraits/gallery-2.jpg',
  '/portraits/gallery-3.jpg',
  '/portraits/gallery-4.jpg',
]

// Create gallery images by reusing real woman photography
function createGalleryImages(mainImage: string, count: number): string[] {
  const otherImages = availablePortraits.filter(img => img !== mainImage)
  const gallery = [mainImage]
  for (let i = 1; i < count && i - 1 < otherImages.length; i++) {
    gallery.push(otherImages[i - 1])
  }
  return gallery
}

export const demoProfiles: DirectoryProfile[] = [
  {
    slug: 'priya-sharma',
    name: 'Priya Sharma',
    category: 'Social Companions',
    location: 'Gomti Nagar',
    description: 'An elegant companion with a passion for fine dining, art galleries, and meaningful conversations. Perfect for cultural events and sophisticated evenings.',
    image: '/portraits/priya-1.jpg',
    specialty: 'Cultural Events & Fine Dining',
    featured: true,
    galleryImages: ['/portraits/priya-1.jpg', '/portraits/priya-2.jpg', '/portraits/priya-3.jpg'],
    interests: ['Classical Music', 'Art History', 'Wine Tasting', 'Literature', 'Travel'],
    personality: 'Warm, intellectually curious, and effortlessly charming. Priya brings grace and depth to every engagement.',
    languages: ['English', 'Hindi', 'Urdu'],
    availability: 'Evenings and weekends by appointment',
    age: 28,
    height: '5\'6"',
    education: 'Master\'s in Literature, Lucknow University',
    profession: 'Cultural Consultant',
    email: 'priya.sharma@avaani.in',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
  },
  {
    slug: 'ananya-singh',
    name: 'Ananya Singh',
    category: 'Event Partners',
    location: 'Hazratganj',
    description: 'Sophisticated event partner specializing in corporate galas, charity fundraisers, and high-profile social gatherings. Impeccable etiquette and presence.',
    image: '/portraits/ananya-1.jpg',
    specialty: 'Corporate Events & Galas',
    featured: true,
    galleryImages: ['/portraits/ananya-1.jpg', '/portraits/ananya-2.jpg', '/portraits/ananya-3.jpg'],
    interests: ['Business Networking', 'Philanthropy', 'Fashion', 'Golf', 'Photography'],
    personality: 'Poised, articulate, and socially adept. Ananya navigates any room with confidence and warmth.',
    languages: ['English', 'Hindi', 'French'],
    availability: 'Flexible scheduling for events',
    age: 30,
    height: '5\'7"',
    education: 'MBA, IIM Lucknow',
    profession: 'Corporate Relations Manager',
    email: 'ananya.singh@avaani.in',
    phone: '+91 98765 43211',
    whatsapp: '+91 98765 43211',
  },
  {
    slug: 'meera-gupta',
    name: 'Meera Gupta',
    category: 'Travel Companions',
    location: 'Indira Nagar',
    description: 'Well-travelled companion for weekend getaways, destination events, and cultural tours. Knowledgeable about Indian heritage sites and luxury travel.',
    image: '/portraits/meera-1.jpg',
    specialty: 'Weekend Getaways & Heritage Tours',
    featured: false,
    galleryImages: ['/portraits/meera-1.jpg', '/portraits/meera-2.jpg', '/portraits/meera-3.jpg'],
    interests: ['Heritage Architecture', 'Photography', 'Cuisine Exploration', 'Yoga', 'Reading'],
    personality: 'Adventurous spirit with refined tastes. Meera makes every journey memorable.',
    languages: ['English', 'Hindi', 'Bengali'],
    availability: 'Weekends and holidays',
    age: 27,
    height: '5\'5"',
    education: 'Bachelor\'s in History, Delhi University',
    profession: 'Travel Writer',
    email: 'meera.gupta@avaani.in',
    phone: '+91 98765 43212',
    whatsapp: '+91 98765 43212',
  },
  {
    slug: 'aisha-khan',
    name: 'Aisha Khan',
    category: 'Social Companions',
    location: 'Aliganj',
    description: 'Graceful companion for intimate dinners, theatre evenings, and private gatherings. A lover of poetry, music, and the finer things in life.',
    image: '/portraits/aisha-1.jpg',
    specialty: 'Intimate Gatherings & Arts',
    featured: true,
    galleryImages: ['/portraits/aisha-1.jpg', '/portraits/aisha-2.jpg', '/portraits/aisha-3.jpg'],
    interests: ['Poetry', 'Classical Dance', 'Jazz', 'Perfumery', 'Interior Design'],
    personality: 'Thoughtful, artistic, and deeply empathetic. Aisha creates an atmosphere of comfort and elegance.',
    languages: ['English', 'Hindi', 'Urdu', 'Persian'],
    availability: 'Evenings by appointment',
    age: 29,
    height: '5\'4"',
    education: 'Master\'s in Performing Arts, Bhatkhande University',
    profession: 'Classical Dancer',
    email: 'aisha.khan@avaani.in',
    phone: '+91 98765 43213',
    whatsapp: '+91 98765 43213',
  },
  {
    slug: 'neha-agarwal',
    name: 'Neha Agarwal',
    category: 'Event Partners',
    location: 'Mahanagar',
    description: 'Professional event companion for business conferences, product launches, and networking events. Fluent in corporate protocol and social dynamics.',
    image: '/portraits/neha-1.jpg',
    specialty: 'Business Conferences & Networking',
    featured: false,
    galleryImages: ['/portraits/neha-1.jpg', '/portraits/neha-2.jpg', '/portraits/neha-3.jpg'],
    interests: ['Leadership', 'Innovation', 'Wellness', 'Tennis', 'Mentoring'],
    personality: 'Sharp, engaging, and professionally polished. Neha elevates every professional interaction.',
    languages: ['English', 'Hindi', 'Marathi'],
    availability: 'Business hours and evening events',
    age: 31,
    height: '5\'6"',
    education: 'Executive MBA, XLRI',
    profession: 'Business Development Director',
    email: 'neha.agarwal@avaani.in',
    phone: '+91 98765 43214',
    whatsapp: '+91 98765 43214',
  },
  {
    slug: 'zoya-farooqui',
    name: 'Zoya Farooqui',
    category: 'Cultural Companions',
    location: 'Chowk',
    description: 'Cultural enthusiast and companion for heritage walks, museum visits, and traditional music evenings. Deep knowledge of Lucknow\'s cultural legacy.',
    image: '/portraits/zoya-1.jpg',
    specialty: 'Heritage Walks & Cultural Evenings',
    featured: true,
    galleryImages: ['/portraits/zoya-1.jpg', '/portraits/zoya-2.jpg', '/portraits/zoya-3.jpg'],
    interests: ['Urdu Poetry', 'Mughal History', 'Chikankari', 'Awadhi Cuisine', 'Calligraphy'],
    personality: 'Intellectually rich, culturally grounded, and enchantingly expressive. Zoya embodies Lucknow\'s tehzeeb.',
    languages: ['English', 'Hindi', 'Urdu', 'Arabic'],
    availability: 'Weekends and cultural event evenings',
    age: 26,
    height: '5\'5"',
    education: 'Master\'s in Medieval History, Lucknow University',
    profession: 'Cultural Heritage Consultant',
    email: 'zoya.farooqui@avaani.in',
    phone: '+91 98765 43215',
    whatsapp: '+91 98765 43215',
  },
  {
    slug: 'divya-mishra',
    name: 'Divya Mishra',
    category: 'Social Companions',
    location: 'Aminabad',
    description: 'Vibrant companion for social mixers, fashion events, and lifestyle gatherings. Contemporary style with traditional values.',
    image: '/portraits/divya-1.jpg',
    specialty: 'Fashion Events & Lifestyle Gatherings',
    featured: false,
    galleryImages: ['/portraits/divya-1.jpg', '/portraits/divya-2.jpg', '/portraits/divya-3.jpg'],
    interests: ['Fashion Design', 'Social Media', 'Fitness', 'Cooking', 'Entrepreneurship'],
    personality: 'Dynamic, stylish, and authentically warm. Divya brings energy and elegance to every occasion.',
    languages: ['English', 'Hindi', 'Gujarati'],
    availability: 'Evenings and weekends',
    age: 25,
    height: '5\'7"',
    education: 'Bachelor\'s in Fashion Design, NIFT',
    profession: 'Fashion Entrepreneur',
    email: 'divya.mishra@avaani.in',
    phone: '+91 98765 43216',
    whatsapp: '+91 98765 43216',
  },
  {
    slug: 'radhika-verma',
    name: 'Radhika Verma',
    category: 'Travel Companions',
    location: 'Gomti Nagar',
    description: 'Experienced travel companion for domestic and international trips. Organized, adaptable, and excellent company for extended journeys.',
    image: '/portraits/radhika-1.jpg',
    specialty: 'Extended Travel & International Trips',
    featured: false,
    galleryImages: ['/portraits/radhika-1.jpg', '/portraits/radhika-2.jpg', '/portraits/radhika-3.jpg'],
    interests: ['Adventure Travel', 'Wildlife Photography', 'Sustainable Tourism', 'Languages', 'Meditation'],
    personality: 'Calm, resourceful, and globally minded. Radhika turns travel into transformation.',
    languages: ['English', 'Hindi', 'Spanish', 'German'],
    availability: 'By arrangement for trips 3+ days',
    age: 32,
    height: '5\'6"',
    education: 'Master\'s in Tourism Management, Christ University',
    profession: 'Luxury Travel Curator',
    email: 'radhika.verma@avaani.in',
    phone: '+91 98765 43217',
    whatsapp: '+91 98765 43217',
  },
]

export const categories = [
  'All Companions',
  'Social Companions',
  'Event Partners',
  'Travel Companions',
  'Cultural Companions',
]

export const lucknowNeighbourhoods = [
  'Gomti Nagar',
  'Hazratganj',
  'Indira Nagar',
  'Aliganj',
  'Mahanagar',
  'Chowk',
  'Aminabad',
]