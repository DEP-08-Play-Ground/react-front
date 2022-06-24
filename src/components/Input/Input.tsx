import './Input.css'
import {FormEvent, useRef} from "react";


export default function Input({onAdd}: { onAdd: (text: string) => void }) {

    const refInputContainer = useRef(null);

    function addNote(e: FormEvent) {
        e.preventDefault();
        console.log("Add Note");
        const txtInput = (refInputContainer.current! as HTMLInputElement);
        onAdd(txtInput.value);
        (refInputContainer.current! as HTMLInputElement).value = "";
        (refInputContainer.current! as HTMLInputElement).focus();
    }

    return (
        <form className="Input d-flex justify-content-center gap-3 px-3" onSubmit={addNote}>
            <input ref={refInputContainer} type="text" className="form-control"/>
            <button className="btn btn-primary" style={{width: '120px'}} onClick={addNote}>Add Note +</button>
        </form>
    );
}