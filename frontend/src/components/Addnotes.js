import React, { useContext, useRef, useState } from 'react';
import { myNotes,myAlert } from '../App';    //importing the context


export default function Addnotes() {

    const showalert = useContext(myAlert);
    const {addnotes} = useContext(myNotes);
    const [note,setnote] = useState({
        title : "",
        description : "",
        tag : ""
    })

    //onchange function for input field --------------------------------------------->
    function handleonchange(e){
        setnote({...note,[e.target.name] : e.target.value})
        
    }

    //when we click add note button --------------------------------------------->
    function handleclick(e){
        e.preventDefault();
        if(note.title.length <3 || note.description.length <5 || note.tag.length <1){
            showalert('title must be altest 3 characters and the description must be atleast 5 characters and tag must not be empty ','danger');
            return;
        }
        addnotes(note.title,note.description,note.tag);
    }
    return (
        <div className='container my-4'>
            <h3 className='text-center'>Add a note</h3>
            <form>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" required className="form-control" id='title' name='title' placeholder='Enter the Title of note' onChange = {handleonchange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" required className="form-control" id='description' name='description' placeholder='Enter description of Note' onChange = {handleonchange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label" >Tag</label>
                    <input type="text" className="form-control" id='tag' name='tag' placeholder='General/Personnel etc' required onChange = {handleonchange}/>
                </div>
                <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary text-center " onClick={handleclick}>Add Note</button>
                </div>
                
            </form>
        </div>
    )
}
