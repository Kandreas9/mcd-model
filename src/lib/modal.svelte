<script>
	import handleKeyDown from '../utils/onKeyDown';
	export let handleCloseSearch;
</script>

<div class="modal">
	<div
		tabIndex={0}
		on:keydown={(e) => handleKeyDown(e, handleCloseSearch)}
		on:click={handleCloseSearch}
		class="modal-bg"
	/>

	<div class="modal-content">
		<slot />
	</div>
</div>

<style>
	.modal {
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: top;
	}

	.modal-bg {
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.8);
		height: 100vh;
		width: 100vw;
	}

	.modal-content {
		padding: 2rem;
		margin-top: 4rem;
		position: absolute;
		z-index: 150;
		border-radius: 10px;
		background-color: #6f92f1;
		display: flex;
		align-items: center;
	}
</style>
