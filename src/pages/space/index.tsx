import ControlDeskLayout from "../../layouts/ControlDeskLayout";

const Space = () => {
    return (
        <div>个人空间</div>
    )
}

Space.getLayout = page => (
    <>
        <ControlDeskLayout>
            {page}
        </ControlDeskLayout>
    </>
)

export default Space;