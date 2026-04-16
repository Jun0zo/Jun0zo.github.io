export type SidebarMedia = { src: string; alt: string; caption?: string; };
export type DetailLink = { label: string; href: string; };
export type Education = { slug?: string; period: string; school: string; degree: string; details: string[]; logo?: string; sidebarMedia?: SidebarMedia[]; evidence?: string[]; related?: string[]; links?: DetailLink[]; };
export type Experience = { slug: string; period: string; company: string; role: string; summary: string; outcomes: string[]; stack: string[]; logo?: string; sidebarMedia?: SidebarMedia[]; evidence?: string[]; related?: string[]; links?: DetailLink[]; hiddenMedia?: string[]; };
export type Project = { slug: string; period: string; track: string; title: string; role: string; hook: string; summary: string; outcomes: string[]; stack: string[]; visual?: SidebarMedia; sidebarMedia?: SidebarMedia[]; evidence?: string[]; related?: string[]; links?: DetailLink[]; linkLabel?: string; href?: string; visible?: boolean; };
export type Publication = { slug?: string; title: string; authors: string; venue: string; date: string; details?: string; logo?: string; href?: string; sidebarMedia?: SidebarMedia[]; evidence?: string[]; related?: string[]; links?: DetailLink[]; };
export type Philosophy = { title: string; description: string; icon: string; images?: string[]; projects?: string[]; label?: string; id?: string; };
export type TrackSummary = { title: string; description: string; items: string[]; };

