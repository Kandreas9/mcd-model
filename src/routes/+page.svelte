<script>
	import '../global.css';
	import { browser } from '$app/environment';

	import Nav from '$lib/nav.svelte';
	import EntityTable from '../lib/entityTable.svelte';
	import RelationLine from '../lib/relationLine.svelte';
	import SideMenu from '../lib/sideMenu.svelte';
	import handleKeyDown from '../utils/onKeyDown';
	import RelationTable from '../lib/relationTable.svelte';

	let elements;
	let dragableElements = [];
	let sideMenuSelectedItem = 'move';
	let relation = [];
	let selected = { id1: null, id2: null };

	let modelArea;

	if (browser) {
		setTimeout(() => {
			elements = JSON.parse(localStorage.getItem('elements-model'));
		}, 1000);
	}

	const handleBodyClick = (e) => {
		if (sideMenuSelectedItem === 'table') {
			let prevElementList =
				elements === null ? [] : JSON.parse(localStorage.getItem('elements-model'));

			prevElementList.push({
				id: prevElementList.length,
				xPosition: `${e.clientX}px`,
				yPosition: `${e.clientY}px`,
				type: 'entity',
				values: [],
				tableName: `entity${prevElementList.length}`
			});

			elements = prevElementList;
			localStorage.setItem('elements-model', JSON.stringify(prevElementList));
		} else if (sideMenuSelectedItem === 'relationTable') {
			let prevElementList =
				elements === null ? [] : JSON.parse(localStorage.getItem('elements-model'));

			prevElementList.push({
				id: prevElementList.length,
				xPosition: `${e.clientX}px`,
				yPosition: `${e.clientY}px`,
				type: 'relationTable',
				value: '',
				tableName: `relationTable${prevElementList.length}`
			});

			elements = prevElementList;
			localStorage.setItem('elements-model', JSON.stringify(prevElementList));
		}
	};

	const addRelation = () => {
		let prevElementList = JSON.parse(localStorage.getItem('elements-model'));

		prevElementList.push({
			id: prevElementList.length,
			divId1: relation[0][0],
			divId2: relation[1][0],
			type: 'relationLine',
			values: { min: '0', max: 'n' }
		});

		relation = [];
		selected = { id1: null, id2: null };
		elements = prevElementList;
		localStorage.setItem('elements-model', JSON.stringify(prevElementList));
	};

	const handleRelationClick = (id, type) => {
		if (sideMenuSelectedItem == 'relationLine') {
			if (relation.length == 1) {
				//If id is equal do nothing
				if (id == relation[0][0]) {
					relation = [];
					selected = { id1: null, id2: null };

					return;
				}

				relation.push([id, type]);
				selected.id2 = id;

				addRelation();
			} else if (relation.length < 1) {
				relation.push([id, type]);
				selected.id1 = id;
			}
		}
	};

	$: if (sideMenuSelectedItem !== 'relationLine') {
		selected = { id1: null, id2: null };
		relation = [];
	}
</script>

<Nav />

{#if elements !== undefined}
	<div
		bind:this={modelArea}
		class="model-area"
		tabIndex={0}
		on:keydown={(e) => handleKeyDown(e, handleBodyClick)}
		on:click={handleBodyClick}
	>
		{#if elements}
			{#each elements as element, i}
				{#if element.type == 'entity'}
					<EntityTable
						{selected}
						bind:elements
						disabled={sideMenuSelectedItem === 'relationLine'}
						bind:dragableElement={dragableElements[i]}
						id={i}
						{handleRelationClick}
						xPosition={element.xPosition}
						yPosition={element.yPosition}
						tableName={element.tableName}
						values={element.values}
					/>
				{:else if element.type === 'relationTable'}
					<RelationTable
						{selected}
						bind:elements
						disabled={sideMenuSelectedItem === 'relationLine'}
						bind:dragableElement={dragableElements[i]}
						id={i}
						{handleRelationClick}
						xPosition={element.xPosition}
						yPosition={element.yPosition}
						tableName={element.tableName}
						value={element.value}
					/>
				{:else if element.type === 'relationLine'}
					<RelationLine
						bind:elements
						connection={element.values}
						id={i}
						elementsIds={[element.divId1, element.divId2]}
						dragableElements={[dragableElements[element.divId1], dragableElements[element.divId2]]}
					/>
				{/if}
			{/each}
		{/if}
	</div>
{:else if elements === undefined}
	<div class="lds-ripple">
		<div />
		<div />
	</div>
{/if}

{#if elements !== undefined}
	<div class="sideMenuWrapper">
		<SideMenu {modelArea} bind:sideMenuSelectedItem />
	</div>
{/if}

<div class="mobileWrapper">
	<img src="mobile.png" alt="dragon breathing fire at a castle" />
	<h2>Unfortunately this site does not work for mobile.</h2>
</div>

<style>
	.model-area {
		height: calc(100% - 60px);
		width: 100%;
		margin: 0 auto;
		max-width: 1900px;
		background: linear-gradient(90deg, var(--secondary) calc(44px - 2px), transparent 1%) center,
			linear-gradient(var(--secondary) calc(44px - 2px), transparent 1%) center, var(--primary);
		background-size: 44px 44px;
	}

	.mobileWrapper {
		overflow: hidden;
		position: relative;
		display: none;
	}

	.mobileWrapper img {
		width: 40rem;
	}

	.mobileWrapper h2 {
		word-break: break-word;
		color: rgb(203, 203, 203);
		text-align: center;
		font-weight: bold;
		font-size: 2rem;
		margin: 0 2rem;
	}

	@media (max-width: 1100px) {
		.lds-ripple {
			display: none;
		}

		.model-area {
			display: none;
		}

		.sideMenuWrapper {
			display: none;
		}

		.mobileWrapper {
			height: calc(100% - 60px);
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}

	@media (max-width: 540px) {
		.mobileWrapper img {
			width: 30rem;
		}
	}
</style>
