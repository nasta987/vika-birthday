document.addEventListener("DOMContentLoaded", function () {
  let crossedCards = JSON.parse(localStorage.getItem("crossedCards")) || {};
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

  function createStars(containerId, value) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Очистка контейнера
    const fullStars = Math.floor(value / 100);
    for (let i = 0; i < 5; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      if (i >= fullStars) {
        star.classList.add("dimmed");
      }
      container.appendChild(star);
    }
  }

  // Обработчики закрытия модального окна
  document.querySelector(".close").addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Включаем скролл
  });

  window.addEventListener("click", (event) => {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Включаем скролл
    }
  });

  //Модальное окно конец//

  //Подарки в секции начало//

  // Перемешивание массива
  giftArray.sort(() => Math.random() - 0.5);

  // Находим контейнер для карточек
  const container = document.querySelector(".best-card-container");

  // Функция для отображения карточек
  function renderCards(category = "ВСЕ") {
    // Очистить контейнер
    container.innerHTML = "";

    // Фильтруем карточки по категории
    const filteredGifts =
      category === "ВСЕ"
        ? giftArray
        : giftArray.filter((gift) => gift.category.toUpperCase() === category);

    // Генерация карточек
    filteredGifts.forEach((gift) => {
      // Создаём карточку
      const card = document.createElement("div");
      card.classList.add("card");

      // Если карточка была зачёркнута ранее, добавляем класс
      if (crossedCards[gift.name]) {
        card.classList.add("strikethrough");
      }

      // Создаём контейнер изображения
      const cardImg = document.createElement("div");
      cardImg.classList.add("card-img");

      // Добавляем изображение
      const img = document.createElement("img");
      img.src = gift.img;
      img.alt = gift.category;
      cardImg.appendChild(img);

      // Создаём текстовую часть
      const cardFor = document.createElement("div");
      cardFor.classList.add("card-for");

      // Добавляем категорию с цветом и заглавными буквами
      const categoryElem = document.createElement("h4");
      categoryElem.innerText = gift.category.toUpperCase();

      // Устанавливаем цвет категории
      if (gift.category === "АКТИВНЫЕ") {
        categoryElem.style.color = "#ff43f7";
      } else if (gift.category === "ТВОРЧЕСКИЕ") {
        categoryElem.style.color = "#06a44f";
      } else if (gift.category === "ПАССИВНЫЕ") {
        categoryElem.style.color = ""; // Цвет по умолчанию
      }

      cardFor.appendChild(categoryElem);

      // Добавляем имя с заглавными буквами
      const name = document.createElement("h5");
      name.innerText = gift.name.toUpperCase();
      cardFor.appendChild(name);

      // Собираем карточку
      card.appendChild(cardImg);
      card.appendChild(cardFor);

      // Обработчик клика — зачеркивание и открытие модального окна
      card.addEventListener("click", () => {
        // Добавляем зачёркивание и сохраняем состояние
        card.classList.add("strikethrough");
        crossedCards[gift.name] = true;
        localStorage.setItem("crossedCards", JSON.stringify(crossedCards));

        // Заполняем модальное окно данными
        document.getElementById("modal-img").src = gift.img;
        document.getElementById("modal-category").innerText =
          gift.category.toUpperCase();
        document.getElementById("modal-name").innerText =
          gift.name.toUpperCase();
        document.getElementById("modal-description").innerText =
          gift.description;

        // Ссылка в модальном окне
        const modalLink = document.getElementById("modal-link");
        modalLink.innerHTML = "";
        if (gift.button === "yes" && gift.link) {
          const link = document.createElement("a");
          link.href = gift.link;
          link.target = "_blank";
          link.innerHTML = "&#8594;";
          link.classList.add("arrow-link");
          modalLink.appendChild(link);
        }

        // Показываем модальное окно
        const modal = document.getElementById("modal");
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      });

      // Добавляем карточку в контейнер
      container.appendChild(card);
    });
  }

  // Изначально отображаем все карточки
  renderCards();

  // Добавление обработчиков на ячейки таблицы
  const tableCells = document.querySelectorAll("table td");

  tableCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      // Убираем класс active у всех ячеек
      tableCells.forEach((cell) => cell.classList.remove("active"));

      // Добавляем класс active к выбранной ячейке
      cell.classList.add("active");

      // Отображаем карточки выбранной категории
      const category = cell.innerText.toUpperCase();
      renderCards(category);
    });
  });

  const resetCell = document.getElementById("reset");
  resetCell.addEventListener("click", () => {
    // Очистить состояние зачёркивания
    crossedCards = {};
    localStorage.removeItem("crossedCards");

    // Убрать класс active у всех ячеек, затем активировать "ВСЕ"
    tableCells.forEach((cell) => cell.classList.remove("active"));
    const allCell = [...tableCells].find(
      (cell) => cell.innerText.toUpperCase() === "ВСЕ"
    );
    if (allCell) allCell.classList.add("active");

    // Перерисовать все карточки без зачёркиваний
    renderCards("ВСЕ");
  });

  //Подарки в секции конец//

  //Кнопка ВВЕРХ начало//
  const scrollToTopBtn = document.getElementById("scrollToTop");
  const giftPageContainer = document.querySelector(".gift-page-container");

  // Отслеживание прокрутки
  window.addEventListener("scroll", () => {
    // Показывать кнопку, если прокрутили больше 300px от верхней части страницы
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  // Плавный скролл наверх
  scrollToTopBtn.addEventListener("click", () => {
    giftPageContainer.scrollIntoView({ behavior: "smooth" });
  });

  // Исчезновение кнопки в футере
  const footer = document.querySelector(".footer");

  // Обновление видимости кнопки при скролле
  window.addEventListener("scroll", () => {
    const footerPosition = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Проверка, пересекается ли футер с видимой областью окна
    const isFooterVisible =
      footerPosition.top < windowHeight && footerPosition.bottom > 0;

    // Показывать кнопку, если прокрутка выше 300px и футер не виден
    if (window.scrollY > 300 && !isFooterVisible) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  //Кнопка ВВЕРХ конец//
});
