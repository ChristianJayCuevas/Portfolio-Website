<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import QubeAnalyticsLayout from '@/Layouts/QubeAnalyticsLayout.vue';
import { Head } from '@inertiajs/vue3';
import VueApexCharts from 'vue3-apexcharts';
import 'leaflet/dist/leaflet.css';

const excelData = ref([])
const coordinatesData = ref([])
const loadingExcel = ref(false)
const errorExcel = ref(null)
const lockerName = ref([])
const fetchExcelData = async () => {
    loadingExcel.value = true
    errorExcel.value = null
    try {
        const driveId = 'b!wRgxpfUxs0eTO7ZFetM47BwjiJLMDvxEpeK5kwGlyM5zdktMuXf-S4aVkY7s6KVY'
        const itemId = '01ZO6DC2GKUL6Q2RGPVBHKZLTGEYUKTX7G'
        const sheet = 'DOWNTIME DASHBOARD'
        const coordinates = 'QUBE CODES'

        const response = await fetch(`/api/excel-data?driveId=${driveId}&itemId=${itemId}&sheet=${encodeURIComponent(sheet)}`)
        const response2 = await fetch(`/api/excel-data?driveId=${driveId}&itemId=${itemId}&sheet=${encodeURIComponent(coordinates)}`)

        const result = await response.json()
        const result2 = await response2.json()

        excelData.value = result.values || []
        coordinatesData.value = result2.values || []

        // ✅ Convert coordinates into locker objects (from C2 to C44 and D2 to D44)
        const newLockers = (coordinatesData.value || [])
            .slice(1, 44)
            .map((row, i) => {
                const lat = parseFloat(row[2]);
                const lng = parseFloat(row[3]);
                return {
                    id: `LK-${1001 + i}`,
                    lat: isNaN(lat) ? null : lat,
                    lng: isNaN(lng) ? null : lng,
                    status: 'online',
                    name: `Locker ${i + 1}`
                };
            })
            .filter(locker => locker.lat !== null && locker.lng !== null);
        
        const lockerName = (coordinatesData.value || [])
        .slice(1, 44)
        .map((row, i) => {
            const lockername = row[0];
            return {
                name: lockername,
            };
        })
        lockerName.value = lockerName.filter(locker => locker.name !== null);

        lockers.value = newLockers;
        if (map && markersLayer) {
            addLockerMarkers(); 
        }


    } catch (err) {
        errorExcel.value = 'Failed to load Excel data'
    } finally {
        loadingExcel.value = false
    }
}

const dailyRevenueOptions = ref({
    chart: {
        type: 'area',
        height: 280,
        toolbar: {
            show: false
        },
        foreColor: '#ccc'
    },
    colors: ['#38a3a5'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 3
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.3,
            stops: [0, 90, 100]
        }
    },
    xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
            style: {
                colors: '#ccc'
            }
        }
    },
    yaxis: {
        labels: {
            style: {
                colors: '#ccc'
            },
            formatter: function (value) {
                return "₱" + value;
            }
        }
    },
    tooltip: {
        theme: 'dark'
    },
    grid: {
        borderColor: '#535A6C',
        xaxis: {
            lines: {
                show: true
            }
        }
    }
});

const dailyRevenueData = ref([{
    name: 'Revenue',
    data: [320, 420, 395, 350, 390, 490, 570]
}]);

const usageDistributionOptions = ref({
    chart: {
        type: 'donut',
        height: 280,
        foreColor: '#ccc'
    },
    colors: ['#38a3a5', '#2b8b8e', '#57cc99', '#80ed99'],
    labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
    legend: {
        position: 'bottom'
    },
    tooltip: {
        theme: 'dark'
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
});

const usageDistributionData = ref([40, 30, 20, 10]);

const lockerStatusOptions = ref({
    chart: {
        type: 'bar',
        height: 280,
        toolbar: {
            show: false
        },
        foreColor: '#ccc'
    },
    colors: ['#38a3a5', '#dc3545'],
    plotOptions: {
        bar: {
            horizontal: true,
            dataLabels: {
                position: 'top',
            },
        }
    },
    dataLabels: {
        enabled: true,
        style: {
            colors: ['#fff']
        }
    },
    stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
    },
    xaxis: {
        categories: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'],
        labels: {
            style: {
                colors: '#ccc'
            }
        }
    },
    yaxis: {
        labels: {
            style: {
                colors: '#ccc'
            }
        }
    },
    tooltip: {
        theme: 'dark'
    },
    grid: {
        borderColor: '#535A6C',
    },
});

