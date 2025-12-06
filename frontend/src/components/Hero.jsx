import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Rocket, ChevronRight } from 'lucide-react'

function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    })
  }, [])

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div data-aos="fade-up">
            {/* Badge */}
            <div className="mb-6" data-aos="fade-up" data-aos-delay="100">
              <span className="inline-flex items-center bg-[#e0f2f9] text-[#005c9e] text-sm font-medium px-4 py-2 rounded-full">
                15+ Years of Combined Practical Experience
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[#00273f]"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Craft <span className="text-gradient">Bankable Strategies</span> That Scale Your Business For You
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              We specialize in overcoming the most common pain points of Nigerian SMEs:{' '}
              <strong className="text-[#00273f]">Access to Capital</strong>,{' '}
              <strong className="text-[#00273f]">Access to Market</strong>, and{' '}
              <strong className="text-[#00273f]">Access to Talent</strong>.
              From strategy to execution, we've got you covered.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <a href="https://calendly.com/businessplanshub/45mins?back=1&month=2025-10" target="_blank" rel="noopener noreferrer">
                <button className="bg-gradient-primary text-white px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                  <Rocket className="w-5 h-5" />
                  Get Started Today
                </button>
              </a>
              <a href="#about">
                <button className="bg-white text-[#00273f] px-8 py-4 rounded-full text-base font-semibold border border-gray-200 hover:border-[#005c9e] hover:text-[#005c9e] transition-all duration-300 flex items-center justify-center gap-2">
                  Learn More
                  <ChevronRight className="w-5 h-5" />
                </button>
              </a>
            </div>
          </div>

          {/* Right Column - Floating Image */}
          <div
            className="relative animate-float"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="glass-strong rounded-[2.5rem] p-6 lg:p-8 ring-2 ring-[#005c9e]/20">
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src="/landing_hero.jpeg"
                  alt="BPH Growth Platform"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
              </div>
            </div>
            {/* Floating accent elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#e0f2f9] rounded-3xl -z-10 blur-2xl opacity-60" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#005094] rounded-3xl -z-10 blur-2xl opacity-40" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
