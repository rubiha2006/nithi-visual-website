import { Service, ProcessStep } from '../types';

export const servicesData: Service[] = [
  {
    id: 's1',
    number: '01',
    title: 'VIDEO PRODUCTION',
    tagline: 'From planning to shooting, I create visuals built around your idea.',
    description: 'From planning to shooting, I create visuals built around your idea.',
    iconName: 'Video',
    pastelColor: '#FDE2E4', // Soft Rose Pink
    pastelBgClass: 'bg-[#FDE2E4]/40 hover:bg-[#FDE2E4]/80 border-[#FDE2E4]',
    badgeBorderClass: 'border-[#F8B4B8] text-[#8C2D35]',
    deliverables: [
      'Concept & Shot Planning',
      'On-Location Shooting',
      'Final Video Delivery'
    ],
    timeline: '1 - 3 Weeks',
    recommendedFor: 'Brands, artists, and creators needing intentional video storytelling.',
    sampleWorkSlug: 'solaris-summer-editorial',
    previewImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's2',
    number: '02',
    title: 'VIDEO EDITING',
    tagline: 'Clean, engaging edits with the right pace, sound and visual flow.',
    description: 'Clean, engaging edits with the right pace, sound and visual flow.',
    iconName: 'Film',
    pastelColor: '#E8E8FD', // Soft Lavender
    pastelBgClass: 'bg-[#E8E8FD]/50 hover:bg-[#E8E8FD]/90 border-[#E8E8FD]',
    badgeBorderClass: 'border-[#B8B8F8] text-[#3D3B8E]',
    deliverables: [
      'Reels & Short-Form',
      'Brand & Event Videos',
      'Social Media Content'
    ],
    timeline: '3 - 7 Days',
    recommendedFor: 'Creators, agencies, and brands with raw footage ready to be shaped.',
    sampleWorkSlug: 'chroma-sound-tokyo',
    previewImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's3',
    number: '03',
    title: 'PHOTOGRAPHY',
    tagline: 'Natural, detailed photography for people, products and brands.',
    description: 'Natural, detailed photography for people, products and brands.',
    iconName: 'Camera',
    pastelColor: '#FFE5D9', // Soft Peach
    pastelBgClass: 'bg-[#FFE5D9]/50 hover:bg-[#FFE5D9]/90 border-[#FFE5D9]',
    badgeBorderClass: 'border-[#F8C4B4] text-[#8C3A2D]',
    deliverables: [
      'Product Photography',
      'Fashion & Portraits',
      'Event Photography'
    ],
    timeline: '1 - 2 Weeks',
    recommendedFor: 'E-commerce, apparel, lifestyle brands and personal portraits.',
    sampleWorkSlug: 'lumina-minimal-ceramics',
    previewImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's4',
    number: '04',
    title: 'REELS & SOCIAL CONTENT',
    tagline: 'Short-form content made to look good and keep people watching.',
    description: 'Short-form content made to look good and keep people watching.',
    iconName: 'Sparkles',
    pastelColor: '#FFF1C5', // Soft Warm Yellow
    pastelBgClass: 'bg-[#FFF1C5]/50 hover:bg-[#FFF1C5]/90 border-[#FFF1C5]',
    badgeBorderClass: 'border-[#EAD170] text-[#7A610A]',
    deliverables: [
      'Instagram Reels',
      'Promotional Content',
      'Creator Content'
    ],
    timeline: '3 - 5 Days',
    recommendedFor: 'Lifestyle brands, cafes, personal brands and social campaigns.',
    sampleWorkSlug: 'flora-skin-rituals',
    previewImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's5',
    number: '05',
    title: 'CREATIVE DIRECTION',
    tagline: 'Helping shape the visual from the first idea to the final frame.',
    description: 'Helping shape the visual from the first idea to the final frame.',
    iconName: 'Compass',
    pastelColor: '#D8E2DC', // Soft Sage
    pastelBgClass: 'bg-[#D8E2DC]/50 hover:bg-[#D8E2DC]/90 border-[#D8E2DC]',
    badgeBorderClass: 'border-[#B4C6BA] text-[#2A4E36]',
    deliverables: [
      'Visual Concept',
      'Moodboards & References',
      'Shoot Direction'
    ],
    timeline: '1 - 2 Weeks',
    recommendedFor: 'Visual rebrands, seasonal campaigns and new launches.',
    sampleWorkSlug: 'neo-space-brand-identity',
    previewImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's6',
    number: '06',
    title: 'COMPLETE VISUALS',
    tagline: 'One creative process, from the first conversation to the final delivery.',
    description: 'One creative process, from the first conversation to the final delivery.',
    iconName: 'Sparkles',
    pastelColor: '#ECE4DB', // Warm Sand / Soft Linen
    pastelBgClass: 'bg-[#ECE4DB]/50 hover:bg-[#ECE4DB]/90 border-[#ECE4DB]',
    badgeBorderClass: 'border-[#D9CFBF] text-[#4A4337]',
    deliverables: [
      'Shoot',
      'Edit',
      'Final Delivery'
    ],
    timeline: '2 - 3 Weeks',
    recommendedFor: 'Clients wanting an effortless, all-in-one visual partnership.',
    sampleWorkSlug: 'solaris-summer-editorial',
    previewImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
  }
];

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'DISCOVER & MOODBOARD',
    tagline: 'Unpacking the vision, defining the vibe, building the visual universe.',
    description: 'We start with an open conversation. We talk about the mood, the emotions, the references, and the audience. We curate an interactive visual board with color palettes, lens textures, and lighting ideas.',
    keyDeliverables: ['Creative Brief Alignment', 'Curated Moodboard Deck', 'Shotlist & Timeline'],
    duration: '2 - 4 Days',
    colorClass: 'bg-[#FDE2E4]'
  },
  {
    step: '02',
    title: 'PLAN & PRODUCE',
    tagline: 'Organizing logistics, talent, lighting, locations, and shooting days.',
    description: 'Every detail is dialed in beforehand so shooting days feel effortless, inspiring, and fun. We bring premium cinema gear, professional lighting, and a relaxed, creative on-set atmosphere.',
    keyDeliverables: ['Call Sheets & Equipment Prep', 'On-Set Direction & Capture', 'Live Video Feed for Clients'],
    duration: '1 - 3 Days',
    colorClass: 'bg-[#FFE5D9]'
  },
  {
    step: '03',
    title: 'CRAFT & EDIT',
    tagline: 'Sculpting the story, finding the rhythm, matching music and sound.',
    description: 'Where the magic comes alive. We sift through takes to find the gold, build the narrative spine, time cuts to music transients, and design rich foley and atmospheric audio layers.',
    keyDeliverables: ['Rough Cut Review (v1)', 'Sound FX & Music Layering', 'Kinetic Graphic Treatments'],
    duration: '3 - 6 Days',
    colorClass: 'bg-[#E8E8FD]'
  },
  {
    step: '04',
    title: 'COLOR GRADE & REFINE',
    tagline: 'Signature pastel palettes, skin tone finesse, and polishing every frame.',
    description: 'In our DaVinci Resolve color suite, we sculpt the delicate pastel tones, soft highlights, and Kodak-inspired grain that gives NITHI VISUAL work its signature tactile, dreamy quality.',
    keyDeliverables: ['Color Graded Pass', 'Client Feedback Revisions (2 Rounds)', 'Audio Mastering'],
    duration: '2 - 3 Days',
    colorClass: 'bg-[#FFF1C5]'
  },
  {
    step: '05',
    title: 'DELIVER & CELEBRATE',
    tagline: 'Pristine 4K masters, social cutdowns, LUT packs, and post-launch support.',
    description: 'We export full resolution masters in all required aspect ratios (16:9, 9:16, 1:1, 4:5), high-res stills, and organized asset vaults ready for instant global publishing.',
    keyDeliverables: ['Master 4K ProRes Exports', 'Web-Optimized Social Files', 'Cloud Archive Access'],
    duration: '1 Day',
    colorClass: 'bg-[#D8E2DC]'
  }
];
