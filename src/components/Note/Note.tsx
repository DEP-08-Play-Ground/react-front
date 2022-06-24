import './Note.css'
import React from "react";
import trash from '../../assets/trash-bin.png';
import {Note as NoteDTO} from "../../dto/Note";

export default function Note({note,onDelete}: { note:NoteDTO,onDelete:(note:NoteDTO)=>void}){

    function deleteNote(){
        onDelete(note);
    }

    return (
        <div className="Note d-flex justify-content-between p-3">
            <h1>Note {note.text}</h1>
            <img src={trash} alt="trash" style={{width:'48px',cursor:"pointer",userSelect:"none"}}
            onClick={deleteNote}/>
        </div>
    );
}