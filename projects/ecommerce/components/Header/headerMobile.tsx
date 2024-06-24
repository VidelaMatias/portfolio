import Link from "next/link";
import { FC } from "react";

interface props {
  logged: boolean;
  openLoginModalHandler: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onLogoutHandler: () => void;
}

const HeaderMobile: FC<props> = ({ logged, openLoginModalHandler, onLogoutHandler }) => {

  return (
    <div id="mobile-menu" className="mobile-menu bg-bgsecondary hover:text-textHover p-4 w-36 left-0 absolute top-12 rounded-br-md z-10">
      <ul className="p-1">
        <li><Link href="/" data-testid="inicio-link-mobile" >Inicio</Link></li>
        {
          !logged ?
            <li className="navItemMobile"><button type="button" onClick={openLoginModalHandler}>Iniciar Sesión</button></li>
            :
            <>
              <li> <Link href='/myaccount' >Mis Datos</Link></li>
              <li> <Link href='/myTrips'>Mis Viajes</Link></li>
              <li ><button type="button" onClick={onLogoutHandler}>Cerrar Sesión</button></li>
            </>
        }
      </ul>
    </div>
  )
}
export default HeaderMobile;