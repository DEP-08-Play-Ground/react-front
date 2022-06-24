import React from "react";
import './App.css'
import Input from "./components/Input/Input";
import Note from "./components/Note/Note";
import {Note as NoteDTO} from './dto/Note'

export const USER_ID = "291242c9-2207-417c-af20-29467c4c83e4";

export default class App extends React.Component<any, { notes: Array<NoteDTO> }> {


    constructor(props: any, context: any) {
        super(props, context);
        this.state = {notes: []};
        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    async deleteNote(note: NoteDTO) {
        const response = await fetch(`http://localhost:8080/notes/api/v1/users/${USER_ID}/notes/${note.id}`,
            {
                method: 'DELETE'
            });
        if (response.status === 204) {
            // const elementToBeRemoved=this.state.notes.indexOf(note);
            // this.state.notes.splice(elementToBeRemoved,1);
            // this.forceUpdate();
            const newArray = this.state.notes.filter(value => value !== note);
            this.setState({
                // notes: this.state.notes
                notes:newArray
            });

        }

    }

    async addNote(text: string) {
        new NoteDTO(null, text, USER_ID);
        const response = await fetch(`http://localhost:8080/notes/api/v1/users/${USER_ID}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new NoteDTO(null, text, USER_ID))
        });
        if (response.status === 201) {
            const newlyAddedNote = await response.json();
            this.setState({
                notes: [newlyAddedNote, ...this.state.notes]
            });
        }
    }

    componentDidMount() {
        this.loadAllNotes();
    }

    async loadAllNotes() {
        const response = await fetch(`http://localhost:8080/notes/api/v1/users/${USER_ID}/notes`);
        this.setState({
            notes: await response.json()
        })
    }

    render() {
        return (
            <>
                <header>
                    <h1 className={"text-center mt-3"}>Simple Note Taking React App</h1>
                </header>

                <Input onAdd={this.addNote}/>
                {this.state.notes.map(note => <Note key={note.id} note={note} onDelete={this.deleteNote}/>)}
            </>
        )
    }
}
