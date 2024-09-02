import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget, removeWidget } from '../../widgetSlice';
import './AddCategorySection.css';
import { ImCross } from 'react-icons/im';


const AddCategorySection = ({isOpen, onClose}) => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.widgets.categories);
    const [checkedState , setCheckedState] = useState({});
    const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id || '');

    useEffect(() => {
        const initialCheckState ={};
        categories.forEach(category => {
            category.widgets.forEach(widget =>{
                initialCheckState[widget.id] = true
            }
            )
        });
        setCheckedState(initialCheckState)
    }, [categories])


    const handleCheckBoxChange = (categoryId, widget) =>{
        setCheckedState(prevState => {
            const newState = {...prevState}
            if(newState[widget.id]){
                delete newState[widget.id]
                dispatch(removeWidget({categoryId, widgetId:widget.id}))
            } else {
                newState[widget.id] = true
                dispatch(addWidget({categoryId, widget}))
            }
            return newState
        })
    }

    const handleCategoryClick = (categoryId) =>{
        setSelectedCategoryId(categoryId)
    }

  return (
    <div className={`side-panel-add ${isOpen ? 'opencate': ''}`}>
        <div className='side-panel-header-add'>
            <h1>Category Section</h1>
            <button onClick={onClose} className='button-cancel-icon-add'>
                <ImCross/>
            </button>
        </div>
        <div className='section-header'>
            {categories.map((category) => (
                <div key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`tab ${selectedCategoryId === category.id ? 'active': ''}`}
                >
                    <h3>{category.name.slice(0,4).toUpperCase()}</h3>
                </div>
            ))}
        </div>
        {categories
        .filter(category => category.id === selectedCategoryId)
        .map((category) => (
            <div key={category.id}>
                <ul className='un-list' >
                    {category.widgets.map((widget) => {
                        return(
                            <li key={widget.id} className='list-container'>
                                <input
                                id={widget.id}
                                type='checkbox'
                                checked={!!checkedState[widget.id] }
                                onChange={e => handleCheckBoxChange(category.id, widget)}
                                />
                                <p className='wid-name'>{widget.name}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        ))}
    </div>
  )
}

export default AddCategorySection