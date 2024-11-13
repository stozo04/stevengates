import { Facebook, Linkedin, Twitter } from 'lucide-react';
import React from 'react';

interface ModalProps {
  darkMode: boolean;
  onClose: () => void;
}

const SocialModal = ({ darkMode, onClose }: ModalProps) => {
  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://x.com/sgates2011',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/gates-steven',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/StOzO',
    },
  ];

  return (
    <div
      className={`
        max-w-md w-full p-6 rounded-xl shadow-lg transform transition-all duration-300
        animate-slide-up backdrop-blur-sm
        ${darkMode ? 'bg-gray-800/90 text-white' : 'bg-white/90 text-gray-900'}
      `}
      onClick={e => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
      <div className="space-y-4">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center gap-3 p-4 rounded-lg transition-colors duration-300
              ${darkMode 
                ? 'hover:bg-gray-700/50' 
                : 'hover:bg-gray-100/50'
              }
            `}
          >
            <social.icon className="w-6 h-6" />
            <span className="font-medium">{social.name}</span>
          </a>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg font-semibold bg-gray-500 
                    text-white transition-colors duration-300 hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ResumeModal = ({ darkMode, onClose }: ModalProps) => {
  return (
    <div
      className={`
        max-w-4xl w-full p-6 rounded-xl shadow-lg transform transition-all duration-300
        animate-slide-up backdrop-blur-sm
        ${darkMode ? 'bg-gray-800/90 text-white' : 'bg-white/90 text-gray-900'}
      `}
      onClick={e => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold mb-6">My Resume</h2>
      <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden" style={{ height: '60vh' }}>
        <iframe
          src="/resume.pdf#view=FitH"
          className="w-full h-full"
          style={{ border: 'none' }}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <a
          href="/resume.pdf"
          download="Steven_Gates_Resume.pdf"
          className={`
            px-4 py-2 rounded-lg font-semibold transition-colors duration-300
            ${darkMode
              ? 'bg-white text-gray-900 hover:bg-gray-200'
              : 'bg-gray-900 text-white hover:bg-gray-800'
            }
          `}
        >
          Download Resume
        </a>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg font-semibold bg-gray-500 
                    text-white transition-colors duration-300 hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export { SocialModal, ResumeModal };