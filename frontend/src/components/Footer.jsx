import facebookIcon from '../assets/icons/Facebook.svg'
import linkedinIcon from '../assets/icons/LinkedIn.svg'
import instagramIcon from '../assets/icons/Instagram.svg'
import logo from '../assets/Logo.svg'

function Footer() {
  return (
    <footer className="bg-[#00273f] relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4">
          {/* Logo and Description */}
          <div className="lg:col-span-4">
            <a href="/" className="block mb-4">
              <img src={logo} alt="BPH Business + Plan Hub" className="h-10 lg:h-12 w-auto" />
            </a>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              The go-to support system for the SME/Start-up community in Nigeria, helping them achieve scale and growth.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/businessplans.hub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#005c9e]/20 hover:bg-[#005c9e] transition-all duration-300"
              >
                <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/thebusinessplanhub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#005c9e]/20 hover:bg-[#005c9e] transition-all duration-300"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/businessplans.hub/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#005c9e]/20 hover:bg-[#005c9e] transition-all duration-300"
              >
                <img src={instagramIcon} alt="Instagram" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-[#0077cc] transition-colors duration-300">Home</a>
              </li>
              <li>
                <a href="/#about" className="text-gray-400 hover:text-[#0077cc] transition-colors duration-300">About Us</a>
              </li>
              <li>
                <a href="/#services" className="text-gray-400 hover:text-[#0077cc] transition-colors duration-300">Our Services</a>
              </li>
              <li>
                <a href="/#faq" className="text-gray-400 hover:text-[#0077cc] transition-colors duration-300">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-bold mb-4 text-white">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="/#services" className="text-gray-400 text-sm hover:text-[#0077cc] transition-colors duration-300">Strategic Planning & Business Consulting</a>
              </li>
              <li>
                <a href="/#services" className="text-gray-400 text-sm hover:text-[#0077cc] transition-colors duration-300">AI Consulting & Digital Transformation</a>
              </li>
              <li>
                <a href="/bph-funds" className="text-gray-400 text-sm hover:text-[#0077cc] transition-colors duration-300">Personal, Business & Asset Financing Loans</a>
              </li>
              <li>
                <a href="/bph-funds" className="text-gray-400 text-sm hover:text-[#0077cc] transition-colors duration-300">Capital Access</a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-bold mb-4 text-white">Contact us</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <p className="wrap-break-word">
                <a href="mailto:support@bphgrowth.com" className="hover:text-[#0077cc] transition-colors duration-300">
                  support@bphgrowth.com
                </a>
              </p>
              <p>
                <a href="tel:+2347080096148" className="hover:text-[#0077cc] transition-colors duration-300">
                  +234 708 009 6148
                </a>
              </p>
              <div className="pt-4">
                <a
                  href="https://calendly.com/businessplanshub/45mins?back=1&month=2025-10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#005c9e] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#0077cc] transition-colors duration-300"
                >
                  Schedule a Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[#005c9e]/20 relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-4 text-center">
          <p className="text-gray-500 text-sm">© 2025 BPH Growth. All rights reserved.</p>
        </div>
      </div>

      {/* Large Brand Text - Laravel Style */}
      <div className="relative z-0 overflow-hidden select-none pointer-events-none">
        <div className="text-center pb-8 lg:pb-0 lg:-mt-16">
          <span
            className="text-[15vw] lg:text-[18vw] font-black tracking-tighter leading-none text-transparent"
            style={{
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.15)',
              textStroke: '1px rgba(255, 255, 255, 0.15)'
            }}
          >
            BPH GROWTH
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
