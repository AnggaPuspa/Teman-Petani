const productOnSearch = document.getElementById("searchBararticles");
const articlesContainer = document.getElementById("wrapperArticles");
const allButton = document.getElementById("allArticles");
const popularButton = document.getElementById("popularArticles");
const newestButton = document.getElementById("newestArticles");
const showMoreButton = document.getElementById("showMore");


const articlesData = [
  {
    id: 1,
    subtitle: "Pertanian",
    category: "POPULAR",
    img: "../assets/images/Blog-Penggerek-Batang-Padi.jpeg",
    title: "Mengenal Hama Penggerek Batang Padi dan Cara Pengendaliannya",
    href: "/pages/blog.html",
  },
  {
    id: 2,
    subtitle: "Pertanian",
    category: "POPULAR",
    img: "../assets/images/_Strategi-Pemanfaatan-Lahan-Sempit-Pinggiran-Kota-dengan-Budidaya-Tanaman-Sayuran_15878.jpg",
    title: "Alternatif Budidaya Tanaman Sayuran di Lahan Terbatas",
    href: "../detail/detail.html?articlesId=2",
  },
  {
    id: 3,
    subtitle: "Pertanian",
    category: "POPULAR",
    img: "https://lampost.co/wp-content/uploads/2024/08/padi.jpg",
    title: "Pentingnya Pemilihan Varietas Padi yang Sesuai dengan Kondisi Lahan",
    href: "../detail/detail.html?articlesId=3",
  },
  {
    id: 4,
    subtitle: "Pertanian",
    category: "NEWEST",
    img: "../assets/images/petani-oki.jpeg",
    title: "Pupuk Organik vs. Pupuk Kimia, Mana yang Lebih Baik untuk Padi?",
    href: "../detail/detail.html?articlesId=4",
  },
  {
    id: 5,
    subtitle: "Pertanian",
    category: "NEWEST",
    img: "../assets/images/images.jpg",
    title: "Solusi Meningkatkan Produksi Padi",
    href: "../detail/detail.html?articlesId=5",
  },
  {
    id: 6,
    subtitle: "Pertanian",
    category: "NEWEST",
    img: "/assets/images/antarafoto-target-produksi-beras-2024-301223-yn-1_ratio-16x9.jpg",
    title: "Dampak Perubahan Iklim terhadap Produksi Padi di Indonesia",
    href: "../detail/detail.html?articlesId=6",
  },
  {
    id: 7,
    subtitle: "Pertanian",
    category: "POPULAR",
    img: "/assets/images/20191218084856-apa-saja-kandungan-dalam-sayur-dan-buah-untuk-kesehatan-tubuh-66.jpg",
    title: "Sayuran sebagai Sumber Vitamin dan Mineral",
    href: "../detail/detail.html?articlesId=7",
  },
  {
    id: 8,
    subtitle: "Pertanian",
    category: "POPULAR",
    img: "/assets/images/images (1).jpg",
    title: "Sayuran sebagai Bahan Baku Industri Pengolahan Makanan",
    href: "../detail/detail.html?articlesId=8",
  },
  {
    id: 9,
    subtitle: "Pertanian",
    category: "NEWEST",
    img: "/assets/images/images (2).jpg",
    title: "Buah-buahan yang Baik untuk Diet",
    href: "../detail/detail.html?articlesId=9",
  },
];

const moreArticlesData = [
  {
    id: 10,
    subtitle: "Pertanian",
    category: "NEWEST",
    img: "/assets/images/robotika-64889a9c08a8b555903f78a2.jpg",
    title: "Teknologi Pertanian Berkelanjutan untuk Masa Depan",
    href: "../detail/detail.html?articlesId=10",
  },
  {
    id: 11,
    subtitle: "Pertanian",
    category: "NEWEST",
    img: "/assets/images/pandasarjana.id-30-586x385.png",
    title: "Inovasi dalam Teknik Irigasi untuk Meningkatkan Hasil Pertanian",
    href: "../detail/detail.html?articlesId=11",
  },
  {
    id: 12,
    subtitle: "Pertanian",
    category: "NEWEST",
    img: "/assets/images/images (3).jpg",
    title: "Menghadapi Tantangan Pertanian di Era Perubahan Iklim",
    href: "../detail/detail.html?articlesId=12",
  },
];


const allArticlesData = [...articlesData, ...moreArticlesData];


const articlesCard = ({ id, subtitle, img, title }) => `
  <div class="card">
    <div class="img-box">
      <img src="${img}" class="img-card" alt="Gambar Artikel">
    </div>
    <div class="content">
      <div class="text">
        <p class="subtitle">${subtitle}</p>
        <p class="title">${title}</p>
        <div class="price">
          <a href="detail.html?articlesId=${id}"> <span class="value">Baca</span> </a>
        </div>
      </div>
    </div>
  </div>
`;


function updateProductList(data) {
  const html = data.map(articlesCard).join("");
  articlesContainer.innerHTML = html;
}

function filterarticles(category) {
  const filteredData = allArticlesData.filter(
    ({ category: prodCategory }) => prodCategory === category
  );
  updateProductList(filteredData);
}

allButton.addEventListener("click", () => {
  allButton.classList.add("active");
  popularButton.classList.remove("active");
  newestButton.classList.remove("active");
  showMoreButton.textContent = "Lebih Banyak";
  showMoreButton.classList.remove("less");
  updateProductList(articlesData); 
});


popularButton.addEventListener("click", () => {
  allButton.classList.remove("active");
  popularButton.classList.add("active");
  newestButton.classList.remove("active");
  showMoreButton.textContent = "Lebih Banyak";
  showMoreButton.classList.remove("less");
  filterarticles("POPULAR"); 
});


newestButton.addEventListener("click", () => {
  allButton.classList.remove("active");
  popularButton.classList.remove("active");
  newestButton.classList.add("active");
  showMoreButton.textContent = "Lebih Banyak";
  showMoreButton.classList.remove("less");
  filterarticles("NEWEST");
});


showMoreButton.addEventListener("click", () => {
  if (!showMoreButton.classList.contains("less")) {
    showMoreButton.textContent = "Lebih Sedikit";
    showMoreButton.classList.add("less");
    updateProductList(allArticlesData); 
  } else {
    showMoreButton.textContent = "Lebih Banyak";
    showMoreButton.classList.remove("less");
    updateProductList(articlesData); 
  }
});

updateProductList(articlesData);
