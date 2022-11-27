<template>
    <div class="pokemon-container">
        <img :class="imgClass" :src="imgSrc" alt="pokemon" />
    </div>
</template>

<script>
export default {
    props: {
        pokemonId: {
            type: Number,
            required: true,
        },
        showPokemon: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    computed: {
        imgClass() {
            return this.showPokemon ? 'fade-in' : 'hidden-pokemon';
        },
        imgSrc() {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`;
        },
    },
};
</script>

<style scoped>
/* Pokemon Picture */
.pokemon-container {
    width: 100%;
    position: relative;
    margin: 5rem 0;
    display: flex;
    align-items: center;
    z-index: 999;
}
img {
    max-width: 20rem;
    width: 100%;
    left: 0;
    right: 0;
    margin: auto;
    cursor: pointer;
    transition: transform .3s ease;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}

img:hover {
    transform: scale(1.2);
}
.hidden-pokemon {
    filter: brightness(0);
}
</style>
