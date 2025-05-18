import {Component} from "solid-js";

export interface ComponentDefinition {
    type: string;
    component: Component<any>;
    defaultProps: Record<string, any>;
    label: string;
    icon?: string;
}

class ComponentRegistryClass {
    private components: Record<string, ComponentDefinition> = {};

    register(definition: ComponentDefinition): void {
        this.components[definition.type] = definition;
    }

    get(type: string): ComponentDefinition | undefined {
        return this.components[type];
    }

    getAll(): ComponentDefinition[] {
        return Object.values(this.components);
    }

    getComponent(type: string): Component<any> | undefined {
        return this.components[type]?.component;
    }

    getDefaultProps(type: string): Record<string, any> | undefined {
        return this.components[type]?.defaultProps;
    }
}

export const ComponentRegistry = new ComponentRegistryClass();

ComponentRegistry.register({
    type: 'TextBlock',
    label: 'Text Block',
    component: (props) => (
        <div class="space-y-4">
            <div
                contentEditable
                class="min-h-[150px] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onInput={(e) => props.onChange({content: e.currentTarget.innerHTML})}
                innerHTML={props.content}
            />
        </div>
    ),
    defaultProps: {
        content: '<p>Enter your text here</p>'
    }
});

ComponentRegistry.register({
    type: 'ImageUpload',
    label: 'Image',
    component: (props) => {
        let fileInputRef;

        const handleFileUpload = (e) => {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    props.onChange({src: event.target.result, alt: file.name});
                };
                reader.readAsDataURL(file);
            }
        };

        const handleSelectClick = () => {
            fileInputRef.click();
        };

        return (
            <div class="w-full flex flex-col items-center gap-4">
                {!props.src ? (
                    <>
                        <button
                            type="button"
                            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            onClick={handleSelectClick}
                        >
                            Select your image
                        </button>
                        <input
                            ref={el => fileInputRef = el}
                            type="file"
                            accept="image/*"
                            class="hidden"
                            onChange={handleFileUpload}
                        />
                    </>
                ) : (
                    <div class="w-full flex flex-col items-center gap-2">
                        <img
                            src={props.src}
                            alt={props.alt}
                            class="w-full max-w-xs max-h-64 object-contain rounded shadow cursor-pointer"
                            onClick={handleSelectClick}
                        />
                    </div>
                )}
            </div>
        );
    },
    defaultProps: {
        src: '',
        alt: 'Image description'
    }
});

ComponentRegistry.register({
    type: 'Gif',
    label: 'GIF',
    component: (props) => (
        <div class="w-full flex flex-col items-center gap-2">
            <img
                src={props.src}
                alt={props.alt}
                class="w-full max-w-xs max-h-64 object-contain rounded shadow"
            />
        </div>
    ),
    defaultProps: {
        src: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
        alt: 'GIF animé'
    }
});

