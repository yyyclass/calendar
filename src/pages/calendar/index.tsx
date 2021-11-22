import FrontDeskLayout from "../../layouts/FrontDeskLayout";

const Calendar = () => {
    return (
        <div>
            <h1>日历</h1>
        </div>
    )
}

Calendar.getLayout = (page) => (
    <>
        <FrontDeskLayout>
            {page}
        </FrontDeskLayout>
    </>
)


export default Calendar;