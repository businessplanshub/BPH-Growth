import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

function HowWeWork() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    })
  }, [])

  const steps = [
    {
      number: "01",
      title: "Strategic Business Review",
      description: "We conduct deep external (PESTEL, Porter's) and internal (SWOT, Values) analysis to assess your current state and competitive intensity.",
      align: "left"
    },
    {
      number: "02",
      title: "Business Visioning",
      description: "We define your desired future state, set ambitious yet measurable goals (OKRs), and establish the critical success factors required to achieve them.",
      align: "right"
    },
    {
      number: "03",
      title: "Development of Strategies",
      description: "We formulate precise strategies for Growth, Technology (AI), and Finance, leveraging market opportunity gaps and your unique value proposition.",
      align: "left"
    },
    {
      number: "04",
      title: "Implementation & Execution",
      description: "We define the tactical blueprint, identify key programs, and create the operational execution playbook for immediate launch or disbursement.",
      align: "right"
    }
  ]

  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 lg:mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00273f] mb-4">
            How We <span className="text-[#005c9e]">Work</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600">
            Our Proven 4-Step Process
          </p>
        </div>

        <div className="space-y-4 lg:space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-5 lg:p-8 hover-lift border-l-4 border-[#005c9e]"
              data-aos={step.align === 'left' ? 'fade-right' : 'fade-left'}
              data-aos-delay={index * 150}
            >
              <div className={`flex items-start gap-4 lg:gap-8 ${
                step.align === 'right' ? 'flex-row-reverse' : ''
              }`}>
                {/* Number */}
                <div className="text-4xl lg:text-6xl font-bold text-gradient shrink-0">
                  {step.number}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className={`text-xl lg:text-2xl font-bold text-[#00273f] mb-2 ${
                    step.align === 'right' ? 'text-right' : 'text-left'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-base text-gray-600 leading-relaxed ${
                    step.align === 'right' ? 'text-right' : 'text-left'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowWeWork
