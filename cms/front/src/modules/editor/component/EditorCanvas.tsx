import {Component, createSignal} from "solid-js";
import {ComponentRegistry} from "~/modules/editor/componentRegistry";
import {EditorContextMenu} from "./tmp/EditorContextMenu";
import {Draggable} from "./tmp/Draggable";
import {ElementSelectDialog} from "~/modules/editor/component/ElementSelectDialog";
import {ComponentContextMenu} from "~/modules/editor/component/tmp/ComponentContextMenu";

interface PageComponent {
    id: string;
    type: string;
    position: { x: number; y: number };
    props: Record<string, any>;
}

export const EditorCanvas: Component = () => {
    const [components, setComponents] = createSignal<PageComponent[]>([]);
    const [activeComponentId, setActiveComponentId] = createSignal<string | null>(null);

    const addComponent = (type: string) => {
        const defaultProps = ComponentRegistry.getDefaultProps(type) || {};
        const newComponent = {
            id: `component-${Date.now()}`,
            type,
            props: {...defaultProps}
        };

        setComponents([...components(), newComponent]);
        setActiveComponentId(newComponent.id);
    };

    const removeComponent = (id: string) => {
        console.log(`Removing component with id: ${id}`);
        setComponents(components().filter(c => c.id !== id));
        if (activeComponentId() === id) {
            setActiveComponentId(null);
        }
    };

    const updateComponentProps = (id: string, newProps: Record<string, any>) => {
        setComponents(components().map(c =>
            c.id === id ? {...c, props: {...c.props, ...newProps}} : c
        ));
    };

    const renderComponent = (component: PageComponent) => {
        const ComponentToRender = ComponentRegistry.getComponent(component.type);

        if (!ComponentToRender) {
            return <div>Unknown component type: {component.type}</div>;
        }

        return (
            <ComponentToRender
                {...component.props}
                onChange={(newProps) => updateComponentProps(component.id, newProps)}
            />
        );
    };

    const generateStaticPage = () => {
        const elementsHTML = components().map(el => {
            const style = `position:absolute; left:${el.x}px; top:${el.y}px; background:rgba(255,255,255,0.9); border:1px solid #ccc; border-radius:8px; padding:12px; max-width:320px; box-shadow:0 2px 8px rgba(0,0,0,0.08);`;
            if (el.type === 'TextBlock') {
                return `<div style="${style}">${el.props.content}</div>`;
            }
            if (el.type === 'ImageUpload' || el.type === 'Gif') {
                return `<div style="${style}"><img src="${el.props.src}" style="max-width:100%; height:auto; display:block;" /></div>`;
            }
            return '';
        }).join('\n');

        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Static Page</title>
  <style>
    body { margin: 0; min-height: 100vh; background: #232526; font-family: Arial, sans-serif; }
    @media (max-width: 768px) { div { max-width: 200px !important; } }
  </style>
</head>
<body>
  <div style="position:relative; width:100vw; height:100vh;">
    ${elementsHTML}
  </div>
</body>
</html>`;
    };

    const downloadStaticPage = () => {
        const blob = new Blob([generateStaticPage()], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'static_page.html';
        a.click();
        URL.revokeObjectURL(url);
    }


    const [open, setOpen] = createSignal(false);


    return (
        <div class={`h-fit p-6`}>
            <EditorContextMenu addComponent={() => setOpen(true)}>
                <div
                    id="canvas"
                    class="relative w-full h-[80vh] border-2 border-gray-300 bg-white/20 rounded-xl overflow-hidden"
                >
                    {components().map(component => (
                        <Draggable updatePosition={(position) => {
                            setComponents(components().map(c => c.id === component.id ? {...c, position} : c));
                        }}>
                        
                            <ComponentContextMenu remove={() => removeComponent(component.id)}>
                                {renderComponent(component)}
                            </ComponentContextMenu>
                        </Draggable>
                    ))}
                </div>
            </EditorContextMenu>
            <button
                class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={downloadStaticPage}
            > Download
            </button>
            <ElementSelectDialog open={open()} onClose={
                () => setOpen(false)
            } onAdd={addComponent}/>
        </div>
    );
}