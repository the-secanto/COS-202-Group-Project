export type BlogArticle = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
};

export const categories = [
  'All Posts',
  'Technology',
  'Startup',
  'Lifestyle',
  'Finance',
];

export const articles: BlogArticle[] = [
  {
    id: 1,
    category: 'Technology',
    title: 'The Future of Decentralized Computing',
    excerpt: 'Exploring edge computing and blockchain as the next wave of scalable web apps.',
    author: 'Alex Rivera',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    category: 'Startup',
    title: 'Scaling Beyond the Seed Round',
    excerpt: 'Practical advice for founders on team structure and sustainable growth.',
    author: 'Clara Diaz',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    category: 'Lifestyle',
    title: 'The Art of Slow Living in 2026',
    excerpt: 'Why disconnecting from constant updates can improve your creativity and focus.',
    author: 'Jordan Stone',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    category: 'Finance',
    title: 'Navigating Volatility in Fintech',
    excerpt: 'How current economic changes are reshaping digital payments and lending.',
    author: 'Mikala Thomas',
    readTime: '10 min read',
    image:
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    category: 'Technology',
    title: 'Designing AI for New Creative Workflows',
    excerpt: 'A look at how artists and designers are collaborating with modern AI tools.',
    author: 'Sarah Owens',
    readTime: '9 min read',
    image:
      'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    category: 'Startup',
    title: 'Finding Product Market Fit Early',
    excerpt: 'Key metrics and feedback loops every early stage startup should prioritize.',
    author: 'Dani Nguyen',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 7,
    category: 'Lifestyle',
    title: 'Building Better Daily Reading Habits',
    excerpt: 'Simple methods to read more consistently and retain what you learn.',
    author: 'Nina Patel',
    readTime: '3 min read',
    image:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 8,
    category: 'Finance',
    title: 'Budgeting for Freelancers and Creators',
    excerpt: 'A realistic budgeting plan for variable income and long-term stability.',
    author: 'Liam Scott',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  },
];
