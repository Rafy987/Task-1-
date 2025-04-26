# Task-1-
Task1 for SkillCraft Internship
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SkillCraft Landing Page</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }
    body {
      min-height: 200vh;
    }
    nav {
      width: 100%;
      background: transparent;
      padding: 20px 50px;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      transition: 0.3s;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    nav.scrolled {
      background: #007bff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    nav .logo {
      font-size: 24px;
      font-weight: bold;
      color: #fff;
    }
    nav ul {
      list-style: none;
      display: flex;
    }
    nav ul li {
      margin: 0 15px;
    }
    nav ul li a {
      text-decoration: none;
      color: #fff;
      font-size: 18px;
      transition: color 0.3s;
    }
    nav ul li a:hover {
      color: yellow;
    }
    header {
      width: 100%;
      height: 100vh;
      background: linear-gradient(to right, #0062E6, #33AEFF);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: white;
      text-align: center;
      padding: 0 20px;
    }
    header h1 {
      font-size: 48px;
      margin-bottom: 20px;
    }
    header p {
      font-size: 20px;
      max-width: 600px;
    }
  </style>
</head>
<body>

<nav id="navbar">
  <div class="logo">SkillCraft</div>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Portfolio</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>

<header>
  <h1>Welcome to SkillCraft Technology</h1>
  <p>Building your future with technology and innovation. Explore more with us!</p>
</header>

<script>
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
</script>

</body>
</html>
