/**
 * action 对象的基本结构
 */
interface IActionCommon<T extends string, F> {
    /**
     * 触发行为的类型
     */
    type: T,
    /**
     * 负载数据
     */
    payload: IActionPayloadCommon<F>
}

/**
 * action.payload 对象的基本结构
 */
interface IActionPayloadCommon<T> {
    /**
     * 设置的数据项
     */
    data: T,
    /**
     * 当前行为说明
     */
    text: string
}

export type{
    IActionCommon,
    IActionPayloadCommon
}