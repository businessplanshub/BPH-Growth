// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
// import { useEffect } from 'react'
// import Home from './pages/Home'
// import AboutUs from './pages/AboutUs'
// import Services from './pages/Services'
// import BPHGrowthFund from './pages/BPHGrowthFund'
// import ContactUs from './pages/ContactUs'
// import Blogs from './pages/Blogs'
// import FAQs from './pages/FAQs'
// import ResourceCenter from './pages/ResourceCenter'
// import CompanyPolicies from './pages/CompanyPolicies'


// // Admin Pages
// import AdminLogin from './pages/admin/AdminLogin'
// import AdminDashboard from './pages/admin/AdminDashboard'
// import ConsultationAdminLogin from './pages/admin/ConsultationAdminLogin'
// import ConsultationApplications from './pages/admin/ConsultationApplications'
// import LoanAdminLogin from './pages/admin/LoanAdminLogin'
// import LoanApplications from './pages/admin/LoanApplications'
// import FAQManager from './pages/admin/FAQManager'
// import InsightsManager from './pages/admin/InsightsManager'
// import SlotManagement from './pages/admin/SlotManagement'
// import ResourceManager from './pages/admin/ResourceManager'

// // Scroll to hash component
// function ScrollToHash() {
//   const location = useLocation()

//   useEffect(() => {
//     if (location.hash) {
//       setTimeout(() => {
//         const element = document.querySelector(location.hash)
//         if (element) {
//           element.scrollIntoView({ behavior: 'smooth', block: 'start' })
//         }
//       }, 100)
//     } else {
//       window.scrollTo(0, 0)
//     }
//   }, [location])

//   return null
// }

// function App() {
//   return (
//     <Router>
//       <ScrollToHash />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/about-us" element={<AboutUs />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/bph-growth-fund" element={<BPHGrowthFund />} />
//         <Route path="/contact-us" element={<ContactUs />} />
//         <Route path="/blogs" element={<Blogs />} />
//         <Route path="/blogs/:id" element={<Blogs />} />
//         <Route path="/faqs" element={<FAQs />} />
//         <Route path="/resource-center" element={<ResourceCenter />} />
//         <Route path="/company-policies" element={<CompanyPolicies />} />


//         {/* Admin Routes */}
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />

//         {/* Consultation Admin Routes */}
//         <Route path="/admin/consultation-login" element={<ConsultationAdminLogin />} />
//         <Route path="/admin/consultations" element={<ConsultationApplications />} />
//         <Route path="/admin/slots" element={<SlotManagement />} /> {/* ADD THIS */}

//         {/* Loan Admin Routes */}
//         <Route path="/admin/loan-login" element={<LoanAdminLogin />} />
//         <Route path="/admin/loans" element={<LoanApplications />} />

//         {/* Other Admin Routes */}
//         <Route path="/admin/faqs" element={<FAQManager />} />
//         <Route path="/admin/insights" element={<InsightsManager />} />
//         <Route path="/admin/resources" element={<ResourceManager />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App


import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import BPHGrowthFund from './pages/BPHGrowthFund'
import ContactUs from './pages/ContactUs'
import Blogs from './pages/Blogs'
import FAQs from './pages/FAQs'
import ResourceCenter from './pages/ResourceCenter'
import CompanyPolicies from './pages/CompanyPolicies'
import Masterclasses from './pages/Masterclasses'


// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ConsultationAdminLogin from './pages/admin/ConsultationAdminLogin'
import ConsultationApplications from './pages/admin/ConsultationApplications'
import LoanAdminLogin from './pages/admin/LoanAdminLogin'
import LoanApplications from './pages/admin/LoanApplications'
import FAQManager from './pages/admin/FAQManager'
import InsightsManager from './pages/admin/InsightsManager'
import SlotManagement from './pages/admin/SlotManagement'
import ResourceManager from './pages/admin/ResourceManager'
import MasterclassManager from './pages/admin/MasterclassManager'

// Scroll to hash component
function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  return null
}

function App() {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bph-growth-fund" element={<BPHGrowthFund />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blogs />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/resource-center" element={<ResourceCenter />} />
        <Route path="/company-policies" element={<CompanyPolicies />} />
        <Route path="/masterclasses" element={<Masterclasses />} />
        <Route path="/masterclasses/:id" element={<Masterclasses />} />


        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Consultation Admin Routes */}
        <Route path="/admin/consultation-login" element={<ConsultationAdminLogin />} />
        <Route path="/admin/consultations" element={<ConsultationApplications />} />
        <Route path="/admin/slots" element={<SlotManagement />} />

        {/* Loan Admin Routes */}
        <Route path="/admin/loan-login" element={<LoanAdminLogin />} />
        <Route path="/admin/loans" element={<LoanApplications />} />

        {/* Other Admin Routes */}
        <Route path="/admin/faqs" element={<FAQManager />} />
        <Route path="/admin/insights" element={<InsightsManager />} />
        <Route path="/admin/resources" element={<ResourceManager />} />
        <Route path="/admin/masterclasses" element={<MasterclassManager />} />
      </Routes>
    </Router>
  )
}

export default App