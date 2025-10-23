// =========================================================
// 1. CONFIGURAÇÃO SANITY (AJUSTADO PARA WESLEN.ARTE)
// =========================================================
const sanityConfig = {
    projectId: '965h5h5v', // SEU PROJECT ID!
    dataset: 'production',         
    apiVersion: 'v2024-01-01',     
    useCdn: true,                  
};

// =========================================================
// 2. FUNÇÃO DE BUSCA SANITY (COM CORREÇÃO DE DOMÍNIO E BACKUP)
// =========================================================
async function fetchSanityData() {
    const GROQ_QUERY = `
        {
          "config": *[_type == "siteConfig"][0]{
            "translations": siteTexts,
            "categories": categoryNames
          },
          "galleryItems": *[_type == "galleryItem"] | order(id asc){
            id,
            type,
            mediaType,
            category,
            "src": image.asset->url, 
            "thumbnail": image.asset->url, 
            videoEmbedSrc,
            title,
            description,
            homepagePosition
          }
        }
    `;

    try {
        // 💥 CORREÇÃO CRÍTICA FINAL: Usando HTTPS e o formato oficial API (subdomínio)
        const url = `https://${sanityConfig.projectId}.api.sanity.io/v1/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(GROQ_QUERY)}`;
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); 

        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
            // Se o status for 404, o Project ID pode estar errado ou o documento não está publicado.
            throw new Error(`Erro de rede ou Sanity: ${response.statusText}`);
        }

        const { result } = await response.json();
        
        if (!result.config || !result.galleryItems) {
             throw new Error("Dados do Sanity incompletos. Verifique se publicou os documentos.");
        }
        
        // 🟢 SUCESSO: RETORNA OS DADOS DO SANITY
        return result; 

    } catch (error) {
        // 🔴 FALHA: MANTÉM O ERRO NO CONSOLE, MAS RETORNA DADOS DE BACKUP PARA O SITE ABRIR
        console.error("ERRO DE CONEXÃO. USANDO DADOS DE BACKUP:", error);
        
        // DADOS DE BACKUP (Para garantir que o site abra)
        const backupData = {
            config: {
                translations: { 
                    home: 'Início (BACKUP)', photography: 'Fotografia (BACKUP)', ai_art: 'Arte com IA (BACKUP)', videos: 'Vídeos (BACKUP)', donate: 'Doar (BACKUP)', 
                    about_me: 'Sobre Mim (BACKUP)', about_text_1: 'Olá, meu nome é Weslen...', about_text_2: 'Desde as ruas movimentadas...', 
                    photography_title: 'Fotografia (BACKUP)', photography_subtitle: 'Capturando momentos, um clique de cada vez.', 
                    ai_art_title: 'Arte Gerada por IA (BACKUP)', ai_art_subtitle: 'Onde a criatividade encontra a inteligência artificial.',
                    videos_title: 'Vídeos (BACKUP)', videos_subtitle: 'Histórias em movimento.', 
                    donate_title: 'Apoie meu Trabalho (BACKUP)', donate_subtitle: 'Sua contribuição me ajuda a continuar criando.', 
                    why_donate_title: 'Por Que Doar? (BACKUP)', why_donate_text: 'Criar e manter este portfólio... (BACKUP)', 
                    pix_key: 'Chave: <strong>weslen-pix@email.com</strong>', paypal_desc: 'Doações seguras através do PayPal.', paypal_button: 'Doar com PayPal', 
                    created_by: 'Criado com ❤️ por Weslen', rights_reserved: 'Todos os direitos reservados.' 
                }, 
                categories: { 
                    all: 'Todos', natureza: 'Natureza', rua: 'Rua', pessoas: 'Pessoas', fantasia: 'Fantasia', cyberpunk: 'Cyberpunk', 
                    animais: 'Animais', vlog: 'Vlog', curta: 'Curtas', arquitetura: 'Arquitetura', viagem: 'Viagem', abstrato: 'Abstrato', 
                    alimentos: 'Alimentos', documentario: 'Documentário', industrial: 'Industrial' 
                }
            },
            galleryItems: [
                { id: 1, type: 'photography', mediaType: 'image', category: 'rua', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800', thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800', homepagePosition: 1, title: 'Névoa Urbana (BACKUP)', description: 'Uma manhã fria nas ruas da cidade...' },
                { id: 2, type: 'ai-art', mediaType: 'image', category: 'cyberpunk', src: 'https://images.unsplash.com/photo-1521743048593-c46672323c2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80', thumbnail: 'https://images.unsplash.com/photo-1521743048593-c46672323c2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80', homepagePosition: 1, title: 'Androide (BACKUP)', description: 'Simbiose entre o orgânico e o sintético...' },
                { id: 3, type: 'videos', mediaType: 'video', category: 'curta', videoEmbedSrc: 'https://www.youtube.com/embed/gD-a3Of3G7I', thumbnail: 'https://img.youtube.com/vi/gD-a3Of3G7I/maxresdefault.jpg', homepagePosition: 2, title: 'Curta Metragem (BACKUP)', description: 'Uma breve história sobre um encontro inesperado.' }
            ]
        };
        
        return backupData;
    }
}


