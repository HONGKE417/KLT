// KLT - Korean Learning Tool
// 韩语字母表、词汇卡片、练习、背单词(SM-2间隔重复)

// ============ 本地存储管理 ============
const Storage = {
    get(key, defaultValue = null) {
        const data = localStorage.getItem(`klt_${key}`);
        return data ? JSON.parse(data) : defaultValue;
    },
    set(key, value) {
        localStorage.setItem(`klt_${key}`, JSON.stringify(value));
    },
    remove(key) {
        localStorage.removeItem(`klt_${key}`);
    }
};

// ============ 词汇数据库 ============
// 使用 EXTENDED_VOCABULARY (10,000+ 词汇) 或默认词汇
const defaultVocabulary = typeof EXTENDED_VOCABULARY !== 'undefined' ? EXTENDED_VOCABULARY : [
    // 问候语
    { id: 1, korean: '안녕하세요', meaning: '你好', romanization: 'annyeonghaseyo', example: '안녕하세요! 만나서 반가워요.' },
    { id: 2, korean: '감사합니다', meaning: '谢谢', romanization: 'gamsahamnida', example: '도와주셔서 감사합니다.' },
    { id: 3, korean: '죄송합니다', meaning: '对不起', romanization: 'joesonghamnida', example: '늦어서 죄송합니다.' },
    { id: 4, korean: '안녕히 가세요', meaning: '再见(请慢走)', romanization: 'annyeonghi gaseyo', example: '안녕히 가세요!' },
    { id: 5, korean: '안녕히 계세요', meaning: '再见(请留步)', romanization: 'annyeonghi gyeseyo', example: '안녕히 계세요!' },
    
    // 常用表达
    { id: 6, korean: '네', meaning: '是/对', romanization: 'ne', example: '네, 알겠습니다.' },
    { id: 7, korean: '아니요', meaning: '不是/不对', romanization: 'aniyo', example: '아니요, 괜찮아요.' },
    { id: 8, korean: '괜찮아요', meaning: '没关系/没事', romanization: 'gwaenchanhayo', example: '괜찮아요, 걱정 마세요.' },
    { id: 9, korean: '미안해요', meaning: '抱歉', romanization: 'mianhaeyo', example: '미안해요, 잠시만요.' },
    { id: 10, korean: '실례합니다', meaning: '打扰了', romanization: 'sillyehamnida', example: '실례합니다, 화장실이 어디예요?' },
    
    // 自我介绍
    { id: 11, korean: '이름', meaning: '名字', romanization: 'ireum', example: '제 이름은 철수예요.' },
    { id: 12, korean: '나이', meaning: '年龄', romanization: 'nai', example: '나이가 어떻게 되세요?' },
    { id: 13, korean: '나라', meaning: '国家', romanization: 'nara', example: '어느 나라 사람이에요?' },
    { id: 14, korean: '학생', meaning: '学生', romanization: 'haksaeng', example: '저는 대학생이에요.' },
    { id: 15, korean: '선생님', meaning: '老师', romanization: 'seonsaengnim', example: '선생님 안녕하세요.' },
    
    // 数字
    { id: 16, korean: '하나', meaning: '1', romanization: 'hana', example: '하나, 둘, 셋' },
    { id: 17, korean: '둘', meaning: '2', romanization: 'dul', example: '사과가 두 개 있어요.' },
    { id: 18, korean: '셋', meaning: '3', romanization: 'set', example: '친구가 세 명이에요.' },
    { id: 19, korean: '넷', meaning: '4', romanization: 'net', example: '의자가 네 개예요.' },
    { id: 20, korean: '다섯', meaning: '5', romanization: 'daseot', example: '다섯 시에 만나요.' },
    
    // 时间
    { id: 21, korean: '오늘', meaning: '今天', romanization: 'oneul', example: '오늘 날씨가 좋아요.' },
    { id: 22, korean: '내일', meaning: '明天', romanization: 'naeil', example: '내일 만나요.' },
    { id: 23, korean: '어제', meaning: '昨天', romanization: 'eoje', example: '어제 영화 봤어요.' },
    { id: 24, korean: '지금', meaning: '现在', romanization: 'jigeum', example: '지금 뭐 해요?' },
    { id: 25, korean: '나중에', meaning: '稍后', romanization: 'najunge', example: '나중에 전화할게요.' },
    
    // 食物
    { id: 26, korean: '밥', meaning: '饭', romanization: 'bap', example: '밥 먹었어요?' },
    { id: 27, korean: '물', meaning: '水', romanization: 'mul', example: '물 한 잔 주세요.' },
    { id: 28, korean: '김치', meaning: '泡菜', romanization: 'gimchi', example: '김치찌개가 맛있어요.' },
    { id: 29, korean: '커피', meaning: '咖啡', romanization: 'keopi', example: '커피 한 잔 할래요?' },
    { id: 30, korean: '빵', meaning: '面包', romanization: 'ppang', example: '빵집에 가요.' },
    
    // 更多常用词...
    { id: 31, korean: '집', meaning: '家', romanization: 'jip', example: '집에 가요.' },
    { id: 32, korean: '학교', meaning: '学校', romanization: 'hakgyo', example: '학교에 가요.' },
    { id: 33, korean: '회사', meaning: '公司', romanization: 'hoesa', example: '회사에 출근해요.' },
    { id: 34, korean: '병원', meaning: '医院', romanization: 'byeongwon', example: '병원에 가야 해요.' },
    { id: 35, korean: '약국', meaning: '药店', romanization: 'yakguk', example: '약국에서 약을 샀어요.' },
    
    // 交通
    { id: 36, korean: '지하철', meaning: '地铁', romanization: 'jihacheol', example: '지하철을 타요.' },
    { id: 37, korean: '버스', meaning: '公交车', romanization: 'beoseu', example: '버스를 기다려요.' },
    { id: 38, korean: '택시', meaning: '出租车', romanization: 'taeksi', example: '택시를 불러요.' },
    { id: 39, korean: '비행기', meaning: '飞机', romanization: 'bihaenggi', example: '비행기를 타요.' },
    { id: 40, korean: '기차', meaning: '火车', romanization: 'gicha', example: '기차표를 샀어요.' },
    
    // 购物
    { id: 41, korean: '얼마예요', meaning: '多少钱', romanization: 'eolmayeyo', example: '이거 얼마예요?' },
    { id: 42, korean: '비싸요', meaning: '贵', romanization: 'bissayo', example: '너무 비싸요.' },
    { id: 43, korean: '싸요', meaning: '便宜', romanization: 'ssayo', example: '이거 싸요!' },
    { id: 44, korean: '카드', meaning: '卡', romanization: 'kadeu', example: '카드로 계산할게요.' },
    { id: 45, korean: '현금', meaning: '现金', romanization: 'hyeongeum', example: '현금이 없어요.' },
    
    // 情感
    { id: 46, korean: '사랑', meaning: '爱', romanization: 'sarang', example: '사랑해요.' },
    { id: 47, korean: '좋아요', meaning: '喜欢', romanization: 'joayo', example: '한국 음식이 좋아요.' },
    { id: 48, korean: '싫어요', meaning: '讨厌', romanization: 'sileoyo', example: '비가 싫어요.' },
    { id: 49, korean: '행복해요', meaning: '幸福', romanization: 'haengbokaeyo', example: '정말 행복해요!' },
    { id: 50, korean: '슬퍼요', meaning: '悲伤', romanization: 'seulpeoyo', example: '너무 슬퍼요.' },
    
    // 继续添加更多词汇...
    { id: 51, korean: '친구', meaning: '朋友', romanization: 'chingu', example: '친구를 만나요.' },
    { id: 52, korean: '가족', meaning: '家人', romanization: 'gajok', example: '가족이 많아요.' },
    { id: 53, korean: '여자', meaning: '女人', romanization: 'yeoja', example: '그 여자는 누구예요?' },
    { id: 54, korean: '남자', meaning: '男人', romanization: 'namja', example: '그 남자는 선생님이에요.' },
    { id: 55, korean: '아이', meaning: '孩子', romanization: 'ai', example: '아이들이 귀여워요.' }
];

