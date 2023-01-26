<script>
	import '../global.css';
	import { browser } from '$app/environment';

	import Nav from '$lib/nav.svelte';
	import EntityTable from '../lib/entityTable.svelte';

	let elements;
	let dragElements = [];

	// let test = [
	// 	{
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
	// 	}
	// ];

	if (browser) {
		// localStorage.setItem('elements-model', JSON.stringify(test));
		elements = JSON.parse(localStorage.getItem('elements-model'));
	}

	function test() {
		console.log(dragElements);
	}
</script>

<Nav />

{#if elements}
	{#each elements as element, i}
		{#if element.type == 'entity'}
			<EntityTable
				bind:dragElement={dragElements[i]}
				id={i}
				xPosition={element.xPosition}
				yPosition={element.yPosition}
				tableName={element.tableName}
				values={element.values}
			/>
		{/if}
	{/each}
{/if}

<button on:click={test}>TESTME</button>
