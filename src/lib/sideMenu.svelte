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

<div
	tabIndex={0}
	on:keydown={(e) => handleKeyDown(e, handleCloseMenu)}
	on:click={handleCloseMenu}
	class="background"
	class:backgroundOpen={menuOpen}
/>

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

	<img
		tabIndex={0}
		on:keydown={(e) => handleKeyDown(e, handleSelectItem)}
		on:click={handleSelectItem}
		id="move"
		class:selected={sideMenuSelectedItem === 'move'}
		class="option"
		src="cursor.svg"
		alt="move cursor"
	/>
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
	<img
		tabIndex={0}
		on:keydown={(e) => handleKeyDown(e, handleSelectItem)}
		on:click={handleSelectItem}
		id="relationTable"
		class:selected={sideMenuSelectedItem === 'relationTable'}
		class="option"
		src="relation-table.svg"
		alt="relation table"
	/>
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
	.background {
		transition: opacity 0.7s ease-in-out, transform 0s 0.7s;
		position: fixed;
		top: 0;
		right: 0;
		z-index: 19;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.4);
		transform: translateX(100%);
		opacity: 0;
	}
	.sideMenu {
		z-index: 20;
		position: fixed;
		top: 0;
		right: 0;
		height: 100vh;
		width: 25vw;
		transform: translateX(25vw);
		background-color: var(--primary);
		transition: transform 0.7s ease-in-out;
		border-left: 2px solid rgb(95, 92, 126);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
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

	.backgroundOpen {
		transform: translateX(0);
		opacity: 1;
		transition: opacity 0.7s ease-in-out;
	}

	.open,
	.close {
		user-select: none;
		border: 1px solid var(--secondary-light);
		position: absolute;
		top: 50%;
		left: -3rem;
		transform: translateY(-50%);
		height: 3rem;
		background-color: var(--primary);
		border-radius: 50% 0 0 50%;
	}
</style>
