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

	// let test = [
	// 	{
	// 		id: 0,
	// 		tableName: 'first table',
	// 		xPosition: '200px',
	// 		yPosition: '200px',
	// 		type: 'entity',
	// 		values: [
	// 			{
	// 				name: 'test',
	// 				code: 'TEST',
	// 				type: 'char',
	// 				size: null,
	// 				constraint: 'primary_key',
	// 				null: false
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 1,
	// 		tableName: 'second table',
	// 		xPosition: '400px',
	// 		yPosition: '400px',
	// 		type: 'entity',
	// 		values: [
	// 			{
	// 				name: 'test',
	// 				code: 'TEST',
	// 				type: 'char',
	// 				size: null,
	// 				constraint: 'primary_key',
	// 				null: false
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 2,
	// 		tableName: 'second table',
	// 		xPosition: '600px',
	// 		yPosition: '300px',
	// 		type: 'entity',
	// 		values: [
	// 			{
	// 				name: 'test',
	// 				code: 'TEST',
	// 				type: 'char',
	// 				size: null,
	// 				constraint: 'primary_key',
	// 				null: false
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 3,
	// 		type: 'relationLine',
	// 		divId1: 0,
	// 		divId2: 2,
	// 		values: {
	//		 	min: '0',
	//		 	max: 'n'
	//		}
	// 	}
	// ];

	if (browser) {
		// localStorage.setItem('elements-model', JSON.stringify(test));
		setTimeout(() => {
			elements = JSON.parse(localStorage.getItem('elements-model'));
		}, 1000);
	}

	const handleBodyClick = (e) => {
		if (sideMenuSelectedItem === 'table') {
			let prevElementList = JSON.parse(localStorage.getItem('elements-model'));

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
			let prevElementList = JSON.parse(localStorage.getItem('elements-model'));

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

{#if elements}
	<div
		class="model-area"
		tabIndex={0}
		on:keydown={(e) => handleKeyDown(e, handleBodyClick)}
		on:click={handleBodyClick}
	>
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
	</div>
{:else}
	<div class="lds-ripple">
		<div />
		<div />
	</div>
{/if}

{#if elements}
	<SideMenu bind:sideMenuSelectedItem />
{/if}

<style>
	.model-area {
		height: calc(100% - 60px);
		width: 100%;
	}
</style>
