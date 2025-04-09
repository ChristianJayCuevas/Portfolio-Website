<script setup>
import { ref, computed, onMounted, provide } from 'vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import '@fortawesome/fontawesome-free/css/all.css';

import { Link } from '@inertiajs/vue3';
const isSidebarOpen = ref(false);
const isMobileView = ref(false);
const isHamburgerOpen = ref(false);

function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
    if (isMobileView.value) {
        isHamburgerOpen.value = false;
    }
}

function toggleHamburger() {
    isHamburgerOpen.value = !isHamburgerOpen.value;
    if (isHamburgerOpen.value) {
        isSidebarOpen.value = true;
    } else {
        isSidebarOpen.value = false;
    }
}

const mainContentClasses = computed(() => {
    if (isMobileView.value) {
        return 'ml-0';
    }
    return isSidebarOpen.value ? 'ml-52' : 'ml-20';
});

const navClasses = computed(() => {
    return isSidebarOpen.value ? 'ml-60' : 'ml-20';
});

const showingNavigationDropdown = ref(false);

function checkMobileView() {
    isMobileView.value = window.innerWidth < 500;
    if (isMobileView.value) {
        isSidebarOpen.value = false;
    }
}

onMounted(() => {
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
});

</script>

<template>
    <div class="dark">
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav class="bg-gray-100 dark:bg-gray-800">
                <div class="flex h-16 justify-between items-center px-6">
                    <div class="flex items-center sm:hidden">
                        <button @click="toggleHamburger" class="text-gray-800 dark:text-gray-200 focus:outline-none">
                            <i :class="isHamburgerOpen ? 'fas fa-times fa-2x' : 'fas fa-bars fa-2x'"></i>
                        </button>
                    </div>
                    <div :class="{
                        'mt-4': true,
                        'ml-[210px]': isSidebarOpen && !isMobileView,
                        'ml-[80px]': !isSidebarOpen && !isMobileView,
                        'text-3xl font-bold': true,
                        'transition-all duration-300': true,
                        'flex justify-center items-center': isMobileView,
                        'flex justify-start items-center': !isMobileView
                    }" class="flex-grow">
                        <span class="text-gray-800 dark:text-gray-200">Dashboard</span>
                    </div>
                    <div class="flex items-center">
                    </div>
                </div>
                <transition name="fade">
                    <div v-if="!isMobileView || isSidebarOpen" class="mx-auto px-4">
                        <div class="flex">
                            <div :class="{
                                'sidebar': true,
                                'sidebar-expanded': isSidebarOpen,
                                'sidebar-collapsed': !isSidebarOpen,
                                'absolute inset-0': isMobileView && isSidebarOpen,
                            }" class="bg-[#38a3a5] text-white p-4 fixed top-0 left-0 mt-4 ml-4 mb-8 rounded-lg shadow-lg z-20"
                                style="height: calc(100vh - 2rem);">
                                <button @click="toggleSidebar" class="p-1">
                                    <i
                                        :class="isSidebarOpen ? 'fas fa-arrow-circle-left fa-2x' : 'fas fa-arrow-circle-right fa-2x'"></i>
                                </button>
                                <div class="mt-4">
                                    <Link :href="route('dashboard')">
                                    <div
                                        class="flex items-center mb-4 cursor-pointer hover:bg-[#2b8b8e] rounded transition-colors duration-200">
                                        <div class="mx-[6px] my-1">
                                            <i class="fas fa-home fa-lg"></i>
                                        </div>
                                        <span :class="{ 'sidebar-text': true, 'opacity-0': !isSidebarOpen }"
                                            class="ml-3 whitespace-nowrap font-bold">Dashboard</span>
                                    </div>
                                    </Link>
                                    <div
                                        class="flex items-center mb-4 cursor-pointer hover:bg-[#2b8b8e] rounded transition-colors duration-200">
                                        <div class="mx-[8px] my-1">
                                            <i class="fas fa-user fa-lg"></i>
                                        </div>
                                        <span :class="{ 'sidebar-text': true, 'opacity-0': !isSidebarOpen }"
                                            class="ml-3 whitespace-nowrap font-bold">Profile</span>
                                    </div>
                                    <div
                                        class="flex items-center mb-4 cursor-pointer hover:bg-[#2b8b8e] rounded transition-colors duration-200">
                                        <div class="mx-[8px] my-1">
                                            <i class="fas fa-cog fa-lg"></i>
                                        </div>
                                        <span :class="{ 'sidebar-text': true, 'opacity-0': !isSidebarOpen }"
                                            class="ml-3 whitespace-nowrap font-bold">Settings</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- ... existing code ... -->

                    </div>
                </transition>
            </nav>

            <!-- Page Heading -->
            <header class="bg-white shadow" v-if="$slots.header">
                <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <!-- Page Content -->
            <main>
                <div class="dark">
                    <slot :mainContentClasses="mainContentClasses" />
                </div>
            </main>
        </div>
    </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}

.transition-all {
    transition: all 0.3s ease-in-out;
}

.dark .bg-gray-100 {
    background-color: #1a202c;
    /* Dark mode background */
}

.dark .text-gray-800 {
    color: #e2e8f0;
    /* Dark mode text */
}

.dark .bg-white {
    background-color: #2d3748;
    /* Dark mode dropdown */
}

.sidebar {
    transition: width 0.3s ease-in-out;
    width: 4rem;
    /* 80px - collapsed state */
    overflow: hidden;
}

.sidebar-expanded {
    width: 12rem;
    /* 256px - expanded state */
}

.sidebar-collapsed {
    width: 4rem;
    /* 80px */
}

.sidebar-text {
    transition: opacity 0.1s ease-in-out;
    transition-delay: 0.2s;
    opacity: 1;
    position: absolute;
    left: 3.5rem;
}

.sidebar-text.opacity-0 {
    transition: opacity 0.1s ease-in-out;
    transition-delay: 0s;
}
</style>
