<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <main>
            <div class="header">
                <div class="left">
                    <h1>Hi! Welcome to my Portfolio</h1>
                </div>
                <a href="#" class="report">
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
                        <i class='bx bx-devices'></i>
                        <h3>
                            Technical Skills 
                        </h3>
                    </span>
                    <p>><strong> Front-End Web Development</strong> (VueJS, HTML, CSS)</p>
                    <p>><strong> Back-End Web Development</strong> (Laravel, PHP, MySQL)</p>
                    <p>><strong> Mobile App Development</strong> (JS, React Native, MySQL)</p>
                    <p>><strong> Networking and Security</strong> (Routing & Switching, Troubleshooting)</p>
                    <p>><strong> Web DevOps</strong> (CI/CD Pipeline using workflow, Git, LEMP Stack deployment)</p>
                    <p>><strong> Machine & Deep Learning</strong> (Python, Data Preprocessing, Model Training, Computer Vision)</p>
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
                    <p>><strong> Work Ethic</strong></p>
                    <p>><strong> Attention to Detail</strong></p>
                </li>
            </ul>
            <!-- End of Insights -->

            <div class="bottom-data">
                <div class="orders">
                    <div class="header">
                        <i class='bx bx-receipt'></i>
                        <h3>Certificates and Awards</h3>
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
                                    <img src="images/profile-1.jpg">
                                    <p>John Doe</p>
                                </td>
                                <td>14-08-2023</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="images/profile-1.jpg">
                                    <p>John Doe</p>
                                </td>
                                <td>14-08-2023</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="images/profile-1.jpg">
                                    <p>John Doe</p>
                                </td>
                                <td>14-08-2023</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Reminders -->
                <div class="reminders">
                    <div class="header">
                        <i class='bx bx-note'></i>
                        <h3>Remiders</h3>
                        <i class='bx bx-filter'></i>
                        <i class='bx bx-plus'></i>
                    </div>
                    <ul class="task-list">
                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p>Start Our Meeting</p>
                            </div>
                            <i class='bx bx-dots-vertical-rounded'></i>
                        </li>
                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p>Analyse Our Site</p>
                            </div>
                            <i class='bx bx-dots-vertical-rounded'></i>
                        </li>
                        <li class="not-completed">
                            <div class="task-title">
                                <i class='bx bx-x-circle'></i>
                                <p>Play Footbal</p>
                            </div>
                            <i class='bx bx-dots-vertical-rounded'></i>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    </AuthenticatedLayout>
</template>
