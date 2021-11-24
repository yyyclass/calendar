import FrontDeskLayout from "../../layouts/FrontDeskLayout";
import {useCallback, useMemo, useState} from "react";

const Project = (props) => {
    const [text, setText] = useState<string>("");
    const textChange = e => {
        setText(e.target.value);
    };

    const ChildMemo = useMemo(()=>{
        return <Child inputChange={textChange}/>
    },[])
    return (
        <section>
            <div>
                <div>父组件的 <span>{text}</span></div>
            </div>
            {ChildMemo}
        </section>
    )
}


function Child(props) {
    console.log("子组件改变了",props);
    return (
        <div>
            子组件的Input Text <input onChange={props.inputChange}/>
        </div>
    );
}

Project.getLayout = (page) => (
    <>
        <FrontDeskLayout>
            {page}
        </FrontDeskLayout>
    </>
)

Project.getInitialProps = async (ctx) => {
    return {
        project: "我是12312辅12312123助"
    }
}
export default Project;