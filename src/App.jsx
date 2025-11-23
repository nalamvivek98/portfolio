import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Cloud, 
  Server, 
  Code, 
  BarChart, 
  GitBranch, 
  Terminal, 
  Cpu, 
  Layers, 
  ExternalLink, 
  Mail, 
  Linkedin, 
  FileText, 
  ChevronDown,
  Menu,
  X,
  Award,
  BookOpen,
  Download
} from 'lucide-react';

// --- Components ---

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-12 text-center px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 tracking-tight">
      {title}
    </h2>
    <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full mb-4"></div>
    {subtitle && <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">{subtitle}</p>}
  </div>
);

const SkillCard = ({ icon: Icon, title, skills }) => (
  <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 bg-slate-900 rounded-lg text-blue-400 group-hover:text-blue-300 transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, idx) => (
        <span key={idx} className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-full border border-slate-600/50">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const TimelineItem = ({ role, company, duration, location, details, type }) => (
  <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-5 md:gap-8 mb-12 last:mb-0 group">
    {/* Line (Mobile) - Hides on last item to prevent dangling line */}
    <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-slate-700 md:hidden group-last:bottom-auto group-last:h-full"></div>
    
    {/* Dot (Mobile) */}
    <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-blue-500 md:hidden ring-4 ring-slate-950"></div>

    {/* Left: Date & Type */}
    <div className="md:col-span-1 md:text-right md:pt-1">
      <p className="text-sm font-semibold text-blue-400 mb-1">{duration}</p>
      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
        {type}
      </span>
    </div>

    {/* Middle: Dot & Line (Desktop) */}
    <div className="hidden md:flex flex-col items-center relative">
      <div className="w-4 h-4 rounded-full bg-blue-500 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)] ring-4 ring-slate-950"></div>
      <div className="flex-grow w-0.5 bg-slate-700 absolute top-4 bottom-[-48px] group-last:hidden"></div>
    </div>

    {/* Right: Content */}
    <div className="md:col-span-3 mt-2 md:mt-0">
      <h3 className="text-xl font-bold text-slate-100 leading-tight">{role}</h3>
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-slate-400 mb-4 mt-1">
        <span className="font-medium text-slate-300 text-sm sm:text-base">{company}</span>
        <span className="hidden sm:inline text-slate-600">•</span>
        <span className="text-sm">{location}</span>
      </div>
      <ul className="space-y-3">
        {details.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/50 flex-shrink-0"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ProjectCard = ({ title, tech, description, link }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-colors group flex flex-col h-full">
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors pr-4">{title}</h3>
        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-400 p-1">
            <ExternalLink size={20} />
          </a>
        )}
      </div>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tech.map((t, i) => (
          <span key={i} className="text-xs font-medium text-blue-300 bg-blue-900/20 px-2 py-1 rounded">
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const NavLink = ({ href, children, onClick }) => (
  <a 
    href={href} 
    onClick={(e) => {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      if(onClick) onClick();
    }}
    className="text-base md:text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors py-3 md:py-2 block md:inline-block border-b md:border-0 border-slate-800/50 md:border-transparent"
  >
    {children}
  </a>
);

// --- Main Application ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled || mobileMenuOpen ? 'bg-slate-950/95 backdrop-blur-md border-slate-800 py-3' : 'bg-transparent border-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-lg md:text-xl font-bold tracking-tighter text-slate-100 flex items-center gap-2 z-50 relative">
            <Database className="text-blue-500" size={24} />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
              Leela Naga Vivek
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <a 
              href="#contact" 
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-blue-900/20"
            >
              Contact Me
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-300 p-2 z-50 relative" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`
          md:hidden fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-40 transition-transform duration-300 ease-in-out flex flex-col pt-24 px-6
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <NavLink href="#about" onClick={() => setMobileMenuOpen(false)}>About</NavLink>
          <NavLink href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</NavLink>
          <NavLink href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</NavLink>
          <NavLink href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</NavLink>
          <NavLink href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
          
          <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col gap-4">
             <a 
              href="/Portfolio/Vivek_Resume.pdf" 
              download="Vivek_Resume.pdf"
              className="w-full py-3 bg-slate-800 text-center rounded-lg font-semibold text-slate-200 flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Download size={18} /> Download Resume
            </a>
            <a 
              href="#contact" 
              className="w-full py-3 bg-blue-600 text-center rounded-lg font-semibold text-white shadow-lg shadow-blue-900/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Me
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[500px] bg-blue-600/10 blur-[80px] md:blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[300px] md:w-[600px] h-[400px] bg-indigo-600/5 blur-[60px] md:blur-[80px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Terminal size={12} /> Data Engineer
          </div>
          
          {/* Adjusted Font size for Mobile */}
          <h1 className="text-4xl md:text-7xl font-bold text-slate-100 mb-6 tracking-tight leading-tight">
            Architecting Scalable <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Data Solutions</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed px-2">
            I transform raw data into enterprise-grade assets. Specialized in Azure Cloud, ETL Orchestration, and High-Performance Data Warehousing.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <a 
              href="#experience" 
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <ChevronDown size={18} /> View Work
            </a>
            <a 
              href="/Vivek_Resume.pdf" 
              download="Vivek_Resume.pdf"
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download Resume
            </a>
          </div>

          {/* Stats / Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 mt-16 md:mt-20 border-t border-slate-800 pt-12 max-w-4xl mx-auto">
            {[
              { label: "Experience", value: "6+ Years" },
              { label: "Specialized DE", value: "4+ Years" },
              { label: "Data Availability", value: "99.9%" },
              { label: "Focus", value: "Azure & ETL" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-slate-100 mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-20 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Technical Arsenal" 
            subtitle="My expertise lies in building robust data architectures using modern cloud technologies and efficient ETL methodologies."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCard 
              icon={Cloud}
              title="Cloud & DevOps" 
              skills={['Azure Fabric', 'Azure Data Factory (ADF)', 'Azure DevOps', 'CI/CD (YAML)', 'Git', 'Bitbucket']}
            />
            <SkillCard 
              icon={Layers}
              title="Data Integration" 
              skills={['SSIS', 'Qlik Replicate', 'Qlik Compose', 'ETL Pipeline Design', 'Data Modeling']}
            />
            <SkillCard 
              icon={Database}
              title="Databases" 
              skills={['Microsoft SQL Server', 'PL/SQL', 'T-SQL', 'Data Warehousing', 'Warehouse Design']}
            />
            <SkillCard 
              icon={BarChart}
              title="BI & Analytics" 
              skills={['Tableau', 'Dashboarding', 'Data Reporting', 'Execution Plans', 'Query Optimization']}
            />
            <SkillCard 
              icon={Code}
              title="Programming" 
              skills={['Python', 'SQL', 'C# / .NET', 'DOM Purify', 'API Integration']}
            />
            <SkillCard 
              icon={Cpu}
              title="Methodologies" 
              skills={['Agile', 'Scrum', 'Kanban', 'SDLC', 'Performance Tuning']}
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionTitle 
            title="Professional Journey" 
            subtitle="A track record of engineering scalable data pipelines and optimizing enterprise systems."
          />

          <div className="mt-12">
            <TimelineItem 
              role="Data Engineer"
              company="Wolters Kluwer ELM Solutions"
              location="Chennai, India"
              duration="Oct 2022 – Present"
              type="Data Engineering"
              details={[
                "Engineered and maintained enterprise-grade data reporting solutions using SQL Server and SSIS, achieving 99.9% data availability for business intelligence teams.",
                "Orchestrated complex data replication and extraction workflows using Qlik Replicate and Qlik Compose, streamlining data availability across heterogeneous systems.",
                "Monitored and optimized execution plans and T-SQL queries, significantly reducing latency and maximizing system throughput.",
                "Implemented YAML-based Azure DevOps pipelines for staging and production deployments, ensuring stable releases.",
                "Spearheaded critical Tableau dashboard development to derive actionable business insights."
              ]}
            />

            <TimelineItem 
              role="System Engineer"
              company="Tata Consultancy Services"
              location="Hyderabad, India"
              duration="May 2019 – Oct 2022"
              type="Software Engineering"
              details={[
                "Developed backend application logic using C#/.NET, focusing on system stability and workflow automation for enterprise clients.",
                "Enhanced system response times through performance engineering and Sitecore optimization.",
                "Identified and remediated security vulnerabilities (XSS) by implementing rigorous sanitization protocols.",
                "Conducted comprehensive testing to validate performance metrics and security compliance prior to deployment."
              ]}
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-20 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Featured Projects" 
            subtitle="Leveraging data and AI to build intelligent solutions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ProjectCard 
              title="AI Object Detection & Voice Assist"
              description="Designed a real-time object recognition system processing visual data streams. Integrated YOLO algorithm with COCO dataset to identify 80+ object types, transforming visual inputs into auditory feedback for accessibility."
              tech={['Python', 'YOLO', 'Computer Vision', 'Data Processing']}
            />
            <ProjectCard 
              title="Doctor Prescription Digitization"
              description="Developed a data utility to digitize unstructured prescription text into structured QR codes. This enabled instant data retrieval via a secure web platform, improving medical data accessibility."
              tech={['Python', 'Data Encoding', 'Web Security', 'Automation']}
            />
          </div>
        </div>
      </section>

      {/* Education & Certs */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-blue-500" size={24} />
                <h3 className="text-2xl font-bold text-slate-100">Education</h3>
              </div>
              <div className="bg-slate-800/30 border border-slate-700 p-6 rounded-xl">
                <h4 className="text-lg font-bold text-white">B.Tech, Computer Science & Engineering</h4>
                <p className="text-blue-400 mb-2">VR Siddhartha Engineering College</p>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Graduated 2019</span>
                  <span className="font-semibold text-slate-300">CGPA: 8.45/10</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Award className="text-blue-500" size={24} />
                <h3 className="text-2xl font-bold text-slate-100">Certifications</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Microsoft Certified: Azure Fundamentals",
                  "University of Michigan: Python Data Structures",
                  "Cisco Certified: Introduction to Cybersecurity",
                  "Ranked Top 5% in NPTEL Data Structures"
                ].map((cert, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-800/50">
                    <div className="mt-1 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                    <span className="text-slate-300 text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-slate-950 border-t border-slate-800 pt-20 pb-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-6">Ready to Optimize Your Data Infrastructure?</h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto">
            I'm currently available for Data Engineering roles. Let's discuss how I can help build scalable pipelines for your organization.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-16">
            <a 
              href="mailto:nalamvivek98@gmail.com"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all"
            >
              <Mail size={18} /> Send Email
            </a>
            <a 
              href="https://www.linkedin.com/in/vivek-nalam-45846012b/"
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-full font-semibold transition-all"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-4">
            <p>© {new Date().getFullYear()} Leela Naga Vivek. All rights reserved.</p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
              <a 
                href="/Vivek_Resume.pdf" 
                download="Vivek_Resume.pdf"
                className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors"
              >
                <FileText size={14} /> Download Resume
              </a>
              <span>Hyderabad, India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}