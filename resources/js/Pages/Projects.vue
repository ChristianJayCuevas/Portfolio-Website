<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import '../../css/main.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <AuthenticatedLayout>
        <main>
            <div class="header">
                <div class="left">
                    <h1>Here are my projects :)</h1>
                </div>
            </div>

            <div class="bottom-data">
                <div class="music-recommendations project1">
                    <div class="header">
                        <i class="bx bx-folder"></i>
                        <h3>
                            StraySafe Web App
                            <a href="https://www.straysafe.me" style=" text-decoration: underline;">
                            (straysafe.me)
                            </a>
                        </h3>
                    </div>
                    <Swiper :spaceBetween="30" :centeredSlides="true" :autoplay="{
                        delay: 2500,
                        disableOnInteraction: false,
                    }" :pagination="{ clickable: true }" :navigation="true"
                        :modules="[Autoplay, Pagination, Navigation]">
                        <SwiperSlide>
                            <div class="music-card">
                                <img class="project-cover" src="/storage/images/Straysafe1.png">
                         
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="music-card">
                                <img class="project-cover" src="/storage/images/Straysafe2.png">
                        
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="music-card">
                                <img class="project-cover" src="/storage/images/Straysafe3.png">
                          
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div class="music-card">
                                <img class="project-cover" src="/storage/images/Straysafe4.png">
                          
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div class="bottom-data">
                <div class="music-recommendations">
                    <div class="header">
                        <i class="bx bx-folder"></i>
                        <h3>
                            StraySafe Mobile App
                        </h3>
                    </div>
                    <Swiper :spaceBetween="30" :centeredSlides="true" :autoplay="{
                        delay: 2500,
                        disableOnInteraction: false,
                    }" :pagination="{ clickable: true }" :navigation="true"
                        :modules="[Autoplay, Pagination, Navigation]">
                        <SwiperSlide>
                            <div class="music-card justify-center">
                                <img class="project-cover1" src="/storage/images/Mobile1.png">
                         
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="music-card">
                                <img class="project-cover1" src="/storage/images/Mobile2.png">
                        
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="music-card">
                                <img class="project-cover1" src="/storage/images/Mobile3e.png">
                          
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div class="music-card">
                                <img class="project-cover1" src="/storage/images/Mobile4.png">
                          
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="music-card">
                                <img class="project-cover1" src="/storage/images/Mobile5.png">
                          
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </main>

    </AuthenticatedLayout>

</template>

<style scoped>
.project-cover {
    width: 100%;
    height: 100%;
    border-radius: 16px;
}

.project-cover1 {
    width: 400px;
    height: 800px;
    border-radius: 16px;
}

</style>