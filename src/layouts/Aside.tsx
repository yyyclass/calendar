import {useMemo} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import styles from './Aside.module.scss';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';

import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';


interface Menus {
    id: number;
    href: string;
    text: string;
    icon: any;
}

const menus: Menus[] = [
    {
        id: 1,
        href: '/todo',
        text: 'Todo',
        icon: <TaskOutlinedIcon color="primary" className="text-yyy-yellow"/>
    },
    {
        id: 2,
        href: '/calendar',
        text: 'Calendar',
        icon: <CalendarTodayOutlinedIcon color="primary" className="text-yyy-yellow"/>
    },
    {
        id: 3,
        href: '/project',
        text: 'Project',
        icon: <IntegrationInstructionsOutlinedIcon color="primary" className="text-yyy-yellow"/>
    }
]

const Aside = () => {
    const router = useRouter();

    const MenuList = useMemo(() => {
        return (
            <List
                sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                component='nav'
                aria-labelledby='nested-list-subheader'
                className={`dark:text-gray-400 dark:bg-yyy-d_container`}
            >
                {
                    menus.map((menu) => (
                        <Link href={menu.href} key={menu.id}>
                            <div className={`${styles['a-block']} rounded-lg ${router.pathname === menu.href ? 'bg-gray-200 dark:text-gray-100 dark:bg-yyy-d_nav' : ''}`}>
                                <ListItemButton>
                                    {menu.icon}
                                    <span className={`ml-4`}>{menu.text}</span>
                                </ListItemButton>
                            </div>
                        </Link>
                    ))
                }
            </List>
        )
    }, [router.pathname]);

    return (
        <div className={`${styles['aside-page']} border-r border-gray-200 dark:bg-yyy-d_container dark:border-gray-900`}>
            {MenuList}
        </div>
    )
}

export default Aside;