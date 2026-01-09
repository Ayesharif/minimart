function initNavbar() {
    const userAvatar = document.getElementById('user-Avatar');
    const userName = document.getElementById('user-Name');

    const menuButton = document.getElementById('toggol');
    const loggedUser = document.getElementById('loggedUser');
    const getstartBtn = document.getElementById('gts-btn');
    const mobileMenu = document.getElementById('downMenu');
    const menuIcon = document.getElementById('menu-icon');

    // 🔒 Safety checks
    if (menuButton && mobileMenu && menuIcon) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hide');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-xmark');
        });
    }

    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user) {
        if (getstartBtn) getstartBtn.style.display = "none";
        if (userName) userName.textContent = user.fullName;
        if (userAvatar) userAvatar.textContent = user.fullName.charAt(0);
    } else {
        if (loggedUser) loggedUser.style.display = "none";

    }
}

// 🔥 Auth check (separate function)
function loadUser() {
    fetch("http://localhost:3000/authMe", {
        method: "GET",
        credentials: "include",
    })
    .then(res => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
    })
    .then(data => {
        sessionStorage.setItem("user", JSON.stringify(data.user));
        initNavbar(); // refresh navbar
    })
    .catch(() => {
        sessionStorage.removeItem("user");
        initNavbar();
    });
}
