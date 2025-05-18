import {Component, Show} from "solid-js";
import {useEditorContext} from "~/modules/editor/context/EditorContext";

export const EditorPreview: Component = () => {
    const editorContext = useEditorContext()

    return (
        <div class="min-h-screen bg-gray-100">
            <Show when={editorContext.staticPage} fallback={<div>Loading...</div>}>
                <iframe
                    src={editorContext.staticPage()}
                    class="w-full h-full border-0"
                    title="Preview"
                />
            </Show>
        </div>
    )
}
