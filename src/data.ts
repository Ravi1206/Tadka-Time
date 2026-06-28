import { Article, Quiz, EbookProduct, LeaderboardEntry, AdSetting, Comment } from './types';

export const INITIAL_ARTICLES: Article[] = [
  // FOOD CATEGORY
  {
    id: 'food-1',
    title: 'The Ultimate Creamy Butter Chicken Recipe: A Step-by-Step Guide',
    slug: 'ultimate-creamy-butter-chicken-recipe',
    excerpt: 'Unlock the secret to achieving restaurant-style, rich, and velvety smooth Murgh Makhani at home with our time-tested recipe.',
    content: [
      'Butter Chicken (Murgh Makhani) is perhaps one of the most loved Indian dishes worldwide. It features tender, tandoori-grilled chicken pieces simmered in an ultra-luxurious, creamy, and mildly sweet tomato sauce.',
      'The secret to a perfect Butter Chicken lies in two steps: a robust overnight yogurt marinade with warm spices, and a smooth-strained sauce enriched with cold butter and heavy cream.',
      'For the marinade: Combine boneless chicken thighs with Greek yogurt, ginger-garlic paste, kashmiri chili powder, garam masala, lemon juice, and mustard oil. Let it rest for at least 4 hours (ideally overnight) before grilling or pan-searing until beautifully charred.',
      'For the Makhani gravy: Sauté ripe tomatoes, onions, garlic, and cashews in butter. Blend this mixture into a smooth puree and pass it through a fine-mesh sieve. Cook the pureed sauce with freshly roasted Kasuri Methi (dried fenugreek leaves), a pinch of sugar, and then slowly whisk in cold butter and heavy cream.',
      'Serve this steaming hot alongside butter-brushed garlic naan or fragrant basmati rice for the ultimate comfort meal.'
    ],
    category: 'food',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop',
    readTime: '6 min read',
    date: 'June 24, 2026',
    author: {
      name: 'Chef Ranveer Roy',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=150&auto=format&fit=crop',
      role: 'Executive Chef & Food Writer',
      bio: 'Chef Ranveer has over 15 years of culinary experience across top luxury hotels and is passionate about simplifying Indian cooking.'
    },
    isPremium: false,
    likes: 342,
    views: 1820,
    commentsCount: 14,
    tags: ['North Indian', 'Chicken Recipes', 'Main Course', 'Comfort Food']
  },
  {
    id: 'food-2',
    title: 'Bengaluru Street Food Secrets: What Makes the Iconic VV Puram Dosa So Crispy?',
    slug: 'bengaluru-street-food-secrets-vv-puram-dosa',
    excerpt: 'We spoke to local cart vendors at VV Puram Food Street to discover the exact batter ratio and grilling hacks for the perfect Bengaluru Ghee Roast.',
    content: [
      'If you have walked through the bustling VV Puram Food Street in Bengaluru on a weekend, your senses have likely been captured by the enticing aroma of boiling ghee and roasting black gram batter.',
      'The iconic Bengaluru Ghee Roast Dosa is distinct: thick yet incredibly crisp on the outside, fluffy on the inside, and slathered with a fragrant spicy garlic chutney (Erra Karam) and packed with potato masala.',
      'So, what is the secret? Vendors tell us it is all about the rice-to-lentil ratio. While traditional home batter uses a 3:1 ratio of raw rice to urad dal, the food street legends use a mix of raw rice, parboiled rice (Idli rice), urad dal, a handful of chana dal (for color and crispiness), and a tablespoon of fenugreek (methi) seeds.',
      'The second secret is the iron tawa. Heavy, seasoned cast-iron griddles maintain highly stable temperatures, allowing the butter or ghee to crisp the batter uniformly without burning the core.',
      'Top it off with a spoonful of cold coconut chutney and potato mash (saagu) to experience pure, unadulterated Bengaluru culinary heaven.'
    ],
    category: 'food',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800&auto=format&fit=crop',
    readTime: '5 min read',
    date: 'June 22, 2026',
    author: {
      name: 'Anjali Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      role: 'Local Food Critic & Blogger',
      bio: 'Anjali is a self-proclaimed street food enthusiast who loves mapping the historical eateries of South India.'
    },
    isPremium: false,
    likes: 412,
    views: 2450,
    commentsCount: 8,
    tags: ['Street Food', 'South Indian', 'Bengaluru Food', 'Vegetarian']
  },
  {
    id: 'food-3',
    title: '10 High-Protein Indian Meal Plans for Busy IT Professionals',
    slug: 'high-protein-indian-meal-plans-busy-professionals',
    excerpt: 'Struggling to hit your daily protein intake amidst back-to-back scrum calls? Here is a practical meal prep guide designed for active urban workers.',
    content: [
      'Maintaining a nutritious, high-protein diet in India can sometimes feel challenging, especially when your 9-to-5 is packed with coding sprints, client presentations, and lengthy commutes.',
      'But healthy eating doesn\'t mean eating boiled chicken and steamed broccoli. Rich, diverse Indian ingredients like paneer, tofu, lentils, chickpeas, and eggs can be prepped in less than 30 minutes for the entire week.',
      'We\'ve curated a meal plan that provides 80g+ protein daily. It features quick recipes like Sprouted Moong Salad, Soya Chunks Bhurji, Paneer Tikka Skewers, and egg-white omelets packed with spinach.',
      'Meal prepping on Sunday is the single most effective hack. Cook a big batch of low-fat dals and marinate paneer or chicken ahead of time, storing them in airtight glass containers to lock in freshness.',
      'By following our balanced meal grid, you can avoid lazy high-calorie food ordering apps and save thousands while feeling significantly more energetic.'
    ],
    category: 'food',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
    readTime: '8 min read',
    date: 'June 20, 2026',
    author: {
      name: 'Anjali Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      role: 'Nutritionist & Lifestyle Writer',
      bio: 'Anjali holds a degree in Clinical Nutrition and guides corporate employees in managing diet and fitness.'
    },
    isPremium: true, // PREMIUM EXCLUSIVE ARTICLE
    likes: 219,
    views: 1200,
    commentsCount: 19,
    tags: ['Healthy Eating', 'Diet Plan', 'High Protein', 'Meal Prep']
  },

  // RESTAURANT BUSINESS TIPS
  {
    id: 'biz-1',
    title: 'The Real Economics of Starting a Cloud Kitchen in India (2026 Edition)',
    slug: 'economics-starting-cloud-kitchen-india',
    excerpt: 'Is the delivery-only restaurant model still profitable? A deep-dive into rent, aggregator commissions, and customer acquisition costs.',
    content: [
      'Cloud kitchens—also known as ghost kitchens or dark kitchens—were hailed as the ultimate low-cost, high-margin entry point into the food and beverage industry.',
      'By eliminating expensive prime real estate rentals, front-of-house staff, and lavish interior designs, cloud kitchens promised massive operational savings. However, the realities of 2026 paint a more nuanced picture.',
      'Let\'s break down the actual unit economics. Food aggregators (like Swiggy and Zomato) charge commissions ranging from 20% to 28% on every order. In addition, you must invest heavily in platform performance marketing to stand out from the thousands of options.',
      'This means Customer Acquisition Cost (CAC) has become the new "high-street rent." If you aren\'t careful, marketing spend and commissions can quickly eat up to 45% of your total revenue.',
      'To build a highly profitable cloud kitchen, you must prioritize hyper-focused micro-menus, optimize raw ingredient usage to minimize wastage below 3%, and aggressively drive direct ordering through Whatsapp or custom apps.'
    ],
    category: 'business',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop',
    readTime: '10 min read',
    date: 'June 25, 2026',
    author: {
      name: 'Rohan Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      role: 'Restaurant Consultant',
      bio: 'Rohan has helped launch over 50 successful food brands across tier-1 cities in India and specializes in financial modeling.'
    },
    isPremium: false,
    likes: 520,
    views: 3100,
    commentsCount: 22,
    tags: ['Cloud Kitchen', 'Business Strategy', 'Unit Economics', 'Startup Guide'],
    affiliateProducts: [
      {
        id: 'aff-1',
        name: 'The Ultimate Cloud Kitchen Financial Model & Excel Template',
        description: 'Plan your revenue, calculate commissions, and track margins accurately before launching your kitchen.',
        price: '₹1,499',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=300&auto=format&fit=crop',
        affiliateUrl: '#buy-template'
      }
    ]
  },
  {
    id: 'biz-2',
    title: 'Food Cost Formula: How to Price Your Menu for a 70% Gross Margin',
    slug: 'food-cost-formula-pricing-menu-margins',
    excerpt: 'Step-by-step instructions on calculating plate costs, accounting for hidden spillage, and implementing psychology-backed menu pricing.',
    content: [
      'The number one reason restaurants go bankrupt within their first year is poor menu pricing. Many owners simply look at what their neighbors are charging and copy them, without understanding their own ingredient costs.',
      'To build a sustainable business, you should aim for an overall Food Cost Percentage of 25% to 30%, giving you a robust 70% to 75% Gross Margin to cover rent, utilities, labor, and profit.',
      'The Plate Costing Formula is simple: Total Cost of Raw Ingredients / (1 - Target Food Cost %). For example, if the raw ingredients for a plate of Paneer Butter Masala cost you ₹60, and your target food cost is 30%, the menu price should be ₹60 / 0.3 = ₹200.',
      'However, you must account for "hidden costs"—such as oil, spices, garnish, storage spillage, and complimentary mouth-fresheners. Chefs refer to this as the "K-factor," which usually adds 5% to 8% to raw ingredient calculations.',
      'In this article, we provide a free downloadable menu pricing spreadsheet to help you automate this process across your entire menu catalog.'
    ],
    category: 'business',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
    readTime: '7 min read',
    date: 'June 18, 2026',
    author: {
      name: 'Rohan Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      role: 'Restaurant Consultant',
      bio: 'Rohan has helped launch over 50 successful food brands across tier-1 cities in India and specializes in financial modeling.'
    },
    isPremium: true,
    likes: 189,
    views: 950,
    commentsCount: 5,
    tags: ['Restaurant Management', 'Finance', 'Menu Pricing', 'Operations']
  },

  // BENGALURU LOCAL NEWS
  {
    id: 'blr-1',
    title: 'Bengaluru Food Festival 2026: Dates, Ticket Bookings, and Must-Visit Stalls',
    slug: 'bengaluru-food-festival-2026-guide',
    excerpt: 'The biggest culinary celebration in South India is returning to Palace Grounds this July. Here is your definitive guide to securing passes and avoiding traffic.',
    content: [
      'Get ready, Bengaluru foodies! The iconic Palace Grounds is all set to host the Bengaluru Food Festival 2026, starting from July 10th to July 12th.',
      'This year\'s festival is scaling up significantly, bringing over 150 food stalls representing home chefs, legendary street carts, experimental fusion diners, and high-end artisanal bakeries.',
      'Highlights include a live cooking theatre by India\'s top celebrity chefs, dedicated dessert alleys featuring bean-to-bar local chocolates, and a special section showcasing forgotten regional recipes of Karnataka.',
      'Tickets are priced at ₹199 for general admission, and ₹499 for VIP fast-track access. Organizers have partnered with Namma Metro to provide direct shuttle buses from Cubbon Park and Vidhana Soudha stations to minimize congestion.',
      'Pro-tip: Download the official festival app to load digital credits beforehand and skip the food counter token queues entirely.'
    ],
    category: 'bengaluru',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
    readTime: '4 min read',
    date: 'June 26, 2026',
    author: {
      name: 'Kabir Kamath',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
      role: 'Senior City Reporter',
      bio: 'Kabir reports on city life, cultural events, and urban development in Bengaluru with an eye for community stories.'
    },
    isPremium: false,
    likes: 625,
    views: 4500,
    commentsCount: 31,
    tags: ['Bengaluru Events', 'Palace Grounds', 'Food Festival', 'Local Guide']
  },
  {
    id: 'blr-2',
    title: 'Namma Metro Yellow Line Update: Electronic City Section Nears Completion',
    slug: 'namma-metro-yellow-line-electronic-city-update',
    excerpt: 'Great news for tech park commuters. Trial runs are in the final stages, promising to cut travel times from Silk Board to E-City by 70%.',
    content: [
      'For hundreds of thousands of software developers and professionals commuting to Electronic City every day, traffic relief is finally on the horizon.',
      'The Bangalore Metro Rail Corporation Limited (BMRCL) has announced that structural safety trials on the highly anticipated 18.8-km Yellow Line are nearly complete.',
      'This line, connecting Central Silk Board to Bommasandra, features 16 elevated stations and will integrate key tech corridors with the residential neighborhoods of South Bengaluru.',
      'With automated driverless train coaches imported from CRRC, the Yellow Line promises high-frequency trains every 5 minutes during peak hours, reducing travel time to a mere 15 minutes compared to the grueling 1-hour road commute.',
      'The commercial launch is expected to roll out by August, marking a major milestone in Bengaluru\'s public transport network expansion.'
    ],
    category: 'bengaluru',
    image: 'https://images.unsplash.com/photo-1473842191133-c28ff96ec2b3?q=80&w=800&auto=format&fit=crop',
    readTime: '3 min read',
    date: 'June 23, 2026',
    author: {
      name: 'Kabir Kamath',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
      role: 'Senior City Reporter',
      bio: 'Kabir reports on city life, cultural events, and urban development in Bengaluru with an eye for community stories.'
    },
    isPremium: false,
    likes: 810,
    views: 5200,
    commentsCount: 45,
    tags: ['Namma Metro', 'Traffic Updates', 'Electronic City', 'Bengaluru News']
  },

  // FINANCE & INVESTMENT
  {
    id: 'fin-1',
    title: 'Why a 15-Year Mutual Fund SIP is the Smartest Way to Build a ₹1 Crore Wealth Corpus',
    slug: 'sip-mutual-fund-crore-corpus-guide',
    excerpt: 'Understanding the power of compounding in India: How starting small and increasing your contributions annually can secure your retirement early.',
    content: [
      'The concept of financial freedom is often associated with high-risk stock trading or massive business success. However, for the average salaried professional, the most guaranteed path to wealth is the humble SIP.',
      'A Systematic Investment Plan (SIP) allows you to invest a fixed amount of money in mutual funds on a recurring monthly basis, enforcing discipline and averaging out stock market volatility (Rupee Cost Averaging).',
      'Let\'s look at the numbers. If you start a monthly SIP of ₹15,000 in an equity mutual fund that delivers an average annual return of 12%, you will accumulate approximately ₹75 lakhs in 15 years.',
      'However, if you utilize a "Step-Up SIP"—increasing your monthly investment by just 10% every year to match your salary increments—your final corpus in 15 years jumps to a staggering ₹1.34 Crores!',
      'In this guide, we provide our interactive wealth calculator to help you customize your target retirement age, expected inflation, and select the right diversified funds.'
    ],
    category: 'finance',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop',
    readTime: '7 min read',
    date: 'June 24, 2026',
    author: {
      name: 'Siddharth Iyer, CFA',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop',
      role: 'Investment Advisor & Writer',
      bio: 'Siddharth is a Chartered Financial Analyst who loves breaking down complex personal finance topics for young earners.'
    },
    isPremium: false,
    likes: 489,
    views: 2900,
    commentsCount: 18,
    tags: ['Mutual Funds', 'SIP Calculator', 'Personal Finance', 'Wealth Building']
  },
  {
    id: 'fin-2',
    title: 'The Salaried Employee\'s Tax-Saving Blueprint: Beyond Section 80C',
    slug: 'salaried-employee-tax-saving-blueprint-beyond-80c',
    excerpt: 'Are you leaving money on the table? Discover legal ways to optimize your tax bracket using NPS, health insurance, and LTA deductions.',
    content: [
      'When March approaches, millions of professionals scramble to exhaust their ₹1.5 lakh deduction limit under Section 80C. But relying solely on PPF or ELSS funds means missing out on additional tax-saving tools.',
      'By fully leveraging provisions under the Income Tax Act, you can legally reduce your taxable income by an extra ₹2 to ₹3 lakhs, translating to immediate cash savings of up to ₹90,000 depending on your tax slab.',
      'Let\'s explore the National Pension Scheme (NPS). Under Section 80CCD(1B), you can claim an exclusive deduction of up to ₹50,000 for voluntary contributions, over and above the Section 80C limit.',
      'Additionally, Section 80D allows a deduction of up to ₹25,000 for health insurance premiums paid for yourself and family, and an additional ₹50,000 if you cover your senior citizen parents.',
      'We also break down House Rent Allowance (HRA) optimization, Home Loan Interest deductions, and how opting for the New Tax Regime vs. the Old Regime impacts your specific take-home salary.'
    ],
    category: 'finance',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    readTime: '9 min read',
    date: 'June 15, 2026',
    author: {
      name: 'Siddharth Iyer, CFA',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop',
      role: 'Investment Advisor & Writer',
      bio: 'Siddharth is a Chartered Financial Analyst who loves breaking down complex personal finance topics for young earners.'
    },
    isPremium: true,
    likes: 290,
    views: 1400,
    commentsCount: 11,
    tags: ['Tax Saving', 'Income Tax', 'NPS', 'Financial Planning']
  },

  // OTHER CATEGORIES (TECH, CAREER, MOTIVATION)
  {
    id: 'oth-1',
    title: 'How Generative AI is Disrupting Coding Standards in Bengaluru Startups',
    slug: 'generative-ai-coding-standards-bengaluru-startups',
    excerpt: 'AI co-pilots are writing 40% of standard production code. We survey CTOs to find out if junior developers are becoming obsolete.',
    content: [
      'In Bengaluru, the tech-capital of India, AI is no longer a futuristic buzzword. It is active on the screens of every major engineering team in Koramangala and HSR Layout.',
      'From generating boilerplates to writing unit tests and translating legacy architectures, tools like GitHub Copilot and Gemini are dramatically accelerating code output.',
      'But how does this affect junior engineering hires? The data is startling. While total code output is up by 35%, code review times have doubled as teams struggle with AI-generated bugs and security compliance.',
      'CTOs advise that the demand for "pure syntax writers" is plummeting. Instead, startups are seeking junior engineers who possess exceptional system design comprehension and debugging skills.',
      'To stay highly competitive, developers must master AI prompt engineering and understand architectural tradeoffs, transforming from "coders" to "orchestrators."'
    ],
    category: 'other',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    readTime: '6 min read',
    date: 'June 25, 2026',
    author: {
      name: 'Meera Nair',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
      role: 'Technology Journalist',
      bio: 'Meera reports on tech cultures, startup ecosystems, and the intersection of human creativity and AI.'
    },
    isPremium: false,
    likes: 310,
    views: 1750,
    commentsCount: 9,
    tags: ['Artificial Intelligence', 'Software Engineering', 'Startups', 'Career Advice']
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'q-1',
    title: 'Indian Spices & Culinary Trivia',
    description: 'Do you know your Asafoetida from your Carom? Test your knowledge on the rich, complex spices that define Indian cuisines.',
    category: 'food',
    difficulty: 'Medium',
    rewardPoints: 100,
    questions: [
      {
        id: 'q1-1',
        question: 'Which Indian spice is commonly referred to as "Hing" in Hindi?',
        options: ['Cumin', 'Asafoetida', 'Fenugreek', 'Cardamom'],
        correctAnswer: 1,
        explanation: 'Asafoetida is known as "Hing" and is famous for its savory, garlic-like aroma when heated in hot oil or ghee.'
      },
      {
        id: 'q1-2',
        question: 'Which Indian state is historically celebrated as the "Spice Garden of India"?',
        options: ['Karnataka', 'Tamil Nadu', 'Kerala', 'Rajasthan'],
        correctAnswer: 2,
        explanation: 'Kerala is known as the Spice Garden of India because of its legendary production of premium black pepper, cardamom, and cinnamon.'
      },
      {
        id: 'q1-3',
        question: 'What is the literal translation of the spice mix "Garam Masala"?',
        options: ['Salty Blend', 'Hot Spices', 'Sweet Powder', 'Bitter Aroma'],
        correctAnswer: 1,
        explanation: 'Garam translates to "hot" or "warm", and Masala means "spice mix". It raises body temperature in Ayurvedic philosophy.'
      }
    ]
  },
  {
    id: 'q-2',
    title: 'Namma Bengaluru Food Legends',
    description: 'How well do you know Bengaluru\'s most historic and legendary restaurants?',
    category: 'bengaluru',
    difficulty: 'Easy',
    rewardPoints: 50,
    questions: [
      {
        id: 'q2-1',
        question: 'Which iconic Bengaluru restaurant is famous for inventing the Rava Idli during WWII grain shortages?',
        options: ['Vidyarthi Bhavan', 'MTR (Mavalli Tiffin Room)', 'CTR (Shri Sagar)', 'Koshy\'s'],
        correctAnswer: 1,
        explanation: 'MTR invented the Rava Idli during World War II when rice was scarce, using semolina (rava) instead to create a fluffy alternative.'
      },
      {
        id: 'q2-2',
        question: 'Where is the famous "Food Street" of Bengaluru located?',
        options: ['Indiranagar', 'Koramangala', 'VV Puram', 'Malleshwaram'],
        correctAnswer: 2,
        explanation: 'VV Puram (Visveswarapuram) hosts the legendary evening Food Street, packed with stalls selling local and fusion vegetarian street foods.'
      }
    ]
  },
  {
    id: 'q-3',
    title: 'Personal Finance Basics',
    description: 'A quick health check on your money knowledge, compounding, and smart budgeting.',
    category: 'finance',
    difficulty: 'Medium',
    rewardPoints: 150,
    questions: [
      {
        id: 'q3-1',
        question: 'According to the popular 50/30/20 budget rule, what should 20% of your income be allocated to?',
        options: ['Rent & Utilities', 'Savings & Debt Payoff', 'Dining & Entertainment', 'Luxury Travel'],
        correctAnswer: 1,
        explanation: 'The 50/30/20 rule states 50% goes to Needs, 30% to Wants, and 20% to Savings and financial investments.'
      },
      {
        id: 'q3-2',
        question: 'What does the acronym "SIP" stand for in mutual fund investing?',
        options: ['Savings Investment Program', 'Stock Index Portfolio', 'Systematic Investment Plan', 'Secured Interest Pension'],
        correctAnswer: 2,
        explanation: 'SIP stands for Systematic Investment Plan, which lets you automate fixed investments on a periodic schedule.'
      }
    ]
  }
];

