//-------------------------------------- NAVBAR ----------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const option = document.querySelector(".option");
  const navbar = document.querySelector("nav");
  let isNavGrey = false;

  console.log("Document loaded and script initialized.");

  // Toggle hamburger and navigation options
  if (hamburger && option && navbar) {
    hamburger.addEventListener("click", () => {
      console.log("Hamburger menu clicked");
      hamburger.classList.toggle("active");
      option.classList.toggle("active");

      // Check if the hamburger menu is active to change the navbar and menu color
      if (hamburger.classList.contains("active")) {
        navbar.classList.add("scrolled");
        option.classList.add("scrolled");
        isNavGrey = true;
        console.log("Navbar and menu color changed to grey when menu opened");
      } else {
        navbar.classList.remove("scrolled");
        option.classList.remove("scrolled");
        isNavGrey = false;
        console.log("Navbar and menu color reset when menu closed");
      }
    });

    window.addEventListener("scroll", function () {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolledPercentage = (window.scrollY / scrollableHeight) * 100;

      console.log(`Scrolled percentage: ${scrolledPercentage}`);

      if (scrolledPercentage >= 1 && !isNavGrey) {
        navbar.classList.add("scrolled");
        option.classList.add("scrolled");
        isNavGrey = true;
        console.log("Navbar and menu color changed on scroll");
      } else if (
        scrolledPercentage < 1 &&
        isNavGrey &&
        !hamburger.classList.contains("active")
      ) {
        // Ensure the navbar and menu color reset only if the menu is not active
        navbar.classList.remove("scrolled");
        option.classList.remove("scrolled");
        isNavGrey = false;
        console.log("Navbar and menu color reset on scroll");
      }
    });
  }

  // Handle clicks on main menu items to toggle submenus
  document.querySelectorAll(".nav-links > li > a").forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      const parentLi = this.parentNode;
      const thisSubmenu = parentLi.querySelector(".submenu");
      navbar.classList.add("scrolled");
      option.classList.add("scrolled");

      // Close all other submenus
      document.querySelectorAll(".submenu").forEach((submenu) => {
        if (submenu !== thisSubmenu) {
          submenu.classList.remove("show");
          submenu.style.maxHeight = null;
          submenu.style.opacity = 0;
          const arrow = submenu.previousElementSibling.querySelector(".arrow");
          if (arrow) arrow.classList.remove("down");
        }
      });

      // Toggle the current submenu
      const isSubmenuVisible = thisSubmenu.classList.toggle("show");
      thisSubmenu.style.maxHeight = isSubmenuVisible
        ? thisSubmenu.scrollHeight + "px"
        : 0;
      thisSubmenu.style.opacity = isSubmenuVisible ? 1 : 0;
      const arrow = thisSubmenu.previousElementSibling.querySelector(".arrow");
      if (arrow) arrow.classList.toggle("down", isSubmenuVisible);

      console.log(
        `Submenu for '${this.textContent.trim()}' toggled: `,
        isSubmenuVisible
      );
    });
  });

  // Handle clicks on submenu items to toggle inner-submenus
  document.querySelectorAll(".submenu > li").forEach(function (item) {
    const innerSubmenu = item.querySelector(".inner-submenu");

    item.addEventListener("click", function (event) {
      event.stopPropagation();

      // Close all other inner submenus except this one
      document.querySelectorAll(".inner-submenu").forEach(function (menu) {
        if (menu !== innerSubmenu) {
          menu.style.display = "none";
        }
      });

      // Toggle the display of this inner submenu
      if (innerSubmenu) {
        innerSubmenu.style.display =
          innerSubmenu.style.display === "none" ? "block" : "none";
        console.log(
          `Inner-submenu for '${item.textContent.trim()}' toggled: `,
          innerSubmenu.style.display
        );

        // Toggle the icon from + to - and vice versa
        const icon = item.querySelector(".icon");
        if (icon) {
          icon.textContent = innerSubmenu.style.display === "block" ? "-" : "+";
        }
      }
    });
  });

  // Initially hide all inner-submenus
  document.querySelectorAll(".inner-submenu").forEach(function (menu) {
    menu.style.display = "none";
  });

  // Close all menus when clicking outside of the navbar
  document.addEventListener("click", function (event) {
    if (!event.target.closest("nav")) {
      closeAllMenus();
      console.log("Clicked outside navbar, all menus closed.");
    }
  });

  function closeAllMenus() {
    document
      .querySelectorAll(".submenu, .inner-submenu")
      .forEach(function (menu) {
        menu.classList.remove("show");
        menu.style.display = "none";
        const arrow = menu.previousElementSibling.querySelector(".arrow");
        if (arrow) arrow.classList.remove("down");
      });
    option.classList.remove("active");
    navbar.classList.remove("scrolled");
    hamburger.classList.remove("active");
    isNavGrey = false;
    console.log("All menus and submenu settings have been reset.");
  }

  // Additional listeners for address bar interactions
  const addressBarContainer = document.getElementById("address-bar-container");
  const closeBtn = document.getElementById("close-btn");
  const searchIcon = document.querySelector(".searchbar i");

  searchIcon.addEventListener("click", () => {
    addressBarContainer.style.display = "block";
    closeAllMenus();
    console.log("Search icon clicked, address bar displayed.");
  });

  closeBtn.addEventListener("click", () => {
    addressBarContainer.style.display = "none";
    console.log("Close button clicked, address bar hidden.");
  });

  // Toggle hamburger icon based on screen width
  function toggleMenuIcons() {
    const menuItems = document.querySelectorAll(".nav-links > li");

    menuItems.forEach((item) => {
      const submenu = item.querySelector(".submenu");

      if (submenu) {
        submenu.style.padding =
          window.innerWidth <= 768 ? "16px 20px 20px 20px" : "0% 50% 95% 50%";

        // Check if inner-submenu icons exist and remove them if screen size is >= 768px
        const innerSubmenuIcons = item.querySelectorAll(".icon");
        if (window.innerWidth >= 768 && innerSubmenuIcons.length > 0) {
          innerSubmenuIcons.forEach((icon) => {
            icon.remove();
          });
        }

        // Add inner-submenu icons if screen size is < 768px and icons don't already exist
        if (window.innerWidth < 768 && innerSubmenuIcons.length === 0) {
          // const icon = document.createElement("span");
          // icon.classList.add("icon");
          // icon.textContent = "+"; // Initial icon state
          // item.appendChild(icon);
        }

        // Set initial arrow state for closed submenus
        const arrow = item.querySelector(".arrow");
        if (arrow && !submenu.classList.contains("show")) {
          arrow.classList.remove("down");
        }
      }
    });
  }

  toggleMenuIcons(); // Initial call to set icons based on initial screen width
  window.addEventListener("resize", toggleMenuIcons); // Call on window resize
});

