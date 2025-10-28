import { Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content mt-10 border-t border-base-300">
      <div className="container mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <aside className="flex col-span-2 flex-col items-center md:items-start text-center md:text-left">
          <div className="flex flex-col items-center gap-3 mb-4">
            <Image
              src="/logo.png"
              alt="NEOSTORE Logo"
              width={100}
              height={100}
              className="rounded-lg shadow-md"
            />
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-gray-600 to-gray-300 bg-clip-text text-transparent tracking-wide">
              NEOSTORE
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-base-content/70 max-w-xs">
            Platform belanja digital modern yang menghadirkan produk-produk
            terbaik dengan pengalaman berbelanja cepat, aman, dan terpercaya.
          </p>
        </aside>

        {/* Layanan */}
        <nav className='flex flex-col items-center md:items-start'> 
          <h6 className="footer-title mb-4 text-base font-semibold text-base-content/80 uppercase tracking-wide">
            Layanan
          </h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:link link-hover">
                Pengiriman
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:link link-hover">
                Bantuan
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:link link-hover">
                Garansi
              </Link>
            </li>
          </ul>
        </nav>

        {/* Perusahaan */}
        <nav className='flex flex-col items-center md:items-start'>
          <h6 className="footer-title mb-4 text-base font-semibold text-base-content/80 uppercase tracking-wide">
            Perusahaan
          </h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:link link-hover">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:link link-hover">
                Karir
              </Link>
            </li>
            <li>
              <Link href="/contacts" className="hover:link link-hover">
                Kontak
              </Link>
            </li>
          </ul>
        </nav>

        {/* Sosial Media */}
        <nav className='flex flex-col items-center col-span-2 md:col-span-1 md:items-start'>
          <h6 className="footer-title mb-4 text-base font-semibold text-base-content/80 uppercase tracking-wide">
            Sosial Media
          </h6>
          <ul className="flex items-center gap-5 space-y-2 text-sm">
            <li className='p-3 bg-gradient-to-r from-red-400 to-blue-600 rounded-full text-white'>
              <Link href="#" className="hover:link link-hover">
                <Instagram />
              </Link>
            </li>
            <li className='p-3 bg-cyan-400 rounded-full text-white'>
              <Link href="#" className="hover:link link-hover">
                <Twitter />
              </Link>
            </li>
            <li className='p-3 bg-blue-500 rounded-full text-white'>
              <Link href="#" className="hover:link link-hover">
                <Facebook />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-base-300 py-6 text-center text-sm text-base-content/60">
        © {new Date().getFullYear()}{' '}
        <span className="font-semibold text-primary">NEOSTORE</span>. Semua hak
        dilindungi.
      </div>
    </footer>
  );
}
