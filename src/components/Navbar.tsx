import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuth0 } from "@auth0/auth0-react";


function Navbar() {
    const [isVisible, setIsVisible] = useState(false)
    const { isAuthenticated, loginWithRedirect, logout }  =  useAuth0();

    const signOutOnClick  =  ()  =>  {
        logout();
    };

    const signInOnClick = () => {
        loginWithRedirect();
    };

    const dropDown= () => {
        setIsVisible(!isVisible)
    }

    const clicked = () => {
        setIsVisible(false)
    }

    return (
        <nav className="">
            <div>
                <Link to = '/'>Meme Gen</Link>
            </div>
            <div className="block">
                <button onClick={dropDown} className="">
                    <i className="fas fa-bars"></i>
                </button>
            </div>
            { isVisible ? (
                <div className="">
                    <div className="">
                        <Button className="">
                            <div>
                                <Link to ='/' onClick={ clicked } className="">
                                    Home
                                </Link>
                            </div>
                        </Button>
                        <Button className="">
                            <div>
                                <Link to ='/About' onClick={ clicked } className="">
                                    About
                                </Link>
                            </div>
                        </Button>
                        <Button className="">
                            <div>
                                <Link to ='/Meme' onClick={ clicked } className="">
                                    Meme Gen
                                </Link>
                            </div>
                        </Button>
                        {
                        !isAuthenticated ?
                        <Button className="">
                            <div>
                                <Link to ='/Signin' onClick={ signInOnClick } className="">
                                    Sign In
                                </Link>
                            </div>
                        </Button>
                        :
                        <Button className="">
                            <div>
                                <Link to ='/Signout' onClick={ signOutOnClick } className="">
                                    Sign Out
                                </Link>
                            </div>
                        </Button>
                        }
                    </div>
                </div>
            ) : (
                <></>
            
            )}
        </nav>
    )
} 

export default Navbar