import FrontDeskLayout from "../../layouts/FrontDeskLayout";
import AddIcon from "@mui/icons-material/Add";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import {useCallback, useMemo, useState} from "react";
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
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

const test: TaskList[] = []

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

const Todo = () => {
    const [addTaskDialogEl, setAddTaskDialogEl] = useState(null); // 点击添加任务清单，弹出的对话框的挂载 DOM 元素
    const [taskValue, setTaskValue] = useState<string>(""); // 添加任务清单的 input 属性
    const [taskTabColor, setTaskTabColor] = useState<string>('gray');
    const [taskList, setTaskList] = useState<TaskList[] | []>(test); // 任务清单列表
    const [moreDialogEl, setMoreDialogEl] = useState(null); // 点击任务清单更多按钮，弹出的对话框的挂载 DOM 元素
    const [deleteConfirmEl, setDeleteConfirmEl] = useState(null); // 点击删除按钮，弹出的对话框挂载的 DOM 元素
    const [currentActiveTask, setCurrentActiveTask] = useState<TaskList | null>(null); // 当前访问的任务清单
    const [currentMoreTask, setCurrentMoreTask] = useState<TaskList | null>(null); // 当前更多操作的任务清单数据（编辑、删除）
    const [isEditTask, setIsEditTask] = useState(false); // 当前是否编辑任务清单

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
        //
        _taskList[index] = {
            ...taskList[index],
            text: taskValue,
            tab: taskTabColor
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
    }, [taskList])


    /**
     * 任务清单的删除对话框关闭触发的函数
     */
    const handleTaskOpenConfirmClose = () => {
        setDeleteConfirmEl(null);
    }

    const handleClickTask = useCallback((e, task) => {
        e.nativeEvent.stopImmediatePropagation();
        setCurrentActiveTask(task);
    }, [currentActiveTask])

    // 清单任务列表
    const TaskListUseMemo = useMemo(() => {
        if (!(taskList.length > 0)) {
            return null;
        }

        return (
            <div>
                <List>
                    {
                        taskList.map((task: TaskList) => (
                            <ListItem
                                key={task.id}
                                className={`${styles.tasklist} ${currentActiveTask?.id === task.id ? "bg-gray-100" : ""} h-9 hover:bg-gray-100 rounded-2xl text-xs cursor-default mb-0.5 flex-grow w-auto`}
                                onClick={(e) => {
                                    // 访问？？？
                                    // handleClickTask(e, task)
                                }}
                                disableGutters
                                secondaryAction={(
                                    <Tooltip title="更多" placement="right">
                                        <div onClick={(e) => {
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

                                <p className={`inline-block truncate text-sm text-gray-800 mr-2`}>{task.text}</p>
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        )
    }, [taskList, moreDialogEl, currentActiveTask]);

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
    }, [taskTabColor])


    return (
        <section className={`${styles["todo-page"]}`}>
            <div className={`p-2.5 w-auto`}>
                <p className={`cursor-default font-medium pb-2 `}>任务清单</p>
                <div
                    className={`inline-flex p-2 m-1 cursor-pointer text-yyy-yellow`}
                    onClick={handleAddTask}
                >
                    <AddIcon/>
                    <span className={``}>添加任务清单</span>
                </div>

                {/** 添加任务清单对话框 **/}
                <Popover
                    open={!!addTaskDialogEl}
                    anchorEl={addTaskDialogEl}
                    onClose={handleCloseNewTaskDialog}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                >
                    <div className={`p-4`}>
                        {/** 清单名称输入框 **/}
                        <div className={`mb-2`}>
                            <TextField
                                autoFocus
                                label="清单任务名称"
                                value={taskValue}
                                required
                                onChange={handleChangeNewTaskValue}
                            />
                        </div>
                        {/** 任务清单标签颜色选择 **/}
                        <div>
                            <p className={`text-sm text-gray-400 ml-1`}>任务清单标签颜色</p>
                            {RadioGroupUseMemo}
                        </div>
                        <div className={`text-right mt-2`}>
                            {
                                isEditTask ?
                                    <Button disabled={taskValue === ""} variant="contained" size="small" className={`bg-green-400`} onClick={handleEditTaskSucceed}>确认</Button> :
                                    <Button disabled={taskValue === ""} variant="contained" size="small" className={`bg-yyy-yellow`} onClick={handleCreateTaskSucceed}>确认创建</Button>
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
                    <div className={`pl-3 pr-3 pt-2 pb-2`}>
                        <Tooltip title="编辑" placement="top">
                            <EditIcon className={`cursor-pointer`} onClick={handleTaskOpenEditDialog}/>
                        </Tooltip>
                        <Tooltip title="删除" placement="top">
                            <DeleteIcon
                                className={`cursor-pointer`}
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
            <div className={`p-2.5 w-5/6 mr-auto ml-auto pt-5`}>
                <h1>标签:{currentActiveTask?.text}</h1>
            </div>
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

export default Todo;