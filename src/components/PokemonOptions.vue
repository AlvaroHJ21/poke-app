<template>
    <div class="options-container">
        <ul>
            <li
                v-for="pokemon in pokemonArr"
                :key="pokemon.id"
                @click="$emit('selection', pokemon.id)"
            >
                <span>{{ pokemon.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        pokemonArr: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
/* Pokemon Options */
ul {
    list-style-type: none;
    padding: 0;
}
li {
    background-color: var(--green);
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
}

li:hover {
    background-color: var(--green-hover);
}

.options-container {
    display: flex;
    justify-content: center;
}
</style>
