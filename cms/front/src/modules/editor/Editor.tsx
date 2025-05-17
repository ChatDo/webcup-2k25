import {Component} from "solid-js";
import PageBuilder from "~/modules/editor/PageBuilder";
import {EditorLayout} from "~/modules/editor/EditorLayout";

export const Editor: Component = () => {
    return (
        <EditorLayout>
            <PageBuilder/>
        </EditorLayout>
    )
}