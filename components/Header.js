import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BurgerButton from "./BurgerButton";
import SideMenu from "./SideMenu";

const navLinks = [
  { link: "New Arrivals", url: "arrivals" },
  { link: "Sale", url: "sale" },
  { link: "About Us", url: "about" },
  { link: "Contact", url: "contact" },
];

export default function Header() {
  const [lastScroll, setLastScroll] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  function stickyMenu() {
    const currentScroll = window.scrollY;

    if (currentScroll >= 300 && currentScroll > lastScroll) {
      setIsScrollingDown(true);
    } else if (currentScroll === 0 || currentScroll < lastScroll) {
      setIsScrollingDown(false);
    } else {
      setIsScrollingDown(false);
    }

    setLastScroll(currentScroll);
  }

  useEffect(() => {
    window.addEventListener("scroll", stickyMenu);

    return () => {
      window.removeEventListener("scroll", stickyMenu);
    };
  });

  return (
    <header className={`${isScrollingDown ? "scroll__down" : ""}`}>
      <div className='header__container'>
        <div className='header__logo'>
          <Link href='/'>
            <a>
              <img src='/logo.svg' alt='logo' />
            </a>
          </Link>
        </div>
        <nav className='header__burger__container'>
          <button
            onClick={() => {
              setIsSideMenuOpen(!isSideMenuOpen);
              document.body.classList.toggle("body__disable__scroll");
            }}
          >
            <BurgerButton isSideMenuOpen={isSideMenuOpen} />
          </button>
        </nav>
        <div
          className={`header__sidemenu__container ${
            isSideMenuOpen ? "active" : ""
          }`}
        >
          <SideMenu />
        </div>
        <nav className='header__nav__container'>
          <ul className='header__nav'>
            {navLinks.map((link, index) => {
              return (
                <Link href={link.url} key={index}>
                  <a>
                    <li>
                      <p>{link.link}</p>
                    </li>
                  </a>
                </Link>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
