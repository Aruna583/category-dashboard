import { createSlice } from "@reduxjs/toolkit";
import { sampleData } from "./utils/helpers";
const initialState = {
    categories: sampleData.categories
}

// const findeCategoryIndex = (state, categoryId) =>{
//     return state.categories.findIndex(category => category?.id === categoryId)
// }

const widgetsSlice = createSlice({
    name: 'widgets',
    initialState,
    reducers: {
        addWidget: (state, action) => {
            const {categoryId, widget} = action.payload;
            const category = state.categories.find(cat => cat.id === categoryId)
    
            if(category && !category.widgets.find(wid => wid.id === widget.id)){
                if(widget) {
                    widget.isChecked = true
                    category.widgets.push(widget)
                }
            }
        },
        removeWidget: (state, action) =>{
            const {categoryId, widgetId} = action.payload;
            const category = state.categories.find(cat => cat.id === categoryId)
            if(category) {
                category.widgets = category.widgets.filter((wid) => wid.id !== widgetId)
            }
        },
        setCategoies: (state, action) => {
            state.categories = action.payload;
        }
    }
})

export const {addWidget, removeWidget, setCategoies} = widgetsSlice.actions

export default widgetsSlice.reducer