// =========================================================
// 3. VARIÁVEIS DE ESTADO (AGORA GLOBAIS E VAZIAS)
// =========================================================
let galleryItems = [];
let categories = {}; 
let translations = {}; 

let activeFilters = { photography: 'all', 'ai-art': 'all', videos: 'all' };
let currentLightboxItems = [], currentLightboxIndex = 0;


// =========================================================
// 4. INICIALIZAÇÃO DO SITE (USA ASYNC/AWAIT PARA ESPERAR O FETCH)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    mainContent.style.opacity = '0'; 

    initLoadAndSite();
});

async function initLoadAndSite() {
    try {
        const sanityData = await fetchSanityData();
        
        galleryItems = sanityData.galleryItems.map(item => ({
            ...item,
            src: item.src || item.videoEmbedSrc, 
            homepagePosition: item.homepagePosition || 0
        }));
        categories = sanityData.config.categories;
        translations = sanityData.config.translations;
        
        initSite();

        const preloader = document.getElementById('preloader');
        const showMainContent = () => {
            if (!preloader.classList.contains('hidden')) {
                preloader.classList.add('hidden');
                document.getElementById('main-content').style.opacity = '1';
            }
        };
        
        preloader.addEventListener('transitionend', (e) => {
            if(e.target === preloader) {
                preloader.style.display = 'none';
            }
        });

        setTimeout(showMainContent, 1000); 

    } catch (error) {
        document.getElementById('preloader').innerHTML = `
            <span style="color: red; font-size: 1rem; padding: 20px;">
                ERRO: Falha grave ao carregar o site.
            </span>
        `;
    }
}


function initSite() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
    initPuzzles(); 
    initLightbox(); 
    initPageNavigation(); 
    initNavObserver(); 
    populateGalleries(); 
    updateLanguage(); 
    initMobileMenu(); 
    initScrollToTop();
}

function initPuzzles() {
    initPuzzle('puzzle-grid-1', galleryItems.filter(item => item.homepagePosition === 1));
    initPuzzle('puzzle-grid-2', galleryItems.filter(item => item.homepagePosition === 2));
}

function initPuzzle(gridId, items) {
    const grid = document.getElementById(gridId); if (!grid) return;
    
    grid.innerHTML = items.slice(0, 6).map(item => 
        `<div class="puzzle-item interactive-gallery-item" data-id="${item.id}" data-category="${item.category}" data-src="${item.src || item.videoEmbedSrc}">
            <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
         </div>`
    ).join('');
    
    const puzzleItems = grid.querySelectorAll('.puzzle-item');
    puzzleItems.forEach((item, index) => {
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        const r = Math.random() * 90 - 45;
        item.style.transform = `translate(${x}vw, ${y}vh) rotate(${r}deg) scale(0.5)`;
        void item.offsetWidth; 
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translate(0, 0) rotate(0) scale(1)';
        }, 150 + index * 100); 
    });
}

function updateLightboxNav() {
    document.getElementById('lightbox-prev').style.display = currentLightboxItems.length > 1 ? 'block' : 'none';
    document.getElementById('lightbox-next').style.display = currentLightboxItems.length > 1 ? 'block' : 'none';
}

