import styles from '../../styles/Home.module.css'
import Index from "../layouts/FrontDeskLayout";

const Home = (props) => {
    return (
        <div className={styles.container}>
        </div>
    )
}

Home.getLayout = (page) => (
    <>
        <Index>
            {page}
        </Index>
    </>
)

export default Home
