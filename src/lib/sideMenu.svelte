<script>
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
	};
</script>

<div class="sideMenu" class:menuOpen>
	{#if !menuOpen}
		<img on:click={handleOpenMenu} class="open" src="arrow-left.svg" alt="arrow left" />
	{:else}
		<img on:click={handleCloseMenu} class="close" src="arrow-right.svg" alt="arrow right" />
	{/if}

	<div
		on:click={handleSelectItem}
		id="move"
		class:selected={sideMenuSelectedItem === 'move'}
		class="option"
	>
		MOVE
	</div>
	<img
		on:click={handleSelectItem}
		id="table"
		class:selected={sideMenuSelectedItem === 'table'}
		class="option"
		src="table.png"
		alt="table"
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
		transition: transform 1s ease-in-out;
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
