import {createSignal, ParentComponent} from "solid-js"
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuGroupLabel,
    ContextMenuItem,
    ContextMenuPortal,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger
} from "~/modules/solidui/components/context-menu"

export const EditorContextMenu: ParentComponent<{
    addComponent: () => void
}> = (props) => {
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                {props.children}
            </ContextMenuTrigger>
            <ContextMenuPortal>
                <ContextMenuContent class="w-48">
                    <ContextMenuGroup>
                        <ContextMenuItem onSelect={props.addComponent}>
                            Add Component
                        </ContextMenuItem>
                    </ContextMenuGroup>
                </ContextMenuContent>
            </ContextMenuPortal>
        </ContextMenu>
    )
}