// ============ SM-2 间隔重复算法 ============
class SRS {
    constructor() {
        // 加载已学习的单词数据
        this.words = Storage.get('words', {});
        // 加载自定义单词
        this.customWords = Storage.get('customWords', []);
        // 合并默认词汇和自定义词汇 (支持10,000+词汇)
        this.allWords = [...defaultVocabulary, ...this.customWords];
        
        // 确保所有单词都有category字段
        this.allWords.forEach((word, index) => {
            if (!word.category) {
                // 根据id分配默认类别
                if (word.id <= 500) word.category = 'basic';
                else if (word.id <= 1500) word.category = 'daily';
                else if (word.id <= 2500) word.category = 'food';
                else if (word.id <= 3500) word.category = 'transport';
                else if (word.id <= 4500) word.category = 'shopping';
                else if (word.id <= 5500) word.category = 'business';
                else if (word.id <= 6500) word.category = 'education';
                else if (word.id <= 7500) word.category = 'travel';
                else if (word.id <= 8500) word.category = 'health';
                else if (word.id <= 9500) word.category = 'entertainment';
                else word.category = 'emotion';
            }
            if (!word.level) word.level = 1;
        });
        
        console.log(`📚 词汇库加载完成: ${this.allWords.length} 个单词`);
    }
    
