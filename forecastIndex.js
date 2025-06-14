document.addEventListener("DOMContentLoaded", function () {
  // Бургер-меню
  const burgerMenu = document.querySelector(".burger-menu");
  const nav = document.querySelector(".header-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const closeMenuButton = document.querySelector(".close-menu");
  const overlayBurger = document.querySelector(".overlayBurger"); //затемненный фон для бургер-меню

  function openMenu() {
    nav.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    overlayBurger.style.display = "block";
    document.body.classList.add("no-scroll");
  }

  function closeMenu() {
    nav.classList.remove("active");
    burgerMenu.classList.remove("active");
    overlayBurger.style.display = "none";
    document.body.classList.remove("no-scroll");
  }

  burgerMenu.addEventListener("click", function () {
    if (nav.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (nav.classList.contains("active")) {
        closeMenu();
      }
    });
  });

  closeMenuButton.addEventListener("click", function () {
    if (nav.classList.contains("active")) {
      closeMenu();
    }
  });

  document.addEventListener("click", function (event) {
    if (
      !nav.contains(event.target) &&
      !burgerMenu.contains(event.target) &&
      nav.classList.contains("active")
    ) {
      closeMenu();
    }
  });

  overlayBurger.addEventListener("click", function () {
    closeMenu();
  });

  nav.addEventListener("click", function (event) {
    if (!event.target.classList.contains("nav-link")) {
      closeMenu();
    }
  });
  //Бургер-меню конец!!!
  //Модальное окно начало//

  const modal = document.getElementById("modal");
  const modalCloseButton = document.querySelector(".close");
  const modalImg = document.getElementById("modal-img");
  const modalCategory = document.getElementById("modal-category");
  const modalDescription = document.getElementById("modal-description");

  // Открытие модального окна
  function openModal(forecast) {
    if (!forecast) {
      console.error("Данные не найдены!");
      return;
    }

    modalImg.src = forecast.img2; // отображаем img2 в модальном окне
    modalCategory.innerText = ""; // убираем заголовок
    modalDescription.innerText = ""; // убираем описание

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  // Закрытие модального окна
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Включаем прокрутку
  }

  // Добавление обработчиков событий для закрытия
  if (modalCloseButton) {
    modalCloseButton.addEventListener("click", closeModal);
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  //Модальное окно конец//

  //Подарки в секции начало//

  // Инициализация карточек
  const container = document.querySelector(".best-card-container");

  function renderCards() {
    container.innerHTML = "";

    forecastArray.forEach((forecast, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "310px";
      card.style.height = "310px";

      const cardImg = document.createElement("div");
      cardImg.classList.add("card-img");

      const img = document.createElement("img");
      img.src = forecast.img;
      img.alt = `Картинка ${index + 1}`;

      cardImg.appendChild(img);
      card.appendChild(cardImg);

      card.addEventListener("click", () => {
        openModal(forecast);
        card.classList.add("strikethrough"); // опционально
      });

      container.appendChild(card);
    });
  }

  renderCards(); // Отображаем карточки
});
