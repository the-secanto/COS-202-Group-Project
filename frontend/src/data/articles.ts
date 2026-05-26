export type BlogArticle = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
};

export const categories = [
  'All Posts',
  'Technology',
  'Startup',
  'Lifestyle',
  'Finance',
];

const avatar = (seed: string) =>
  `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=e8ecf1`;

export const articles: BlogArticle[] = [
  {
    id: 1,
    category: 'Technology',
    title: 'The Quiet Revolution of Minimal Computing',
    excerpt:
      'How a generation of writers, designers and engineers are reclaiming focus by stripping their tools back to the essentials.',
    author: 'Marcus Thorne',
    authorAvatar: avatar('Marcus Thorne'),
    date: 'May 18, 2026',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
    featured: true,
  },
  {
    id: 2,
    category: 'Startup',
    title: 'Scaling Beyond the Seed Round',
    excerpt: 'Practical advice for founders on team structure and sustainable growth after the first cheque.',
    author: 'Clara Diaz',
    authorAvatar: avatar('Clara Diaz'),
    date: 'May 12, 2026',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    category: 'Lifestyle',
    title: 'The Art of Slow Living in 2026',
    excerpt: 'Why disconnecting from constant updates can improve your creativity and your focus.',
    author: 'Jordan Stone',
    authorAvatar: avatar('Jordan Stone'),
    date: 'May 9, 2026',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    category: 'Finance',
    title: 'Navigating Volatility in Fintech',
    excerpt: 'How current economic shifts are reshaping digital payments, lending and the products we use daily.',
    author: 'Mikala Thomas',
    authorAvatar: avatar('Mikala Thomas'),
    date: 'May 4, 2026',
    readTime: '10 min read',
    image:
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    category: 'Technology',
    title: 'Designing AI for Creative Workflows',
    excerpt: 'A look at how artists and designers are collaborating with modern AI tools without losing their voice.',
    author: 'Sarah Owens',
    authorAvatar: avatar('Sarah Owens'),
    date: 'Apr 28, 2026',
    readTime: '9 min read',
    image:
      'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    category: 'Startup',
    title: 'Finding Product Market Fit Early',
    excerpt: 'Key metrics and feedback loops every early stage startup should prioritise from day one.',
    author: 'Dani Nguyen',
    authorAvatar: avatar('Dani Nguyen'),
    date: 'Apr 22, 2026',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 7,
    category: 'Lifestyle',
    title: 'Building Better Daily Reading Habits',
    excerpt: 'Simple methods to read more consistently and actually retain what you learn.',
    author: 'Nina Patel',
    authorAvatar: avatar('Nina Patel'),
    date: 'Apr 14, 2026',
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
    authorAvatar: avatar('Liam Scott'),
    date: 'Apr 6, 2026',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  },
];
