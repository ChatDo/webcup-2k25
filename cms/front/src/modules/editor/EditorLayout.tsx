import {Resizable, ResizableHandle, ResizablePanel} from "~/modules/solidui/components/resizable";
import {ParentComponent} from "solid-js";

export const EditorLayout: ParentComponent = (props) => {
    return (
        <div class="h-screen flex flex-col">
            {/* Header */}
            <header class="h-16 bg-gray-800 text-white flex items-center px-6 shadow">
                <h1 class="text-xl font-bold">My App Header</h1>
            </header>

            {/* Main area with sidebar and content */}
            <Resizable orientation="horizontal" class="flex-1 flex">
                {/* Sidebar panel */}
                <ResizablePanel class="bg-gray-100 min-w-[150px] max-w-[400px]">
                    <div class="p-6">
                        <h2 class="text-lg font-semibold mb-2">Sidebar</h2>
                        <p class="text-gray-600">Sidebar content here</p>
                    </div>
                </ResizablePanel>

                {/* Resizable handle */}
                <ResizableHandle class="bg-gray-200 hover:bg-gray-300 transition-colors"/>

                {/* Content panel */}
                <ResizablePanel class="flex-1 p-6 overflow-y-auto bg-white">
                    {props.children}
                </ResizablePanel>
            </Resizable>
        </div>
    );
}
