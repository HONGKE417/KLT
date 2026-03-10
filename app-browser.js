// 单词浏览器功能 - 添加到app.js末尾

// 存储当前选中的单词
let selectedWordsForStudy = new Set();
let currentBrowserCategory = 'all';
let browserSearchQuery = '';

// 初始化单词浏览器
function initWordBrowser() {
    console.log('📝 初始化单词浏览器');
    
    // 类别筛选
    const categorySelect = document.getElementById('browser-category');
    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            currentBrowserCategory = e.target.value;
            renderWordBrowser();
        });
    }
    
    // 搜索
    const searchInput = document.getElementById('browser-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            browserSearchQuery = e.target.value.trim().toLowerCase();
            renderWordBrowser();
        });
    }
    
    // 快速添加按钮
    const quickAddBtn = document.getElementById('quick-add-btn');
    if (quickAddBtn) {
        quickAddBtn.addEventListener('click', quickAddWords);
    }
    
    // 添加到学习列表
    const addSelectedBtn = document.getElementById('add-selected-to-study');
    if (addSelectedBtn) {
        addSelectedBtn.addEventListener('click', addSelectedToStudy);
    }
    
    // 清空选择
    const clearBtn = document.getElementById('clear-selection');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            selectedWordsForStudy.clear();
            renderWordBrowser();
            updateSelectedCount();
        });
    }
    
    // 初始渲染
    renderWordBrowser();
}

// 渲染单词浏览器列表
function renderWordBrowser() {
    const container = document.getElementById('word-browser-list');
    if (!container) return;
    
    // 筛选单词
    let words = srs.allWords;
    
    // 按类别筛选
    if (currentBrowserCategory !== 'all') {
        words = words.filter(w => w.category === currentBrowserCategory);
    }
    
    // 按搜索词筛选
    if (browserSearchQuery) {
        words = words.filter(w => 
            w.korean.includes(browserSearchQuery) || 
            w.meaning.toLowerCase().includes(browserSearchQuery) ||
            (w.romanization && w.romanization.toLowerCase().includes(browserSearchQuery))
        );
    }
    
    // 更新可用数量
    const availableCount = words.filter(w => !srs.words[w.id]).length;
    document.getElementById('available-count').textContent = availableCount;
    
    // 渲染列表（限制显示数量以提升性能）
    const displayWords = words.slice(0, 100);
    
    container.innerHTML = displayWords.map(word => {
        const isSelected = selectedWordsForStudy.has(word.id);
        const alreadyAdded = srs.words[word.id];
        const catInfo = VOCAB_CATEGORIES[word.category] || { name: '其他' };
        
        return `
            <div class="browser-word-item ${isSelected ? 'selected' : ''} ${alreadyAdded ? 'added' : ''}" 
                 data-id="${word.id}" 
                 onclick="toggleWordSelection(${word.id})">
                <div class="word-korean">${word.korean}</div>
                <div class="word-meaning">${word.meaning}</div>
                <div class="word-cat">${catInfo.name} ${alreadyAdded ? '✓' : ''}</div>
            </div>
        `;
    }).join('');
    
    if (words.length > 100) {
        container.innerHTML += `<div style="text-align:center;padding:20px;color:#999;">还有 ${words.length - 100} 个单词...</div>`;
    }
}

// 切换单词选择
function toggleWordSelection(wordId) {
    const word = srs.allWords.find(w => w.id === wordId);
    if (!word || srs.words[wordId]) return; // 已学习的不能重复添加
    
    if (selectedWordsForStudy.has(wordId)) {
        selectedWordsForStudy.delete(wordId);
    } else {
        selectedWordsForStudy.add(wordId);
    }
    
    // 更新UI
    const item = document.querySelector(`.browser-word-item[data-id="${wordId}"]`);
    if (item) {
        item.classList.toggle('selected', selectedWordsForStudy.has(wordId));
    }
    
    updateSelectedCount();
}

// 更新选中数量
function updateSelectedCount() {
    document.getElementById('selected-count').textContent = selectedWordsForStudy.size;
}

// 快速添加单词
function quickAddWords() {
    const countSelect = document.getElementById('add-count-select');
    const count = countSelect ? parseInt(countSelect.value) : 20;
    
    let words = srs.allWords.filter(w => !srs.words[w.id]);
    
    // 按当前类别筛选
    if (currentBrowserCategory !== 'all') {
        words = words.filter(w => w.category === currentBrowserCategory);
    }
    
    // 按搜索词筛选
    if (browserSearchQuery) {
        words = words.filter(w => 
            w.korean.includes(browserSearchQuery) || 
            w.meaning.toLowerCase().includes(browserSearchQuery)
        );
    }
    
    const wordsToAdd = words.slice(0, count);
    
    wordsToAdd.forEach(word => {
        srs.initWord(word.id);
        selectedWordsForStudy.add(word.id);
    });
    
    renderWordBrowser();
    updateSelectedCount();
    
    showBrowserFeedback(`已添加 ${wordsToAdd.length} 个单词到学习列表`);
}

// 添加选中的单词到学习
function addSelectedToStudy() {
    if (selectedWordsForStudy.size === 0) {
        showBrowserFeedback('请先选择要添加的单词', 'error');
        return;
    }
    
    let added = 0;
    selectedWordsForStudy.forEach(wordId => {
        if (!srs.words[wordId]) {
            srs.initWord(wordId);
            added++;
        }
    });
    
    selectedWordsForStudy.clear();
    renderWordBrowser();
    updateSelectedCount();
    updateReviewStats();
    
    showBrowserFeedback(`成功添加 ${added} 个单词到学习列表`);
    
    // 自动切换到学习新词模式
    setTimeout(() => {
        switchMode('new');
    }, 1500);
}

// 显示反馈
function showBrowserFeedback(message, type = 'success') {
    const feedback = document.getElementById('add-feedback');
    if (!feedback) return;
    
    feedback.textContent = message;
    feedback.className = type;
    feedback.style.display = 'block';
    
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 3000);
}

// 导出到全局
window.initWordBrowser = initWordBrowser;
window.toggleWordSelection = toggleWordSelection;
