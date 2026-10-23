import { profile, projects, education, coursework, languages } from '../../data/profile'
import type { SuggestedQuestion } from './types'

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    id: 'who-is-sarbhas',
    label: 'Who is Mohammed Sarbhas?',
    query: 'Who is Mohammed Sarbhas and what is his background?',
    category: 'about',
  },
  {
    id: 'projects-overview',
    label: 'What projects has he built?',
    query: 'What projects has Mohammed Sarbhas worked on?',
    category: 'projects',
  },
  {
    id: 'sign-language-project',
    label: 'Sign Language AI Project',
    query: 'Tell me about the Sign Language Video Communication System project',
    category: 'projects',
  },
  {
    id: 'tech-skills',
    label: 'What are his technical skills?',
    query: 'What technical skills and programming languages does Sarbhas know?',
    category: 'skills',
  },
  {
    id: 'education-degree',
    label: 'Where does he study?',
    query: 'Where does Mohammed Sarbhas study and what degree is he pursuing?',
    category: 'education',
  },
  {
    id: 'contact-info',
    label: 'How can I contact Mohammed?',
    query: 'How can I contact Mohammed Sarbhas?',
    category: 'contact',
  },
  {
    id: 'languages-spoken',
    label: 'What languages does he speak?',
    query: 'What languages does Mohammed Sarbhas speak?',
    category: 'about',
  },
  {
    id: 'resume-download',
    label: 'Where can I find his resume?',
    query: 'Where can I view or download his resume?',
    category: 'about',
  },
]

interface BotResponse {
  text: string
  isRefusal?: boolean
  links?: { label: string; href: string }[]
  tags?: string[]
}

/**
 * Evaluates whether a user query is about Mohammed Sarbhas.
 * STRICT POLICY: If a question is NOT about Mohammed Sarbhas, his education,
 * his projects, skills, or contact info, we do NOT answer it.
 */