function showLightboxMedia() {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const titleEl = document.getElementById('lightbox-details-title');
    const descEl = document.getElementById('lightbox-details-description');
    const likeCountEl = document.getElementById('like-count');
    const likeButton = document.getElementById('like-button');
    const downloadButton = document.getElementById('lightbox-download');
    
    const currentItemData = galleryItems.find(item => item.id === currentLightboxItems[currentLightboxIndex].id);
    
    lightboxImg.classList.add('hidden');
    lightboxVideo.classList.add('hidden');
    lightboxVideo.src = ''; 
    lightboxImg.style.opacity = 0;
    likeButton.classList.remove('liked');

    setTimeout(() => {
        titleEl.textContent = currentItemData.title;
        descEl.textContent = currentItemData.description;
        likeCountEl.textContent = Math.floor(Math.random() * 2000); 
        
        if (currentItemData.mediaType === 'video') {
            lightboxVideo.src = currentItemData.videoEmbedSrc; 
            lightboxVideo.classList.remove('hidden');
            downloadButton.style.display = 'none'; 
        } else {
            lightboxImg.src = currentItemData.src; 
            lightboxImg.classList.remove('hidden');
            lightboxImg.style.opacity = 1;
            downloadButton.style.display = 'block'; 
        }
    }, 200);
}

function changeLightboxImage(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex >= currentLightboxItems.length) currentLightboxIndex = 0;
    if (currentLightboxIndex < 0) currentLightboxIndex = currentLightboxItems.length - 1;
    showLightboxMedia(); 
}

const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') changeLightboxImage(1);
    if (e.key === 'ArrowLeft') changeLightboxImage(-1);
    if (e.key === 'Escape') closeLightbox();
};

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.removeEventListener('keydown', handleKeyDown);
    document.getElementById('lightbox-video').src = '';
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    document.addEventListener('click', (e) => {
        const item = e.target.closest('.interactive-gallery-item');
        if (item) {
            const galleryContainer = item.closest('.puzzle-grid, .gallery-grid');
            const visibleItems = [...galleryContainer.querySelectorAll('.interactive-gallery-item:not([style*="display: none"])')];
            
            currentLightboxItems = visibleItems.map(el => ({ id: parseInt(el.dataset.id), src: el.dataset.src }));
            currentLightboxIndex = visibleItems.findIndex(el => el.dataset.id === item.dataset.id);
            
            showLightboxMedia(); 
            updateLightboxNav();
            lightbox.classList.add('active');
            document.addEventListener('keydown', handleKeyDown);
        }
    });
    
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', () => changeLightboxImage(-1));
    document.getElementById('lightbox-next').addEventListener('click', () => changeLightboxImage(1));
    document.getElementById('lightbox-donate').addEventListener('click', () => {
        closeLightbox();
        document.querySelector('.page-link[href="#donate"]').click();
    });
    
    document.getElementById('like-button').addEventListener('click', (e) => {
        const button = e.currentTarget;
        const likeCount = document.getElementById('like-count');
        let currentLikes = parseInt(likeCount.textContent);

        button.classList.toggle('liked');
        if(button.classList.contains('liked')) {
            likeCount.textContent = currentLikes + 1;
        } else {
            likeCount.textContent = currentLikes - 1;
        }
    });
    
    document.getElementById('lightbox-share').addEventListener('click', async () => {
        const currentItemData = galleryItems.find(item => item.id === currentLightboxItems[currentLightboxIndex].id);
        const shareData = {
            title: `WESLEN.ARTE - ${currentItemData.title}`,
            text: `Confira esta obra de Weslen: ${currentItemData.title}`,
            url: window.location.href,
        };
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) { console.error("Erro ao compartilhar:", err); }
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Link copiado para a área de transferência!');
            });
        }
    });
    
    document.getElementById('lightbox-download').addEventListener('click', async () => {
        const currentItemData = galleryItems.find(item => item.id === currentLightboxItems[currentLightboxIndex].id);
        if (currentItemData.mediaType === 'image') {
            try {
                const response = await fetch(currentItemData.src);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `weslen_arte_${currentItemData.id}.jpg`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } catch (err) {
                console.error("Erro ao baixar a imagem:", err);
                alert("Não foi possível baixar a imagem.");
            }
        }
    });
    
    lightbox.addEventListener('click', (e) => { if (e.target.id === 'lightbox') closeLightbox(); });
}

