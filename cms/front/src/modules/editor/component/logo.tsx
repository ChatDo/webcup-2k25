import { JSX } from "solid-js";

const Logo = (): JSX.Element => {
    return (
        <svg
            width="85"
            height="85"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="200" height="200" fill="#111111" />
            <text
                x="50%"
                y="45%"
                text-anchor="middle"
                fill="#FF3C3C"
                font-size="36"
                font-family="Arial, sans-serif"
            >
                TheEnd
            </text>
            <text
                x="50%"
                y="70%"
                text-anchor="middle"
                fill="#CCCCCC"
                font-size="24"
                font-family="Arial, sans-serif"
            >
                .page
            </text>
            <circle cx="150" cy="150" r="8" fill="#FF3C3C">
                <animateTransform
                    attributeName="transform"
                    type="scale"
                    values="1;2;1"
                    dur="2.5s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
};

export default Logo;