    // 获取今天的日期字符串 (YYYY-MM-DD)
    getToday() {
        return new Date().toISOString().split('T')[0];
    }
    
    // 初始化新单词的学习记录
    initWord(wordId) {
        if (!this.words[wordId]) {
            this.words[wordId] = {
                id: wordId,
                interval: 0,      // 间隔天数
                repetitions: 0,   // 重复次数
                easeFactor: 2.5,  // 容易度因子
                nextReview: null, // 下次复习日期
                lastReview: null, // 上次复习日期
                created: this.getToday()
            };
            this.save();
        }
    }
    
    // SM-2算法核心: 根据难度评级计算下次复习时间
    // quality: 0=完全忘记, 3=困难想起, 4=正常想起, 5=容易想起
    review(wordId, quality) {
        const word = this.words[wordId];
        if (!word) return;
        
        let { interval, repetitions, easeFactor } = word;
        
        // 更新容易度因子
        easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        if (easeFactor < 1.3) easeFactor = 1.3;
        
        // 计算间隔
        if (quality < 3) {
            // 忘记了，重置
            repetitions = 0;
            interval = 1;
        } else {
            // 记住了
            repetitions += 1;
            if (repetitions === 1) interval = 1;
            else if (repetitions === 2) interval = 6;
            else interval = Math.round(interval * easeFactor);
        }
        
        // 计算下次复习日期
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + interval);
        
        // 更新数据
        word.interval = interval;
        word.repetitions = repetitions;
        word.easeFactor = easeFactor;
        word.nextReview = nextDate.toISOString().split('T')[0];
        word.lastReview = this.getToday();
        
        this.save();
        return { interval, nextReview: word.nextReview };
    }
    
    // 获取今天需要复习的单词
    getDueWords() {
        const today = this.getToday();
        return this.allWords.filter(word => {
            const record = this.words[word.id];
            if (!record || !record.nextReview) return false;
            return record.nextReview <= today;
        });
    }
    
    // 获取新单词（尚未学习的）
    getNewWords(limit = 20) {
        return this.allWords.filter(word => !this.words[word.id]).slice(0, limit);
    }
    
    // 获取学习统计
    getStats() {
        const due = this.getDueWords().length;
        const newWords = this.getNewWords(9999).length;
        const learned = Object.keys(this.words).length;
        const total = this.allWords.length;
        
        return { due, newWords, learned, total };
    }
    
    // 添加自定义单词
    addCustomWord(korean, meaning, romanization = '', example = '') {
        const id = Date.now(); // 使用时间戳作为唯一ID
        const newWord = { id, korean, meaning, romanization, example };
        this.customWords.push(newWord);
        this.allWords.push(newWord);
        Storage.set('customWords', this.customWords);
        return id;
    }
    
    // 保存数据
    save() {
        Storage.set('words', this.words);
    }
    
    // 重置所有学习数据
    reset() {
        this.words = {};
        this.save();
    }
}

// 全局SRS实例
let srs = new SRS();

