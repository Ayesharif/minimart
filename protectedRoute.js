const pages = ["cart", "checkout", "profile"];

const currentPath = window.location.pathname.toLowerCase();

const isMatch = pages.some(page => currentPath.includes(page));
        const user = JSON.parse(sessionStorage.getItem('user'));
if (isMatch && !user ) {
  window.location.href="login.html"
}
