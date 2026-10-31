// === CONFIG ===
const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id"; // swap this later
// For now we just console.log

const cards = [
  {
    platform: "reddit",
    username: "r/GTA6unmoderated",
    blurb: "Unc knows ball",
    meta: "meme post · GTA 6"
  },
  {
    platform: "x",
    username: "@ReyarthTanwar",
    blurb: "Ye baat to Adani ko WhatsApp pe bhi bol sakte the 😭😭",
    meta: "7.1k likes · 512 reposts"
  },
  {
    platform: "instagram",
    username: "Reel",
    blurb: "Short looping reel",
    meta: "65.2k likes · 1,015 comments",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    platform: "reddit",
    username: "r/mildlyinfuriating",
    blurb: "The candy I won’t be handing out today because my wife called me a creep for being excited about trick or treaters",
    meta: "Halloween post"
  },
  {
    platform: "x",
    username: "@Meme_Canteen",
    blurb: "GTA 6 realism may insanely beat RDR 2 . Hey @grok , do you think it will ?",
    meta: "853 likes · 48 reposts"
  },
  {
    platform: "x",
    username: "@_jiddu",
    blurb: "Vijay Thalapathi is planing to Ban RSS Tamilnadu. @grok please confirm this",
    meta: "51 likes · Grok replied"
  },
  {
    platform: "instagram",
    username: "@post",
    blurb: "Another reel from the feed",
    meta: "likes · comments",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    platform: "reddit",
    username: "r/GTA6unmoderated",
    blurb: "Unc knows ball (again)",
    meta: "community post"
  },
  {
    platform: "x",
    username: "@ReyarthTanwar",
    blurb: "Ye baat to Adani ko WhatsApp pe bhi bol sakte the 😭😭",
    meta: "7.1k likes"
  },
  {
    platform: "instagram",
    username: "Reel",
    blurb: "Looping short",
    meta: "high engagement",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  }
];

const feed = document.getElementById("feed");
let renderedCards = [];

function createCard(data, index) {
  const el = document.createElement("article");
  el.className = `card ${data.platform}`;
  el.dataset.index = index;

  const platformClass = data.platform;
  const platformLabel = data.platform === "x" ? "X" : data.platform.toUpperCase();

  let inner = `
    <span class="platform ${platformClass}">${platformLabel}</span>
    <div class="card-content">
      <div class="username">${data.username}</div>
      <div class="blurb">${data.blurb.replace(/\n/g, "<br>")}</div>
      <div class="meta">${data.meta}</div>
    </div>
  `;

  if (data.video) {
    inner = `
      <div class="video-wrap">
        <video src="${data.video}" muted loop playsinline preload="auto" poster=""></video>
        <div class="play-icon"></div>
      </div>
      ${inner}
    `;
  }

  el.innerHTML = inner;
  return el;
}

function renderFeed() {
  // Duplicate for infinite illusion
  const doubled = [...cards, ...cards];
  doubled.forEach((card, i) => {
    const el = createCard(card, i);
    feed.appendChild(el);
    renderedCards.push(el);
  });
}

function setupVideoObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector("video");
        if (!video) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          video.play().catch(() => {
            // autoplay blocked — leave play icon
          });
        } else {
          video.pause();
        }
      });
    },
    { threshold: [0.55] }
  );

  document.querySelectorAll(".card").forEach((card) => {
    const video = card.querySelector("video");
    if (video) {
      video.addEventListener("error", () => {
        const wrap = card.querySelector(".video-wrap");
        if (wrap) wrap.style.display = "none";
      });
      observer.observe(card);
    }
  });
}

function setupInfiniteScroll() {
  const cardHeight = window.innerHeight;
  const singleSetHeight = cards.length * cardHeight;

  feed.addEventListener("scroll", () => {
    if (feed.scrollTop >= singleSetHeight) {
      feed.scrollTop -= singleSetHeight;
    }
  });
}

function setupEmail() {
  const form = document.getElementById("email-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    if (!email) return;

    console.log("Email capture (demo):", email);
    // Uncomment and swap endpoint when ready:
    // fetch(FORMSPREE_ENDPOINT, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email })
    // });

    form.reset();
    alert("You're on the list. The void will contact you.");
  });
}

// Init
renderFeed();
setupVideoObserver();
setupInfiniteScroll();
setupEmail();

// Stagger fade-in a bit
document.querySelectorAll(".card").forEach((card, i) => {
  card.style.animationDelay = `${(i % cards.length) * 0.04}s`;
});