const lockerStatusData = ref([
    {
        name: 'Available',
        data: [15, 12, 20, 18, 10]
    },
    {
        name: 'Occupied',
        data: [5, 8, 10, 7, 15]
    }
]);

// Map data
const mapLoaded = ref(false);
const mapContainer = ref(null);
const lockers = ref([]);

let map = null;
let markersLayer = null;

function initMap() {
    import('leaflet').then(async L => {
        if (!map) {
            await nextTick();

            map = L.map('lockerMap', {
                zoomControl: true,
                scrollWheelZoom: true
            }).setView([14.5995, 120.9842], 14); // initial fallback view

            const validCoords = lockers.value
                .filter(locker => typeof locker.lat === 'number' && typeof locker.lng === 'number' && !isNaN(locker.lat) && !isNaN(locker.lng));

            if (validCoords.length > 0) {
                const bounds = L.latLngBounds(validCoords.map(locker => [locker.lat, locker.lng]));
                map.fitBounds(bounds, { padding: [30, 30] });
            } else {
                // fallback
                map.setView([14.5995, 120.9842], 14);
            }

            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 19
            }).addTo(map);

            markersLayer = L.layerGroup().addTo(map);

            addLockerMarkers();

            // Force map to update its size and view
            setTimeout(() => {
                map.invalidateSize(true);
            }, 300);

            // Add resize observer to handle container size changes
            const resizeObserver = new ResizeObserver(() => {
                if (map) map.invalidateSize(true);
            });

            const mapEl = document.getElementById('lockerMap');
            if (mapEl) resizeObserver.observe(mapEl);

            mapLoaded.value = true;

            // Add window resize event listener
            window.addEventListener('resize', () => {
                if (map) map.invalidateSize(true);
            });
        }
    });
}

function addLockerMarkers() {
    if (!map || !markersLayer) return;

    import('leaflet').then(L => {
        markersLayer.clearLayers();

        const onlineIcon = L.divIcon({
            html: `<div class="w-3 h-3 bg-green-500 rounded-full pulse-animation"></div>`,
            className: 'locker-marker-icon',
            iconSize: [12, 12]
        });

        const offlineIcon = L.divIcon({
            html: `<div class="w-3 h-3 bg-red-500 rounded-full pulse-animation"></div>`,
            className: 'locker-marker-icon',
            iconSize: [12, 12]
        });

        lockers.value.forEach(locker => {
            const icon = locker.status === 'online' ? onlineIcon : offlineIcon;
            const marker = L.marker([locker.lat, locker.lng], { icon })
                .bindPopup(`
                    <div class="p-2">
                        <h3 class="font-bold">${locker.name}</h3>
                        <p>ID: ${locker.id}</p>
                        <p>Status: <span class="${locker.status === 'online' ? 'text-green-500' : 'text-red-500'}">${locker.status}</span></p>
                    </div>
                `);
            markersLayer.addLayer(marker);
        });
    });
}
watch(lockers, (newLockers) => {
    if (map && newLockers.length > 0) {
        const validCoords = newLockers.filter(locker =>
            typeof locker.lat === 'number' &&
            typeof locker.lng === 'number' &&
            !isNaN(locker.lat) &&
            !isNaN(locker.lng)
        );

        if (validCoords.length > 0) {
            const bounds = L.latLngBounds(validCoords.map(locker => [locker.lat, locker.lng]));
            map.fitBounds(bounds, { padding: [30, 30] });
        }
    }
});
function updateLockerData(newLockerData) {
    lockers.value = newLockerData;
    if (map && markersLayer) {
        addLockerMarkers();
    }
}

onMounted(() => {
    // Wait a bit longer to ensure DOM is fully rendered
    setTimeout(() => {
        initMap();
    }, 800);

    fetchExcelData();
});

onUnmounted(() => {
    if (map) {
        map.remove();
        map = null;
    }

    // Clean up resize listener
    window.removeEventListener('resize', () => {
        if (map) map.invalidateSize(true);
    });
});
</script>

