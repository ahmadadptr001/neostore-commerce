'use client';
import Link from 'next/link';
import ActiveLink from './ActiveLink';
import {
  AlignEndVertical,
  CircleUserRound,
  Facebook,
  Instagram,
  ShoppingCart,
  X,
  Youtube,
} from 'lucide-react';
import { useState } from 'react';
import ActiveLinkSidebar from './ActiveLinkSidebar';
import Image from 'next/image';

export default function Navbar() {
  const [openRightSidebar, setOpenRightSidebar] = useState(false);

  const RightSidebarComponent = () => {
    return (
      <section
        className={`${
          openRightSidebar ? 'left-0' : 'left-1000'
        } duration-500 fixed inset-0 bg-black/60 z-50 backdrop-blur-sm`}
        onClick={() => setOpenRightSidebar(false)}
      >
        <aside className="relative ms-auto w-100 bg-black h-full py-5 p-4">
          <div className="py-5 flex items-center justify-end px-4">
            <button
              className="text-xl flex items-center gap-2 text-gray-300"
              onClick={() => setOpenRightSidebar(false)}
            >
              Close <X size={17} />
            </button>
          </div>

          <ul className="flex-col gap-4 px-3 items-start mt-14">
            <li className="relative w-fit">
              <ActiveLinkSidebar href="/home">
                <span>Home</span>
                <span className="absolute text-xl -top-2 -right-4">1</span>
              </ActiveLinkSidebar>
            </li>
            <li className="relative w-fit">
              <ActiveLinkSidebar href="/products">
                <span>Products</span>
                <span className="absolute text-xl -top-2 -right-4">2</span>
              </ActiveLinkSidebar>
            </li>
            <li className="relative w-fit">
              <ActiveLinkSidebar href="/contacts">
                <span>Contacts</span>
                <span className="absolute text-xl -top-2 -right-4">3</span>
              </ActiveLinkSidebar>
            </li>
          </ul>

          {/* untuk sosmed nya */}
          <ul className="mt-7 flex items-center gap-5 px-4">
            <li className="bg-red-500 p-4 rounded-full">
              <a
                href="https://www.youtube.com/@ahmadadptr"
                target="_blank"
                className="text-white"
              >
                <Youtube className="hover:scale-120" />
              </a>
            </li>
            <li className="bg-blue-500 p-4 rounded-full">
              <a
                href="https://facebook.com/ahmadadptr"
                target="_blank"
                className="text-white"
              >
                <Facebook className="hover:scale-120" />
              </a>
            </li>
            <li className="bg-gradient-to-r from-[#f58529] via-[#dd2a7b] via-[#8134af] to-[#515bd4] p-4 rounded-full">
              <a
                href="https://www.instagram.com/accounts/login/?next=%2Fahmadadptr%2F&source=omni_redirect"
                target="_blank"
                className="text-white"
              >
                <Instagram className="hover:scale-120" />
              </a>
            </li>
          </ul>
        </aside>
      </section>
    );
  };

  return (
    <>
      <RightSidebarComponent />

      <header className="flex items-center gap-3 justify-between p-5 px-8 sticky top-0 backdrop-blur-3xl z-30">
        {/* nav left */}
        <div className="flex items-center gap-8 font-normal">
          {/* brand name */}
          <Link href="/" className="font-extrabold text-2xl">
            <span className="sm:hidden">NEOSTORE</span>
            <Image
              src="/logo.png"
              width={45}
              height={45}
              className="hidden sm:block rounded-full object-cover"
              alt="logo neostore"
            />
          </Link>

          <ul className="hidden sm:flex">
            <nav className="flex items-center gap-8">
              <li>
                <ActiveLink href="/home">Home</ActiveLink>
              </li>
              <li>
                <ActiveLink href="/products">Products</ActiveLink>
              </li>
              <li>
                <ActiveLink href="/contacts">Contacts</ActiveLink>
              </li>
            </nav>
          </ul>
        </div>

        {/* nav right */}
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/" className="hover:scale-115 cursor-pointer">
                <ShoppingCart size={17} />
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:scale-115 cursor-pointer">
                <CircleUserRound size={17} />
              </Link>
            </li>
            <li>|</li>
            <li
              onClick={() => setOpenRightSidebar(true)}
              className="hover:scale-115 cursor-pointer"
            >
              <AlignEndVertical size={17} />
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
