/**
 * ---------------------------------------------------------------------------
 * CONTENT — the single source of truth for every piece of copy on the site.
 * Edit this file to update text, links, skills and projects.
 *
 * Rules followed here:
 *  - Nothing is invented: only information supplied by Mohammed Sarbhas.
 *  - Leave a URL as an empty string ('') and the UI shows a disabled,
 *    clearly-labelled placeholder instead of a dead link.
 * ---------------------------------------------------------------------------
 */

export interface NavItem {
  label: string
  href: string
}

export interface InfoCard {
  icon: 'graduation-cap' | 'cpu' | 'map-pin'
  title: string
  value: string
}

export interface EducationEntry {
  kind: 'degree' | 'qualification'
  title: string
  institution: string
  period: string
  status?: string
  meta?: string
}

export interface SkillGroup {
  title: string
  icon: 'code' | 'brain' | 'database' | 'layers' | 'wrench' | 'users'
  skills: string[]
}

export interface Project {
  id: string
  title: string
  duration?: string
  description: string
  bulletsTitle: string
  bullets: string[]
  /** Tech tags — only technologies actually used. Empty = "To be confirmed". */
  tags: string[]
  /** Leave '' until the real URL exists: the button renders as a placeholder. */
  liveUrl: string
  repoUrl: string
}

export const profile = {
  name: 'Mohammed Sarbhas',
  firstName: 'Mohammed',
  lastName: 'Sarbhas',
  initials: 'MS',
  role: 'AI & Machine Learning Engineering Student',
  roleLong: 'Final-Year Artificial Intelligence and Machine Learning Engineering Student',
  location: 'Kasaragod, Kerala, India',
  email: 'Sam488825@gmail.com',
  phone: '9995313193',
  phoneHref: '+919995313193',
  college: 'AJ Institute of Engineering & Technology',
  degree: 'Bachelor of Engineering in Artificial Intelligence and Machine Learning',
  educationPeriod: '2023–2027',

  /**
   * RESUME: place your PDF at  public/resume.pdf
   * (create the file if it is not there yet — the button reports this instead
   *  of pointing at a broken link).
   */
  resumePath: '/resume.pdf',
  resumeFileName: 'Mohammed_Sarbhas_Resume.pdf',

  /**
   * PHOTO: place your photo at  public/images/profile.jpg
   * Square 1:1 images look best (800×800 px recommended).
   * Until it exists, an initials avatar is rendered automatically.
   */
  photoPath: '/images/profile.jpg',

  /** Leave '' until the real profile exists — buttons stay disabled. */
  githubUrl: '',
  linkedinUrl: '',

  hero: {
    greeting: "Hi, I'm Mohammed Sarbhas",
    headline: 'AI & Machine Learning Engineering Student',
    intro:
      "I'm an aspiring AI/ML engineer passionate about building practical software applications and intelligent solutions. I enjoy solving problems, learning new technologies, and developing projects that address real-world needs.",
  },

  about: {
    heading: 'About Me',
    body: "I'm a final-year Artificial Intelligence and Machine Learning engineering student at AJ Institute of Engineering & Technology. I'm interested in artificial intelligence, machine learning, software development, and problem-solving. Through academic and personal projects, I aim to strengthen my technical knowledge and build useful applications.",
    cards: [
      { icon: 'graduation-cap', title: 'Education', value: 'B.E. in Artificial Intelligence and Machine Learning' },
      { icon: 'cpu', title: 'Interests', value: 'AI/ML and Software Development' },
      { icon: 'map-pin', title: 'Location', value: 'Kasaragod, Kerala, India' },
    ] satisfies InfoCard[],
  },

  contactIntro:
    "I'm interested in learning, collaborating on projects, and exploring opportunities in AI/ML and software development. Feel free to get in touch.",
} as const

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

/** Stable id list for the scroll-spy hook. */
export const sectionIds: string[] = navItems.map((item) => item.href.slice(1))

export const education: EducationEntry[] = [
  {
    kind: 'degree',
    title: 'Bachelor of Engineering — Artificial Intelligence and Machine Learning',
    institution: 'AJ Institute of Engineering & Technology',
    period: '2023 – 2027',
    status: 'Pursuing',
  },
  {
    kind: 'qualification',
    title: 'PUC – PCMC',
    institution: 'GHSS Pallikkara Government School',
    period: '2023',
    status: 'Completed',
  },
]

export const skillGroups: SkillGroup[] = [
  { title: 'Programming', icon: 'code', skills: ['Python', 'Java'] },
  {
    title: 'AI and Machine Learning',
    icon: 'brain',
    skills: ['Artificial Intelligence', 'Machine Learning', 'Computer Vision'],
  },
  { title: 'Database', icon: 'database', skills: ['SQL', 'PostgreSQL'] },
  {
    title: 'Core Computer Science',
    icon: 'layers',
    skills: ['Data Structures and Algorithms', 'Object-Oriented Programming', 'Database Management Systems'],
  },
  { title: 'Development Tools', icon: 'wrench', skills: ['Git', 'GitHub', 'Visual Studio Code'] },
  { title: 'Soft Skills', icon: 'users', skills: ['Problem-Solving', 'Communication', 'Teamwork'] },
]

export const projects: Project[] = [
  {
    id: 'sign-language',
    title: 'Sign Language Video Communication System',
    duration: 'September 2026 – Present',
    description:
      'A video communication project designed to support communication between people using sign language and other users.',
    bulletsTitle: 'Objectives',
    bullets: [
      'Develop a video communication platform.',
      'Explore AI/ML-based sign language recognition.',
      'Help make communication more accessible.',
    ],
    tags: ['Python', 'Computer Vision', 'OpenCV', 'Deep Learning', 'Video Streaming'],
    liveUrl: '',
    repoUrl: '',
  },
  {
    id: 'vehicle-service',
    title: 'Vehicle Service Management System',
    description:
      'An application designed to make vehicle servicing more convenient by allowing users to book service appointments online.',
    bulletsTitle: 'Features',
    bullets: [
      'Vehicle information management.',
      'Service selection.',
      'Appointment booking.',
      'Service management.',
    ],
    tags: ['Java', 'SQL', 'Database Management', 'Object-Oriented Design', 'Web Application'],
    liveUrl: '',
    repoUrl: '',
  },
]

/** Labelled "Relevant Coursework" — no certificate is claimed for these. */
export const coursework: string[] = [
  'Python Programming',
  'Data Structures and Algorithms',
  'AI and Machine Learning Fundamentals',
  'Database Management Systems',
  'Basics of Electronics and Programming',
  'Financial Management',
]

export const languages: string[] = ['English', 'Malayalam']
