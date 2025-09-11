import React, { useState } from "react";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = { name: "", email: "", message: "" };
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.values(newErrors).every(err => err === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="  mt-27 flex flex-col md:flex-row gap-8 p-6 md:p-12 bg-gray-50">
    
      <div className="md:w-1/2 space-y-4">
        <h2 className="mt-10 text-3xl font-bold text-[#81C408]">Contact Us</h2>
        <p className="text-gray-700">We’d love to hear from you. Reach out anytime.</p>
        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>📍 Address:</strong> PGRS Techno Park, HITEC City, Hyderabad, Telangana 500081</p>
          <p><strong>📧 Email:</strong> support@fruitables.com</p>
          <p><strong>📞 Phone:</strong> +92 300 1234567</p>
          <p><strong>🕒 Working Hours:</strong> Mon–Fri: 9am–6pm</p>
        </div>
        <iframe
          title="Location Map"
          src="https://maps.google.com/maps?q=HITEC%20City%20Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-64 rounded shadow"
          loading="lazy"
        />
      </div>

      
      <div className=" md:w-1/2 bg-white p-6 rounded shadow-md ">
        <h3 className="text-xl font-semibold mb-4 text-[#81C408]">Get in Touch</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-medium">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Message*</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-[#81C408] text-white px-6 py-2 rounded hover:bg-[#4d7504]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

// individuals ports for all api's 
// user icon component display order-confirmation
// success msg component below the nav items 
// store folder 