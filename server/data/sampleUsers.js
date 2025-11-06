// Plain text password for all users
const plainTextPassword = 'password123';

const users = [
  // 1. The Admin
  {
    fullName: 'Admin User',
    email: 'admin@almalink.com',
    enrollmentNumber: 'ADMIN001',
    password: plainTextPassword,
    status: 'Approved',
    isAdmin: true,
    headline: 'ALMALINK Site Administrator',
    graduationYear: 2010,
    degree: 'B.Tech',
    major: 'Computer Science'
  },
  
  // 2. Approved Mentor (Tech)
  {
    fullName: 'Priya Sharma',
    email: 'priya@almalink.com',
    enrollmentNumber: '1001',
    password: plainTextPassword,
    status: 'Approved',
    isAdmin: false,
    headline: 'Senior Software Engineer at Google',
    currentRole: 'Senior Software Engineer',
    currentCompany: 'Google',
    industry: 'Technology',
    city: 'San Francisco',
    country: 'USA',
    graduationYear: 2015,
    degree: 'B.Tech',
    major: 'Computer Science',
    skills: ['React', 'Node.js', 'AI/ML', 'System Design', 'JavaScript'],
    isMentor: true,
    mentorshipAreas: ['Career Advice', 'Mock Interviews', 'Startup Advice'],
    expertise: ['AI/ML', 'Big Data', 'Product Management'],
    linkedinProfile: 'https://linkedin.com/in/priya'
  },
  
  // 3. Approved Mentor (Finance)
  {
    fullName: 'Rohan Gupta',
    email: 'rohan@almalink.com',
    enrollmentNumber: '1002',
    password: plainTextPassword,
    status: 'Approved',
    isAdmin: false,
    headline: 'Investment Banker at Goldman Sachs',
    currentRole: 'Analyst',
    currentCompany: 'Goldman Sachs',
    industry: 'Finance',
    city: 'London',
    country: 'UK',
    graduationYear: 2018,
    degree: 'MBA',
    major: 'Marketing',
    skills: ['Financial Modeling', 'Excel', 'Valuation', 'Public Speaking'],
    isMentor: true,
    mentorshipAreas: ['Career Advice', 'Resume Reviews', 'Grad School Applications'],
    expertise: ['Investment Banking', 'Switching Industries'],
    linkedinProfile: 'https://linkedin.com/in/rohan'
  },
  
  // 4. Approved Non-Mentor (Design)
  {
    fullName: 'Aisha Khan',
    email: 'aisha@almalink.com',
    enrollmentNumber: '1003',
    password: plainTextPassword,
    status: 'Approved',
    isAdmin: false,
    headline: 'UX/UI Designer at Microsoft',
    currentRole: 'UX Designer',
    currentCompany: 'Microsoft',
    industry: 'Technology',
    city: 'Bangalore',
    country: 'India',
    graduationYear: 2019,
    degree: 'B.Des',
    major: 'Design',
    skills: ['UI/UX', 'Figma', 'Sketch', 'User Research'],
    isMentor: false, // Not a mentor
    linkedinProfile: 'https://linkedin.com/in/aisha'
  },
  
  // 5. Approved Non-Mentor (Tech / Different City)
  {
    fullName: 'Vikram Singh',
    email: 'vikram@almalink.com',
    enrollmentNumber: '1004',
    password: plainTextPassword,
    status: 'Approved',
    isAdmin: false,
    headline: 'Product Manager at Flipkart',
    currentRole: 'Product Manager',
    currentCompany: 'Flipkart',
    industry: 'Technology',
    city: 'Bangalore',
    country: 'India',
    graduationYear: 2016,
    degree: 'B.Tech',
    major: 'Mechanical',
    skills: ['Product Management', 'Agile', 'Jira', 'SQL'],
    isMentor: false
  },

  // --- Users for Admin Approval ---

  // 6. Pending User
  {
    fullName: 'Rajesh Kumar',
    email: 'rajesh@almalink.com',
    enrollmentNumber: '2001',
    password: plainTextPassword,
    status: 'Pending',
    isAdmin: false
  },
  
  // 7. Pending User
  {
    fullName: 'Sunita Williams',
    email: 'sunita@almalink.com',
    enrollmentNumber: '2002',
    password: plainTextPassword,
    status: 'Pending',
    isAdmin: false
  }
];

module.exports = users;