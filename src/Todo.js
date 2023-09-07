import React from 'react';
import './Todo.css';
import { useState , useRef , useEffect} from 'react';
import { IoMdDoneAll } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

function Todo() {
    const[input , setInput] = useState('');
    const[datas , setDatas] = useState([]);
    const[editId , setEditId] = useState(0);


    const handleSubmit = (e) =>{
        e.preventDefault();
    }


    const addInput = () =>{
        if(input !== ''){
            setDatas([...datas, {list : input , id : Date.now() , status : false}]);
            setInput('');
        }
        if(editId){
            const editTodo = datas.find((todo) => todo.id === editId)
            const updateTodo = datas.map((does) => does.id === editTodo.id
            ? (does = {id : does.id , list : input})
            : (does = {id : does.id , list : does.list}));
            setDatas(updateTodo);
            setEditId(0);
            setInput('');
        }
    };

    const inputRef = useRef('null')

    useEffect(()=>{
        inputRef.current.focus();
    });

    const onDelete = (id) =>{
        setDatas(datas.filter((todo) => todo.id !== id));
    }

    const onComplete = (id) =>{
        let complete = datas.map((todo) =>{
            if(todo.id === id){
                return ({...todo , status : !todo.status});
            }
            return todo;
        });
        setDatas(complete);
    };

    const onEdit = (id) =>{
        const editTodo = datas.find((todo) => todo.id === id);
        setInput(editTodo.list);
        setEditId(editTodo.id);
        console.log(editTodo)
    };

  return (
    <div className='container'>
        <h2>MAKE YOUR TODO'S</h2>
        <form className='form-group' onSubmit={handleSubmit}>
            <input onChange={(event)=> setInput(event.target.value)} type="text" value={input} ref={inputRef} placeholder='Enter your Todo' className='form-control' />
            <button onClick={addInput}> {editId ? 'EDIT' : 'ADD'} </button>
        </form>
        <div className='list'>
            <ul>
                {
                    datas.map((li) =>(
                        <li className='list-items'>
                            <div className='list-items-li' id= {li.status ? 'li-item' : ''}>{li.list}</div>
                            <span>
                                <IoMdDoneAll className='list-items-icon' id='complete' title='Complete' onClick={() =>onComplete(li.id)} />
                                <FiEdit className='list-items-icon' id='edit' title='Edit' onClick={() =>onEdit(li.id)} />
                                <MdDelete className='list-items-icon' id='delete' title='Delete' onClick={() =>onDelete(li.id)} />
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default Todo