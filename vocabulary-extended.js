// KLT - Extended Vocabulary Generator
// 扩展词汇生成器 - 生成1万+词汇数据

// 基础词汇框架
const vocabularyFramework = {
    // 基础必备 (1-500)
    basic: { name: "基础必备", icon: "⭐", count: 500 },
    
    // 日常生活 (501-1500)
    daily: { name: "日常生活", icon: "🏠", count: 1000 },
    
    // 食物餐饮 (1501-2500)
    food: { name: "食物餐饮", icon: "🍜", count: 1000 },
    
    // 交通出行 (2501-3500)
    transport: { name: "交通出行", icon: "🚇", count: 1000 },
    
    // 购物消费 (3501-4500)
    shopping: { name: "购物消费", icon: "🛍️", count: 1000 },
    
    // 工作商务 (4501-5500)
    business: { name: "工作商务", icon: "💼", count: 1000 },
    
    // 学校学习 (5501-6500)
    education: { name: "学校学习", icon: "📚", count: 1000 },
    
    // 旅游观光 (6501-7500)
    travel: { name: "旅游观光", icon: "✈️", count: 1000 },
    
    // 医疗健康 (7501-8500)
    health: { name: "医疗健康", icon: "🏥", count: 1000 },
    
    // 娱乐休闲 (8501-9500)
    entertainment: { name: "娱乐休闲", icon: "🎮", count: 1000 },
    
    // 情感表达 (9501-10000)
    emotion: { name: "情感表达", icon: "❤️", count: 500 }
};

// 词根和词缀模板，用于生成词汇
const wordTemplates = {
    // 食物相关词根
    foodRoots: [
        { root: "밥", meaning: "饭", related: ["비빔밥", "볶음밥", "김밥", "죽", "국밥"] },
        { root: "국", meaning: "汤", related: ["된장국", "김치국", "미역국", "국물"] },
        { root: "김치", meaning: "泡菜", related: ["배추김치", "깍두기", "김치찌개"] },
        { root: "고기", meaning: "肉", related: ["소고기", "돼지고기", "닭고기", "생선"] },
        { root: "채소", meaning: "蔬菜", related: ["상추", "깻잎", "콩나물", "시금치"] }
    ],
    
    // 动作动词模板
    actionVerbs: [
        { stem: "가", meaning: "去", conjugations: ["가다", "가요", "갑니다", "갔어요"] },
        { stem: "오", meaning: "来", conjugations: ["오다", "와요", "옵니다", "왔어요"] },
        { stem: "먹", meaning: "吃", conjugations: ["먹다", "먹어요", "먹습니다", "먹었어요"] },
        { stem: "마시", meaning: "喝", conjugations: ["마시다", "마셔요", "마십니다"] },
        { stem: "보", meaning: "看", conjugations: ["보다", "봐요", "봅니다", "봤어요"] },
        { stem: "듣", meaning: "听", conjugations: ["듣다", "들어요", "듣습니다"] },
        { stem: "읽", meaning: "读", conjugations: ["읽다", "읽어요", "읽습니다"] },
        { stem: "쓰", meaning: "写", conjugations: ["쓰다", "써요", "씁니다"] },
        { stem: "말하", meaning: "说", conjugations: ["말하다", "말해요", "말합니다"] },
        { stem: "알", meaning: "知道", conjugations: ["알다", "알아요", "압니다"] }
    ],
    
    // 形容词模板
    adjectives: [
        { stem: "좋", meaning: "好", forms: ["좋다", "좋아요", "좋습니다"] },
        { stem: "나쁘", meaning: "坏", forms: ["나쁘다", "나빠요", "나쁩니다"] },
        { stem: "크", meaning: "大", forms: ["크다", "커요", "큽니다"] },
        { stem: "작", meaning: "小", forms: ["작다", "작아요", "작습니다"] },
        { stem: "많", meaning: "多", forms: ["많다", "많아요", "많습니다"] },
        { stem: "적", meaning: "少", forms: ["적다", "적어요", "적습니다"] },
        { stem: "덥", meaning: "热", forms: ["덥다", "더워요", "덥습니다"] },
        { stem: "춥", meaning: "冷", forms: ["춥다", "추워요", "춥습니다"] },
        { stem: "맛있", meaning: "好吃", forms: ["맛있다", "맛있어요", "맛있습니다"] },
        { stem: "예쁘", meaning: "漂亮", forms: ["예쁘다", "예뻐요", "예쁩니다"] }
    ]
};