function initPageNavigation() {
    const allNavLinks = document.querySelectorAll('.page-link'); 
    allNavLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1); 
            const targetElement = document.getElementById(targetId);
            allNavLinks.forEach(nav => nav.classList.remove('active'));
            const matchingLinks = document.querySelectorAll(`.page-link[href="#${targetId}"]`);
            matchingLinks.forEach(match => match.classList.add('active'));

            if (targetElement) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - (headerHeight + 32);

                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
            
            const mobileMenu = document.getElementById('mobile-menu');
            if(mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        });
    });
}

function initNavObserver() {
    const sections = document.querySelectorAll('main > section');
    const allNavLinks = document.querySelectorAll('.nav-link.page-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px', 
        threshold: 0.3 
    };

    let activeSections = {};

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            activeSections[entry.target.id] = entry.isIntersecting;
        });

        let currentActiveId = null;
        sections.forEach(section => {
            if (activeSections[section.id] && !currentActiveId) {
                currentActiveId = section.id;
            }
        });
        
        allNavLinks.forEach(link => {
            const linkId = link.getAttribute('href').substring(1);
            if (linkId === currentActiveId) {
                link.classList.add('active'); 
            } else {
                link.classList.remove('active'); 
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

function updateLanguage() {
    document.documentElement.lang = 'pt-BR';
    
    document.querySelectorAll('[data-translate-key]').forEach(el => {
        const key = el.dataset.translateKey;
        if (translations && translations[key]) { 
            el.innerHTML = translations[key]; 
        }
    });

    ['photography', 'ai-art', 'videos'].forEach(type => {
        const filtersContainer = document.getElementById(`${type}-filters`);
        if(filtersContainer) {
            filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
                const catKey = btn.dataset.category;
                btn.textContent = categories[catKey] || catKey;
            });
        }
        
        const gallery = document.getElementById(`${type}-gallery`);
        if(gallery) {
            gallery.querySelectorAll('.interactive-gallery-item').forEach(item => {
                const itemData = galleryItems.find(i => i.id == item.dataset.id);
                if(itemData) {
                        item.querySelector('img').alt = itemData.title;
                        const titleOverlay = item.querySelector('.card-title-overlay');
                        if(titleOverlay) titleOverlay.textContent = itemData.title;
                }
            });
        }
    });
    lucide.createIcons();
}

function populateGalleries() {
    ['photography', 'ai-art', 'videos'].forEach(type => {
        const galleryId = `${type}-gallery`;
        const gallery = document.getElementById(galleryId);
        if (!gallery) return; 

        const filtersContainer = document.getElementById(`${type}-filters`);
        const items = galleryItems.filter(i => i.type === type);
        
        gallery.innerHTML = items.map(item => `
            <div class="gallery-card interactive-gallery-item" data-id="${item.id}" data-category="${item.category}" data-src="${item.src || item.videoEmbedSrc}">
                <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
                <div class="card-title-overlay">${item.title}</div>
            </div>`).join('');
        
        const uniqueCategories = ['all', ...new Set(items.map(i => i.category))];
        filtersContainer.innerHTML = uniqueCategories.map(cat => `<button class="filter-btn ${cat === 'all' ? 'active' : ''}" data-type="${type}" data-category="${cat}">${categories[cat] || cat}</button>`).join('');
        filtersContainer.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', handleFilterClick));
    });
}

function handleFilterClick(e) {
    const { type, category } = e.currentTarget.dataset;
    const galleryId = `${type}-gallery`;
    activeFilters[type] = category;
    
    const filtersContainer = e.currentTarget.parentElement;
    filtersContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');

    const gallery = document.getElementById(galleryId);
    gallery.querySelectorAll('.gallery-card').forEach(item => {
        const show = category === 'all' || item.dataset.category === category;
        item.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        item.style.transform = show ? 'scale(1)' : 'scale(0.9)';
        item.style.opacity = show ? '1' : '0';
        setTimeout(() => {
            item.style.display = show ? '' : 'none';
        }, 300); 
    });
}

function initMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    document.getElementById('mobile-menu-button').addEventListener('click', () => menu.classList.add('active'));
    document.getElementById('mobile-menu-close').addEventListener('click', () => menu.classList.remove('active'));
}

function initScrollToTop() {
    const btn = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}