//----------------------------------------------- ALERT_MSG -------------------------------------------------------
// Adjust padding and top for success and error messages
window.onload = function () {
  // This function will hide the messages after 3 seconds
  setTimeout(function () {
    // Select all elements with class 'success' and 'error'
    var messages = document.querySelectorAll(".success, .error");
    messages.forEach(function (message) {
      // Start fading out the message
      message.style.transition = "opacity 1s ease"; // Adds a fade-out transition
      message.style.opacity = "0"; // Set opacity to 0 to begin fading

      // Remove the message from the DOM after the fade-out transition completes
      setTimeout(function () {
        message.remove();
      }, 1000); // Delay for 1 second (after the fade-out transition)
    });
  }, 3000); // Wait for 3 seconds before starting the fade-out
};

//--------------------------------------------- IMAGE SLIDER ------------------------------------------------------

const slideContainer = document.querySelector(".slider");
const sliderTitle = document.querySelector(".slider--title");
const sliderText = document.querySelector(".slider--text");
const sliderButton = document.querySelector(".slider--btn"); // Reference to button link
const btnLeft = document.querySelector(".slider__btn-left");
const btnRight = document.querySelector(".slider__btn-right");

const sliderImages = [
  {
    src: '{% static "img/Hackathon.jpg" %}',
    title: "AgratAsia Hack24 Hackathon",
    text: "Pre-registration is already started, hurry up!",
    buttonLink: '{% url "AgratAsiaHack24" %}', // Example link for the hackathon
  },
  {
    src: "https://media.istockphoto.com/id/1003265652/vector/internship-black-background.jpg?s=170667a&w=0&k=20&c=ojiZNZLMKI4rJHSxVGcEQCVmsCJPl2mXZkizpIcmZw8=",
    title: "Paid Internship Opportunity 2k24",
    text: "Win a cash prize of up to 50K and PPO at Agratas Infotech",
    buttonLink: '{% url "internship" %}', // Example link for internships
  },
  {
    src: "https://thecyberpatch.com/content/images/size/w1000/2020/11/research-and-information-gathering.jpg",
    title: "Research and Development",
    text: "Explore innovative research and cutting-edge development projects at Agratas Labs.",
    buttonLink: "#", // Example link for R&D
  },
];

