import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { Swiper, SwiperSlide } from 'swiper/vue';
import VueAudioPlayer from '@liripeng/vue-audio-player';
// Fixed import path for ExcelViewer

const appName = 'CJay';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(VueAudioPlayer);

        // Register global components
        app.component('Swiper', Swiper);
        app.component('SwiperSlide', SwiperSlide);

        return app.mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
