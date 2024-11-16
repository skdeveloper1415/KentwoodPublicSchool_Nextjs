import { configureStore } from '@reduxjs/toolkit'


// Slices

import globalState from './slices/globalState';
import Home from './slices/home';
import Popup from './slices/popup';
import Indicatorpopup from './slices/Indicatorpopup';
import Options from './slices/Options';



const store = configureStore({
    reducer: {

        "global": globalState,
        "home": Home,
        "popup": Popup,
        "indicatorpopup": Indicatorpopup,
        "options": Options,


    }
})

export default store;