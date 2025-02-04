<script setup>
import PokemonLayout from '@/Layouts/PokemonLayout.vue';
import { ref, onMounted } from 'vue';

const allPokemons = ref([]);
const MAX_POKEMON = 151;
const fetchPokemons = async () => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`);

        const data = await response.json();
        allPokemons.value = data.results;

    } catch (error) {
        console.error("Error fetching Pokemon:", error);
    }
}

onMounted(
    fetchPokemons
)
</script>

<template>
    <PokemonLayout>
        <div class="pokemon-card">
            <div v-for="pokemon in allPokemons" :key="pokemon.name">
              
                <div class="pokemon-image">
                    <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`"
                        :alt="pokemon.name" />
                </div>
                <div class="pokemon-number">
                    #{{ pokemon.url.split('/')[6] }}
                </div>
                <div class="pokemon-name">
                    {{ pokemon.name }}
                </div>
            </div>
        </div>
    </PokemonLayout>
</template>