import Head from "../Head";
import Aside from "../Aside";

const FrontDeskLayout = ({children}:any)=>{
    return (
        <>
            <Head/>
            <section id="app-aside" className={`dark:bg-yyy-d_container`}>
                <Aside/>
                {children}
            </section>
        </>
    )
}

export default FrontDeskLayout;