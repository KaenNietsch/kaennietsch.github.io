document.addEventListener('DOMContentLoaded', () => {
    let products = null;
    let currentMusic = null; // Şu anda çalan müzik için global değişken
    let currentPlayBtn = null; // Şu anda aktif olan play butonu



    // JSON dosyasından verileri al
    const initApp = () => {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                products = data;
                addDataToHTML();
            });
    };
    initApp();

    function addDataToHTML() {
        const listProduct = document.querySelector('.listProduct');
        listProduct.innerHTML = '';

        // Verileri filtrele ve ekleyin
        if (products != null) {
            products.forEach(product => {
                if (matchesFilters(product, filters)) {
                    let newProduct = createProductElement(product);
                    listProduct.appendChild(newProduct);
                }
            });
        }
    }

    // Function to check if a product matches the filter criteria
    const matchesFilters = (product, filters) => {
        return filters.artists.includes(product.artist) &&
            filters.types.includes(product.type) &&
            product.tags.some(tag => filters.tags.includes(tag)) &&
            filters.keys.includes(product.key);
        // Add other filter criteria as needed
    };

    // Function to apply filters and update product list
    const applyFilters = () => {
        // Simulate fetching filter data from JSON
        fetch('filter.json')
            .then(response => response.json())
            .then(filters => {
                // Filter products based on updated filters
                addDataToHTML(filters);
            });
    };

    function createProductElement(product) {
        let newProduct = document.createElement('a');
        newProduct.classList.add('item');
        newProduct.innerHTML = `
            <div class="item-content">
                <div class="cover-container">
                    <h1 class="like">&#9825;</h1>
                    <img src="${product.image}" alt="">
                    <i class="play-button" title="Play" data-sound="${product.sound}">▶</i>
                </div>
                <h2 data-id="${product.id}">${product.name}</h2>
                <h2 class="prop">
                    <span class="material-symbols-outlined">music_note</span>
                    ${product.key}
                    <span class="material-symbols-outlined">schedule</span>
                    ${product.bpm + ' BPM'}
                </h2>
                <h2 id="Artist">
                    <span class="material-symbols-outlined">artist</span>
                    ${product.artist}
                </h2>
                <div class="price">$${product.price}</div>
                <div class="process">
                    <button class="purchase">Purchase</button>
                    <button class="add">Add To Cart</button>
                </div>
                <div class="desc">${product.desc}</div>
            </div>
        `;

        const addButton = newProduct.querySelector('.process .add');
        addButton.addEventListener('click', () => {
            addToCart(product);
            displayCart();
        });

        newProduct.querySelector('.like').addEventListener('click', function() {
            if (this.innerHTML === '♡') {
                like(product);
            } else {
                dontLike(product);
            }
            display();
        });

        function addToCart(prod) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(prod);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${prod.name} Added to Cart!`);
        }

        function like(prod) {
            let fav = JSON.parse(localStorage.getItem('favorites')) || [];
            fav.push(prod);
            localStorage.setItem('favorites', JSON.stringify(fav));
            alert(`${prod.name} Added to Favorites!`);
        }

        function dontLike(prod) {
            let fav = JSON.parse(localStorage.getItem('favorites')) || [];
            let index = fav.findIndex(item => item.id === prod.id);
            if (index !== -1) {
                fav.splice(index, 1);
                localStorage.setItem('favorites', JSON.stringify(fav));
                alert(`${prod.name} Deleted from Favorites!`);
            }
        }

        function display() {
            let fav = JSON.parse(localStorage.getItem('favorites')) || [];
            const likeButton = newProduct.querySelector('.like');
        
            if (fav.some(item => item.id === product.id)) {
                likeButton.innerHTML = '&#10084;'; // ❤️
                likeButton.style.color = '#ff6347'; // Kırmızı renk
            } else {
                likeButton.innerHTML = '&#9825;'; // ♡
                likeButton.style.color = '';
            }
        }

        function displayCart() {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
            if (cart.some(item => item.id === product.id)) {
                addButton.innerHTML = 'Added';
            } else {
                addButton.innerHTML = 'Add To Cart';
            }
        }

        let h2Element = newProduct.querySelector('h2');
        h2Element.addEventListener('click', function() {
            window.location.href = '/detail.html?id=' + product.id;
        });
        h2Element.style.cursor = 'pointer';

        newProduct.querySelector('.item-content').style.backgroundColor = '#f0f0f0';
        newProduct.querySelector('.item-content').style.padding = '20px';
        newProduct.querySelector('.item-content').style.borderRadius = '8px';

        newProduct.querySelector('.cover-container').style.position = 'relative';
        newProduct.querySelector('.cover-container').style.textAlign = 'center';
        newProduct.querySelector('.cover-container').style.marginBottom = '10px';

        newProduct.querySelector('.cover-container img').style.maxWidth = '100%';
        newProduct.querySelector('.cover-container img').style.borderRadius = '5px';

        newProduct.querySelector('.play-button').style.position = 'absolute';
        newProduct.querySelector('.play-button').style.top = '50%';
        newProduct.querySelector('.play-button').style.left = '50%';
        newProduct.querySelector('.play-button').style.transform = 'translate(-50%, -50%)';
        newProduct.querySelector('.play-button').style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        newProduct.querySelector('.play-button').style.color = 'white';
        newProduct.querySelector('.play-button').style.fontSize = '24px';
        newProduct.querySelector('.play-button').style.width = '40px';
        newProduct.querySelector('.play-button').style.height = '40px';
        newProduct.querySelector('.play-button').style.lineHeight = '40px';
        newProduct.querySelector('.play-button').style.borderRadius = '50%';
        newProduct.querySelector('.play-button').style.cursor = 'pointer';

        newProduct.querySelector('.play-button').style.opacity = '0';
        newProduct.querySelector('.play-button').style.transition = 'opacity 1s';

        newProduct.querySelector('.price').style.fontWeight = 'bold';
        newProduct.querySelector('.price').style.marginTop = '10px';

        newProduct.querySelector('.process').style.marginTop = '10px';

        newProduct.querySelector('.purchase').style.padding = '8px 16px';
        newProduct.querySelector('.purchase').style.fontSize = '14px';
        newProduct.querySelector('.purchase').style.cursor = 'pointer';
        newProduct.querySelector('.purchase').style.backgroundColor = '#4CAF50';
        newProduct.querySelector('.purchase').style.color = 'white';
        newProduct.querySelector('.purchase').style.border = 'none';
        newProduct.querySelector('.purchase').style.borderRadius = '5px';

        newProduct.querySelector('.add').style.padding = '8px 16px';
        newProduct.querySelector('.add').style.fontSize = '14px';
        newProduct.querySelector('.add').style.cursor = 'pointer';
        newProduct.querySelector('.add').style.backgroundColor = '#4CAF50';
        newProduct.querySelector('.add').style.color = 'white';
        newProduct.querySelector('.add').style.border = 'none';
        newProduct.querySelector('.add').style.borderRadius = '5px';

        newProduct.querySelector('.desc').style.marginTop = '10px';

        // Ürün üzerine hover olduğunda arka plan resmini değiştirme
        newProduct.addEventListener('mouseenter', function() {
            newProduct.style.transition = 'background-image 1s';
            newProduct.style.backgroundImage = `url("${product.bg}")`;
    
            newProduct.querySelector('.play-button').style.opacity = '1';
            newProduct.querySelector('.play-button').style.transition = 'opacity 1s';
    
        });
    
        newProduct.addEventListener('mouseleave', function() {
            newProduct.style.transition = 'background-image 0.5s';
            newProduct.style.backgroundImage = 'none';
    
            newProduct.querySelector('.play-button').style.opacity = '0';
            newProduct.querySelector('.play-button').style.transition = 'opacity 1s';
    
        });

        // Player kodları
        const playBtn = newProduct.querySelector('.item-content .play-button');
        const music = new Audio(product.sound);
    
        function togglePlay() {
            if (currentMusic && currentMusic !== music) {
                currentMusic.pause();
                currentMusic.currentTime = 0; // Çalan müziği durdur ve başa sar
                currentPlayBtn.textContent = '▶'; // Önceki buton simgesini değiştir
                currentPlayBtn.setAttribute('title', 'Play');
            }
    
            if (music.paused) {
                playMusic(music, playBtn);
            } else {
                pauseMusic(music, playBtn);
            }
        }
    
        function playMusic(music, playBtn) {
            currentMusic = music;
            currentPlayBtn = playBtn;
            music.play();
            playBtn.textContent = '❚❚'; // Pause icon
            playBtn.setAttribute('title', 'Pause');
        }
    
        function pauseMusic(music, playBtn) {
            music.pause();
            playBtn.textContent = '▶'; // Play icon
            playBtn.setAttribute('title', 'Play');
        }
    
        playBtn.addEventListener('click', togglePlay);

        return newProduct;
    }
});
