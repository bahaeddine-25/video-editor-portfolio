 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyC4QAkxEgTKroh9hBBZ92NsMtDHHXA5_Ds",
      authDomain: "video-editor-reviews.firebaseapp.com",
      projectId: "video-editor-reviews",
      storageBucket: "video-editor-reviews.appspot.com",
      messagingSenderId: "321617032971",
      appId: "1:321617032971:web:ec6196170580233a36140e",
      measurementId: "G-936T66PF37"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    async function loadReviews() {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      const container = document.getElementById("reviews-container");
      container.innerHTML = "";

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const div = document.createElement("div");
        div.className = "review-card";
        div.innerHTML = `<h4>${data.name} - ★${data.rating}</h4><p>${data.message}</p>`;
        container.appendChild(div);
      });
    }

    loadReviews();

    document.getElementById("review-form").addEventListener("submit", async (e) => {
      e.preventDefault()});

      const name = document.getElementById("name").value;
      const rating = parseInt(document.getElementById("rating").value);
      const message = document.getElementById("message").value;

      if (!name || !rating || !message) return;

      await addDoc(collection(db, "reviews"), {
        name,
        rating,
        message,
        createdAt: serverTimestamp()
      });

      // إعادة تحميل التقييمات وعرضها
      loadReviews();
      document.getElementById("review-form").reset();
      document.getElementById("review-form").style.display = 'none';