// KLT - Korean Learning Tool
// 韩语字母表、词汇卡片和练习

// ============ 数据 ============
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

// ============ 初始化 ============
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initAlphabet();
    initFlashcards();
    initQuiz();
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
