import FrontDeskLayout from "../../layouts/FrontDeskLayout";

const Project = () => {
    return (
        <section>
            项目
        </section>
    )
}

Project.getLayout = (page) => (
    <>
        <FrontDeskLayout>
            {page}
        </FrontDeskLayout>
    </>
)

export default Project;