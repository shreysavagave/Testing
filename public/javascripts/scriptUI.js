// Sidebar toggle
const profileBtn = document.getElementById('profile-btn');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');

profileBtn.addEventListener('click', () => {
    sidebar.classList.add('sidebar-open');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('sidebar-open');
});


