<script setup>
import { ref, watch } from 'vue';
import { inject } from 'vue';
import QubeAnalyticsLayout from '@/Layouts/QubeAnalyticsLayout.vue';
import { Head } from '@inertiajs/vue3';
import VueApexCharts from 'vue3-apexcharts';
</script>

<template>
    <Head title="Dashboard" />
    <QubeAnalyticsLayout>
        <template #default="{ mainContentClasses }">
            <div :class="['flex-1 py-4 px-2 transition-all duration-300', mainContentClasses]">
                <div class="mx-auto px-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div :class="[
                            'p-4 shadow rounded-lg transition-all duration-300',
                            'bg-gray-700 text-gray-200',
                        ]">
                            <h3 class="text-lg font-semibold">Online Lockers</h3>
                            <p>0.0 &nbsp;₱</p>
                        </div>

                        <div :class="[
                            'p-4 shadow rounded-lg transition-all duration-300',
                            'bg-gray-700 text-gray-200',
                        ]">
                            <h3 class="text-lg font-semibold">Offline Lockers</h3>
                            <p>0.0 &nbsp;₱</p>
                        </div>
                        <div :class="[
                            'p-4 shadow rounded-lg transition-all duration-300',
                            'bg-gray-700 text-gray-200',
                        ]">
                            <h3 class="text-lg font-semibold">Total Lockers</h3>
                            <p>0.0 &nbsp;₱</p>
                        </div>
                        <div :class="[
                            'p-4 shadow rounded-lg transition-all duration-300',
                            'bg-gray-700 text-gray-200',
                        ]">
                            <h3 class="text-lg font-semibold">Issues Reported</h3>
                            <p>0.0 &nbsp;₱</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </QubeAnalyticsLayout>
</template>