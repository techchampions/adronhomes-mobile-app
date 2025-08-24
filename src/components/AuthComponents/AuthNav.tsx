// import { usePathname } from "next/navigation";

export default function AuthNavbar() {
  // const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "https://adromhomes.com/" },
    { name: "Properties", href: "https://adromhomes.com/properties" },
    { name: "Virtual Tour", href: "https://adromhomes.com/virtual-tour" },
    { name: "About us", href: "https://adromhomes.com/about-us" },
    { name: "Contact Us", href: "https://adromhomes.com/contact" },
    { name: "Blog", href: "https://adromhomes.com/blog" },
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
