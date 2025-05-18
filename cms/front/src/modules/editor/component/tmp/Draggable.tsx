import {createSignal, ParentComponent} from "solid-js";
import {createDraggable, type DragOptions} from "@neodrag/solid";

interface DraggableProps {
    key: string;
    resizable?: boolean;
    options?: DragOptions;
    position: () => { x: number; y: number };
    updatePosition: (position: { x: number; y: number }) => void;
}

export const Draggable: ParentComponent<DraggableProps> = (props) => {
    const {draggable} = createDraggable();

    return (
        <div
            id={props.key}
            use:draggable={{
                bounds: "parent",
            }}
            class="absolute min-w-[120px] max-w-xs p-4 border-2 border-gray rounded-xl"
            style={{
                position: "absolute",
                "background-color": "#fff",
                padding: "10px",
                border: "1px solid #ccc",
                "border-radius": "4px",
                cursor: "grab",
                left: `${props.position().x}px`,
                top: `${props.position().y}px`
            }}
        >
            {props.children}
        </div>
    );
};
