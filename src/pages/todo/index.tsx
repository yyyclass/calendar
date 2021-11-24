import FrontDeskLayout from "../../layouts/FrontDeskLayout";
import AddIcon from "@mui/icons-material/Add";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import {useCallback, useEffect, useMemo, useState} from "react";
import styles from "./index.module.scss";
import {v4 as uuidv4} from "uuid";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Radio from "../../tailwind.components/Radio";
import RadioGroup from "../../tailwind.components/RadioGroup";
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import ThemeSwitch from "../../tailwind.components/Switch";


interface TaskList {
    /**
     * uuid
     */
    id: number;
    /**
     * 任务清单名字
     */
    text: string;

    /**
     * 颜gray标签
     */
    tab: string;
}

interface TodoProps{
    taskList: TaskList[] | []
}

const Todo = (props:TodoProps) => {
    const [addTaskDialogEl, setAddTaskDialogEl] = useState(null); // 点击添加任务清单，弹出的对话框的挂载 DOM 元素
    const [taskValue, setTaskValue] = useState<string>(""); // 添加任务清单的 input 属性
    const [taskTabColor, setTaskTabColor] = useState<string>('gray'); // 任务清单的标签颜色
    const [taskList, setTaskList] = useState<TaskList[] | []>([]); // 任务清单列表
    const [moreDialogEl, setMoreDialogEl] = useState(null); // 点击任务清单更多按钮，弹出的对话框的挂载 DOM 元素
    const [deleteConfirmEl, setDeleteConfirmEl] = useState(null); // 点击删除按钮，弹出的对话框挂载的 DOM 元素
    const [currentMoreTask, setCurrentMoreTask] = useState<TaskList | null>(null); // 当前更多操作的任务清单数据（编辑、删除）
    const [isEditTask, setIsEditTask] = useState(false); // 当前是否编辑任务清单
    const [currentActiveTask, setCurrentActiveTask] = useState<TaskList | null>(null); // 当前访问的任务清单
    const [currentActiveTaskContent, setCurrentActiveTaskContent] = useState(""); // 当前访问的任务清单数据


    useEffect(() => {
        (async () => {
            const result = await fetch('/api/todo').then(res => res.json());
            if (result.data) {
                setTaskList(result.data)
            }

        })()
    }, [])

    /**
     * 点击添加任务清单，触发的函数
     * @param e
     */
    const handleAddTask = (e) => {
        setAddTaskDialogEl(e.currentTarget)
    }

    /**
     * 添加任务清单过程中，清单任务名称输入改变触发的函数
     * @param e
     */
    const handleChangeNewTaskValue = (e) => {
        setTaskValue(e.target.value)
    }

    /**
     * 添加任务清单过程中，清单任务标签颜色选择点击触发的函数
     * @param e
     */
    const handleChooseTaskTitleColor = (e: string) => {
        setTaskTabColor(e)
    }

    /**
     * 添加任务清单过程中，关闭添加任务清单对话框，触发的函数，初始化到默认状态
     */
    const handleCloseNewTaskDialog = () => {
        setAddTaskDialogEl(null);
        setTaskValue("");
        setTaskTabColor("gray")
        setIsEditTask(false)
    }

    /**
     * 任务清单更多操作过程中，关闭对话框触发的函数，初始化状态
     */
    const handleCloseMoreDialog = () => {
        setMoreDialogEl(null);
        setCurrentMoreTask(null);
    }

    /**
     * 点击删除按钮触发的函数，设置挂载DOM
     */
    const handleClickDeleteIcon = (e) => {
        setDeleteConfirmEl(e.currentTarget)
    }

    /**
     * 删除一个任务清单所触发的函数
     */
    const handleDeleteTask = () => {
        const index = taskList.findIndex(_task => currentMoreTask?.id === _task.id); // 寻找删除的元素的数组下标
        let _taskList = [...taskList]; // 创建一个数组，不能直接等于，否则引用
        _taskList.splice(index, 1); // 根据下标删除数组中的一项
        setTaskList(_taskList); // 设置新的任务清单数组
        // 当做操作和当前访问的任务清单相同，那么删除的同时，顺便结束访问
        if (currentMoreTask?.id === currentActiveTask?.id) {
            setCurrentActiveTask(null);
            setCurrentActiveTaskContent("")
        }
        handleCloseMoreDialog(); // 任务清单更多操作过程中，关闭对话框触发的函数，初始化状态
        handleTaskOpenConfirmClose(); // 任务清单的删除对话框关闭触发的函数
    }

    /**
     * 成功创建一个任务清单所触发的函数
     */
    const handleCreateTaskSucceed = () => {
        setTaskList([...taskList, {id: uuidv4(), text: taskValue, tab: taskTabColor}]);
        handleCloseNewTaskDialog();
    }

    /**
     * 打开修改任务清单对话框以及填充旧数据
     * @param e
     */
    const handleTaskOpenEditDialog = (e) => {
        setAddTaskDialogEl(e.target);
        setTaskValue(currentMoreTask?.text || "");
        setIsEditTask(true);
        setTaskTabColor(currentMoreTask?.tab || "gray");
    }

    /**
     * 成功修改一个任务清单所触发的函数
     */
    const handleEditTaskSucceed = () => {
        const index = taskList.findIndex(task => currentMoreTask?.id === task.id); // 获取到当前编辑任务清单的数组下标
        const _taskList = [...taskList]; // 复制一个数组
        _taskList[index] = {
            ...taskList[index],
            text: taskValue,
            tab: taskTabColor
        }
        if (currentActiveTask?.id === currentMoreTask?.id) {
            setCurrentActiveTask(_taskList[index])
        }
        setTaskList(_taskList);
        setIsEditTask(false);
        handleCloseMoreDialog();
        handleCloseNewTaskDialog();
    }

    /**
     * 单个任务清单的更多操作所触发的函数
     * @param e
     * @param task
     */
    const handleTaskOpenMoreDialog = useCallback((e, task: TaskList) => {
        setCurrentMoreTask({...task});
        setMoreDialogEl(e.target);
        e.stopPropagation(); // 禁止捕获，防止后续的click事件
    }, [taskList])


    /**
     * 任务清单的删除对话框关闭触发的函数
     */
    const handleTaskOpenConfirmClose = () => {
        setDeleteConfirmEl(null);
    }

    /**
     * 设置当前访问的任务清单
     */
    const handleClickTask = useCallback((e, task) => {
        setCurrentActiveTask(task);
    }, [currentActiveTask]);

    /**
     * 根据当前访问的任务清单 id 请求数据
     */
    useEffect(() => {
        (async () => {
            if (currentActiveTask?.id) {
                const todoContent = await fetch(`/api/todo/${currentActiveTask.id}`).then(res => res.json());
                if (todoContent.content) {
                    setCurrentActiveTaskContent(todoContent.content)
                }
            }
        })();
    }, [currentActiveTask?.id])

    // 清单任务列表组件
    const TaskListUseMemo = useMemo(() => {
        if (!(taskList.length > 0)) {
            return (
                <div>
                    <Skeleton variant="text"/>
                    <Skeleton variant="text"/>
                    <Skeleton variant="text"/>
                </div>
            )
        }

        return (
            <div>
                <List>
                    {
                        taskList.map((task: TaskList) => (
                            <ListItem
                                key={task.id}
                                className={`${styles.tasklist} ${currentActiveTask?.id === task.id ? "bg-gray-100 dark:bg-gray-800" : ""} h-9 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl text-xs cursor-default mb-0.5 flex-grow w-auto`}
                                onClick={(e) => handleClickTask(e, task)}
                                disableGutters
                                secondaryAction={(
                                    <Tooltip title="更多" placement="right">
                                        <div
                                            className={`mr-1`}
                                            onClick={(e) => {
                                                handleTaskOpenMoreDialog(e, task);
                                            }}>
                                            <ExpandMoreIcon
                                                key={task.id}
                                                className={`${styles.more} ${currentMoreTask?.id === task.id ? styles["more-un"] : ""} text-gray-400 cursor-pointer rounded-2xl`}
                                            />
                                        </div>
                                    </Tooltip>
                                )}
                            >
                                <div className={`relative ml-4 mr-4`}>
                                    <div className={`transform  absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-6 h-6`}>
                                        <Radio className={``} checked={false} value={task.tab} color={`bg-${task.tab}-400`}/>
                                    </div>
                                </div>

                                <p className={`inline-block truncate text-sm text-gray-800 dark:text-gray-400`}>{task.text}</p>
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        )
    }, [taskList, moreDialogEl, currentActiveTask]);

    // 任务清单颜色标签列表组件
    const RadioGroupUseMemo = useMemo(() => {
        return (
            <RadioGroup onClick={handleChooseTaskTitleColor}>
                <Radio className={`ml-0`} value={"gray"} checked={taskTabColor === "gray"} color={`bg-gray-400`}/>
                <Radio value={"pink"} checked={taskTabColor === "pink"} color={`bg-pink-400`}/>
                <Radio value={"blue"} checked={taskTabColor === "blue"} color={`bg-blue-400`}/>
                <Radio value={"green"} checked={taskTabColor === "green"} color={`bg-green-400`}/>
                <Radio value={"yellow"} checked={taskTabColor === "yellow"} color={`bg-yellow-400`}/>
                <Radio value={"red"} checked={taskTabColor === "red"} color={`bg-red-400`}/>
            </RadioGroup>
        )
    }, [taskTabColor]);

    // 任务清单详细内容组件
    const TaskDetail = useMemo(() => {
        return (
            <div className={`p-2.5 w-5/6 mr-auto ml-auto pt-5 dark:text-gray-300`}>
                <h1 className={`text-xl mt-4 mb-6`}>{currentActiveTask?.text}</h1>
                <div>
                    <p>{currentActiveTaskContent}</p>
                </div>
            </div>
        )
    }, [currentActiveTask, currentActiveTaskContent])

    return (
        <section className={`${styles["todo-page"]}`}>
            <div className={`p-2.5 border-r w-auto dark:text-gray-200 dark:border-gray-900`}>
                <p className={`cursor-default font-medium pb-2`}>任务清单</p>
                <div
                    className={`inline-flex p-2 m-1 cursor-pointer text-gray-800`}
                    onClick={handleAddTask}
                >
                    <AddIcon className={`dark:text-gray-200`}/>
                    <p className={`dark:text-gray-200`}>添加任务清单</p>
                </div>

                {/** 添加任务清单对话框 **/}
                <Popover
                    open={!!addTaskDialogEl}
                    anchorEl={addTaskDialogEl}
                    transitionDuration={{exit: 0.2}}
                    onClose={handleCloseNewTaskDialog}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                >
                    <div className={`p-4 dark:bg-black`}>
                        {/** 清单名称输入框 **/}
                        <div className={`mb-2 dark:text-gray-200`}>
                            <TextField
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        handleCreateTaskSucceed();
                                        e.stopPropagation();
                                    }
                                }}
                                autoFocus
                                inputProps={{
                                    className: `dark:text-gray-200`
                                }}
                                label="清单任务名称"
                                value={taskValue}
                                required
                                onChange={handleChangeNewTaskValue}
                            />
                        </div>
                        {/** 任务清单标签颜色选择 **/}
                        <div>
                            <p className={`text-sm text-gray-400 ml-1 mb-1`}>任务清单标签颜色</p>
                            {RadioGroupUseMemo}
                        </div>
                        <div className={`text-right mt-2`}>
                            {
                                isEditTask ?
                                    <Button
                                        disabled={taskValue === ""}
                                        variant="contained"
                                        size="small"
                                        className={`bg-green-400`}
                                        onClick={handleEditTaskSucceed}>确认</Button> :
                                    <Button
                                        disabled={taskValue === ""}
                                        variant="contained"
                                        size="small"
                                        className={`bg-yyy-yellow dark:bg-gray-600 ${taskValue === "" ? "dark:text-gray-400" : ""}`}
                                        onClick={handleCreateTaskSucceed}>确认创建</Button>
                            }
                        </div>
                    </div>
                </Popover>

                {/** 清单列表 **/}
                {TaskListUseMemo}
                {/** 更多操作  **/}
                <Popover
                    open={!!moreDialogEl}
                    anchorEl={moreDialogEl}
                    onClose={handleCloseMoreDialog}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                >
                    <div className={`pl-3 pr-3 pt-2 pb-2 dark:bg-black`}>
                        <Tooltip title="编辑" placement="top">
                            <EditIcon
                                className={`cursor-pointer dark:text-gray-50`}
                                onClick={handleTaskOpenEditDialog}
                            />
                        </Tooltip>
                        <Tooltip title="删除" placement="top">
                            <DeleteIcon
                                className={`cursor-pointer dark:text-gray-50`}
                                onClick={handleClickDeleteIcon}
                            />
                        </Tooltip>
                    </div>
                </Popover>

                {/** 删除弹窗对话框 **/}
                <Popover
                    open={!!deleteConfirmEl}
                    anchorEl={deleteConfirmEl}
                    onClose={handleTaskOpenConfirmClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    marginThreshold={30}
                >
                    <div className={`pl-4 pr-4 pt-2 pb-2 text-sm w-56`}>
                        <div className={`flex items-center mb-2`}>
                            <ErrorOutlineIcon color="error"/>
                            <span className={`ml-1`}>删除任务清单</span>
                        </div>
                        <p className={`mb-4`}>你确定要删除任务清单吗，删除后清单不可恢复，请你认真考虑！</p>
                        <div className={`grid grid-cols-2  text-center`}>
                            <div
                                className={`cursor-pointer w-max p-2 justify-self-end`}
                                onClick={handleTaskOpenConfirmClose}
                            >
                                <span>取消</span>
                            </div>
                            <div
                                className={`cursor-pointer w-max bg-red-500 text-white p-2 pt-0.5 pb-0.5 justify-self-end rounded self-center`}
                                onClick={handleDeleteTask}
                            >
                                <span>确定</span>
                            </div>
                        </div>
                    </div>
                </Popover>
            </div>
            {/** 清单任务 详细内容 根据点击的任务清单生成数据 **/}
            {TaskDetail}
            {/*<div className={`w-auto h-20`}>*/}
            {/*    <Snackbar*/}
            {/*        open={true}*/}
            {/*        autoHideDuration={6000}*/}
            {/*        // onClose={handleClose}*/}
            {/*        message="Note archived"*/}
            {/*        // action={action}*/}
            {/*    />*/}
            {/*</div>*/}
        </section>
    )
}


Todo.getLayout = (page) => (
    <>
        <FrontDeskLayout>
            {page}
        </FrontDeskLayout>
    </>
)


export const getServerSideProps = async (ctx) => {
    const result = await fetch('http://localhost:3000/api/todo').then(res => res.json());
    return {
        props: {
            taskList: result.data ?? []
        }
    }
}

// export const getStaticProps = async (ctx) => {
//     return {
//         props: {
//             todo: "我是辅助"
//         }
//     }
// }

export default Todo;