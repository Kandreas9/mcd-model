<script>
	import handleKeyDown from '../utils/onKeyDown';

	export let sideMenuSelectedItem;
	let menuOpen = false;

	const handleOpenMenu = () => {
		menuOpen = true;
	};

	const handleCloseMenu = () => {
		menuOpen = false;
	};

	const handleSelectItem = (e) => {
		sideMenuSelectedItem = e.target.id;
		handleCloseMenu();
	};
</script>

<div class="sideMenu" class:menuOpen>
	{#if !menuOpen}
		<img
			tabIndex={0}
			on:keydown={(e) => handleKeyDown(e, handleOpenMenu)}
			on:click={handleOpenMenu}
			class="open"
			src="arrow-left.svg"
			alt="arrow left"
		/>
	{:else}
		<img
			tabIndex={0}
			on:keydown={(e) => handleKeyDown(e, handleCloseMenu)}
			on:click={handleCloseMenu}
			class="close"
			src="arrow-right.svg"
			alt="arrow right"
		/>
	{/if}

	<div
		tabIndex={0}
		on:keydown={(e) => handleKeyDown(e, handleSelectItem)}
		on:click={handleSelectItem}
		id="move"
		class:selected={sideMenuSelectedItem === 'move'}
		class="option"
	>
		MOVE
	</div>
	<img
		tabIndex={0}
		on:keydown={(e) => handleKeyDown(e, handleSelectItem)}
		on:click={handleSelectItem}
		id="table"
		class:selected={sideMenuSelectedItem === 'table'}
		class="option"
		src="entity-table.svg"
		alt="table"
	/>
	<!-- <img
		on:click={handleSelectItem}
		id="relationTable"
		class:selected={sideMenuSelectedItem === 'relationTable'}
		class="option"
		src="relation-table.svg"
		alt="relation table"
	/> -->
	<img
		tabIndex={0}
		on:keydown={(e) => handleKeyDown(e, handleSelectItem)}
		on:click={handleSelectItem}
		id="relationLine"
		class:selected={sideMenuSelectedItem === 'relationLine'}
		class="option"
		src="relation-line.svg"
		alt="relation line"
	/>
</div>

<style>
	.sideMenu {
		position: fixed;
		top: 0;
		right: 0;
		height: 100vh;
		width: 40vw;
		transform: translateX(40vw);
		background-color: rgb(47, 45, 67);
		transition: transform 0.7s ease-in-out;
		border-left: 2px solid rgb(95, 92, 126);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 4rem 0;
	}

	.selected {
		border: 1px solid red;
	}

	.option {
		height: 5rem;
	}

	.menuOpen {
		transform: translateX(0);
	}

	.open,
	.close {
		user-select: none;
		border: 1px solid rgb(95, 92, 126);
		position: absolute;
		top: 50%;
		left: -3rem;
		transform: translateY(-50%);
		height: 3rem;
		background-color: rgb(47, 45, 67);
		border-radius: 50% 0 0 50%;
	}
</style>
