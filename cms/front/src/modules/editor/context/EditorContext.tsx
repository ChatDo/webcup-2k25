import {Accessor, createContext, createSignal, ParentComponent, useContext} from "solid-js";

const EditorContext = createContext<{
    staticPage: Accessor<string | undefined>,
    setStaticPage: (page: string) => void
}>()

export const EditorProvider: ParentComponent = (props) => {
    const [staticPage, setStaticPage] = createSignal<string>()

    return (
        <EditorContext.Provider value={{staticPage, setStaticPage}}>
            <div>
                {props.children}
            </div>
        </EditorContext.Provider>
    )
}

export const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error("useEditorContext must be used within an EditorProvider")
    }
    return context
}