<template>
    <div>
      <div class="sidebar" :class="{ close: isSidebarClosed }">
        <a href="#" class="logo">
          <i class="bx bx-code-alt"></i>
          <div class="logo-name"><span>C</span>Jay</div>
        </a>
        <ul class="side-menu">
          <li v-for="(link, index) in links" :key="index" :class="{ active: isActiveLink(link.name) }">
            <inertia-link :href="link.route" @click.native="setActive(link.name)">
              <i :class="link.icon"></i>{{ link.text }}
            </inertia-link>
          </li>
        </ul>
      </div>
  
      <div class="content">
        <nav>
          <i class="bx bx-menu" @click="toggleSidebar"></i>
          <input type="checkbox" id="theme-toggle" v-model="isDarkMode" :hidden="true" />
          <label for="theme-toggle" class="theme-toggle">
            <span class="moon"><i class="bx bx-moon"></i></span>
            <span class="sun"><i class="bx bx-sun"></i></span>
          </label>
        </nav>
        <slot /> 
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
  import { Link as InertiaLink, usePage } from '@inertiajs/vue3'; // Import Inertia Link and usePage hook
  
  const isSidebarClosed = ref(false);
  const isDarkMode = ref(false);
  const activeLink = ref(null);
  
  const links = [
    { text: "About Me", icon: "bx bx-user", route: '/', name: 'dashboard' },
    { text: "My Projects", icon: "bx bx-folder", route: '/projects', name: 'projects' },
    { text: "Contact Me", icon: "bx bx-message", route: '/contact', name: 'contact' },
  ];
  
  const { url } = usePage();
  
  const toggleSidebar = () => {
    isSidebarClosed.value = !isSidebarClosed.value;
  };
  
  const setActive = (linkName) => {
    activeLink.value = linkName;
  };
  
  const isActiveLink = (linkName) => {
    return url === links.find(link => link.name === linkName)?.route;
  };
  
  const handleResize = () => {
    isSidebarClosed.value = window.innerWidth < 768;
  };
  
  watch(isDarkMode, (newValue) => {
    document.body.classList.toggle("dark", newValue);
    localStorage.setItem("theme", newValue ? "dark" : "light");
  });
  
  onMounted(() => {
    const savedTheme = localStorage.getItem("theme");
    isDarkMode.value = savedTheme === "dark";
    handleResize();
    window.addEventListener("resize", handleResize);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });
  </script>
  