<template>
    <div>
        <Navbar :points="points" :lifes="lifes" />
        <h1 v-if="!pokemon">Espere porfavor...</h1>
        <div v-else>
            <h1>¿Quién es este pokemón?</h1>
            <PokemonPicture :pokemonId="pokemonId" :showPokemon="showPokemon" />
            <!-- <PokemonOptions :pokemonArr="pokemonArr" @selection="checkAnswer($event)" /> -->
            <PokemonOptions
                v-if="!showAnswer && !end"
                :pokemonArr="pokemonArr"
                @selection="checkAnswer"
            />
            <div v-if="showAnswer" class="answer fade-in">
                <h2>
                    {{ message }} <span>{{ pokemon.name }}</span>
                </h2>
                <button @click="next" class="button-primary">Siguiente</button>
            </div>
            <div v-if="end" class="answer fade-in">
                <h2>
                    {{ message }} <span>{{ pokemon.name }}</span>
                </h2>
                <h2>
                    Fin del juego, <span>{{ points }}</span> puntos
                </h2>
                <button @click="newGame" class="button-primary">Nuevo Juego</button>
            </div>

            <progress class="progress" :value="time" :max="timeMax"></progress>
        </div>
    </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '@/components/PokemonPicture.vue';
import Navbar from '@/components/Navbar.vue';

import getPokemonOptions, { getRandom } from '@/helpers/getPokemonOptions';

getPokemonOptions();

export default {
    components: {
        PokemonOptions,
        PokemonPicture,
        Navbar,
    },
    data() {
        return {
            pokemonId: 1,
            showPokemon: false,
            pokemonArr: [],
            pokemon: null,
            showAnswer: false,
            message: '',
            points: 0,
            lifes: 3,

            time: 0,
            timeMax: 200,
            stop: true,

            end: false,
        };
    },
    methods: {
        onClickChange() {
            this.showPokemon = !this.showPokemon;
        },

        async mixPokemonArray() {
            this.pokemonArr = await getPokemonOptions();
            this.pokemon = this.pokemonArr[getRandom(0, this.pokemonArr.length - 1)];
            this.pokemonId = this.pokemon.id;
        },

        checkAnswer(pokemonId) {
            this.showPokemon = true;
            this.showAnswer = true;
            this.stop = true;
            if (pokemonId === this.pokemonId) {
                this.message = 'Correcto! , es ';
                this.points += 1;
            } else {
                console.log('Incorrecto');
                this.message = 'Incorrecto! :c, es ';
                this.decreaseLife();
            }
        },

        decreaseLife() {
            this.lifes -= 1;
            if (this.lifes === 0) {
                this.showAnswer = false;
                this.end = true;
            }
        },

        newGame() {
            this.pokemonArr = [];
            this.pokemon = null;
            this.showPokemon = false;
            this.showAnswer = false;
            this.end = false;

            this.stop = false;
            this.time = 0;
            this.points = 0;
            this.lifes = 3;
            this.mixPokemonArray();
            this.initTime();
        },

        next() {
            this.pokemonArr = [];
            this.pokemon = null;
            this.showPokemon = false;
            this.showAnswer = false;
            this.mixPokemonArray();
            this.initTime();
        },

        async initTime() {
            const TIME = 20;
            this.stop = false;
            const progress = (i) => {
                // decremento el valor de i al minimo
                if (this.stop) return;

                if (i > this.timeMax) {
                    this.showPokemon = true;
                    this.showAnswer = true;
                    this.message = 'Tiempo excedido! :c, es ';
                    this.decreaseLife();
                    return;
                }
                // actualizo
                this.time = i;

                setTimeout(() => progress(i + 1), TIME);
            };

            progress(0);
        },
    },
    mounted() {
        console.log('mounted');
        this.mixPokemonArray();
        this.initTime();
    },
};
</script>

<style scoped>
.navbar {
    background-color: var(--dark);
    height: 64px;
}

.icon {
    color: #fff;
}
.answer {
    background-color: var(--dark);
    padding: 2rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 40rem;
    width: 100%;
    margin: auto;
}
.answer span {
    color: var(--green);
    text-transform: uppercase;
}
.answer button {
    margin-top: 2rem;
}
.progress {
    height: 2rem;
    max-width: 40rem;
    width: 100%;
    border: 1px solid var(--dark);
    border-radius: 10px;
    margin-top: 2rem;
}
.progress::-webkit-progress-bar {
    background: transparent;
}
.progress::-webkit-progress-value {
    background: var(--dark);
    border-radius: 10px;
}
</style>
