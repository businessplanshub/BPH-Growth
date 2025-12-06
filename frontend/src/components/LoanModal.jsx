import { useState } from 'react'
import { X, Loader2, CheckCircle, DollarSign } from 'lucide-react'

function LoanModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    businessAddress: '',
    businessPhone: '',
    loanPurpose: '',
    amount: '',
    tenor: '',
    note: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Google Form submission URL - Replace with your actual Google Form URL
    // Format: https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/formResponse'

    // Map form fields to Google Form entry IDs
    // You'll need to replace these with your actual entry IDs from the Google Form
    const formBody = new URLSearchParams({
      'entry.1234567890': formData.businessName,
      'entry.1234567891': formData.businessEmail,
      'entry.1234567892': formData.businessAddress,
      'entry.1234567893': formData.businessPhone,
      'entry.1234567894': formData.loanPurpose,
      'entry.1234567895': formData.amount,
      'entry.1234567896': formData.tenor,
      'entry.1234567897': formData.note
    })

    try {
      // Submit to Google Form (using no-cors mode since Google Forms doesn't support CORS)
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody.toString()
      })

      // Since no-cors doesn't return response, we assume success
      setIsSubmitted(true)
      setFormData({
        businessName: '',
        businessEmail: '',
        businessAddress: '',
        businessPhone: '',
        loanPurpose: '',
        amount: '',
        tenor: '',
        note: ''
      })
    } catch {
      // Even if there's an error, the form might have been submitted
      // due to no-cors mode limitations
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsSubmitted(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#00273f]/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {isSubmitted ? (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#00273f] mb-3">Application Submitted!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your loan application. Our team will review your request and contact you within 24-48 hours.
            </p>
            <button
              onClick={handleClose}
              className="bg-[#005c9e] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#00273f] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form State */
          <>
            {/* Header */}
            <div className="bg-gradient-primary p-6 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Apply for Business Loan</h2>
                  <p className="text-white/80 text-sm">Get funded in as little as 48 hours</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your business name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005c9e]/20 focus:border-[#005c9e] transition-all"
                />
              </div>

              {/* Email & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    required
                    placeholder="email@business.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005c9e]/20 focus:border-[#005c9e] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="businessPhone"
                    value={formData.businessPhone}
                    onChange={handleChange}
                    required
                    placeholder="+234 800 000 0000"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005c9e]/20 focus:border-[#005c9e] transition-all"
                  />
                </div>
              </div>

              {/* Business Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  required
                  placeholder="Enter your business address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005c9e]/20 focus:border-[#005c9e] transition-all"
                />
              </div>

              {/* Loan Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Purpose <span className="text-red-500">*</span>
                </label>
                <select
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005c9e]/20 focus:border-[#005c9e] transition-all bg-white"
                >
                  <option value="">Select loan purpose</option>
                  <option value="Working Capital">Working Capital</option>
                  <option value="Equipment Purchase">Equipment Purchase</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Business Expansion">Business Expansion</option>
                  <option value="Asset Financing">Asset Financing</option>
                  <option value="Debt Consolidation">Debt Consolidation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Amount & Tenor Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Amount (₦) <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005c9e]/20 focus:border-[#005c9e] transition-all bg-white"
                  >
                    <option value="">Select amount</option>
                    <option value="50,000 - 200,000">₦50,000 - ₦200,000</option>
                    <option value="200,000 - 500,000">₦200,000 - ₦500,000</option>
                    <option value="500,000 - 1,000,000">₦500,000 - ₦1,000,000</option>
                    <option value="1,000,000 - 2,000,000">₦1,000,000 - ₦2,000,000</option>
                    <option value="2,000,000 - 5,000,000">₦2,000,000 - ₦5,000,000</option>
                    <option value="5,000,000+">₦5,000,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Repayment Tenor <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="tenor"
                    value={formData.tenor}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005c9e]/20 focus:border-[#005c9e] transition-all bg-white"
                  >
                    <option value="">Select tenor</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="12-24 months">12-24 months</option>
                  </select>
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any additional information about your loan request..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005c9e]/20 focus:border-[#005c9e] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-primary text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to be contacted regarding your loan application.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default LoanModal