// ============ 原数据 ============
const consonants = [
    { char: 'ㄱ', roman: 'g/k', sound: 'g' },
    { char: 'ㄴ', roman: 'n', sound: 'n' },
    { char: 'ㄷ', roman: 'd/t', sound: 'd' },
    { char: 'ㄹ', roman: 'r/l', sound: 'r' },
    { char: 'ㅁ', roman: 'm', sound: 'm' },
    { char: 'ㅂ', roman: 'b/p', sound: 'b' },
    { char: 'ㅅ', roman: 's', sound: 's' },
    { char: 'ㅇ', roman: 'ng', sound: 'ng' },
    { char: 'ㅈ', roman: 'j', sound: 'j' },
    { char: 'ㅊ', roman: 'ch', sound: 'ch' },
    { char: 'ㅋ', roman: 'k', sound: 'k' },
    { char: 'ㅌ', roman: 't', sound: 't' },
    { char: 'ㅍ', roman: 'p', sound: 'p' },
    { char: 'ㅎ', roman: 'h', sound: 'h' }
];

const vowels = [
    { char: 'ㅏ', roman: 'a', sound: 'a' },
    { char: 'ㅑ', roman: 'ya', sound: 'ya' },
    { char: 'ㅓ', roman: 'eo', sound: 'eo' },
    { char: 'ㅕ', roman: 'yeo', sound: 'yeo' },
    { char: 'ㅗ', roman: 'o', sound: 'o' },
    { char: 'ㅛ', roman: 'yo', sound: 'yo' },
    { char: 'ㅜ', roman: 'u', sound: 'u' },
    { char: 'ㅠ', roman: 'yu', sound: 'yu' },
    { char: 'ㅡ', roman: 'eu', sound: 'eu' },
    { char: 'ㅣ', roman: 'i', sound: 'i' },
    { char: 'ㅐ', roman: 'ae', sound: 'ae' },
    { char: 'ㅒ', roman: 'yae', sound: 'yae' },
    { char: 'ㅔ', roman: 'e', sound: 'e' },
    { char: 'ㅖ', roman: 'ye', sound: 'ye' },
    { char: 'ㅘ', roman: 'wa', sound: 'wa' },
    { char: 'ㅙ', roman: 'wae', sound: 'wae' },
    { char: 'ㅚ', roman: 'oe', sound: 'oe' },
    { char: 'ㅝ', roman: 'wo', sound: 'wo' },
    { char: 'ㅞ', roman: 'we', sound: 'we' },
    { char: 'ㅟ', roman: 'wi', sound: 'wi' },
    { char: 'ㅢ', roman: 'ui', sound: 'ui' }
];

const vocabulary = [
    { korean: '안녕하세요', meaning: '你好', romanization: 'annyeonghaseyo' },
    { korean: '감사합니다', meaning: '谢谢', romanization: 'gamsahamnida' },
    { korean: '사랑해요', meaning: '我爱你', romanization: 'saranghaeyo' },
    { korean: '밥', meaning: '饭/米饭', romanization: 'bap' },
    { korean: '물', meaning: '水', romanization: 'mul' },
    { korean: '예', meaning: '是/对', romanization: 'ye' },
    { korean: '아니요', meaning: '不是/不对', romanization: 'aniyo' },
    { korean: '이름', meaning: '名字', romanization: 'ireum' },
    { korean: '학교', meaning: '学校', romanization: 'hakgyo' },
    { korean: '집', meaning: '家', romanization: 'jip' }
];

// ============ 状态 ============
let currentCard = 0;
let currentQuiz = 0;
let score = 0;

// ============ 背单词模块 ============
let reviewQueue = [];
let currentReviewIndex = 0;
let reviewMode = 'review'; // 'review', 'new', 或 'category'
let selectedCategory = 'all'; // 当前选择的类别

// 词汇类别配置
const VOCAB_CATEGORIES = {
    all: { name: '全部词汇', icon: '📚', count: 10000 },
    basic: { name: '基础必备', icon: '⭐', count: 500 },
    daily: { name: '日常生活', icon: '🏠', count: 1000 },
    food: { name: '食物餐饮', icon: '🍜', count: 1000 },
    transport: { name: '交通出行', icon: '🚇', count: 1000 },
    shopping: { name: '购物消费', icon: '🛍️', count: 1000 },
    business: { name: '工作商务', icon: '💼', count: 1000 },
    education: { name: '学校学习', icon: '📚', count: 1000 },
    travel: { name: '旅游观光', icon: '✈️', count: 1000 },
    health: { name: '医疗健康', icon: '🏥', count: 1000 },
    entertainment: { name: '娱乐休闲', icon: '🎮', count: 1000 },
    emotion: { name: '情感表达', icon: '❤️', count: 500 }
};

