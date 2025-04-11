"use client"
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const Navbar: React.FC = () => {
  const {data,status}= useSession();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <div className="text-xl font-bold text-blue-600">CARdoctor</div>

        {/* Center Nav (hidden on mobile) */}
        <ul className="hidden md:flex space-x-6 mx-auto">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side login */}
        <div className="navbar-end hidden md:block">
            <ul>
                {
                    status === "authenticated" ?
                        <div className="flex items-center gap-5">
                            {
                                data?.user?.image ?
                                    <p>
                                        <Image className="rounded-full" src={data?.user?.image} width={30} height={30} alt="logo" />
                                    </p>
                                    :
                                    <p>
                                        <RxAvatar className ="w-[30px] h-[30px]"/>
                                    </p>
                            }

                            <li
                                className="text-center cursor-pointer bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 transition"
                                onClick={() => signOut()}>

                                Logout

                            </li>
                        </div>
                        :
                        <li>
                            <Link className="text-center cursor-pointer bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 transition" href='/login'>
                                Login
                            </Link>
                        </li>
                }


            </ul>
            
        </div>
      {/* <div className="hidden md:block">
          <a
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </a>
          <a
            className="btn btn-outline ms-3"
            onClick={() => signOut()}>

            Logout

          </a>
        </div> */}

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block text-gray-700 hover:text-blue-600 transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {
            status === "authenticated" ?
            <Link
            onClick={() => signOut()}
            href="/login"
            className="block w-full text-center mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Logout
          </Link>
            :
            <Link
            href="/login"
            className="block w-full text-center mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </Link> 
          }
         
        </div>
      )}
    </nav>
  );
};

export default Navbar;
