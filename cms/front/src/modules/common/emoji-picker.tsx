import { EmojiPicker } from 'solid-emoji-picker';

export default function EmojiPickerComponent() {
    function pickEmoji(emoji) {
        console.log('You clicked', emoji.name);
    }

    return (
        <EmojiPicker onEmojiClick={pickEmoji} />
    );
}