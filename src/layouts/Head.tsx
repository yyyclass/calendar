import styles from './Head.module.scss';
import Image from 'next/image';
import {useState} from "react";
import {connect} from 'react-redux';

import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ThemeSwitch from "../tailwind.components/Switch";
import {IStoreThemeState} from "../store/reducers/theme";
import {actionSetTheme} from "../store/actions/theme";

export interface IHead {
    theme: IStoreThemeState;
    onChangeTheme(theme: IStoreThemeState): void
}

const Head = ({theme, onChangeTheme}: IHead) => {
    const [anchorListEl, setAnchorListEl] = useState<null | HTMLElement>(null);

    /**
     * 显示 菜单列表
     * @param e
     */
    const handleOpenMenuList = (e: any) => {
        setAnchorListEl(e.currentTarget);
    };

    /**
     * 隐藏 菜单列表
     */
    const handleCloseMenuList = () => {
        setAnchorListEl(null);
    };


    return (
        <section className={`${styles['layout-head']} border-b border-gray-200 dark:border-gray-900 pr-8 pl-8 dark:bg-yyy-d_head`}>
            <div className={`${styles.logo} align-middle`}>
                <div className={`align-middle`}>
                    <Image src="/logo.jpg" className={` dark:bg-gray-900`} width={40} height={40} layout={undefined} alt='logo'/>
                </div>
                <div className={`text-2xl leading-none ml-2 text-gray-800 dark:text-gray-200`}>日程表</div>
            </div>
            {/** 右上角控制台按钮 **/}
            <div className={`${styles.nav}`}>
                {/** 个人信息 **/}
                <div>
                    <div className={`cursor-pointer transition-all`} onClick={handleOpenMenuList}>
                        <Stack direction="row" spacing={2}>
                            <Avatar alt="Remy Sharp" src="/logo.jpg"/>
                        </Stack>
                    </div>
                    <Popover
                        id="user-information"
                        open={!!anchorListEl}
                        anchorEl={anchorListEl}
                        onClose={handleCloseMenuList}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            horizontal: 'left',
                            vertical: 'top'
                        }}
                    >
                        <List
                            className={`border-r border-l border-b dark:bg-yyy-d_head dark:border-gray-800 dark:text-gray-200`}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader"  className={`dark:bg-yyy-d_head dark:text-gray-200`}>
                                    你的id: yyyclass
                                </ListSubheader>
                            }
                        >
                            <ListItemButton className={`w-60 dark:hover:bg-gray-600`}>
                                <ListItemIcon className={`min-w-max mr-2`}>
                                    <ManageAccountsIcon className={`dark:text-gray-200`}/>
                                </ListItemIcon>
                                <p className={`text-sm flex-grow`}>个人信息</p>
                            </ListItemButton>
                            <ListItemButton className={`dark:hover:bg-gray-600`}>
                                <ListItemIcon className={`min-w-max mr-2`}>
                                    <DarkModeIcon className={`dark:text-gray-200`}/>
                                </ListItemIcon>
                                <p className={`text-sm mr-4`}>颜色主题</p>
                                <div className={`flex-grow text-right`}>
                                    <ThemeSwitch  theme={theme} onChangeTheme={onChangeTheme}/>
                                </div>
                            </ListItemButton>
                            <ListItemButton className={`dark:hover:bg-gray-600`}>
                                <ListItemIcon className={`min-w-max mr-2`}>
                                    <LogoutIcon className={`dark:text-gray-200`}/>
                                </ListItemIcon>
                                <p className={`text-sm`}>注销</p>
                            </ListItemButton>
                            {/*<ListItemButton onClick={handleClickPicture}>*/}
                            {/*    <ListItemIcon>*/}
                            {/*        <InboxIcon />*/}
                            {/*    </ListItemIcon>*/}
                            {/*    <ListItemText primary="Inbox" />*/}
                            {/*    {open ? <ExpandLess /> : <ExpandMore />}*/}
                            {/*</ListItemButton>*/}
                            {/*<Collapse in={open} timeout="auto" unmountOnExit>*/}
                            {/*    <List component="div" disablePadding>*/}
                            {/*        <ListItemButton sx={{ pl: 4 }}>*/}
                            {/*            <ListItemIcon>*/}
                            {/*                <StarBorder />*/}
                            {/*            </ListItemIcon>*/}
                            {/*            <ListItemText primary="Starred" />*/}
                            {/*        </ListItemButton>*/}
                            {/*    </List>*/}
                            {/*</Collapse>*/}
                        </List>
                    </Popover>
                </div>
            </div>
        </section>
    )
}


const mapStateToProps = (state) => ({
    theme: state.theme
})

const mapDispatchToProps = (dispatch) => ({
    onChangeTheme(theme: IStoreThemeState) {
        dispatch(actionSetTheme(theme))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Head);