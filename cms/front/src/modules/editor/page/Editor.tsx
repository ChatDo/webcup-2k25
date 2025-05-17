import {EditorTpl} from "~/modules/editor/template/EditorTpl";
import {Component, Show} from "solid-js";
import {EditorCanvas} from "~/modules/editor/component/EditorCanvas";
import {Resizable, ResizableHandle, ResizablePanel} from "~/modules/solidui/components/resizable";
import {EditorPreview} from "~/modules/editor/component/EditorPreview";

export const Editor: Component = () => {
    const isHidden = (preview: string) => {
        return preview === "hidden";
    }

    const isFull = (preview: string) => {
        return preview === "full";
    }

    return (
        <EditorTpl>
            {(preview) => (
                <Resizable class="flex flex-col h-full">
                    <Show when={!isFull(preview())}>
                        <ResizablePanel class="flex-1">
                            <EditorCanvas/>
                        </ResizablePanel>
                    </Show>
                    <Show when={!isHidden(preview())}>
                        <Show when={!isFull(preview())}>
                            <ResizableHandle withHandle/>
                        </Show>
                        <ResizablePanel class="flex-1">
                            <EditorPreview/>
                        </ResizablePanel>
                    </Show>
                </Resizable>
            )}
        </EditorTpl>
    )
}
