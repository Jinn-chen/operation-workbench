/**
 * 业务运营中心帮助中心 — 公共交互脚本
 */

document.addEventListener('DOMContentLoaded', function () {

    // === 移动端汉堡菜单 ===
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });
        // 点击链接后关闭菜单
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () { navLinks.classList.remove('open'); });
        });
    }

    // === 侧边栏高亮（模块页） ===
    highlightSidebarLink();

    // === 搜索 ===
    var searchInput = document.getElementById('searchInput');
    var searchBtn = document.getElementById('searchBtn');
    var searchResults = document.getElementById('searchResults');
    var searchResultList = document.getElementById('searchResultList');
    var searchResultCount = document.getElementById('searchResultCount');
    var clearSearch = document.getElementById('clearSearch');

    if (!searchInput) return; // 页面可能没有搜索组件

    var searchIndex = null;
    var currentResults = [];

    // 加载搜索索引
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/search-index.json', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            try { searchIndex = JSON.parse(xhr.responseText); } catch (e) { searchIndex = []; }
        } else {
            searchIndex = [];
        }
    };
    xhr.onerror = function () { searchIndex = []; };
    xhr.send();

    function doSearch() {
        var query = searchInput.value.trim();
        if (!query || !searchIndex) { hideResults(); return; }

        var q = query.toLowerCase();
        currentResults = [];

        searchIndex.forEach(function (item) {
            var titleMatch = item.title.toLowerCase().indexOf(q) >= 0;
            var contentMatch = item.content.toLowerCase().indexOf(q) >= 0;
            var keywordsMatch = item.keywords && item.keywords.toLowerCase().indexOf(q) >= 0;

            if (titleMatch || contentMatch || keywordsMatch) {
                var score = 0;
                if (titleMatch) score += 3;
                if (keywordsMatch) score += 2;
                if (contentMatch) score += 1;
                currentResults.push({ item: item, score: score });
            }
        });

        // 按得分排序
        currentResults.sort(function (a, b) { return b.score - a.score; });

        renderResults(query);
    }

    function renderResults(query) {
        if (currentResults.length === 0) {
            searchResultCount.textContent = '未找到相关结果';
            searchResultList.innerHTML = '<li style="padding:16px;color:#999;">没有匹配的文档，请尝试其他关键词</li>';
        } else {
            searchResultCount.textContent = '找到 ' + currentResults.length + ' 条结果';
            var html = '';
            currentResults.forEach(function (r) {
                var excerpt = makeExcerpt(r.item.content, query);
                html += '<li><a href="' + r.item.url + '" onclick="handleSearchResultClick(event)">'
                    + '<span class="result-title">' + r.item.title + '</span>'
                    + '<span class="result-excerpt">' + excerpt + '</span>'
                    + '<span class="result-module">' + (r.item.module || '') + '</span>'
                    + '</a></li>';
            });
            searchResultList.innerHTML = html;
        }
        searchResults.style.display = 'block';
    }

    function makeExcerpt(text, query) {
        var idx = text.toLowerCase().indexOf(query.toLowerCase());
        if (idx === -1) {
            // 如果没有找到匹配，返回开头部分
            return text.length > 80 ? text.substring(0, 80) + '…' : text;
        }
        var start = Math.max(0, idx - 30);
        var end = Math.min(text.length, idx + query.length + 50);
        var excerpt = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
        // 高亮
        var re = new RegExp('(' + escapeRegExp(query) + ')', 'gi');
        return excerpt.replace(re, '<mark>$1</mark>');
    }

    function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    function hideResults() {
        searchResults.style.display = 'none';
        currentResults = [];
    }

    searchInput.addEventListener('input', function () {
        if (this.value.trim()) { doSearch(); } else { hideResults(); }
    });

    searchBtn.addEventListener('click', doSearch);
    if (clearSearch) clearSearch.addEventListener('click', function () { searchInput.value = ''; hideResults(); });

    // 点击搜索框外关闭结果
    document.addEventListener('click', function (e) {
        if (!searchResults.contains(e.target) && e.target !== searchInput && e.target !== searchBtn) {
            hideResults();
        }
    });

    // 键盘导航
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { hideResults(); this.blur(); }
    });

    // 处理搜索结果点击
    window.handleSearchResultClick = function(event) {
        event.preventDefault();
        var href = event.currentTarget.getAttribute('href');
        var searchResults = document.getElementById('searchResults');

        // 处理相对路径
        if (href && href !== '#') {
            if (href.startsWith('./')) {
                href = href.substring(2); // 移除 ./ 前缀
            } else if (href.startsWith('../')) {
                href = href.substring(3); // 移除 ../ 前缀
            }

            // 构建完整的URL
            var baseUrl = window.location.pathname;
            var basePath = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);
            var targetUrl = basePath + href;

            // 隐藏搜索结果
            if (searchResults) {
                searchResults.style.display = 'none';
            }

            // 导航到目标页面
            window.location.href = targetUrl;
        }

        return false;
    };
});

/** 根据 URL hash 高亮侧边栏链接 */
function highlightSidebarLink() {
    var hash = window.location.hash;
    var sidebar = document.querySelector('.module-sidebar');
    if (!sidebar) return;
    sidebar.querySelectorAll('a').forEach(function (a) {
        a.classList.remove('active');
        if (hash && a.getAttribute('href') === hash) { a.classList.add('active'); }
        if (!hash && a.classList.contains('first-link')) { a.classList.add('active'); }
    });
}

window.addEventListener('hashchange', highlightSidebarLink);

    // === 轮播功能 ===
    const carousel = document.querySelector('.hero-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // 隐藏所有滑块
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // 显示当前滑块
        slides[currentSlide].classList.add('active');

        // 更新轮播点
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });

        // 更新容器位置
        const offset = -currentSlide * 100;
        document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startCarousel() {
        stopCarousel();
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopCarousel() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // 初始化轮播
    if (carousel) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startCarousel();
            });
        });

        // 鼠标悬停时暂停轮播
        carousel.addEventListener('mouseenter', stopCarousel);
        carousel.addEventListener('mouseleave', startCarousel);

        // 启动轮播
        showSlide(0); // 确保初始显示第一张
        startCarousel();
    }

    // 键盘导航
    document.addEventListener('keydown', (e) => {
        if (carousel && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
            e.preventDefault();
            if (e.key === 'ArrowLeft') {
                showSlide(currentSlide - 1);
            } else {
                showSlide(currentSlide + 1);
            }
            startCarousel();
        }
    });
