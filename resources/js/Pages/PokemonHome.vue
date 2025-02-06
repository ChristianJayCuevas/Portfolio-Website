<script setup>
import PokemonLayout from '@/Layouts/PokemonLayout.vue';
import { ref, computed, onMounted } from 'vue';
import { Link } from '@inertiajs/vue3'
const allPokemons = ref([]);
const currentPage = ref(1);
const pokemonsPerPage = 12;
const MAX_POKEMON = 151;
const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC"
};

const fetchPokemons = async () => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`);
        const data = await response.json();

        const pokemonDetails = await Promise.all(
            data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                const details = await res.json();
                return {
                    name: pokemon.name,
                    id: details.id,
                    image: details.sprites.other["official-artwork"].front_default,
                    types: details.types.map(t => t.type.name),
                    height: details.height,
                    weight: details.weight
                };
            })
        );

        allPokemons.value = pokemonDetails;
    } catch (error) {
        console.error("Error fetching Pokemon:", error);
    }
};

onMounted(fetchPokemons);

const paginatedPokemons = computed(() => {
    const start = (currentPage.value - 1) * pokemonsPerPage;
    return allPokemons.value.slice(start, start + pokemonsPerPage);
});

const totalPages = computed(() => Math.ceil(allPokemons.value.length / pokemonsPerPage));

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};
</script>

<template>
    <PokemonLayout>

        <div class="pokemon-card">
            <div v-for="pokemon in paginatedPokemons" :key="pokemon.id" :style="{ borderColor: typeColors[pokemon.types[0]] || '#ccc' }">
                <a :href="`/pokemon/${pokemon.id}`">
                <div class="pokemon-type-bg" :style="{ backgroundColor: typeColors[pokemon.types[0]] || '#ccc' }" @click="selectPokemon(pokemon)"></div>

                <div class="pokemon-image">
                    <img :src="pokemon.image" :alt="pokemon.name" />
                </div>
                
                <div class="pokemon-number">
                    <div v-if="pokemon.id < 10">#00{{ pokemon.id }}</div>
                    <div v-else-if="pokemon.id < 100">#0{{ pokemon.id }}</div>
                    <div v-else>#{{ pokemon.id }}</div>
                </div>
                <div class="pokemon-name">{{ pokemon.name }}</div>
                <div class="pokemon-type-container">
                    <div class="pokemon-type-icons">
                        <div v-for="(type, index) in pokemon.types" :key="index" class="pokemon-type" :style="{ backgroundColor: typeColors[type] }">
                            <img :src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${type}.svg`" :alt="type" class="pokemon-type-icon" />
                        </div>
                    </div>
                </div>
            </a>
            </div>
        </div>
        <div class="pagination-controls">
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
    </PokemonLayout>
</template>

<style scoped>
.pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
}
.pagination-controls button {
    padding: 5px 10px;
    background-color: #f8d030;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
}
.pagination-controls button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>