export const dict = {
  en: {
    nav: { graph: 'Knowledge Graph', philosophy: 'Philosophy', education: 'Education', experience: 'Experience', publications: 'Publications', projects: 'Projects', skills: 'Skills' },
    hero: {
      title: 'Transforming Human Domain Knowledge into Physical Intelligence.',
      desc: "I want to research ways to translate tacit field knowledge and operational context into intelligence that robots can understand.",
      btnGithub: 'GitHub Profile',
      btnExp: 'View Experience',
    },
    section: {
      philosophy: 'Design Philosophy',
      philosophyQuote: "기계가 인간의 맥락을 100% 이해할 때, 기술은 비로소 인간을 대체하는 것이 아니라 해방 시키는 가장 강력한 레버리지가 됩니다.",
      education: 'Education',
      experience: 'Experience',
      impact: 'Impact Metrics',
      publications: 'Publications & Research Achievements',
      projects: 'Projects & Research',
      sysArch: 'System Architecture',
      skills: 'Skills & Focus Areas',
      contactTitle: "Let's build systems that carry context.",
      contactDesc: "Based in Korea. Currently shaping work across research, product systems, and robotics. If you're interested in robot learning, sim-to-real, or AI operations, feel free to reach out."
    },
    philosophyData: [
      { 
        id: 'STRUCTURE', images: ['/media/screenshot-2026-04-05-pm-11.15.53.png'],
        title: 'Organizing Human Context', 
        description: '',
        label: 'HUMAN → CONTEXT',
        projects: ['InsightFlow', 'TechGraph', 'openfolio']
      },
      { 
        id: 'TRANSFER', images: ['/media/screenshot-2026-04-15-am-12.03.11.png', '/media/screen-record-2023-06-02-am-3.18.17.gif', '/media/screenshot-2026-04-15-am-12.03.41.png'],
        title: 'Seamless Intelligence Migration', 
        description: '',
        label: 'CONTEXT → MACHINE',
        projects: ['Off-Road and Bokbunja', 'dreamerv2', '2stepED']
      },
      { 
        id: 'AMPLIFY', images: ['/media/KakaoTalk_Photo_2026-04-14-23-16-39.png', '/media/KakaoTalk_Photo_2026-04-15-11-58-11.png', '/media/kakao_video_20260414.gif'],
        title: 'Scaling Human Capability', 
        description: '',
        label: 'MACHINE → AMPLIFIED RESULT',
        projects: ['Samsung SDS', 'Navy CERT', 'Snappo']
      }
    ],
    educationData: [
      { 
        slug: 'purdue-visiting-researcher', period: 'Mar 2024 - Jun 2024', school: 'Purdue University', logo: '/media/purdue_logo.png', degree: 'Visiting Researcher', details: ['Led a privacy-aware AI research project on drone-captured images as team leader', 'Coordinated project direction and contributed to research writing in an international setting'],
        sidebarMedia: [
          { src: '/media/slide_000.png', alt: 'Purdue Research Slide' },
          { src: '/media/screenshot-2026-04-13-am-3.12.56.png', alt: 'Purdue Research Detail 1' },
          { src: '/media/screenshot-2026-04-13-am-3.13.14.png', alt: 'Purdue Research Detail 2' },
          { src: '/media/screenshot-2026-04-13-am-3.13.34.png', alt: 'Purdue Research Detail 3' }
        ]
      },
      { slug: 'kunsan-software-engineering', period: 'Mar 2019 - Feb 2026', school: 'Kunsan National University', logo: '/media/kunsan_logo.svg', degree: 'B.S. in Software Engineering', details: ['Achieved top academic standing in the department (Highest Honors in 2020, 2023)', 'Undergraduate Research Student at Data Intelligence Lab (Jul 2021 - Feb 2026)'] }
    ],
    experienceData: [
      { slug: 'sds', period: 'Feb 2025 - Feb 2026', company: 'Samsung SDS', logo: '/media/samsungsdsa_logo.webp', role: 'Data Analyst / Logistics System Optimization Intern', summary: 'Worked across WMS-SAP data visibility, forklift layout routing, SOP restructuring, and inventory workflows inside a massive live logistics environment. The core lesson was profound: the most brilliant algorithm changes meaning the moment it meets real operators, physical space constraints, and safety margins. This solidified my methodology for translating tacit human knowledge into structured system logic.', outcomes: ['Designed warehouse layout relocation simulations and improved inventory flow structure through inbound/outbound process digitization', 'Analyzed and improved field Standard Operating Procedures (SOP), identifying issues where identical SOPs were executed differently across sites', 'Recognized structural limitations where operational context and worker judgment are not reflected in the system', 'Contributed to a 90% reduction in detention costs and achieved 98.7% inventory audit accuracy'], stack: ['WMS', 'SAP', 'layout validation', 'SOP systems'], visual: { src: '/media/zone-layout.png', alt: 'Zone Layout Editor' }, sidebarMedia: [{ src: '/media/screenshot-2026-04-13-am-1.02.44.png', alt: 'Samsung SDS Detail 1' }, { src: '/media/screenshot-2026-04-13-am-12.50.56.png', alt: 'Samsung SDS Detail 2' }], hiddenMedia: ['/media/zone-layout.png'] },
      { slug: 'navy-cert', period: 'Jun 2021 - Jan 2023', company: 'R.O.K. Navy Cyber Operations Center', logo: '/media/cyber_op_logo.svg', role: 'Information Security Engineer', summary: 'Operated real-time security monitoring and threat detection systems within a mission-critical national defense network. Designed security threat response workflows during the tense wartime situation of the Russia-Ukraine conflict, specifically defending against zero-day vulnerabilities like Log4j. Learned profound responsibility regarding system availability and zero-loss communication.', outcomes: ['Operated real-time security monitoring and threat detection processes based on large-scale network log anomaly detection', 'Extracted meaningful signals from noisy, high-frequency event environments to make real-time decisions', 'Secured an understanding of decision-making structures based on incomplete information in real-time systems', 'Awarded the Chief of Naval Operations Prize (2022) and the Commander of Cyber Operations Center Prize (2023)'], stack: ['Security Operations', 'Network Monitoring', 'Threat Detection'], visual: { src: '/media/navy_cert_dashboard.png', alt: 'NCOC Integrated Platform Dashboard' } }
    ],
    projectData: [
      { slug: 'offroad-bokbunja', period: '2023 - 2024', track: 'robotics autonomy', title: 'Autonomous Off-Road and Bokbunja Robotics', role: 'Lead Researcher', hook: 'Simulation became the place where robot intelligence could learn before the real field punished mistakes.', summary: 'Built Unity-first off-road reinforcement learning environments, then carried that line into a bokbunja harvesting assistant robot for real agricultural terrain.', outcomes: ['오프로드 강화학습을 위한 Unity 시뮬레이션 환경 구축', '농업 로봇 배포를 위한 YOLO 및 LiDAR 기반 내비게이션 적용'], stack: ['Unity', 'RL', 'YOLO', 'LiDAR'], visual: { src: '/media/offroad-rl-origin.gif', alt: 'Off-road RL visualization' }, sidebarMedia: [{ src: '/media/offroad-rl-origin.gif', alt: 'Off-road RL visualization', caption: 'DQN / attention visualization artifact' }, { src: '/media/dreamerv2-eval.png', alt: 'DreamerV2 evaluation panel', caption: 'World-model RL evaluation context' }], evidence: ['Linked to KIIT 2023 RL Attention and KIIT 2023 Off-road publications', 'KIIT undergraduate thesis competition gold award', 'JunOS cluster: Simulation-Based Robot Learning and RL Visualization'], related: ['Project Experience - dreamerv2', 'Project Experience - visualize_dqn_simulation', 'Project Experience - Off-Road and Bokbunja'], links: [{ label: 'dreamerv2 repository', href: 'https://github.com/Jun0zo/dreamerv2' }, { label: 'DQN visualization repository', href: 'https://github.com/Jun0zo/visualize_dqn_simulation' }] },
      { slug: '2steped', period: '2024 - 2025', track: 'research ai', title: '2stepED', role: 'Research pipeline design and experimentation', hook: 'Long-context evaluation only becomes useful when the experiment structure is as deliberate as the model.', summary: 'Designed a two-step essay creativity scoring pipeline built around encoder pretraining, embedding extraction, and decoder finetuning.', outcomes: ['Long-context encoder experiments on Korean essay data', 'Publication-linked research asset connected to the R2C line'], stack: ['Python', 'PyTorch', 'Transformers'], href: 'https://github.com/Jun0zo/2stepED', visual: { src: '/media/r2c-chart.png', alt: 'R2C Clustering Chart' }, sidebarMedia: [{ src: '/media/r2c-chart.png', alt: 'R2C Clustering Chart', caption: 'Self-Supervised Clustering' }, { src: '/media/naacl-poster.png', alt: 'NAACL Poster Session', caption: 'NAACL 2025 Presentation' }], evidence: ['NAACL Findings R2C research line', 'Encoder pretraining / decoder finetuning pipeline', 'JunOS node: Project Experience - 2stepED'], related: ['Publication - NAACL Findings - R2C', 'Publication - JKIIT 2023 - Essay Data', 'Project Experience - PromptAES'] },
      { slug: 'insight-flow', period: '2026', track: 'ai product systems', title: 'InsightFlow', role: 'Product positioning, workflow design', hook: 'AI becomes valuable when it owns the workflow, not when it just decorates a feature.', summary: 'Structured a Korean qualitative research product that ties project creation, survey design, respondent flow, and transcript analysis into one AI-native system.', outcomes: ['Project creation, survey, and analysis routes in one flow', 'Supabase-backed application structure'], stack: ['Next.js', 'TypeScript', 'Supabase'], href: 'https://github.com/Jun0zo/insight-flow' },
      { slug: 'snappo', period: '2025 - 2026', track: 'consumer product', title: 'Snappo', role: 'Product concept, retrieval flow', hook: 'Some products start with storage. This one started with memory, ownership, and recall.', summary: 'Explored a photo-memory platform where people reclaim images through a six-digit retrieval flow.', outcomes: ['Code-based retrieval instead of gallery-first ownership', 'Consumer-facing brand direction shaped around recall'], stack: ['React', 'Vite', 'Tailwind', 'Supabase'], href: 'https://github.com/Astrobear-Lab/Snappo', visual: { src: '/media/snappo-memory-1.jpeg', alt: 'Snappo memory flow' }, sidebarMedia: [{ src: '/media/snappo-memory-1.jpeg', alt: 'Snappo memory flow', caption: 'Consumer memory flow' }, { src: '/media/snappo-memory-2.jpeg', alt: 'Snappo memory asset', caption: 'Photo-memory product texture' }, { src: '/media/snappo-brainstorming.png', alt: 'Snappo brainstorming board', caption: 'Early product ideation' }], evidence: ['Astrobear-Lab repository', 'JunOS node: Project Experience - Snappo', 'Consumer-facing brand and retrieval workflow'], related: ['Project Experience - openfolio', 'Project Experience - yukgap', 'Project Experience - memora'], visible: false },
      { slug: 'techgraph', period: '2025', track: 'knowledge platform', title: 'TechGraph', role: 'Graph product concept, data structure', hook: 'I do not just collect information. I try to make the relationship structure visible.', summary: 'Built a graph-native explorer for founders, companies, and startup ecosystems combining Neo4j data thinking with a product language.', outcomes: ['Entity modeling for founder networks', 'Graph exploration interface shaped around discovery'], stack: ['React', 'Neo4j', 'Firebase', 'vis.js'], href: 'https://github.com/Jun0zo/TechGraph', visual: { src: '/media/techgraph-logo.png', alt: 'TechGraph Logo' }, visible: false },
      { slug: 'openfolio', period: '2025', track: 'open source', title: 'openfolio', role: 'Maintainer', hook: 'A portfolio is an ongoing system, not just a static document.', summary: 'Developed an open-source portfolio management system to help developers template and assetize their work.', outcomes: ['Created reusable portfolio templates'], stack: ['Next.js', 'React', 'Tailwind'], visible: false },
      { slug: 'gps-ros-parcel-drone', period: '2019 - 2020', track: 'robotics autonomy', title: 'GPS ROS Parcel Drone', role: 'Control implementation', hook: 'The earliest robotics lesson was simple: GPS alone is never the whole story.', summary: 'Built a GPS/ROS parcel drone line that connected marker-based alignment, dropzone logic, and physical control constraints.', outcomes: ['National Assembly Award at Educational Innovation Festival', 'GPS / marker / dropzone code preserved in local evidence'], stack: ['ROS', 'GPS', 'ArUco', 'Drone Control'], evidence: ['JunOS split-fixed node: GPS ROS Parcel Drone', 'Local evidence: Projects/competitions/drone_xoptimus', 'Award evidence: Educational Innovation Festival National Assembly Award'], related: ['Project Experience - GPS ROS Parcel Drone', 'Awards and Honors - AWD-2020-EDU-NA'], visible: false },
      { slug: 'xoptimus-wildfire-drone', period: '2020 - 2021', track: 'robotics hardware', title: 'X-Optimus Wildfire Drone', role: 'Hardware-control builder', hook: 'Before robot intelligence became a research theme, hardware made the constraints impossible to ignore.', summary: 'Built a from-scratch Arduino wildfire surveillance drone, including soldering, hardware integration, and control-system assembly.', outcomes: ['Gold Prize at X-Optimus convergence education program', 'Separated from the GPS/ROS parcel drone after JunOS evidence audit'], stack: ['Arduino', 'Drone Hardware', 'Soldering', 'Control'], evidence: ['JunOS split-fixed node: X-Optimus Wildfire Drone', 'Award evidence: X-Optimus Gold Prize', 'Program document evidence in Records'], related: ['Project Experience - X-Optimus Wildfire Drone', 'Awards and Honors - AWD-2021-XOPTIMUS-GOLD'], visible: false },
      { slug: 'promptaes', period: '2024', track: 'research ai', title: 'PromptAES', role: 'Researcher', hook: 'Can large language models grade essays fairly without fine-tuning?', summary: 'Researched prompt-based automated essay scoring models to evaluate educational content efficiently.', outcomes: ['Automated essay score calculation pipeline'], stack: ['LLM', 'Prompt Engineering', 'Python'], visual: { src: '/media/promptaes-tsne.png', alt: 'PromptAES t-SNE visualization' }, sidebarMedia: [{ src: '/media/promptaes-tsne.png', alt: 'PromptAES t-SNE visualization', caption: 'Embedding structure view' }, { src: '/media/promptaes-prompt1.png', alt: 'PromptAES prompt score plot', caption: 'Prompt-level score distribution' }], evidence: ['JunOS node: Project Experience - PromptAES', 'Prompt-aware AES follow-up experiments', 'Related to the R2C / writing evaluation research line'], related: ['Project Experience - 2stepED', 'Project Experience - promptaes_web', 'Publication - NAACL Findings - R2C'], visible: false }
    ],
    publicationData: [
      { slug: 'aes-multilayer-encoders', title: 'Automated Essay Scoring based on Multi-layer Encoders', authors: 'Jo, J., et al.', venue: "EMNLP", date: '2026', details: 'Currently under review for EMNLP 2026. Proposes a novel AES framework utilizing multi-layer encoder architectures to capture hierarchical creativity and coherence in student essays.', logo: '/media/Gemini_Generated_Image_tz1hvgtz1hvgtz1h.png', sidebarMedia: [{ src: '/media/screenshot-2026-04-14-am-11.57.06.png', alt: 'AES Detail 1' }, { src: '/media/screenshot-2026-04-14-am-11.57.29.png', alt: 'AES Detail 2' }, { src: '/media/screenshot-2026-04-14-am-11.57.49.png', alt: 'AES Detail 3' }] },
      { slug: 'r2c-naacl-2025', title: 'Representation-to-Creativity (R2C): Automated Holistic Scoring Model for Essay Creativity', authors: 'Kim, D., Jo, J., On, B.-W., & Lee, I.', venue: 'Findings of ACL: NAACL', date: 'Apr 2025', logo: '/media/naacl_logo.png', href: 'https://aclanthology.org/2025.findings-naacl.292/', sidebarMedia: [{ src: '/media/screenshot-2026-04-13-am-12.44.53.png', alt: 'R2C Detail 1' }, { src: '/media/screenshot-2026-04-13-am-12.45.08.png', alt: 'R2C Detail 2' }] },
      { 
        slug: 'purdue-drone-privacy-2024', title: 'Evaluating Privacy Infringement Level in Drone-Captured Images Using Privacy Image Quality Assessment Algorithms', authors: 'Jo, J., et al.', venue: 'Purdue University Research', date: 'Jun 2024', details: 'Led the research and paper writing as team leader', logo: '/media/purdue_logo.png', 
        sidebarMedia: [
          { src: '/media/slide_000.png', alt: 'Purdue Research Slide' },
          { src: '/media/screenshot-2026-04-13-am-3.12.56.png', alt: 'Purdue Research Detail 1' },
          { src: '/media/screenshot-2026-04-13-am-3.13.14.png', alt: 'Purdue Research Detail 2' },
          { src: '/media/screenshot-2026-04-13-am-3.13.34.png', alt: 'Purdue Research Detail 3' }
        ] 
      },
      { slug: 'offroad-farm-robot-2023', title: 'A Deep Reinforcement Learning Framework Considering Off-road Driving Environment for Autonomous Farm Robot', authors: 'Jo, J., et al.', venue: 'KIIT Conference', logo: '/media/kiit_logo.png', date: 'Nov 2023', details: 'Gold Award, Undergraduate Thesis Competition', sidebarMedia: [{ src: '/media/screenshot-2026-04-13-pm-9.38.54.png', alt: 'Offroad Robot 1' }, { src: '/media/screen-record-2023-06-02-am-3.18.17.gif', alt: 'Offroad Robot 2' }, { src: '/media/screenshot-2026-04-13-pm-9.39.02.png', alt: 'Offroad Robot 3' }] },
      { slug: 'sentiment-aware-crawling-ieee-2021', title: 'Efficient Sentiment-Aware Web Crawling Methods for Constructing Sentiment Dictionary', authors: 'On, B.-W., Jo, J.-Y., Shin, H., Gim, J., Choi, G. S., & Jung, S.-M.', venue: 'IEEE Access', date: 'Nov 2021', logo: '/media/ieee_logo.svg', sidebarMedia: [{ src: '/media/screenshot-2026-04-13-pm-9.22.25.png', alt: 'Sentiment Crawling 1' }, { src: '/media/screenshot-2026-04-13-pm-9.23.29.png', alt: 'Sentiment Crawling 2' }, { src: '/media/screenshot-2026-04-13-pm-9.21.52.png', alt: 'Sentiment Crawling 3' }] },
      { slug: 'shortform-subtitle-jkiit-2021', title: 'Subtitle Automatic Extraction System for Short-form Contents', authors: 'Jo, J., Gim, J., On, B.-W., & Jeong, D.', venue: 'Journal of KIIT', logo: '/media/kiit_logo.png', date: 'Jun 2021', href: 'https://doi.org/10.14801/jkiit.2021.19.6.29', sidebarMedia: [{ src: '/media/screenshot-2026-04-13-pm-9.25.26.png', alt: 'Shortform Subtitle 1' }, { src: '/media/screenshot-2026-04-13-pm-9.26.02.png', alt: 'Shortform Subtitle 2' }, { src: '/media/02_OCR_Extraction_Process_Console.gif', alt: 'OCR Process' }] }
    ],
    trackSummary: [
      { title: 'Operational Intelligence', description: 'I architect systems that formalize expert knowledge and field constraints into deployable intelligence.', items: ['Samsung SDS', 'SDS Inventory', 'QR-attendance'] },
      { title: 'Robot Learning & Sim-to-Real', description: 'I focus on bridging the gap between simulation and real-world deployment for robust robot performance.', items: ['Off-Road and Bokbunja', 'dreamerv2', 'anony-drone'] },
      { title: 'Trustworthy Research Infrastructure', description: 'I build reusable research pipelines and privacy-preserving environments for safe robot learning.', items: ['2stepED', 'PromptAES', 'promptaes_web'] },
      { title: 'Product Systems', description: 'I build interfaces that expose reasoning and make complex industrial systems legible and actionable.', items: ['InsightFlow', 'Snappo', 'openfolio', 'TechGraph'] }
    ]
  },
  ko: {
    nav: { graph: '지식 그래프', philosophy: '설계 철학', education: '학력', experience: '실무 경력', publications: '학술 및 연구 성과', projects: '프로젝트', skills: '보유 역량' },
    hero: {
      title: '인간의 도메인 지식을 물리적 지능으로 변환(Transform)하여 실세계의 문제를 해결합니다.',
      desc: "현장의 암묵지와 운영 맥락을 로봇이 이해할 수 있는 지능으로 바꾸는 연구를 하고 싶습니다.",
      btnGithub: 'GitHub 프로필',
      btnExp: '경력 및 프로젝트 보기',
    },
    section: {
      philosophy: '설계 철학',
      philosophyQuote: "기계가 인간의 맥락을 100% 이해할 때, 기술은 비로소 인간을 대체하는 것이 아니라 해방 시키는 가장 강력한 레버리지가 됩니다.",
      education: '학력',
      experience: '실무 경력',
      impact: '핵심 성과 지표',
      publications: '학술 및 연구 성과',
      projects: '핵심 프로젝트',
      sysArch: '시스템 아키텍처',
      skills: '주요 역량 및 관심 분야',
      contactTitle: '맥락이 살아있는 시스템을 함께 만들고 싶습니다.',
      contactDesc: '현재 대한민국에 거주하며 로보틱스, AI 프로덕트 시스템, 연구 파이프라인을 아우르는 작업을 진행하고 있습니다. Robot Learning, Sim-to-real, AI 시스템화에 관심이 있으시다면 언제든 연락 주세요.'
    },
    philosophyData: [
      { 
        id: 'STRUCTURE',
        title: '인간 지식의 지능화', images: ['/media/screenshot-2026-04-05-pm-11.15.53.png'], 
        description: '',
        label: 'DOMAIN → INTELLIGENCE',
        projects: ['InsightFlow', 'TechGraph', 'openfolio']
      },
      { 
        id: 'TRANSFER',
        title: '강건한 Sim-to-Real', images: ['/media/screenshot-2026-04-15-am-12.03.11.png', '/media/screen-record-2023-06-02-am-3.18.17.gif', '/media/screenshot-2026-04-15-am-12.03.41.png'], 
        description: '',
        label: 'SIM → REAL',
        projects: ['Off-Road and Bokbunja', 'dreamerv2', '2stepED']
      },
      { 
        id: 'AMPLIFY',
        title: '실질적 효용의 창출', images: ['/media/KakaoTalk_Photo_2026-04-14-23-16-39.png', '/media/KakaoTalk_Photo_2026-04-15-11-58-11.png', '/media/kakao_video_20260414.gif'], 
        description: '',
        label: 'AI → PHYSICAL IMPACT',
        projects: ['Samsung SDS', 'Navy CERT', 'Snappo']
      }
    ],
    educationData: [
      { 
        slug: 'purdue-visiting-researcher', period: '2024.03 - 2024.06', school: 'Purdue University', logo: '/media/purdue_logo.png', degree: 'Visiting Researcher', details: ['드론 촬영 이미지의 사생활 침해 정량화 AI 연구 프로젝트 팀장 수행', '국제적 협업 환경에서 연구 방향성 설정 및 논문 작성 리드'],
        sidebarMedia: [
          { src: '/media/slide_000.png', alt: 'Purdue Research Slide' },
          { src: '/media/screenshot-2026-04-13-am-3.12.56.png', alt: 'Purdue Research Detail 1' },
          { src: '/media/screenshot-2026-04-13-am-3.13.14.png', alt: 'Purdue Research Detail 2' },
          { src: '/media/screenshot-2026-04-13-am-3.13.34.png', alt: 'Purdue Research Detail 3' }
        ]
      },
      { slug: 'kunsan-software-engineering', period: '2019.03 - 2026.02', school: 'Kunsan National University', logo: '/media/kunsan_logo.svg', degree: 'B.S. in Software Engineering', details: ['학과 학업성적 최우수 및 최우등상 수상 (2020, 2023)', 'Data Intelligence Lab 학부 연구생 (2021.07 - 2026.02)'] }
    ],
    experienceData: [
      { slug: 'sds', period: '2025.02 - 2026.02', company: 'Samsung SDS', logo: '/media/samsungsdsa_logo.webp', role: 'Data Analyst / Logistics System Optimization Intern', summary: 'SAP와 Plus WMS 데이터를 연동해 출고 가시성을 확보하고 지게차 동선을 최소화하는 재배치(Re-zoning) 알고리즘을 제안했습니다. 작업자들이 지키는  안전 거리나 우선순위와 같은 현장의 암묵지가 시스템 성능에 결정적임을 확인했으며, 이는 표준운영절차(SOP)와 인간의 노하우를 어떻게 기계의 보상 함수(Reward Function)로 정식화할 것인가에 대한 통찰로 이어졌습니다.', outcomes: ['창고 레이아웃 재배치 시뮬레이션 설계 및 입출고 프로세스 전산화, 재고 흐름 구조 개선', '현장 표준운영 절차(SOP) 분석 및 개선을 통해 동일한 SOP가 현장마다 다르게 실행되는 문제 확인', '운영 맥락(Context)과 작업자 판단이 시스템에 반영되지 않는 구조적 한계를 인식', '체류 비용(Detention cost) 약 90% 절감 및 재고 조사 정확도 98.7% 달성'], stack: ['WMS', 'SAP', 'layout validation', 'SOP systems'], visual: { src: '/media/zone-layout.png', alt: 'Zone Layout Editor' }, sidebarMedia: [{ src: '/media/screenshot-2026-04-13-am-1.02.44.png', alt: 'Samsung SDS Detail 1' }, { src: '/media/screenshot-2026-04-13-am-12.50.56.png', alt: 'Samsung SDS Detail 2' }], hiddenMedia: ['/media/zone-layout.png'] },
      { slug: 'navy-cert', period: '2021.06 - 2023.01', company: 'R.O.K. Navy Cyber Operations Center', logo: '/media/cyber_op_logo.svg', role: 'Information Security Engineer', summary: '국방망 대상 실시간 보안 관제 및 위협 탐지 시스템을 운영했습니다. 무중단 군사 작전을 보장하기 위해 Log4j 취약점 등 미션 크리티컬한 사고 대응을 수행했습니다.', outcomes: ['대규모 네트워크 로그 기반 이상 탐지 및 실시간 위협 모니터링, 대응 프로세스 운영', '노이즈가 포함된 고빈도 이벤트 환경에서 의미 있는 신호를 추출하고 실시간 의사결정 수행', '실시간 시스템에서 불완전 정보 기반 의사결정 구조에 대한 이해 확보', '해군참모총장상(2022) 해군사이버작전센터장상(2023)'], stack: ['Security Operations', 'Network Monitoring', 'Threat Detection'] , visual: { src: '/media/navy_cert_dashboard.png', alt: '해군 사이버 위협 통합 관제망 대시보드' } }
    ],
    projectData: [
      { slug: 'offroad-bokbunja', period: '2023 - 2024', track: 'robotics autonomy', title: '자율주행 및 복 분자 농업 로봇', role: '리드 연구원', hook: '가상 지능이 현실의 불확실성을 이겨내고 작동하게 만드는 Sim-to-Real 전이에 집중했습니다.', summary: '비정형 환경의 로봇 제어를 위해 Dreamer 알고리즘 기반 시뮬레이션 지능을 구축하고, 이를 험지의 슬립(Slip)과 관성 데이터로 보정해 Sim-to-Real Gap을 극복했습니다. ROS2 기반의 GPS·마커 융합 제어와 실제 복분자 농장에서의 LiDAR SLAM 자율주행 실험을 통해 하드웨어와 소프트웨어 통합 시스템 리딩  능력을 증명했습니다.', outcomes: ['오프로드 강화학습을 위한 Unity 시뮬레이션 환경 구축', '농업 로봇 배포를 위한 YOLO 및 LiDAR 기반 내비게이션 적용'], stack: ['Unity', 'RL', 'YOLO', 'LiDAR'], visual: { src: '/media/offroad-rl-origin.gif', alt: 'Off-road RL visualization' }, sidebarMedia: [{ src: '/media/offroad-rl-origin.gif', alt: 'Off-road RL visualization', caption: 'DQN / attention visualization artifact' }, { src: '/media/dreamerv2-eval.png', alt: 'DreamerV2 evaluation panel', caption: 'World-model RL evaluation context' }], evidence: ['KIIT 2023 RL Attention 및 Off-road 논문과 연결', 'KIIT 대학생논문경진대회 금상 수상', 'JunOS cluster: Simulation-Based Robot Learning and RL Visualization'], related: ['Project Experience - dreamerv2', 'Project Experience - visualize_dqn_simulation', 'Project Experience - Off-Road and Bokbunja'], links: [{ label: 'dreamerv2 repository', href: 'https://github.com/Jun0zo/dreamerv2' }, { label: 'DQN visualization repository', href: 'https://github.com/Jun0zo/visualize_dqn_simulation' }] },
      { slug: '2steped', period: '2024 - 2025', track: 'research ai', title: '2stepED', role: '연구 파이프라인 설계 및 실험', hook: '긴 문맥(Long-context) 평가는 실험 구조가 모델만큼 정교할 때 비로소 유용해집니다.', summary: '인간의 창의성이라는 추상적 개념을 기계가 정량적으로 평가하게 만드는 자동 채점 파이프라인(R2C)을 설계했습니다. 인코더 사전학습, 임베딩 추출, 디코더 미세조정을 유기적으로 결합했으며, 단순히 모델 하나를 만드는 것에 그치지 않고 연구의 구조 자체가 재사용 가능한 시스템 인프라가 되도록 구현했습니다. 이 연구는 글로벌 AI 학회인 NAACL 2025에 채택되었습니다.', outcomes: ['한국어 에세이 데이터에 대한 Long-context 인코더 실험', 'NAACL 논문 출판으로 이어진 재사용 가능한 연구 인프라 전환'], stack: ['Python', 'PyTorch', 'Transformers'], href: 'https://github.com/Jun0zo/2stepED', visual: { src: '/media/r2c-chart.png', alt: 'R2C Clustering Chart' }, sidebarMedia: [{ src: '/media/r2c-chart.png', alt: 'R2C Clustering Chart', caption: 'Self-Supervised Clustering' }, { src: '/media/naacl-poster.png', alt: 'NAACL Poster Session', caption: 'NAACL 2025 Presentation' }], evidence: ['NAACL Findings R2C 연구선과 연결', 'Encoder pretraining / decoder finetuning 파이프라인', 'JunOS node: Project Experience - 2stepED'], related: ['Publication - NAACL Findings - R2C', 'Publication - JKIIT 2023 - Essay Data', 'Project Experience - PromptAES'] },
      { slug: 'insight-flow', period: '2026', track: 'ai product systems', title: 'InsightFlow (인사이트 플 로우)', role: '프로덕트 포지셔닝 및 워크플로우 설계', hook: 'AI는 단순한 기능 추가가 아니라 워크플로우 전체 를 소유할 때 진정한 가치를 갖습니다.', summary: '프로젝트 생성, 설문 설계, 응답자 흐름, 전사 분석을 단일 AI 네이티브 시스템으로 통합한 한국어 정성조사 프로덕트입니다.', outcomes: ['프로젝트 생성부터 분석까지 단일 워 크플로우 구현', 'Supabase 기반 풀스택 프로덕트 아키텍처 설계'], stack: ['Next.js', 'TypeScript', 'Supabase'], href: 'https://github.com/Jun0zo/insight-flow' },
      { slug: 'snappo', period: '2025 - 2026', track: 'consumer product', title: 'Snappo (스내포)', role: ' 프로덕트 컨셉 및 회수 흐름 설계', hook: '어떤 프로덕트는 저장 공간에서 시작하지만, 이 프로덕트는 기억, 소유 권, 그리고 회수(Recall)에서 시작했습니다.', summary: '6자리 코드를 통해 사진을 회수하는 사진 기억 플랫폼을  탐구했습니다. 감성적 브랜딩과 가벼운 소비자 UX가 교차하는 프로덕트입니다.', outcomes: ['갤러리 소유권 대신  코드 기반 회수 로직 설계', '회수(Recall)를 중심으로 한 소비자 브랜드 방향성 수립'], stack: ['React', 'Vite', 'Tailwind', 'Supabase'], href: 'https://github.com/Astrobear-Lab/Snappo', visual: { src: '/media/snappo-memory-1.jpeg', alt: 'Snappo memory flow' }, sidebarMedia: [{ src: '/media/snappo-memory-1.jpeg', alt: 'Snappo memory flow', caption: 'Consumer memory flow' }, { src: '/media/snappo-memory-2.jpeg', alt: 'Snappo memory asset', caption: 'Photo-memory product texture' }, { src: '/media/snappo-brainstorming.png', alt: 'Snappo brainstorming board', caption: 'Early product ideation' }], evidence: ['Astrobear-Lab repository', 'JunOS node: Project Experience - Snappo', 'Consumer-facing brand and retrieval workflow'], related: ['Project Experience - openfolio', 'Project Experience - yukgap', 'Project Experience - memora'], visible: false },
      { slug: 'techgraph', period: '2025', track: 'knowledge platform', title: 'TechGraph (테크그래프)', role: '그래프 프로덕트 컨셉 및 데이터 구조 설계', hook: '저는 단순히 정보를 수집하지 않습니다. 관계의 구조를 시각적으로 보여주고자 합니다.', summary: '창업자, 기업, 스타트업 생태계를 위한 그래프 네이티브 탐색기를 구축했습니다. Neo4j 데이터 씽킹과 세련된 프로덕트 언어를 결합했습니다.', outcomes: ['창업자 네트워크를 위한 관계  및 엔티티 모델링', '생태계 발견을 중심으로 한 그래프 탐색 인터페이스'], stack: ['React', 'Neo4j', 'Firebase', 'vis.js'], href: 'https://github.com/Jun0zo/TechGraph', visual: { src: '/media/techgraph-logo.png', alt: 'TechGraph Logo' }, visible: false },
      { slug: 'openfolio', period: '2025', track: 'open source', title: 'openfolio', role: '메인테이너', hook: '포트폴리오는 정적인 문서가 아니라 계속해서 살아 움직이는 시스템입니다.', summary: '개발자들이 자신의 작 업물을 템플릿화하고 자산화할 수 있도록 돕는 오픈소스 포트폴리오 관리 시스템을 개발했습니다.', outcomes: ['재사용 가능한 오픈소스 포트폴리오 템플릿 구축'], stack: ['Next.js', 'React', 'Tailwind'], visible: false },
      { slug: 'gps-ros-parcel-drone', period: '2019 - 2020', track: 'robotics autonomy', title: 'GPS ROS Parcel Drone', role: '제어 구현', hook: '초기 로보틱스 경험이 알려준 것은 단순했습니다. GPS만으로는 현실을 충분히 설명할 수 없습니다.', summary: 'GPS/ROS 기반 택배 드론에서 marker 기반 정렬, dropzone 로직, 물리 제어 제 약을 연결했습니다. 이후 JunOS evidence audit에서 X-Optimus 산불 감시 드론과 분리된 별도 프로젝트로 정리했습 니다.', outcomes: ['교육혁신 Festival 국회의원상 수상', 'GPS / marker / dropzone 코드가 로컬 evidence로 보존됨'], stack: ['ROS', 'GPS', 'ArUco', 'Drone Control'], evidence: ['JunOS split-fixed node: GPS ROS Parcel Drone', 'Local evidence: Projects/competitions/drone_xoptimus', 'Award evidence: Educational Innovation Festival National Assembly Award'], related: ['Project Experience - GPS ROS Parcel Drone', 'Awards and Honors - AWD-2020-EDU-NA'], visible: false },
      { slug: 'xoptimus-wildfire-drone', period: '2020 - 2021', track: 'robotics hardware', title: 'X-Optimus Wildfire Drone', role: '하드웨어-제어 빌더', hook: '로봇 지능이 연구 주제가 되기 전, 하드웨어는 현실의 제 약을 가장 먼저 가르쳐준 대상이었습니다.', summary: '납땜부터 Arduino 부착까지 직접 구성한 from-scratch 산불 감시 드론 프로젝트입니다. GPS/ROS 택배 드론과는 다른 프로젝트로, X-Optimus 금상과 연결됩니다.', outcomes: ['X-Optimus 융합 교육 프로그램 성과 발표회 금상 수상', 'JunOS evidence audit 이후 GPS/ROS 택배 드론과 분리 정 리'], stack: ['Arduino', 'Drone Hardware', 'Soldering', 'Control'], evidence: ['JunOS split-fixed node: X-Optimus Wildfire Drone', 'Award evidence: X-Optimus Gold Prize', 'Program document evidence in Records'], related: ['Project Experience - X-Optimus Wildfire Drone', 'Awards and Honors - AWD-2021-XOPTIMUS-GOLD'], visible: false },
      { slug: 'promptaes', period: '2024', track: 'research ai', title: 'PromptAES', role: '연구원', hook: 'LLM이 파인튜닝 없이도 에세이를 공정하게 채점할 수 있을까요?', summary: '교육 콘텐츠를 효율적으로 평가하기 위한 프롬프트 기반 자동 에세이 채점 모델을 연구했습니다.', outcomes: ['자동 에세이 채점 파이프라인 구축'], stack: ['LLM', 'Prompt Engineering', 'Python'], visual: { src: '/media/promptaes-tsne.png', alt: 'PromptAES t-SNE visualization' }, sidebarMedia: [{ src: '/media/promptaes-tsne.png', alt: 'PromptAES t-SNE visualization', caption: 'Embedding structure view' }, { src: '/media/promptaes-prompt1.png', alt: 'PromptAES prompt score plot', caption: 'Prompt-level score distribution' }], evidence: ['JunOS node: Project Experience - PromptAES', 'Prompt-aware AES follow-up experiments', 'R2C / writing evaluation research line과 연결'], related: ['Project Experience - 2stepED', 'Project Experience - promptaes_web', 'Publication - NAACL Findings - R2C'], visible: false }
    ],
    publicationData: [
      { slug: 'aes-multilayer-encoders', title: 'Automated Essay Scoring based on Multi-layer Encoders', authors: 'Jo, J., et al.', venue: "EMNLP", date: '2026', details: 'EMNLP 2026 심사 중. 학생 에세이의 계층적 창 의성과 일관성을 포착하기 위해 다층 인코더 아키텍처를 활용한 새로운 자동 채점 프레임워크를 제안합니다.', logo: '/media/Gemini_Generated_Image_tz1hvgtz1hvgtz1h.png', sidebarMedia: [{ src: '/media/screenshot-2026-04-14-am-11.57.06.png', alt: 'AES Detail 1' }, { src: '/media/screenshot-2026-04-14-am-11.57.29.png', alt: 'AES Detail 2' }, { src: '/media/screenshot-2026-04-14-am-11.57.49.png', alt: 'AES Detail 3' }] },
      { slug: 'r2c-naacl-2025', title: 'Representation-to-Creativity (R2C): Automated Holistic Scoring Model for Essay Creativity', authors: 'Kim, D., Jo, J., On, B.-W., & Lee, I.', venue: 'Findings of ACL: NAACL', date: '2025년 4월', logo: '/media/naacl_logo.png', href: 'https://aclanthology.org/2025.findings-naacl.292/', sidebarMedia: [{ src: '/media/screenshot-2026-04-13-am-12.44.53.png', alt: 'R2C Detail 1' }, { src: '/media/screenshot-2026-04-13-am-12.45.08.png', alt: 'R2C Detail 2' }] },
      { 
        slug: 'purdue-drone-privacy-2024', title: 'Evaluating Privacy Infringement Level in Drone-Captured Images Using Privacy Image Quality Assessment Algorithms', authors: 'Jo, J., et al.', venue: 'Purdue University Research', date: '2024년 6월', details: '퍼듀 대학교 방문연구 당시, Privacy-aware AI 프로젝트의 팀장으로 서 비전 데이터 기반 사생활 침해 지표 정량화 모델링을 주도했습니다. 아이디어 제안부터 실험 설계, 논문 작성까 지 수행하며 연구 리더십을 확립했습니다.', logo: '/media/purdue_logo.png', 
        sidebarMedia: [
          { src: '/media/slide_000.png', alt: 'Purdue Research Slide' },
          { src: '/media/screenshot-2026-04-13-am-3.12.56.png', alt: 'Purdue Research Detail 1' },
          { src: '/media/screenshot-2026-04-13-am-3.13.14.png', alt: 'Purdue Research Detail 2' },
          { src: '/media/screenshot-2026-04-13-am-3.13.34.png', alt: 'Purdue Research Detail 3' }
        ] 
      },
      { slug: 'offroad-farm-robot-2023', title: '농업 환경에서의 자율주행 로봇 개발을 위한 오프로드 주행환경이 고려된 심층 강화학습 프레임워크', authors: 'Jo, J., et al.', venue: 'KIIT Conference', logo: '/media/kiit_logo.png', date: '2023년 11월', details: '비정형 오프로드 환경에서의 농업용 수확 로봇 자율주행을 위해 Unity 기반의 강화학습 시뮬레이션을 설계하고, 논문경진대회 우수논문상 (금상)', sidebarMedia: [{ src: '/media/screenshot-2026-04-13-pm-9.38.54.png', alt: 'Offroad Robot 1' }, { src: '/media/screen-record-2023-06-02-am-3.18.17.gif', alt: 'Offroad Robot 2' }, { src: '/media/screenshot-2026-04-13-pm-9.39.02.png', alt: 'Offroad Robot 3' }] },
      { slug: 'sentiment-aware-crawling-ieee-2021', title: 'Efficient Sentiment-Aware Web Crawling Methods for Constructing Sentiment Dictionary', authors: 'On, B.-W., Jo, J.-Y., Shin, H., Gim, J., Choi, G. S., & Jung, S.-M.', venue: 'IEEE Access', date: '2021년 11월', details: 'IEEE Access 논문 투고를 통해 대규모 데이터  크롤링 알고리즘 설계와 실험 가설 검증의 엄밀함을 익혔습니다.', logo: '/media/ieee_logo.svg', sidebarMedia: [{ src: '/media/screenshot-2026-04-13-pm-9.22.25.png', alt: 'Sentiment Crawling 1' }, { src: '/media/screenshot-2026-04-13-pm-9.23.29.png', alt: 'Sentiment Crawling 2' }, { src: '/media/screenshot-2026-04-13-pm-9.21.52.png', alt: 'Sentiment Crawling 3' }] },
      { slug: 'shortform-subtitle-jkiit-2021', title: '숏폼 콘텐츠 자막 자동 추출 시스템', authors: 'Jo, J., Gim, J., On, B.-W., & Jeong, D.', venue: 'Journal of KIIT', logo: '/media/kiit_logo.png', date: '2021년 6월', href: 'https://doi.org/10.14801/jkiit.2021.19.6.29', sidebarMedia: [{ src: '/media/screenshot-2026-04-13-pm-9.25.26.png', alt: 'Shortform Subtitle 1' }, { src: '/media/screenshot-2026-04-13-pm-9.26.02.png', alt: 'Shortform Subtitle 2' }, { src: '/media/02_OCR_Extraction_Process_Console.gif', alt: 'OCR Process' }] }
    ],
    trackSummary: [
      { title: '물류 및 운영 지능 (Operational Intelligence)', description: '현장의 암묵지와 운영 제약 조건(SOP)을 데이터화하여 실제 현장에서 작동하는 지능을 설계합니다.', items: ['Samsung SDS', 'SDS Inventory', 'QR-attendance'] },
      { title: '로봇 학습 및 Sim-to-Real', description: '시뮬레이션에서 학습된 가상 지능이 물리적 노이즈를  극복하고 강건하게 배치(Deployment)되도록 구현합니다.', items: ['Off-Road and Bokbunja', 'dreamerv2', 'anony-drone'] },
      { title: '신뢰할 수 있는 연구 인프라', description: '재사용 가능한 연구 파이프라인과 프라이버시가 보호되는 안전한 로봇 학습 환경을 구축합니다.', items: ['2stepED', 'PromptAES', 'promptaes_web'] },
      { title: '프로덕트 시스템 (Product Systems)', description: '데이터의 추론 과정을 노출하고, 워크플로우 를 명확히 하며, 복잡한 시스템을 직관적으로 만드는 인터페이스를 구축합니다.', items: ['InsightFlow', 'Snappo', 'openfolio', 'TechGraph'] }
    ]
  }
};
