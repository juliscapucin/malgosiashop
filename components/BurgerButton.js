export default function BurgerButton({ isSideMenuOpen }) {
  return (
    <div className={`menu__btn__container ${isSideMenuOpen ? "active" : ""}`}>
      <div className='menu__btn__line'></div>
      <div className='menu__btn__line'></div>
      <div className='menu__btn__line'></div>
    </div>
  );
}