let slideCounter = 0;

const changeSlide = () => {
  slideCounter = (slideCounter + 1) % sliderImages.length;
  updateSlide();
};

const updateSlide = () => {
  slideContainer.style.backgroundImage = `linear-gradient(
          to right,
          rgba(34, 34, 34, 0.4),
          rgba(68, 68, 68, 0.4)
        ), url(${sliderImages[slideCounter].src})`;
  sliderTitle.innerHTML = sliderImages[slideCounter].title;
  sliderText.innerHTML = sliderImages[slideCounter].text;
  sliderButton.href = sliderImages[slideCounter].buttonLink; // Set button link dynamically
};

btnRight.addEventListener("click", function () {
  slideCounter = (slideCounter + 1) % sliderImages.length;
  updateSlide();
});

btnLeft.addEventListener("click", function () {
  slideCounter = (slideCounter - 1 + sliderImages.length) % sliderImages.length;
  updateSlide();
});

// Auto slide every 5 seconds
setInterval(changeSlide, 5000);

document.addEventListener("DOMContentLoaded", updateSlide);

//---------------------------------------------- FAQ ---------------------------------------------------
function gsapAccordion() {
  let menus = document.querySelectorAll(".accordion-menu");

  menus.forEach((menu) => {
    menu.addEventListener("click", () => {
      let content = menu.nextElementSibling;
      content.classList.toggle("expanded");

      // Close other accordions
      let allContents = document.querySelectorAll(".accordion-content");
      allContents.forEach((item) => {
        if (item !== content && item.classList.contains("expanded")) {
          item.classList.remove("expanded");
        }
      });

      // Toggle plus/minus icon
      let plusMinus = menu.querySelector(".accordion-plus");
      plusMinus.textContent = content.classList.contains("expanded")
        ? "-"
        : "+";

      // Smooth scroll to expanded content
      if (content.classList.contains("expanded")) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: content.offsetTop - 50,
            autoKill: true,
          },
        });
      }
    });
  });
}

// Run GSAP accordion function on page load
gsapAccordion();

//------------------------------- SIDE_ARRESTER -------------------------------------------
// Function to show the contact form
function showContactForm() {
  document.getElementById("contactFormContainer").style.display = "flex";
}

// Function to hide the contact form
function hideContactForm() {
  document.getElementById("contactFormContainer").style.display = "none";
}

// Prevent the form from submitting for demonstration purposes
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Handle form submission here

    hideContactForm(); // Hide the form after submission
  });

//------------------------------ HORIZONTAL TAB -----------------------------------------
function openTab(tabNumber, element) {
  var i;
  var x = document.getElementsByClassName("tab__inside");

  // Remove active class from all tabs
  for (i = 0; i < x.length; i++) {
    x[i].classList.remove("tab__inside-active");
  }

  // Add active class to the selected tab
  document.getElementById(tabNumber).classList.add("tab__inside-active");

  // Remove active class from all buttons
  var buttons = document.getElementsByClassName("tab__button");
  for (i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("tab_button-active");
  }

  // Add active class to the clicked button
  element.classList.add("tab_button-active");
}

//--------------------------------------------- SIGIN ------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("form");
  var usernameInput = document.getElementById("Username");
  var passwordInput = document.getElementById("Password");

  if (usernameInput && passwordInput) {
    form.addEventListener("submit", function (event) {
      // Username validation using regex
      var username = usernameInput.value;

      // Regex to allow only alphanumeric characters and limit the length to 8-20 characters
      var usernameRegex = /^[a-zA-Z0-9]{8,20}$/;
      if (!usernameRegex.test(username)) {
        alert(
          "Username must be between 8 to 20 characters long and contain only alphanumeric characters."
        );
        event.preventDefault();
        return;
      }

      // Password validation
      var password = passwordInput.value;
      if (
        password.length < 8 ||
        !/[A-Za-z]/.test(password) ||
        !/[0-9]/.test(password)
      ) {
        alert(
          "Password must be at least 8 characters long and contain both letters and numbers."
        );
        event.preventDefault();
        return;
      }

      // Sanitize inputs to prevent XSS
      usernameInput.value = sanitizeInput(usernameInput.value);
      passwordInput.value = sanitizeInput(passwordInput.value);
    });
  } else {
    console.error("One or more input fields are missing from the form.");
  }
});

