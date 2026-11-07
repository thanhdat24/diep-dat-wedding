(function () {
  "use strict";

  const c = window.WEDDING_CONFIG || {};

  const DAY_IDS = [
    "HEADLINE54",
    "HEADLINE24",
    "HEADLINE25",
    "HEADLINE26",
    "HEADLINE27",
    "HEADLINE28",
    "HEADLINE29",
    "HEADLINE30",
    "HEADLINE31",
    "HEADLINE32",
    "HEADLINE33",
    "HEADLINE34",
    "HEADLINE35",
    "HEADLINE36",
    "HEADLINE37",
    "HEADLINE38",
    "HEADLINE39",
    "HEADLINE40",
    "HEADLINE41",
    "HEADLINE42",
    "HEADLINE43",
    "HEADLINE44",
    "HEADLINE45",
    "HEADLINE48",
    "HEADLINE46",
    "HEADLINE47",
    "HEADLINE49",
    "HEADLINE50",
    "HEADLINE51",
    "HEADLINE52",
    "HEADLINE53",
  ];

  const COL_LEFT = [0, 53.9178, 107.835, 161.748, 215.663, 269.58, 323.497];
  const ROW_TOP = [37.067, 73.955, 109.385, 146.189, 183.738, 221.287];

  function asText(value, fallback) {
    if (value === null || value === undefined) return fallback || "";
    return String(value);
  }

  function cssUrl(src) {
    return asText(src).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }

  function q(id, selector) {
    return document.querySelector(
      "#" + id + " " + (selector || ".ladi-headline"),
    );
  }

  function setHtml(id, html, selector) {
    const el = q(id, selector || ".ladi-headline");
    if (!el || html === null || html === undefined) return;
    el.innerHTML = String(html);
  }

  function setText(id, text, selector) {
    const el = q(id, selector || ".ladi-headline");
    if (!el || text === null || text === undefined) return;
    el.textContent = String(text);
  }

  function setImage(id, src) {
    src = asText(src).trim();
    if (!src) return;

    const el = document.querySelector("#" + id + " .ladi-image-background");
    if (!el) return;

    el.style.setProperty(
      "background-image",
      'url("' + cssUrl(src) + '")',
      "important",
    );
  }

  function absoluteUrl(src) {
    src = asText(src).trim();
    if (!src) return "";
    try {
      return new URL(src, document.baseURI).href;
    } catch (_) {
      return src;
    }
  }

  function toInteger(value) {
    const n = Number.parseInt(value, 10);
    return Number.isFinite(n) ? n : NaN;
  }

  function validWeddingDate() {
    const w = c.wedding || {};
    const year = toInteger(w.year);
    const month = toInteger(w.month);
    const day = toInteger(w.day);

    if (!Number.isInteger(year) || year < 1900 || year > 2200) return null;
    if (!Number.isInteger(month) || month < 1 || month > 12) return null;
    if (!Number.isInteger(day) || day < 1 || day > 31) return null;

    const date = new Date(Date.UTC(year, month - 1, day));
    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day
    ) {
      return null;
    }

    return { date: date, year: year, month: month, day: day };
  }

  function getVietnameseWeekday(date) {
    return [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ][date.getUTCDay()];
  }

  function setMeta(selector, value) {
    value = asText(value).trim();
    if (!value) return;

    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      const prop = selector.match(/property=["']([^"']+)["']/);
      const name = selector.match(/name=["']([^"']+)["']/);
      if (prop) el.setAttribute("property", prop[1]);
      if (name) el.setAttribute("name", name[1]);
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  }

  /* =========================================================
     KHÔNG CẦN LADIPAGE RUNTIME: hiện toàn bộ nội dung tĩnh
     ========================================================= */
  function revealElements() {
    document.querySelectorAll(".ladi-animation-hidden").forEach(function (el) {
      el.classList.remove("ladi-animation-hidden");
      el.style.setProperty("visibility", "visible", "important");
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("pointer-events", "auto", "important");
    });

    ["IMAGE55", "GROUP43", "HEADLINE107", "HEADLINE108"].forEach(function (id) {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove("ladi-animation-hidden");
      el.style.setProperty("visibility", "visible", "important");
      el.style.setProperty("opacity", "1", "important");
    });
  }

  function applyMetadata() {
    const site = c.site || {};
    const couple = c.couple || {};
    const wedding = c.wedding || {};
    const groom = asText(couple.groom).trim();
    const bride = asText(couple.bride).trim();

    const title =
      asText(site.title).trim() ||
      (groom || bride
        ? "Thiệp cưới " + groom + (groom && bride ? " & " : "") + bride
        : "Thiệp cưới");

    const description =
      asText(site.description).trim() ||
      (groom || bride
        ? "Trân trọng kính mời bạn đến chung vui cùng " +
          groom +
          (groom && bride ? " & " : "") +
          bride +
          (wedding.day && wedding.month && wedding.year
            ? " vào ngày " +
              wedding.day +
              "/" +
              wedding.month +
              "/" +
              wedding.year +
              "."
            : ".")
        : "");

    if (title) {
      document.title = title;
      setMeta('meta[property="og:title"]', title);
    }
    if (description) {
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', description);
    }

    const share = asText((c.images || {}).share).trim();
    if (share) setMeta('meta[property="og:image"]', absoluteUrl(share));

    const siteUrl = asText(site.url).trim();
    if (siteUrl) {
      const url = absoluteUrl(siteUrl);
      setMeta('meta[property="og:url"]', url);

      let canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    }
  }

  function applyCouple() {
    const coupleName = c.coupleName || {};
    const groom = asText(coupleName.groom).trim();
    const bride = asText(coupleName.bride).trim();

    if (groom) {
      const lower = groom.toLocaleLowerCase("vi-VN");
      setText("HEADLINE3", lower);
      setText("HEADLINE11", lower);
    }
    if (bride) {
      const lower = bride.toLocaleLowerCase("vi-VN");
      setText("HEADLINE4", lower);
      setText("HEADLINE10", lower);
    }
    if (groom || bride) {
      setHtml("HEADLINE88", groom + " &amp; " + bride + "<br>");
    }
  }

  function applyStoryAndInvitation() {
    if (c.loveStoryTitle) setHtml("HEADLINE8", c.loveStoryTitle);
    if (c.loveStory) setHtml("HEADLINE9", c.loveStory);
    if (c.invitation) setHtml("HEADLINE12", c.invitation);
  }

  function applyDateSummary() {
    const info = validWeddingDate();
    if (!info) return;

    const day = String(info.day).padStart(2, "0");
    const month = String(info.month).padStart(2, "0");
    const year = String(info.year);

    setHtml("HEADLINE104", day + "<br>");
    setHtml("HEADLINE103", month + "<br>");
    setHtml("HEADLINE7", year.slice(-2) + "<br>");

    setHtml("HEADLINE91", day + "<br>");
    setHtml("HEADLINE92", month + "<br>");
    setHtml("HEADLINE93", year + "<br>");
  }

  function applyWeddingDetails() {
    const w = c.wedding || {};
    const info = validWeddingDate();

    if (info) {
      const weekday =
        asText(w.weekday).trim() || getVietnameseWeekday(info.date);
      const time = asText(w.time).trim();
      const timeLine = [time, weekday].filter(Boolean).join(", ");
      if (timeLine) setHtml("HEADLINE13", timeLine + "<br>");
    }

    const venueLabel = asText(w.venueLabel, "Địa điểm").trim();
    const venue = asText(w.venue).trim();
    if (venueLabel || venue) {
      setHtml(
        "HEADLINE80",
        venueLabel + (venueLabel && venue ? "<br>" : "") + venue + "<br>",
      );
    }

    if (w.directions) setHtml("HEADLINE95", w.directions + "<br>");

    if (venue && info) {
      const dd = String(info.day).padStart(2, "0");
      const mm = String(info.month).padStart(2, "0");
      setHtml(
        "PARAGRAPH1",
        venue +
          "<br>Tiệc cưới: " +
          asText(w.time).trim() +
          ", ngày " +
          dd +
          "/" +
          mm +
          "/" +
          info.year,
        ".ladi-paragraph",
      );
    }

    const mapUrl = asText(w.mapUrl).trim();
    const mapLink = document.getElementById("GROUP33");
    if (mapLink && mapUrl) {
      mapLink.setAttribute("href", mapUrl);
      mapLink.setAttribute("target", "_blank");
      mapLink.setAttribute("rel", "noopener noreferrer");
    }
  }

  function applyFamilies() {
    const f = c.families || {};
    const brideLines = Array.isArray(f.bride) ? f.bride : [];
    const groomLines = Array.isArray(f.groom) ? f.groom : [];

    if (f.brideTitle || brideLines.length) {
      setHtml(
        "HEADLINE105",
        '<span style="font-weight:bold;">' +
          asText(f.brideTitle, "Gia đình nhà gái") +
          "</span><br>" +
          brideLines.join("<br>") +
          "<br>",
      );
    }

    if (f.groomTitle || groomLines.length) {
      setHtml(
        "HEADLINE106",
        '<span style="font-weight:bold;">' +
          asText(f.groomTitle, "Gia đình nhà trai") +
          "</span><br>" +
          groomLines.join("<br>") +
          "<br>",
      );
    }
  }

  function applyCalendar() {
    const info = validWeddingDate();
    if (!info) return;

    const calendar = c.calendar || {};
    const weekdays =
      Array.isArray(calendar.weekdays) && calendar.weekdays.length === 7
        ? calendar.weekdays
        : ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

    weekdays.forEach(function (label, i) {
      setText("HEADLINE" + (17 + i), label);
    });

    const prefix = asText(calendar.monthPrefix, "Tháng").trim() || "Tháng";
    setText("HEADLINE16", prefix + " " + info.month);

    const daysInMonth = new Date(
      Date.UTC(info.year, info.month, 0),
    ).getUTCDate();
    const jsFirstDay = new Date(
      Date.UTC(info.year, info.month - 1, 1),
    ).getUTCDay();
    const mondayFirstIndex = (jsFirstDay + 6) % 7;

    /* Tháng 6 hàng (như 11/2026) sẽ tràn khỏi khung nâu nếu giữ giãn cách 5 hàng */
    const rowCount = Math.ceil((mondayFirstIndex + daysInMonth) / 7);
    const rowTop = function (row) {
      return rowCount > 5 ? ROW_TOP[0] + row * 33 : ROW_TOP[row];
    };

    DAY_IDS.forEach(function (id, index) {
      const wrapper = document.getElementById(id);
      const headline = q(id);
      const dayNumber = index + 1;
      if (!wrapper || !headline) return;

      if (dayNumber > daysInMonth) {
        wrapper.style.display = "none";
        return;
      }

      wrapper.style.display = "block";
      headline.textContent = String(dayNumber);

      const cell = mondayFirstIndex + dayNumber - 1;
      const row = Math.floor(cell / 7);
      const col = cell % 7;
      wrapper.style.left = COL_LEFT[col] + "px";
      wrapper.style.top = rowTop(row) + "px";

      const selected = dayNumber === info.day;
      headline.style.setProperty(
        "color",
        selected ? "rgb(164, 107, 97)" : "rgb(255, 255, 255)",
        "important",
      );
      headline.style.setProperty(
        "font-weight",
        selected ? "700" : "400",
        "important",
      );
    });

    /* =====================================================
   ĐẶT TRÁI TIM ĐÚNG NGÀY CƯỚI
   ===================================================== */

    const selectedCell = mondayFirstIndex + info.day - 1;

    const selectedRow = Math.floor(selectedCell / 7);

    const selectedCol = selectedCell % 7;

    const marker = document.getElementById("SHAPE1");

    if (
      marker &&
      ROW_TOP[selectedRow] !== undefined &&
      COL_LEFT[selectedCol] !== undefined
    ) {
      /* Canh giữa tim trong ô ngày */
      const markerLeft = COL_LEFT[selectedCol] + 6.2;

      const markerTop = rowTop(selectedRow) - 6;

      marker.style.setProperty("left", markerLeft + "px", "important");

      marker.style.setProperty("top", markerTop + "px", "important");

      marker.style.setProperty("display", "block", "important");

      marker.style.setProperty("z-index", "1", "important");

      /* ==========================
     Đưa số ngày cưới lên trên tim
     ========================== */

      const selectedDayId = DAY_IDS[info.day - 1];

      const selectedDay = document.getElementById(selectedDayId);

      const selectedHeadline = q(selectedDayId);

      if (selectedDay) {
        selectedDay.style.setProperty("z-index", "2", "important");
      }

      if (selectedHeadline) {
        selectedHeadline.style.setProperty("color", "#a46b61", "important");

        selectedHeadline.style.setProperty("font-weight", "700", "important");
      }
    }
  }

  function applyAlbumAndThanks() {
    if (c.album) {
      if (c.album.first) setText("HEADLINE107", c.album.first);
      if (c.album.second) setText("HEADLINE108", c.album.second);
    }

    if (c.thankYouText) setHtml("HEADLINE86", c.thankYouText + "<br>");
    if (c.signoff) setHtml("HEADLINE87", c.signoff + "<br>");
  }

  function applyImages() {
    const images = c.images || {};

    setImage("IMAGE5", images.cover);
    setImage("IMAGE14", images.invitation);
    setImage("IMAGE16", images.calendar);
    setImage("IMAGE54", images.albumIntro);
    setImage("IMAGE55", images.albumCover);
    setImage("IMAGE43", images.footer);
  }

  /* =========================================================
     MUSIC - tạo bằng JS để nút không còn nằm sai trong <head>
     ========================================================= */
  function initMusic() {
    const sourceMusic = c.music || {};
    const m = {
      enabled: sourceMusic.enabled !== false,
      track:
        asText(sourceMusic.track).trim() ||
        "https://files.catbox.moe/bcba42.mp3",
      fallbackTrack: asText(sourceMusic.fallbackTrack).trim(),
      volume: sourceMusic.volume === undefined ? 0.65 : sourceMusic.volume,
      loop: sourceMusic.loop !== false,
      startOnFirstGesture: sourceMusic.startOnFirstGesture !== false,
    };
    const enabled = m.enabled !== false;
    const primaryTrack = asText(m.track).trim();
    const fallbackTrack = asText(m.fallbackTrack).trim();

    const oldButton = document.getElementById("music-toggle");
    const oldAudio = document.getElementById("wedding-music");
    if (oldButton) oldButton.remove();
    if (oldAudio) oldAudio.remove();

    if (!enabled || !primaryTrack) return;

    const audio = document.createElement("audio");
    audio.id = "wedding-music";
    audio.preload = "none";
    audio.loop = m.loop !== false;
    audio.playsInline = true;

    const volume = Number(m.volume);
    audio.volume = Number.isFinite(volume)
      ? Math.max(0, Math.min(1, volume))
      : 0.65;
    audio.src = primaryTrack;

    const button = document.createElement("button");
    button.id = "music-toggle";
    button.type = "button";
    button.setAttribute("aria-label", "Bật nhạc");
    button.setAttribute("aria-pressed", "false");
    button.title = "Bật nhạc";
    button.innerHTML =
      '<svg id="music-icon" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">' +
      '<path d="M42 9.5c1.2-.35 2.4.55 2.4 1.8v27.15c0 5.15-4.35 9.35-9.7 9.35-4.65 0-8.4-3.1-8.4-6.95s3.75-6.95 8.4-6.95c1.75 0 3.4.45 4.75 1.25V21.2l-18.9 5.35v19.1c0 5.15-4.35 9.35-9.7 9.35-4.65 0-8.4-3.1-8.4-6.95s3.75-6.95 8.4-6.95c1.75 0 3.4.45 4.75 1.25V20.3c0-1.05.7-2 1.7-2.3L42 9.5Z"></path>' +
      '<path d="M51.7 18.2c1.1-2 4-2 5.1 0 .65 1.2.45 2.7-.55 3.7l-4.55 4.45-4.55-4.45c-1-.95-1.2-2.5-.55-3.7 1.1-2 4-2 5.1 0Z" opacity="0.9"></path>' +
      '</svg><span id="music-slash"></span>';

    document.body.appendChild(audio);
    document.body.appendChild(button);

    let fallbackUsed = false;
    let playPending = false;

    function syncButton() {
      const playing = !audio.paused && !audio.ended;
      button.classList.toggle("playing", playing);
      button.setAttribute("aria-pressed", playing ? "true" : "false");
      button.setAttribute("aria-label", playing ? "Tắt nhạc" : "Bật nhạc");
      button.title = playing ? "Tắt nhạc" : "Bật nhạc";
    }

    async function playMusic() {
      if (playPending) return;
      playPending = true;
      button.classList.remove("music-error");

      try {
        await audio.play();
      } catch (err) {
        console.warn("Wedding music: không thể phát nhạc.", err);
        button.classList.add("music-error");
        button.title = "Không tải được nhạc - chạm để thử lại";
      } finally {
        playPending = false;
        syncButton();
      }
    }

    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (!audio.paused && !audio.ended) {
        audio.pause();
      } else {
        playMusic();
      }
    });

    audio.addEventListener("play", syncButton);
    audio.addEventListener("pause", syncButton);

    audio.addEventListener("error", function () {
      if (
        !fallbackUsed &&
        fallbackTrack &&
        audio.src !== absoluteUrl(fallbackTrack)
      ) {
        fallbackUsed = true;
        audio.src = fallbackTrack;
        return;
      }
      button.classList.add("music-error");
      button.title = "Không tải được file nhạc";
      syncButton();
    });

    if (m.startOnFirstGesture !== false) {
      const firstGesture = function (event) {
        if (button.contains(event.target)) return;
        playMusic();
      };
      document.addEventListener("pointerdown", firstGesture, {
        once: true,
        passive: true,
      });
    }

    syncButton();
  }

  /* =========================================================
     GALLERY ĐỘNG - không phụ thuộc LadiPage runtime
     Chỉ tải ảnh cần thiết; ảnh lỗi sẽ bị bỏ qua.
     ========================================================= */
  function parseBackgroundUrl(value) {
    value = asText(value).trim();
    if (!value || value === "none") return "";
    const match = value.match(/^url\(["']?(.*?)["']?\)$/i);
    return match ? match[1] : "";
  }

  function getGallerySources(gallery) {
    const configured =
      c.images && Array.isArray(c.images.gallery)
        ? c.images.gallery
            .filter(function (src) {
              return typeof src === "string" && src.trim() !== "";
            })
            .map(function (src) {
              return src.trim();
            })
        : [];

    if (configured.length) return configured;

    const sources = [];
    gallery
      .querySelectorAll(".ladi-gallery-view-item")
      .forEach(function (item) {
        item.classList.remove("ladi-lazyload");
        const inlineBg = item.style.backgroundImage;
        const computedBg = window.getComputedStyle(item).backgroundImage;
        const src =
          parseBackgroundUrl(inlineBg) || parseBackgroundUrl(computedBg);
        if (src) sources.push(src);
      });
    return sources;
  }

  function initDynamicGallery() {
    const gallery = document.getElementById("GALLERY2");
    if (!gallery || gallery.dataset.weddingGalleryReady === "1") return;

    const view = gallery.querySelector(".ladi-gallery-view");
    const control = gallery.querySelector(".ladi-gallery-control");
    const controlBox = gallery.querySelector(".ladi-gallery-control-box");
    if (!view || !control || !controlBox) return;

    const sources = getGallerySources(gallery);
    if (!sources.length) {
      console.warn(
        "Wedding gallery: không tìm thấy ảnh gallery trong config hoặc HTML.",
      );
      return;
    }

    gallery.dataset.weddingGalleryReady = "1";

    view.querySelectorAll(".ladi-gallery-view-item").forEach(function (el) {
      el.remove();
    });
    controlBox
      .querySelectorAll(".ladi-gallery-control-item")
      .forEach(function (el) {
        el.remove();
      });

    const prevButton = view.querySelector(".ladi-gallery-view-arrow-left");
    const nextButton = view.querySelector(".ladi-gallery-view-arrow-right");

    control
      .querySelectorAll(".ladi-gallery-control-arrow")
      .forEach(function (arrow) {
        arrow.style.setProperty("display", "none", "important");
      });

    const viewItems = [];
    const thumbs = [];

    sources.forEach(function (src, index) {
      const viewItem = document.createElement("div");
      viewItem.className = "ladi-gallery-view-item";
      viewItem.dataset.index = String(index);
      viewItem.dataset.src = src;
      view.appendChild(viewItem);
      viewItems.push(viewItem);

      const thumb = document.createElement("div");
      thumb.className = "ladi-gallery-control-item";
      thumb.dataset.index = String(index);
      thumb.dataset.src = src;
      thumb.setAttribute("role", "button");
      thumb.setAttribute("tabindex", "0");
      thumb.setAttribute("aria-label", "Xem ảnh cưới " + (index + 1));
      controlBox.appendChild(thumb);
      thumbs.push(thumb);
    });

    const failed = new Set();
    const cache = new Map();
    let currentIndex = 0;
    let requestToken = 0;

    function loadSource(index) {
      if (failed.has(index)) return Promise.reject(new Error("image failed"));
      if (cache.has(index)) return cache.get(index);

      const promise = new Promise(function (resolve, reject) {
        const img = new Image();
        img.decoding = "async";
        img.onload = function () {
          resolve(sources[index]);
        };
        img.onerror = function () {
          reject(new Error("Không tải được " + sources[index]));
        };
        img.src = sources[index];
      }).catch(function (err) {
        failed.add(index);
        const viewItem = viewItems[index];
        const thumb = thumbs[index];
        if (viewItem) viewItem.style.display = "none";
        if (thumb) thumb.style.display = "none";
        throw err;
      });

      cache.set(index, promise);
      return promise;
    }

    function activeCount() {
      return sources.length - failed.size;
    }

    function findCandidate(start, direction) {
      if (!sources.length) return -1;
      const dir = direction >= 0 ? 1 : -1;
      let index = ((start % sources.length) + sources.length) % sources.length;

      for (let tries = 0; tries < sources.length; tries += 1) {
        if (!failed.has(index)) return index;
        index = (index + dir + sources.length) % sources.length;
      }
      return -1;
    }

    function updateArrows() {
      const show = activeCount() > 1;
      [prevButton, nextButton].filter(Boolean).forEach(function (button) {
        button.classList.remove("opacity-0");
        button.style.setProperty(
          "display",
          show ? "block" : "none",
          "important",
        );
        button.style.setProperty("opacity", show ? "1" : "0", "important");
        button.style.setProperty(
          "visibility",
          show ? "visible" : "hidden",
          "important",
        );
      });
    }

    function scrollThumbIntoView(index) {
      const thumb = thumbs[index];
      if (!thumb || thumb.style.display === "none") return;

      const target =
        thumb.offsetLeft - control.clientWidth / 2 + thumb.offsetWidth / 2;
      if (typeof control.scrollTo === "function") {
        control.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
      } else {
        control.scrollLeft = Math.max(0, target);
      }
    }

    function renderCurrent(index, scrollThumb) {
      currentIndex = index;
      viewItems.forEach(function (item, i) {
        const active = i === index;
        item.classList.toggle("selected", active);
        item.style.setProperty(
          "display",
          active ? "block" : "none",
          "important",
        );
        item.style.setProperty("left", "0", "important");
        item.style.setProperty("top", "0", "important");
        item.style.setProperty("transform", "none", "important");
      });

      thumbs.forEach(function (thumb, i) {
        const active = i === index;
        thumb.classList.toggle("selected", active);
        thumb.setAttribute("aria-current", active ? "true" : "false");
      });

      updateArrows();
      if (scrollThumb !== false) scrollThumbIntoView(index);
    }

    function canPrefetch() {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      if (!connection) return true;
      if (connection.saveData) return false;
      return !/2g|3g/.test(connection.effectiveType || "");
    }

    function prefetchNext(index) {
      if (!canPrefetch() || activeCount() < 2) return;
      const next = findCandidate(index + 1, 1);
      if (next < 0 || next === index) return;

      const work = function () {
        loadSource(next).catch(function () {
          updateArrows();
        });
      };

      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(work, { timeout: 1200 });
      } else {
        setTimeout(work, 350);
      }
    }

    async function showSlide(requested, direction, scrollThumb) {
      const token = ++requestToken;
      let index = findCandidate(requested, direction || 1);
      let tries = 0;

      while (index >= 0 && tries < sources.length) {
        try {
          const src = await loadSource(index);
          if (token !== requestToken) return;

          viewItems[index].style.setProperty(
            "background-image",
            'url("' + cssUrl(src) + '")',
            "important",
          );
          renderCurrent(index, scrollThumb);
          prefetchNext(index);
          return;
        } catch (err) {
          console.warn("Wedding gallery: bỏ qua ảnh lỗi", sources[index]);
          updateArrows();
          if (activeCount() <= 0) {
            gallery.style.display = "none";
            return;
          }
          index = findCandidate(index + (direction || 1), direction || 1);
          tries += 1;
        }
      }
    }

    thumbs.forEach(function (thumb, index) {
      function activate(event) {
        event.preventDefault();
        event.stopPropagation();
        showSlide(index, 1, true);
      }

      thumb.addEventListener("click", activate);
      thumb.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") activate(event);
      });
    });

    if ("IntersectionObserver" in window) {
      const thumbObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            const thumb = entry.target;
            const index = Number(thumb.dataset.index);

            loadSource(index)
              .then(function (src) {
                thumb.style.setProperty(
                  "background-image",
                  'url("' + cssUrl(src) + '")',
                  "important",
                );
              })
              .catch(function () {
                updateArrows();
              });

            thumbObserver.unobserve(thumb);
          });
        },
        { root: control, rootMargin: "0px 180px", threshold: 0.01 },
      );

      thumbs.forEach(function (thumb) {
        thumbObserver.observe(thumb);
      });
    } else {
      thumbs.forEach(function (thumb, index) {
        loadSource(index)
          .then(function (src) {
            thumb.style.setProperty(
              "background-image",
              'url("' + cssUrl(src) + '")',
              "important",
            );
          })
          .catch(function () {});
      });
    }

    if (prevButton) {
      prevButton.setAttribute("role", "button");
      prevButton.setAttribute("aria-label", "Ảnh trước");
      prevButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        showSlide(currentIndex - 1, -1, true);
      });
    }

    if (nextButton) {
      nextButton.setAttribute("role", "button");
      nextButton.setAttribute("aria-label", "Ảnh tiếp theo");
      nextButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        showSlide(currentIndex + 1, 1, true);
      });
    }

    let touchStartX = null;
    let touchStartY = null;

    view.addEventListener(
      "touchstart",
      function (event) {
        if (!event.touches || !event.touches.length) return;
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
      },
      { passive: true },
    );

    view.addEventListener(
      "touchend",
      function (event) {
        if (
          touchStartX === null ||
          touchStartY === null ||
          !event.changedTouches ||
          !event.changedTouches.length
        ) {
          touchStartX = null;
          touchStartY = null;
          return;
        }

        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;
        const dx = endX - touchStartX;
        const dy = endY - touchStartY;
        touchStartX = null;
        touchStartY = null;

        if (Math.abs(dx) < 45 || Math.abs(dx) <= Math.abs(dy)) return;
        if (dx < 0) showSlide(currentIndex + 1, 1, true);
        else showSlide(currentIndex - 1, -1, true);
      },
      { passive: true },
    );

    gallery.style.visibility = "visible";
    updateArrows();
    showSlide(0, 1, false);
  }

  /* =========================================================
   COUNTDOWN NGÀY CƯỚI
   ========================================================= */

  function initWeddingCountdown() {
    const w = c.wedding || {};

    const daysEl = document.getElementById("countdown-days");

    const hoursEl = document.getElementById("countdown-hours");

    const minutesEl = document.getElementById("countdown-minutes");

    const secondsEl = document.getElementById("countdown-seconds");

    const countdown = document.getElementById("wedding-countdown");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
      return;
    }

    /*
    Ưu tiên countdownTo vì có timezone
    rõ ràng.
  */
    let target = null;

    if (w.countdownTo) {
      target = new Date(w.countdownTo);
    } else {
      /*
      Fallback nếu chưa khai báo
      countdownTo.
    */
      const year = parseInt(w.year, 10);

      const month = parseInt(w.month, 10);

      const day = parseInt(w.day, 10);

      let hour = 0;
      let minute = 0;

      if (w.time) {
        const parts = String(w.time).split(":");

        hour = parseInt(parts[0], 10) || 0;

        minute = parseInt(parts[1], 10) || 0;
      }

      target = new Date(year, month - 1, day, hour, minute, 0);
    }

    if (!target || Number.isNaN(target.getTime())) {
      console.warn("Countdown: ngày cưới không hợp lệ.");

      return;
    }

    const pad = (number) => String(number).padStart(2, "0");

    let timer = null;

    function update() {
      const now = Date.now();

      let difference = target.getTime() - now;

      /*
      Đã tới ngày cưới
    */
      if (difference <= 0) {
        daysEl.textContent = "00";

        hoursEl.textContent = "00";

        minutesEl.textContent = "00";

        secondsEl.textContent = "00";

        if (countdown) {
          countdown.setAttribute("aria-label", "Ngày hạnh phúc đã đến");
        }

        if (timer) {
          clearInterval(timer);
        }

        return;
      }

      const days = Math.floor(difference / 86400000);

      difference %= 86400000;

      const hours = Math.floor(difference / 3600000);

      difference %= 3600000;

      const minutes = Math.floor(difference / 60000);

      difference %= 60000;

      const seconds = Math.floor(difference / 1000);

      daysEl.textContent = String(days);

      hoursEl.textContent = pad(hours);

      minutesEl.textContent = pad(minutes);

      secondsEl.textContent = pad(seconds);
    }

    update();

    timer = setInterval(update, 1000);
  }

  function apply() {
    revealElements();
    applyMetadata();
    applyCouple();
    applyStoryAndInvitation();
    applyDateSummary();
    applyWeddingDetails();
    applyFamilies();
    applyCalendar();
    applyAlbumAndThanks();
    applyImages();
  }

  function start() {
    apply();
    initDynamicGallery();
    initMusic();
    initWeddingCountdown();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