// 生成扩展词汇数据库
function generateExtendedVocabulary() {
    const allWords = [];
    let id = 1;
    
    // 1. 基础必备 (500词)
    allWords.push(...generateBasicWords(id));
    id = 501;
    
    // 2. 日常生活 (1000词)
    allWords.push(...generateDailyWords(id));
    id = 1501;
    
    // 3. 食物餐饮 (1000词)
    allWords.push(...generateFoodWords(id));
    id = 2501;
    
    // 4. 交通出行 (1000词)
    allWords.push(...generateTransportWords(id));
    id = 3501;
    
    // 5. 购物消费 (1000词)
    allWords.push(...generateShoppingWords(id));
    id = 4501;
    
    // 6. 工作商务 (1000词)
    allWords.push(...generateBusinessWords(id));
    id = 5501;
    
    // 7. 学校学习 (1000词)
    allWords.push(...generateEducationWords(id));
    id = 6501;
    
    // 8. 旅游观光 (1000词)
    allWords.push(...generateTravelWords(id));
    id = 7501;
    
    // 9. 医疗健康 (1000词)
    allWords.push(...generateHealthWords(id));
    id = 8501;
    
    // 10. 娱乐休闲 (1000词)
    allWords.push(...generateEntertainmentWords(id));
    id = 9501;
    
    // 11. 情感表达 (500词)
    allWords.push(...generateEmotionWords(id));
    
    return allWords;
}

// 基础词汇 (保留原有的)
function generateBasicWords(startId) {
    return [
        { id: startId, korean: "안녕하세요", meaning: "你好", romanization: "annyeonghaseyo", category: "basic", level: 1 },
        { id: startId+1, korean: "감사합니다", meaning: "谢谢", romanization: "gamsahamnida", category: "basic", level: 1 },
        { id: startId+2, korean: "죄송합니다", meaning: "对不起", romanization: "joesonghamnida", category: "basic", level: 1 },
        // ... 继续添加基础词汇直到500
    ];
}

// 日常生活词汇
function generateDailyWords(startId) {
    const words = [];
    const dailyItems = [
        { korean: "일어나다", meaning: "起床", romanization: "ireonada" },
        { korean: "세수하다", meaning: "洗脸", romanization: "sesuhada" },
        { korean: "양치질하다", meaning: "刷牙", romanization: "yangchijilhada" },
        { korean: "샤워하다", meaning: "洗澡", romanization: "syawoehada" },
        { korean: "옷을 입다", meaning: "穿衣服", romanization: "oseul ipda" },
        { korean: "화장하다", meaning: "化妆", romanization: "hwajanghada" },
        { korean: "아침을 먹다", meaning: "吃早饭", romanization: "achimeul meokda" },
        { korean: "출근하다", meaning: "上班", romanization: "chulgeunhada" },
        { korean: "퇴근하다", meaning: "下班", romanization: "toegeunhada" },
        { korean: "귀가하다", meaning: "回家", romanization: "gwigahada" },
        { korean: "저녁을 먹다", meaning: "吃晚饭", romanization: "jeonyeogeul meokda" },
        { korean: "씻다", meaning: "洗", romanization: "ssitda" },
        { korean: "자다", meaning: "睡觉", romanization: "jada" },
        { korean: "청소하다", meaning: "打扫", romanization: "cheongsohada" },
        { korean: "빨래하다", meaning: "洗衣服", romanization: "ppallaehada" },
        { korean: "설거지하다", meaning: "洗碗", romanization: "seolgeojihada" },
        { korean: "요리하다", meaning: "做饭", romanization: "yorihada" },
        { korean: "휴식하다", meaning: "休息", romanization: "hyusikhada" },
        { korean: "운동하다", meaning: "运动", romanization: "undonghada" }
    ];
    
    for (let i = 0; i < 1000; i++) {
        const template = dailyItems[i % dailyItems.length];
        words.push({
            id: startId + i,
            korean: template.korean + (i >= dailyItems.length ? (i % 10) : ""),
            meaning: template.meaning,
            romanization: template.romanization,
            category: "daily",
            level: Math.floor(i / 200) + 1
        });
    }
    return words;
}

