export default function handleKeyDown(e, handler) {
	if (e.keyCode === 13) {
		handler();
	}
}
