import React, { useState, useEffect, useRef } from 'react';
import { PageId, AccessibilitySettings } from './types';
import { PERSONAL_INFO } from './data/portfolioData';
import { SkipLink } from './components/SkipLink';
import { AriaLiveRegion } from './components/AriaLiveRegion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { A11yAuditorBanner } from './components/A11yAuditorBanner';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { ContactPage } from './pages/ContactPage';
import { TodoPage } from './pages/TodoPage';
import { WeatherPage } from './pages/WeatherPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme-mode');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [liveAnnouncement, setLiveAnnouncement] = useState<string>(
    'Portfolio loaded. Use Tab to navigate or press Alt + A for accessibility settings.'
  );
  const [a11yModalOpen, setA11yModalOpen] = useState(false);

  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSize: 'normal',
    reducedMotion: false,
    highlightFocus: false,
    showSemanticOutlines: false,
  });

  const mainContentRef = useRef<HTMLElement>(null);

  // Sync data-theme attribute on <html> element for CSS variable cascading
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark');
      localStorage.setItem('theme-mode', 'dark');
    } else {
      root.removeAttribute('data-theme');
      root.classList.remove('dark');
      localStorage.setItem('theme-mode', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      setLiveAnnouncement(`Color theme changed to ${next ? 'Dark Mode' : 'Light Mode'}.`);
      return next;
    });
  };

  // Sync with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['home', 'about', 'experience', 'projects', 'certifications', 'todo', 'weather', 'contact'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document title and meta description dynamically for SEO & Accessibility
  useEffect(() => {
    const pageTitles: Record<PageId, string> = {
      home: `${PERSONAL_INFO.name} — AI & Data Science Engineer Portfolio`,
      about: `About & Academic Education — ${PERSONAL_INFO.name}`,
      experience: `Internships & Practical Experience — ${PERSONAL_INFO.name}`,
      projects: `Featured Software & AI Projects — ${PERSONAL_INFO.name}`,
      certifications: `Certifications & Honors — ${PERSONAL_INFO.name}`,
      todo: `Client-Side To-Do Application (Vanilla JS) — ${PERSONAL_INFO.name}`,
      weather: `Real-Time Weather Dashboard (REST API & Async JS) — ${PERSONAL_INFO.name}`,
      contact: `Contact & Professional Inquiry — ${PERSONAL_INFO.name}`,
    };

    const pageDescriptions: Record<PageId, string> = {
      home: `${PERSONAL_INFO.name} - AI & Data Science portfolio. B.Tech 3rd year at Velammal College of Engineering & Technology, CGPA 8.84. Advanced CSS3, CSS Grid & Flexbox architecture.`,
      about: `Academic background, formal education milestones, and technical skill inventory for ${PERSONAL_INFO.name}.`,
      experience: `Data science internships at Pydun Technology and SK Tech Forage. Machine learning, Power BI, and data pipelines.`,
      projects: `Civic AI and full-stack software architectures: SchemeSathiAI, Campus Echo, and accessible web systems.`,
      certifications: `Accredited certifications from Stanford Online, prompt engineering competition awards, and technical symposiums.`,
      todo: `Vanilla JavaScript To-Do application featuring client-side state management, structured JSON window.localStorage persistence, and dynamic DOM manipulation.`,
      weather: `Real-time weather dashboard powered by modern asynchronous JavaScript, browser Fetch API, and global meteorological REST web services.`,
      contact: `Direct accessible contact form to reach ${PERSONAL_INFO.name} for Summer 2026 internships and collaboration.`,
    };

    document.title = pageTitles[currentPage];

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageDescriptions[currentPage]);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', pageTitles[currentPage]);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', pageDescriptions[currentPage]);
    }
  }, [currentPage]);

  // Handle page navigation
  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: settings.reducedMotion ? 'auto' : 'smooth' });

    const readableNames: Record<PageId, string> = {
      home: 'Overview page',
      about: 'About and Education page',
      experience: 'Internships and Experience page',
      projects: 'Featured Projects page',
      certifications: 'Certifications and Honors page',
      todo: 'Vanilla JavaScript To-Do Application page',
      weather: 'Real-Time Weather Dashboard page',
      contact: 'Accessible Contact Form page',
    };

    setLiveAnnouncement(`Navigated to ${readableNames[page]}.`);

    setTimeout(() => {
      if (mainContentRef.current) {
        mainContentRef.current.focus();
      }
    }, 100);
  };

  // Keyboard shortcut listener (Alt + 1..8, Alt + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        if (e.key === '1') {
          e.preventDefault();
          navigateTo('home');
        } else if (e.key === '2') {
          e.preventDefault();
          navigateTo('about');
        } else if (e.key === '3') {
          e.preventDefault();
          navigateTo('experience');
        } else if (e.key === '4') {
          e.preventDefault();
          navigateTo('projects');
        } else if (e.key === '5') {
          e.preventDefault();
          navigateTo('certifications');
        } else if (e.key === '6') {
          e.preventDefault();
          navigateTo('todo');
        } else if (e.key === '7') {
          e.preventDefault();
          navigateTo('weather');
        } else if (e.key === '8') {
          e.preventDefault();
          navigateTo('contact');
        } else if (e.key.toLowerCase() === 'w') {
          e.preventDefault();
          navigateTo('weather');
        } else if (e.key.toLowerCase() === 'a') {
          e.preventDefault();
          setA11yModalOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settings.reducedMotion]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      let notice = 'Accessibility preferences updated.';
      if (newSettings.highContrast !== undefined) {
        notice = `High contrast mode turned ${newSettings.highContrast ? 'ON' : 'OFF'}.`;
      } else if (newSettings.fontSize !== undefined) {
        notice = `Text size set to ${newSettings.fontSize}.`;
      } else if (newSettings.showSemanticOutlines !== undefined) {
        notice = `Semantic HTML outlines inspector turned ${newSettings.showSemanticOutlines ? 'ON' : 'OFF'}.`;
      }
      setLiveAnnouncement(notice);
      return updated;
    });
  };

  const resetSettings = () => {
    setSettings({
      highContrast: false,
      fontSize: 'normal',
      reducedMotion: false,
      highlightFocus: false,
      showSemanticOutlines: false,
    });
    setLiveAnnouncement('Accessibility settings reset to default.');
  };

  // Compose CSS classes based on accessibility toggles
  const rootClasses = [
    'min-h-screen flex flex-col font-sans transition-colors duration-200',
    settings.highContrast ? 'theme-high-contrast' : '',
    settings.fontSize === 'large' ? 'font-size-large' : settings.fontSize === 'xlarge' ? 'font-size-xlarge' : '',
    settings.highlightFocus ? 'focus-enhanced' : '',
    settings.reducedMotion ? 'force-reduced-motion' : '',
    settings.showSemanticOutlines ? 'show-semantic-outlines' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div id="app-root-container" className={rootClasses}>
      {/* 1. Skip to Main Content & Navigation Link (WCAG 2.4.1) */}
      <SkipLink
        onSkipToMain={() => {
          setLiveAnnouncement('Skipped to main content landmark.');
        }}
        onSkipToNav={() => {
          setLiveAnnouncement('Skipped to primary navigation landmark.');
        }}
      />

      {/* 2. ARIA Live Region for screen reader announcements (WCAG 4.1.3) */}
      <AriaLiveRegion message={liveAnnouncement} />

      {/* 3. Top Auditor & Compliance Status Bar */}
      <A11yAuditorBanner
        settings={settings}
        onToggleSemanticOutlines={() =>
          updateSettings({ showSemanticOutlines: !settings.showSemanticOutlines })
        }
        onOpenSettings={() => setA11yModalOpen(true)}
      />

      {/* 4. Semantic <header> (role="banner") with <nav> */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        onToggleA11yModal={() => setA11yModalOpen(true)}
        accessibilitySettingsOpen={a11yModalOpen}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* 5. Semantic <main> landmark */}
      <main
        id="main-content"
        ref={mainContentRef}
        role="main"
        tabIndex={-1}
        aria-label="Main content container"
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 focus:outline-none"
      >
        {currentPage === 'home' && (
          <HomePage onNavigate={navigateTo} onAnnounce={setLiveAnnouncement} />
        )}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'experience' && <ExperiencePage />}
        {currentPage === 'projects' && <ProjectsPage />}
        {currentPage === 'certifications' && <CertificationsPage />}
        {currentPage === 'todo' && <TodoPage />}
        {currentPage === 'weather' && <WeatherPage />}
        {currentPage === 'contact' && (
          <ContactPage onAnnounce={setLiveAnnouncement} />
        )}
      </main>

      {/* 6. Semantic <footer> (role="contentinfo") */}
      <Footer onNavigate={navigateTo} />

      {/* 7. Accessibility Dialog Modal */}
      <AccessibilityToolbar
        isOpen={a11yModalOpen}
        onClose={() => setA11yModalOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        onResetSettings={resetSettings}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}
