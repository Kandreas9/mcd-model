<script>
	export let dragElement;
	export let handledbclick;
	export let xPosition = '200px';
	export let yPosition = '200px';

	let dragItem = null;
	let xOffset;
	let yOffset;

	const setPosition = (x, y) => {
		xPosition = `${x}px`;
		yPosition = `${y}px`;
		dragItem.style.left = xPosition;
		dragItem.style.top = yPosition;
	};

	function dragstart(e) {
		document.onmousemove = move;
		dragItem = e.target;
		xOffset = e.offsetX;
		yOffset = e.offsetY;
	}

	function drop() {
		dragItem = null;
	}

	function move(e) {
		let dragx = e.pageX - xOffset;
		let dragy = e.pageY - yOffset;
		let notTouchingNav = dragy >= 60 ? true : false;
		let notTouchingLeft = dragx >= 0 ? true : false;
		let notTouchingBottom = e.pageY + yOffset <= document.body.offsetHeight ? true : false;
		let notTouchingRight = e.pageX + xOffset <= document.body.offsetWidth ? true : false;

		if (dragItem && notTouchingNav && notTouchingLeft && notTouchingBottom && notTouchingRight) {
			setPosition(dragx, dragy);
		} else if (dragItem && !notTouchingNav) {
			setPosition(dragx, 60);
			dragItem = null;
		} else if (dragItem && !notTouchingLeft) {
			setPosition(0, dragy);
			dragItem = null;
		} else if (dragItem && !notTouchingBottom) {
			setPosition(dragx, document.body.offsetHeight - dragItem.offsetHeight);
			dragItem = null;
		} else if (dragItem && !notTouchingRight) {
			setPosition(document.body.offsetWidth - dragItem.offsetWidth, dragy);
			dragItem = null;
		}
	}
</script>

<div
	bind:this={dragElement}
	on:dblclick={handledbclick}
	class="box"
	on:mousedown={dragstart}
	on:mouseup={drop}
	style="top: {yPosition}; left: {xPosition}"
>
	<slot />
</div>

<style>
	.box {
		color: white;
		z-index: 3;
		border: 1px solid rgb(103, 100, 141);
		position: absolute;
		border-radius: 10px;
		background-color: rgb(47, 45, 67);
		min-width: 100px;
		height: auto;
		width: auto;
	}
</style>
