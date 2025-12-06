import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Lightbulb, Target, Shield, Heart, Linkedin } from 'lucide-react'

const coreValues = [
  {
    icon: Lightbulb,
    title: "Resourcefulness",
    description: "Achieving more with less through lean and agile methodologies."
  },
  {
    icon: Target,
    title: "Leadership",
    description: "Emphasizing market dominion through innovation and high responsiveness."
  },
  {
    icon: Shield,
    title: "Accountability",
    description: "Operating with the highest level of professionalism and transparency."
  },
  {
    icon: Heart,
    title: "Commitment",
    description: "Driven to see SMEs/Start-ups scale within the socio-political setting regardless of the challenges."
  }
]

const managementTeam = [
  {
    name: "Obafemi Darabidan",
    role: "Executive Director",
    image: "/femi.jpeg",
    linkedin: "https://www.linkedin.com/in/femidarabidan/"
  },
  {
    name: "Nelson Ochonogor",
    role: "Executive Director",
    image: "/nelson.jpeg",
    linkedin: "https://www.linkedin.com/in/nelson-ochonogor-07b22327/"
  }
]

const advisors = [
  { name: "Dupe Adeoye", title: "Board Advisor", image: "/dupe.jpeg" },
  { name: "Ebire Ayooluwa", title: "Board Advisor", image: "/ebira.jpeg" },
  { name: "Kanyinsola Awonusi", title: "ACCA", initials: "KA" },
  { name: "Wole Medunoye", title: "BA", initials: "WM" },
  { name: "Alueshima Kakwagh", title: "ACCA", image: "/Alueshima.jpeg" }
]

function About() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    })
  }, [])

  return (
    <section id="about" className="section-padding px-4 sm:px-6 lg:px-8 bg-gradient-radial">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#00273f]">
            About <span className="text-[#005c9e]">BPH Growth</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At BPH Growth, we have a <strong className="text-[#00273f]">proven track record of helping SMEs/Start-ups grow profitably and scale quickly</strong>.
            We provide holistic Business Support and Advisory Services, integrating modern technology and deep human expertise.
          </p>
        </div>

        {/* Main Content Card */}
        <div
          className="glass-strong rounded-[2.5rem] p-8 md:p-12 mb-16"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* What We Do */}
            <div data-aos="fade-right" data-aos-delay="200">
              <h3 className="text-2xl lg:text-3xl font-bold text-[#00273f] mb-6">What We Do</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  We specialize in overcoming the most common pain points of Nigerian SMEs:{' '}
                  <strong className="text-[#00273f]">Access to Capital</strong>,{' '}
                  <strong className="text-[#00273f]">Access to Market</strong>, and{' '}
                  <strong className="text-[#00273f]">Access to Talent</strong>.
                </p>
                <p className="text-lg">
                  We don't just write plans; we craft{' '}
                  <strong className="text-[#005c9e]">bankable strategies</strong>{' '}
                  that scale your business for you.
                </p>
                <p className="text-lg">
                  Our successful business re-engineering processes and lean-centered scale models
                  have commanded behemoth results for our clientele across{' '}
                  <strong className="text-[#00273f]">Financial Services, FMCG, Tech, and Agriculture</strong>.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div data-aos="fade-left" data-aos-delay="300">
              <h3 className="text-2xl lg:text-3xl font-bold text-[#00273f] mb-6">Our Core Values</h3>
              <div className="space-y-5">
                {coreValues.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 hover-lift p-3 rounded-xl transition-all"
                    data-aos="fade-up"
                    data-aos-delay={350 + index * 100}
                  >
                    <div className="w-12 h-12 bg-[#005c9e] rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#00273f] mb-1 text-lg">{value.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Management Team */}
        <div className="mb-16" data-aos="fade-up">
          <div className="text-center mb-10">
            <h3 className="text-2xl lg:text-3xl font-bold text-[#00273f] mb-2">Management Team</h3>
            <p className="text-gray-600">15+ Years of Combined Practical Experience</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {managementTeam.map((member, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 hover-lift group"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="flex items-center gap-6">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 ring-4 ring-[#005c9e]/20 group-hover:ring-[#005c9e]/40 transition-all">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-[#00273f] mb-1">{member.name}</h4>
                    <p className="text-[#005c9e] font-medium mb-3">{member.role}</p>
                    <a
                      href={member.linkedin}
                      className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#005c9e] transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Board of Advisors */}
        <div data-aos="fade-up">
          <div className="text-center mb-10">
            <h3 className="text-2xl lg:text-3xl font-bold text-[#00273f] mb-2">Board of Advisors</h3>
            <p className="text-gray-600">Industry experts guiding our strategic vision</p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              {advisors.map((advisor, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-5 text-center hover-lift group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Avatar */}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden ring-2 ring-[#005c9e]/10 group-hover:ring-[#005c9e]/30 transition-all">
                    {advisor.image ? (
                      <img
                        src={advisor.image}
                        alt={advisor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-primary flex items-center justify-center text-white text-xl font-bold">
                        {advisor.initials}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <h4 className="font-bold text-[#00273f] text-sm mb-1 leading-tight">{advisor.name}</h4>
                  {advisor.title && (
                    <p className="text-xs text-gray-500">{advisor.title}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