function initReview() {
    updateReviewStats();
    bindReviewEvents();
    initCategorySelector();
    loadReviewQueue();
}

// 初始化类别选择器
function initCategorySelector() {
    // 检查是否已存在类别选择器
    let selector = document.getElementById('category-selector');
    if (!selector) {
        // 创建类别选择器
        selector = document.createElement('div');
        selector.id = 'category-selector';
        selector.className = 'category-selector';
        
        let html = '<label>选择类别：</label><select id="category-select">';
        for (const [key, value] of Object.entries(VOCAB_CATEGORIES)) {
            html += `<option value="${key}">${value.icon} ${value.name} (${value.count}词)</option>`;
        }
        html += '</select>';
        
        selector.innerHTML = html;
        
        // 插入到复习模块头部
        const reviewHeader = document.querySelector('.review-header');
        if (reviewHeader) {
            reviewHeader.after(selector);
        }
        
        // 绑定事件
        document.getElementById('category-select').addEventListener('change', (e) => {
            selectedCategory = e.target.value;
            loadReviewQueue();
        });
    }
}

// 根据类别获取词汇
function getWordsByCategory(category) {
    if (category === 'all') {
        return srs.allWords;
    }
    return srs.allWords.filter(word => word.category === category);
}

function updateReviewStats() {
    const stats = srs.getStats();
    document.getElementById('due-count').textContent = `待复习: ${stats.due}`;
    document.getElementById('new-count').textContent = `新词: ${stats.newWords}`;
    document.getElementById('total-count').textContent = `总词汇: ${stats.total}`;
}

function bindReviewEvents() {
    // 模式切换按钮
    document.getElementById('mode-review').addEventListener('click', () => switchMode('review'));
    document.getElementById('mode-new').addEventListener('click', () => switchMode('new'));
    document.getElementById('mode-add').addEventListener('click', () => switchMode('add'));
    
    // 显示答案
    document.getElementById('show-answer').addEventListener('click', showAnswer);
    
    // 显示提示
    document.getElementById('show-hint').addEventListener('click', () => {
        document.getElementById('study-hint').style.display = 'block';
    });
    
    // 难度按钮
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const quality = parseInt(e.target.dataset.level);
            handleReview(quality);
        });
    });
    
    // 添加单词
    document.getElementById('submit-word').addEventListener('click', addCustomWord);
    
    // 继续学习
    document.getElementById('continue-study').addEventListener('click', () => {
        switchMode('new');
    });
}

function switchMode(mode) {
    reviewMode = mode;
    
    // 更新按钮状态
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`mode-${mode}`).classList.add('active');
    
    // 显示/隐藏相应界面
    document.getElementById('review-card').style.display = mode === 'add' ? 'none' : 'block';
    document.getElementById('add-word-form').style.display = mode === 'add' ? 'block' : 'none';
    document.getElementById('review-complete').style.display = 'none';
    
    if (mode !== 'add') {
        loadReviewQueue();
    }
}

function loadReviewQueue() {
    if (reviewMode === 'review') {
        // 获取指定类别的到期单词
        const dueWords = srs.getDueWords();
        reviewQueue = selectedCategory === 'all' 
            ? dueWords 
            : dueWords.filter(word => word.category === selectedCategory);
    } else if (reviewMode === 'new') {
        // 获取指定类别的新单词
        const categoryWords = getWordsByCategory(selectedCategory);
        const newWords = categoryWords.filter(word => !srs.words[word.id]);
        reviewQueue = newWords.slice(0, 20);
    }
    
    currentReviewIndex = 0;
    
    if (reviewQueue.length === 0) {
        showComplete();
    } else {
        showWord();
    }
}

