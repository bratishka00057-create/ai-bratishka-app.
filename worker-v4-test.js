const MODEL = "gpt-image-2.6-sunburst";
const MAX_FILE_SIZE = 15 * 1024 * 1024;

const PHOTO_GROUPS = [
["portrait-men","Мужские портреты","👨",[
    ["Мужской студийный портрет","Профессиональный мужской портрет в студии, мягкий объёмный свет, естественная кожа."],
    ["Мужская обложка журнала","Редакционный мужской портрет для обложки премиального журнала."],
    ["Мужской кинопортрет","Кинематографичный мужской портрет с выразительным светом и глубиной кадра."],
    ["Мужской портрет на закате","Портрет мужчины в мягком золотом свете заката."],
    ["Чёрно-белый мужской портрет","Стильный чёрно-белый мужской портрет с глубокими полутонами."],
    ["Мужской street style","Современный городской мужской портрет в естественной обстановке."],
    ["Мужской премиум","Элегантный мужской портрет в дорогой интерьерной атмосфере."],
    ["Мужской портрет у окна","Атмосферный портрет мужчины с мягким естественным светом."],
    ["Тёмный фон — мужчина","Выразительный мужской портрет на тёмном фоне с контровым светом."],
    ["Деловой мужской портрет","Профессиональный портрет мужчины для бизнеса и личного бренда."]
  ]],
  ["portrait-women","Женские портреты","👩",[
    ["Женский студийный портрет","Профессиональный женский портрет в студии, мягкий объёмный свет, естественная кожа."],
    ["Женская обложка журнала","Редакционный женский портрет для обложки премиального журнала."],
    ["Женский кинопортрет","Кинематографичный женский портрет с выразительным светом и глубиной кадра."],
    ["Женский портрет на закате","Портрет женщины в мягком золотом свете заката."],
    ["Чёрно-белый женский портрет","Стильный чёрно-белый женский портрет с глубокими полутонами."],
    ["Женский beauty-портрет","Профессиональная beauty-фотография с деликатной ретушью."],
    ["Женский премиум","Элегантный женский портрет в дорогой интерьерной атмосфере."],
    ["Женский портрет у окна","Атмосферный портрет женщины с мягким естественным светом."],
    ["Тёмный фон — женщина","Выразительный женский портрет на тёмном фоне с контровым светом."],
    ["Женский fashion-портрет","Премиальный fashion-портрет в стиле глянцевого журнала."]
  ]],

  ["fashion","Мода","👗",[
    ["Fashion editorial","Профессиональная fashion editorial фотография для модного журнала."],
    ["Уличная мода","Реалистичная фотография в стиле street fashion с современной городской атмосферой."],
    ["Haute couture","Роскошная fashion-фотография в эстетике haute couture."],
    ["Минималистичный стиль","Минималистичная модная фотография с чистым фоном и лаконичной композицией."],
    ["Luxury look","Премиальный luxury fashion-образ в элегантной обстановке."],
    ["Вечерний образ","Элегантная вечерняя fashion-фотография с атмосферным освещением."],
    ["Каталог одежды","Профессиональная каталожная фотография одежды с точной передачей фактуры ткани."],
    ["Обложка fashion","Эффектная обложка модного журнала с профессиональным светом."]
  ]],
  ["travel","Путешествия","🌍",[
    ["Парижская прогулка","Реалистичная фотография на красивых улицах Парижа."],
    ["Итальянское побережье","Фотография на итальянском побережье со средиземноморским светом и морем."],
    ["Тропический отдых","Фотография с тропического курорта, пальмы и красивый пляж."],
    ["Горный курорт","Живописная горная локация с реалистичной перспективой и естественным светом."],
    ["Ночной Токио","Ночная фотография на улицах Токио с неоновыми огнями и отражениями."],
    ["Отдых на яхте","Премиальная фотография на современной яхте в открытом море."]
  ]],
  ["business","Бизнес","💼",[
    ["Деловой портрет","Профессиональный деловой портрет для сайта компании и LinkedIn."],
    ["Руководитель","Премиальный портрет руководителя в современном офисе."],
    ["Профиль эксперта","Профессиональная фотография эксперта для личного бренда."],
    ["Командный профиль","Деловая фотография для корпоративного профиля."],
    ["Бизнес-премиум","Дорогой деловой портрет в современном премиальном офисе."]
  ]],
  ["cars","Автомобили","🚘",[
    ["Автомобильная реклама","Профессиональная рекламная фотография автомобиля с точным сохранением модели и деталей."],
    ["Ночной город и авто","Кинематографичная фотография автомобиля на ночной городской улице."],
    ["Авто в горах","Автомобиль в красивой горной локации с реалистичной перспективой."],
    ["Студийный автомобиль","Студийная рекламная фотография автомобиля на лаконичном фоне."],
    ["Премиальный гараж","Фотография автомобиля в роскошном современном гараже."]
  ]],
  ["interiors","Интерьеры","🏡",[
    ["Современная гостиная","Современная дизайнерская гостиная с премиальными материалами и естественным светом."],
    ["Люкс-спальня","Элегантная спальня уровня пятизвёздочного отеля."],
    ["Минималистичная кухня","Современная минималистичная кухня с натуральными материалами."],
    ["Дизайнерский офис","Стильный современный офис с дизайнерской мебелью."],
    ["Пентхаус","Роскошный интерьер современного пентхауса с панорамными окнами."],
    ["Скандинавский интерьер","Светлый скандинавский интерьер с натуральным деревом и мягким дневным светом."]
  ]]
];

const VIDEO_TEMPLATES = [
  ["Кинематографичный пролёт","Плавный кинематографичный пролёт камеры вокруг главного объекта."],
  ["Портрет оживает","Естественное движение камеры, лёгкий ветер в волосах и едва заметная мимика. Сохрани лицо."],
  ["Fashion-показ","Модель демонстрирует образ, камера плавно сопровождает движение."],
  ["Путешествие","Кинематографичное travel-видео с движением камеры и атмосферой локации."],
  ["Реклама автомобиля","Рекламное видео автомобиля с движением камеры, отражениями и динамикой кадра."],
  ["Презентация продукта","Премиальный рекламный ролик продукта с последовательностью красивых планов."],
  ["Интерьерный тур","Плавный видео-тур по интерьеру с сохранением архитектуры и геометрии."],
  ["До и после","Эффектный ролик до и после обработки фотографии с плавным переходом."],
  ["Неоновый клип","Атмосферное короткое видео с неоновым освещением и движением камеры."],
  ["Вертикальный Reels","Динамичный вертикальный ролик 9:16 для Reels или Shorts."]
];

const TEMPLATES = [];

for (const group of PHOTO_GROUPS) {
  const [category,categoryName,icon,items] = group;

  items.forEach((item,index) => {
    
const recommendedModels =
  category.startsWith("portrait") || category === "fashion"
    ? ["nano-banana"]
    : ["flux"];

    TEMPLATES.push({
      id:category+"-"+index,
      name:item[0],
      category,
      categoryName,
      icon,
      type:"photo",
      models:recommendedModels,
      popular:index===0 || index===3,
      isNew:index>=items.length-2,
      prompt:"Создай реалистичную профессиональную фотографию. "+item[1]+" Сохрани точную идентичность человека, лицо, возраст, черты, волосы и естественную текстуру кожи. Не меняй ничего, кроме явно запрошенного."
    });
  });
}

VIDEO_TEMPLATES.forEach((item,index) => TEMPLATES.push({
  id:"video-"+index,
  name:item[0],
  category:"video",
  categoryName:"Видео",
  icon:"🎬",
  type:"video",
  models:["kling","wan","seedance"],
  popular:index<2,
  isNew:index>=8,
  prompt:"СЦЕНАРИЙ ВИДЕО. "+item[1]+" Подготовь подробное описание движения камеры, освещения, последовательности кадров и атмосферы. Это сценарий, а не запуск генерации видео."
}));

const MODEL_LABELS = {
  "nano-banana":"Nano Banana",
  "flux":"FLUX",
  "kling":"Kling",
  "wan":"Wan",
  "seedance":"Seedance"
};

const HTML = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0b0d12">
<title>AI Bratishka Studio</title>
<style>
:root{color-scheme:dark;--bg:#0b0d12;--panel:#141821;--line:#2a3140;--muted:#9ba5b7;--text:#f5f7fb;--accent:#9b8cff}
*{box-sizing:border-box}
body{margin:0;background:radial-gradient(ellipse at 50% -15%,#292448 0,transparent 42%),var(--bg);color:var(--text);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}
button,input,textarea{font:inherit}button{cursor:pointer}
.shell{max-width:1120px;margin:auto;padding:22px 18px 60px}
.top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:25px}
.brand{display:flex;align-items:center;gap:11px}
.logo{width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,#a99bff,#5e50cf);display:grid;place-items:center;font-size:22px}
.brand b{font-size:16px}.brand small{display:block;color:var(--muted);font-size:11px;margin-top:3px}
.pill{font-size:11px;color:#c9c2ff;border:1px solid #514a7b;background:#28233e;padding:8px 11px;border-radius:99px}
.hero{margin-bottom:22px}.eyebrow{color:#b8adff;font-size:11px;font-weight:700;letter-spacing:1.7px}
.hero h1{font-size:clamp(28px,5vw,43px);line-height:1.08;letter-spacing:-1.5px;margin:9px 0}
.hero p{color:var(--muted);max-width:650px;line-height:1.6;margin:0;font-size:14px}
.panel{background:linear-gradient(180deg,#191e29,#121620);border:1px solid var(--line);border-radius:20px;padding:18px;box-shadow:0 18px 55px #0003}
.head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
.head h2{font-size:15px;margin:0}.hint{color:var(--muted);font-size:11px}
.library{margin-bottom:18px}
.filters,.chips{display:flex;flex-wrap:wrap;gap:7px}
.filter,.chip{border:1px solid #394052;border-radius:99px;background:#1b202c;color:#d8dced;padding:9px 11px;font-size:11px}
.filter.active,.chip.active{background:#30294c;border-color:var(--accent);color:white}
.tools{display:grid;grid-template-columns:1fr auto;gap:9px;margin:14px 0}
.input,.search{width:100%;border:1px solid var(--line);border-radius:11px;background:#0e121a;color:white;padding:12px;font-size:13px;outline:none}
.input:focus,.search:focus,.textarea:focus{border-color:var(--accent)}
.categories{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:12px 0 16px}
.collections{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:9px;
  margin:12px 0 17px;
}
.collection{
  min-height:82px;
  padding:12px;
  text-align:left;
  color:white;
  border:1px solid #394052;
  border-radius:13px;
  background:linear-gradient(145deg,#292441,#171c26);
}
.collection.active{
  border-color:var(--accent);
  background:linear-gradient(145deg,#403568,#242039);
}
.collection b{display:block;font-size:12px;margin-bottom:5px}
.collection small{color:#b9bfd0;font-size:10px;line-height:1.4}
.category{border:1px solid var(--line);background:#171c26;border-radius:12px;padding:11px 7px;color:white;font-size:11px}
.category.active{border-color:var(--accent);background:#292441}
.cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}
.card{
  position:relative;
  min-width:0;
  min-height:155px;
  text-align:left;
  border:1px solid #39435a;
  background:linear-gradient(145deg,#252d43,#171b29 65%,#29213d);
  border-radius:16px;
  padding:14px 11px;
  color:white;
  display:flex;
  flex-direction:column;
  gap:9px;
  overflow:hidden;
  box-shadow:0 5px 18px rgba(0,0,0,.16);
  transition:transform .2s,border-color .2s;
}
.card:hover{
  border-color:#a18cff;
  transform:translateY(-2px);
}
.card-icon{
  display:flex;
  align-items:center;
  justify-content:center;
  width:100%;
  height:76px;
  border-radius:11px;
  font-size:38px;
  background:radial-gradient(circle at 50% 35%,#514477,#28243d 55%,#191e2c);
}
.card-tag{
  display:inline-flex;
  align-self:flex-start;
  padding:4px 8px;
  border:1px solid #a18cff55;
  border-radius:20px;
  background:#8b70d522;
  color:#d7c9ff;
  font-size:9px;
  font-weight:700;
  letter-spacing:.4px;
  text-transform:uppercase;
}
.card-name{
  font-size:12px;
  font-weight:750;
  line-height:1.35;
  padding-right:18px;
}
.card-meta{
  font-size:9px;
  color:#b8bfd1;
  line-height:1.4;
}
.star{
  position:absolute;
  right:7px;
  top:7px;
  border:1px solid #ffffff20;
  border-radius:9px;
  background:#171b29cc;
  color:#c5c9d6;
  font-size:18px;
  padding:3px 7px;
  z-index:2;
}
.star.saved{color:#ffd76a}

.count{font-size:11px;color:var(--muted);margin-top:12px}
.empty-library{grid-column:1/-1;text-align:center;color:var(--muted);padding:25px 10px;font-size:12px}
.safe{border:1px solid #315c4d;background:#14251f;border-radius:12px;padding:12px;margin-top:15px;color:#b8e7d2;font-size:11px;line-height:1.5}
.safe b{display:block;color:#d4f6e6;margin-bottom:3px}
.layout{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(300px,.85fr);gap:18px;align-items:start}
.modes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-bottom:20px}
.mode{border:1px solid var(--line);background:#171c26;border-radius:13px;padding:12px 9px;text-align:left;color:white;min-height:78px}
.mode span{display:block;font-size:21px;margin-bottom:7px}.mode b{font-size:11px}
.mode.active{border-color:var(--accent);background:#292441}
.field-label{display:block;font-size:12px;color:#d7dbea;font-weight:650;margin:15px 0 8px}
.upload{border:1px dashed #555d72;background:#10141d;border-radius:15px;padding:17px;text-align:center}
.upload input{display:none}.upload label{display:block;cursor:pointer}
.upload-icon{font-size:27px;margin-bottom:7px}.upload b{font-size:13px}
.upload small{display:block;color:var(--muted);font-size:11px;margin-top:5px}
.preview{display:none;width:100%;max-height:370px;object-fit:contain;background:#090b10;border-radius:12px;margin-top:12px}
.textarea{width:100%;min-height:116px;resize:vertical;border:1px solid var(--line);border-radius:12px;background:#0e121a;color:white;padding:13px;line-height:1.5;font-size:13px;outline:none}
.presets{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}
.preset{border:1px solid #394052;border-radius:99px;background:#1b202c;color:#d8dced;padding:8px 10px;font-size:11px}
.primary{width:100%;border:0;border-radius:12px;padding:14px;background:linear-gradient(110deg,#9d8cff,#6858df);color:white;font-weight:750;margin-top:15px}
.primary:disabled{opacity:.55;cursor:wait}
.secondary{width:100%;border:1px solid var(--line);background:#1a202b;color:#e9ecf5;border-radius:11px;padding:12px;margin-top:10px}
.note{font-size:11px;color:var(--muted);line-height:1.5;margin:11px 0 0}
.result-wrap{min-height:250px;border:1px dashed #343c4c;border-radius:15px;background:#0e1219;display:grid;place-items:center;padding:14px;text-align:center}
.result-wrap img{display:none;max-width:100%;max-height:500px;object-fit:contain;border-radius:10px}
.empty-icon{font-size:32px}.empty-text{font-size:12px;color:var(--muted);line-height:1.5;margin-top:9px}
.status{font-size:12px;line-height:1.5;margin-top:12px;color:#d8d2ff;overflow-wrap:anywhere}
.footer{text-align:center;color:#697386;font-size:10px;margin-top:22px}
@media(max-width:760px){.shell{padding:16px 13px 42px}.layout{grid-template-columns:1fr}.panel{padding:15px}.cards{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:370px){.modes,.categories{grid-template-columns:repeat(2,minmax(0,1fr))}.tools{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="shell">
<header class="top">
<div class="brand"><div class="logo">✦</div><div><b>AI BRATISHKA</b><small>STUDIO · IMAGE LAB</small></div></div>
<div class="pill">V4.1 · TEST MODE</div>
</header>

<section class="hero">
<div class="eyebrow">ТВОЯ AI-ФОТОСТУДИЯ</div>
<h1>Создавай фотографии<br>нового уровня</h1>
<p>Выбери задачу, загрузи снимок и опиши желаемый результат. Профессиональные инструменты редактирования в едином пространстве.</p>
</section>

<section class="panel library">
<div class="head"><h2>✦ Библиотека идей и шаблонов</h2><span class="pill">50 ИДЕЙ</span></div>
<p class="hint">Подборки для фотографий и видеопроектов</p>

<div class="filters" id="filters">
<button class="filter active" data-filter="all">Все</button>
<button class="filter" data-filter="photo">📸 Фото</button>
<button class="filter" data-filter="video">🎬 Видео</button>
<button class="filter" data-filter="popular">🔥 Популярное</button>
<button class="filter" data-filter="new">🆕 Новые идеи</button>
<button class="filter" data-filter="favorites">♥ Избранное</button>
</div>

<div class="head" style="margin-top:17px"><h2>Модель или направление</h2></div>
<div class="filters" id="modelFilters">
<button class="filter active" data-model="all">Все модели</button>
<button class="filter" data-model="nano-banana">Nano Banana</button>
<button class="filter" data-model="flux">FLUX</button>
<button class="filter" data-model="kling">Kling</button>
<button class="filter" data-model="wan">Wan</button>
<button class="filter" data-model="seedance">Seedance</button>
</div>

<div class="tools">
<input id="librarySearch" class="search" type="search" placeholder="Поиск шаблона...">
<button id="clearSearch" class="filter">Сбросить</button>
</div>

<div class="head"><h2>Тематические подборки</h2><span class="hint">Выбери категорию</span></div>
<div class="categories" id="categories"></div>
<div class="collections" id="collections"></div>
<div class="cards" id="cards"></div>
<div class="count" id="count"></div>

<div class="safe">
<b>ℹ️ Важная информация</b>
Модели в карточках — рекомендации, а не подключённые генераторы. Видеокарточки — сценарии, генерация видео пока не подключена. Список идей пока редакционный, не автоматическая лента актуальных трендов.
</div>
</section>

<div class="layout">
<section class="panel">
<div class="head"><h2>01 · Выбери режим</h2><span class="hint">Обработка</span></div>
<div class="modes" id="modes">
<button class="mode active" data-mode="background"><span>🏙️</span><b>Замена фона</b></button>
<button class="mode" data-mode="portrait"><span>✨</span><b>Портрет</b></button>
<button class="mode" data-mode="retouch"><span>💎</span><b>Ретушь</b></button>
<button class="mode" data-mode="fashion"><span>👗</span><b>Образ и стиль</b></button>
<button class="mode" data-mode="studio"><span>📸</span><b>Фотосессия</b></button>
<button class="mode" data-mode="creative"><span>🎨</span><b>Своя идея</b></button>
</div>
<div class="head"><h2>02 · Исходное фото</h2><span class="hint">До 15 МБ</span></div>
<div class="upload">
<label for="photo"><div class="upload-icon">⬆️</div><b>Выбрать фотографию</b><small>Нажми, чтобы открыть галерею устройства</small></label>
<input id="photo" type="file" accept="image/jpeg,image/png,image/webp">
<img id="preview" class="preview" alt="Предпросмотр исходной фотографии">
</div>
<label class="field-label" for="prompt">03 · Опиши желаемый результат</label>
<textarea id="prompt" class="textarea" maxlength="4000" placeholder="Напиши, что нужно изменить."></textarea>
<div class="presets" id="presets">
<button class="preset" data-prompt="Замени только фон на роскошный современный интерьер. Сохрани человека, лицо, волосы, одежду, позу и пропорции без изменений.">Люкс-интерьер</button>
<button class="preset" data-prompt="Создай профессиональный студийный портрет с мягким светом. Сохрани точную идентичность лица и естественную текстуру кожи.">Студийный портрет</button>
<button class="preset" data-prompt="Выполни деликатную ретушь, сохрани поры и естественную текстуру кожи. Не меняй черты лица.">Естественная ретушь</button>
</div>
<label class="field-label" for="access">Тестовый код доступа</label>
<input id="access" class="input" type="password" autocomplete="current-password" placeholder="Введи тестовый код">
<button id="run" class="primary">Обработать фотографию</button>
<p class="note">Реальная генерация пока отключена до отдельного согласования платного теста.</p>
</section>

<aside class="panel">
<div class="head"><h2>04 · Результат</h2><span class="hint">Предпросмотр</span></div>
<div class="result-wrap">
<div id="empty"><div class="empty-icon">✧</div><div class="empty-text">Здесь появится готовая фотография после обработки</div></div>
<img id="result" alt="Результат обработки">
</div>
<div id="status" class="status" aria-live="polite"></div>
<button id="save" class="secondary" style="display:none">Сохранить результат</button>
<div class="safe"><b>🔒 Безопасный тестовый режим</b>Платная обработка выключена на сервере. Пока защита активна, запросы к платной модели не отправляются и списаний нет.</div>
</aside>
</div>
<div class="footer">AI BRATISHKA STUDIO · V4.1 TEST BUILD</div>
</div>
<script>
const photo=document.getElementById("photo");
const promptBox=document.getElementById("prompt");
const access=document.getElementById("access");
const run=document.getElementById("run");
const statusBox=document.getElementById("status");
const result=document.getElementById("result");
const preview=document.getElementById("preview");
const empty=document.getElementById("empty");
const save=document.getElementById("save");
const search=document.getElementById("librarySearch");

let outputUrl="";
let previewUrl="";
let activeFilter="all";
let activeCategory="all";
let activeModel="all";
let favorites=new Set();

try{
  favorites=new Set(JSON.parse(localStorage.getItem("bratishka-favorites-v4")||"[]"));
}catch(e){}

const templates=__TEMPLATES__;

const modelLabels={
  "nano-banana":"Nano Banana",
  "flux":"FLUX",
  "kling":"Kling",
  "wan":"Wan",
  "seedance":"Seedance"
};

const categories=[
  ["all","Все","✦"],
  ["portrait-men","Мужские портреты","👨"],
  ["portrait-women","Женские портреты","👩"],
  ["fashion","Мода","👗"],
  ["travel","Путешествия","🌍"],
  ["business","Бизнес","💼"],
  ["cars","Автомобили","🚘"],
  ["interiors","Интерьеры","🏡"],
  ["video","Видео","🎬"]
];

const categoriesBox=document.getElementById("categories");
const collectionsBox=document.getElementById("collections");
const cardsBox=document.getElementById("cards");
const countBox=document.getElementById("count");

let activeCollection="all";

const collections=[
  {
    id:"premium",
    icon:"💎",
    name:"Премиум",
    description:"Роскошные образы и интерьеры",
    categories:["portrait-men","portrait-women","fashion","business","interiors","cars"]
  },
  {
    id:"social",
    icon:"📱",
    name:"Для соцсетей",
    description:"Яркие фото для Reels и профиля",
    categories:["portrait-men","portrait-women","fashion","travel"]
  },
  {
    id:"cinematic",
    icon:"🎬",
    name:"Кинематограф",
    description:"Атмосфера кино и эффектный свет",
    categories:["video","portrait-men","portrait-women","cars","travel"]
  },
  {
    id:"personal",
    icon:"👔",
    name:"Личный бренд",
    description:"Портреты экспертов и бизнеса",
    categories:["business","portrait-men","portrait-women"]
  },
  {
    id:"travel",
    icon:"🌍",
    name:"Путешествия",
    description:"Красивые места и новые локации",
    categories:["travel"]
  }
];

function updateCollectionButtons(){
  collectionsBox.querySelectorAll(".collection").forEach(button=>{
    button.classList.toggle(
      "active",
      button.dataset.collection===activeCollection
    );
  });
}

collections.forEach(item=>{
  const button=document.createElement("button");
  button.type="button";
  button.className="collection";
  button.dataset.collection=item.id;

  button.innerHTML=
    "<b>"+item.icon+" "+item.name+"</b>"+
    "<small>"+item.description+"</small>";

  button.addEventListener("click",()=>{
    activeCollection=
      activeCollection===item.id?"all":item.id;

    activeCategory="all";

    categoriesBox.querySelectorAll(".category").forEach(x=>{
      x.classList.toggle(
        "active",
        x.dataset.category==="all"
      );
    });

    updateCollectionButtons();
    renderCards();
  });

  collectionsBox.appendChild(button);
});

categories.forEach(item=>{
  const button=document.createElement("button");
  button.className="category"+(item[0]==="all"?" active":"");
  button.textContent=item[2]+" "+item[1];
  button.dataset.category=item[0];

  button.addEventListener("click",()=>{
    activeCategory=item[0];
    activeCollection="all";

    categoriesBox.querySelectorAll(".category").forEach(x=>{
      x.classList.toggle("active",x===button);
    });

    updateCollectionButtons();
    renderCards();
  });

  categoriesBox.appendChild(button);
});

function renderCards(){
  const term=search.value.trim().toLowerCase();

  const shown=templates.filter(t=>{
    const filterOK=
      activeFilter==="all" ||
      (activeFilter==="photo" && t.type==="photo") ||
      (activeFilter==="video" && t.type==="video") ||
      (activeFilter==="popular" && t.popular) ||
      (activeFilter==="new" && t.isNew) ||
      (activeFilter==="favorites" && favorites.has(t.id));

const categoryOK=
  activeCategory==="all" || t.category===activeCategory;

const selectedCollection=
  collections.find(c=>c.id===activeCollection);

const collectionOK=
  activeCollection==="all" ||
  (selectedCollection &&
   selectedCollection.categories.includes(t.category));

const modelOK=
  activeModel==="all" ||
  (Array.isArray(t.models) && t.models.includes(activeModel));

    const searchOK=
      !term ||
      (t.name+" "+t.categoryName+" "+t.prompt+" "+
      (t.models||[]).map(m=>modelLabels[m]||m).join(" "))
      .toLowerCase().includes(term);

return filterOK && categoryOK && collectionOK && modelOK && searchOK;
  });

  cardsBox.replaceChildren();

  if(!shown.length){
    const emptyCard=document.createElement("div");
    emptyCard.className="empty-library";
    emptyCard.textContent="Ничего не найдено. Измени фильтр или поисковый запрос.";
    cardsBox.appendChild(emptyCard);
  }

  shown.forEach(t=>{
    const card=document.createElement("div");
    card.className="card";

    const main=document.createElement("button");
    main.type="button";
    main.style.cssText=
      "border:0;background:transparent;color:inherit;text-align:left;padding:0;display:flex;flex-direction:column;gap:7px;flex:1";


const icon=document.createElement("span");
icon.className="card-icon";

const categoryCovers = {
  "portrait-men": [
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=600&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=600&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80"
  ],

  "portrait-women": [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=600&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80",
    "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=600&q=80"
  ],

  fashion: [
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80"
  ],

  travel: [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&q=80",
    "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80"
  ],

  business: [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80"
  ],

  cars: [
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&q=80",
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80"
  ],

  interiors: [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80",
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80"
  ],

  video: [
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80",
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80",
    "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80",
    "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&q=80",
"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80",
"https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80"
  ]
};

const covers = categoryCovers[t.category] || [];
const coverIndex =
  Number(t.id.split("-").pop()) % Math.max(covers.length, 1);

if (covers.length) {
  icon.style.backgroundImage =
    'url("' + covers[coverIndex] + '")';
  icon.style.backgroundSize = "cover";
  icon.style.backgroundPosition =
    t.category.startsWith("portrait") ? "center 35%" : "center";
  icon.style.backgroundRepeat = "no-repeat";
  icon.textContent = "";
} else {
  icon.textContent = t.icon;
}

icon.setAttribute("aria-label",t.categoryName+" — обложка");

const tag=document.createElement("span");
tag.className="card-tag";
tag.textContent=t.categoryName;

const name=document.createElement("span");
name.className="card-name";
name.textContent=t.name;

    const meta=document.createElement("span");
    meta.className="card-meta";

    const modelText=(t.models||[])
      .map(m=>modelLabels[m]||m)
      .join(" · ");

    meta.textContent=
      (t.type==="photo"?"ФОТО":"ВИДЕО · СЦЕНАРИЙ")+
      " · "+t.categoryName+
      (modelText?" · "+modelText:"");

    main.append(icon,tag,name,meta);

    main.addEventListener("click",()=>{
      promptBox.value=t.prompt;
      promptBox.focus();

      statusBox.textContent=
        "Шаблон «"+t.name+"» выбран. Рекомендация по моделям: "+
        modelText+". Это не означает, что эти модели подключены.";

      document.querySelector(".layout").scrollIntoView({
        behavior:"smooth",
        block:"start"
      });
    });

    const star=document.createElement("button");
    star.type="button";
    star.className="star"+(favorites.has(t.id)?" saved":"");
    star.textContent=favorites.has(t.id)?"★":"☆";
    star.setAttribute("aria-label","Добавить в избранное");

    star.addEventListener("click",()=>{
      if(favorites.has(t.id)){
        favorites.delete(t.id);
      }else{
        favorites.add(t.id);
      }

      try{
        localStorage.setItem(
          "bratishka-favorites-v4",
          JSON.stringify([...favorites])
        );
      }catch(e){}

      renderCards();
    });

    card.append(main,star);
    cardsBox.appendChild(card);
  });

  countBox.textContent=
    "Показано шаблонов: "+shown.length+" из "+templates.length;
}

document.querySelectorAll("[data-filter]").forEach(button=>{
  button.addEventListener("click",()=>{
    activeFilter=button.dataset.filter;

    document.querySelectorAll("[data-filter]").forEach(x=>{
      x.classList.toggle("active",x===button);
    });

    renderCards();
  });
});

document.querySelectorAll("[data-model]").forEach(button=>{
  button.addEventListener("click",()=>{
    activeModel=button.dataset.model;

    document.querySelectorAll("[data-model]").forEach(x=>{
      x.classList.toggle("active",x===button);
    });

    renderCards();
  });
});

search.addEventListener("input",renderCards);

document.getElementById("clearSearch").addEventListener("click",()=>{
  search.value="";
  activeFilter="all";
  activeCategory="all";
  activeModel="all";

  document.querySelectorAll("[data-filter]").forEach(x=>{
    x.classList.toggle("active",x.dataset.filter==="all");
  });

  document.querySelectorAll("[data-model]").forEach(x=>{
    x.classList.toggle("active",x.dataset.model==="all");
  });

  categoriesBox.querySelectorAll(".category").forEach(x=>{
    x.classList.toggle("active",x.dataset.category==="all");
  });

  renderCards();
});

renderCards();

const modePrompts={
  background:"Замени только фон на выбранную локацию. Сохрани человека, лицо, волосы, одежду, позу и пропорции без изменений. Сделай освещение и тени реалистичными.",
  portrait:"Создай профессиональный портрет с мягким объёмным светом. Сохрани точную идентичность лица, возраст, черты и естественную текстуру кожи.",
  retouch:"Выполни деликатную профессиональную ретушь. Сохрани индивидуальные черты лица, поры и естественную текстуру кожи.",
  fashion:"Создай стильный fashion-образ с профессиональной журнальной подачей. Сохрани идентичность человека.",
  studio:"Преврати снимок в профессиональную фотосессию с тщательно выстроенным светом и выразительной композицией.",
  creative:"Опиши свою идею. Укажи, что именно нужно изменить и какие детали фотографии должны остаться нетронутыми."
};

document.querySelectorAll("#modes .mode").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll("#modes .mode").forEach(x=>{
      x.classList.toggle("active",x===btn);
    });

    promptBox.value=modePrompts[btn.dataset.mode];
  });
});

document.querySelectorAll(".preset").forEach(btn=>{
  btn.addEventListener("click",()=>{
    promptBox.value=btn.dataset.prompt;
  });
});

photo.addEventListener("change",()=>{
  const file=photo.files[0];
  if(!file)return;

  if(file.size>15*1024*1024){
    statusBox.textContent=
      "Файл больше 15 МБ. Выбери фотографию до 15 МБ.";
    photo.value="";
    return;
  }

  if(previewUrl)URL.revokeObjectURL(previewUrl);

  previewUrl=URL.createObjectURL(file);
  preview.src=previewUrl;
  preview.style.display="block";

  statusBox.textContent=
    "Фотография загружена. Выбери режим и уточни задачу.";
});

run.onclick=async()=>{
  const file=photo.files[0];
  const prompt=promptBox.value.trim();

  if(!file){
    statusBox.textContent="Сначала выбери фотографию.";
    return;
  }

  if(!prompt){
    statusBox.textContent="Опиши желаемый результат.";
    return;
  }

  if(!access.value.trim()){
    statusBox.textContent="Введи тестовый код доступа.";
    return;
  }

  run.disabled=true;
  statusBox.textContent="Проверяю настройки безопасного режима...";
  result.style.display="none";
  save.style.display="none";
  empty.style.display="block";

  try{
    const data=new FormData();
    data.append("image",file);
    data.append("prompt",prompt);

    const response=await fetch("/api/edit",{
      method:"POST",
      headers:{"X-V4-Test-Key":access.value.trim()},
      body:data
    });

    const answer=await response.json();

    if(!response.ok){
      throw new Error(answer.error||"Ошибка обработки");
    }

    const bytes=Uint8Array.from(
      atob(answer.image),
      c=>c.charCodeAt(0)
    );

    const blob=new Blob([bytes],{type:"image/png"});

    if(outputUrl)URL.revokeObjectURL(outputUrl);

    outputUrl=URL.createObjectURL(blob);
    result.src=outputUrl;
    result.style.display="block";
    empty.style.display="none";
    save.style.display="block";
    statusBox.textContent="Готово!";

  }catch(e){
    statusBox.textContent="Ошибка: "+e.message;
  }finally{
    run.disabled=false;
  }
};

save.onclick=()=>{
  if(!outputUrl)return;

  const a=document.createElement("a");
  a.href=outputUrl;
  a.download="AI-Bratishka-Studio.png";
  a.click();
};
</script>
</body>
</html>`;
function makeHTML(){
  return HTML.replace("__TEMPLATES__",JSON.stringify(TEMPLATES));
}

export default {
  async fetch(request,env){
    const url=new URL(request.url);
    const headers={
      "Cache-Control":"no-store",
      "X-Content-Type-Options":"nosniff"
    };

    if(request.method==="GET" && url.pathname==="/"){
      return new Response("AI Bratishka Studio V4.1 is running",{
        headers:{
          ...headers,
          "Content-Type":"text/plain; charset=utf-8"
        }
      });
    }

    if(request.method==="GET" && url.pathname==="/app"){
      return new Response(makeHTML(),{
        headers:{
          ...headers,
          "Content-Type":"text/html; charset=utf-8"
        }
      });
    }

    if(request.method!=="POST" || url.pathname!=="/api/edit"){
      return Response.json(
        {error:"Страница не найдена."},
        {status:404,headers}
      );
    }

    try{
      const expectedKey=env.V4_TEST_KEY||"";
      const suppliedKey=request.headers.get("X-V4-Test-Key")||"";

      let keyMatches=
        expectedKey.length>0 &&
        expectedKey.length===suppliedKey.length;

      if(keyMatches){
        let difference=0;

        for(let i=0;i<expectedKey.length;i++){
          difference|=
            expectedKey.charCodeAt(i)^
            suppliedKey.charCodeAt(i);
        }

        keyMatches=difference===0;
      }

      if(!keyMatches){
        return Response.json(
          {error:"Неверный тестовый код доступа."},
          {status:401,headers}
        );
      }

      // Платная обработка выключена.
      // Запросы к платным API не отправляются.
      if(env.ENABLE_PAID_IMAGE_API!=="true"){
        return Response.json({
          error:"Платная обработка выключена. Запрос к OpenAI не отправлялся и списаний нет."
        },{
          status:403,
          headers
        });
      }

      // Этот участок не будет достигнут,
      // пока платная обработка выключена.
      if(!env.OPENAI_API_KEY){
        return Response.json(
          {error:"API-ключ не настроен."},
          {status:503,headers}
        );
      }

      if(!request.headers.get("Content-Type")?.includes("multipart/form-data")){
        return Response.json(
          {error:"Неверный формат запроса."},
          {status:400,headers}
        );
      }

      const form=await request.formData();
      const photo=form.get("image");
      const userPrompt=String(form.get("prompt")||"").trim();

      if(
        !photo ||
        typeof photo!=="object" ||
        typeof photo.arrayBuffer!=="function"
      ){
        return Response.json(
          {error:"Загрузи фотографию."},
          {status:400,headers}
        );
      }

      const allowedTypes=[
        "image/jpeg",
        "image/png",
        "image/webp"
      ];

      if(!allowedTypes.includes(photo.type)){
        return Response.json(
          {error:"Поддерживаются только JPG, PNG и WebP."},
          {status:400,headers}
        );
      }

      if(photo.size>MAX_FILE_SIZE){
        return Response.json(
          {error:"Размер фотографии не должен превышать 15 МБ."},
          {status:413,headers}
        );
      }

      if(userPrompt.length<5 || userPrompt.length>4000){
        return Response.json(
          {error:"Описание должно содержать от 5 до 4000 символов."},
          {status:400,headers}
        );
      }

      const professionalPrompt=`
Edit the exact uploaded photograph. Apply only the changes requested by the user.

Preserve the original person's identity, facial geometry, eyes, nose, mouth,
expression, skin tone, apparent age, hairstyle and distinctive features.
Preserve body proportions, pose, clothing and accessories unless explicitly
asked to change them.

Create a coherent, natural-looking professional photograph.
Match lighting direction, exposure, color temperature, perspective,
depth of field, reflections and shadows.

Maintain realistic textures and natural transitions.
Avoid cutout edges, halos, distorted anatomy, duplicated objects
and artificial-looking skin.

When changing the background, make the new environment look as though
the original photograph was genuinely taken there.
Ensure consistent lighting, perspective, color and depth.

Do not redesign the person's face or replace the person with someone else.
Do not make unrelated changes.

USER INSTRUCTIONS:
${userPrompt}
      `.trim();

      const apiForm=new FormData();

      apiForm.append("model",MODEL);
      apiForm.append(
        "image[]",
        photo,
        photo.name||"photo.jpg"
      );
      apiForm.append("prompt",professionalPrompt);
      apiForm.append("quality","max");
      apiForm.append("output_format","png");

      const apiResponse=await fetch(
        "https://api.openai.com/v1/images/edits",
        {
          method:"POST",
          headers:{
            "Authorization":`Bearer ${env.OPENAI_API_KEY}`
          },
          body:apiForm
        }
      );

      if(!apiResponse.ok){
        let errorMessage=
          "Сервис обработки изображения временно недоступен.";

        try{
          const errorData=await apiResponse.json();
          const code=errorData?.error?.code;

          if(code==="insufficient_quota"){
            errorMessage=
              "На API-аккаунте недостаточно средств или доступной квоты.";
          }else if(code==="invalid_api_key"){
            errorMessage=
              "API-ключ не принят. Проверь настройки доступа.";
          }else if(apiResponse.status===429){
            errorMessage=
              "Слишком много запросов. Попробуй позже.";
          }
        }catch(error){}

        console.error(
          "Image API error status:",
          apiResponse.status
        );

        return Response.json(
          {error:errorMessage},
          {status:502,headers}
        );
      }

      const result=await apiResponse.json();
      const imageBase64=result?.data?.[0]?.b64_json;

      if(!imageBase64){
        return Response.json(
          {error:"Модель не вернула готовое изображение."},
          {status:502,headers}
        );
      }

      return Response.json(
        {image:imageBase64},
        {headers}
      );

    }catch(error){
      console.error(
        "Studio V4.1 error:",
        error?.message||"Unknown error"
      );

      return Response.json(
        {error:"Внутренняя ошибка сервера."},
        {status:500,headers}
      );
    }
  }
};