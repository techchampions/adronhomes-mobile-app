// import { usePathname } from "next/navigation";

export default function AuthNavbar() {
  // const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "Virtual Tour", href: "/virtual-tour" },
    { name: "About us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header className=" w-full transition-colors duration-300 mx-auto">
      <nav className="w-full flex justify-between items-center py-2 px-2 md:px-2">
        <ul className="hidden md:flex space-x-6 text-sm justify-between w-full px-16 pb-5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-300 text-gray-700 hover:text-adron-green "
              >
                {link.name}
              </a>
              {/* <a
                href={link.href}
                className={`transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-adron-green font-semibold"
                    : "text-gray-700 hover:text-adron-green"
                }`}
              >
                {link.name}
              </a> */}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
