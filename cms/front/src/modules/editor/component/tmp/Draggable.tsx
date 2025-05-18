import {ParentComponent} from "solid-js";
import {createDraggable, type DragOptions} from "@neodrag/solid";

interface DraggableProps {
    resizable?: boolean;
    options?: DragOptions;
    position: { x: number, y: number };
    updatePosition: (position: { x: number, y: number }) => void;
}

export const Draggable: ParentComponent<DraggableProps> = (props) => {
    const {draggable} = createDraggable();

    return (
        <div use:draggable={props.options || {
            bounds: "parent",
            onDragEnd: (e) => {
                const {x, y} = e.event;
                props.updatePosition({x, y});
            },
            position: props.position,
        }
        }
             class="absolute min-w-[120px] max-w-xs p-4 border-2 border-gray rounded-xl">
            {props.children}
        </div>
    );
};
