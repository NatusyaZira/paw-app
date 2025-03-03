import MainNavigation from "../components/MainNavigation";
import AsideNavigation from "../components/AsideNavigation";
function ErrorPage (){
    return (<section className="container">
        <div className="permanent-container">
           <MainNavigation/>
       </div>
       <div className="main-container">
           <AsideNavigation/>
           <h2>Error occured</h2>

       </div>
   </section>)
}

export default ErrorPage;