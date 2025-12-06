import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import ServicePillars from '../components/ServicePillars'
import WhyChoose from '../components/WhyChoose'
import HowWeWork from '../components/HowWeWork'
import LoanCTA from '../components/LoanCTA'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Helmet>
        <title>BPH Growth - Business Consulting & SME Financing Solutions in Nigeria</title>
        <meta name="description" content="BPH Growth helps Nigerian SMEs and startups scale with strategic business consulting, AI transformation, and flexible business loans. Get funded in 48 hours." />
        <meta name="keywords" content="business consulting Nigeria, SME loans, startup funding, business plan, AI consulting, digital transformation, Lagos business consultant" />
        <meta property="og:title" content="BPH Growth - Business Consulting & SME Financing Solutions" />
        <meta property="og:description" content="Craft bankable strategies that make investors run after you. Strategic planning, business consulting, and flexible financing for Nigerian SMEs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bphgrowth.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BPH Growth - Business Consulting & SME Financing" />
        <meta name="twitter:description" content="Helping Nigerian SMEs scale with strategic consulting and flexible business loans." />
        <link rel="canonical" href="https://bphgrowth.com" />
      </Helmet>
      <div className="bg-white">
        <Header />
        <Hero />
        <About />
        <ServicePillars />
        <WhyChoose />
        <HowWeWork />
        <LoanCTA />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </>
  )
}

export default Home