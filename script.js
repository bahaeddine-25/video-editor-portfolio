

 
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
 document.getElementById('review-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('review-name').value;
    const text = document.getElementById('review-text').value;
    const stars = document.getElementById('review-stars').value;

    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review-card');

    const nameEl = document.createElement('h3');
    nameEl.textContent = name;

    const starsEl = document.createElement('div');
    starsEl.classList.add('stars');
    starsEl.textContent = '★'.repeat(stars) + '☆'.repeat(5 - stars);

    const textEl = document.createElement('p');
    textEl.textContent = text;

    reviewDiv.appendChild(nameEl);
    reviewDiv.appendChild(starsEl);
    reviewDiv.appendChild(textEl);

    document.getElementById('reviews-list').appendChild(reviewDiv);

    this.reset();
  });
import { submitReview, loadReviews } from './firebase.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("review-form");
  const reviewsList = document.getElementById("reviews-list");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("review-name").value;
    const stars = parseInt(document.getElementById("review-stars").value);
    const message = document.getElementById("review-message").value;

    const result = await submitReview(name, stars, message);
    if (result.success) {
      form.reset();
      alert("تم إرسال التقييم بنجاح!");
      renderReviews(); // تحديث القائمة
    } else {
      alert("حدث خطأ أثناء الإرسال");
    }
  });

  async function renderReviews() {
    const reviews = await loadReviews();
    reviewsList.innerHTML = "";
    reviews.forEach((review) => {
      const div = document.createElement("div");
      div.className = "review-card";
      div.innerHTML = `
        <h4>${review.name}</h4>
        <p>${"★".repeat(review.stars)}${"☆".repeat(5 - review.stars)}</p>
        <p>${review.message}</p>
      `;
      reviewsList.appendChild(div);
    });
  }

  renderReviews(); // عرض التقييمات عند التحميل
});
