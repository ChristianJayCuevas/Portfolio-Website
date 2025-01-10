<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Contact" />

    <AuthenticatedLayout>
        <main>
            <div class="header">
                <div class="left">
                    <h1>Hi! Welcome to my Contact</h1>
                </div>

            </div>
        </main>
    </AuthenticatedLayout>
</template>