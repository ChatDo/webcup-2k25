import {Component} from "solid-js";

interface ShareLinkProps {
    link: string;
}

export const ShareLink: Component<ShareLinkProps> = (props) => {
    return (
        <div class="flex items-center">
            <input
                type="text"
                value={props.link}
                readOnly
                class="border border-gray-300 rounded p-2 w-full"
            />
            <button
                class="ml-2 bg-blue-500 text-white rounded p-2"
                onClick={() => navigator.clipboard.writeText(props.link)}
            >
                Copy
            </button>
        </div>
    )
}