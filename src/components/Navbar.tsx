import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const signOutOnClick = () => {
    logout();
  };

  const signInOnClick = () => {
    loginWithRedirect();
  };

  const dropDown = () => {
    setIsVisible(!isVisible);
  };

  const clicked = () => {
    setIsVisible(false);
  };

  return (
    <nav className="flex items-center justify-between h-16 bg-white shadow-md">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Meme Gen
        </Link>
      </div>
      <div className="block">
        <button onClick={dropDown} className="text-gray-600 focus:outline-none">
          <svg
            className="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/>
          </svg>
        </button>
      </div>
      {isVisible && (
        <div className="flex flex-col items-center absolute top-16 right-0 bg-white w-40 h-40 shadow-md z-10">
          <Link
            to="/"
            onClick={clicked}
            className="text-gray-800 hover:text-gray-900 w-full text-center py-2"
          >
            Home
          </Link>
          <Link
            to="/About"
            onClick={clicked}
            className="text-gray-800 hover:text-gray-900 w-full text-center py-2"
          >
            About
          </Link>
          {!isAuthenticated ? (
            <Button
              className="w-full text-center py-2"
              onClick={signInOnClick}
            >
              <Link to="/Signin" className="text-gray-800 hover:text-gray-900">
                Sign In
              </Link>
            </Button>
          ) : (
            <>
              <Button
                className="w-full text-center py-2"
                onClick={clicked}
              >
                <Link to="/Meme" className="text-gray-800 hover:text-gray-900">
                  Meme Gen
                </Link>
              </Button>
              <Button
                className="w-full text-center py-2"
                onClick={signOutOnClick}
              >
                <Link to="/Signout" className="text-gray-800 hover:text-gray-900">
                  Sign Out
                </Link>
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;