export function getBotResponse(rawQuery: string): BotResponse {
  const query = rawQuery.trim().toLowerCase()

  // 1. Empty or extremely short query
  if (!query || query.length < 2) {
    return {
      text: `Hello! I am Sarbhas-Bot, the virtual assistant for **${profile.name}**. You can ask me anything about Mohammed's engineering education, AI/ML projects, technical skills, or contact information. Click one of the suggested questions below to start!`,
    }
  }

  // 2. Friendly greetings addressed to the bot or Mohammed
  const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'assalamu alaikum', 'namaste', 'halo', 'yo']
  if (greetings.some((g) => query === g || query.startsWith(g + ' ') || query.startsWith(g + '!'))) {
    return {
      text: `Greetings! 🤖 I am **Sarbhas-Bot**, the dedicated AI assistant for **${profile.name}** (${profile.role}).\n\nI can only answer questions **strictly about Mohammed Sarbhas**. Feel free to ask about his AI/ML projects, education at AJ Institute, technical skills, or how to get in touch!`,
      tags: ['AI Assistant', 'Mohammed Sarbhas', 'Portfolio'],
      links: [
        { label: 'View About Section', href: '#about' },
        { label: 'Explore Projects', href: '#projects' },
      ],
    }
  }

  // 3. Strict Out-of-Bounds Detection
  // Keywords indicating general world knowledge, math, unrelated coding, weather, recipes, trivia, politics, etc.
  const generalKnowledgeTriggers = [
    'capital of',
    'weather in',
    'who is elon',
    'who is messi',
    'who is ronaldo',
    'who is trump',
    'who is modis',
    'who is the president',
    'who is the prime minister',
    'write a poem',
    'write a story',
    'recipe for',
    'how to cook',
    'solve 2+',
    'what is 2+',
    'what is 1+',
    'calculate',
    'what is the distance',
    'what is quantum',
    'what is bitcoin',
    'stock price',
    'translate this to french',
    'who won the world cup',
    'tell me a joke about dogs',
    'tell me a general joke',
    'what is the speed of light',
    'current news',
  ]

  const isGeneralKnowledge = generalKnowledgeTriggers.some((trigger) => query.includes(trigger))

  // Check if query is explicitly directed to Sarbhas / portfolio topics
  const sarbhasTokens = [
    'sarbhas',
    'mohammed',
    'you',
    'your',
    'he',
    'him',
    'his',
    'project',
    'projects',
    'skill',
    'skills',
    'college',
    'university',
    'degree',
    'study',
    'studied',
    'education',
    'contact',
    'email',
    'phone',
    'call',
    'resume',
    'cv',
    'about',
    'who are',
    'who is',
    'background',
    'sign language',
    'vehicle',
    'language',
    'languages',
    'python',
    'java',
    'github',
    'linkedin',
    'location',
    'address',
    'kerala',
    'kasaragod',
    'coursework',
    'course',
    'interests',
    'experience',
    'hire',
  ]

  const hasPortfolioContext = sarbhasTokens.some((token) => {
    const regex = new RegExp(`\\b${token}\\b`, 'i')
    return regex.test(query)
  })

  // If flagged as general knowledge or lacks portfolio context entirely:
  if (isGeneralKnowledge || !hasPortfolioContext) {
    return {
      isRefusal: true,
      text: `🤖 **Query Restricted**: I am specifically configured to answer questions **only about Mohammed Sarbhas** (his AI/ML engineering background, education, projects, skills, and contact details).\n\nI do not answer general knowledge, external trivia, or unrelated questions. Please ask a question related to **Mohammed Sarbhas**!`,
      tags: ['Notice', 'Strict Profile Knowledge Only'],
    }
  }

  // 4. Intent Classification within Mohammed Sarbhas's Profile

  // --- A. WHO IS HE / ABOUT ME / BIO ---
  if (
    query.includes('who are you') ||
    query.includes('who is mohammed') ||
    query.includes('who is sarbhas') ||
    query.includes('tell me about yourself') ||
    query.includes('tell me about mohammed') ||
    query.includes('tell me about him') ||
    query.includes('about sarbhas') ||
    query.includes('background') ||
    query.includes('bio') ||
    query.includes('introduce') ||
    query.includes('headline') ||
    query.includes('summary')
  ) {
    return {
      text: `**${profile.name}** is a ${profile.roleLong} at **${profile.college}** based in **${profile.location}**.\n\nHe is passionate about building practical software applications and intelligent solutions in Artificial Intelligence, Machine Learning, and Computer Vision. He actively builds impactful real-world software like deep learning sign language translators and full-stack systems.`,
      tags: ['AI/ML Engineer', 'Computer Vision', 'AJIET', 'Kasaragod, Kerala'],
      links: [
        { label: 'Read Full About Section', href: '#about' },
        { label: 'View Education', href: '#education' },
      ],
    }
  }

  // --- B. SIGN LANGUAGE PROJECT (SPECIFIC) ---
  if (
    query.includes('sign language') ||
    query.includes('mediapipe') ||
    query.includes('webrtc') ||
    query.includes('gesture') ||
    query.includes('opencv') ||
    query.includes('hand tracking')
  ) {
    const slProj = projects[0]
    return {
      text: `### 🤟 ${slProj.title}
*Status: ${slProj.status} (${slProj.duration})*

${slProj.description}

**Key Engineering Highlights:**
- ${slProj.bullets[0]}
- ${slProj.bullets[1]}
- ${slProj.bullets[2]}
- ${slProj.bullets[3]}

**Core Stack:** ${slProj.tags.join(', ')}`,
      tags: slProj.tags,
      links: [{ label: 'View Project Details', href: '#projects' }],
    }
  }

  // --- C. VEHICLE SERVICE MANAGEMENT SYSTEM (SPECIFIC) ---
  if (
    query.includes('vehicle') ||
    query.includes('car service') ||
    query.includes('service management') ||
    query.includes('garage') ||
    query.includes('appointment')
  ) {
    const vsProj = projects[1]
    return {
      text: `### 🚗 ${vsProj.title}
*Status: ${vsProj.status} (${vsProj.duration})*

${vsProj.description}

**Key Engineering Highlights:**
- ${vsProj.bullets[0]}
- ${vsProj.bullets[1]}
- ${vsProj.bullets[2]}
- ${vsProj.bullets[3]}

**Core Stack:** ${vsProj.tags.join(', ')}`,
      tags: vsProj.tags,
      links: [{ label: 'View Project Details', href: '#projects' }],
    }
  }

  // --- D. GENERAL PROJECTS OVERVIEW ---
  if (
    query.includes('project') ||
    query.includes('projects') ||
    query.includes('what have you built') ||
    query.includes('what has he built') ||
    query.includes('portfolio') ||
    query.includes('work')
  ) {
    return {
      text: `Mohammed has engineered two signature software projects:

1. **Sign Language Video Communication System** (*In Development, Sep 2026–Present*)
   - Real-time gesture translation during video calls using MediaPipe 3D hand tracking, PyTorch LSTM/CNN models, OpenCV, and WebRTC streaming.
   - Built to empower inclusive communication for the hearing and speech impaired.

2. **Vehicle Service Management System** (*Completed Project*)
   - Full-stack management system built with Java, SQL, and PostgreSQL.
   - Features automated appointment conflict detection, vehicle service history logs, and end-to-end job status tracking.`,
      tags: ['Computer Vision', 'Deep Learning', 'Java', 'PostgreSQL', 'WebRTC'],
      links: [{ label: 'Explore Projects Section', href: '#projects' }],
    }
  }

  // --- E. TECHNICAL SKILLS & TECHNOLOGIES ---
  if (
    query.includes('skill') ||
    query.includes('skills') ||
    query.includes('tech stack') ||
    query.includes('technologies') ||
    query.includes('stack') ||
    query.includes('tool') ||
    query.includes('python') ||
    query.includes('java') ||
    query.includes('sql') ||
    query.includes('programming')
  ) {
    return {
      text: `Mohammed Sarbhas possesses a robust technical skillset spanning:

- **Programming:** Python, Java
- **AI & Machine Learning:** Artificial Intelligence, Machine Learning, Computer Vision, Deep Learning (OpenCV, MediaPipe, PyTorch)
- **Databases:** SQL, PostgreSQL
- **Core Computer Science:** Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS)
- **Development Tools:** Git, GitHub, Visual Studio Code, WebRTC, FastAPI
- **Soft Skills:** Problem-Solving, Teamwork, Technical Communication`,
      tags: ['Python', 'Java', 'Computer Vision', 'PostgreSQL', 'Git'],
      links: [{ label: 'View Skills Matrix', href: '#skills' }],
    }
  }

  // --- F. EDUCATION & COLLEGE ---
  if (
    query.includes('education') ||
    query.includes('college') ||
    query.includes('university') ||
    query.includes('institute') ||
    query.includes('degree') ||
    query.includes('study') ||
    query.includes('studying') ||
    query.includes('school') ||
    query.includes('puc') ||
    query.includes('ajiet') ||
    query.includes('graduation') ||
    query.includes('batch')
  ) {
    const deg = education[0]
    const puc = education[1]
    return {
      text: `### 🎓 Mohammed's Educational Background:

1. **${deg.title}**
   - **Institution:** ${deg.institution}
   - **Timeline:** ${deg.period} (*${deg.status}*)
   - **Specialization:** Artificial Intelligence and Machine Learning

2. **${puc.title}**
   - **Institution:** ${puc.institution}
   - **Completed:** ${puc.period}
   - **Stream:** Physics, Chemistry, Mathematics, Computer Science (PCMC)`,
      tags: ['B.E. AI & ML', 'AJIET', '2023–2027'],
      links: [{ label: 'View Education Section', href: '#education' }],
    }
  }

  // --- G. CONTACT & SOCIALS ---
  if (
    query.includes('contact') ||
    query.includes('email') ||
    query.includes('mail') ||
    query.includes('phone') ||
    query.includes('mobile') ||
    query.includes('number') ||
    query.includes('call') ||
    query.includes('reach') ||
    query.includes('hire') ||
    query.includes('message') ||
    query.includes('get in touch') ||
    query.includes('linkedin') ||
    query.includes('social')
  ) {
    return {
      text: `You can reach out directly to Mohammed Sarbhas through:

- 💼 **LinkedIn:** [linkedin.com/in/mohammed-sarbhas-403136405](${profile.linkedinUrl})
- 📧 **Email:** [${profile.email}](mailto:${profile.email})
- 📱 **Phone:** [${profile.phoneHref}](tel:${profile.phoneHref}) (${profile.phone})
- 📍 **Location:** ${profile.location}

Mohammed is always open to collaborative projects, internships, and opportunities in AI/ML and software engineering.`,
      tags: ['LinkedIn', profile.email, profile.location],
      links: [
        { label: 'Open LinkedIn Profile', href: profile.linkedinUrl },
        { label: 'Send an Email', href: `mailto:${profile.email}` },
        { label: 'Go to Contact Form', href: '#contact' },
      ],
    }
  }

  // --- H. RESUME / CV ---
  if (query.includes('resume') || query.includes('cv') || query.includes('curriculum vitae')) {
    return {
      text: `Mohammed Sarbhas's resume is available right here on this portfolio website.\n\nYou can view and download his official resume file (**${profile.resumeFileName}**) directly from the Hero section or the button below!`,
      tags: ['Resume', 'PDF Download'],
      links: [
        { label: 'Download Resume (PDF)', href: profile.resumePath },
        { label: 'Go to Top', href: '#home' },
      ],
    }
  }

  // --- I. LOCATION / WHERE DOES HE LIVE ---
  if (query.includes('location') || query.includes('where do you live') || query.includes('where is he') || query.includes('kasaragod') || query.includes('kerala')) {
    return {
      text: `Mohammed Sarbhas is located in **${profile.location}**. He is currently pursuing his engineering degree at AJ Institute of Engineering & Technology.`,
      tags: ['Kasaragod', 'Kerala', 'India'],
      links: [{ label: 'View Contact & Location Info', href: '#contact' }],
    }
  }

  // --- J. LANGUAGES SPOKEN ---
  if (query.includes('language') || query.includes('languages') || query.includes('speak') || query.includes('english') || query.includes('malayalam')) {
    return {
      text: `Mohammed Sarbhas is proficient in **${languages.join(' and ')}**.\n\nHe uses English for academic and professional technical communications, and Malayalam as his native language.`,
      tags: languages,
      links: [{ label: 'View Languages Section', href: '#languages' }],
    }
  }

  // --- K. RELEVANT COURSEWORK ---
  if (query.includes('coursework') || query.includes('course') || query.includes('subject') || query.includes('subjects')) {
    return {
      text: `Mohammed's academic curriculum includes specialized coursework in:

${coursework.map((c) => `- ${c}`).join('\n')}

These courses provide a solid theoretical and practical foundation in modern computer science and AI.`,
      tags: ['Computer Science', 'AI Fundamentals', 'DSA', 'DBMS'],
      links: [{ label: 'View Coursework Section', href: '#coursework' }],
    }
  }

  // --- L. CAREER GOALS / INTERESTS ---
  if (query.includes('interest') || query.includes('interests') || query.includes('goal') || query.includes('career') || query.includes('future') || query.includes('role')) {
    return {
      text: `Mohammed is an aspiring AI/ML Engineer with a deep passion for **Artificial Intelligence, Machine Learning, Computer Vision, and Software Development**.\n\nHe aims to build intelligent, practical systems that solve real-world problems and enhance accessibility (such as his real-time sign language recognition system).`,
      tags: ['Career Aspirations', 'AI/ML Engineering', 'Accessible Tech'],
      links: [
        { label: 'View About Section', href: '#about' },
        { label: 'View Projects', href: '#projects' },
      ],
    }
  }

  // Fallback refusal if it didn't match any profile section
  return {
    isRefusal: true,
    text: `🤖 **Query Restricted**: I am programmed to provide information **strictly about Mohammed Sarbhas**.\n\nI couldn't match your query with Mohammed's profile. You can ask about his **education**, **projects** (like the Sign Language AI system), **technical skills**, **coursework**, or **contact information**. Try clicking one of the suggested prompts below!`,
    tags: ['Mohammed Sarbhas Profile Only'],
  }
}
