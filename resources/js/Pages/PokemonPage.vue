<script setup>
import { ref, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';  // Import usePage from Inertia
import PokemonLayout from '@/Layouts/PokemonLayout.vue';

const { props } = usePage();  // Access the page props
const pokemon = ref(null);
const errorMessage = ref('');  // To store error messages
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
// Store selected image type (normal, shiny, gif)
const imageType = ref('normal');  // Default is normal image

// Fetch Pokémon data from PokeAPI
const fetchPokemonData = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }

    const data = await response.json();

    // Constructing a high-res URL for the shiny and gif images
    const baseGifUrl = data.sprites.versions['generation-v']['black-white'].animated.front_default;
    const highResGifUrl = baseGifUrl + '?w=1080&q=75';  // Add optimization parameters to URL

    pokemon.value = {
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default, // Normal image
      shinyImage: data.sprites.other['official-artwork'].front_shiny, // Shiny image
      gifImage: highResGifUrl, // Optimized gif URL
      stats: data.stats.map(stat => ({
        name: capitalizeFirstLetter(stat.stat.name),  // Capitalize the stat names
        base_stat: stat.base_stat
      })),
      types: data.types.map(type => capitalizeFirstLetter(type.type.name)),  
    };
  } catch (error) {
    errorMessage.value = error.message || 'Error fetching Pokemon data';
    console.error("Error fetching Pokemon data:", error);
  }
};

// Get the Pokemon ID from the page props and fetch the data
onMounted(() => {
  const pokemonId = props.pokemonId;  // Access the passed pokemonId from props
  fetchPokemonData(pokemonId);
});
</script>

<template>
  <PokemonLayout>
    <div v-if="pokemon" class="pokemon-container">
      <!-- Pokemon Image Section with radio buttons to toggle image type -->
      <div class="pokemon-img">
        <img :src="imageType === 'normal' ? pokemon.image : imageType === 'shiny' ? pokemon.shinyImage : pokemon.gifImage" 
             :alt="pokemon.name" 
             :class="{'gif-image': imageType === 'gif'}" /> <!-- Add class for GIF images -->
        <div class="image-options">
          <label>
            <input type="radio" value="normal" v-model="imageType" /> Normal
          </label>
          <label>
            <input type="radio" value="shiny" v-model="imageType" /> Shiny
          </label>
          <label>
            <input type="radio" value="gif" v-model="imageType" /> Gif
          </label>
        </div>
      </div>

      <!-- Pokemon Card Info Section -->
      <div class="pokemon-card-specific">
        <h1>{{ pokemon.name.toUpperCase() }}</h1>
        <div class="pokemon-types">
          <h3>Types:</h3>
          <ul>
            <li v-for="type in pokemon.types" :key="type">{{ type }}</li> <!-- Types are already capitalized -->
          </ul>
        </div>

        <div class="pokemon-stats">
          <h3>Stats:</h3>
          <ul>
            <li v-for="stat in pokemon.stats" :key="stat.name">
              {{ stat.name }}: {{ stat.base_stat }} <!-- Stats are already capitalized -->
            </li>
          </ul>
        </div>
      </div>
    </div>


    <div v-else>
      <p>{{ errorMessage }}</p> <!-- Show error message if there's an issue fetching data -->
    </div>
  </PokemonLayout>
</template>

<style scoped>
.pokemon-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.pokemon-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 20rem;
  margin-left: 60px;
  border-radius: 1rem;
  margin-top: 6rem;
  box-shadow: 6px 6px 0 0 rgba(132, 136, 132, 0.3);
}

.pokemon-card-specific {
  text-align: center;
  border: 1px solid #ddd;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  min-width: 20rem;
  margin-top: 6rem;
  margin-right: 100px;
  box-shadow: 6px 6px 0 0 rgba(132, 136, 132, 0.3);
}

.pokemon-types {
  margin-top: 20px;
  text-align: left;
}

.pokemon-stats {
  margin-top: 20px;
  text-align: left;
  list-style: none;
  padding-left: 0;
}

.pokemon-stats li {
  margin-bottom: 10px;
}

/* Styles for the radio button options */
.image-options {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.image-options label {
  cursor: pointer;
}

/* Large gif image with object-fit to maintain sharpness */
.gif-image {
  width: 300px; /* Adjust size */
  height: 300px;
  object-fit: contain;  /* Ensures GIF fits the container without being stretched or cropped */
  max-width: 100%;      /* Ensures it does not exceed its container */
  max-height: 100%;     /* Same as above, prevents overflow */
}
</style>
