(function () {
  const collections = [
    {
      slug: 'abstrato',
      name: 'Abstrato',
      description: 'Formas, cores e movimento para espaços com personalidade.',
      images: [
        'WhatsApp Image 2026-09-16 at 13.50.27 (1).jpeg',
        'WhatsApp Image 2026-09-16 at 13.50.27 (2).jpeg',
        'WhatsApp Image 2026-09-16 at 13.50.27.jpeg',
        'WhatsApp Image 2026-09-16 at 13.50.28.jpeg'
      ]
    },
    {
      slug: 'jesus',
      name: 'Jesus',
      description: 'Obras que levam fé, presença e significado para o ambiente.',
      images: [
        'WhatsApp Image 2026-09-16 at 13.50.12 (1).jpeg',
        'WhatsApp Image 2026-09-16 at 13.50.12 (2).jpeg',
        'WhatsApp Image 2026-09-16 at 13.50.12 (3).jpeg',
        'WhatsApp Image 2026-09-16 at 13.50.12.jpeg',
        'WhatsApp Image 2026-09-16 at 13.50.13.jpeg'
      ]
    },
    {
      slug: 'minimalista',
      name: 'Minimalista',
      description: 'Composições leves e essenciais para uma decoração atemporal.',
      images: [
        'WhatsApp Image 2026-09-16 at 13.50.46 (1).jpeg',
        'WhatsApp Image 2026-09-16 at 13.50.46 (2).jpeg',
        'WhatsApp Image 2026-09-16 at 13.50.46.jpeg',
        'WhatsApp Image 2026-09-16 at 13.50.47.jpeg'
      ]
    }
  ];

  const collectionGrid = document.getElementById('collectionGrid');
  const collectionTitle = document.getElementById('collectionTitle');
  const collectionBack = document.getElementById('collectionBack');
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeBtn = document.getElementById('lightboxClose');
  const imagePath = function (collection, fileName) {
    return 'Assets/Images/' + collection.name + '/' + encodeURIComponent(fileName);
  };

  function renderCollections() {
    collectionTitle.textContent = 'Coleções';
    collectionBack.hidden = true;
    collectionBack.href = './Index.html#colecao';
    collectionGrid.className = 'collection-grid';
    collectionGrid.innerHTML = collections.map(function (collection) {
      const cover = imagePath(collection, collection.images[0]);
      return '<a class="collection-card" href="' + collection.name + '.html">' +
        '<div class="collection-cover"><img src="' + cover + '" alt="Capa da coleção ' + collection.name + '"></div>' +
        '<div class="collection-card-info"><span class="collection-number">' + String(collection.images.length).padStart(2, '0') + ' obras</span>' +
        '<h3>' + collection.name + '</h3><p>' + collection.description + '</p><span class="collection-link">Ver coleção →</span></div>' +
        '</a>';
    }).join('');
  }

  function renderCollection(collection) {
    collectionTitle.textContent = collection.name;
    collectionBack.hidden = false;
    collectionBack.href = document.body.dataset.collection ? './Index.html#colecao' : '#colecao';
    collectionGrid.className = 'gallery';
    collectionGrid.innerHTML = collection.images.map(function (fileName, index) {
      const src = imagePath(collection, fileName);
      return '<article class="art-card"><div class="image-wrap"><img src="' + src + '" alt="Obra ' + (index + 1) + ' da coleção ' + collection.name + '"></div>' +
        '<div class="art-info"><span class="number">' + String(index + 1).padStart(2, '0') + '</span><div><h3>' + collection.name + ' ' + (index + 1) + '</h3><p>Disponível para personalização.</p></div></div></article>';
    }).join('');
    bindLightboxes();
  }

  function renderRoute() {
    const pageCollection = document.body.dataset.collection;
    if (pageCollection) {
      const collectionPage = collections.find(function (item) { return item.slug === pageCollection; });
      if (collectionPage) {
        renderCollection(collectionPage);
        return;
      }
    }
    const slug = window.location.hash.split('/')[1];
    const collection = collections.find(function (item) { return item.slug === slug; });
    if (collection) {
      renderCollection(collection);
    } else {
      renderCollections();
    }
  }

  function bindLightboxes() {
    collectionGrid.querySelectorAll('.image-wrap img').forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || 'Obra ampliada';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox || event.target === lightboxImage) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

  window.addEventListener('hashchange', renderRoute);
  renderRoute();
})();