<script>
	import handleKeyDown from '../utils/onKeyDown';
	import DragItem from './dragItem.svelte';
	import Modal from './modal.svelte';

	export let id;
	export let xPosition;
	export let yPosition;
	export let values;
	export let tableName;
	export let disabled;
	export let handleRelationClick;
	export let selected;
	export let elements;

	export let dragableElement;

	//Modal
	let tableInputs = [...values];
	let isModalOpen = false;

	const handledbclick = () => {
		if (!disabled) {
			isModalOpen = true;
		}
	};

	const handleCloseSearch = () => {
		isModalOpen = false;
	};

	const handleAddTableInput = () => {
		let tempArray = [
			...tableInputs,
			{
				name: '',
				code: '',
				type: '',
				size: null,
				constraint: '',
				null: false
			}
		];

		tableInputs = tempArray;
	};

	const onSubmit = (e) => {
		let prevElementList = JSON.parse(localStorage.getItem('elements-model'));

		prevElementList[id] = {
			id,
			xPosition: dragableElement.style.left,
			yPosition: dragableElement.style.top,
			type: 'entity',
			values: tableInputs,
			tableName
		};

		values = tableInputs;
		localStorage.setItem('elements-model', JSON.stringify(prevElementList));

		handleCloseSearch();
	};

	const handleDelete = () => {
		let prevElementList = JSON.parse(localStorage.getItem('elements-model'));

		prevElementList.splice(id, id);

		localStorage.setItem('elements-model', JSON.stringify(prevElementList));

		handleCloseSearch();
		elements = prevElementList;
	};
</script>

<DragItem {id} {disabled} {xPosition} {yPosition} bind:dragableElement {handledbclick}>
	<table
		class:highlight={selected.id1 == id || selected.id2 == id}
		tabIndex={0}
		on:keydown={(e) => handleKeyDown(e, () => handleRelationClick(id, 'table'))}
		on:click={() => handleRelationClick(id, 'table')}
		class="table"
		class:active={!disabled}
	>
		<tr>
			<th colspan="2">{tableName}</th>
		</tr>
		{#each values as row}
			<tr>
				<td>{row.name}</td>
				<td>{row.type}</td>
			</tr>
		{/each}
	</table>
</DragItem>

{#if isModalOpen}
	<Modal {handleCloseSearch}>
		<form on:submit|preventDefault={onSubmit}>
			<label>
				Name
				<input type="text" id="name" name="name" bind:value={tableName} />
			</label>

			<table>
				<tr>
					<th>Num</th>
					<th>Name</th>
					<th>Code</th>
					<th>Type</th>
					<th>Size</th>
					<th>Constraint</th>
					<th>Null</th>
				</tr>

				{#each tableInputs as itemInputs, i}
					<tr>
						<td>
							{i + 1}
						</td>
						<td>
							<input
								type="text"
								id="name"
								name="name"
								on:input={(e) => {
									itemInputs.code = e.target.value.toUpperCase();

									return (itemInputs.name = e.target.value);
								}}
								bind:value={itemInputs.name}
							/>
						</td>
						<td><input type="text" id="code" name="code" bind:value={itemInputs.code} /></td>
						<td>
							<select name="type" id="type" bind:value={itemInputs.type}>
								<!-- text -->
								<option value="auto_increment">auto_increment</option>
								<option value="char">char</option>
								<option value="varchar">varchar</option>
								<option value="binary">binary</option>
								<option value="varbinary">varbinary</option>
								<option value="tinyblob">tinyblob</option>
								<option value="tinytext">tinytext</option>
								<option value="text">text</option>
								<option value="blob">blob</option>
								<option value="mediumtext">mediumtext</option>
								<option value="mediumblob">mediumblob</option>
								<option value="longtext">longtext</option>
								<option value="longblob">longblob</option>
								<option value="enum">enum</option>
								<option value="set">set</option>
								<!-- Numbers -->
								<option value="bit">bit</option>
								<option value="tinyint">tinyint</option>
								<option value="bool">bool</option>
								<option value="smallint">smallint</option>
								<option value="mediumint">mediumint</option>
								<option value="int">int</option>
								<option value="bigint">bigint</option>
								<option value="float">float</option>
								<option value="double">double</option>
								<option value="decimal">decimal</option>
								<option value="date">date</option>
								<option value="datetime">datetime</option>
								<option value="timestamp">timestamp</option>
								<option value="time">time</option>
								<option value="year">year</option>
							</select>
						</td>
						<td
							><input
								type="text"
								id="size"
								name="attributes[{i}][size]"
								bind:value={itemInputs.size}
							/></td
						>
						<td>
							<select name="type" id="constraint" bind:value={itemInputs.constraint}>
								<option value="" />
								<option value="primary_key">Primary Key</option>
							</select>
						</td>
						<td>
							<input type="checkbox" id="null" name="null" bind:value={itemInputs.null} />
						</td>
					</tr>
				{/each}
			</table>

			<div>
				<button on:click={handleAddTableInput} type="button">+</button>
			</div>
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

	.table {
		width: 15rem;
	}

	.active {
		user-select: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-o-user-select: none;
		pointer-events: none;
	}

	.table,
	.table th,
	.table td {
		border: 1px solid rgb(103, 100, 141);
	}

	.highlight {
		border: 1px solid red;
	}

	th {
		text-align: center;
	}
</style>
