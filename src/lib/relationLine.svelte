<script>
	import { onMount } from 'svelte';
	import Modal from './modal.svelte';

	export let dragableElements;

	let line;
	let isModalOpen = false;

	const handledbclick = () => {
		isModalOpen = true;
	};

	const handleCloseSearch = () => {
		isModalOpen = false;
	};

	function connect(div1, div2, color, thickness) {
		let position1 = getPosition(div1);
		let position2 = getPosition(div2);

		// bottom right
		let x1 = position1.left;
		let y1 = position1.top;
		// top right
		let x2 = position2.left;
		let y2 = position2.top;
		// distance
		let length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
		// center
		let cx = (x1 + x2) / 2 - length / 2;
		let cy = (y1 + y2) / 2 - thickness / 2;
		// angle
		let angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
		// make hr
		line =
			// `<div style='z-index: 10;position: absolute;padding:0px; margin:0px; height: ${thickness}px;background-color: ${color};line-height:1px; ; left: ${cx}px; top: ${cy}px; width: ${length}px; transform: rotate(${angle}deg);/>`
			"<div style='z-index: 10;position: absolute;padding:0px; margin:0px; height:" +
			thickness +
			'px; background-color:' +
			color +
			'; line-height:1px; left:' +
			cx +
			'px; top:' +
			cy +
			'px; width:' +
			length +
			'px; -moz-transform:rotate(' +
			angle +
			'deg); -webkit-transform:rotate(' +
			angle +
			'deg); -o-transform:rotate(' +
			angle +
			'deg); -ms-transform:rotate(' +
			angle +
			'deg); transform:rotate(' +
			angle +
			"deg);' />";
	}

	function getPosition(el) {
		let rect = el.getBoundingClientRect();

		return {
			left: rect.left + rect.width / 2,
			top: rect.top + rect.height / 2,
			width: rect.width || el.offsetWidth,
			height: rect.height || el.offsetHeight
		};
	}

	$: if ((dragableElements[0], dragableElements[1])) {
		connect(dragableElements[0], dragableElements[1], '#0F0', 5);
	}
</script>

<div on:dblclick={handledbclick}>
	{@html line}
</div>

{#if isModalOpen}
	<Modal {handleCloseSearch} />
{/if}
