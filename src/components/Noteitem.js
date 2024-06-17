import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import deleteIcon from '../icons/delete.png';
import editicon from '../icons/edit.png'
import { useNavigate } from 'react-router-dom';




const Noteitem = (props) => {

    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    const handleNav = () => {
        navigate('/viewnote', { state: { title: note.title, description: note.description, tag: note.tag ? note.tag : "General" } });
    }

    return (
        <div className='col-md-3'>
            <div className='my-3 ' style={{ cursor: "pointer" }} >
                <div className="card" style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }}>

                    <div>
                        <div onClick={handleNav}>
                            <div style={{ display: "flex", position: 'absolute', right: "0" }}>
                                <span className=" badge rounded-pill bg-danger">{note.tag ? note.tag.slice(0, 10) : "General"}{note.tag.length > 10 ? "..." : ""}
                                </span>
                            </div>
                            <div className="card-body ">
                                <h5 className="card-title">{note.title ? note.title.slice(0, 17) : ''}{note.title.length > 17 ? "..." : ""}</h5>
                                <p className="card-text">{note.description ? note.description.slice(0, 26) : ''}{note.description.length > 26 ? "..." : ""}</p>
                            </div>

                        </div>

                        <div className="icon-container mx-2 my-2" >
                            <span><img className='mx-1' src={deleteIcon} alt="delete" style={{ width: '7%', height: '7%' }} onClick={() => { deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success"); }} /></span>
                            <span><img className='mx-1' src={editicon} alt="edit" style={{ width: '7%', height: '7%' }} onClick={() => { updateNote(note); }} /></span>

                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Noteitem
