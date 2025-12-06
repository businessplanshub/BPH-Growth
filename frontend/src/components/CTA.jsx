import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Rocket } from 'lucide-react'

function CTA() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    })
  }, [])

  return (
    <section className="relative section-padding px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-[#005c9e] via-[#005094] to-[#00273f]" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="glass-gradient rounded-[2.5rem] p-8 md:p-12 text-center" data-aos="zoom-in">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Ready to Transform Your Business?
          </h2>

          <p
            className="text-lg lg:text-xl text-white/90 mb-8 lg:mb-10 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Get started with a free consultation. Share your vision, and let's build your roadmap to success together.
          </p>

          <a href="https://calendly.com/businessplanshub/45mins?back=1&month=2025-10" target="_blank" rel="noopener noreferrer" data-aos="fade-up" data-aos-delay="300">
            <button className="bg-white text-[#005c9e] px-10 py-4 rounded-full text-lg font-bold hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl inline-flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Schedule Consultation
            </button>
          </a>

          <p className="text-white/70 text-sm mt-6" data-aos="fade-up" data-aos-delay="400">
            * We typically respond within 24 hours
          </p>
        </div>
      </div>
    </section>
  )
}

export default CTA
