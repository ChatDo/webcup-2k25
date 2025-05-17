import {Component, createEffect, createSignal, JSXElement, onMount} from "solid-js";
import {EditorContextMenu} from "~/modules/editor/component/tmp/EditorContextMenu";
import {ElementSelectDialog} from "~/modules/editor/component/ElementSelectDialog";
import {useEditorContext} from "~/modules/editor/context/EditorContext";
import {Draggable} from "~/modules/editor/component/tmp/Draggable";

export const EditorCanvas: Component = () => {
    const [elements, setElements] = createSignal<JSXElement[]>([]);
    const {setStaticPage} = useEditorContext();


    onMount(() => {
        const saved = localStorage.getItem("savedPage");
        if (saved) setElements(JSON.parse(saved));
    });

    const addElement = (type, content: string = "") => {
        if (type === "text") {
            const elem = {
                id: Date.now(),
                type,
                content,
                x: Math.random() * 500,
                y: Math.random() * 500,
            }
            setElements(elms => [...elms, elem]);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => addElement("image", event.target.result);
        reader.readAsDataURL(file);
    };

    const updatePosition = (id, x, y) => {
        setElements(elms => elms.map(elm => elm.id === id ? {...elm, x, y} : elm));
    };

    const removeElement = (id) => {
        setElements(elms => elms.filter(elm => elm.id !== id));
    };

    const saveLocalStorage = () => {
        localStorage.setItem("savedPage", JSON.stringify(elements()));
        alert("Page saved!");
    };

    const generateStaticPage = () => {
        const elementsHTML = elements().map(el => {
            const style = `position:absolute; left:${el.x}px; top:${el.y}px; background:rgba(255,255,255,0.9); border:1px solid #ccc; border-radius:8px; padding:12px; max-width:320px; box-shadow:0 2px 8px rgba(0,0,0,0.08);`;
            if (el.type === 'text') {
                return `<div style="${style}">${el.content}</div>`;
            }
            if (el.type === 'image' || el.type === 'gif') {
                return `<div style="${style}"><img src="${el.content}" style="max-width:100%; height:auto; display:block;" /></div>`;
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

    const savePage = async () => {
        saveLocalStorage();
        const html = generateStaticPage();
        const elemJson = btoa(JSON.stringify(elements()));

        const body = {
            html,
            elements: elemJson,
        };

        const resp = await fetch("page", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })

        console.log(resp);
    };


    const [open, setOpen] = createSignal(false);

    createEffect(() => {
        console.log("Elements changed:", elements());
        if (elements()) setStaticPage(generateStaticPage());
    })

    return (
        <div class={`h-fit p-6`}>
            <EditorContextMenu addComponent={() => setOpen(true)}>
                <div
                    id="canvas"
                    class="relative w-full h-[80vh] border-2 border-gray-300 bg-white/20 rounded-xl overflow-hidden"
                >
                    {elements().map(element => (
                        <Draggable
                            key={element.id}
                            {...element}
                            updatePosition={updatePosition}
                            removeElement={removeElement}
                        />
                    ))}
                </div>
            </EditorContextMenu>
            <ElementSelectDialog open={open()} onClose={
                () => setOpen(false)
            } onAdd={addElement}/>
        </div>
    );
}
