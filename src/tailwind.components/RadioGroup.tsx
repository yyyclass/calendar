import {useMemo, cloneElement} from "react";
import getDataType from "../utils/getDataType";

interface RadioGroup {
    /**
     * 点击事件
     * @param v 点击返回的 Radio value值
     * @param e Event对象
     */
    onClick?(v: string, e: Event): void;

    children: any;
}


const RadioGroup = ({children, ...props}: RadioGroup) => {
    // 处理单个Radio组件 和 单个组件不是Radio的情况
    if (getDataType(children) === 'object' && children.type.name === "Radio") {
        return children
    }

    if (getDataType(children) === 'object' && children.type.name === undefined) {
        throw new Error(`This element is not "<Radio/>" component`)
    }

    const RadioList = useMemo(() => {
        // 过滤不符合条件的元素
        const filterRadio = children.filter(radio => {
            return typeof radio.type !== "string" || radio.type.name === "Radio"
        });

        // 给radio 注册点击事件自己key值，并且返回列表
        return filterRadio.map((radio, key) => (
            cloneElement(radio, {
                ...props,
                onClick: props.onClick,   // 点击事件
                key: radio.props.key ?? key
            }, radio.children)
        ));

    }, [children, props])

    return (
        <div className={`w-max inline-block h-max`}>
            {RadioList}
        </div>
    )
}

export default RadioGroup;