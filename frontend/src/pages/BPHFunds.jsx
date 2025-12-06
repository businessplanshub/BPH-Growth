import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  Banknote,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Building2,
  Truck,
  FileText,
  Phone
} from 'lucide-react'

const loanProducts = [
  {
    title: "Business Loan",
    description: "Quick access to working capital for your business operations and growth",
    amount: "N500,000 - N50,000,000",
    tenure: "6 - 24 months",
    rate: "From 2.5% monthly",
    icon: Banknote,
    features: [
      "Fast approval within 48 hours",
      "Flexible repayment terms",
      "No collateral for qualified SMEs",
      "Multiple disbursement options"
    ]
  },
  {
    title: "Asset Finance",
    description: "Finance equipment, vehicles, and machinery to scale your operations",
    amount: "N1,000,000 - N100,000,000",
    tenure: "12 - 48 months",
    rate: "From 2% monthly",
    icon: Truck,
    features: [
      "Up to 90% asset financing",
      "Asset serves as collateral",
      "Tax benefits available",
      "Direct vendor payment option"
    ]
  },
  {
    title: "Invoice Financing",
    description: "Convert your outstanding invoices into immediate cash flow",
    amount: "N300,000 - N30,000,000",
    tenure: "30 - 90 days",
    rate: "From 3% per invoice",
    icon: FileText,
    features: [
      "Same-day funding available",
      "No debt on balance sheet",
      "Maintain client relationships",
      "Flexible advance rates"
    ]
  }
]

const benefits = [
  {
    title: "Fast Approval",
    description: "Get approval within 48 hours with minimal documentation",
    icon: Zap
  },
  {
    title: "Competitive Rates",
    description: "Enjoy market-leading interest rates tailored for SMEs",
    icon: TrendingUp
  },
  {
    title: "Flexible Terms",
    description: "Choose repayment plans that match your cash flow",
    icon: Clock
  },
  {
    title: "Secure Platform",
    description: "Bank-grade security for your financial information",
    icon: Shield
  }
]

const applicationSteps = [
  {
    step: "1",
    title: "Fill Application",
    description: "Complete our simple online application form with your business details"
  },
  {
    step: "2",
    title: "Submit Documents",
    description: "Upload required documents through our secure portal"
  },
  {
    step: "3",
    title: "Quick Review",
    description: "Our team reviews your application within 48 hours"
  },
  {
    step: "4",
    title: "Get Funded",
    description: "Receive funds directly to your business account"
  }
]

const eligibilityRequirements = [
  "Registered business in Nigeria (minimum 1 year)",
  "Valid Business Registration Certificate (CAC)",
  "Active business bank account (minimum 6 months statement)",
  "Tax Identification Number (TIN)",
  "Utility bill or proof of business address",
  "Financial statements or management accounts"
]

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdiIAX3omr-q62zSyPqD3F4PuXY_TSNns28SRGc8RcElIuLAg/viewform'

function BPHFunds() {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>BPH Funds - Business Loans & Financing for Nigerian SMEs | BPH Growth</title>
        <meta name="description" content="Get fast, flexible business loans from N500,000 to N100M. Asset financing, invoice financing, and working capital for Nigerian SMEs. Approval in 48 hours." />
        <meta name="keywords" content="business loan Nigeria, SME financing, asset finance, invoice financing, working capital loan, Lagos business loan, quick loan approval" />
        <meta property="og:title" content="BPH Funds - Fast Business Loans for Nigerian SMEs" />
        <meta property="og:description" content="Fuel your business growth with flexible financing. Get approved in 48 hours with competitive rates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bphgrowth.com/bph-funds" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BPH Funds - Business Loans & Financing" />
        <meta name="twitter:description" content="Fast, flexible business loans for Nigerian SMEs. Get funded in 48 hours." />
        <link rel="canonical" href="https://bphgrowth.com/bph-funds" />
      </Helmet>
      <div className="bg-white">
        <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#00273f] via-[#003d5c] to-[#005c9e] px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0077cc]/30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              data-aos="fade-up"
            >
              <Building2 className="w-4 h-4 text-[#60a5fa]" />
              <span className="text-white/90 text-sm font-medium">Trusted by 500+ Nigerian SMEs</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Fuel Your Growth with{' '}
              <span className="text-[#60a5fa]">BPH Funds</span>
            </h1>

            <p
              className="text-lg lg:text-xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Fast, flexible financing solutions designed specifically for Nigerian SMEs.
              Get the capital you need to grow your business without the hassle.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white text-[#00273f] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#e0f2f9] transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-3"
              >
                Apply for Loan Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+2347080096148"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Talk to Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Products */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#00273f]">
              Our <span className="text-[#005c9e]">Loan Products</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the financing solution that best fits your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loanProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="p-6 lg:p-8">
                  <div className="w-14 h-14 bg-[#005c9e] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <product.icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-[#00273f] mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-6">{product.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">Loan Amount</span>
                      <span className="font-bold text-[#00273f]">{product.amount}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">Tenure</span>
                      <span className="font-bold text-[#00273f]">{product.tenure}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">Interest Rate</span>
                      <span className="font-bold text-[#005c9e]">{product.rate}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <CheckCircle2 className="h-4 w-4 text-[#005c9e] mr-2 mt-0.5 shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#005c9e] text-white py-3 rounded-xl font-semibold hover:bg-[#00273f] transition-colors flex items-center justify-center gap-2"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose BPH Funds */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#00273f]">
              Why Choose <span className="text-[#005c9e]">BPH Funds?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We understand the unique challenges of Nigerian SMEs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-14 h-14 bg-[#e0f2f9] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#005c9e] transition-colors">
                  <benefit.icon className="h-7 w-7 text-[#005c9e] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#00273f] text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#00273f]">
              How It <span className="text-[#005c9e]">Works</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get funded in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {applicationSteps.map((item, index) => (
              <div key={index} className="relative" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#005c9e] to-[#00273f] rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-[#00273f] text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                {index < applicationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-[#005c9e]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Requirements */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#00273f]">
              Eligibility <span className="text-[#005c9e]">Requirements</span>
            </h2>
            <p className="text-lg text-gray-600">
              Simple requirements to get started
            </p>
          </div>

          <div
            className="bg-white rounded-2xl shadow-lg p-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {eligibilityRequirements.map((requirement, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#005c9e] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#00273f] via-[#003d5c] to-[#005c9e]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center" data-aos="zoom-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Ready to Take Your Business to the Next Level?
            </h2>
            <p className="text-lg lg:text-xl text-white/80 mb-8">
              Apply now and get a decision within 48 hours
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white text-[#00273f] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#e0f2f9] transition-all duration-300 shadow-xl inline-flex items-center justify-center gap-3"
              >
                Apply for Loan Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+2347080096148"
                className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>

            <p className="text-white/60 text-sm mt-6">
              Have questions? Call us at <span className="font-semibold text-white/80">+234 708 009 6148</span>
            </p>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </>
  )
}

export default BPHFunds
