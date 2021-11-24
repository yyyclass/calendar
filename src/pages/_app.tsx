import '../../styles/globals.css';
import Head from 'next/head';
import type {ReactElement, ReactNode} from 'react';
import type {NextPage} from 'next';
import type {AppProps} from 'next/app';
import {useRouter} from "next/router";
import {Provider} from 'react-redux';
import {makeStore} from "../store";
import {useEffect} from "react";
import {actionSetTheme} from "../store/actions/theme";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({Component, pageProps, ...props}: AppPropsWithLayout) {
    const router = useRouter();
    const getLayout = Component.getLayout ?? ((page) => page);
    const {_initialStore} = pageProps;

    const store = makeStore(_initialStore);
    // 初始化 theme 数据仓库
    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if(theme){
            store.dispatch(actionSetTheme(theme as any))
        }

    }, []);

    return (
        <Provider store={store}>
            <Head>
                <title>日程表</title>
            </Head>
            {
                getLayout(<Component {...pageProps} />)
            }
        </Provider>

    )
}

export default MyApp
