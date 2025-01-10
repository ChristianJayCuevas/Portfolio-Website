const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        });
        li.classList.add('active');
    });
});

const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');

menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
});

const toggler = document.getElementById('theme-toggle');

// Set the theme based on localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    toggler.checked = isDarkMode; // Set the toggler state
    document.body.classList.toggle('dark', isDarkMode); // Apply the dark mode class
});

// Save the theme preference to localStorage when toggled
toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark'); // Save the preference
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light'); // Save the preference
    }
});
