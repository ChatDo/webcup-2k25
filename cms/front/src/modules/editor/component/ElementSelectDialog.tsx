import {Component, For} from "solid-js";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "~/modules/solidui/components/dialog";
import {ComponentRegistry} from "~/modules/editor/ComponentRegistry";

interface ElementSelectDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (type: any, content: string) => void;
}

export const ElementSelectDialog: Component<ElementSelectDialogProps> = (props) => {
    return (
        <Dialog open={props.open} onOpenChange={props.onClose}>
            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Select Element</DialogTitle>
                    <DialogDescription>
                        Select an element to add to the page.
                    </DialogDescription>
                </DialogHeader>
                <div class="grid grid-cols-6 gap-4">
                    <For each={ComponentRegistry.getAll()}>
                        {(component) => (
                        <div class="flex flex-col items-center">
                            <button
                                class="p-2 border rounded"
                                onClick={() => {
                                    const defaultProps = ComponentRegistry.getDefaultProps(component.type);
                                    props.onAdd(component.type, defaultProps!.content);
                                    props.onClose();
                                }}
                            >
                                <span>{component.label}</span>
                            </button>
                        </div>
                        )}
                    </For>
                </div>
            </DialogContent>
        </Dialog>
    );
}