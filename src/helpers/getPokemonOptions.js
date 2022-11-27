import pokemonApi from '../api/pokemonApi';

export const getRandom = (min = 0, max = 10) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const getRandomArray = (items, min = 0, max = 10) => {
    const pokemonsArr = [];
    let cont = 0;
    if (items < max)
        while (cont < items) {
            const num = getRandom(min, max);
            if (!pokemonsArr.includes(num)) {
                pokemonsArr.push(num);
                cont++;
            }
        }
    return pokemonsArr;
};

const getPokemonsName = async (pokemons = []) => {
    const resp = await Promise.all(
        pokemons.map((pok) => {
            return pokemonApi.get(`/${pok}`);
        })
    );

    return resp.map(({ data }) => ({
        id: data.id,
        name: data.name,
    }));
};

const getPokemonOptions = async () => {
    const pokemonOptions = await getPokemonsName(getRandomArray(4, 1, 650));
    return pokemonOptions;
};

export default getPokemonOptions;
