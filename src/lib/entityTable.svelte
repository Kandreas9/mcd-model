<script>
	import DragItem from "./dragItem.svelte";
	import Modal from "./modal.svelte";
    
    let isModalOpen = false;

    const handledbclick = () => {
        isModalOpen = true;
    }

    const handleCloseSearch = () => {
        isModalOpen = false;
    }
</script>

<DragItem {handledbclick}>
    <table>
        <tr>
            <th colspan="3">Name</th>
        </tr>
        <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
        </tr>
        <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
        </tr>
    </table>
</DragItem>

{#if isModalOpen}
     <Modal {handleCloseSearch}>
        <form>
            <label>
                Name
                <input type="text">
            </label>
        </form>
     </Modal>
{/if}

<style>
    table,th, td {
        user-select: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        pointer-events: none;
        border: 1px solid  rgb(103, 100, 141);
    }

    th {
        text-align: center;
    }
</style>