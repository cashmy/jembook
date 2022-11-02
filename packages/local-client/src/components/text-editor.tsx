import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import './text-editor.css';
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface TextEditorProps {
    cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({cell}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);
    const { updateCell } = useActions();


    useEffect(() => {
        // Add a listener to the window object to listen for a click event outside of the editor
        const listener = (event: MouseEvent) => {
            // if the user clicks outside the ref, set editing to false
            // Compare the ref to the target of the event (the element that was clicked)
            // if inside the ref, do nothing
            if (ref.current && event.target && ref.current.contains(event.target as Node)) {
                return;
            }
            setEditing(false);
        };
        document.addEventListener("click", listener, { capture: true });

        // clean up function
        return () => {
            document.removeEventListener("click", listener, {
                capture: true,
            });
        }
    }, []);

    if (editing) {
        return (
            <div className="text-editor" ref={ref}>
                <MDEditor value={cell.content} onChange={(v) => updateCell( cell.id,  v || "")} />
            </div>
        );
    }

    return (
        <div className="text-editor card" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown source={cell.content || 'Click to edit'} />
            </div>
        </div>
    )
};

export default TextEditor;