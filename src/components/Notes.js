import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {

    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    const [note, setNote] = useState({ "id": "", "etitle": "", "edescription": "", "etag": "" })


    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate("/login");
        }// eslint-disable-next-line
    }, [])
    
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleClick = (e) => {

        refClose.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Updated Successfully", "success");
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });


    }

    const ref = useRef(null)
    const refClose = useRef(null)
    return (
        <>
            <AddNote showAlert={props.showAlert} />


            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" d-none="" data-bs-target="#exampleModal"></button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="form-group my-3">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" placeholder="Title" onChange={onChange} minLength={5} required />

                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="description">Description</label>
                                    <textarea  rows={3} className="form-control" id="edescription" name='edescription' value={note.edescription} placeholder="Description" onChange={onChange} minLength={5} required />
                                </div>

                                <div className="form-group my-3">
                                    <label htmlFor="tag">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} placeholder="Tag" onChange={onChange} />
                                </div>
                            </form>



                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="row my-3">
                <h2>Your Notes : {notes.length}</h2>
                <div className='container mx-2'>
                    {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })
                }
            </div>
        </>
    )
}

export default Notes
