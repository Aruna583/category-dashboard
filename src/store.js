import {configureStore} from '@reduxjs/toolkit';
import widgetsReducer from './widgetSlice.js'
export const store = configureStore({
    reducer: {
        widgets: widgetsReducer
    }
})