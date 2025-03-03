import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import AsideNavigation from "../components/AsideNavigation";
export default function RootLayout () {

    return <>
            <section className="container">
                 <div className="permanent-container">
                    <MainNavigation/>
                </div>
                <div className="main-container-wrapper">
                <div className="main-container">
                    <AsideNavigation/>
                    <section className="content-container"><Outlet/></section>
                </div>
                </div>
            </section>
           </>
}
