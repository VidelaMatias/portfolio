'use client';

import Link from 'next/link'
import HeaderMobile from './headerMobile';
import { useEffect, useState } from 'react';
import Login from '../Login/login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import Loader from '../Loader/loader';

const Modal = dynamic(() => import('../Modal/modal'), {
  loading: () =>  <Loader />, 
  ssr: false 
});

const Header = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

  const onMobileMenuHandler = () => {
    setOpenMobileMenu(!openMobileMenu)
  }

  const openLoginModalHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setOpenModal(true)
  }

  const onSubmitFormHandler = () => {
    setOpenModal(false)
  }

  const onLogoutHandler = () => {
    localStorage.removeItem('logged')
    window.location.reload();
  }

  const handleResize = () => {
    setOpenMenu(false)
    setOpenMobileMenu(false)
    setLoggedIn(localStorage.getItem('logged') ? true : false);
  };

  useEffect(() => {
    setOpenMenu(false)
  }, [location]);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia('(min-width:768px');
    desktopMediaQuery.addEventListener('change', () => {
      handleResize()
    });

    return () => {
      desktopMediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-bgsecondary p-2 h-12 border-b border-white">
        <div className="block lg:hidden">
          <button data-testid="menu-btn" onClick={onMobileMenuHandler} className="flex items-center px-3 py-2 border rounded text-textHover border-textHover hover:text-textPrimary hover:border-textPrimary">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        {openMobileMenu &&
          <HeaderMobile logged={loggedIn} openLoginModalHandler={openLoginModalHandler} onLogoutHandler={onLogoutHandler}></HeaderMobile>
        }

        <div id="desktop-menu" className="w-full hidden justify-center flex-grow lg:flex lg:items-center lg:w-auto">

          <div className="text-md">
            <Link href="/" data-testid="inicio-link" className="navItem">
              Inicio
            </Link>
          </div>

          {
            !loggedIn ?
              <button type="button" className='absolute right-3 navItem' onClick={openLoginModalHandler}>Iniciar Sesión</button>
              :
              <button className='absolute right-3' onClick={() => setOpenMenu(!openMenu)}>
                <FontAwesomeIcon icon={faUser} className='text-bgYellow' />
              </button>
          }

          {
            openMenu && (
              <div className='absolute top-16 right-0 bg-bgsecondary p-2 rounded-b-md'>
                <ul>
                  <li> <Link href='/myaccount' className='hover:text-textHover p-1'>Mis Datos</Link></li>
                  <li> <Link href='/myTrips' className='hover:text-textHover p-1'>Mis Viajes</Link></li>
                  <li className='hover:text-textHover p-1'><button type="button" onClick={onLogoutHandler}>Cerrar Sesión</button></li>
                </ul>
              </div>
            )
          }
        </div>

      </nav>

      <Modal open={openModal} onClose={() => setOpenModal(false)}> <Login closeModal={onSubmitFormHandler}></Login></Modal>
    </header>

  )
}
export default Header;