function showWord() {
    const word = reviewQueue[currentReviewIndex];
    if (!word) {
        showComplete();
        return;
    }
    
    // 初始化单词学习记录
    if (reviewMode === 'new' && !srs.words[word.id]) {
        srs.initWord(word.id);
    }
    
    // 更新进度条
    const progress = ((currentReviewIndex) / reviewQueue.length) * 100;
    document.getElementById('review-progress').style.width = `${progress}%`;
    
    // 显示单词
    document.getElementById('study-korean').textContent = word.korean;
    document.getElementById('study-meaning').textContent = word.meaning;
    document.getElementById('study-roman').textContent = word.romanization || '';
    document.getElementById('study-example').textContent = word.example || '';
    document.getElementById('study-hint').textContent = word.romanization || '';
    
    // 重置显示状态
    document.getElementById('word-answer').style.display = 'none';
    document.getElementById('study-hint').style.display = 'none';
    document.getElementById('show-answer').style.display = 'block';
    document.getElementById('difficulty-btns').style.display = 'none';
}

function showAnswer() {
    document.getElementById('word-answer').style.display = 'block';
    document.getElementById('show-answer').style.display = 'none';
    document.getElementById('difficulty-btns').style.display = 'grid';
}

function handleReview(quality) {
    const word = reviewQueue[currentReviewIndex];
    if (!word) return;
    
    // 应用SM-2算法
    const result = srs.review(word.id, quality);
    console.log(`Reviewed ${word.korean}: interval=${result.interval}days, next=${result.nextReview}`);
    
    // 下一个
    currentReviewIndex++;
    
    if (currentReviewIndex >= reviewQueue.length) {
        showComplete();
        updateReviewStats();
    } else {
        showWord();
    }
}

function showComplete() {
    document.getElementById('review-card').style.display = 'none';
    document.getElementById('review-complete').style.display = 'block';
    document.getElementById('review-progress').style.width = '100%';
    updateReviewStats();
}

function addCustomWord() {
    const korean = document.getElementById('add-korean').value.trim();
    const meaning = document.getElementById('add-meaning').value.trim();
    const roman = document.getElementById('add-roman').value.trim();
    const example = document.getElementById('add-example').value.trim();
    
    const feedback = document.getElementById('add-feedback');
    
    if (!korean || !meaning) {
        feedback.textContent = '请填写韩语单词和中文意思';
        feedback.className = 'error';
        return;
    }
    
    // 检查是否已存在
    const exists = srs.allWords.find(w => w.korean === korean);
    if (exists) {
        feedback.textContent = '这个单词已存在';
        feedback.className = 'error';
        return;
    }
    
    // 添加单词
    const id = srs.addCustomWord(korean, meaning, roman, example);
    
    feedback.textContent = `✓ 已添加: ${korean}`;
    feedback.className = 'success';
    
    // 清空表单
    document.getElementById('add-korean').value = '';
    document.getElementById('add-meaning').value = '';
    document.getElementById('add-roman').value = '';
    document.getElementById('add-example').value = '';
    
    updateReviewStats();
    
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 2000);
}

// ============ 初始化 ============
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initAlphabet();
    initFlashcards();
    initQuiz();
    initReview();
});

// ============ Tab切换 ============
function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有active
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // 添加active到当前
            tab.classList.add('active');
            const targetId = tab.dataset.tab;
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// ============ 字母表 ============
function initAlphabet() {
    renderLetters('consonants', consonants);
    renderLetters('vowels', vowels);
}

function renderLetters(containerId, letters) {
    const container = document.querySelector(`#${containerId}`);
    const grid = document.createElement('div');
    grid.className = 'letter-grid';

    letters.forEach(letter => {
        const card = document.createElement('div');
        card.className = 'letter-card';
        card.innerHTML = `
            <div class="korean-char">${letter.char}</div>
            <div class="roman">${letter.roman}</div>
        `;
        card.addEventListener('click', () => playAudio(letter.sound));
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

// ============ 闪卡 ============
function initFlashcards() {
    const flashcard = document.querySelector('.flashcard');
    const prevBtn = document.getElementById('prev-card');
    const nextBtn = document.getElementById('next-card');
    const playBtn = document.querySelector('.play-btn');

    updateFlashcard();

    flashcard.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });

    prevBtn.addEventListener('click', () => {
        flashcard.classList.remove('flipped');
        currentCard = (currentCard - 1 + vocabulary.length) % vocabulary.length;
        updateFlashcard();
    });

    nextBtn.addEventListener('click', () => {
        flashcard.classList.remove('flipped');
        currentCard = (currentCard + 1) % vocabulary.length;
        updateFlashcard();
    });

    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = vocabulary[currentCard];
        playAudio(word.romanization);
    });
}

