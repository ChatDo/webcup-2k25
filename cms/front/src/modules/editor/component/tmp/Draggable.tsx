import {ParentComponent} from "solid-js";
import {createDraggable, type DragOptions} from "@neodrag/solid";

interface DraggableProps {
    options?: DragOptions;
}

export const Draggable: ParentComponent<DraggableProps> = (props) => {
    const {draggable} = createDraggable();

    return (
        <div use:draggable={props.options || {}} class="absolute min-w-[120px] max-w-xs p-4 bg-white/90 rounded-xl">
            {props.children}
        </div>
    );
};