export const INITIAL_EBOOKS: EbookProduct[] = [
  {
    id: 'eb-1',
    title: 'The Ultimate Bengaluru Foodie Guide',
    description: 'Uncover 150+ hidden street food stalls, old tiffin rooms, craft breweries, and artisanal cafes with custom maps.',
    price: 349,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=300&auto=format&fit=crop',
    category: 'Guides',
    rating: 4.8,
    reviewsCount: 142
  },
  {
    id: 'eb-2',
    title: 'Restaurant Profitability Blueprint',
    description: 'A complete workbook containing menu pricing templates, staff rostering models, and vendor contract checklists.',
    price: 999,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=300&auto=format&fit=crop',
    category: 'Business Templates',
    rating: 4.9,
    reviewsCount: 84
  },
  {
    id: 'eb-3',
    title: 'North Indian Spice Mastery E-book',
    description: 'Learn the chemical pairings, roasting temperatures, and slow-cooking times for 45 legendary restaurant recipes.',
    price: 249,
    originalPrice: 499,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300&auto=format&fit=crop',
    category: 'Cookbooks',
    rating: 4.7,
    reviewsCount: 210
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Sanjay Kumar', points: 1250 },
  { rank: 2, name: 'Priya Narayanan', points: 1100 },
  { rank: 3, name: 'Rahul Hegde', points: 950 },
  { rank: 4, name: 'Kavitha Rao', points: 880 },
  { rank: 5, name: 'Abhishek Swamy', points: 820 }
];

export const INITIAL_AD_SETTINGS: AdSetting[] = [
  { id: 'ad-1', name: 'Header Leaderboard banner', location: 'Top header, below navbar', enabled: true, type: 'banner', earnings: 142.50 },
  { id: 'ad-2', name: 'In-Article Responsive Ad', location: 'After paragraph 2 in reading view', enabled: true, type: 'in-feed', earnings: 310.80 },
  { id: 'ad-3', name: 'Sidebar Sticky Promo', location: 'Right column sidebar', enabled: false, type: 'sidebar', earnings: 0.00 }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c-1',
    articleId: 'food-1',
    author: 'Vikram Joshi',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=80&auto=format&fit=crop',
    content: 'Followed this Butter Chicken recipe yesterday for a family dinner. Absolutely mindblowing! The sifting of the makhani puree is tedious but 100% worth it for that restaurant texture.',
    timestamp: '2 hours ago',
    approved: true,
    likes: 12
  },
  {
    id: 'c-2',
    articleId: 'food-1',
    author: 'Radhika Murthy',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=80&auto=format&fit=crop',
    content: 'Can we replace cashews with almonds or melon seeds for the gravy? Allergy in the family.',
    timestamp: '4 hours ago',
    approved: true,
    likes: 3
  },
  {
    id: 'c-3',
    articleId: 'biz-1',
    author: 'Deepak Rao',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=80&auto=format&fit=crop',
    content: 'Such a realistic take on cloud kitchens! Everyone thinks it is free money, but marketing spends on Swiggy can kill you. Direct ordering and loyalty is the only long term play.',
    timestamp: '1 day ago',
    approved: true,
    likes: 24
  },
  {
    id: 'c-4',
    articleId: 'blr-1',
    author: 'Sunita Gowda',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80&auto=format&fit=crop',
    content: 'Palace grounds is going to be incredibly packed! Glad they arranged the metro shuttles, Silk Board and Cubbon Park metro links will make it much easier to commute.',
    timestamp: 'Yesterday',
    approved: true,
    likes: 8
  }
];
