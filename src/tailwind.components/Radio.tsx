interface Radio {
    className?: string;

    /**
     * 给 Radio 组件设置颜色类名
     */
    color?: string;

    /**
     * radio 的属性值，用于判断是否选中
     */
    value: string;

    /**
     * 点击事件
     */
    onClick?(value: string, e: Event): void;

    /**
     * 已经选中的单选框
     */
    checked: boolean;
}

const Radio = (props: Radio) => {

    const handleClick = (e) => {
        props.onClick && props.onClick(props.value, e)
    }
    return (
        <div
            onClick={handleClick}
            className={`w-6 h-6 inline-block rounded-2xl relative cursor-pointer ${props.checked ? props.color : ''} ${props.className}`}>
            <div className={`absolute w-5 h-5 bg-white rounded-2xl bottom-0.5 left-0.5`}>
                <div className={`absolute w-4 h-4 bg-black rounded-2xl left-0.5 top-0.5 ${props.color}`}/>
            </div>
        </div>
    )
}

export default Radio;