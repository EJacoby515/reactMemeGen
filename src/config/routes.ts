import Home from "../pages/Home";
import About from "../pages/About";
import Meme from "../pages/Meme";
import Signin from "../pages/Signin";
import Signout from "../pages/Signout";

interface RouteType  {
    path: string,
    component: ()  => JSX.Element,
    name: string
}
const routes:  RouteType  [] =[
    {
        path: '',
        component: Home,
        name: 'Home Screen',
    },
    {
        path: '/About',
        component: About,
        name: 'About',
    },
    {
        path: '/Meme',
        component: Meme,
        name: 'Meme',
    },
    {
        path: '/Signin',
        component: Signin,
        name: 'Signin',
    },
    {
        path: '/Signout',
        component: Signout,
        name: 'Signout',
    }

]; export default routes