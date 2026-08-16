import { SiteConfig, GearItem } from '../types';

export const siteConfig: SiteConfig = {
  brandName: 'NITHI VISUAL',
  creatorName: 'Nithesh',
  title: 'Visual Director • Filmmaker • Colorist',
  tagline: 'We make visuals people actually feel. Minimal, pastel, expressive films, creative edits & photography.',
  location: 'Erode, India / Available Worldwide',
  timezone: 'GMT+5:30 (IST)',
  status: 'Accepting select client projects',
  email: 'nithivisual@gmail.com',
  phone: '+91 96005 70645',
  instagram: 'https://www.instagram.com/nithi_visual?igsh=aDhobHZmaWlhdGdn',
  whatsapp: 'https://wa.me/919600570645',
  stats: {
    projectsCount: '01',
    happyClients: '02',
    yearsExperience: '03'
  }
};

export const studioGear: GearItem[] = [
  {
    tag: 'THE SHOOT',
    name: 'Video Production',
    detail: 'From planning the shot to capturing the moment, every frame has a purpose.',
    category: 'PRODUCTION'
  },
  {
    tag: 'THE EDIT',
    name: 'Creative Editing',
    detail: 'Turning raw footage into videos with rhythm, story and personality.',
    category: 'POST PRODUCTION'
  },
  {
    tag: 'THE VISUAL',
    name: 'Photography',
    detail: 'Clean, natural visuals for people, products, brands and stories.',
    category: 'PHOTOGRAPHY'
  },
  {
    tag: 'THE COMPLETE CUT',
    name: 'End-to-End Production',
    detail: 'From the first idea to the final delivery, handled with care.',
    category: 'FULL SERVICE'
  }
];

export const faqList = [
  {
    question: 'What do you offer?',
    answer: 'From planning and shooting to editing and final delivery, Nithi Visual handles the complete visual process.'
  },
  {
    question: 'Do you provide on-location shoots?',
    answer: 'Yes. I travel to the required location and handle the shoot based on the project requirements.'
  },
  {
    question: 'Do you shoot and edit the videos yourself?',
    answer: 'Yes. From shooting the footage to editing and delivering the final video, everything is handled by me and my team.'
  },
  {
    question: 'What kind of projects do you work on?',
    answer: 'Brand videos, product shoots, fashion content, events, reels, promotional videos and other creative projects.'
  },
  {
    question: 'How long does a project take?',
    answer: 'The timeline depends on the type and size of the project. The expected delivery timeline will be discussed before starting.'
  }
];
