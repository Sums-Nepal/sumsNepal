import React, { useState } from "react";

const Entrepreneurship = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startupName: "",
    ideaDescription: "",
    stage: "",
    industry: "",
    terms: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.startupName.trim()) newErrors.startupName = "Startup Name is required";
    if (!formData.ideaDescription.trim()) newErrors.ideaDescription = "Idea Description is required";
    if (!formData.stage) newErrors.stage = "Current Stage is required";
    if (!formData.industry) newErrors.industry = "Industry/Sector is required";
    if (!formData.terms) newErrors.terms = "You must agree to the terms";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const subject = encodeURIComponent(`New Startup Submission from ${formData.name}`);
    const body = encodeURIComponent(
      `Full Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Startup Name: ${formData.startupName}
Idea Description: ${formData.ideaDescription}
Current Stage: ${formData.stage}
Industry/Sector: ${formData.industry}
Agreement: ${formData.terms ? "I have agreed to the SUMS Nepal terms" : "Not agreed"}`
    );

    window.location.href = `mailto:connect@sumsnepal.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-24 bg-white" id="en-form">
      <div className="container mx-auto px-4">


        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-black">
            Submit Your <span className="text-orange-500">Startup</span> Idea
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your startup idea and connect with SUMS Nepal for mentorship,
            funding, and support to grow your venture.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto border border-gray-200 shadow-lg rounded-lg p-8">
          <form id="startupForm" className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
                Full Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 block">
                Phone Number:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            {/* Startup Name */}
            <div className="space-y-2">
              <label htmlFor="startupName" className="text-sm font-medium text-gray-700 block">
                Startup Name:
              </label>
              <input
                type="text"
                id="startupName"
                name="startupName"
                value={formData.startupName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              />
              {errors.startupName && <p className="text-red-500 text-sm">{errors.startupName}</p>}
            </div>

            {/* Idea Description */}
            <div className="space-y-2">
              <label htmlFor="ideaDescription" className="text-sm font-medium text-gray-700 block">
                Brief Description of Your Startup Idea (100-200 words):
              </label>
              <textarea
                id="ideaDescription"
                name="ideaDescription"
                rows={5}
                value={formData.ideaDescription}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              ></textarea>
              {errors.ideaDescription && (
                <p className="text-red-500 text-sm">{errors.ideaDescription}</p>
              )}
            </div>

            {/* Current Stage */}
            <div className="space-y-2">
              <label htmlFor="stage" className="text-sm font-medium text-gray-700 block">
                Current Stage of Your Startup:
              </label>
              <select
                id="stage"
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select an option</option>
                <option value="idea">Idea/Conceptual</option>
                <option value="mvp">MVP Built</option>
                <option value="early">Early Traction</option>
                <option value="growth">Growth Stage</option>
              </select>
              {errors.stage && <p className="text-red-500 text-sm">{errors.stage}</p>}
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <label htmlFor="industry" className="text-sm font-medium text-gray-700 block">
                Industry/Sector:
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select an option</option>
                <option value="tech">Technology</option>
                <option value="health">Health & Wellness</option>
                <option value="education">Education</option>
                <option value="finance">FinTech</option>
                <option value="agri">Agriculture</option>
                <option value="other">Other</option>
              </select>
              {errors.industry && <p className="text-red-500 text-sm">{errors.industry}</p>}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                {formData.terms
                  ? "I have agreed to the SUMS Nepal terms"
                  : "I agree to the SUMS Nepal terms and conditions and privacy policy."}
              </label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

            {/* Submit */}
            <div className="text-center pt-6">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-3 rounded-full text-lg"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Entrepreneurship;
