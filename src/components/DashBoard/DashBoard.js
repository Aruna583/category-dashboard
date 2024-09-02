import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { sampleData } from '../../utils/helpers';
import './DashBoard.css'
import AddWidget from './AddWidget';
import { removeWidget } from '../../widgetSlice';
import { ImCross } from "react-icons/im";
import SearchBar from './SearchBar';
import AddCategorySection from './AddCategorySection';


const DashBoard = () => {
    const categories = useSelector(state => state.widgets.categories);
    const dispatch = useDispatch();
    const [isSidePanelOpen, setSidePanelOpen] = useState(false); 
    const [categoryId, setCategoryId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryTab, setCategoryTab] = useState(false);


    const filterWidgets = () => {
        if(!searchTerm.trim()){
            return categories;
        }
        const lowerSearch = searchTerm.toLowerCase();
        return categories.map(category => {
            const filteredWidgets = category.widgets.filter(widget => 
                widget.name.toLowerCase().includes(lowerSearch)
            );
            return {...categories, widgets: filteredWidgets}
        }).filter(category => 
            category.widgets.length >0
        )
    }

    const filteredCategories = filterWidgets();

const handleOpenPanel = (id) =>{
    setCategoryId(id)
    setSidePanelOpen(true);
}

const handleClosePanel =() =>{
    setSidePanelOpen(false)
}

const handleRemoveWidget = (categoryId, widgetId) =>{
dispatch(removeWidget({categoryId, widgetId}))
}

const handleCategoryTabClose = () =>{
    setCategoryTab(false)
}
  return (
    <div className='category-card'>
        <div className='category-heading'>
        <h1>CNPP DashBoard</h1> 
        {/* <AddCategorySection /> */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <button className='button-element' onClick={() => {setCategoryTab(true)}}>Add Widget +</button>
        </div>
        <div>
        {filteredCategories.map(category =>(
            <div key={category.id} className='category-section-items'>
                <h1>{category.name}</h1>
                <div className='widget-card'>
                    {category?.widgets?.map(widget=>(
                        <div key={widget.id} className='widget-card-item'>
                            
                            <div className='card-item-content'>
                            <span className='widget-name'>{widget.name}</span>
                            <span className='widget-text'>{widget.text}</span>
                            
                           
                            {/* <div>
                            <p className='widget-name'>{"Connected"}</p>
                            <p>{"Not Connectetd"}</p>
                            </div> */}
                            </div>
                            <div>
                            <button 
                            onClick={()=>handleRemoveWidget(category.id, widget.id)}
                            className='delete-icon'
                            key={widget.id}
                            >
                                <ImCross className='delete-icon-align' />
                            </button>
                            </div>
                            {/* <button onClick={()=>{}}>Remove</button> */}
                        </div>
                    ))}
                    <div className='widget-card-item widget-card-add-item' key={category.id}>
                    <button className='button-element' onClick={() => handleOpenPanel(category.id)}>Add Widget +</button>
                    </div>
                </div>
                {isSidePanelOpen && <AddWidget categoryId={categoryId} isOpen={isSidePanelOpen} onClose={handleClosePanel}/>}
                {categoryTab && <AddCategorySection isOpen={categoryTab} onClose={handleCategoryTabClose}/>}
            </div>
        )
        )}
        </div>
        
    </div>
  )
}

export default DashBoard