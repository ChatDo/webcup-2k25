import {Component, JSXElement} from "solid-js";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "~/modules/solidui/components/dialog";

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
                    <button type="button" class="btn" onClick={() => props.onAdd("text", "")}>
                        Button
                    </button>
                </div>
                <DialogFooter>
                    <button type="button" class="btn">Cancel</button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}