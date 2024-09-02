import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addWidget } from '../../widgetSlice';
import { ImCross } from "react-icons/im";
import './AddWidget.css'

const AddWidget = ({categoryId, isOpen, onClose}) => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const dispatch = useDispatch()

    const handleSubmit = e=>{
        e.preventDefault();
        if(name.trim() && text.trim()){
            const newWidget = {
                id: `${categoryId}-${Date.now()}`,
                name,
                text
            }
            console.log(newWidget)
            dispatch(addWidget({categoryId, widget: newWidget}))
            setName('')
            setText('')
        }
       
    }


  return (
    <div className={`side-panel ${isOpen ? 'open': ''}`}>
        <div className='side-panel-header'>
                <h1>Add Widget</h1>
                <button onClick={onClose} className='button-cancel-icon'>
                    <ImCross/>
                </button>
            </div>
            <div className='form-alignment'>
            <form onSubmit={handleSubmit}>
                <div className='input-div'>
                    <label className='label-name'>Name</label>
                    <input 
                    placeholder='Widget Name' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}

                    />
                </div>
                <div className='input-div'>
                <label className='label-name'>Text</label>
                    <input 
                    placeholder='Widget text' 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <button type="submit" className='add-item'>Add Item</button> 
            </form>
            </div>
    </div>
  )
}

export default AddWidget;