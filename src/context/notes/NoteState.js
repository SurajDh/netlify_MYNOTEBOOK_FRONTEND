import React, { useState } from 'react'
import NoteContext from './noteContext'



const NoteState = (props) => {


    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);


    //GET all notes
    const getNotes = async () => {
        //API call
        const url = `${process.env.REACT_APP_LOCALHOST}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();

        setNotes(json);
    }


    //ADD a note
    const addNote = async (title, description, tag) => {
        //API call
        const url = `${process.env.REACT_APP_LOCALHOST}/api/notes/addnote`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    }


    //DELETE a note
    const deleteNote = async (id) => {

        const newNotes = notes.filter((notes) => { return notes._id !== id })
        setNotes((newNotes));


        const url = `${process.env.REACT_APP_LOCALHOST}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log(json);

    }


    //EDIT a note
    const editNote = async (id, title, description, tag) => {
        //API CALL HERE
        const url = `${process.env.REACT_APP_LOCALHOST}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ id, title, description, tag }),
        });
        const json = response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
