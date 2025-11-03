'use client'
import { Facebook, Instagram, Youtube, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function Contacts() {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="md:grid md:grid-cols-2 min-h-screen">
        {/* Left Side (Image + Overlay + Info) */}
        <div className="relative h-64 md:h-auto">
          <Image
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
            alt="Contact background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-700/50 to-gray-900/50" />
          
          {/* Overlay Text (Mobile & Desktop) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:items-start md:justify-end md:p-10 md:text-left text-white">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Let’s Talk</h2>
            <p className="max-w-sm text-gray-100 mb-4">
              We’d love to hear from you. Whether it’s feedback, questions, or just to say hi.
            </p>
            <div className="space-y-2 text-sm md:text-base">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={18} /> <span>ahmadadptr@gmail.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin size={18} /> <span>South Sulawesi, Kendari</span>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <a target='_blank' href="https://www.youtube.com/@ahmadadptr" className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition"><Youtube /></a>
              <a target='_blank' href="https://www.instagram.com/accounts/login/?next=%2Fahmadadptr%2F&source=omni_redirect" className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition"><Instagram /></a>
              <a target='_blank' href="https://facebook.com/ahmadadptr" className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition"><Facebook /></a>
            </div>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="flex items-center justify-center p-8 bg-gray-100">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-gray-900 text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
