document.addEventListener("DOMContentLoaded", function () {
  //Таймер Начало!!!!

  // Устанавливаем дату, до которой будет обратный отсчет
  const countDownDate = new Date("Jan 1, 2025 00:00:00").getTime();

  // Обновляем обратный отсчет каждую секунду
  const countdownFunction = setInterval(function () {
    // Текущая дата и время
    const now = new Date().getTime();

    // Разница между текущим временем и временем обратного отсчета
    const distance = countDownDate - now;

    // Вычисляем дни, часы, минуты и секунды
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Отображаем результат в соответствующих элементах
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    // Если обратный отсчет завершен, выводим сообщение
    if (distance < 0) {
      clearInterval(countdownFunction);
      document.querySelector(".timer-container").innerHTML = "HAPPY NEW YEAR!";
    }
  }, 0);
  // Таймер конец!!!!

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
  // Слайдер начало//
  const textImgContainer = document.querySelector(".slader-text-img");
  const btnLeft = document.querySelector(".sl-btn-left");
  const btnRight = document.querySelector(".sl-btn-right");
  const slides = textImgContainer.children; // Все элементы (текст + картинки)
  const totalSlides = slides.length;

  let currentIndex = 0; // Текущий индекс видимого элемента
  let maxRightClicks = 0; // Счетчик для кнопки "вправо"
  let shiftMultiplier = 1.5; // Начальный коэффициент сдвига

  // Определение shiftMultiplier и maxRightClicks в зависимости от ширины экрана
  function updateSliderSettings() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      shiftMultiplier = 1.5; // Для экранов меньше или равно 768px
      maxRightClicks = 6; // Разрешаем 6 нажатий вправо
    } else if (screenWidth <= 1100) {
      shiftMultiplier = 1.5; // Для экранов между 769px и 1100px
      maxRightClicks = 4; // Разрешаем 4 нажатия вправо
    } else {
      shiftMultiplier = 1.2; // Для экранов больше 1100px
      maxRightClicks = 3; // Разрешаем 3 нажатия вправо
    }

    // Сбросить состояние слайдера в начальное положение
    currentIndex = 0;
    textImgContainer.style.transform = `translateX(0)`;

    // Обновляем состояние кнопок
    updateButtons();
  }

  // Функция обновления состояния кнопок
  function updateButtons() {
    const elementWidth = slides[0].offsetWidth * shiftMultiplier; // Увеличенная ширина слайда
    const maxTranslate = elementWidth * (totalSlides - 1); // Максимально возможный сдвиг

    const currentTranslate = currentIndex * elementWidth;

    // Блокируем кнопку "влево", если на первом слайде
    btnLeft.disabled = currentIndex === 0;
    // Блокируем кнопку "вправо", если мы достигли лимита нажатий вправо или сдвиг достиг последнего элемента
    btnRight.disabled = currentIndex === totalSlides - 1 || maxRightClicks <= 0;
  }

  // Функция сдвига слайдов
  function moveSlider(direction) {
    const elementWidth = slides[0].offsetWidth * shiftMultiplier; // Увеличенная ширина слайда

    if (
      direction === "right" &&
      maxRightClicks > 0 &&
      currentIndex < totalSlides - 1
    ) {
      currentIndex++;
      maxRightClicks--; // Уменьшаем количество оставшихся нажатий вправо
    } else if (direction === "left" && currentIndex > 0) {
      currentIndex--;
      // Если мы двигаем слайдер влево, увеличиваем доступные нажатия вправо
      maxRightClicks++;
    }

    // Сдвиг контейнера
    textImgContainer.style.transform = `translateX(-${
      currentIndex * elementWidth
    }px)`;
    updateButtons(); // Обновляем состояние кнопок после сдвига
  }

  // Слушатели на кнопках
  btnRight.addEventListener("click", () => moveSlider("right"));
  btnLeft.addEventListener("click", () => moveSlider("left"));

  // Инициализация состояния кнопок
  updateSliderSettings();

  // Обновляем настройки слайдера при изменении размера экрана
  window.addEventListener("resize", updateSliderSettings);

  //Слайдер конец!!!//

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

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      // Ищем текст внутри <h5> для данной карточки и приводим к нижнему регистру
      const cardName = card.querySelector("h5").innerText.trim().toLowerCase();

      // Находим объект в giftArray по имени, также приводя его к нижнему регистру
      const gift = giftArray.find(
        (item) => item.name.toLowerCase() === cardName
      );

      if (!gift) {
        console.error(`Объект с именем "${cardName}" не найден!`);
        return;
      }

      // Наполняем модальное окно данными
      document.getElementById("modal-img").src = gift.img;
      document.getElementById("modal-category").innerText =
        gift.category.toUpperCase();
      document.getElementById("modal-name").innerText = gift.name.toUpperCase();
      document.getElementById("modal-description").innerText = gift.description;

      // Устанавливаем значения и звёздочки
      document.getElementById("modal-live-value").innerText =
        gift.superpowers.live;
      createStars("stars-live", gift.superpowers.live);

      document.getElementById("modal-create-value").innerText =
        gift.superpowers.create;
      createStars("stars-create", gift.superpowers.create);

      document.getElementById("modal-love-value").innerText =
        gift.superpowers.love;
      createStars("stars-love", gift.superpowers.love);

      document.getElementById("modal-dream-value").innerText =
        gift.superpowers.dream;
      createStars("stars-dream", gift.superpowers.dream);

      // Отображаем модальное окно
      const modal = document.getElementById("modal");
      modal.style.display = "flex";
      document.body.style.overflow = "hidden"; // Отключаем скролл
    });
  });

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
});
