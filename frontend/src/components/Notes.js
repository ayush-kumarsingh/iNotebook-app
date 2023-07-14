import React, { useContext, useEffect, useRef, useState } from 'react'
import { myNotes, myAlert } from '../App';       //importing contexts
import Noteitem from './Noteitem';
import Addnotes from './Addnotes';
import { useNavigate } from 'react-router-dom';

export default function Notes() {
    const { notes,user, getnotes, editnotes,getuserdetails } = useContext(myNotes);
    const navigate = useNavigate();
    const showalert = useContext(myAlert)
    const [note, setnote] = useState({
        id: ""
        , title: "",
        description: "",
        tag: ""
    })
    
    
    //onchange function ------------------------------------------------->
    function handleonchange(e) {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    
    //fetching the notes when the site starts -------------------------------->
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getnotes();
            getuserdetails();
        }
        else {
            navigate('/');
        }
    }, [])
    

    const date = new Date(user.date); //date object to show the date

    const ref = useRef(null);
    const refclose = useRef(null);

    //when save changes button of modal is clicked ------------------------------>
    function handleclick(e) {
        e.preventDefault();
        refclose.current.click();
        editnotes(note.id, note.title, note.description, note.tag);
        showalert('updated successfully', 'success');
    }

    //when edit icon is clicked -------------------------------------------------->
    function updatenotes(currnote) {
        ref.current.click();
        setnote({
            id: currnote._id,
            title: currnote.title,
            description: currnote.description,
            tag: currnote.tag
        });


    }
    return (
        <>
            <h2 className='text-left'>Welcome Back - {user.name}</h2>      
            <Addnotes/>
            <button type="button" className="btn btn-info btn-lg d-none" data-toggle="modal" data-target="#myModal" ref={ref}>Open Modal</button>
            <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">edit note</h4>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" id='title' name='title' value={note.title} onChange={handleonchange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id='description' name='description' rows={5} value={note.description} onChange={handleonchange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tag</label>
                                    <input type="text" className="form-control" id='tag' name='tag' value={note.tag} onChange={handleonchange} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleclick}>Save changes</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="row my-3 p-2">
                <h2 className='mb-4 text-center'>your notes</h2>
                <div className="container">{(notes.length == 0) && "no notes to display"}</div>
                {notes.map((note) => {
                    return <Noteitem note={note} key={note._id} updatenotes={updatenotes} />
                })}
            </div>
            <div className="container text-center">
                Your Email : {user.email}
                <br />
                Date of account creation : {date.toLocaleDateString()}
                <br />
                Time of account creation : {date.toLocaleTimeString()}
            </div>
        </>
    )
}