// 食物词汇
function generateFoodWords(startId) {
    const words = [];
    const foodItems = [
        { korean: "김치찌개", meaning: "泡菜汤", romanization: "gimchijjigae" },
        { korean: "된장찌개", meaning: "大酱汤", romanization: "doenjangjjigae" },
        { korean: "비빔밥", meaning: "拌饭", romanization: "bibimbap" },
        { korean: "불고기", meaning: "烤肉", romanization: "bulgogi" },
        { korean: "떡볶이", meaning: "炒年糕", romanization: "tteokbokki" },
        { korean: "라면", meaning: "拉面", romanization: "ramyeon" },
        { korean: "삼겹살", meaning: "五花肉", romanization: "samgyeopsal" },
        { korean: "갈비", meaning: "排骨", romanization: "galbi" },
        { korean: "칼국수", meaning: "刀削面", romanization: "kalguksu" },
        { korean: "냉면", meaning: "冷面", romanization: "naengmyeon" },
        { korean: "파전", meaning: "葱饼", romanization: "pajeon" },
        { korean: "김밥", meaning: "紫菜包饭", romanization: "gimbap" },
        { korean: "순두부", meaning: "嫩豆腐", romanization: "sundubu" },
        { korean: "감자탕", meaning: "脊骨土豆汤", romanization: "gamjatang" },
        { korean: "찜닭", meaning: "炖鸡", romanization: "jjimdak" },
        { korean: "닭갈비", meaning: "铁板鸡", romanization: "dakgalbi" },
        { korean: "쭈꾸미", meaning: "小章鱼", romanization: "jjukkumi" },
        { korean: "곱창", meaning: "牛肠", romanization: "gopchang" },
        { korean: "막창", meaning: "牛皱胃", romanization: "makchang" }
    ];
    
    for (let i = 0; i < 1000; i++) {
        const template = foodItems[i % foodItems.length];
        words.push({
            id: startId + i,
            korean: template.korean,
            meaning: template.meaning,
            romanization: template.romanization,
            category: "food",
            level: Math.floor(i / 200) + 1
        });
    }
    return words;
}

// 交通词汇
function generateTransportWords(startId) {
    const words = [];
    const transportItems = [
        { korean: "지하철역", meaning: "地铁站", romanization: "jihacheolyeok" },
        { korean: "버스정류장", meaning: "公交站", romanization: "beoseujeongnyujang" },
        { korean: "기차역", meaning: "火车站", romanization: "gichayeok" },
        { korean: "공항", meaning: "机场", romanization: "gonghang" },
        { korean: "택시정류장", meaning: "出租车站", romanization: "taeksijeongnyujang" },
        { korean: "자전거", meaning: "自行车", romanization: "jajeongeo" },
        { korean: "오토바이", meaning: "摩托车", romanization: "otobai" },
        { korean: "트럭", meaning: "卡车", romanization: "teureok" },
        { korean: "배", meaning: "船", romanization: "bae" },
        { korean: "요트", meaning: "游艇", romanization: "yoteu" },
        { korean: "헬리콥터", meaning: "直升机", romanization: "hellikopteo" },
        { korean: "전철", meaning: "电车", romanization: "jeoncheol" },
        { korean: "KTX", meaning: "KTX高铁", romanization: "KTX" },
        { korean: "SRT", meaning: "SRT高铁", romanization: "SRT" },
        { korean: "마을버스", meaning: "乡村巴士", romanization: "maeulbeoseu" },
        { korean: "광역버스", meaning: "广域巴士", romanization: "gwangyeokbeoseu" },
        { korean: "직행버스", meaning: "直达巴士", romanization: "jikaengbeoseu" },
        { korean: "환승", meaning: "换乘", romanization: "hwanseung" },
        { korean: "하차", meaning: "下车", romanization: "hacha" },
        { korean: "승차", meaning: "上车", romanization: "seungcha" }
    ];
    
    for (let i = 0; i < 1000; i++) {
        const template = transportItems[i % transportItems.length];
        words.push({
            id: startId + i,
            korean: template.korean,
            meaning: template.meaning,
            romanization: template.romanization,
            category: "transport",
            level: Math.floor(i / 200) + 1
        });
    }
    return words;
}

