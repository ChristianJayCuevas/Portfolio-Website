<!-- <script setup>
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

    display: flex;
    justify-content: center;
    align-items: center;
}



::v-deep(.swiper-pagination) {
    pointer-events: all !important;
}
</style> -->

<template>

    <body>
        <nav :class="{ open: isMenuOpen }">
            <a href="#" class="logo">
                <i class="bx bx-code-alt"></i>
                <div class="logo-name"><span>C</span>Jay</div>
            </a>
            <ul>
                <li><a href="#main">Home</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#about">Intro</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
            </ul>
            <button @click="openResume">My Resume</button>
            <button id="menuButton" @click="toggleMenu">
                <i class='bx bx-menu'></i>
            </button>
        </nav>

        <div class="main" id="main">
            <div class="left">
                <h5>Hey, I am Jay</h5>
                <h3>I aspire to be a <span>Software Engineer</span> and here is my portfolio</h3>
                <p>
                    Computer Engineering Student | Passionate Web Developer Exploring Laravel & VueJS | Anime & Novel 
                </p>
                <button @click="showGetInTouchPopup">Get In Touch</button>
            </div>
            <div class="right">
                <img src="/storage/images/Profile2.jpg">
            </div>
        </div>

        <div class="skills" id="skills">
            <h5>My Skills</h5>
            <h3>My Expertise</h3>
            <div class="skill-items">
                <div class="item">
                    <div class="icon"><i class='bx bx-code-alt'></i></div>
                    <h4>Web Development</h4>
                    <p>
                        I specialize in web development using Laravel and VueJS. I have experience in building multiple web applications using the stack.
                    </p>
                </div>
                <div class="item">
                    <div class="icon"><i class='bx bx-server'></i></div>
                    <h4>Deployment & Maintenance</h4>
                    <p>
                        I have deployed multiple web applications using Hostinger, and DigitalOcean VPS (LEMP stack). I also have experience in maintaining web applications.
                    </p>
                </div>
                <div class="item">
                    <div class="icon"><i class='bx bxl-figma'></i></div>
                    <h4>UI & UX Design</h4>
                    <p>
                        I have basic knowledge regarding UI & UX design. I have experience in using Figma to create mockups for web applications.
                    </p>
                </div>
                <div class="item">
                    <div class="icon"><i class='bx bx-directions'></i></div>
                    <h4>Agile Framework</h4>
                    <p>
                        I have experienced working in an agile environment. I have worked using the Kanban framework to develop web applications.
                    </p>
                </div>
            </div>
        </div>

        <div class="about" id="about">
            <div class="left">
                <img src="/storage/images/My Profile -.jpg">
            </div>
            <div class="right">
                <h5>Introduction</h5>
                <h3>About Me</h3>
                <p>
                    I am Christian Jay Cuevas, you can just call me Jay. I am a computer engineering student
                        with
                        a passion for web development, and <strong>my main stack is Laravel (Back-End) and VueJS
                            (Front-End) </strong>. I am also
                        an avid novel reader (xianxia in particular) and a fan of anime. I also listen to a wide variety
                        of music genres. I also play a lot of games,
                        and own nintendo switch, psp, and ds.
                </p>
                <p>
                    My greatest strength is my <strong>adaptability</strong> and <strong>ability to learn new
                            things</strong>. I am also a team player, always willing to
                        collaborate with my team members to achieve our goals. My ultimate goal in life is to achieve
                        the calm and peace in any situation
                        I face.
                </p>
            </div>
        </div>

        <div class="portfolio" id="portfolio">
            <div class="header">
                <div class="info">
                    <h5>Recent Projects</h5>
                    <h3>My Portfolio</h3>
                </div>
            </div>

            <div class="portfo-items">
                <div class="item">
                    <img src="/storage/images/Straysafe1.png">
                    <div class="info">
                        <h4>StraySafe </h4>
                        <p>
                            A web application for monitoring and managing stray animals by barangay officials and animal pound staff.
                        </p>
                        <a href="https://straysafe.me">View Website <i class='bx bx-link-external'></i></a>
                    </div>
                </div>
                <div class="item">
                    <img src="/storage/images/retinaai.png">
                    <div class="info">
                        <h4>RetinaAI</h4>
                        <p>
                            A web application for detecting diabetic retinopathy using a machine learning model.
                        </p>
                        <a href="https://retinaai.streamlit.app">View Website <i class='bx bx-link-external'></i></a>
                    </div>
                </div>
                <div class="item">
                    <img src="/storage/images/ArtfulMind.png">
                    <div class="info">
                        <h4>ArtfulMind</h4>
                        <p>
                            A web application where people can draw, color, or make a collage, and share it with the community or a therapist. 
                        </p>
                        <a href="https://youtu.be/Q-gjrSH_LRQ">View in Youtube <i class='bx bx-link-external'></i></a>
                    </div>
                </div>
            </div>

        </div>

        <!-- <div class="feedback" id="feedback">
            <h5>My Recommendations</h5>
            <h3>Personal Favorites</h3>
            <div class="customers">
                <div class="item">
                    <div class="rating">
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                    </div>
                    <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                        elementum
                        tristique. Duis cursus, mi quis viverra.
                    </p>
                               
                    <div class="user">
                        <img src="/storage/images/TRON.jpg">
                        <div class="info">
                            <h4>Music Genre: Shoegaze</h4>
                            <p>Title: Veranda</p>
                            <a href="https://www.youtube.com/watch?v=2KucYrac4CQ" target="_blank">Watch Music
                                Video</a>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="rating">
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                    </div>
                    <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                        elementum
                        tristique. Duis cursus, mi quis viverra.
                    </p>
                    <div class="user">
                        <img src="assets/us-2.jpg">
                        <div class="info">
                            <h5>Kristian Watson</h5>
                            <p>Louis Vuitton</p>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="rating">
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                    </div>
                    <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                        elementum
                        tristique. Duis cursus, mi quis viverra.
                    </p>
                    <div class="user">
                        <img src="assets/us-3.jpg">
                        <div class="info">
                            <h5>Kathryn Murphy</h5>
                            <p>McDonald's</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <footer>
            <div class="top">
                <a href="#" class="logo">
                    <i class="bx bx-code-alt"></i>
                    <div class="logo-name"><span>C</span>Jay</div>
                </a>
                <!-- <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Youtube</a></li>
                    <li><a href="#">Projects</a></li>
                </ul> -->
                <div class="social-links">
                    <a href="https://www.facebook.com/christian.jay.cuevas"><i class='bx bxl-facebook'></i></a>
                    <a href="https://www.instagram.com/ayanon.kiyopon"><i class='bx bxl-instagram'></i></a>
                    <a href="https://github.com/ChristianJayCuevas"><i class='bx bxl-github'></i></a>
                    <a href="https://www.linkedin.com/in/christian-jay-cuevas-708502273"><i class='bx bxl-linkedin-square'></i></a>
                </div>
            </div>
            <div class="separator"></div>
            <div class="bottom">
                <p>
                    Made With ❤️
                </p>
                <div class="links">
                    <a href="https://christianjaycuevas.tech/storage/files/My%20Resume.pdf">My Resume</a>
                </div>
            </div>
        </footer>

    </body>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Head } from '@inertiajs/vue3';
import '../../css/new.css'
import Swal from "sweetalert2";

function showGetInTouchPopup() {
  Swal.fire({
    title: "Get in Touch",
    html: `
      <p>If you'd like to contact me, feel free to send an email:</p>
      <a href="mailto:christianjaycuevas@gmail.com" class="swal2-link">your_email@example.com</a>
    `,
    icon: "info",
    confirmButtonText: "Close",
    showCloseButton: true,
    customClass: {
      confirmButton: "swal2-confirm",
    },
  });
}
const isMenuOpen = ref(false);

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}

function openResume() {
  window.open('https://christianjaycuevas.tech/storage/files/My%20Resume.pdf', '_blank');
}
</script>