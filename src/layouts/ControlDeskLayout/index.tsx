import Head from "../Head";

const ControlDeskLayout = ({children}:any)=>{
    return (
        <>
            <Head/>
            <section id="app-control">
                {children}
            </section>
        </>
    )
}

export default ControlDeskLayout;