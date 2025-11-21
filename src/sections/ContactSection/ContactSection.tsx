
import React, { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "../../components";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    city: "",
    email: "",
    partnerInterest: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.partnerInterest) newErrors.partnerInterest = "Project type is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // stop submission if there are errors
    }

    const subject = encodeURIComponent(`New City Contact: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Role: ${formData.role}\n` +
      `City: ${formData.city}\n` +
      `Email: ${formData.email}\n` +
      `Project Type: ${formData.partnerInterest}\n` +
      `Message: ${formData.message}`
    );

    // Opens user's default mail client
    window.location.href = `mailto:info@sumsnepal.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Let's Build <span className="text-orange-500">Your City's </span>Future</h2>
          <p className="text-gray-600">Share your vision, and we'll help make it reality.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-2xl shadow-lg"
          >
            <div>
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 outline-none ${
                  errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500"
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 outline-none ${
                  errors.role ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500"
                }`}
              >
                <option value="" disabled>Select your role</option>
                <option value="city-leader">City Leader</option>
                <option value="innovator">Innovator</option>
                <option value="citizen">Citizen</option>
                <option value="business">Business Owner</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
            </div>

            <div>
              <input
                name="city"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 outline-none ${
                  errors.city ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500"
                }`}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 outline-none ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500"
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <select
                name="partnerInterest"
                value={formData.partnerInterest}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 outline-none ${
                  errors.partnerInterest ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500"
                }`}
              >
                <option value="" disabled>Select project type</option>
                <option value="smart-mobility">Smart Mobility</option>
                <option value="green-energy">Green Energy</option>
                <option value="digital-health">Digital Healthcare</option>
                <option value="education">Education & Skills</option>
              </select>
              {errors.partnerInterest && <p className="text-red-500 text-sm mt-1">{errors.partnerInterest}</p>}
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Tell us about your city..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 outline-none resize-none ${
                  errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500"
                }`}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 font-semibold rounded-lg transition-all"
            >
              Submit & Schedule a Call
            </Button>

            <p className="text-sm text-gray-500 text-center">
              We'll reply within 24h
            </p>
          </form>

          {/* Map and Contact Info */}
          <div className="space-y-8">
            {/* Map */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Partner Cities in Nepal</h3>
              <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.27776841053!2d85.29111107910156!3d27.70903099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Contact Information</h4>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange-500 mt-1" />
                <p className="text-gray-600">info@sumsnepal.com</p>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                <p className="text-gray-600">Lalitpur, Nepal</p>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 mt-1" />
                <p className="text-gray-600">9810446594</p>
              </div>

              <p className="text-sm text-gray-500 pt-4 border-t">
                <span className="text-orange-500 font-medium">Privacy Note:</span>{" "}
                Your data is safe and used only for collaboration purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
