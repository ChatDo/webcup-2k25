import {ParentComponent} from "solid-js";
import {createDraggable} from "@neodrag/solid";

export const Draggable: ParentComponent = (props) => {
    const {draggable} = createDraggable();

    return (
        <div use:draggable>
            {props.children}
        </div>
    )
}