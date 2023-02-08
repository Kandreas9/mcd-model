<script>
	import Modal from './modal.svelte';

	export let dragableElements;
	export let id;
	export let elementsIds;
	export let elements;
	let relationLine;

	export let connection = {
		min: '0',
		max: 'n'
	};
	let line;
	let isModalOpen = false;

	const handledbclick = () => {
		isModalOpen = true;
	};

	const handleCloseSearch = () => {
		isModalOpen = false;
	};

	let x1;
	let x2;
	let y1;
	let y2;

	function connect(div1, div2, color, thickness) {
		if (elements) {
			let position1 = getPosition(div1);
			let position2 = getPosition(div2);

			// bottom right
			x1 = position1.left;
			y1 = position1.top;
			// top right
			x2 = position2.left;
			y2 = position2.top;
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
				"<div style='position: absolute;padding:0px; margin:0px; height:" +
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

	function onSubmit(e) {
		let prevElementList = JSON.parse(localStorage.getItem('elements-model'));

		prevElementList[id] = {
			id,
			type: 'relationLine',
			divId1: elementsIds[0],
			divId2: elementsIds[1],
			values: connection
		};

		localStorage.setItem('elements-model', JSON.stringify(prevElementList));

		handleCloseSearch();
	}

	const handleDelete = () => {
		let prevElementList = JSON.parse(localStorage.getItem('elements-model'));

		prevElementList.splice(id, id);

		localStorage.setItem('elements-model', JSON.stringify(prevElementList));

		handleCloseSearch();
		elements = prevElementList;
	};

	$: if ((dragableElements[0], dragableElements[1])) {
		connect(dragableElements[0], dragableElements[1], 'var(--primary)', 5);
	}
</script>

<div bind:this={relationLine} on:dblclick={handledbclick}>
	{#if line}
		<div
			class="minMax"
			style="z-index: 2;position: absolute;top: {(y2 + y1) / 2}px;left: {(x2 + x1) / 2}px;"
		>
			{connection.min}/{connection.max}
		</div>
		{@html line}
	{/if}
</div>

{#if isModalOpen}
	<Modal {handleCloseSearch}>
		<form on:submit|preventDefault={onSubmit}>
			<table>
				<tr>
					<th>Min</th>
					<th>Max</th>
				</tr>
				<tr>
					<td><input type="text" name="min" id="min" bind:value={connection.min} /></td>
					<td><input type="text" name="max" id="max" bind:value={connection.max} /></td>
				</tr>
			</table>

			<div>
				<button class="submit">Submit</button>
				<button on:click={handleDelete} type="button" class="delete">Delete</button>
			</div>
		</form></Modal
	>
{/if}

<style>
	.minMax {
		font-weight: bold;
		color: white;
		font-size: 1.5rem;
		letter-spacing: 0.1rem;
	}
</style>
