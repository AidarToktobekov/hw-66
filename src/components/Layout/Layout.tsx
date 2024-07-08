import React from 'react';
import Header from "../Header/Header";



const Layout: React.FC<React.PropsWithChildren> = ({children}) => {

  return (

    <>

      <header>

        <Header/>

      </header>

      <main className="container-fluid">

        {children}

      </main>

    </>

  );

};



export default Layout;