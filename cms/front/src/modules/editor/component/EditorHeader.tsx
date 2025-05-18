import {Component, Show} from "solid-js";
import {ToggleGroup, ToggleGroupItem} from "~/modules/solidui/components/toggle-group";
import {BiRegularHide} from "solid-icons/bi";
import {AiOutlineSplitCells} from "solid-icons/ai";
import {VsOpenPreview} from "solid-icons/vs";
import {Button} from "~/modules/solidui/components/button";
import {Toggle} from "~/modules/solidui/components/toggle";
import {FaRegularMoon, FaRegularSun} from "solid-icons/fa";


interface EditorHeaderProps {
    onShare: () => void,
    previewMode: string,
    setPreviewMode: (ModuleEvaluator: string | null) => void,
}

export const EditorHeader: Component<EditorHeaderProps> = (props) => {
    const onChange = (value: string | null) => {
        props.setPreviewMode(value ?? "hidden");
    }

    return (
        <header class="w-full bg-gray-50 px-6 py-4 flex items-center justify-between">

            <ToggleGroup onChange={onChange} value={props.previewMode} defaultValue={"hidden"}>
                <ToggleGroupItem value="hidden">
                    <BiRegularHide/>
                </ToggleGroupItem>
                <ToggleGroupItem value="split">
                    <AiOutlineSplitCells/>
                </ToggleGroupItem>
                <ToggleGroupItem value="full">
                    <VsOpenPreview/>
                </ToggleGroupItem>
            </ToggleGroup>


            <div>
                {/*<Toggle>*/}
                {/*    {(state) => (*/}
                {/*        <Show when={state.pressed()} fallback={<FaRegularMoon/>}>*/}
                {/*            <FaRegularSun/>*/}
                {/*        </Show>*/}
                {/*    )}*/}
                {/*</Toggle>*/}
                <Button

                    onClick={props.onShare}
                >
                    Partager
                </Button>

            </div>
        </header>
    );
}
