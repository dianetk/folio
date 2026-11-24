document.addEventListener("DOMContentLoaded", () => {
  //печатная машинка названия кейса

  const typewriter = document.querySelector(".typewriter");
  const cells = document.querySelectorAll(".cell.filled");

  let typingInterval;

  function typeText(text) {
    clearInterval(typingInterval);
    typewriter.textContent = "";
    let i = 0;

    typingInterval = setInterval(() => {
      typewriter.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(typingInterval);
    }, 50); // скорость печати
  }

  cells.forEach((cell) => {
    cell.addEventListener("mouseenter", () => {
      const title = cell.dataset.title;
      if (!title) return;

      typewriter.style.opacity = 1;
      typeText(title);
    });

    cell.addEventListener("mouseleave", () => {
      clearInterval(typingInterval);
      typewriter.style.opacity = 0;
      typewriter.textContent = "";
    });
  });

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      /* Переключение между добавлением и удалением класса "active",
    чтобы выделить кнопку, управляющую панелью */
      this.classList.toggle("active");

      /* Переключение между скрытием и отображением активной панели */
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }

  //
  //
  // name animation
  const words = ["dia.net", "dian.et", "diane.t", "dian.et"];
  let index = 0;

  function changeText() {
    const currentWord = words[index];
    document.getElementById("changer").textContent = currentWord;
    index = (index + 1) % words.length; // Цикличность
  }

  // Запускаем смену через 1 секунды
  setTimeout(changeText, 1000);
  setInterval(changeText, 1000); // Повторяем каждые 1 секунды

  // воспроизведение видео в кейсах на hover

  // const containers = document.querySelectorAll(".video-container");

  // containers.forEach((container) => {
  //   const video = container.querySelector("video");

  //   container.addEventListener("mouseenter", () => {
  //     video.play().catch(() => {});
  //     container.classList.add("playing");
  //   });

  //   container.addEventListener("mouseleave", () => {
  //     video.pause();
  //     container.classList.remove("playing");
  //   });
  // });

  const containers = document.querySelectorAll(".video-container");

  containers.forEach((container) => {
    const video = container.querySelector("video");

    container.addEventListener("mouseenter", () => {
      video.pause();
      container.classList.add("paused");
    });

    container.addEventListener("mouseleave", () => {
      video.play().catch(() => {}); // игнорируем ошибки автовоспроизведения после паузы
      container.classList.remove("paused");
    });
  });

  // sort

  // const tags = document.querySelectorAll(".tag");
  // const cases = document.querySelectorAll(".case");

  // tags.forEach((tag) => {
  //   tag.addEventListener("click", () => {
  //     // снимаем active со всех
  //     tags.forEach((t) => t.classList.remove("active"));
  //     tag.classList.add("active");

  //     const selected = tag.dataset.tag;

  //     cases.forEach((c) => {
  //       if (selected === "all") {
  //         c.style.display = "block";
  //       } else {
  //         c.style.display = c.dataset.tag === selected ? "block" : "none";
  //       }
  //     });
  //   });
  // });

  // v2

  // const tags = document.querySelectorAll(".tag");
  // const cases = document.querySelectorAll(".case");

  // tags.forEach((tag) => {
  //   tag.addEventListener("click", () => {
  //     // снимаем active со всех
  //     tags.forEach((t) => t.classList.remove("active"));
  //     tag.classList.add("active");

  //     const selected = tag.dataset.tag;

  //     cases.forEach((c) => {
  //       if (selected === "all") {
  //         c.style.display = "block";
  //         return;
  //       }

  //       const blockTags = c.dataset.tag?.toLowerCase().split(/\s+/) || [];
  //       const selectedTag = selected.toLowerCase();

  //       // показываем, если выбранный тег есть среди тегов блока
  //       if (blockTags.includes(selectedTag)) {
  //         c.style.display = "block";
  //       } else {
  //         c.style.display = "none";
  //       }
  //     });
  //   });
  // });

  // flex grow галереи внутри кейса
  document.querySelectorAll(".row img").forEach((img) => {
    const apply = () => {
      if (!img.naturalWidth) return;
      img.style.flexGrow = img.naturalWidth / img.naturalHeight;
    };

    if (img.complete && img.naturalWidth) apply();
    else img.addEventListener("load", apply);
  });

  //video flex grow
  document.querySelectorAll(".video-container video").forEach((video) => {
    const apply = () => {
      if (!video.videoWidth || !video.videoHeight) return;
      video.style.flexGrow = video.videoWidth / video.videoHeight;
      video.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
    };

    if (video.readyState >= 1) apply();
    else video.addEventListener("loadedmetadata", apply);
  });

  // video img flex grow

  document
    .querySelectorAll(".media-container img, .media-container video")
    .forEach((el) => {
      const apply = () => {
        // у img размеры в naturalWidth/naturalHeight, у video — в videoWidth/videoHeight
        const w = el.videoWidth || el.naturalWidth;
        const h = el.videoHeight || el.naturalHeight;
        if (!w || !h) return;

        el.style.flexGrow = w / h;
        el.style.aspectRatio = `${w} / ${h}`;
      };

      // img сигнализирует событием load, video — loadedmetadata
      if (el.tagName === "IMG") {
        if (el.complete && el.naturalWidth) apply();
        else el.addEventListener("load", apply);
      } else {
        if (el.readyState >= 1) apply();
        else el.addEventListener("loadedmetadata", apply);
      }

      // пауза на ховер — только для видео, у gif своего плеера нет
      if (el.tagName === "VIDEO") {
        el.addEventListener("mouseenter", () => el.pause());
        el.addEventListener("mouseleave", () => el.play().catch(() => {}));
      }
    });

  //
  const tags = document.querySelectorAll(".tag");
  const cases = document.querySelectorAll(".case");

  function applyFilter(selectedTag) {
    // Обновляем кнопки
    tags.forEach((t) => t.classList.remove("active"));
    const activeBtn = Array.from(tags).find(
      (t) => t.dataset.tag === selectedTag,
    );
    if (activeBtn) activeBtn.classList.add("active");

    // Применяем фильтр к блокам
    cases.forEach((c) => {
      if (selectedTag === "all") {
        c.style.display = "block";
        return;
      }

      const blockTags = c.dataset.tag?.toLowerCase().split(/\s+/) || [];
      const selectedLower = selectedTag.toLowerCase();

      c.style.display = blockTags.includes(selectedLower) ? "block" : "none";
    });
  }

  function getTagFromHash() {
    const hash = window.location.hash.substring(1);
    // Динамически берём теги прямо из кнопок — не нужно жёстко прописывать
    const allowedTags = Array.from(tags).map((t) => t.dataset.tag);
    return allowedTags.includes(hash) ? hash : "all";
  }

  // 1. При загрузке — читаем хэш
  window.addEventListener("DOMContentLoaded", () => {
    applyFilter(getTagFromHash());
  });

  // 2. При клике — ТОЛЬКО меняем хэш, не фильтруем
  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      window.location.hash = tag.dataset.tag;
    });
  });

  // 3. При смене хэша — фильтруем
  window.addEventListener("hashchange", () => {
    applyFilter(getTagFromHash());
  });
});
