import styles from './Head.module.scss';
import Image from 'next/image';
import {useState, MouseEvent} from "react";
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const Head = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <section className={`${styles['layout-head']} border-b border-gray-200 pr-8 pl-8`}>
            <div className={`${styles.logo} align-middle`}>
                <div className={`align-middle`}>
                    <Image src="/logo.jpg" width={40} height={40} layout={undefined}/>
                </div>
                <div className={`text-2xl leading-none ml-2 text-yyy-yellow`}>日程表</div>
            </div>
            {/** 右上角控制台按钮 **/}
            <div className={`${styles.nav}`}>
                {/** 个人信息 **/}
                <div>
                    <div className={`cursor-pointer transition-all`}>
                        <Stack direction="row" spacing={2} onClick={(e) => handleClick(e)}>
                            <Avatar alt="Remy Sharp" src="/logo.jpg"/>
                        </Stack>
                    </div>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose} className={`text-2`}>个人信息</MenuItem>
                        <MenuItem onClick={handleClose} className={`text-2`}>设置</MenuItem>
                        <MenuItem onClick={handleClose} className={`text-2`}>注销</MenuItem>
                    </Menu>
                </div>
            </div>
        </section>
    )
}

export default Head;