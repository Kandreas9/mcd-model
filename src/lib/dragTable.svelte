<script>
    import { onMount } from "svelte";

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

<div>

    <table on:dblclick={() => console.log('double click')} class="box" on:mousedown={dragstart} on:mouseup={drop}>
        <tr>
            <th colspan="3">Name</th>
        </tr>
        <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
        </tr>
        <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
        </tr>
    </table>
</div>

<style>
    th {
        text-align: center;
    }

    th, td {
        border: 1px solid  rgb(103, 100, 141);
        pointer-events: none;
    }
	.whole-page {
        position: fixed;
        top: 60px;
        left: 0;
        width: 100vw;
        height: calc(100vh - 60px);
    }
	.box {
        color: white;
        user-select: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
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
	.grab {
		color: black;
		background-color: rgb(253, 253, 253);
		height: 20px;
		width: 30px;
		font-size: 13px;
		border: solid 2px black;
		cursor: pointer;
	}
</style>