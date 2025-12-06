import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Brain, Cog, Heart, Wallet } from 'lucide-react'

function WhyChoose() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    })
  }, [])

  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 bg-gradient-radial">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00273f] mb-4">
            Why Entrepreneurs Choose <span className="text-[#005c9e]">BPH Growth</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge technology with proven business strategies to deliver exceptional results
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[minmax(180px,auto)]">

          {/* Card 1 - AI Advantage (Large - spans 2 cols) */}
          <div
            className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-3xl glass-card hover-lift group"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            {/* Placeholder Image */}
            <div className="absolute inset-0 bg-gradient-primary opacity-90">
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
                alt="AI Technology"
                className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-[#00273f] via-[#00273f]/60 to-transparent" />

            <div className="relative h-full p-8 flex flex-col justify-end text-white">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3">AI Advantage</h3>
              <p className="text-white/90 text-base lg:text-lg leading-relaxed max-w-md">
                We don't guess, we use validated strategic data to forecast performance and vet strategies, reducing risk and increasing investor confidence.
              </p>
            </div>
          </div>

          {/* Card 2 - Guaranteed Executability */}
          <div
            className="relative overflow-hidden rounded-3xl glass-card hover-lift group"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Team Execution"
                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-br from-[#e0f2f9] to-white opacity-90" />

            <div className="relative h-full p-6 flex flex-col">
              <div className="w-12 h-12 bg-[#005c9e] rounded-xl flex items-center justify-center mb-4">
                <Cog className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#00273f] mb-2">Guaranteed Executability</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We integrate strategy with a dedicated operational execution playbook.
              </p>
            </div>
          </div>

          {/* Card 3 - Holistic Resilience */}
          <div
            className="relative overflow-hidden rounded-3xl glass-card hover-lift group"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team Collaboration"
                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-br from-[#f0f9ff] to-white opacity-90" />

            <div className="relative h-full p-6 flex flex-col">
              <div className="w-12 h-12 bg-[#005c9e] rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#00273f] mb-2">Holistic Resilience</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Rigorous planning with essential mindset training for founders.
              </p>
            </div>
          </div>

          {/* Card 4 - Unrivaled Funding Access (Wide - spans 2 cols) */}
          <div
            className="lg:col-span-2 relative overflow-hidden rounded-3xl group"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="absolute inset-0 bg-[#00273f]">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80"
                alt="Funding Access"
                className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

            <div className="relative h-full p-8 flex flex-col md:flex-row md:items-center gap-6 text-white">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold mb-2">Unrivaled Funding Access</h3>
                <p className="text-white/90 text-base leading-relaxed">
                  Our service connects strategy directly to capital. Clients who complete our planning process gain preferential access and terms to the BPH Growth Fund.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default WhyChoose
