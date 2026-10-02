import React from 'react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, Github, Linkedin, CheckCircle2, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const header = document.getElementById('site-header');
    if (header) {
      header.focus();
    }
  };

  return (
    <footer
      id="site-footer"
      role="contentinfo"
      aria-label="Site footer and contact information"
      className="bg-[var(--surface-color)] text-[var(--muted-text-color)] border-t border-[var(--border-color)] transition-colors duration-200 mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="portfolio-grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Identity & Summary */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[var(--primary-color)] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-xs">
                TH
              </span>
              <span className="text-lg font-bold text-[var(--heading-color)] tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--muted-text-color)] mb-4 leading-relaxed">
              3rd Year B.Tech in Artificial Intelligence &amp; Data Science at Velammal College of Engineering &amp; Technology. Specializing in advanced machine learning, predictive pipelines, and semantic accessibility.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>WCAG 2.2 AA &amp; AAA Architecture</span>
            </div>
          </div>

          {/* Column 2: Semantic Site Map Navigation */}
          <div>
            <h2 id="footer-navigation-heading" className="text-xs font-bold text-[var(--heading-color)] uppercase tracking-wider mb-4">
              Site Navigation
            </h2>
            <nav aria-labelledby="footer-navigation-heading">
              <ul className="space-y-2 text-xs sm:text-sm list-none p-0 m-0">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('home')}
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-md py-0.5"
                  >
                    Home Overview
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('about')}
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-md py-0.5"
                  >
                    About &amp; Education
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('experience')}
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-md py-0.5"
                  >
                    Internships &amp; Experience
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('projects')}
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-md py-0.5"
                  >
                    Featured Projects
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('certifications')}
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-md py-0.5"
                  >
                    Certifications &amp; Awards
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('todo')}
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-md py-0.5"
                  >
                    To-Do List (JS App)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('weather')}
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-md py-0.5"
                  >
                    Weather Dashboard (REST API)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-md py-0.5"
                  >
                    Accessible Contact Form
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 3: Semantic Address Block */}
          <div>
            <h2 id="footer-contact-heading" className="text-xs font-bold text-[var(--heading-color)] uppercase tracking-wider mb-4">
              Direct Contact
            </h2>
            <address className="not-italic text-xs sm:text-sm space-y-3" aria-labelledby="footer-contact-heading">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--primary-color)] mt-0.5 shrink-0" aria-hidden="true" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--primary-color)] shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-[var(--primary-color)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-md py-0.5"
                  aria-label={`Send email to ${PERSONAL_INFO.email}`}
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--primary-color)] shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className="hover:text-[var(--primary-color)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-md py-0.5"
                  aria-label={`Call phone number ${PERSONAL_INFO.phone}`}
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
            </address>
          </div>

          {/* Column 4: Professional Profiles & Back to Top */}
          <div>
            <h2 id="footer-social-heading" className="text-xs font-bold text-[var(--heading-color)] uppercase tracking-wider mb-4">
              Connect Online
            </h2>
            <div className="flex flex-col gap-2 mb-5">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors p-2 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-color)] hover:border-[var(--primary-color)] focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
                aria-label="Thalal Hasmi's GitHub Profile (opens in new tab)"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span>github.com/thalalhasmi</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors p-2 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-color)] hover:border-[var(--primary-color)] focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
                aria-label="Thalal Hasmi's LinkedIn Profile (opens in new tab)"
              >
                <Linkedin className="w-4 h-4 text-sky-500" aria-hidden="true" />
                <span>LinkedIn Profile</span>
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[var(--text-color)] bg-[var(--surface-subtle)] hover:bg-[var(--background-secondary)] rounded-xl border border-[var(--border-color)] focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] transition-colors"
              aria-label="Scroll back to top of the page"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[var(--primary-color)]" aria-hidden="true" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Semantic Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--subtle-text-color)]">
          <p>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Advanced CSS3 &amp; Responsive Architecture.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span>CSS Grid &amp; Flexbox</span>
            <span aria-hidden="true">&bull;</span>
            <span>Mobile-First</span>
            <span aria-hidden="true">&bull;</span>
            <span>Zero Horizontal Overflow</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
