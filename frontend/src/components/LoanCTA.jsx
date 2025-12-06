import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Banknote, Clock, CheckCircle2, ArrowRight } from 'lucide-react'

const loanFeatures = [
  {
    icon: Banknote,
    title: "Flexible Amounts",
    description: "From N50,000 to N5M+"
  },
  {
    icon: Clock,
    title: "Quick Approval",
    description: "Get funded in 48 hours"
  },
  {
    icon: CheckCircle2,
    title: "Simple Process",
    description: "Minimal documentation"
  }
]

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdiIAX3omr-q62zSyPqD3F4PuXY_TSNns28SRGc8RcElIuLAg/viewform'

function LoanCTA() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    })
  }, [])

  return (
    <>
      <section id="loans" className="section-padding px-4 sm:px-6 lg:px-8 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#00273f] via-[#003d5c] to-[#005c9e]"
            data-aos="fade-up"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0077cc]/30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Left Content */}
                <div data-aos="fade-right" data-aos-delay="100">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                    <Banknote className="w-4 h-4 text-[#60a5fa]" />
                    <span className="text-white/90 text-sm font-medium">BPH Growth Fund</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    Need Capital to <br className="hidden sm:block" />
                    <span className="text-[#60a5fa]">Grow Your Business?</span>
                  </h2>

                  <p className="text-lg text-white/80 mb-8 max-w-lg">
                    Access flexible business loans designed for Nigerian SMEs.
                    Whether it's working capital, equipment, or expansion - we've got you covered.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={GOOGLE_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white text-[#00273f] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#e0f2f9] transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-3"
                    >
                      Apply for a Loan
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href="/bph-funds"
                      className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center gap-2"
                    >
                      Learn More
                    </a>
                  </div>
                </div>

                {/* Right Content - Features */}
                <div className="space-y-4" data-aos="fade-left" data-aos-delay="200">
                  {loanFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/15 transition-all duration-300"
                      data-aos="fade-up"
                      data-aos-delay={300 + index * 100}
                    >
                      <div className="w-14 h-14 bg-[#60a5fa]/20 rounded-xl flex items-center justify-center shrink-0">
                        <feature.icon className="w-7 h-7 text-[#60a5fa]" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                        <p className="text-white/70">{feature.description}</p>
                      </div>
                    </div>
                  ))}

                  <p className="text-white/50 text-sm pt-4 pl-2">
                    * Subject to eligibility and documentation requirements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LoanCTA
