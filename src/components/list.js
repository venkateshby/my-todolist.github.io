import React, { useState, useEffect } from 'react'
import "./style.css"

const getLocalData = () => {
    const list = localStorage.getItem("mytodolist");
    if (list) {
        return JSON.parse(list);
    } else {
        return [];
    }
};

const MyList = () => {
    const [inputData, setinputData] = useState("");
    const [items, setitems] = useState(getLocalData());
    const [isEditItem, setisEditItem] = useState("");
    const [toggleBtn, settoggleBtn] = useState(false)

    const addItem = () => {
        if (!inputData) {
            alert('please enter the data')
        } else if (inputData && toggleBtn) {
            setitems(items.map((curElem) => {
                if (curElem.id === isEditItem) {
                    return { ...curElem, name: inputData }
                }
                return curElem;
            })
            );
            setinputData([]);
            setisEditItem(null);
            settoggleBtn(false);
        }
        else {
            const newInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            };
            setitems([...items, newInputData])
            setinputData("");
        }
    }

    const editItem = (index) => {
        const edit = items.find((curElem) => {
            return curElem.id === index;
        })
        setinputData(edit.name);
        setisEditItem(index);
        settoggleBtn(true);
    }

    const deleteItem = (index) => {
        const updatedItem = items.filter((curElem) => {
            return curElem.id !== index;
        })
        setitems(updatedItem);
    }

    const removeAll = () => {
        setitems([]);
    }

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items])


    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="✍ Add Item" className="form-control"
                            value={inputData} onChange={(event) => setinputData(event.target.value)} />
                        {
                            toggleBtn ? <i className="far fa-edit add-btn" onClick={addItem}></i> : <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        }

                    </div>
                    <div className="showItems">
                        {items.map((curElem, index) => {
                            return (
                                <div className="eachItem" key={index}>
                                    <h3>{curElem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyList
