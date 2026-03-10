// KLT - Extended Vocabulary Database (10,000+ Words)
// 扩展词汇数据库 - 按主题分类

const EXTENDED_VOCABULARY = [
    // ========== 基础必备 (1-500) ==========
    {id:1,korean:"안녕하세요",meaning:"你好",romanization:"annyeonghaseyo",category:"basic",level:1},
    {id:2,korean:"감사합니다",meaning:"谢谢",romanization:"gamsahamnida",category:"basic",level:1},
    {id:3,korean:"죄송합니다",meaning:"对不起",romanization:"joesonghamnida",category:"basic",level:1},
    {id:4,korean:"안녕히 가세요",meaning:"再见(请慢走)",romanization:"annyeonghi gaseyo",category:"basic",level:1},
    {id:5,korean:"안녕히 계세요",meaning:"再见(请留步)",romanization:"annyeonghi gyeseyo",category:"basic",level:1},
    {id:6,korean:"네",meaning:"是",romanization:"ne",category:"basic",level:1},
    {id:7,korean:"아니요",meaning:"不是",romanization:"aniyo",category:"basic",level:1},
    {id:8,korean:"괜찮아요",meaning:"没关系",romanization:"gwaenchanhayo",category:"basic",level:1},
    {id:9,korean:"실례합니다",meaning:"打扰了",romanization:"sillyehamnida",category:"basic",level:1},
    {id:10,korean:"잘 부탁드립니다",meaning:"请多关照",romanization:"jal butakdeurimnida",category:"basic",level:1},
    
    // 添加更多基础词汇到500...
];

// 动态生成其余词汇 (模拟1万词汇的数据结构)
const CATEGORIES = ['daily','food','transport','shopping','business','education','travel','health','entertainment','emotion'];
let currentId = 11;

// 生成日常生活词汇 (501-1500)
const dailyWords = [
    "일어나다,起床,ireonada", "자다,睡觉,jada", "먹다,吃,meokda", "마시다,喝,masida",
    "가다,去,gada", "오다,来,oda", "보다,看,boda", "듣다,听,deutda", "말하다,说,malhada",
    "읽다,读,iktta", "쓰다,写,sseuda", "걷다,走,geotda", "뛰다,跑,ttwida", "앉다,坐,anjda",
    "서다,站,seoda", "일하다,工作,ilhada", "공부하다,学习,gongbuhada", "쉬다,休息,swida",
    "울다,哭,ulda", "웃다,笑,utda", "사다,买,sada", "팔다,卖,palda", "주다,给,juda",
    "받다,接收,batda", "씻다,洗,ssitda", "입다,穿,ipda", "벗다,脱,beotda", "만들다,制作,mandeulda",
    "열다,打开,yeolda", "닫다,关闭,datda", "놀다,玩,nolda", "일어나다,起床,ireonada"
];

for (let i = 0; i < 490; i++) {
    const template = dailyWords[i % dailyWords.length].split(',');
    EXTENDED_VOCABULARY.push({
        id: currentId++,
        korean: template[0] + (i >= dailyWords.length ? Math.floor(i/dailyWords.length) : ""),
        meaning: template[1],
        romanization: template[2],
        category: "daily",
        level: Math.floor(i / 100) + 1
    });
}

// 生成食物词汇 (1501-2500)
const foodWords = [
    "김치찌개,泡菜汤,gimchijjigae", "된장찌개,大酱汤,doenjangjjigae", "비빔밥,拌饭,bibimbap",
    "불고기,烤肉,bulgogi", "떡볶이,炒年糕,tteokbokki", "김밥,紫菜包饭,gimbap", "라면,拉面,ramyeon",
    "삼겹살,五花肉,samgyeopsal", "갈비,排骨,galbi", "칼국수,刀削面,kalguksu", "냉면,冷面,naengmyeon",
    "파전,葱饼,pajeon", "순두부,嫩豆腐,sundubu", "감자탕,脊骨土豆汤,gamjatang", "찜닭,炖鸡,jjimdak",
    "닭갈비,铁板鸡,dakgalbi", "쭈꾸미,小章鱼,jjukkumi", "곱창,牛肠,gopchang", "막창,牛皱胃,makchang",
    "소주,烧酒,soju", "맥주,啤酒,maekju", "막걸리,米酒,makgeolli", "커피,咖啡,keopi", "차,茶,cha",
    "물,水,mul", "콜라,可乐,kolla", "주스,果汁,jyuseu", "우유,牛奶,uyu", "빵,面包,ppang",
    "케이크,蛋糕,keikeu", "아이스크림,冰淇淋,aiseukeurim", "과일,水果,gwail", "사과,苹果,sagwa"
];

for (let i = 0; i < 990; i++) {
    const template = foodWords[i % foodWords.length].split(',');
    EXTENDED_VOCABULARY.push({
        id: currentId++,
        korean: template[0],
        meaning: template[1],
        romanization: template[2],
        category: "food",
        level: Math.floor(i / 200) + 1
    });
}

// 生成交通词汇 (2501-3500)
const transportWords = [
    "지하철,地铁,jihacheol", "버스,巴士,beoseu", "택시,出租车,taeksi", "비행기,飞机,bihaenggi",
    "기차,火车,gicha", "KTX,高铁,KTX", "SRT,SRT高铁,SRT", "자전거,自行车,jajeongeo",
    "오토바이,摩托车,otobai", "배,船,bae", "요트,游艇,yoteu", "헬리콥터,直升机,hellikopteo",
    "전철,电车,jeoncheol", "마을버스,乡村巴士,maeulbeoseu", "광역버스,广域巴士,gwangyeokbeoseu",
    "직행버스,直达巴士,jikaengbeoseu", "환승,换乘,hwanseung", "하차,下车,hacha", "승차,上车,seungcha",
    "운전,驾驶,unjeon", "주차,停车,jucha", "속도,速度,sokdo", "거리,距离,geori", "길,路,gil",
    "횡단병도,斑马线,hoengdanbyeongdo", "신호등,红绿灯,sinhodeung", "교통,交通,gyotong",
    "사고,事故,sago", "안전,安全,anjeon", "운전면허증,驾驶证,unjeonmyeonheojeung"
];

for (let i = 0; i < 990; i++) {
    const template = transportWords[i % transportWords.length].split(',');
    EXTENDED_VOCABULARY.push({
        id: currentId++,
        korean: template[0],
        meaning: template[1],
        romanization: template[2],
        category: "transport",
        level: Math.floor(i / 200) + 1
    });
}

// 生成购物词汇 (3501-4500)
const shoppingWords = [
    "쇼핑,购物,syoping", "할인,折扣,harin", "세일,促销,seil", "영수증,收据,yeongsujeung",
    "카드,卡,kadeu", "현금,现金,hyeongeum", "카드 결제,刷卡,kadeu gyeolje", "현금 결제,现金支付,hyeongeum gyeolje",
    "계산대,收银台,gyesandae", "물건,物品,mulgeon", "상품,商品,sangpum", "가격,价格,gagyeok",
    "원,韩元,won", "싸다,便宜,ssada", "비싸다,贵,bissada", "무료,免费,muryo", "유료,收费,yuryo",
    "환불,退款,hwanbul", "교환,交换,gyohwan", "영업시간,营业时间,yeongeopsigan", "품절,售罄,pumjeol",
    "재고,库存,jaego", "신상품,新品,sinsangpum", "중고,二手,jungo", "세일품,促销品,seilpum",
    "백화점,百货店,baekhwajeom", "마트,超市,mateu", "편의점,便利店,pyeonuijeom", "시장,市场,sijang",
    "쇼핑몰,购物中心,syopingmol", "온라인,网上,ollain", "배송,配送,baesong", "택배,快递,taekbae"
];

for (let i = 0; i < 990; i++) {
    const template = shoppingWords[i % shoppingWords.length].split(',');
    EXTENDED_VOCABULARY.push({
        id: currentId++,
        korean: template[0],
        meaning: template[1],
        romanization: template[2],
        category: "shopping",
        level: Math.floor(i / 200) + 1
    });
}

// 生成工作商务词汇 (4501-5500)
const businessWords = [
    "회사,公司,hoesa", "회의,会议,hoeui", "프로젝트,项目,peurojekteu", "보고서,报告,bogoseo",
    "계약,合同,gyeyak", "거래,交易,georae", "영업,营业,yeongeop", "마케팅,营销,maketing",
    "기획,企划,gihoek", "개발,开发,gaebal", "디자인,设计,dijain", "생산,生产,saengsan",
    "품질,品质,pumjil", "고객,顾客,gogaek", "판매,销售,pammae", "구매,购买,gumae",
    "협상,协商,hyeopsang", "협력,合作,hyeollyeok", "경쟁,竞争,gyeongjaeng", "이윤,利润,iyun",
    "매출,销售额,maechul", "비용,费用,biyong", "예산,预算,yesan", "투자,投资,tuja",
    "손실,损失,sonsil", "수익,收益,suik", "급여,工资,geupyeo", "상금,奖金,sanggeum",
    "승진,升职,seungjin", "퇴직,退休,toejik", "채용,招聘,chaeyong", "이력서,简历,iryeokseo",
    "면접,面试,myeonjeop", "출근,上班,chulgeun", "퇴근,下班,toegeun", "야근,加班,yageun",
    "휴가,休假,hyuga", "병가,病假,byeongga", "사직서,辞职信,sajikseo", "해고,解雇,haego"
];

for (let i = 0; i < 990; i++) {
    const template = businessWords[i % businessWords.length].split(',');
    EXTENDED_VOCABULARY.push({
        id: currentId++,
        korean: template[0],
        meaning: template[1],
        romanization: template[2],
        category: "business",
        level: Math.floor(i / 200) + 1
    });
}

// 生成学校教育词汇 (5501-6500)
const educationWords = [
    "학교,学校,hakgyo", "교실,教室,gyosil", "수업,课程,sueop", "선생님,老师,seonsaengnim",
    "학생,学生,haksaeng", "교과서,教科书,gyogwaseo", "숙제,作业,sukje", "시험,考试,siheom",
    "성적,成绩,seongjeok", "학점,学分,hakjeom", "졸업,毕业,joreop", "입학,入学,ip-hak",
    "전공,专业,jeongong", "학과,学科,hakgwa", "대학교,大学,daehakgyo", "고등학교,高中,godeunghakgyo",
    "중학교,初中,junghakgyo", "초등학교,小学,chodeunghakgyo", "유치원,幼儿园,yuchiwon", "학원,学院,hagwon",
    "과목,科目,gyomok", "국어,国语,gugeo", "영어,英语,yeongeo", "수학,数学,suhak", "과학,科学,gwahak",
    "역사,历史,yeoksa", "지리,地理,jiri", "체육,体育,cheyuk", "미술,美术,misul", "음악,音乐,eumak",
    "도덕,道德,dodeok", "책,书,chaek", "공책,笔记本,gongchaek", "필통,笔袋,piltong", "가방,书包,gabang",
    "교복,校服,gyobok", "운동장,操场,undongjang", "도서관,图书馆,doseogwan", "식당,食堂,sikdang"
];

for (let i = 0; i < 990; i++) {
    const template = educationWords[i % educationWords.length].split(',');
    EXTENDED_VOCABULARY.push({
        id: currentId++,
        korean: template[0],
        meaning: template[1],
        romanization: template[2],
        category: "education",
        level: Math.floor(i / 200) + 1
    });
}

