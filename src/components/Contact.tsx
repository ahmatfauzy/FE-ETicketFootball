import React from "react";
import image from "../assets/images/contact.png";

const Contact: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-6">
        <h2 className="text-white text-2xl font-bold">Contact Us</h2>
        <h3 className="text-blue-400 text-xl font-semibold">Contact us for message</h3>
      </div>
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full">
          <form className="space-y-4">
            <div>
              <label className="text-white block mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 rounded-lg bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="text-white block mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 rounded-lg bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="text-white block mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="w-full p-2 rounded-lg bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Write Message..."
                rows={4}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex justify-center">
          <img
            src={image}
            alt="Contact Illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;