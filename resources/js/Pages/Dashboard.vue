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

    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <main>
            <div class="header">
                <div class="left">
                    <h1>Hi! Nice to meet you</h1>
                </div>
                <a href="https://christianjaycuevas.tech/storage/files/My%20Resume.pdf" class="report">
                    <i class='bx bx-cloud-download'></i>
                    <span>Download Resume / CV</span>
                </a>
            </div>

            <!-- Insights -->
            <ul class="insights">
                <li>
                    <span class="info">
                        <img class="myprofile" src="/storage/images/My Profile -.jpg">
                        <h3>
                            Christian Jay Cuevas
                        </h3>
                        <p>4th year Computer Engineering Student</p>
                    </span>
                </li>
                <li>
                    <span class="info">
                        <i class='bx bx-user'></i>
                        <h3>
                            Introduction
                        </h3>
                    </span>
                    <p>I am Christian Jay Cuevas, you can just call me Jay. I am a computer engineering student
                        with
                        a passion for web development, and <strong>my main stack is Laravel (Back-End) and VueJS
                            (Front-End) </strong>. I am also
                        an avid novel reader (xianxia in particular) and a fan of anime. I also listen to a wide variety
                        of music genres. I also play a lot of games,
                        and own nintendo switch, psp, and ds.
                        <br><br>
                        My greatest strength is my <strong>adaptability</strong> and <strong>ability to learn new
                            things</strong>. I am also a team player, always willing to
                        collaborate with my team members to achieve our goals. My ultimate goal in life is to achieve
                        the calm and peace in any situation
                        I face.
                    </p>
                    <!-- <p>><strong> Front-End Web Development</strong> (VueJS, HTML, CSS)</p>
                    <p>><strong> Back-End Web Development</strong> (Laravel, PHP, MySQL)</p>
                    <p>><strong> Mobile App Development</strong> (JS, React Native, MySQL)</p>
                    <p>><strong> Networking and Security</strong> (Routing & Switching, Troubleshooting)</p>
                    <p>><strong> Web DevOps</strong> (CI/CD Pipeline using workflow, Git, LEMP Stack deployment)</p>
                    <p>><strong> Machine & Deep Learning</strong> (Python, Data Preprocessing, Model Training, Computer Vision)</p> -->
                </li>
                <li>
                    <span class="info">
                        <i class='bx bx-group'></i>
                        <h3>
                            Soft Skills
                        </h3>
                    </span>
                    <p>><strong> Communication Skills</strong></p>
                    <p>><strong> Problem-Solving</strong></p>
                    <p>><strong> Time Management</strong></p>
                    <p>><strong> Team Player</strong></p>
                    <p>><strong> Adaptability</strong></p>
                    <p>><strong> Critical Thinking</strong></p>
                    <p>><strong> Fast Learner</strong></p>
                    <p>><strong> Attention to Detail</strong></p>
                </li>
            </ul>
            <!-- End of Insights -->

            <div class="bottom-data">
                <div class="orders">
                    <div class="header">
                        <i class='bx bx-receipt'></i>
                        <h3>Certificates & Awards</h3>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date of award</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img src="/storage/images/DOST.png">
                                    <p>DOST RA 7687 Scholarship</p>
                                </td>
                                <td>09-31-2021</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="/storage/images/TIP.png">
                                    <p>President's Lister</p>
                                </td>
                                <td>12-15-2022</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="/storage/images/TIP.png">
                                    <p>President's Lister</p>
                                </td>
                                <td>2-16-2023</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="/storage/images/TIP.png">
                                    <p>VPAA Lister</p>
                                </td>
                                <td>8-14-2023</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="/storage/images/TIP.png">
                                    <p>President's Lister</p>
                                </td>
                                <td>3-20-2024</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="/storage/images/cisco logo.png">
                                    <p>Cisco Netriders Bronze</p>
                                </td>
                                <td>3-26-2024</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="/storage/images/TIP.png">
                                    <p>VPAA Lister</p>
                                </td>
                                <td>6-5-2024</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="/storage/images/TIP.png">
                                    <p>VPAA Lister</p>
                                </td>
                                <td>11-6-2024</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="/storage/images/icpep-logo.png">
                                    <p>CPE Challenge Quiz Bee Participant</p>
                                </td>
                                <td>12-6-2024</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Reminders -->
                <div class="music-recommendations">
                    <div class="header">
                        <i class="bx bx-music"></i>
                        <h3>Music Recommendations</h3>
                    </div>
                    <Swiper :spaceBetween="30" :centeredSlides="true" :autoplay="{
                        delay: 2500,
                        disableOnInteraction: false,}" 
                        :pagination="{clickable: true}" 
                        :navigation="true" 
                        :modules="[Autoplay, Pagination, Navigation]">
                        <SwiperSlide>
                            <div class="music-card">
                                <img class="album-cover" src="/storage/images/TRON.jpg" alt="Shoegazer Album">
                                <div class="music-info">
                                    <h4>Music Genre: Shoegaze</h4>
                                    <h5>Title: Veranda</h5>
                                    <a href="https://www.youtube.com/watch?v=2KucYrac4CQ" target="_blank">Watch Music
                                        Video</a>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="music-card">
                                <img class="album-cover" src="/storage/images/Natsuno Yoruno Machi.jpg"
                                    alt="JPOP Album">
                                <div class="music-info">
                                    <h4>Music Genre: JPOP</h4>
                                    <h5>Title: Natsuno Yoruno Machi</h5>
                                    <a href="https://youtu.be/OkC_7Coj3Rw" target="_blank">Watch Music Video</a>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="music-card">
                                <img class="album-cover" src="/storage/images/One good reason.jpg" alt="Metal Album">
                                <div class="music-info">
                                    <h4>Music Genre: Metal</h4>
                                    <h5>Title: Shapeshifter</h5>
                                    <a href="https://youtu.be/kRrOq4NipQQ" target="_blank">Watch Music Video</a>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </main>
        <!--Comment-->
    </AuthenticatedLayout>
</template>
<style>
.album-cover {
    width: 500px;
    height: 400px;
    border-radius: 16px;

}

.music-recommendations {
    flex-grow: 1;
    flex-basis: 200px;
    box-shadow: var(--box-shadow);
}

.music-recommendations:hover {
    transition: 0.3s ease;
    box-shadow: none;
    cursor: pointer;
}

.music-card h3 {

    font-size: 18px;
    font-weight: bold;
}


.music-card h4 {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
}

.music-card p {
    margin-bottom: 10px;
    font-size: 16px;
    color: #555;
}

.music-card a {
    text-decoration: none;
    color: #1e88e5;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}

.music-card a:hover {
    text-decoration: underline;
}

.swiper {
    width: 100%;
    height: 90%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;


    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
}



::v-deep(.swiper-pagination) {
    pointer-events: all !important;
}
</style>