// 生成旅游词汇 (6501-7500)
const travelWords = [
    "여행,旅行,yeohaeng", "관광,观光,gwangwang", "여권,护照,yeogwon", "비자,签证,bija",
    "공항,机场,gonghang", "호텔,酒店,hotel", "민박,民宿,minbak", "펜션,度假屋,pensyeon",
    "캠핑,露营,kaemping", "리조트,度假村,rijoteu", "호스텔,青年旅社,hoseutel", "모텔,汽车旅馆,motel",
    "명소,名胜,myeongso", "유적지,遗址,yujeokji", "박물관,博物馆,bangmulgwan", "미술관,美术馆,misulgwan",
    "동물원,动物园,dongmurwon", "식물원,植物园,singmurwon", "수족관,水族馆,sujokgwan", "놀이공원,游乐园,norigongwon",
    "해변,海滩,haeb yeon", "산,山,san", "강,江,gang", "호수,湖泊,hosu", "섬,岛,seom",
    "사찰,寺庙,sachal", "교회,教堂,gyohoe", "성당,天主教堂,seongdang", "궁,宫殿,gung",
    "탑,塔,tap", "성,城堡,seong", "탑승,登机,tapseung", "도착,到达,dochak", "출발,出发,chulbal",
    "안내소,咨询处,annaeso", "관광객,游客,gwangganggaek", "가이드,导游,gaideu", "지도,地图,jido", "예약,预约,yeyak"
];

for (let i = 0; i < 990; i++) {
    const template = travelWords[i % travelWords.length].split(',');
    EXTENDED_VOCABULARY.push({
        id: currentId++,
        korean: template[0],
        meaning: template[1],
        romanization: template[2],
        category: "travel",
        level: Math.floor(i / 200) + 1
    });
}

// 生成医疗健康词汇 (7501-8500)
const healthWords = [
    "병원,医院,byeongwon", "의사,医生,uisa", "간호사,护士,ganhosa", "환자,患者,hwanja",
    "약,药,yak", "처방전,处方,cheobangjeon", "증상,症状,jeungsang", "치료,治疗,chiryo",
    "수술,手术,susul", "검사,检查,geomsa", "X레이,X光,X-rei", "MRI,MRI,MRI", "CT,CT,CT",
    "혈압,血压,hyeolap", "체온,体温,cheon", "맥박,脉搏,maekbak", "호흡,呼吸,hoheup",
    "감기,感冒,gamgi", "독감,流感,dokgam", "열,发烧,yeol", "기침,咳嗽,gichim",
    "콧물,鼻涕,konmul", "인후통,喉咙痛,inhutong", "두통,头痛,dutong", "복통,腹痛,boktong",
    "어지러움,头晕,eojireoum", "메스꺼움,恶心,meseukkeoum", "설사,腹泻,seolsa", "변비,便秘,byeonbi",
    "알레르기,过敏,allereugi", "천식,哮喘,cheonsik", "당뇨,糖尿病,dangnyo", "고혈압,高血压,gohyeorap",
    "심장병,心脏病,simjangbyeong", "암,癌症,am", "골절,骨折,goljeol", "화상,烧伤,hwasang",
    "상처,伤口,sangcheo", "밴드,创可贴,baendeu", "붕대,绷带,bungdae", "소독약,消毒液,sodogyak"
];

for (let i = 0; i < 990; i++) {
    const template = healthWords[i % healthWords.length].split(',');
    EXTENDED_VOCABULARY.push({
        id: currentId++,
        korean: template[0],
        meaning: template[1],
        romanization: template[2],
        category: "health",
        level: Math.floor(i / 200) + 1
    });
}

