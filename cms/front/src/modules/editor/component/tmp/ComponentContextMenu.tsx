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

export const ComponentContextMenu: ParentComponent<{
    remove: () => void
}> = (props) => {
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                {props.children}
            </ContextMenuTrigger>
            <ContextMenuPortal>
                <ContextMenuContent class="w-48">
                    <ContextMenuGroup>
                        <ContextMenuItem onSelect={props.remove}>
                            Suppimer l'élément
                        </ContextMenuItem>
                    </ContextMenuGroup>
                </ContextMenuContent>
            </ContextMenuPortal>
        </ContextMenu>
    )
}
