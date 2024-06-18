import React from 'react'
import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = ({showAlert,toSentenceCase}) => {



  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ "title": "", "description": "", "tag": "" })


  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  const handleClick = (e) => {
    e.preventDefault();
    addNote(toSentenceCase(note.title),toSentenceCase(note.description),toSentenceCase(note.tag?note.tag:"General"));
    setNote({ "title": "", "description": "", "tag": "" });
    showAlert("Note Added Successfully","success");
  }
  return (
    <div>
      <div className="container my-3">

        <h1>Add a Note</h1>

        <form>
          <div className="form-group my-3">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" value={note.title} name='title' aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange}  minLength={5} required/>

          </div>
          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <textarea  rows={3}  className="form-control" id="description"  value={note.description} name='description' placeholder="Description" onChange={onChange} minLength={5} required />
          </div>
         
          <div className="form-group my-3">
            <label htmlFor="tag">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag'  value={note.tag} placeholder="Tag" onChange={onChange} />
          </div>

          <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add a note</button>
        </form>

      </div>
    </div>
  )
}

export default AddNote
