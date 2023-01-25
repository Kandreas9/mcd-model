<script>
    import { onMount } from "svelte";

    export let handledbclick;
	let dragItem = false;
    let xPosition
    let yPosition
    let xOffset
    let yOffset

    onMount(() => {
        document.onmousemove = move;
    })

     const setPosition = (x, y) => {
            xPosition = `${x}px`;
            yPosition = `${y}px`;
            dragItem.style.left = xPosition;
            dragItem.style.top = yPosition;
    }

	function dragstart(e) {
		dragItem = e.target;
        xOffset = e.offsetX
        yOffset = e.offsetY
	}

	function drop() {
        dragItem = null
	}

	function move(e) {
		let dragx = e.pageX - xOffset;
		let dragy = e.pageY - yOffset;
        let notTouchingNav = dragy >= 60 ? true : false;
        let notTouchingLeft = dragx >= 0 ? true : false;
        let notTouchingBottom = (e.pageY + yOffset) <= document.body.offsetHeight ? true : false;
        let notTouchingRight = (e.pageX + xOffset) <= document.body.offsetWidth ? true : false;

        if (dragItem && notTouchingNav && notTouchingLeft && notTouchingBottom && notTouchingRight) {
            setPosition(dragx, dragy);
        }else if (dragItem && !notTouchingNav) {
            setPosition(dragx, 60);
            dragItem = null
        }else if (dragItem && !notTouchingLeft) {
            setPosition(0, dragy);
            dragItem = null
        }else if (dragItem && !notTouchingBottom) {
            setPosition(dragx, document.body.offsetHeight - dragItem.offsetHeight);
            dragItem = null
        }else if (dragItem && !notTouchingRight) {
            setPosition(document.body.offsetWidth - dragItem.offsetWidth, dragy);
            dragItem = null
        }
	}
</script>

<div on:dblclick={handledbclick} class="box" on:mousedown={dragstart} on:mouseup={drop}>
    <slot></slot>
</div>

<style>
	.box {
        color: white;
		z-index: 3;
        border: 1px solid  rgb(103, 100, 141);
		position: absolute;
		left: 100px;
		top: 100px;
        border-radius: 10px;
		background-color: rgb(47, 45, 67);
        min-height: 100px;
        min-width: 100px;
		height: auto;
		width: auto;
	}
</style>