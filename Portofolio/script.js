
/* =====================================
   HADASSAH'S PINK CREATIVE WORLD
   Interactive JavaScript
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. ANIMASI ELEMEN SAAT WEBSITE DIBUKA
  const heroElements = document.querySelectorAll(
    ".hero-copy, .hero-art, .hero-footer"
  );

  heroElements.forEach((element, index) => {
    element.classList.add("fade-up");

    setTimeout(() => {
      element.classList.add("show");
    }, 180 * index);
  });


  // 2. ANIMASI SAAT SECTION MASUK KE LAYAR
  const revealElements = document.querySelectorAll(
    ".section-heading, .about-note, .interest-card, " +
    ".work-card, .skill-cloud span, .little-message, .contact-box"
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }


  // 3. EFEK HATI KECIL SAAT KLIK
  const decorations = ["♡", "✿", "✧", "♥", "✦"];

  document.addEventListener("click", (event) => {
    // Jangan menampilkan dekorasi ketika mengklik link atau tombol.
    if (event.target.closest("a, button")) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const heart = document.createElement("span");

    heart.className = "click-decoration";
    heart.textContent =
      decorations[Math.floor(Math.random() * decorations.length)];

    heart.style.left = `${event.clientX}px`;
    heart.style.top = `${event.clientY}px`;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 900);
  });


  // 4. MENU NAVIGASI AKTIF SESUAI SECTION
  const navLinks = document.querySelectorAll(".navbar nav a");
  const sections = document.querySelectorAll(
    "#home, #about, #works, #contact"
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const active =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", active);

            if (active) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }


  // 5. SAPAAN BERDASARKAN WAKTU LOKAL
  const greeting = document.querySelector(".pill");

  if (greeting) {
    const hour = new Date().getHours();

    let message = "HELLO, WORLD! ♡";

    if (hour >= 4 && hour < 11) {
      message = "GOOD MORNING! ☀";
    } else if (hour >= 11 && hour < 15) {
      message = "HAVE A LOVELY DAY! 🌷";
    } else if (hour >= 15 && hour < 18) {
      message = "GOOD AFTERNOON! ✿";
    } else {
      message = "GOOD EVENING! 🌙";
    }

    greeting.textContent = `૮ ˶ᵔ ᵕ ᵔ˶ ა ${message}`;
  }


  // 6. TAHUN OTOMATIS DI FOOTER
  const footer = document.querySelector(".footer p");

  if (footer) {
    footer.textContent =
      `Made with love by Hadassah Geneva Permadi. © ${new Date().getFullYear()}`;
  }


  // 7. FALLBACK GAMBAR JIKA FILE TIDAK DITEMUKAN
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-missing");
      image.alt = "Gambar belum tersedia — silakan tambahkan file gambar.";
    });
  });
});
