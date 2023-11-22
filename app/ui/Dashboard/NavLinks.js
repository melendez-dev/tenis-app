'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/admin', icon: <>icon</> },
  {
    name: 'Usuarios',
    href: '/admin/users',
    icon: <>icon</>,
  },
  { name: 'Torneos', href: '/admin/tournaments', icon: <>icon</> },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link, idx) => {
        return (
          <Link
            key={idx}
            href={link.href}
            className={
              `flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 
              ${pathname == link.href && 'text-blue-600 bg-sky-100'}
              `
            }
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