// Function to validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Function to sanitize input to prevent XSS
function sanitizeInput(input) {
  const element = document.createElement("div");
  element.innerText = input;
  return element.innerHTML;
}

//----------------------------------------- SIGN UP --------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("signupForm");
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var passwordInput = document.getElementById("password");
  var confirmPasswordInput = document.getElementById("confirmPassword");

  if (nameInput && emailInput && passwordInput && confirmPasswordInput) {
    form.addEventListener("submit", function (event) {
      // Name validation using regex
      var name = nameInput.value;
      var nameRegex = /^[a-zA-Z0-9]{8,}$/;
      if (!nameRegex.test(name)) {
        alert(
          "Name must be greater than 7 characters and contain only alphanumeric characters."
        );
        event.preventDefault();
        return;
      }

      // Email validation using regex
      var email = emailInput.value;
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        event.preventDefault();
        return;
      }

      // Password validation
      var password = passwordInput.value;
      if (
        password.length < 8 ||
        !/[A-Za-z]/.test(password) ||
        !/[0-9]/.test(password)
      ) {
        alert(
          "Password must be greater than 8 characters and contain both letters and numbers."
        );
        event.preventDefault();
        return;
      }

      // Confirm Password validation
      var confirmPassword = confirmPasswordInput.value;
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        event.preventDefault();
        return;
      }

      // Basic sanitization for XSS and SQL injection prevention
      var sanitizeInput = function (input) {
        return input.replace(/[<>&'"]/g, function (c) {
          return {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            "'": "&#39;",
            '"': "&quot;",
          }[c];
        });
      };

      nameInput.value = sanitizeInput(nameInput.value);
      emailInput.value = sanitizeInput(emailInput.value);
      passwordInput.value = sanitizeInput(passwordInput.value);
      confirmPasswordInput.value = sanitizeInput(confirmPasswordInput.value);
    });

    // Password criteria message
    var passwordMessageItems = document.getElementsByClassName(
      "password-message-item"
    );
    var passwordMessage = document.getElementById("password-message");

    if (passwordInput && passwordMessage && passwordMessageItems.length >= 4) {
      passwordInput.onfocus = function () {
        passwordMessage.style.display = "block";
      };

      passwordInput.onblur = function () {
        passwordMessage.style.display = "none";
      };

      passwordInput.onkeyup = function () {
        // Checking uppercase letters
        let uppercaseRegex = /[A-Z]/g;
        if (passwordInput.value.match(uppercaseRegex)) {
          passwordMessageItems[1].classList.remove("invalid");
          passwordMessageItems[1].classList.add("valid");
        } else {
          passwordMessageItems[1].classList.remove("valid");
          passwordMessageItems[1].classList.add("invalid");
        }

        // Checking lowercase letters
        let lowercaseRegex = /[a-z]/g;
        if (passwordInput.value.match(lowercaseRegex)) {
          passwordMessageItems[0].classList.remove("invalid");
          passwordMessageItems[0].classList.add("valid");
        } else {
          passwordMessageItems[0].classList.remove("valid");
          passwordMessageItems[0].classList.add("invalid");
        }

        // Checking the number
        let numbersRegex = /[0-9]/g;
        if (passwordInput.value.match(numbersRegex)) {
          passwordMessageItems[2].classList.remove("invalid");
          passwordMessageItems[2].classList.add("valid");
        } else {
          passwordMessageItems[2].classList.remove("valid");
          passwordMessageItems[2].classList.add("invalid");
        }

        // Checking length of the password
        if (passwordInput.value.length >= 8) {
          passwordMessageItems[3].classList.remove("invalid");
          passwordMessageItems[3].classList.add("valid");
        } else {
          passwordMessageItems[3].classList.remove("valid");
          passwordMessageItems[3].classList.add("invalid");
        }
      };
    } else {
      console.error("Password criteria message elements are missing.");
    }
  } else {
    console.error("One or more input fields are missing from the form.");
  }
});
