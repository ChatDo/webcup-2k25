import {Component, createSignal, JSXElement} from "solid-js";
import {EditorHeader} from "~/modules/editor/component/EditorHeader";
import {EditorProvider} from "~/modules/editor/context/EditorContext";
import Logo from "~/modules/editor/component/logo";

interface EditorHeaderProps {
    children: (preview: () => string) => JSXElement;
}

export const EditorTpl: Component<EditorHeaderProps> = (props) => {
    const [preview, setPreview] = createSignal<string>("");
    return (
        <EditorProvider>
            <div class="flex flex-col h-full">
                <header class="flex-none pt-6 pl-6">
                    {/*<EditorHeader previewMode={preview()} setPreviewMode={setPreview} onShare={() => "share"}/>*/}
                    <Logo />
                </header>
                <main class="flex-1">
                    {props.children(preview)}
                </main>
            </div>
        </EditorProvider>
    )
}