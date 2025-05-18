import {Component, createSignal} from "solid-js";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "~/modules/solidui/components/dialog"; // Adjust this import path as needed

interface ShareLinkDialogProps {
    link: string;
    triggerLabel?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const ShareLink: Component<ShareLinkDialogProps> = (props) => {
    const [copied, setCopied] = createSignal(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(props.link);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange}>
            <DialogContent class="max-w-md p-6 bg-white rounded-lg shadow-xl">
                <DialogHeader>
                    <DialogTitle>Share Your Creation</DialogTitle>
                    <DialogDescription>Copy the link below to share it with others.</DialogDescription>
                </DialogHeader>
                <div class="flex items-center mt-4">
                    <input
                        type="text"
                        value={props.link}
                        readOnly
                        class="border border-gray-300 rounded p-2 w-full"
                    />
                    <button
                        class="ml-2 bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
                        onClick={handleCopy}
                    >
                        {copied() ? "Copied!" : "Copy"}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
