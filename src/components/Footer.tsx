import { Link } from 'react-router-dom';
import { Stethoscope, Heart } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'About Us',
      links: [
        { name: 'Our Mission', href: '#' },
        { name: 'Team', href: '#' },
        { name: 'Careers', href: '#' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Consultation', href: '/chatbot' },
        { name: 'Diagnostics', href: '/doctors' },
        { name: 'Telemedicine', href: '/abha' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'FAQs', href: '#' },
        { name: 'Contact Us', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Use', href: '#' },
        { name: 'Disclaimer', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Stethoscope className="h-8 w-8 text-primary" />
              <span className="font-poppins text-2xl font-bold text-white">VirtualDoc</span>
            </Link>
            <p className="text-secondary-light text-sm leading-relaxed">
              Your trusted virtual healthcare companion, providing accessible medical guidance and connecting you to healthcare professionals.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-secondary-light hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-light/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-light text-sm">
              © 2025 Virtual Doctor Assistant
            </p>
            <p className="text-secondary-light text-sm flex items-center mt-2 md:mt-0">
              Made with <Heart className="h-4 w-4 text-emergency mx-1" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;