<template>

    <Head title="Dashboard" />
    <QubeAnalyticsLayout>
        <template #default="{ mainContentClasses }">
            <div :class="['flex-1 py-4 px-2 transition-all duration-300', mainContentClasses]">
                <div class="mx-auto px-4">
                    <!-- Stats cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div class="p-4 shadow rounded-lg bg-gray-700 text-gray-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-lg font-semibold">Online Lockers</h3>
                                    <p class="text-2xl font-bold">{{lockers.filter(l => l.status === 'online').length
                                        }}</p>
                                </div>
                                <div class="text-green-400 bg-green-400/20 p-3 rounded-full">
                                    <i class="fas fa-wifi fa-lg"></i>
                                </div>
                            </div>
                            <p class="text-green-400 mt-2"><i class="fas fa-arrow-up"></i> 12% from last week</p>
                        </div>

                        <div class="p-4 shadow rounded-lg bg-gray-700 text-gray-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-lg font-semibold">Offline Lockers</h3>
                                    <p class="text-2xl font-bold">{{lockers.filter(l => l.status === 'offline').length
                                        }}</p>
                                </div>
                                <div class="text-red-400 bg-red-400/20 p-3 rounded-full">
                                    <i class="fas fa-exclamation-circle fa-lg"></i>
                                </div>
                            </div>
                            <p class="text-red-400 mt-2"><i class="fas fa-arrow-up"></i> 3% from last week</p>
                        </div>

                        <div class="p-4 shadow rounded-lg bg-gray-700 text-gray-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-lg font-semibold">Total Lockers</h3>
                                    <p class="text-2xl font-bold">{{ lockers.length }}</p>
                                </div>
                                <div class="text-blue-400 bg-blue-400/20 p-3 rounded-full">
                                    <i class="fas fa-box fa-lg"></i>
                                </div>
                            </div>
                            <p class="text-blue-400 mt-2"><i class="fas fa-arrow-up"></i> 8% from last month</p>
                        </div>

                        <div class="p-4 shadow rounded-lg bg-gray-700 text-gray-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-lg font-semibold">Issues Reported</h3>
                                    <p class="text-2xl font-bold">17</p>
                                </div>
                                <div class="text-orange-400 bg-orange-400/20 p-3 rounded-full">
                                    <i class="fas fa-flag fa-lg"></i>
                                </div>
                            </div>
                            <p class="text-red-400 mt-2"><i class="fas fa-arrow-up"></i> 5% from last week</p>
                        </div>
                    </div>

                    <!-- Map and Graphs Section -->
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                        <!-- Map Section -->
                        <div class="lg:col-span-1 bg-gray-700 rounded-lg shadow p-4">
                            <div class="mb-4">
                                <h3 class="text-lg font-semibold text-gray-200">Locker Locations</h3>
                            </div>

                            <div class="relative h-[400px] rounded-lg overflow-hidden bg-gray-800">
                                <div v-if="!mapLoaded" class="absolute inset-0 flex items-center justify-center">
                                    <div
                                        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#38a3a5]">
                                    </div>
                                </div>
                                <!-- Real map using Leaflet -->
                                <div id="lockerMap" ref="mapContainer" class="h-full w-full z-10"></div>
                            </div>
                            <div class="mt-4 grid grid-cols-2 gap-2">
                                <div class="flex items-center gap-2 text-gray-200">
                                    <div class="h-3 w-3 bg-green-500 rounded-full"></div>
                                    <span>Online ({{lockers.filter(l => l.status === 'online').length}})</span>
                                </div>
                                <div class="flex items-center gap-2 text-gray-200">
                                    <div class="h-3 w-3 bg-red-500 rounded-full"></div>
                                    <span>Offline ({{lockers.filter(l => l.status === 'offline').length}})</span>
                                </div>
                            </div>
                        </div>

                        <!-- Analytics Graphs -->
                        <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Daily Revenue Chart (Full width of 2 columns) -->
                            <div class="md:col-span-2 bg-gray-700 rounded-lg shadow p-4">
                                <h3 class="text-lg font-semibold text-gray-200 mb-4">Daily Revenue</h3>
                                <VueApexCharts height="430" :options="dailyRevenueOptions" :series="dailyRevenueData">
                                </VueApexCharts>
                            </div>

                            <!-- Usage Distribution Chart -->
                            <!-- <div class="bg-gray-700 rounded-lg shadow p-4">
                                <h3 class="text-lg font-semibold text-gray-200 mb-4">Usage Distribution</h3>
                                <VueApexCharts 
                                    height="440" 
                                    :options="usageDistributionOptions" 
                                    :series="usageDistributionData">
                                </VueApexCharts>
                            </div> -->

                            <!-- Another Chart (Optional) -->
                            <!--
                            <div class="bg-gray-700 rounded-lg shadow p-4">
                                <h3 class="text-lg font-semibold text-gray-200 mb-4">Another Metric</h3>
                                <VueApexCharts 
                                    height="440" 
                                    :options="someOptions" 
                                    :series="someData">
                                </VueApexCharts>
                            </div>
                            -->
                        </div>
                    </div>


                    <!-- Excel Viewer Section -->
                    <div class="bg-gray-700 rounded-lg shadow p-4 mb-6">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-200">Excel Data Viewer</h3>

                            <div class="flex gap-2">
                                <button @click="fetchExcelData"
                                    class="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded shadow">
                                    Refresh Excel Data
                                </button>
                                <a href="/qubedashboard/login"
                                    class="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded shadow">
                                    Connect Microsoft Account
                                </a>
                            </div>
                        </div>

                        <div v-if="loadingExcel" class="text-white">Loading...</div>
                        <div v-if="errorExcel" class="text-red-400">{{ errorExcel }}</div>
                        <div v-if="excelData.length" class="overflow-x-auto">
                            <table class="min-w-full bg-gray-800 text-gray-200 rounded-lg overflow-hidden">
                                <tbody>
                                    <tr v-for="(row, rowIndex) in excelData" :key="rowIndex">
                                        <td v-for="(cell, colIndex) in row" :key="colIndex"
                                            class="py-2 px-4 border border-gray-700">
                                            {{ cell }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Recent Activities Section -->
                    <div class="bg-gray-700 rounded-lg shadow p-4 mb-6">
                        <h3 class="text-lg font-semibold text-gray-200 mb-4">Recent Activities</h3>
                        <div class="overflow-x-auto">
                            <table class="min-w-full bg-gray-800 text-gray-200 rounded-lg overflow-hidden">
                                <thead>
                                    <tr>
                                        <th class="py-3 px-4 text-left">Locker ID</th>
                                        <th class="py-3 px-4 text-left">Action</th>
                                        <th class="py-3 px-4 text-left">User</th>
                                        <th class="py-3 px-4 text-left">Time</th>
                                        <th class="py-3 px-4 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-t border-gray-700">
                                        <td class="py-3 px-4">LK-1023</td>
                                        <td class="py-3 px-4">Deposit</td>
                                        <td class="py-3 px-4">John Doe</td>
                                        <td class="py-3 px-4">Today, 2:30 PM</td>
                                        <td class="py-3 px-4"><span
                                                class="bg-green-500/20 text-green-500 py-1 px-2 rounded">Completed</span>
                                        </td>
                                    </tr>
                                    <tr class="border-t border-gray-700">
                                        <td class="py-3 px-4">LK-1024</td>
                                        <td class="py-3 px-4">Withdrawal</td>
                                        <td class="py-3 px-4">Jane Smith</td>
                                        <td class="py-3 px-4">Today, 1:45 PM</td>
                                        <td class="py-3 px-4"><span
                                                class="bg-green-500/20 text-green-500 py-1 px-2 rounded">Completed</span>
                                        </td>
                                    </tr>
                                    <tr class="border-t border-gray-700">
                                        <td class="py-3 px-4">LK-1019</td>
                                        <td class="py-3 px-4">Maintenance</td>
                                        <td class="py-3 px-4">Tech Support</td>
                                        <td class="py-3 px-4">Today, 11:20 AM</td>
                                        <td class="py-3 px-4"><span
                                                class="bg-yellow-500/20 text-yellow-500 py-1 px-2 rounded">In
                                                Progress</span></td>
                                    </tr>
                                    <tr class="border-t border-gray-700">
                                        <td class="py-3 px-4">LK-1022</td>
                                        <td class="py-3 px-4">Issue Report</td>
                                        <td class="py-3 px-4">Mike Johnson</td>
                                        <td class="py-3 px-4">Today, 10:05 AM</td>
                                        <td class="py-3 px-4"><span
                                                class="bg-red-500/20 text-red-500 py-1 px-2 rounded">Pending</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </QubeAnalyticsLayout>
</template>

<style>
.pulse-animation {
    box-shadow: 0 0 0 0 rgba(79, 209, 197, 0.7);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(79, 209, 197, 0.7);
    }

    70% {
        box-shadow: 0 0 0 10px rgba(79, 209, 197, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(79, 209, 197, 0);
    }
}

/* Leaflet map custom styles */
.locker-marker-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
}

.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
    background: #374151;
    color: #e5e7eb;
}

.leaflet-container {
    font-family: inherit;
}

/* Add these map specific styles */
#lockerMap {
    width: 100% !important;
    height: 100% !important;
    background-color: #1f2937;
    z-index: 1;
}

.leaflet-container {
    width: 100% !important;
    height: 100% !important;
    font-family: inherit;
    background-color: transparent;
}

.leaflet-control-container .leaflet-control {
    margin: 10px;
}
</style>