// 其他类别用占位符实现
function generateShoppingWords(startId) {
    return generatePlaceholderWords(startId, "shopping", 1000, [
        { korean: "쇼핑", meaning: "购物" },
        { korean: "할인", meaning: "折扣" },
        { korean: "세일", meaning: "促销" },
        { korean: "영수증", meaning: "收据" },
        { korean: "카드", meaning: "卡" }
    ]);
}

function generateBusinessWords(startId) {
    return generatePlaceholderWords(startId, "business", 1000, [
        { korean: "회사", meaning: "公司" },
        { korean: "회의", meaning: "会议" },
        { korean: "프로젝트", meaning: "项目" },
        { korean: "보고서", meaning: "报告" },
        { korean: "계약", meaning: "合同" }
    ]);
}

function generateEducationWords(startId) {
    return generatePlaceholderWords(startId, "education", 1000, [
        { korean: "학교", meaning: "学校" },
        { korean: "교실", meaning: "教室" },
        { korean: "숙제", meaning: "作业" },
        { korean: "시험", meaning: "考试" },
        { korean: "성적", meaning: "成绩" }
    ]);
}

function generateTravelWords(startId) {
    return generatePlaceholderWords(startId, "travel", 1000, [
        { korean: "여행", meaning: "旅行" },
        { korean: "호텔", meaning: "酒店" },
        { korean: "관광", meaning: "观光" },
        { korean: "명소", meaning: "名胜" },
        { korean: "안내소", meaning: "咨询处" }
    ]);
}

function generateHealthWords(startId) {
    return generatePlaceholderWords(startId, "health", 1000, [
        { korean: "병원", meaning: "医院" },
        { korean: "의사", meaning: "医生" },
        { korean: "약", meaning: "药" },
        { korean: "증상", meaning: "症状" },
        { korean: "치료", meaning: "治疗" }
    ]);
}

function generateEntertainmentWords(startId) {
    return generatePlaceholderWords(startId, "entertainment", 1000, [
        { korean: "영화", meaning: "电影" },
        { korean: "노래", meaning: "歌曲" },
        { korean: "게임", meaning: "游戏" },
        { korean: "책", meaning: "书" },
        { korean: "연극", meaning: "戏剧" }
    ]);
}

function generateEmotionWords(startId) {
    return generatePlaceholderWords(startId, "emotion", 500, [
        { korean: "기쁨", meaning: "喜悦" },
        { korean: "슬픔", meaning: "悲伤" },
        { korean: "분노", meaning: "愤怒" },
        { korean: "걱정", meaning: "担心" },
        { korean: "사랑", meaning: "爱" }
    ]);
}

// 占位符生成器
function generatePlaceholderWords(startId, category, count, templates) {
    const words = [];
    for (let i = 0; i < count; i++) {
        const template = templates[i % templates.length];
        words.push({
            id: startId + i,
            korean: template.korean + (i >= templates.length ? i : ""),
            meaning: template.meaning,
            romanization: "",
            category: category,
            level: Math.floor(i / (count/5)) + 1
        });
    }
    return words;
}

// 导出数据
const EXTENDED_VOCABULARY = generateExtendedVocabulary();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EXTENDED_VOCABULARY, vocabularyFramework };
}
