document.addEventListener('DOMContentLoaded', () => {
    
    // ================= 1. MODAL LOG-IN (Contul Meu) =================
    const loginModal = document.getElementById('loginModal');
    const btnContulMeu = document.getElementById('btnContulMeu');
    const closeModal = document.getElementById('closeModal');

    if (btnContulMeu) {
        btnContulMeu.addEventListener('click', (e) => { 
            e.preventDefault(); 
            loginModal.classList.add('show'); 
        });
    }
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            loginModal.classList.remove('show');
        });
    }

    // ================= 8. COUNTDOWN TIMER FLASH SALE =================
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('mins');
    const secsEl = document.getElementById('secs');

    if (daysEl && hoursEl && minsEl && secsEl) {
        let countDownDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);

        setInterval(function() {
            let now = new Date().getTime();
            let distance = countDownDate - now;

            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerText = days < 10 ? '0' + days : days;
            hoursEl.innerText = hours < 10 ? '0' + hours : hours;
            minsEl.innerText = minutes < 10 ? '0' + minutes : minutes;
            secsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
        }, 1000);
    }

    // ================= 2. MOTOARE PENTRU MODALE (VACANȚE & BLOG) =================
    const detailsModal = document.getElementById('detailsModal');
    const closeDetails = document.getElementById('closeDetails');
    const blogModal = document.getElementById('blogModal');
    const closeBlog = document.getElementById('closeBlog');

    document.addEventListener('click', (e) => {
        if(e.target.closest('.chat-q') || e.target.closest('#chatBtn') || e.target.closest('.sidebar-filters') || e.target.closest('#closeChat') || e.target.closest('#loginModal')) return;

        const blogCard = e.target.closest('.blog-card');
        const card = e.target.closest('.card') || e.target.closest('.masonry-item');
        const banner = e.target.closest('.banner');
        
        // --- A. LOGICĂ PENTRU BLOG (FIXED) ---
        if (blogCard && blogModal) {
            const title = blogCard.querySelector('h3').innerText;
            const tag = blogCard.querySelector('.blog-tag').innerText;
            const desc = blogCard.querySelector('p').innerText;
            const fullContent = blogCard.getAttribute('data-full-text') || "Acesta este un articol extins oferit de experții NovaTravel.";
            const imgDiv = blogCard.querySelector('.blog-img');
            const bgImg = window.getComputedStyle(imgDiv).backgroundImage;

            document.getElementById('blogModalTitle').innerText = title;
            document.getElementById('blogModalTag').innerText = tag;
            
            // Inserăm descrierea scurtă (bold) și textul lung în interior
            const blogContentArea = document.getElementById('blogModalFullContent');
            if(blogContentArea) {
                blogContentArea.innerHTML = `
                    <p style="font-weight: 700; margin-bottom: 20px; color: #0A192F;">${desc}</p>
                    <p style="white-space: pre-line;">${fullContent}</p>
                `;
            }

            document.getElementById('blogModalImg').style.backgroundImage = bgImg;
            blogModal.classList.add('show');
            return;
        }

        // --- B. LOGICĂ PENTRU OFERTE (FIXED CU ICONIȚE) ---
        if (card || banner) {
            const element = card || banner;
            const titleElement = element.querySelector('h3');
            if(!titleElement) return;
            
            const title = titleElement.innerText;
            const priceElement = element.querySelector('.price-new') || element.querySelector('.masonry-badge') || element.querySelector('b');
            const price = priceElement ? priceElement.innerText : "La cerere";
            
            const customRating = element.getAttribute('data-rating') || "⭐⭐⭐⭐⭐";
            const customReviews = element.getAttribute('data-reviews') || "120";
            const customIncludes = element.getAttribute('data-includes');

            let bgImg;
            const imgTag = element.querySelector('img');
            if (imgTag) {
                bgImg = `url("${imgTag.src}")`;
            } else {
                const imgDiv = element.querySelector('.card-img') || element;
                bgImg = window.getComputedStyle(imgDiv).backgroundImage;
            }

            document.getElementById('modalTitle').innerText = title;
            document.getElementById('modalPrice').innerText = price;
            document.getElementById('modalImg').style.backgroundImage = bgImg;
            document.getElementById('modalRating').innerHTML = `${customRating} <span style="font-size: 14px; color:#64748B;">(${customReviews} recenzii)</span>`;

            const includeList = document.getElementById('modalIncludes');
            if(includeList) {
                includeList.innerHTML = ''; 
                let items = customIncludes ? customIncludes.split('|') : ["Zbor inclus", "Cazare Premium", "Transfer aeroport", "Asigurare inclusă"];

                items.forEach(text => {
                    const li = document.createElement('li');
                    let icon = "✅"; // Default
                    const t = text.toLowerCase();
                    if(t.includes("zbor") || t.includes("avion")) icon = "✈️";
                    else if(t.includes("cazare") || t.includes("hotel") || t.includes("vila") || t.includes("conac")) icon = "🏨";
                    else if(t.includes("masa") || t.includes("dejun") || t.includes("cina") || t.includes("pensiune") || t.includes("degustare")) icon = "🍽️";
                    else if(t.includes("transfer") || t.includes("autocar") || t.includes("transport") || t.includes("mașină")) icon = "🚐";
                    else if(t.includes("ghid") || t.includes("tur") || t.includes("vizit")) icon = "👨‍🏫";
                    else if(t.includes("asigurare")) icon = "🛡️";
                    else if(t.includes("bilet") || t.includes("intrare") || t.includes("interrail")) icon = "🎟️";
                    else if(t.includes("safari") || t.includes("4x4") || t.includes("explorare")) icon = "🦁";
                    else if(t.includes("yoga") || t.includes("spa") || t.includes("thermal")) icon = "🧘‍♂️";
                    else if(t.includes("snorkeling") || t.includes("apa") || t.includes("croaziera") || t.includes("plajă")) icon = "🌊";

                    li.innerHTML = `<span style="margin-right:10px; font-size: 18px;">${icon}</span> ${text}`;
                    includeList.appendChild(li);
                });
            }

            if(detailsModal) detailsModal.classList.add('show');
        }
    });

    if (closeDetails) closeDetails.addEventListener('click', () => detailsModal.classList.remove('show'));
    if (closeBlog) closeBlog.addEventListener('click', () => blogModal.classList.remove('show'));

    // ================= 3. FUNCȚIONALITĂȚI INDEX: CĂUTARE & CALENDAR =================
    const cities = ["București", "Londra, UK", "Paris, Franța", "Roma, Italia", "Barcelona, Spania", "Viena, Austria", "Amsterdam, Olanda", "Tokyo, Japonia", "Bali, Indonezia", "Maldive"];
    const destInput = document.getElementById('destInput');
    const destDropdown = document.getElementById('destDropdown');

    if(destInput && destDropdown) {
        destInput.addEventListener('input', () => {
            const query = destInput.value.toLowerCase();
            destDropdown.innerHTML = '';
            if (query.length >= 2) {
                const matches = cities.filter(c => c.toLowerCase().includes(query));
                matches.forEach(m => {
                    const div = document.createElement('div');
                    div.className = 'dropdown-item';
                    div.innerText = m;
                    div.onclick = () => { destInput.value = m; destDropdown.classList.remove('show'); };
                    destDropdown.appendChild(div);
                });
                destDropdown.classList.add('show');
            } else {
                destDropdown.classList.remove('show');
            }
        });
    }

    const dateRange = document.getElementById('dateRange');
    const calendarDropdown = document.getElementById('calendarDropdown');
    const calendarDays = document.getElementById('calendarDays');

    if (dateRange && calendarDropdown && calendarDays) {
        dateRange.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            calendarDropdown.classList.toggle('show');
            if(calendarDropdown.classList.contains('show')) {
                calendarDays.innerHTML = '';
                for (let i = 1; i <= 31; i++) {
                    const price = Math.floor(Math.random() * 400) + 100;
                    const day = document.createElement('div');
                    day.className = 'day';
                    day.innerHTML = `<span>${i}</span><span class="price ${price < 200 ? 'price-low' : 'price-mid'}">${price}€</span>`;
                    day.onclick = (ev) => {
                        ev.stopPropagation();
                        dateRange.value = `${i} Aug - ${i+7} Aug`;
                        calendarDropdown.classList.remove('show');
                    };
                    calendarDays.appendChild(day);
                }
            }
        });
    }

    let adults = 2, children = 0;
    const personsInput = document.getElementById('personsInput');
    const personsDropdown = document.getElementById('personsDropdown');
    
    if (personsInput && personsDropdown) {
        personsInput.addEventListener('click', (e) => { e.stopPropagation(); personsDropdown.classList.toggle('show'); });
        document.getElementById('btnAdultPlus').onclick = (e) => { e.stopPropagation(); adults++; updateUI(); };
        document.getElementById('btnAdultMinus').onclick = (e) => { e.stopPropagation(); if(adults>1) adults--; updateUI(); };
        document.getElementById('btnChildPlus').onclick = (e) => { e.stopPropagation(); children++; updateUI(); };
        document.getElementById('btnChildMinus').onclick = (e) => { e.stopPropagation(); if(children>0) children--; updateUI(); };

        function updateUI() {
            document.getElementById('adultsCount').innerText = adults;
            document.getElementById('childrenCount').innerText = children;
            if(personsInput) personsInput.value = `${adults} Adulți${children > 0 ? ', ' + children + ' Copii' : ''}`;
            const gasca = document.getElementById('gascaPromo');
            if(gasca) gasca.style.display = (adults + children >= 5) ? 'block' : 'none';
        }
    }

    // ================= 4. FUNCȚIONALITĂȚI INDEX: VIBE TABS =================
    const vibePills = document.querySelectorAll('.vibe-pill');
    if(vibePills.length > 0) {
        vibePills.forEach(pill => {
            pill.addEventListener('click', () => {
                vibePills.forEach(p => p.classList.remove('active'));
                document.querySelectorAll('.vibe-content').forEach(c => c.classList.remove('active'));
                pill.classList.add('active');
                const target = document.getElementById(pill.dataset.target);
                if(target) target.classList.add('active');
            });
        });
    }

    // ================= 5. LOGICĂ FILTRARE SIDEBAR =================
    const priceFilter = document.getElementById('priceFilter');
    const priceValue = document.getElementById('priceValue');
    const starChecks = document.querySelectorAll('.star-check');
    const mealFilter = document.getElementById('mealFilter');
    const applyBtn = document.getElementById('applyFiltersBtn');

    function applyFilters() {
        if(!priceFilter) return;
        const maxPrice = parseInt(priceFilter.value);
        if(priceValue) priceValue.innerText = maxPrice + '€';
        const checkedStars = Array.from(starChecks).filter(cb => cb.checked).map(cb => cb.value);
        const selectedMeal = mealFilter ? mealFilter.value : 'Toate';

        document.querySelectorAll('.results-area .card').forEach(card => {
            const priceElement = card.querySelector('.price-new');
            if(!priceElement) return;
            const price = parseInt(priceElement.innerText.replace(/[^0-9]/g, ''));
            const stars = card.getAttribute('data-stars');
            const meal = card.getAttribute('data-meal');
            const matchesPrice = price <= maxPrice;
            const matchesStars = checkedStars.includes(stars) || !stars; 
            const matchesMeal = selectedMeal === 'Toate' || selectedMeal === meal || !meal;
            card.style.display = (matchesPrice && matchesStars && matchesMeal) ? 'block' : 'none';
        });
    }

    if (priceFilter) priceFilter.addEventListener('input', applyFilters);
    if (starChecks) starChecks.forEach(cb => cb.addEventListener('change', applyFilters));
    if (mealFilter) mealFilter.addEventListener('change', applyFilters);
    if (applyBtn) applyBtn.addEventListener('click', applyFilters);

    // ================= 6. ROBOTEL DE CHAT =================
    const chatBtn = document.getElementById('chatBtn');
    const chatBox = document.getElementById('chatBox');
    const chatContent = document.getElementById('chatContent');
    const closeChat = document.getElementById('closeChat');
    const optionsContainer = document.querySelector('.chat-options');
    const chatHistory = document.getElementById('chatHistory');

    if (chatBox) {
        if (chatBtn) chatBtn.addEventListener('click', () => chatBox.style.display = chatBox.style.display === 'none' ? 'block' : 'none');
        if (closeChat) closeChat.addEventListener('click', () => chatBox.style.display = 'none');
        
        if (optionsContainer && chatHistory) {
            optionsContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.chat-q');
                if (!btn) return; 
                const question = btn.innerText;
                const answer = btn.getAttribute('data-ans');
                const userMsg = `<div style="align-self: flex-end; background: #00B4D8; color: white; padding: 10px 15px; border-radius: 12px 12px 0 12px; font-size: 13px; max-width: 85%; margin-bottom:10px;"><strong>Tu:</strong> ${question}</div>`;
                chatHistory.insertAdjacentHTML('beforeend', userMsg);
                chatContent.scrollTop = chatContent.scrollHeight;
                setTimeout(() => {
                    const botMsg = `<div style="background: #F1F5F9; color: #1E293B; padding: 10px 15px; border-radius: 12px 12px 12px 0; font-size: 13px; width: fit-content; max-width: 90%; margin-bottom:10px;">🤖 <strong>NovaBot:</strong> ${answer}</div>`;
                    chatHistory.insertAdjacentHTML('beforeend', botMsg);
                    chatContent.scrollTop = chatContent.scrollHeight;
                }, 600);
            });
        }
    }

    // ================= 7. ÎNCHIDERE CLICK EXTERIOR =================
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.classList.remove('show');
        if (e.target === detailsModal) detailsModal.classList.remove('show');
        if (e.target === blogModal) blogModal.classList.remove('show');
        if (!e.target.closest('.search-field')) {
            document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.remove('show'));
        }
    });
});