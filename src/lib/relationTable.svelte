<script>
	import handleKeyDown from '../utils/onKeyDown';
	import DragItem from './dragItem.svelte';
	import Modal from './modal.svelte';

	export let id;
	export let xPosition;
	export let yPosition;
	export let disabled;
	export let value;
	export let tableName;
	export let selected;
	export let handleRelationClick;
	export let elements;

	export let dragableElement;

	let isModalOpen = false;

	const handledbclick = () => {
		if (!disabled) {
			isModalOpen = true;
		}
	};

	const handleCloseSearch = () => {
		isModalOpen = false;
	};
	const onSubmit = (e) => {
		let prevElementList = JSON.parse(localStorage.getItem('elements-model'));

		prevElementList[id] = {
			id,
			xPosition: dragableElement.style.left,
			yPosition: dragableElement.style.top,
			type: 'relationTable',
			value: value,
			tableName
		};

		localStorage.setItem('elements-model', JSON.stringify(prevElementList));

		handleCloseSearch();
	};

	const handleDelete = () => {
		let prevElementList = JSON.parse(localStorage.getItem('elements-model'));
		// let relations = prevElementList.filter((e) => e.type === 'relationLine');

		prevElementList.splice(id, id);

		localStorage.setItem('elements-model', JSON.stringify(prevElementList));

		handleCloseSearch();
		elements = prevElementList;
	};
</script>

<DragItem
	{id}
	{disabled}
	{xPosition}
	{yPosition}
	bind:dragableElement
	{handledbclick}
	relationTable={true}
>
	<table
		class="relationTable"
		class:highlight={selected.id1 == id || selected.id2 == id}
		class:active={!disabled}
		tabIndex={0}
		on:keydown={(e) => handleKeyDown(e, () => handleRelationClick(id, 'relationTable'))}
		on:click={() => handleRelationClick(id, 'relationTable')}
	>
		<tr><th>{tableName}</th></tr>

		<div class="divider" />

		<tr>
			<td>{value}</td>
		</tr>
	</table>
</DragItem>

{#if isModalOpen}
	<Modal {handleCloseSearch}>
		<form on:submit|preventDefault={onSubmit}>
			<label>
				Name
				<input type="text" id="name" name="name" bind:value={tableName} />
			</label>

			<label>
				Value
				<input type="text" id="value" name="value" bind:value />
			</label>

			<button>Submit</button>
			<button on:click={handleDelete} type="button" class="delete">Delete</button>
		</form>
	</Modal>
{/if}

<style>
	form {
		user-select: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-o-user-select: none;
	}

	.active {
		user-select: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-o-user-select: none;
		pointer-events: none;
	}

	.highlight {
		border-radius: 50%;
		border: 1px solid red;
	}

	.relationTable {
		text-align: center;
	}

	.relationTable th {
		padding: 1rem 2rem 0.5rem 2rem;
	}

	.relationTable td {
		padding: 0.5rem 2rem 1rem 2rem;
	}

	.divider {
		border-bottom: 1px solid white;
	}
</style>