function updateFlashcard() {
    const word = vocabulary[currentCard];
    const front = document.querySelector('.card-front .korean');
    const backMeaning = document.querySelector('.card-back .meaning');
    const backRoman = document.querySelector('.card-back .romanization');
    const counter = document.getElementById('card-counter');

    front.textContent = word.korean;
    backMeaning.textContent = word.meaning;
    backRoman.textContent = word.romanization;
    counter.textContent = `${currentCard + 1}/${vocabulary.length}`;
}

// ============ 练习 ============
function initQuiz() {
    const questions = [
        { question: 'ㄱ 的发音是什么？', options: ['g/k', 'n', 'd/t', 'r/l'], correct: 0 },
        { question: '안녕하세요 是什么意思？', options: ['再见', '谢谢', '你好', '我爱你'], correct: 2 },
        { question: 'ㅏ 的发音是什么？', options: ['eo', 'ya', 'a', 'o'], correct: 2 },
        { question: '물 是什么意思？', options: ['饭', '水', '家', '名字'], correct: 1 },
        { question: '사랑해요 是什么意思？', options: ['谢谢', '对不起', '我爱你', '你好'], correct: 2 }
    ];

    loadQuestion(questions[currentQuiz]);

    function loadQuestion(q) {
        const questionEl = document.getElementById('question');
        const optionsEl = document.getElementById('options');
        const feedbackEl = document.getElementById('feedback');
        const nextBtn = document.getElementById('next-question');

        questionEl.textContent = q.question;
        optionsEl.innerHTML = '';
        feedbackEl.style.display = 'none';
        feedbackEl.classList.remove('correct', 'wrong');
        nextBtn.style.display = 'none';

        q.options.forEach((option, index) => {
            const btn = document.createElement('div');
            btn.className = 'option';
            btn.textContent = option;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.option').forEach(opt => {
                    opt.style.pointerEvents = 'none';
                });

                if (index === q.correct) {
                    btn.classList.add('correct');
                    feedbackEl.textContent = '✓ 正确！';
                    feedbackEl.classList.add('correct');
                    score++;
                } else {
                    btn.classList.add('wrong');
                    document.querySelectorAll('.option')[q.correct].classList.add('correct');
                    feedbackEl.textContent = '✗ 错误！正确答案是：' + q.options[q.correct];
                    feedbackEl.classList.add('wrong');
                }

                nextBtn.style.display = 'block';
            });
            optionsEl.appendChild(btn);
        });
    }

    document.getElementById('next-question').addEventListener('click', () => {
        currentQuiz++;
        if (currentQuiz < questions.length) {
            loadQuestion(questions[currentQuiz]);
        } else {
            showResults();
        }
    });

    function showResults() {
        const questionEl = document.getElementById('question');
        const optionsEl = document.getElementById('options');
        const feedbackEl = document.getElementById('feedback');
        const nextBtn = document.getElementById('next-question');

        questionEl.textContent = `测试完成！得分：${score}/${questions.length}`;
        optionsEl.innerHTML = '';
        feedbackEl.style.display = 'none';
        nextBtn.textContent = '重新测试';
        nextBtn.style.display = 'block';
        nextBtn.onclick = () => {
            currentQuiz = 0;
            score = 0;
            nextBtn.textContent = '下一题';
            nextBtn.onclick = null;
            loadQuestion(questions[currentQuiz]);
        };
    }
}

// ============ 音频（模拟） ============
function playAudio(text) {
    // 使用 Web Speech API
    if ('speechSynthesis' in window) {
        // 取消之前的朗读
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        // 尝试找到韩语语音
        const voices = speechSynthesis.getVoices();
        const koreanVoice = voices.find(v => v.lang.includes('ko'));
        if (koreanVoice) {
            utterance.voice = koreanVoice;
        }
        utterance.lang = 'ko-KR';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    } else {
        console.log('TTS not supported');
    }
}

// 预加载语音
if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
}
console.log('🎌 KLT - Korean Learning Tool loaded! 🎌');
