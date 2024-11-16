'use client'
import React from 'react'
import { Provider } from 'react-redux';
import store from '../redux/store';

import { ThemeProvider } from "next-themes";

export default function Redux({ children }) {

    return (
        <Provider store={store}>
            <ThemeProvider attribute="class">
                {children}
            </ThemeProvider>

        </Provider>



    );
}

