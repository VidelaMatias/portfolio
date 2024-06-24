import React, { ReactNode } from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
 <> 
      <Head>
        <title key="title">Trips Tracking App</title>
      </Head>
      <Header />
      <main className="main-container">{children}</main>
      <Footer />
     </>
  );
}

export default Layout;