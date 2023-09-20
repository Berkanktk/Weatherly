<script lang="ts">
    import codeData from "$lib/codeData.json"
</script>

<div class="p-4">
    <h1 class="text-5xl mb-8">Weather Icons</h1>

    <h2 class="text-3xl mb-4">WMO Weather interpretation codes (WW)</h2>
    <table>
        <thead>
            <tr>
                <th>Code</th>
                <th>Icon</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {#each Object.entries(codeData) as [code, info]}
                <tr>
                    <td>{code}</td>
                    <td
                        ><img
                            src={`/weather-icons/${info.icon}`}
                            alt={info.description}
                            width="32"
                            height="32"
                        /></td
                    >
                    <td>{info.description}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    table {
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid #ccc;
        padding: 0.5rem;
    }
</style>
