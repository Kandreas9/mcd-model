<script>
	import '../global.css';
	import { browser } from '$app/environment';

	import Nav from '$lib/nav.svelte';
	import EntityTable from '../lib/entityTable.svelte';
	import RelationLine from '../lib/relationLine.svelte';
	import SideMenu from '../lib/sideMenu.svelte';

	let elements;
	let dragableElements = [];
	let sideMenuSelectedItem;

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
	// 		divId2: 2
	// 	}
	// ];

	if (browser) {
		// localStorage.setItem('elements-model', JSON.stringify(test));
		elements = JSON.parse(localStorage.getItem('elements-model'));
	}

	function test2() {
		console.log(dragableElements);
	}
</script>

<Nav />

{#if elements}
	{#each elements as element, i}
		{#if element.type == 'entity'}
			<EntityTable
				bind:dragableElement={dragableElements[i]}
				id={i}
				xPosition={element.xPosition}
				yPosition={element.yPosition}
				tableName={element.tableName}
				values={element.values}
			/>
		{:else if element.type == 'relationLine'}
			<RelationLine
				connection={element.values}
				id={i}
				elementsIds={[element.divId1, element.divId2]}
				dragableElements={[dragableElements[element.divId1], dragableElements[element.divId2]]}
			/>
		{/if}
	{/each}
{/if}

<SideMenu {sideMenuSelectedItem} />

<button on:click={test2}>TESTME</button>
