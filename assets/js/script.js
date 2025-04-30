document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects for feature boxes
    const featureBoxes = document.querySelectorAll('.feature-box');
    featureBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add hover effects for skills categories
    const skillsCategories = document.querySelectorAll('.skills-category');
    
    skillsCategories.forEach(category => {
        // Add mouse enter event
        category.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        // Add mouse leave event
        category.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 獲取輪播元素
    const slidesContainer = document.getElementById('carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    
    let currentIndex = 0;
    let interval;
    const slideCount = slides.length;
    
    // 創建指示點
    for (let i = 0; i < slideCount; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    // 獲取所有指示點
    const indicators = document.querySelectorAll('.indicator');
    
    // 初始化輪播
    function initCarousel() {
        // 設定輪播容器寬度
        slides.forEach(slide => {
            slide.style.width = `${100 / slideCount}%`;
        });
        
        // 確保圖片完整顯示
        const images = document.querySelectorAll('.award-img');
        images.forEach(img => {
            img.onload = function() {
                // 確保圖片加載後的適當顯示
                if (img.naturalHeight > img.naturalWidth) {
                    img.style.height = 'auto';
                    img.style.width = 'auto';
                    img.style.maxHeight = '450px';
                }
            };
        });
        
        startAutoSlide();
    }
    
    // 自動輪播
    function startAutoSlide() {
        clearInterval(interval);
        interval = setInterval(() => {
            goToSlide((currentIndex + 1) % slideCount);
        }, 5000); // 每5秒切換一次
    }
    
    // 前往指定幻燈片
    function goToSlide(index) {
        currentIndex = index;
        slidesContainer.style.transform = `translateX(-${currentIndex * (100 / slideCount)}%)`;
        
        // 更新指示點狀態
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === currentIndex);
        });
        
        // 添加淡入效果
        slides.forEach(slide => slide.classList.remove('fade-in'));
        slides[currentIndex].classList.add('fade-in');
        
        // 重置自動輪播計時器
        startAutoSlide();
    }
    
    // 前一張按鈕事件
    prevBtn.addEventListener('click', () => {
        goToSlide((currentIndex - 1 + slideCount) % slideCount);
    });
    
    // 下一張按鈕事件
    nextBtn.addEventListener('click', () => {
        goToSlide((currentIndex + 1) % slideCount);
    });
    
    // 滑鼠懸停時暫停自動輪播
    slidesContainer.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    // 滑鼠離開時恢復自動輪播
    slidesContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    // 觸控事件支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(interval);
    });
    
    slidesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    });
    
    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) {
            // 向左滑動，顯示下一張
            goToSlide((currentIndex + 1) % slideCount);
        } else if (difference < -50) {
            // 向右滑動，顯示上一張
            goToSlide((currentIndex - 1 + slideCount) % slideCount);
        }
    }
    
    // 初始化輪播
    initCarousel();

    document.querySelectorAll('.circle-chart').forEach(chart => {
        const percentage = chart.getAttribute('data-percentage');
        const path = chart.querySelector('.circle');
        path.setAttribute('stroke-dasharray', `${percentage}, 100`);
    });
    
});