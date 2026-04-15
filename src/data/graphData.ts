export const graphData = {
  nodes: [
    // --- Group 1: Core Philosophies (Orange, Largest) ---
    { id: "Context First", group: 1, val: 50, desc: "현장의 맥락을 먼저 읽습니다. 흔들리지 않는 실질적인 효용이 설계의 시작입니다.", role: "Core Value", outcomes: ["기술적 우월성보다 현장 적합성 우선", "가시성 높은 데이터 제공"] },
    { id: "Intelligence Transfer", group: 1, val: 50, desc: "숙련된 인간의 판단력을 에이전트로 전이합니다. 노하우의 시스템 내재화를 목표로 합니다.", role: "Core Value", outcomes: ["판단 프로세스 자동화", "휴먼에러 축소 및 확장성 확보"] },
    { id: "Lossless Execution", group: 1, val: 50, desc: "정보와 실행의 간극을 메우는 완결성(Communication Loss Zero)을 지향합니다.", role: "Core Value", outcomes: ["Sim2Real 최적화", "병목 없는 워크플로우 설계"] },

    // --- Group 2: Domains / Tracks (Blue, Medium-Large) ---
    { id: "Operational Context", group: 2, val: 35, desc: "물류 및 현장 제약을 견디는 운영 시스템 설계.", role: "Domain", stack: ["System Design", "Logistics", "Operations"] },
    { id: "Robot Intelligence", group: 2, val: 35, desc: "시뮬레이션과 현장 배포를 잇는 로봇 지능 연구.", role: "Domain", stack: ["Sim2Real", "Robotics", "RL"] },
    { id: "Research Infrastructure", group: 2, val: 35, desc: "단발성 실험이 아닌 재사용 가능한 AI 연구 파이프라인.", role: "Domain", stack: ["Data Pipeline", "AI Engineering", "MLOps"] },
    { id: "Product Systems", group: 2, val: 35, desc: "데이터와 추론 과정을 직관적으로 노출하는 프로덕트 아키텍처.", role: "Domain", stack: ["Full-Stack", "UX/UI", "Architecture"] },

    // --- Group 3: Projects, Experience, Publications (White, Medium) ---
    { 
      id: "Samsung SDS", group: 3, val: 25, 
      role: "Data Analyst / Logistics System Optimization Intern", period: "2025.02 - 2026.02", 
      desc: "물류 창고 레이아웃 시뮬레이션 및 WMS-SAP 워크플로우 최적화.",
      summary: "실제 물류 환경 내에서 WMS-SAP 가시성, 레이아웃 로직, SOP 재구조화 및 재고 워크플로우를 담당했습니다. 아무리 좋은 알고리즘도 실제 작업자, 공간, 제약 조건과 만나는 순간 그 의미가 변한다는 점을 현장에서 직접 겪으며 배웠습니다. 이를 통해 현장의 지식을 시스템으로 전이하는 방법에 대한 깊은 통찰을 얻었습니다.",
      stack: ["WMS", "SAP", "Layout Validation", "SOP Optimization"], 
      outcomes: ["레이아웃 시뮬레이션 및 운영 배포를 통한 체류 비용(Detention cost) 90% 절감", "재고 조사 정확도 98.7% 달성"],
      logo: "/media/samsungsdsa_logo.webp"
    },
    { 
      id: "R.O.K. Navy Cyber Operations Center", group: 3, val: 25, 
      role: "Information Security Engineer", period: "2021.06 - 2023.01", 
      desc: "국방망 대상 실시간 보안 관제 및 위협 탐지 시스템을 운영.",
      summary: "단 한 번의 장애나 침해도 허용되지 않는 미션 크리티컬한 국방망 환경에서 실시간 보안 관제 및 위협 탐지 시스템을 운영했습니다. 러시아-우크라이나 전쟁 당시 긴박한 전시 상황에 대비해 Log4j 방어 등 보안 위협 대응 워크플로우를 직접 설계하며, 시스템의 항시성과 완결성(Communication Loss Zero)에 대한 극도의 책임감을 배웠습니다.",
      stack: ["Security Operations", "Network Monitoring", "Threat Detection", "Incident Response"], 
      outcomes: ["Log4j 등 제로데이 취약점 방어 및 무중단 군사 작전 지원", "해군참모총장상 수상 (2022.12.06)", "해군사이버작전센터장상 수상 (2023.01.16)"],
      logo: "/media/cyber_op_logo.svg",
      visual: { src: "/media/navy_cert_dashboard.png", alt: "NCOC Cyber Operations Dashboard" }
    },
    { 
      id: "Offroad Bokbunja", group: 3, val: 25, 
      role: "리드 연구원", period: "2023 - 2024", 
      hook: "시뮬레이션은 로봇 지능이 현실의 가혹한 환경을 만나기 전에 실수하며 배울 수 있는 완벽한 공간이 되었습니다.",
      summary: "농업 환경은 정형화된 도로와 달리 노이즈와 변수가 극도로 많은 비정형(Off-road) 환경입니다. 이러한 현실의 물리적 한계를 극복하기 위해 Unity 기반의 오프로드 강화학습 시뮬레이션 환경을 먼저 구축하고, 여기서 학습된 지능을 실제 복분자 수확 보조 로봇으로 전이(Sim2Real)시키는 연구를 주도했습니다.",
      desc: "자율주행 및 농업용 수확 보조 로봇 Sim-to-Real 배포.", 
      stack: ["Unity", "Reinforcement Learning", "YOLO", "LiDAR", "ROS2"], 
      outcomes: ["오프로드 강화학습을 위한 독자적인 Unity 시뮬레이션 환경 구축 완료", "실제 고창 복분자 농장 환경에서 YOLO 및 LiDAR 기반 자율주행 테스트 성공", "KIIT 대학생논문경진대회 우수논문상(금상) 수상"] 
    },
    { 
      id: "2stepED & NAACL 2025", group: 3, val: 25, 
      role: "연구 파이프라인 설계 및 실험 (공동 2저자)", period: "2024 - 2025", github: "https://github.com/Jun0zo/2stepED", href: "https://aclanthology.org/2025.findings-naacl.292/",
      hook: "인간의 창의성이라는 추상적 개념을 기계가 평가하게 만드는 연구 파이프라인.",
      summary: "인코더 사전학습, 임베딩 추출, 디코더 미세조정을 중심으로 하는 한국어 에세이 창의성 자동 평가 모델 'R2C(Representation-to-Creativity)' 파이프라인을 설계했습니다. 단순히 모델을 만드는 것에 그치지 않고, 연구의 구조 자체가 재사용 가능한 시스템 인프라가 되도록 구현했습니다. 이 연구는 자연어처리 최고 권위 학회인 NAACL 2025에 채택되었습니다.",
      desc: "한국어 에세이 창의성 평가를 위한 2단계 언어 파이프라인 및 NAACL 논문.", 
      stack: ["Python", "PyTorch", "Transformers", "NLP", "Long-context Modeling"], 
      outcomes: ["한국어 에세이 데이터에 대한 Long-context 인코더 비교 실험 설계 및 검증", "Findings of ACL: NAACL 2025 학회 논문 출판 (2저자)"],
      visual: { src: "/media/2steped-distribution.png", alt: "2stepED Score Distribution" },
      logo: "/media/naacl_logo.png"
    },
    { 
      id: "Purdue Univ. Privacy AI", group: 3, val: 25, 
      role: "Visiting Researcher (Team Leader)", period: "2024.03 - 2024.06", 
      hook: "로봇 지능이 현실 세계에 배포될 때 발생하는 프라이버시 충돌의 해결책을 설계합니다.",
      summary: "퍼듀 대학교 방문연구 당시, 다국적 연구원들로 구성된 팀의 리더를 맡아 드론 촬영 영상의 프라이버시 침해 수준을 AI로 자동 평가하고 정량화하는 연구 프로젝트를 주도했습니다. 비전 데이터에 대한 사생활 침해 평가 알고리즘을 설계하며, 지능형 로봇이 인간의 생활 공간에 안전하게 이식되기 위한 신뢰성(Trustworthy AI) 기준을 확립했습니다.",
      desc: "드론 영상 내 프라이버시 평가 AI 연구 프로젝트 팀장.", 
      stack: ["Computer Vision", "Privacy-Preserving AI", "Image Quality Assessment", "Drone"], 
      outcomes: ["국제적 협업 환경에서 프라이버시 AI 연구 방향성 설정 및 논문 작성 총괄"],
      logo: "/media/purdue_logo.png"
    },
    { 
      id: "InsightFlow", group: 3, val: 25, 
      role: "프로덕트 포지셔닝 및 워크플로우 설계", period: "2026", github: "https://github.com/Jun0zo/insight-flow",
      hook: "AI는 단순한 기능 추가가 아니라 워크플로우 전체를 소유할 때 진정한 가치를 갖습니다.",
      summary: "한국어 특화 정성조사(In-depth Interview)를 돕는 AI 네이티브 인터뷰 엔진입니다. 응답자의 모호한 답변 속에서 숨은 의도와 맥락을 파악하기 위해, 프로젝트 생성 - 설문 설계 - 응답자 흐름 제어 - 전사 및 인사이트 분석까지 단일 시스템으로 엮어내는 풀스택 아키텍처를 설계했습니다.",
      desc: "질적 연구를 위한 워크플로우 중심의 AI 인터뷰 엔진.", 
      stack: ["Next.js", "TypeScript", "Supabase", "LLM APIs", "UX Architecture"], 
      outcomes: ["연구자-응답자 간의 맥락 유실을 막는 프로젝트-설문-분석 단일 워크플로우 구현", "Supabase 기반의 안전하고 확장성 있는 풀스택 애플리케이션 아키텍처 설계"] 
    },
    { 
      id: "Snappo", group: 3, val: 25, 
      role: "프로덕트 컨셉 및 회수 흐름 설계", period: "2025 - 2026", github: "https://github.com/Astrobear-Lab/Snappo",
      hook: "어떤 프로덕트는 저장 공간에서 시작하지만, 이 프로덕트는 기억, 소유권, 그리고 회수(Recall)에서 시작했습니다.",
      summary: "기존의 갤러리 중심 소유권 개념을 탈피하여, 6자리 코드를 통해서만 특정 기억(사진)을 회수할 수 있는 사진 공유 플랫폼을 구축했습니다. 사진을 찍는 자와 찍히는 자(피사체) 간의 감정적 상호작용과 역할 흐름을 가벼운 소비자 UX 디자인으로 교차시킨 프로덕트입니다.",
      desc: "코드 기반 기억 회수 사용자 사진 플랫폼.", 
      stack: ["React", "Vite", "Tailwind CSS", "Supabase"], 
      outcomes: ["소유권(Ownership) 대신 접근 권한 중심의 코드 기반 회수(Recall) 로직 설계", "감성적 브랜딩과 소비자 친화적인 웹 인터페이스 구현"],
      visual: { src: "/media/snappo-memory-1.jpeg", alt: "Snappo Memory Flow" }
    },
    { 
      id: "TechGraph", group: 3, val: 25, 
      role: "그래프 프로덕트 컨셉 및 데이터 구조 설계", period: "2025", github: "https://github.com/Jun0zo/TechGraph",
      hook: "저는 단순히 정보를 수집하지 않습니다. 관계의 구조를 시각적으로 보여주고자 합니다.",
      summary: "창업자, 투자자, 기업, 스타트업 생태계 구성원 간의 복잡한 연결 고리를 한눈에 직관적으로 파악할 수 있는 그래프 네이티브 지식 탐색 플랫폼입니다. 단순한 데이터셋 뷰어를 넘어, Neo4j 기반의 데이터 씽킹과 우주를 유영하는 듯한 세련된 프로덕트 애니메이션 언어를 결합하여 생태계 발견의 경험을 극대화했습니다.",
      desc: "스타트업 생태계 시각화를 위한 그래프 지식 플랫폼.", 
      stack: ["React", "Neo4j", "Firebase", "vis.js"], 
      outcomes: ["엔티티 간의 복잡한 관계 모델링 및 Neo4j 그래프 데이터베이스 설계", "Vis.js 기반의 뛰어난 탄성 물리 엔진이 적용된 인터랙티브 그래프 UI 구현"],
      visual: { src: "/media/techgraph-logo.png", alt: "TechGraph Logo and Network" }
    },
    { id: "IEEE Access 2021", group: 3, val: 20, role: "Co-author (2nd)", period: "2021.11", desc: "Efficient Sentiment-Aware Web Crawling Methods for Constructing Sentiment Dictionary.", summary: "대규모 웹 데이터를 크롤링하여 감성 사전을 구축하는 감성 인식 웹 크롤링 파이프라인 알고리즘을 제안한 SCIE 저널 논문입니다. 베이스라인 모델 비교 구현 및 실험 검증을 담당했습니다.", stack: ["Web Crawling", "Data Mining", "Sentiment Analysis"], outcomes: ["IEEE Access (IF 3.745) 저널 게재"], logo: "/media/ieee_logo.svg", href: "https://ieeexplore.ieee.org/document/9620107" },
    { id: "Journal of KIIT 2021", group: 3, val: 20, role: "First Author", period: "2021.06", desc: "Subtitle Automatic Extraction System for Short-form Contents.", summary: "컴퓨터 비전을 활용해 영상 속 숏폼 콘텐츠의 자막을 자동으로 분류하고 추출하는 시스템을 설계했습니다. 새로운 아이디어를 검증 가능한 학술적 결과물로 이끌어내는 연구의 전체 사이클을 처음으로 주도한 연구입니다.", stack: ["Computer Vision", "OCR", "Data Extraction"], outcomes: ["한국정보기술학회논문지(KCI) 게재", "제32회 과학기술우수논문상 수상 및 특허 등록"], logo: "/media/kiit_logo.png", href: "https://doi.org/10.14801/jkiit.2021.19.6.29" },
    { id: "openfolio", group: 3, val: 20, role: "메인테이너", period: "2025", desc: "오픈소스 기반 포트폴리오 관리 시스템.", hook: "포트폴리오는 정적인 문서가 아니라 계속해서 살아 움직이는 시스템입니다.", summary: "개발자들이 자신의 작업물을 템플릿화하고 코드 기반으로 자산화할 수 있도록 돕는 오픈소스 포트폴리오 관리 프레임워크를 개발했습니다.", stack: ["Open Source", "Next.js", "React"], outcomes: ["개발자 커뮤니티를 위한 재사용 가능한 오픈소스 포트폴리오 템플릿 구축 완료"] },
    { id: "PromptAES", group: 3, val: 20, role: "Researcher", period: "2024", desc: "프롬프트 기반 에세이 자동 평가 모델 연구.", hook: "LLM이 파인튜닝 없이도 에세이를 공정하게 채점할 수 있을까요?", summary: "교육 콘텐츠를 비용 효율적으로 평가하기 위해, 대형 언어 모델의 파인튜닝(Fine-tuning)을 거치지 않고 오직 정교한 프롬프트 엔지니어링만으로 에세이를 채점하는 평가 자동화 파이프라인 모델을 연구했습니다.", stack: ["LLM", "Prompt Engineering", "Python"], outcomes: ["파인튜닝 의존성을 제거한 자동 에세이 채점 파이프라인 구축"] },
    
    // --- Group 4: Tech Stack & Skills (Gray, Small) ---
    { id: "Sim2Real", group: 4, val: 15, role: "Core Skill", desc: "가상 시뮬레이션 환경에서 훈련된 로봇 지능을 센서 노이즈와 물리적 변수가 극심한 현실 세계의 하드웨어에 손실 없이 이식하는 최적화 기법입니다." },
    { id: "RL / AI", group: 4, val: 15, role: "Core Skill", desc: "주어진 제약 조건 속에서 최적의 정책을 학습하는 강화학습(Reinforcement Learning) 및 자연어/비전 데이터를 처리하는 대규모 트랜스포머 아키텍처 모델링 역량입니다." },
    { id: "Next.js & React", group: 4, val: 15, role: "Core Skill", desc: "웹 기반의 복잡한 인터랙티브 UI와 워크플로우를 컴포넌트 단위로 구조화하고 상태를 관리하는 모던 프론트엔드 및 풀스택 프로덕트 개발 기술입니다." },
    { id: "Neo4j", group: 4, val: 15, role: "Core Skill", desc: "단순한 테이블 데이터가 아닌, 엔티티(Entity) 간의 복잡한 연결 고리와 관계의 맥락(Context)을 그대로 보존하고 탐색할 수 있게 해주는 그래프 데이터베이스 설계 역량입니다." },
    { id: "Unity / Physics", group: 4, val: 15, role: "Core Skill", desc: "로봇 지능을 훈련시키기 위해 물리 법칙과 환경 변수가 정교하게 반영된 3D 가상 시뮬레이터(디지털 트윈)를 구축하는 엔진 활용 기술입니다." },
    { id: "Supabase", group: 4, val: 15, role: "Core Skill", desc: "인증, 실시간 데이터베이스 연동 및 스토리지 관리를 빠르고 안전하게 처리하여 AI 프로덕트 시스템의 백엔드 인프라를 지탱하는 서버리스 기술입니다." },
    { id: "PyTorch / Python", group: 4, val: 15, role: "Core Skill", desc: "복잡한 텐서 연산을 통해 AI 모델을 밑바닥부터 학습시키고, 데이터 파이프라인과 백엔드 추론 로직을 엮어내는 연구/개발의 기본 언어입니다." },
    { id: "WMS / SAP", group: 4, val: 12, role: "Core Skill", desc: "실제 거대한 물류 센터가 움직이는 두뇌 역할을 하는 전사적 자원 관리(ERP) 및 창고 관리 시스템의 아키텍처와 운영 병목(SOP)에 대한 실무적 이해입니다." }
  ],
  links: [
    { source: "Operational Context", target: "Context First" },
    { source: "Robot Intelligence", target: "Intelligence Transfer" },
    { source: "Research Infrastructure", target: "Intelligence Transfer" },
    { source: "Product Systems", target: "Lossless Execution" },
    { source: "Samsung SDS", target: "Operational Context" },
    { source: "Samsung SDS", target: "WMS / SAP" },
    { source: "R.O.K. Navy Cyber Operations Center", target: "Operational Context" },
    { source: "Offroad Bokbunja", target: "Robot Intelligence" },
    { source: "Offroad Bokbunja", target: "Sim2Real" },
    { source: "Offroad Bokbunja", target: "Unity / Physics" },
    { source: "2stepED & NAACL 2025", target: "Research Infrastructure" },
    { source: "2stepED & NAACL 2025", target: "PyTorch / Python" },
    { source: "2stepED & NAACL 2025", target: "RL / AI" },
    { source: "Purdue Univ. Privacy AI", target: "Research Infrastructure" },
    { source: "PromptAES", target: "Research Infrastructure" },
    { source: "InsightFlow", target: "Product Systems" },
    { source: "InsightFlow", target: "Next.js & React" },
    { source: "InsightFlow", target: "Supabase" },
    { source: "Snappo", target: "Product Systems" },
    { source: "Snappo", target: "Next.js & React" },
    { source: "TechGraph", target: "Product Systems" },
    { source: "TechGraph", target: "Neo4j" },
    { source: "TechGraph", target: "Next.js & React" },
    { source: "openfolio", target: "Product Systems" },
    { source: "IEEE Access 2021", target: "Research Infrastructure" },
    { source: "Journal of KIIT 2021", target: "Research Infrastructure" },
    { source: "Sim2Real", target: "Lossless Execution" },
    { source: "RL / AI", target: "Intelligence Transfer" },
    { source: "Neo4j", target: "Context First" }
  ]
};
