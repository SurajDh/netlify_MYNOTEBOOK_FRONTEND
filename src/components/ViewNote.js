import React from 'react'
import { useLocation } from 'react-router-dom';
import './ViewNote.css';


const ViewNote = (props) => {
    const location = useLocation();
    const { title, description, tag } = location.state || {};
    if (!(title && description && tag)) {
        return <div>No note to display</div>;
    }

    const handleCopyClick=()=>{
        navigator.clipboard.writeText(`Title : ${title}\n\n\nDescription : ${description}\n\n\nTag : ${tag}`);
        props.showAlert("Copied to clipboard","success");
    }


    return (
        <>
            <div className="container view-note-container">
               
<section>

                <i>
                    <span className="view-note-tag">{tag}</span>
                </i>
                <h1 className="view-note-title">{title}</h1>
                <hr />
                <article className="view-note-description text-break">{description}</article>
</section>
                            
                <div className="view-note-actions"><br /><br />
            <button className="btn-copy btn btn-primary mx-1 my-1" onClick={handleCopyClick} style={{ marginLeft: 'auto' }}>Copy Note</button>
            </div>
            </div>


        </>
    );
};

export default ViewNote;
