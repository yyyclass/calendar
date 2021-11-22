import Head from "../Head";
import Aside from "../Aside";

const FrontDeskLayout = ({children}:any)=>{
    return (
        <>
            <Head/>
            <section id="app-aside">
                <Aside/>
                {children}
            </section>
        </>
    )
}

export default FrontDeskLayout;