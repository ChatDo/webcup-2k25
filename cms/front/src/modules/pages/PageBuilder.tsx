import {createSignal, onMount} from "solid-js";
import {createDraggable} from "@neodrag/solid";

const THEMES = {
    dramatic: {
        background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
        color: "#fff",
        font: "Arial Black, sans-serif"
    },
    ironic: {
        background: "repeating-linear-gradient(45deg, #fff 0px, #fff 10px, #f1c40f 10px, #f1c40f 20px)",
        color: "#222",
        font: "Comic Sans MS, cursive"
    },
    classy: {
        background: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
        color: "#333",
        font: "Georgia, serif"
    }
};

const DraggableElement = (props) => {
    const {draggable} = createDraggable({
        onDrag: (data) => {
            props.updatePosition(props.id, data.offsetX, data.offsetY);
        }
    });

    return (
        <div
            class="draggable-element"
            use:draggable
            style={{
                position: "absolute",
                left: `${props.x}px`,
                top: `${props.y}px`,
                padding: "12px",
                border: "1px solid #ccc",
                "border-radius": "8px",
                "background-color": "rgba(255,255,255,0.9)",
                "box-shadow": "0 2px 8px rgba(0,0,0,0.08)",
                cursor: "grab",
                "min-width": "120px",
                "max-width": "320px"
            }}
        >
            {props.type === "text" && (
                <div contentEditable style={{outline: "none"}}>
                    {props.content}
                </div>
            )}
            {props.type === "image" && (
                <img
                    src={props.content}
                    alt="User content"
                    style={{width: "100%", "max-width": "280px", "max-height": "200px", display: "block"}}
                />
            )}
            {props.type === "gif" && (
                <img
                    src={props.content}
                    alt="GIF"
                    style={{width: "100%", "max-width": "280px", "max-height": "200px", display: "block"}}
                />
            )}
            <button
                onClick={() => props.removeElement(props.id)}
                style={{
                    "margin-top": "8px",
                    display: "block",
                    width: "100%"
                }}
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
        const apiKey = "vUxKMs8WVIi7ks4PNuknJQ7tnsRYslx6";
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
        <div style={{
            position: "fixed",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            padding: "24px",
            "border-radius": "12px",
            "z-index": 10000,
            "box-shadow": "0 4px 24px #0002"
        }}>
            <div style={{display: "flex", "align-items": "center", "margin-bottom": "12px"}}>
                <input
                    type="text"
                    placeholder="Search GIFs..."
                    value={search()}
                    onInput={e => setSearch(e.target.value)}
                    style={{"margin-right": "8px"}}
                />
                <button onClick={searchGifs}>Search</button>
                <button onClick={onClose} style={{"margin-left": "auto"}}>Close</button>
            </div>
            {loading() && <div>Loading...</div>}
            <div style={{display: "flex", "flex-wrap": "wrap", gap: "8px"}}>
                {results().map(gif => (
                    <img
                        src={gif.images.fixed_height.url}
                        style={{width: "100px", height: "100px", cursor: "pointer", "object-fit": "cover"}}
                        onClick={() => {
                            onSelect(gif.images.original.url);
                            onClose();
                        }}
                    />
                ))}
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

    const addElement = (type: any, content = "") => {
        let newContent = content;
        if (type === "text") newContent = "Edit me!";
        if (type === "image" && !content) newContent = imageUrl();
        if (type === "image" && !newContent) return alert("Please provide an image URL or upload.");
        const newElement = {
            id: Date.now() + Math.random(),
            type,
            x: 60,
            y: 60,
            content: newContent
        };
        setElements([...elements(), newElement]);
        setImageUrl("");
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            addElement("image", event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const updatePosition = (id, x, y) => {
        setElements(elms => elms.map(elm => elm.id === id ? {...elm, x, y} : elm));
    };

    const removeElement = (id) => {
        setElements(elms => elms.filter(elm => elm.id !== id));
    };

    const savePage = () => {
        localStorage.setItem("savedPage", JSON.stringify(elements()));
        alert("Page saved!");
    };

    const generateStaticHTML = () => {
        const currentTheme = THEMES[theme()];

        const elementsHTML = elements().map(el => {
            const style = `position:absolute; left:${el.x}px; top:${el.y}px; 
        background:rgba(255,255,255,0.9); border:1px solid #ccc; border-radius:8px;
        padding:12px; max-width:320px; box-shadow:0 2px 8px rgba(0,0,0,0.08);`;

            if (el.type === 'text') {
                return `<div style="${style}">${el.content}</div>`;
            }
            if (el.type === 'image' || el.type === 'gif') {
                return `<div style="${style}">
          <img src="${el.content}" style="max-width:100%; height:auto; display:block;" />
        </div>`;
            }
            return '';
        }).join('\n');

        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Static Page</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      background: ${currentTheme.background};
      font-family: ${currentTheme.font};
      color: ${currentTheme.color};
    }
    @media (max-width: 768px) {
      div { max-width: 200px !important; }
    }
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
        const html = generateStaticHTML();
        const blob = new Blob([html], {type: "text/html"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "my-page.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div style={{
            "font-family": THEMES[theme()].font,
            color: THEMES[theme()].color,
            minHeight: "100vh",
            background: THEMES[theme()].background,
            padding: "20px"
        }}>
            <div style={{
                "margin-bottom": "18px",
                display: "flex",
                gap: "10px",
                "align-items": "center"
            }}>
                <select value={selectedType()} onChange={e => setSelectedType(e.target.value)}>
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
                        style={{width: "200px"}}
                    />
                )}

                <button onClick={() => {
                    if (selectedType() === "gif") setShowGifPicker(true);
                    else addElement(selectedType());
                }}>
                    Add {selectedType().toUpperCase()}
                </button>

                <button onClick={() => fileInput.click()}>Upload Image</button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInput}
                    style={{display: "none"}}
                    onChange={handleImageUpload}
                />

                <label style={{"margin-left": "16px"}}>Theme:</label>
                <select value={theme()} onChange={e => setTheme(e.target.value)}>
                    {Object.keys(THEMES).map(t => <option value={t}>{t}</option>)}
                </select>

                <button onClick={savePage} style={{"background": "#4CAF50", color: "white"}}>
                    Save
                </button>

                <button
                    onClick={downloadStaticPage}
                    style={{"background": "#2196F3", color: "white"}}
                >
                    Download Static Page
                </button>
            </div>

            {showGifPicker() && (
                <GifPicker
                    onSelect={url => addElement("gif", url)}
                    onClose={() => setShowGifPicker(false)}
                />
            )}

            <div
                id="canvas"
                style={{
                    position: "relative",
                    width: "100%",
                    height: "70vh",
                    border: "2px dashed #ccc",
                    "background-color": "rgba(255,255,255,0.07)",
                    overflow: "hidden"
                }}
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
        </div>
    );
}
