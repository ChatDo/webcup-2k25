import {createSignal, onMount} from "solid-js";
import {createDraggable} from "@neodrag/solid";
import {EditorContextMenu} from "~/modules/editor/EditorContextMenu";
import {ElementSelectDialog} from "~/modules/editor/ElementSelectDialog";

const THEMES = {
    dramatic: {
        background: "bg-gradient-to-br from-gray-900 to-gray-700",
        color: "text-white",
        font: "font-black",
    },
    ironic: {
        background: "bg-gradient-to-tr from-yellow-200 via-red-500 to-fuchsia-500",
        color: "text-gray-900",
        font: "font-sans",
    },
    classy: {
        background: "bg-gradient-to-r from-purple-400 via-pink-300 to-red-200",
        color: "text-gray-900",
        font: "font-serif",
    },
};

const DraggableElement = (props) => {
    const {draggable} = createDraggable({
        onDrag: (data) => props.updatePosition(props.id, data.offsetX, data.offsetY),
    });

    return (
        <div
            use:draggable
            class="absolute min-w-[120px] max-w-xs p-4 bg-white/90 rounded-xl shadow-lg border border-gray-200 cursor-grab"
            style={{left: `${props.x}px`, top: `${props.y}px`}}
        >
            {props.type === "text" && (
                <div contentEditable class="outline-none text-base">{props.content}</div>
            )}
            {props.type === "image" && (
                <img
                    src={props.content}
                    alt="User content"
                    class="w-full max-w-[280px] max-h-[200px] block rounded"
                />
            )}
            {props.type === "gif" && (
                <img
                    src={props.content}
                    alt="GIF"
                    class="w-full max-w-[280px] max-h-[200px] block rounded"
                />
            )}
            <button
                onClick={() => props.removeElement(props.id)}
                class="mt-3 w-full py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition"
            >
                Remove
            </button>
        </div>
    );
};

const GifPicker = ({onSelect, onClose}) => {
    const [search, setSearch] = createSignal("");
    const [results, setResults] = createSignal([]);
    const [loading, setLoading] = createSignal(false);

    const searchGifs = async () => {
        setLoading(true);
        const apiKey = "vUxKMs8WVIi7ks4PNuknJQ7tnsRYslx6"; // Replace with your own for production
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
                search()
            )}&limit=12`
        );
        const data = await response.json();
        setResults(data.data);
        setLoading(false);
    };

    return (
        <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <div class="bg-white rounded-xl p-6 shadow-xl w-full max-w-2xl">
                <div class="flex items-center gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Search GIFs..."
                        value={search()}
                        onInput={e => setSearch(e.target.value)}
                        class="border rounded px-3 py-1 flex-1"
                    />
                    <button onClick={searchGifs}
                            class="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Search
                    </button>
                    <button onClick={onClose} class="ml-auto px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Close
                    </button>
                </div>
                {loading() && <div class="text-center py-4">Loading...</div>}
                <div class="flex flex-wrap gap-2">
                    {results().map(gif => (
                        <img
                            src={gif.images.fixed_height.url}
                            class="w-24 h-24 object-cover rounded cursor-pointer hover:opacity-80"
                            onClick={() => {
                                onSelect(gif.images.original.url);
                                onClose();
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function PageBuilder() {
    const [elements, setElements] = createSignal([]);
    const [selectedType, setSelectedType] = createSignal("text");
    const [imageUrl, setImageUrl] = createSignal("");
    const [showGifPicker, setShowGifPicker] = createSignal(false);
    const [theme, setTheme] = createSignal("dramatic");
    let fileInput;

    onMount(() => {
        const saved = localStorage.getItem("savedPage");
        if (saved) setElements(JSON.parse(saved));
    });

    const addElement = (type, content = "") => {
        let newContent = content;
        if (type === "text") newContent = "Edit me!";
        if (type === "image" && !content) newContent = imageUrl();
        if (type === "image" && !newContent) return alert("Please provide an image URL or upload.");
        setElements([
            ...elements(),
            {
                id: Date.now() + Math.random(),
                type,
                x: 60,
                y: 60,
                content: newContent,
            },
        ]);
        setImageUrl("");
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
        const currentTheme = THEMES[theme()];
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

    const themeConfig = THEMES[theme()];

    const [open, setOpen] = createSignal(false);

    return (
        <div class={`min-h-screen ${themeConfig.background} ${themeConfig.color} ${themeConfig.font} p-6`}>
            {/* Controls */}
            <div class="mb-6 flex flex-wrap items-center gap-4 bg-white/30 rounded-xl shadow p-4">
                <select
                    value={selectedType()}
                    onChange={e => setSelectedType(e.target.value)}
                    class="rounded border px-3 py-2"
                >
                    <option value="text">Text</option>
                    <option value="image">Image URL</option>
                    <option value="gif">GIF</option>
                </select>

                {selectedType() === "image" && (
                    <input
                        type="text"
                        placeholder="Paste image URL"
                        value={imageUrl()}
                        onInput={e => setImageUrl(e.target.value)}
                        class="rounded border px-3 py-2 w-60"
                    />
                )}

                <button
                    class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                    onClick={() => {
                        if (selectedType() === "gif") setShowGifPicker(true);
                        else addElement(selectedType());
                    }}
                >
                    Add {selectedType().toUpperCase()}
                </button>

                <button
                    class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => fileInput.click()}
                >
                    Upload Image
                </button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInput}
                    class="hidden"
                    onChange={handleImageUpload}
                />

                <label class="ml-4">Theme:</label>
                <select
                    value={theme()}
                    onChange={e => setTheme(e.target.value)}
                    class="rounded border px-3 py-2"
                >
                    {Object.keys(THEMES).map(t => (
                        <option value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                </select>

                <button
                    class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
                    onClick={savePage}
                >
                    Save
                </button>
            </div>

            {/* GIF Picker Modal */}
            {showGifPicker() && (
                <GifPicker
                    onSelect={url => addElement("gif", url)}
                    onClose={() => setShowGifPicker(false)}
                />
            )}

            {/* Canvas with Context Menu */}
            <EditorContextMenu addComponent={() => setOpen(true)}>
                <div
                    id="canvas"
                    class="relative w-full h-[80vh] border-2 border-dashed border-gray-300 bg-white/20 rounded-xl overflow-hidden"
                >
                    {elements().map(element => (
                        <DraggableElement
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
            }/>
        </div>
    );
}
