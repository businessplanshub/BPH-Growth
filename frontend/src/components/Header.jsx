import { useState, useEffect, useRef } from 'react'
import logo from '../assets/Logo.svg'

function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null)
  const mobileMenuRef = useRef(null)

  const toggleMobileSection = (section) => {
    setMobileExpandedSection(mobileExpandedSection === section ? null : section)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileMenuOpen])

  return (
    <header className="bg-[#00273f] px-8 lg:py-2 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Navigation grouped together */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src={logo} alt="BPH Business + Plan Hub" className="h-10 lg:h-12 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Services Dropdown */}
            <div
              className="relative z-50"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-white flex items-center gap-2 hover:text-gray-300 py-6">
                Services
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 pt-2 animate-fadeIn z-50">
                  <div className="w-[800px] bg-[#003d5c] rounded-2xl shadow-xl p-8">
                    <div className="grid grid-cols-2 gap-8">
                      {/* BPH Growth Column */}
                      <div>
                        <a href="/#services" className="text-[#0077cc] font-bold mb-4 text-lg block hover:text-[#60a5fa] transition-colors">
                          BPH Growth
                        </a>
                        <ul className="space-y-2 mt-4">
                          <li><a href="/#services" className="text-white py-1 block hover:text-[#60a5fa] transition-colors">Business Consultation</a></li>
                          <li><a href="/#services" className="text-white py-1 block hover:text-[#60a5fa] transition-colors">Strategic Planning</a></li>
                          <li><a href="/#services" className="text-white py-1 block hover:text-[#60a5fa] transition-colors">AI Consulting & Digital Transformation</a></li>
                          <li><a href="/#services" className="text-white py-1 block hover:text-[#60a5fa] transition-colors">Business Clinic & Leadership Development</a></li>
                        </ul>
                      </div>

                      {/* BPH Growth Fund Column */}
                      <div>
                        <a href="/bph-funds" className="text-[#0077cc] font-bold mb-4 text-lg block hover:text-[#60a5fa] transition-colors">
                          BPH Growth Fund
                        </a>
                        <div className="grid grid-cols-2 gap-10 mt-4">
                          <div>
                            <p className="text-white font-semibold mb-2">Debt Consolidation</p>
                            <ul className="space-y-2">
                              <li><a href="/bph-funds" className="text-white py-1 block hover:text-[#60a5fa] transition-colors">Personal Loans</a></li>
                              <li><a href="/bph-funds" className="text-white py-1 block hover:text-[#60a5fa] transition-colors">Business Loans</a></li>
                              <li><a href="/bph-funds" className="text-white py-1 block hover:text-[#60a5fa] transition-colors">Asset Loans</a></li>
                            </ul>
                          </div>
                          <div>
                            <p className="text-white font-semibold mb-2">Equity Financing</p>
                            <ul className="space-y-2">
                              <li><a href="/bph-funds" className="text-white py-1 block hover:text-[#60a5fa] transition-colors">Real Estate</a></li>
                              <li><a href="/bph-funds" className="text-white py-1 block hover:text-[#60a5fa] transition-colors">Angel Investment</a></li>
                              <li><a href="/bph-funds" className="text-white py-1 block hover:text-[#60a5fa] transition-colors">Venture Capital</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div
              className="relative z-50"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-white flex items-center gap-2 hover:text-gray-300 py-6">
                Company
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {activeDropdown === 'company' && (
                <div className="absolute top-full left-0 pt-2 animate-fadeIn z-50">
                  <div className="w-[300px] bg-[#003d5c] rounded-2xl shadow-xl p-6">
                    <ul className="space-y-3">
                      <li>
                        <a href="/#about" className="text-white hover:text-[#60a5fa] block py-2">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a href="/#faq" className="text-white hover:text-[#60a5fa] block py-2">
                          FAQ
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Desktop Contact Button */}
        <a href="https://calendly.com/businessplanshub/45mins?back=1&month=2025-10" target="_blank" rel="noopener noreferrer" className="hidden lg:block">
          <button className="bg-[#005c9e] text-white px-6 py-2 rounded-full hover:bg-[#0077cc] transition-colors">
            Schedule a Call
          </button>
        </a>

        {/* Mobile Burger Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            // Close Icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Burger Icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="lg:hidden absolute top-full left-0 right-0 bg-[#003d5c] shadow-xl animate-fadeIn">
          <nav className="px-8 py-4">
            {/* Services Section */}
            <div className="border-b border-[#005c9e]/30 pb-4 mb-4">
              <button
                onClick={() => toggleMobileSection('services')}
                className="w-full flex items-center justify-between text-white font-semibold py-2"
              >
                Services
                <svg
                  className={`w-5 h-5 transition-transform ${mobileExpandedSection === 'services' ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {mobileExpandedSection === 'services' && (
                <div className="mt-3 ml-4 space-y-2">
                  <a href="/#services" className="text-gray-300 block py-1" onClick={() => setMobileMenuOpen(false)}>
                    BPH Growth
                  </a>
                  <a href="/bph-funds" className="text-gray-300 block py-1" onClick={() => setMobileMenuOpen(false)}>
                    BPH Growth Fund
                  </a>
                </div>
              )}
            </div>

            {/* Company Section */}
            <div className="border-b border-[#005c9e]/30 pb-4 mb-4">
              <button
                onClick={() => toggleMobileSection('company')}
                className="w-full flex items-center justify-between text-white font-semibold py-2"
              >
                Company
                <svg
                  className={`w-5 h-5 transition-transform ${mobileExpandedSection === 'company' ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {mobileExpandedSection === 'company' && (
                <div className="mt-3 ml-4 space-y-2">
                  <a href="/#about" className="text-gray-300 block py-1" onClick={() => setMobileMenuOpen(false)}>
                    About Us
                  </a>
                  <a href="/#faq" className="text-gray-300 block py-1" onClick={() => setMobileMenuOpen(false)}>
                    FAQ
                  </a>
                </div>
              )}
            </div>

            {/* Schedule Call Button */}
            <div className="pt-2">
              <a
                href="https://calendly.com/businessplanshub/45mins?back=1&month=2025-10"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#005c9e] text-white px-6 py-3 rounded-full text-center hover:bg-[#0077cc] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Schedule a Call
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Fade-in Animation Style */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  )
}

export default Header
