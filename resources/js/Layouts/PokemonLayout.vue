<script setup>
    import "../../css/pokemon.css"
    import {Link} from '@inertiajs/vue3';
    import {computed} from 'vue';
    const currentPath = computed(() => window.location.pathname);
</script>

<template>
    <div class="container">
        <aside class="visible">
            <div class="logo">
                <img src="/storage/images/pokemon-23.svg" alt="Pokemon Logo">
            </div>
            <div class="sidebar">
                <Link :class="{ 'active-top': currentPath === '/pokemon' }" href="/pokemon">
                    <img src="/storage/images/ball.png" class="ball" />
                    <h3>Pokemon Home</h3>
                </Link>
            </div>
        </aside>
        <main>
            <slot />
        </main>
    </div>
</template>