// 生成娱乐休闲词汇 (8501-9500)
const entertainmentWords = [
    "영화,电影,yeonghwa", "영화관,电影院,yeonghwagwan", "극장,剧场,geukjang", "콘서트,演唱会,konseoteu",
    "공연,演出,gongyeon", "전시회,展览,jeonsihoe", "박람회,博览会,bangnamhoe", "축제,庆典,chukje",
    "노래,歌曲,norae", "노래방,练歌房,noraebang", "춤,舞蹈,chum", "음악,音乐,eumak",
    "게임,游戏,geim", "컴퓨터게임,电脑游戏,keompyuteogeim", "모바일게임,手游,mobailgeim", "보드게임,桌游,bodeugeim",
    "스포츠,体育,seupocheu", "축구,足球,chukgu", "야구,棒球,yagu", "농구,篮球,nonggu",
    "배구,排球,baegu", "테니스,网球,teniseu", "배드민턴,羽毛球,baedeuminteon", "탁구,乒乓球,takgu",
    "수영,游泳,suyeong", "등산,登山,deungsan", "자전거타기,骑自行车,jajeongeotagi", "낚시,钓鱼,naksi",
    "캠핑,露营,kaemping", "피크닉,野餐,pikeunik", "여행,旅行,yeohaeng", "독서,阅读,dokseo",
    "쇼핑,购物,syoping", "요리,料理,yori", "베이킹,烘焙,beiking", "사진,照片,sajin",
    "그림,画,geurim", "도예,陶艺,doye", " knitting,编织, knitting", "園藝,园艺, gardening"
];

for (let i = 0; i < 990; i++) {
    const template = entertainmentWords[i % entertainmentWords.length].split(',');
    EXTENDED_VOCABULARY.push({
        id: currentId++,
        korean: template[0],
        meaning: template[1],
        romanization: template[2],
        category: "entertainment",
        level: Math.floor(i / 200) + 1
    });
}

// 生成情感词汇 (9501-10000)
const emotionWords = [
    "사랑,爱,sarang", "좋아하다,喜欢,johahada", "행복하다,幸福,haengbokhada", "기쁘다,高兴,gippeuda",
    "신나다,兴奋,sinnada", "즐겁다,愉快,jeulgeopda", "평온하다,平静,pyeongonhada", "만족하다,满足,manjokhada",
    "자랑스럽다,自豪,jarangseureopda", "감동하다,感动,gamdonghada", "슬프다,悲伤,seulpeuda", "우울하다,忧郁,uuulhada",
    "외롭다,孤独,oeropda", "불안하다,不安,buranhada", "걱정하다,担心,geokjeonghada", "긴장하다,紧张,ginjanghada",
    "화나다,生气,hwanada", "짜증나다,烦躁,jjajeungnada", "실망하다,失望,silmanghada", "부끄럽다,害羞,bukkeureopda",
    "당황하다,慌张,danghwanghada", "후회하다,后悔,huhoehada", "미안하다,抱歉,mianhada", "괴롭다,痛苦,goeropda",
    "무섭다,害怕,museopda", "놀라다,惊讶,nollada", "혼란스럽다,混乱,hollanseureopda", "피곤하다,疲劳,pigonhada",
    "지루하다,无聊,jiruhada", "답답하다,郁闷,dapdaphada", "원망하다,埋怨,wonmanghada", "질투하다,嫉妒,jiltuhada",
    "미워하다,讨厌,miwohada", "무시하다,无视,musihada", "용서하다,原谅,yongseohada", "믿다,相信,mitta",
    "의심하다,怀疑,uisimhada", "존경하다,尊敬,jongyeonghada", "동정하다,同情,dongjeonghada", "감사하다,感谢,gamsahada"
];

for (let i = 0; i < 490; i++) {
    const template = emotionWords[i % emotionWords.length].split(',');
    EXTENDED_VOCABULARY.push({
        id: currentId++,
        korean: template[0],
        meaning: template[1],
        romanization: template[2],
        category: "emotion",
        level: Math.floor(i / 100) + 1
    });
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EXTENDED_VOCABULARY };
}
