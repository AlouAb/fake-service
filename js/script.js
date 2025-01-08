document.addEventListener('DOMContentLoaded', function() {
    const currentUser = getCurrentUser();
    const navbarNav = document.getElementById('navbarNav');
    
    if (currentUser) {
        // Đã đăng nhập
        navbarNav.innerHTML = `
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <span class="nav-link">Xin chào, ${currentUser.fullName}</span>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick="handleLogout()">Đăng xuất</a>
                </li>
            </ul>
        `;
    }
});

function handleLogout() {
    logout();
    window.location.href = 'index.html';
}
