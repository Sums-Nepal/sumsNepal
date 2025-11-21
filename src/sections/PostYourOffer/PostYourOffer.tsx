import React, { useState } from "react";
import { Button } from "../../components";

const PostYourOffer = () => {
  const [formData, setFormData] = useState({
    orgName: "",
    orgType: "",
    contactName: "",
    email: "",
    phone: "",
    opportunityType: "",
    studentsWanted: "",
    background: "",
    duration: "",
    compensation: "",
    location: "",
    notes: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.orgName.trim()) newErrors.orgName = "Organization Name is required";
    if (!formData.orgType) newErrors.orgType = "Organization Type is required";
    if (!formData.contactName.trim()) newErrors.contactName = "Contact Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.opportunityType) newErrors.opportunityType = "Opportunity Type is required";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // stop submission if there are errors
    }

    const subject = encodeURIComponent(`New Offer Submission from ${formData.orgName}`);
    const body = encodeURIComponent(
      `Organization Name: ${formData.orgName}
Organization Type: ${formData.orgType}
Contact Name: ${formData.contactName}
Email: ${formData.email}
Phone: ${formData.phone}
Opportunity Type: ${formData.opportunityType}
Number of Students Wanted: ${formData.studentsWanted}
Required Background: ${formData.background}
Duration: ${formData.duration}
Compensation: ${formData.compensation}
Location: ${formData.location}
Special Notes: ${formData.notes}`
    );

    window.location.href = `mailto:Info@sumsnepal.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-black">
            Post <span className="text-orange-500">Your</span> Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your organization's needs and connect with talented students
            and professionals who can help drive your mission forward.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="border border-gray-200 shadow-lg rounded-lg">
            <div className="p-8">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Organization Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="org-name" className="text-sm font-medium text-gray-700 block">
                      Organization Name *
                    </label>
                    <input
                      id="org-name"
                      name="orgName"
                      type="text"
                      value={formData.orgName}
                      onChange={handleChange}
                      placeholder="Enter organization name"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.orgName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                      }`}
                    />
                    {errors.orgName && <p className="text-red-500 text-sm">{errors.orgName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="org-type" className="text-sm font-medium text-gray-700 block">
                      Organization Type *
                    </label>
                    <select
                      id="org-type"
                      name="orgType"
                      value={formData.orgType}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.orgType ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                      }`}
                    >
                      <option value="">Select organization type</option>
                      <option value="private">Private</option>
                      <option value="public">Public</option>
                      <option value="ngo">NGO</option>
                      <option value="social-enterprise">Social Enterprise</option>
                      <option value="association">Association</option>
                    </select>
                    {errors.orgType && <p className="text-red-500 text-sm">{errors.orgType}</p>}
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-sm font-medium text-gray-700 block">
                        Contact Name *
                      </label>
                      <input
                        id="contact-name"
                        name="contactName"
                        type="text"
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          errors.contactName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                        }`}
                      />
                      {errors.contactName && <p className="text-red-500 text-sm">{errors.contactName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@domain.com"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-gray-700 block">
                        Phone *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+977-9800000000"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Opportunity Details */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-4">Opportunity Details</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label htmlFor="opportunity-type" className="text-sm font-medium text-gray-700 block">
                        Opportunity Type *
                      </label>
                      <select
                        id="opportunity-type"
                        name="opportunityType"
                        value={formData.opportunityType}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          errors.opportunityType ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                        }`}
                      >
                        <option value="">Select opportunity type</option>
                        <option value="internship">Internship</option>
                        <option value="full-time">Full-time Position</option>
                        <option value="part-time">Part-time Position</option>
                        <option value="project">Project-based</option>
                        <option value="volunteer">Volunteer</option>
                      </select>
                      {errors.opportunityType && <p className="text-red-500 text-sm">{errors.opportunityType}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="students-wanted" className="text-sm font-medium text-gray-700 block">
                        Number of Students Wanted
                      </label>
                      <input
                        id="students-wanted"
                        name="studentsWanted"
                        type="number"
                        value={formData.studentsWanted}
                        onChange={handleChange}
                        placeholder="e.g., 5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Remaining fields */}
                {/* ... include other optional fields as in your original code */}

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-3 rounded-full text-lg">
                    Submit Offer
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostYourOffer;
