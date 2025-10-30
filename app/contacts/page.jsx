'use client'
import { Facebook, Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Contacts() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [formContact, setFormContact] = useState({ fullname: '', email: '', message: '' });

  const handleSubmit = e => {
    e.preventDefault();
    setFormContact({fullname: fullname, email: email, message: message})
  }
  return (
    <section className="container mx-auto p-4 justify-center sm:justify-start flex gap-30 py-20 items-center">
      <Image
        src="/contact-image.png"
        alt="gambar daun"
        className="hidden sm:block"
        height={300}
        width={200}
      />

      <div className="flex flex-col gap-5">
        <h2 className="text-6xl font-semibold font-sans pb-5">CONTACT US</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-30">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label
              htmlFor="contact-fullname"
              className="border-b-black border-b py-3"
            >
              <input
                type="text"
                className="input-none w-full"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </label>
            <label
              htmlFor="contact-fullname"
              className="border-b-black border-b py-3"
            >
              <input
                type="text"
                className="input-none w-full"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label
              htmlFor="contact-fullname"
              className="border-b-black border-b py-3"
            >
              <input
                type="text"
                className="input-none w-full"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>

            <button
              type="submit"
              className="btn btn-lg bg-gray-700 hover:bg-gray-500 text-white mt-7"
            >
              Contact Us
            </button>
          </form>

          <div className="flex flex-col justify-between">
            {/* alamat */}
            <div>
              <h3 className="font-semibold">Contact</h3>
              <p className="text-gray-500">ahmadadptr@gmail.com</p>

              <h3 className="font-semibold mt-6">Based In</h3>
              <p className="text-gray-500">South Sulawesi, Kendari</p>
            </div>
            <ul className="flex items-center gap-5 mt-5">
              <li>
                <a href="/" target="_blank">
                  <Youtube size={25} />
                </a>
              </li>
              <li>
                <a href="/" target="_blank">
                  <Instagram size={20} />
                </a>
              </li>
              <li>
                <a href="/" target="_blank">
                  <Facebook size={22} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
