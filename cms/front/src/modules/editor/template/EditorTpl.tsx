import {Component, createSignal, JSXElement} from "solid-js";
import {EditorHeader} from "~/modules/editor/component/EditorHeader";
import {EditorProvider} from "~/modules/editor/context/EditorContext";

interface EditorHeaderProps {
    children: (preview: () => string) => JSXElement;
}

export const EditorTpl: Component<EditorHeaderProps> = (props) => {
    const [preview, setPreview] = createSignal<string>("");
    return (
        <EditorProvider>
            <div class="flex flex-col h-full">
                <header class="flex-none">
                    <EditorHeader previewMode={preview()} setPreviewMode={setPreview} onShare={() => "share"}/>
                </header>
                <main class="flex-1">
                    {props.children(preview)}
                </main>
            </div>
        </EditorProvider>
    )
}