import React, { useContext } from 'react'
import { myNotes } from '../App'

export default function Noteitem(props) {
    const { deletenotes } = useContext(myNotes);
    const date = new Date(props.note.date);
    return (
        <div className='col-md-3 '>
            <div className="card my-2">
                <div className="card-body my-3">
                    <div className="flex justify-content-around">
                        <div className='d-inline me-5'>
                            <i className="fa-solid fa-trash fa-2x " onClick={() => { deletenotes(props.note._id) }}></i>
                        </div>
                        <div className='d-inline'>
                            <i className="fa-solid fa-pen-to-square fa-2x" onClick={() => { props.updatenotes(props.note) }}></i>
                        </div>
                    </div>
                    <br />
                    <h2 className="card-title text-uppercase">{props.note.title}</h2>
                    <br />
                    <h5 className="card-text">Tag : {props.note.tag}</h5>
                    <div className="card">
                        <div className="card-body">
                            {props.note.description}
                        </div>
                    </div>
                    <p><b>Date : {date.toLocaleDateString()}<br />
                        Time : {date.toLocaleTimeString()}</b></p>
                </div>
            </div>

        </div>
    )
}

