import Link from "next/link";

const sidemenuLinks = [
  { link: "New Arrivals", url: "arrivals" },
  { link: "Sale", url: "sale" },
  { link: "About Us", url: "about" },
  { link: "Contact", url: "contact" },
];

export default function SideMenu() {
  return (
    <nav className='sidemenu__container'>
      <ul className='sidemenu__links__container'>
        <li className='sidemenu__link'>
          <Link href='/'>
            <a>
              <div className='sidemenu__link__content'>
                <h2>Home</h2>
              </div>
            </a>
          </Link>
        </li>
        {sidemenuLinks.map((link, index) => {
          return (
            <li key={index} className='sidemenu__link'>
              <Link href={`/${link.url}`}>
                <a>
                  <div className='sidemenu__link__content'>
                    <h2>{link.link}</h2>
                  </div>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
