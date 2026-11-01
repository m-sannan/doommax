// === CONFIG ===
const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id"; // swap this later
// For now we just console.log

const cards = [
  {
    platform: "reddit",
    username: "r/mildlyinfuriating",
    blurb: "The candy I won’t be handing out today because my wife called me a creep for being excited about trick or treaters",
    meta: "1.2k upvotes · 89 comments",
    image: "https://preview.redd.it/the-candy-i-wont-be-handing-out-today-because-my-wife-v0-pk8uxultdvyh1.jpeg?width=640&crop=smart&auto=webp&s=1931372aa5863684825ce2da353a4128de614092",
    comments: [
      { user: "u/candythief", text: "Those fun size Twix are elite though" },
      { user: "u/notacreep", text: "Your wife is right and you know it" }
    ]
  },
  {
    platform: "x",
    username: "@ReyarthTanwar",
    blurb: "Ye baat to Adani ko WhatsApp pe bhi bol sakte the 😭😭",
    meta: "8.6k likes · 664 reposts",
    image: "https://pbs.twimg.com/media/HV78hFeaAAAcVhS.jpg",
    comments: [
      { user: "@Anirudhhyd", text: "Beautiful comeback my guy😂😂" },
      { user: "@GawaronKabaapp", text: "Bas kar pagle" }
    ]
  },
  {
    platform: "x",
    username: "@Meme_Canteen",
    blurb: "GTA 6 realism may insanely beat RDR 2 . Hey @grok , do you think it will ?",
    meta: "1.3k likes · 67 reposts",
    image: "https://pbs.twimg.com/media/HV90UvtbYAA0s9g.jpg",
    comments: [
      { user: "@grok", text: "Those side-by-sides already look insane. Visuals and density should clear RDR2 easily." },
      { user: "@Anayaa026", text: "RDR2 has set an incredibly high bar." }
    ]
  },
  {
    platform: "x",
    username: "@_jiddu",
    blurb: "Vijay Thalapathi is planing to Ban RSS Tamilnadu. @grok please confirm this",
    meta: "509 likes · 22 replies",
    comments: [
      { user: "@grok", text: "No. Vijay is not planning to ban RSS in Tamil Nadu. The claim is false." },
      { user: "@ABDeBasi", text: "Haha, Vijay allowed RSS parade in 128 places" }
    ]
  },
  {
    platform: "reddit",
    username: "r/GTA6unmoderated",
    blurb: "Unc knows ball",
    meta: "meme · GTA 6",
    comments: [
      { user: "u/gtafan", text: "this is the one" },
      { user: "u/unc", text: "facts" }
    ]
  },
  {
    platform: "instagram",
    username: "Reel",
    blurb: "Short looping reel",
    meta: "65.2k likes · 1,015 comments",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    comments: [
      { user: "user1", text: "this is so good" },
      { user: "user2", text: "need more of these" }
    ]
  },
  {
    platform: "reddit",
    username: "r/mildlyinfuriating",
    blurb: "The candy I won’t be handing out today because my wife called me a creep for being excited about trick or treaters",
    meta: "1.2k upvotes",
    image: "https://preview.redd.it/the-candy-i-wont-be-handing-out-today-because-my-wife-v0-pk8uxultdvyh1.jpeg?width=640&crop=smart&auto=webp&s=1931372aa5863684825ce2da353a4128de614092"
  },
  {
    platform: "x",
    username: "@ReyarthTanwar",
    blurb: "Ye baat to Adani ko WhatsApp pe bhi bol sakte the 😭😭",
    meta: "8.6k likes",
    image: "https://pbs.twimg.com/media/HV78hFeaAAAcVhS.jpg"
  },
  {
    platform: "instagram",
    username: "Reel",
    blurb: "Another reel",
    meta: "high engagement",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    platform: "x",
    username: "@Meme_Canteen",
    blurb: "GTA 6 realism may insanely beat RDR 2",
    meta: "1.3k likes",
    image: "https://pbs.twimg.com/media/HV90Uv2a8AIcEEG.jpg"
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

  let commentsHtml = "";
  if (data.comments && data.comments.length) {
    commentsHtml = `<div class="comments">${data.comments.map(c => `<div class="comment"><strong>${c.user}</strong> ${c.text}</div>`).join("")}</div>`;
  }

  let mediaHtml = "";
  if (data.image) {
    mediaHtml = `<div class="media"><img src="${data.image}" alt="" loading="lazy"></div>`;
  } else if (data.video) {
    mediaHtml = `
      <div class="video-wrap">
        <video src="${data.video}" muted loop playsinline preload="auto"></video>
        <div class="play-icon"></div>
      </div>
    `;
  }

  let inner = `
    <span class="platform ${platformClass}">${platformLabel}</span>
    <div class="card-content">
      <div class="username">${data.username}</div>
      <div class="blurb">${data.blurb.replace(/\n/g, "<br>")}</div>
      ${mediaHtml}
      <div class="meta">${data.meta}</div>
      ${commentsHtml}
    </div>
  `;

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
          video.play().catch(() => {});
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
    form.reset();
    alert("You're on the list. The void will contact you.");
  });
}

// Init
renderFeed();
setupVideoObserver();
setupInfiniteScroll();
setupEmail();

document.querySelectorAll(".card").forEach((card, i) => {
  card.style.animationDelay = `${(i % cards.length) * 0.04}s`;
});