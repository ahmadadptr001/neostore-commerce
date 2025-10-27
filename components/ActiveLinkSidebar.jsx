import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLinkSidebar({ href, children}) {
    const pathname = usePathname();
    const isActive = pathname == href;

  return (
    <Link
      href={href}
      className={`${isActive ? 'text-6xl  text-gray-300 font-bold' : 'text-6xl font-normal text-white'} hover:underline duration-500 underline-offset-7`}
    >
      {children}
    </Link>
  )
}