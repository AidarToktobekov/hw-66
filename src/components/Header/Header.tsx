import { NavLink } from "react-router-dom";

const Header = () => {

  return (
    <>
        <div className="bg-dark py-2">
            <div className="container">
                <NavLink to="/" className='text-light text-center fs-1 mx-auto d-block text-decoration-none'>Colorie Tracker</NavLink>
            </div>
        </div>
    </>
  );

};



export default Header;