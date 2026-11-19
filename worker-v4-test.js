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

:root{
  color-scheme:dark;
  --bg:#080808;
  --panel:#151413;
  --line:#302a20;
  --muted:#a9a194;
  --text:#f5f0e6;
  --accent:#d6b66a;
  --gold:#d6b66a;
  --gold-soft:#f0dfb2;
  --surface:#1b1916;
  --surface2:#211d17;
}

*{box-sizing:border-box}

body{
  margin:0;
  background:
    radial-gradient(ellipse at 50% -15%,#342819 0,transparent 42%),
    radial-gradient(ellipse at 100% 40%,#17130d 0,transparent 35%),
    var(--bg);
  color:var(--text);
  font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif
}

button,input,textarea{font:inherit}
button{cursor:pointer}

.shell{max-width:1120px;margin:auto;padding:22px 18px 60px}

.top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-bottom:30px
}

.brand{display:flex;align-items:center;gap:11px}

.logo{
  width:42px;
  height:42px;
  border-radius:14px;
  background:linear-gradient(135deg,#ead59b,#a27b39);
  display:grid;
  place-items:center;
  font-size:22px;
  color:#17130b;
  box-shadow:0 0 25px #d6b66a25
}

.brand b{font-size:16px;letter-spacing:.6px}
.brand small{display:block;color:var(--muted);font-size:11px;margin-top:3px}

.pill{
  font-size:11px;
  color:#dfc783;
  border:1px solid #6c5934;
  background:#211c13;
  padding:8px 11px;
  border-radius:99px
}

.hero{margin-bottom:26px}

.eyebrow{
  color:#d6b66a;
  font-size:11px;
  font-weight:700;
  letter-spacing:1.7px
}

.hero h1{
  font-size:clamp(28px,5vw,43px);
  line-height:1.08;
  letter-spacing:-1.5px;
  margin:10px 0
}

.hero p{
  color:var(--muted);
  max-width:650px;
  line-height:1.7;
  margin:0;
  font-size:14px
}

.panel{
  background:linear-gradient(180deg,#191817,#111110);
  border:1px solid #302a20;
  border-radius:20px;
  padding:18px;
  box-shadow:0 18px 55px #0006
}

.head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-bottom:14px
}

.head h2{font-size:15px;margin:0}
.hint{color:var(--muted);font-size:11px}

.library{margin-bottom:18px}

.filters,.chips{display:flex;flex-wrap:wrap;gap:7px}

.filter,.chip{
  border:1px solid #393229;
  border-radius:99px;
  background:#1b1916;
  color:#d8d2c5;
  padding:9px 11px;
  font-size:11px;
  transition:background .2s,border-color .2s,color .2s
}

.filter.active,.chip.active{
  background:#3a3020;
  border-color:#d6b66a;
  color:#f5e7bd
}

.tools{
  display:grid;
  grid-template-columns:1fr auto;
  gap:9px;
  margin:14px 0
}

.input,.search{
  width:100%;
  border:1px solid #302a20;
  border-radius:11px;
  background:#0e0d0c;
  color:white;
  padding:12px;
  font-size:13px;
  outline:none
}

.input:focus,.search:focus,.textarea:focus{
  border-color:#d6b66a;
  box-shadow:0 0 0 3px #d6b66a12
}

.categories{
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:8px;
  margin:12px 0 16px
}

.collections{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:9px;
  margin:12px 0 17px
}

.collection{
  min-height:82px;
  padding:12px;
  text-align:left;
  color:white;
  border:1px solid #393229;
  border-radius:15px;
  background:linear-gradient(145deg,#201d18,#151413);
  transition:transform .2s,border-color .2s,background .2s
}

.collection:hover{transform:translateY(-2px);border-color:#8b7145}

.collection.active{
  border-color:#d6b66a;
  background:linear-gradient(145deg,#3a3020,#211b13)
}

.collection b{display:block;font-size:12px;margin-bottom:5px}
.collection small{color:#b9ad98;font-size:10px;line-height:1.4}

.category{
  border:1px solid #302a20;
  background:#171615;
  border-radius:13px;
  padding:11px 7px;
  color:#e8dfd0;
  font-size:11px;
  transition:transform .2s,border-color .2s,background .2s
}

.category:hover{border-color:#8b7145;transform:translateY(-1px)}
.category.active{border-color:#d6b66a;background:#33291b;color:#f5e7bd}

.cards{
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:10px
}

.card{
  position:relative;
  min-width:0;
  min-height:155px;
  text-align:left;
  border:1px solid #302a20;
  background:linear-gradient(180deg,#1b1a18,#121211);
  border-radius:18px;
  padding:14px 11px;
  color:white;
  display:flex;
  flex-direction:column;
  gap:9px;
  overflow:hidden;
  box-shadow:0 8px 24px rgba(0,0,0,.22);
  transition:transform .2s,border-color .2s,box-shadow .2s
}

.card:hover{
  border-color:#8b7145;
  transform:translateY(-3px);
  box-shadow:0 12px 30px #0005
}

.card-icon{
  display:flex;
  align-items:center;
  justify-content:center;
  width:100%;
  height:76px;
  border-radius:12px;
  font-size:38px;
  background:radial-gradient(circle at 50% 35%,#57472e,#29231b 55%,#191715);
  border:1px solid #ffffff08
}

.card-tag{
  display:inline-flex;
  align-self:flex-start;
  padding:4px 8px;
  border:1px solid #d6b66a44;
  border-radius:20px;
  background:#d6b66a12;
  color:#dfc783;
  font-size:9px;
  font-weight:700;
  letter-spacing:.4px;
  text-transform:uppercase
}

.card-name{font-size:12px;font-weight:750;line-height:1.35;padding-right:18px}
.card-meta{font-size:9px;color:#b8ad9c;line-height:1.4}

.star{
  position:absolute;
  right:7px;
  top:7px;
  border:1px solid #ffffff20;
  border-radius:9px;
  background:#171512cc;
  color:#d6c7a5;
  font-size:18px;
  padding:3px 7px;
  z-index:2
}

.star.saved{color:#ffd76a}

.count{font-size:11px;color:var(--muted);margin-top:12px}

.empty-library{
  grid-column:1/-1;
  text-align:center;
  color:var(--muted);
  padding:25px 10px;
  font-size:12px
}

.safe{
  border:1px solid #315c4d;
  background:#14251f;
  border-radius:12px;
  padding:12px;
  margin-top:15px;
  color:#b8e7d2;
  font-size:11px;
  line-height:1.5
}

.safe b{display:block;color:#d4f6e6;margin-bottom:3px}

.layout{
  display:grid;
  grid-template-columns:minmax(0,1.15fr) minmax(300px,.85fr);
  gap:18px;
  align-items:start
}

.modes{
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:9px;
  margin-bottom:20px
}

.mode{
  border:1px solid #302a20;
  background:#171615;
  border-radius:14px;
  padding:12px 9px;
  text-align:left;
  color:white;
  min-height:78px;
  transition:transform .2s,border-color .2s,background .2s
}

.mode:hover{transform:translateY(-2px);border-color:#8b7145}
.mode span{display:block;font-size:21px;margin-bottom:7px}
.mode b{font-size:11px}
.mode.active{border-color:#d6b66a;background:linear-gradient(145deg,#352a1c,#211b14)}

.field-label{
  display:block;
  font-size:12px;
  color:#e0d5c1;
  font-weight:650;
  margin:15px 0 8px
}

.upload{
  border:1px dashed #776342;
  background:#11100e;
  border-radius:15px;
  padding:17px;
  text-align:center;
  transition:border-color .2s,background .2s
}

.upload:hover{border-color:#d6b66a;background:#181510}
.upload input{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  opacity:0;
  cursor:pointer;
  z-index:2;
}
.upload{
  position:relative;
}
.upload label{
  position:relative;
  z-index:1;
  display:block;
  cursor:pointer;
}
.upload label{display:block;cursor:pointer}
.upload-icon{font-size:27px;margin-bottom:7px}
.upload b{font-size:13px}
.upload small{display:block;color:var(--muted);font-size:11px;margin-top:5px}

.preview{
  display:none;
  width:100%;
  max-height:370px;
  object-fit:contain;
  background:#090b10;
  border-radius:12px;
  margin-top:12px
}

.textarea{
  width:100%;
  min-height:116px;
  resize:vertical;
  border:1px solid #302a20;
  border-radius:12px;
  background:#0e0d0c;
  color:white;
  padding:13px;
  line-height:1.5;
  font-size:13px;
  outline:none
}

.presets{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}

.preset{
  border:1px solid #393229;
  border-radius:99px;
  background:#1b1916;
  color:#d8d2c5;
  padding:8px 10px;
  font-size:11px;
  transition:border-color .2s,background .2s
}

.preset:hover{border-color:#8b7145;background:#29231b}

.primary{
  width:100%;
  border:0;
  border-radius:12px;
  padding:14px;
  background:linear-gradient(110deg,#e1c47d,#b18a43);
  color:#17130b;
  font-weight:750;
  margin-top:15px;
  box-shadow:0 5px 18px #d6b66a15;
  transition:filter .2s,transform .2s
}

.primary:hover{filter:brightness(1.08);transform:translateY(-1px)}
.primary:disabled{opacity:.55;cursor:wait;transform:none}

.secondary{
  width:100%;
  border:1px solid #393229;
  background:#1a1815;
  color:#e9ecf5;
  border-radius:11px;
  padding:12px;
  margin-top:10px
}

.secondary:hover{border-color:#8b7145}

.note{font-size:11px;color:var(--muted);line-height:1.5;margin:11px 0 0}

.result-wrap{
  min-height:250px;
  border:1px dashed #393229;
  border-radius:15px;
  background:#0e0d0c;
  display:grid;
  place-items:center;
  padding:14px;
  text-align:center
}

.result-wrap img{
  display:none;
  max-width:100%;
  max-height:500px;
  object-fit:contain;
  border-radius:10px
}

.empty-icon{font-size:32px}
.empty-text{font-size:12px;color:var(--muted);line-height:1.5;margin-top:9px}

.status{
  font-size:12px;
  line-height:1.5;
  margin-top:12px;
  color:#dfc783;
  overflow-wrap:anywhere
}

.footer{text-align:center;color:#756d61;font-size:10px;margin-top:22px}

@media(max-width:760px){
  .shell{padding:16px 13px 42px}
  .layout{grid-template-columns:1fr}
  .panel{padding:15px}
  .cards{grid-template-columns:repeat(2,minmax(0,1fr))}
}

@media(max-width:370px){
  .modes,.categories{grid-template-columns:repeat(2,minmax(0,1fr))}
  .tools{grid-template-columns:1fr}
}

/* ===== AI BRATISHKA V4: RESPONSIVE DESIGN ===== */

.top-actions {
  display:flex;
  align-items:center;
  gap:10px;
}

.profile-button {
  width:42px;
  height:42px;
  border:1px solid #393229;
  border-radius:50%;
  background:#1b1916;
  color:#d6b66a;
}

.home-screen,
.library-section,
.studio-section {
  margin-bottom:32px;
}

.home-hero {
  position:relative;
  overflow:hidden;
  border:1px solid #302a20;
  border-radius:22px;
  padding:clamp(22px,5vw,42px);
  background:
    radial-gradient(ellipse at 85% 15%,#49371d66,transparent 48%),
    linear-gradient(135deg,#211b13,#10100f 70%);
}

.hero-content {
  position:relative;
  z-index:1;
  max-width:650px;
}

.hero-content h1 {
  margin:18px 0;
  font-size:clamp(30px,5vw,48px);
  line-height:1.12;
  letter-spacing:-1px;
}

.hero-content h1 span {
  color:#d6b66a;
}

.hero-content p {
  max-width:560px;
  color:#c2b9aa;
  font-size:15px;
  line-height:1.6;
}

.hero-cta {
  max-width:360px;
}

.hero-caption {
  margin-top:12px;
  color:#c5b58d;
  font-size:11px;
  letter-spacing:1px;
}

.section-heading {
  display:flex;
  align-items:end;
  justify-content:space-between;
  gap:12px;
  margin:30px 0 15px;
}

.section-heading h2 {
  margin:7px 0 0;
  font-size:24px;
}

.section-mark,
.idea-count {
  color:#c9ad6d;
  font-size:11px;
  white-space:nowrap;
}

.section-description {
  color:#aaa194;
  font-size:13px;
  line-height:1.5;
}

.featured-grid {
  display:grid;
  grid-template-columns:1.35fr 1fr 1fr;
  gap:12px;
}

.featured-card {
  position:relative;
  display:block;
  min-width:0;
  height:210px;
  overflow:hidden;
  padding:0;
  border:1px solid #393229;
  border-radius:16px;
  background:#171512;
  color:white;
  text-align:left;
}

.featured-card img {
  width:100%;
  height:100%;
  display:block;
  object-fit:cover;
}

.featured-shade {
  position:absolute;
  inset:0;
  background:linear-gradient(0deg,#000d,transparent 75%);
}

.featured-info {
  position:absolute;
  left:14px;
  right:12px;
  bottom:14px;
  display:flex;
  flex-direction:column;
  gap:6px;
}

.featured-info small {
  color:#e1c47d;
  font-size:10px;
  letter-spacing:1px;
}

.featured-info b {
  font-size:17px;
  line-height:1.2;
}

.featured-link {
  color:#e1c47d;
  font-size:11px;
}

.tool-grid {
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:10px;
}

.tool-card {
  display:flex;
  align-items:center;
  gap:10px;
  min-width:0;
  padding:14px;
  border:1px solid #393229;
  border-radius:15px;
  background:linear-gradient(145deg,#211d17,#121110);
  color:white;
  text-align:left;
}

.tool-icon {
  color:#d6b66a;
  font-size:23px;
}

.tool-copy {
  display:flex;
  flex:1;
  flex-direction:column;
  gap:5px;
}

.tool-copy b {
  font-size:12px;
}

.tool-copy small {
  color:#aaa194;
  font-size:10px;
  line-height:1.4;
}

.tool-arrow,
.coming-soon {
  color:#d6b66a;
  font-size:10px;
}

.studio-promo {
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:15px;
  margin-top:18px;
  padding:22px;
  border:1px solid #493b25;
  border-radius:18px;
  background:linear-gradient(120deg,#292116,#121110);
}

.promo-copy {
  max-width:430px;
}

.promo-copy h3 {
  font-size:25px;
  line-height:1.15;
}

.promo-copy p {
  color:#b9b0a2;
  font-size:13px;
  line-height:1.5;
}

.text-action {
  border:0;
  background:none;
  color:#e0c47e;
  padding:8px 0;
}

.promo-art {
  color:#d6b66a;
  font-size:48px;
  text-align:center;
}

.cards-head {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  margin:18px 0 12px;
}

.cards-head h3 {
  margin:0;
  font-size:16px;
}

.template-card {
  min-width:0;
  overflow:hidden;
  border:1px solid #302a20;
  border-radius:15px;
  background:#151413;
}

.template-image {
  position:relative;
  width:100%;
  height:175px;
  overflow:hidden;
  background:#211d17;
}

.template-image img {
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
}

.template-type,
.template-popular,
.template-new {
  position:absolute;
  left:8px;
  top:8px;
  padding:5px 7px;
  border-radius:20px;
  background:#080808bb;
  color:#e6d3a0;
  font-size:9px;
}

.template-popular {
  top:34px;
}

.template-new {
  top:34px;
  left:auto;
  right:8px;
}

.favorite-button {
  position:absolute;
  top:7px;
  right:7px;
  width:30px;
  height:30px;
  border:1px solid #ffffff30;
  border-radius:50%;
  background:#080808bb;
  color:#d6b66a;
}

.favorite-button.active {
  color:#ffcf70;
}

.template-info {
  padding:11px;
}

.template-info small {
  color:#c6a65d;
  font-size:9px;
  text-transform:uppercase;
}

.template-info h4 {
  margin:6px 0;
  font-size:13px;
  line-height:1.3;
}

.template-info p {
  display:-webkit-box;
  overflow:hidden;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:3;
  margin:5px 0 10px;
  color:#aaa194;
  font-size:11px;
  line-height:1.4;
}

.template-use {
  width:100%;
  padding:9px 7px;
  border:1px solid #59482b;
  border-radius:9px;
  background:#211b13;
  color:#e2c47b;
  font-size:11px;
}

@media(max-width:760px) {
  .shell {
    padding:13px 12px 35px;
  }

  .top {
    gap:8px;
    margin-bottom:20px;
  }

  .brand b {
    font-size:14px;
  }

  .brand small {
    font-size:9px;
  }

  .logo {
    width:38px;
    height:38px;
  }

  .top-actions {
    gap:6px;
  }

  .pill {
    padding:7px 8px;
    font-size:9px;
  }

  .profile-button {
    width:36px;
    height:36px;
  }

  .home-hero {
    padding:22px 17px;
    border-radius:17px;
  }

  .hero-content h1 {
    font-size:32px;
    margin:14px 0;
  }

  .hero-content p {
    font-size:13px;
    line-height:1.5;
  }

  .hero-cta {
    max-width:none;
    padding:12px;
    font-size:14px;
  }

  .hero-caption {
    font-size:9px;
  }

  .section-heading {
    margin:23px 0 12px;
  }

  .section-heading h2 {
    font-size:20px;
  }

  .featured-grid {
    grid-template-columns:1fr 1fr;
    gap:8px;
  }

  .featured-card {
    height:145px;
    border-radius:12px;
  }

  .featured-large {
    grid-column:1/-1;
    height:185px;
  }

  .featured-info {
    left:10px;
    bottom:10px;
  }

  .featured-info b {
    font-size:14px;
  }

  .tool-grid {
    grid-template-columns:1fr;
    gap:8px;
  }

  .tool-card {
    padding:11px;
  }

  .studio-promo {
    padding:16px;
  }

  .promo-copy h3 {
    font-size:21px;
  }

  .promo-art {
    font-size:34px;
  }

  .cards {
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:8px;
  }

  .template-image {
    height:135px;
  }

  .template-info {
    padding:9px;
  }

  .template-info h4 {
    font-size:12px;
  }

  .template-info p {
    font-size:10px;
    -webkit-line-clamp:2;
  }

  .template-use {
    padding:8px 5px;
    font-size:10px;
  }

  .panel {
    padding:12px;
  }
}

@media(max-width:370px) {
  .cards {
    grid-template-columns:1fr;
  }

  .template-image {
    height:165px;
  }

  .featured-card {
    height:125px;
  }

  .featured-large {
    height:165px;
  }

  .hero-content h1 {
    font-size:29px;
  }
}


/* ===== CATALOG MOBILE FIX ===== */

#catalog,
#catalog .library {
  width:100%;
  max-width:100%;
  min-width:0;
}

#catalog .library {
  overflow:hidden;
}

#catalog .filters,
#catalog .model-filters {
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  gap:7px;
  width:100%;
  min-width:0;
}

#catalog .filter,
#catalog .model-filter {
  min-height:34px;
  padding:7px 11px;
  border:1px solid #393229;
  border-radius:30px;
  background:#1b1916;
  color:#d8d2c5;
  font-size:12px;
  line-height:1.2;
  white-space:nowrap;
}

#catalog .filter.active,
#catalog .model-filter.active {
  border-color:#d6b66a;
  background:#33291b;
  color:#f5e7bd;
}

#catalog .search-row {
  display:flex;
  align-items:center;
  gap:8px;
  width:100%;
  min-width:0;
  margin:13px 0;
}

#catalog .search-box {
  display:flex;
  align-items:center;
  flex:1;
  min-width:0;
  gap:8px;
  padding:0 11px;
  border:1px solid #393229;
  border-radius:11px;
  background:#0e0d0c;
}

#catalog .search-box span {
  color:#d6b66a;
  font-size:19px;
}

#catalog #search {
  width:100%;
  min-width:0;
  height:42px;
  padding:8px 0;
  border:0;
  outline:0;
  background:transparent;
  color:#fff;
  font-size:13px;
}

#catalog .clear-search {
  flex:0 0 38px;
  width:38px;
  height:38px;
  border:1px solid #393229;
  border-radius:50%;
  background:#1b1916;
  color:#d6b66a;
  font-size:20px;
}

#catalog .categories {
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:7px;
  width:100%;
  min-width:0;
}

#catalog .collections {
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:8px;
  width:100%;
  min-width:0;
}

#catalog .cards {
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:10px;
  width:100%;
  min-width:0;
  overflow:hidden;
}

#catalog .template-card {
  display:block;
  width:100%;
  max-width:100%;
  min-width:0;
  overflow:hidden;
}

#catalog .template-image {
  width:100%;
  height:145px;
  overflow:hidden;
}

#catalog .template-image img {
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
}

#catalog .template-info {
  min-width:0;
  overflow-wrap:anywhere;
}

#catalog .template-info h4,
#catalog .template-info p {
  overflow-wrap:anywhere;
}

@media(max-width:390px) {
  #catalog .filters,
  #catalog .model-filters {
    gap:6px;
  }

  #catalog .filter,
  #catalog .model-filter {
    padding:7px 9px;
    font-size:11px;
  }

  #catalog .cards {
    gap:7px;
  }

  #catalog .template-image {
    height:125px;
  }

  #catalog .categories {
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
}


/* ===== FIX CATEGORY CARDS ON MOBILE ===== */

#catalog .category-card {
  position:relative;
  display:flex;
  align-items:flex-end;
  justify-content:flex-start;
  width:100%;
  height:112px;
  min-height:112px;
  min-width:0;
  padding:10px;
  overflow:hidden;
  border:1px solid #393229;
  border-radius:13px;
  background:#211d17;
  color:#fff;
  text-align:left;
}

#catalog .category-card > img {
  position:absolute;
  inset:0;
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
  z-index:0;
}

#catalog .category-card .category-overlay {
  position:absolute;
  inset:0;
  z-index:1;
  background:linear-gradient(
    180deg,
    rgba(0,0,0,.05) 15%,
    rgba(0,0,0,.78) 100%
  );
}

#catalog .category-card .category-content {
  position:relative;
  z-index:2;
  display:flex;
  align-items:center;
  gap:7px;
  min-width:0;
  font-size:13px;
  text-shadow:0 2px 5px #000;
}

#catalog .category-card .category-content b {
  font-size:12px;
  line-height:1.2;
  overflow-wrap:anywhere;
}

#catalog .category-card.category-all {
  align-items:center;
  justify-content:center;
  flex-direction:column;
  gap:8px;
  background:linear-gradient(145deg,#302719,#171512);
  border-color:#8b7145;
  text-align:center;
}

#catalog .category-card.category-all .category-icon {
  font-size:27px;
}

#catalog .category-card:active {
  border-color:#d6b66a;
  transform:scale(.98);
}

@media(max-width:390px) {
  #catalog .category-card {
    height:105px;
    min-height:105px;
    padding:8px;
  }
}


/* ===== PREMIUM GOLD DESIGN UPDATE ===== */

:root {
  --accent:#E5A928;
  --gold:#E5A928;
  --gold-soft:#FFD15C;
  --line:#986313;
}

/* Основные золотые акценты */
.eyebrow,
.search-box span,
.clear-search {
  color:#FFD15C;
}

.pill {
  color:#FFD15C;
  border-color:#986313;
  background:linear-gradient(135deg,#21170a,#13110d);
}

.filter.active,
.model-filter.active,
.collection-chip.active {
  color:#FFD15C;
  border-color:#E5A928;
  background:linear-gradient(135deg,#30210e,#19140d);
  box-shadow:none;
}

/* Фильтры */
#catalog .filter,
#catalog .model-filter,
#catalog .collection-chip {
  border:1px solid #684717;
  background:#171512;
  color:#D6C5A6;
  transition:.2s ease;
}

#catalog .filter:active,
#catalog .model-filter:active,
#catalog .collection-chip:active {
  transform:scale(.97);
}

#catalog .collection-chip {
  min-height:42px;
  padding:10px 13px;
  border-radius:13px;
  font-size:12px;
}

#catalog .filter.active,
#catalog .model-filter.active,
#catalog .collection-chip.active {
  border-color:#E5A928;
  color:#FFD15C;
  background:linear-gradient(135deg,#392710,#1b150c);
}

/* Категории */
#catalog .category-card {
  border:1px solid #76501D;
  border-radius:15px;
  box-shadow:none;
}

#catalog .category-card.active {
  border:2px solid #E5A928;
  box-shadow:0 0 5px #E5A92820;
}

#catalog .category-content {
  width:100%;
  justify-content:center;
  gap:5px;
}

#catalog .category-content b {
  font-size:10.5px;
  white-space:nowrap;
  overflow-wrap:normal;
  letter-spacing:-.2px;
}

#catalog .category-all {
  border-color:#E5A928;
  background:linear-gradient(145deg,#30210e,#17130e);
}

/* Карточки идей */
#catalog .template-card {
  border:1px solid #684717;
  border-radius:16px;
  background:linear-gradient(180deg,#201c16,#121110);
  box-shadow:none;
}

#catalog .template-card:active {
  border-color:#E5A928;
}

#catalog .template-type,
#catalog .template-popular,
#catalog .template-new {
  border-color:#986313;
  color:#FFD15C;
  background:#21190f;
}

#catalog .template-use {
  border:1px solid #986313;
  border-radius:10px;
  background:linear-gradient(135deg,#392710,#21180e);
  color:#FFD15C;
  box-shadow:none;
}

#catalog .favorite-button {
  color:#FFD15C;
  border-color:#986313;
  background:#17120dcc;
}

#catalog .favorite-button.active {
  color:#FFD15C;
}

/* Нижняя навигация */
body {
  padding-bottom:100px;
}

.bottom-nav {
  position:fixed;
  z-index:100;
  left:50%;
  bottom:0;
  transform:translateX(-50%);
  width:min(100%,1120px);
  display:grid;
  grid-template-columns:repeat(5,minmax(0,1fr));
  gap:5px;
  padding:9px 12px calc(9px + env(safe-area-inset-bottom));
  border-top:1px solid #684717;
  background:rgba(10,9,8,.97);
  backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);
}

.nav-item {
  min-width:0;
  min-height:54px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:4px;
  padding:5px 2px;
  border:1px solid transparent;
  border-radius:12px;
  background:transparent;
  color:#A99B82;
  box-shadow:none;
}

.nav-item span {
  font-size:20px;
  line-height:1;
}

.nav-item small {
  font-size:10px;
  line-height:1.2;
  white-space:nowrap;
}

.nav-item.active {
  color:#FFD15C;
  border-color:#E5A928;
  background:linear-gradient(145deg,#30210e,#1b150c);
  box-shadow:0 0 5px #E5A92820;
}

.nav-item.nav-create {
  color:#FFD15C;
  border-color:#E5A928;
  background:linear-gradient(145deg,#392710,#21180e);
  box-shadow:0 0 6px #E5A92820;
}

.footer {
  padding-bottom:15px;
}

@media(max-width:390px) {
  .bottom-nav {
    gap:2px;
    padding-left:6px;
    padding-right:6px;
  }

  .nav-item small {
    font-size:9px;
  }

  #catalog .category-content b {
    font-size:9.5px;
  }
}


/* ===== PREMIUM TEMPLATE CARDS ===== */

#catalog .template-card {
  border:1px solid #76501D;
  border-radius:17px;
  background:#11100e;
  overflow:hidden;
  box-shadow:none;
  transition:border-color .2s ease, transform .2s ease;
}

#catalog .template-card:active {
  transform:scale(.985);
  border-color:#E5A928;
}

/* Фото */
#catalog .template-image {
  position:relative;
  height:155px;
  background:#171410;
  overflow:hidden;
}

#catalog .template-image img {
  width:100%;
  height:100%;
  display:block;
  object-fit:cover;
  transition:transform .35s ease;
}

#catalog .template-card:hover .template-image img {
  transform:scale(1.03);
}

/* Метки */
#catalog .template-type,
#catalog .template-popular,
#catalog .template-new {
  border:1px solid #986313;
  background:rgba(12,10,8,.88);
  color:#FFD15C;
  backdrop-filter:blur(5px);
}

/* Избранное */
#catalog .favorite-button {
  width:34px;
  height:34px;
  border:1px solid #986313;
  background:rgba(12,10,8,.88);
  color:#FFD15C;
  font-size:18px;
}

#catalog .favorite-button.active {
  color:#FFD15C;
  background:#30210e;
  border-color:#E5A928;
}

/* Информация */
#catalog .template-info {
  padding:12px;
  background:linear-gradient(180deg,#151310,#100f0d);
}

#catalog .template-info small {
  color:#C49A45;
  font-size:9px;
  letter-spacing:1px;
}

#catalog .template-info h4 {
  margin:7px 0;
  color:#F5F0E6;
  font-size:13px;
  line-height:1.35;
  font-weight:600;
}

#catalog .template-info p {
  color:#A99B82;
  font-size:10.5px;
  line-height:1.45;
  -webkit-line-clamp:2;
  margin:6px 0 12px;
}

/* Кнопка применения */
#catalog .template-use {
  min-height:38px;
  border:1px solid #986313;
  border-radius:10px;
  background:linear-gradient(135deg,#30210e,#19140d);
  color:#FFD15C;
  font-weight:600;
  transition:.2s ease;
}

#catalog .template-use:active {
  background:linear-gradient(135deg,#493318,#24190d);
  border-color:#E5A928;
  transform:scale(.98);
}

/* Мобильная версия */
@media(max-width:390px) {
  #catalog .template-image {
    height:135px;
  }

  #catalog .template-info {
    padding:10px;
  }

  #catalog .template-info h4 {
    font-size:12px;
  }

  #catalog .template-info p {
    font-size:10px;
  }
}

/* ===== BRATISHKA HISTORY ===== */

.history-section {
  padding: 22px 16px 110px;
  color: #F5F0E6;
}

.history-header h2 {
  font-size: 28px;
  font-weight: 700;
  margin: 10px 0;
  color: #F5F0E6;
}

.history-header p {
  color: #A99B82;
  font-size: 13px;
  line-height: 1.5;
}

.history-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px 0 18px;
  color: #C49A45;
  font-size: 12px;
}

.history-clear {
  background: #17130E;
  color: #D9B35A;
  border: 1px solid #76501D;
  padding: 9px 13px;
  border-radius: 10px;
  font-size: 12px;
}

.history-clear:active {
  background: #30210E;
  border-color: #E5A928;
}

.history-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.history-card {
  overflow: hidden;
  border: 1px solid #76501D;
  border-radius: 15px;
  background: #11100E;
}

.history-card-image {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  display: block;
  background: #171410;
}

.history-card-info {
  padding: 10px;
}

.history-card-date {
  color: #C49A45;
  font-size: 10px;
  margin-bottom: 7px;
}

.history-card-prompt {
  color: #F5F0E6;
  font-size: 11px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
}

.history-card-actions {
  display: flex;
  gap: 7px;
}

.history-card-actions button {
  flex: 1;
  min-width: 0;
  padding: 9px 5px;
  border-radius: 9px;
  font-size: 11px;
  color: #FFD15C;
  background: #19140D;
  border: 1px solid #986313;
}

.history-card-actions button:active {
  transform: scale(.97);
  background: #30210E;
}

.history-empty {
  text-align: center;
  padding: 50px 20px;
  border: 1px dashed #76501D;
  border-radius: 18px;
  background: #11100E;
}

.history-empty-icon {
  font-size: 42px;
  color: #E5A928;
  margin-bottom: 15px;
}

.history-empty h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #F5F0E6;
}

.history-empty p {
  font-size: 12px;
  line-height: 1.6;
  color: #A99B82;
  margin-bottom: 20px;
}

#history-go-studio {
  background: linear-gradient(135deg, #30210E, #19140D);
  border: 1px solid #986313;
  color: #FFD15C;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 600;
}

@media (max-width: 390px) {
  .history-grid {
    gap: 9px;
  }

  .history-card-info {
    padding: 8px;
  }

  .history-card-actions button {
    font-size: 10px;
    padding: 8px 3px;
  }
}
</style>

</head>

<body>

<div class="shell">

<header class="top">

  <a class="brand" href="#home">

    <div class="logo">✦</div>

    <div>

      <b>AI BRATISHKA</b>

      <small>CREATIVE STUDIO</small>

    </div>

  </a>

  <div class="top-actions">

    <span class="pill">V4 · TEST MODE</span>

    <button class="profile-button" id="profileButton" type="button" aria-label="Профиль">●</button>

  </div>

</header>

<!-- ГЛАВНАЯ -->

<section class="home-screen" id="home">

  <div class="home-hero">

    <div class="hero-image"></div>

    <div class="hero-content">

      <div class="eyebrow">ТВОЯ ЛИЧНАЯ AI-КИНОСТУДИЯ</div>

      <h1>Твоя идея.<br><span>Твой фильм.</span></h1>

      <p>Создавай впечатляющие фотографии и открывай мир AI-видео. Твоя творческая студия — прямо в телефоне.</p>

      <button class="primary hero-cta" id="openStudio" type="button">

        Открыть киностудию <span>↗</span>

      </button>

      <div class="hero-caption">

        <span class="caption-dot"></span>

        IMAGE STUDIO · VIDEO IDEAS · AI CREATION

      </div>

    </div>

  </div>

  <div class="section-heading">

    <div>

      <div class="eyebrow">ВЫБИРАЙ И СОЗДАВАЙ</div>

      <h2>Популярное</h2>

    </div>

    <span class="section-mark">01 / 03</span>

  </div>

  <div class="featured-grid">

    <button class="featured-card featured-large" type="button" data-open-category="portrait-women">

      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=85" alt="Портретная фотосессия">

      <span class="featured-shade"></span>

      <span class="featured-info">

        <small>PHOTO STUDIO</small>

        <b>Портрет<br>нового уровня</b>

        <span class="featured-link">Попробовать ↗</span>

      </span>

    </button>

    <button class="featured-card" type="button" data-open-category="travel">

      <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=700&q=85" alt="Путешествие">

      <span class="featured-shade"></span>

      <span class="featured-info">

        <small>TRAVEL</small>

        <b>Путешествие мечты</b>

        <span class="featured-link">Открыть ↗</span>

      </span>

    </button>

    <button class="featured-card" type="button" data-open-category="fashion">

      <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=85" alt="Мода и стиль">

      <span class="featured-shade"></span>

      <span class="featured-info">

        <small>FASHION</small>

        <b>Новый образ</b>

        <span class="featured-link">Открыть ↗</span>

      </span>

    </button>

  </div>

  <div class="section-heading catalog-heading">

    <div>

      <div class="eyebrow">ТВОИ ИНСТРУМЕНТЫ</div>

      <h2>Каталог</h2>

    </div>

    <span class="section-mark">02 / 03</span>

  </div>

  <div class="tool-grid">

    <button class="tool-card" type="button" id="homePhoto">

      <span class="tool-icon">✧</span>

      <span class="tool-copy">

        <b>AI-фотостудия</b>

        <small>Создание и редактирование фото</small>

      </span>

      <span class="tool-arrow">↗</span>

    </button>

    <button class="tool-card" type="button" id="homeVideo">

      <span class="tool-icon">▶</span>

      <span class="tool-copy">

        <b>AI-видеостудия</b>

        <small>Сценарии и идеи для видео</small>

      </span>

      <span class="tool-arrow">↗</span>

    </button>

    <button class="tool-card vpn-card" type="button" id="vpnButton">

      <span class="tool-icon">◈</span>

      <span class="tool-copy">

        <b>VPN</b>

        <small>Отдельный сервис в разработке</small>

      </span>

      <span class="coming-soon">СКОРО</span>

    </button>

  </div>

  <div class="studio-promo">

    <div class="promo-copy">

      <div class="eyebrow">ТВОЁ ТВОРЧЕСКОЕ ПРОСТРАНСТВО</div>

      <h3>От идеи<br>до результата</h3>

      <p>Выбирай готовый сценарий или придумай собственный — студия поможет начать.</p>

      <button class="text-action" type="button" id="promoOpenStudio">Перейти в студию <span>↗</span></button>

    </div>

    <div class="promo-art">

      <div class="promo-orbit"></div>

      <div class="promo-star">✦</div>

      <div class="promo-label">CREATE<br>WITHOUT LIMITS</div>

    </div>

  </div>

</section>

<!-- КАТАЛОГ И ШАБЛОНЫ -->

<section class="library-section" id="catalog">

  <div class="section-heading">

    <div>

      <div class="eyebrow">БИБЛИОТЕКА ИДЕЙ</div>

      <h2>Выбери свой стиль</h2>

      <p class="section-description">Готовые идеи для фотографий и видеосценариев.</p>

    </div>

    <span class="idea-count">60 ИДЕЙ</span>

  </div>

  <div class="library panel">

    <div class="library-top">

      <div>

        <h2>Каталог шаблонов</h2>

        <p class="hint">Выбери идею и используй её в своей работе</p>

      </div>

    </div>

    <div class="filters" id="filters">

      <button class="filter active" data-filter="all" type="button">Все</button>

      <button class="filter" data-filter="photo" type="button">Фото</button>

      <button class="filter" data-filter="video" type="button">Видео</button>

      <button class="filter" data-filter="popular" type="button">Популярное</button>

      <button class="filter" data-filter="new" type="button">Новинки</button>

      <button class="filter" data-filter="favorites" type="button">♡ Избранное</button>

    </div>

    <div class="model-filters" id="modelFilters">

      <button class="model-filter active" data-model="all" type="button">Все модели</button>

      <button class="model-filter" data-model="nano-banana" type="button">Nano Banana</button>

      <button class="model-filter" data-model="flux" type="button">FLUX</button>

      <button class="model-filter" data-model="kling" type="button">Kling</button>

      <button class="model-filter" data-model="wan" type="button">Wan</button>

      <button class="model-filter" data-model="seedance" type="button">Seedance</button>

    </div>

    <div class="search-row">

      <div class="search-box">

        <span>⌕</span>

        <input id="search" type="search" placeholder="Найти идею или категорию..." autocomplete="off">

      </div>

      <button id="clearSearch" class="clear-search" type="button" aria-label="Очистить поиск">×</button>

    </div>

    <div class="categories" id="categories"></div>

    <div class="collections" id="collections"></div>

    <div class="cards-head">

      <h3 id="cardsTitle">Все идеи</h3>

      <span id="cardsCount" class="hint"></span>

    </div>

    <div class="cards" id="cards"></div>

    <div class="empty-library" id="emptyLibrary" hidden>

      <span>✧</span>

      <b>Пока ничего не найдено</b>

      <small>Попробуй изменить фильтр или поисковый запрос.</small>

    </div>

    <p class="safe library-safe">

      Подборка содержит готовые идеи и сценарии. Доступность конкретных моделей зависит от подключения соответствующих сервисов.

    </p>

  </div>

</section>

<!-- РЕДАКТОР / ФОТОСТУДИЯ -->

<section class="studio-section" id="studio">

  <div class="section-heading">

    <div>

      <div class="eyebrow">IMAGE LAB</div>

      <h2>Твоя фотостудия</h2>

      <p class="section-description">Загрузи фотографию и опиши, каким должен быть результат.</p>

    </div>

    <span class="section-mark">03 / 03</span>

  </div>

  <div class="layout">

    <section class="panel">

      <div class="head">

        <h2>01 · Выбери режим</h2>

        <span class="hint">Обработка</span>

      </div>

      <div class="modes" id="modes">

        <button class="mode active" data-mode="background" type="button"><span>🏙️</span><b>Замена фона</b></button>

        <button class="mode" data-mode="portrait" type="button"><span>✨</span><b>Портрет</b></button>

        <button class="mode" data-mode="retouch" type="button"><span>💎</span><b>Ретушь</b></button>

        <button class="mode" data-mode="fashion" type="button"><span>👗</span><b>Образ и стиль</b></button>

        <button class="mode" data-mode="studio" type="button"><span>📸</span><b>Фотосессия</b></button>

        <button class="mode" data-mode="creative" type="button"><span>🎨</span><b>Своя идея</b></button>

      </div>

      <div class="head">

        <h2>02 · Исходное фото</h2>

        <span class="hint">До 15 МБ</span>

      </div>

      <div class="upload">

        <label for="photo">

          <div class="upload-icon">⬆️</div>

          <b>Выбрать фотографию</b>

          <small>Нажми, чтобы открыть галерею устройства</small>

        </label>

        <input id="photo" type="file" accept="image/jpeg,image/png,image/webp">

        <img id="preview" class="preview" alt="Предпросмотр исходной фотографии">

      </div>

      <label class="field-label" for="prompt">03 · Опиши желаемый результат</label>

      <textarea id="prompt" class="textarea" maxlength="4000" placeholder="Напиши, что нужно изменить. Например: замени фон на роскошный отель у моря, сохрани моё лицо и одежду."></textarea>

      <div class="presets" id="presets">

        <button class="preset" data-prompt="Замени только фон на роскошный современный интерьер. Сохрани человека, лицо, волосы, одежду, позу и пропорции без изменений.">Люкс-интерьер</button>

        <button class="preset" data-prompt="Создай профессиональный студийный портрет с мягким светом. Сохрани точную идентичность лица и естественную текстуру кожи.">Студийный портрет</button>

        <button class="preset" data-prompt="Выполни деликатную ретушь, сохрани поры и естественную текстуру кожи. Не меняй черты лица.">Естественная ретушь</button>

      </div>

      <label class="field-label" for="access">Тестовый код доступа</label>

      <input id="access" class="input" type="password" autocomplete="current-password" placeholder="Введи тестовый код">

      <button id="run" class="primary" type="button">Обработать фотографию</button>

      <p class="note">Реальная генерация пока отключена до отдельного согласования платного теста.</p>

    </section>

    <aside class="panel">

      <div class="head">

        <h2>04 · Результат</h2>

        <span class="hint">Предпросмотр</span>

      </div>

      <div class="result-wrap">

        <div id="empty">

          <div class="empty-icon">✧</div>

          <div class="empty-text">Здесь появится готовая фотография после обработки</div>

        </div>

        <img id="result" alt="Результат обработки">

      </div>

      <div id="status" class="status" aria-live="polite"></div>

      <button id="save" class="secondary" type="button" style="display:none">Сохранить результат</button>

      <div class="safe">

        <b>🔒 Безопасный тестовый режим</b>

        Платная обработка выключена на сервере. Пока защита активна, запросы к платной модели не отправляются и списаний нет.

      </div>

    </aside>

  </div>

</section>

<!-- ИСТОРИЯ -->

<!-- ИСТОРИЯ РАБОТ -->

<section id="history" class="history-section">

  <div class="history-header">

    <div>

      <div class="eyebrow">ТВОИ РАБОТЫ</div>

      <h2>История</h2>

      <p>Твои созданные изображения в одном месте.</p>

    </div>

  </div>

  <div class="history-toolbar">

    <span id="history-count">0 работ</span>

    <button type="button" id="history-clear" class="history-clear">

      Очистить

    </button>

  </div>

  <div id="history-grid" class="history-grid"></div>

  <div id="history-empty" class="history-empty">

    <div class="history-empty-icon">◷</div>

    <h3>Пока здесь пусто</h3>

    <p>

      Создай своё первое изображение, и оно появится здесь.

    </p>

    <button type="button" id="history-go-studio">

      Открыть студию

    </button>

  </div>

</section>

<!-- ПРОФИЛЬ -->

<section class="placeholder-section" id="profile">

  <div class="placeholder-icon">◉</div>

  <div class="eyebrow">ЛИЧНЫЙ КАБИНЕТ</div>

  <h2>Твой профиль</h2>

  <p>В будущем здесь будут настройки, баланс, история операций и управление аккаунтом.</p>

</section>

<nav class="bottom-nav" aria-label="Основная навигация">

  <button class="nav-item active" type="button" data-target="home">

    <span>⌂</span><small>Главная</small>

  </button>

  <button class="nav-item" type="button" data-target="catalog">

    <span>▦</span><small>Каталог</small>

  </button>

  <button class="nav-item nav-create" type="button" data-target="studio">

    <span>✦</span><small>Создать</small>

  </button>

  <button class="nav-item" type="button" data-target="history">

    <span>◷</span><small>История</small>

  </button>

  <button class="nav-item" type="button" data-target="profile">

    <span>◉</span><small>Профиль</small>

  </button>

</nav>

<div class="footer">AI BRATISHKA STUDIO · V4 TEST BUILD</div>

</div>
<script>
const TEMPLATES = __TEMPLATES__;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const state = {
  filter: "all",
  model: "all",
  category: "all",
  collection: "all",
  search: "",
  mode: "background",
  favorites: new Set(),
  selectedFile: null,
  resultUrl: null
};

const FAVORITES_KEY = "bratishka_v4_favorites";

try {
  const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
  if (Array.isArray(saved)) state.favorites = new Set(saved);
} catch {
  state.favorites = new Set();
}

const CATEGORY_INFO = [
  {id:"all",name:"Все категории",icon:"✦"},
  {id:"portrait-men",name:"Мужские портреты",icon:"👨"},
  {id:"portrait-women",name:"Женские портреты",icon:"👩"},
  {id:"fashion",name:"Мода и стиль",icon:"👗"},
  {id:"travel",name:"Путешествия",icon:"🌍"},
  {id:"business",name:"Бизнес",icon:"💼"},
  {id:"cars",name:"Автомобили",icon:"🚘"},
  {id:"interiors",name:"Интерьеры",icon:"🏡"}
];

const COLLECTIONS = [
  {id:"all",name:"Все идеи"},
  {id:"cinematic",name:"Кинематографично"},
  {id:"luxury",name:"Люкс"},
  {id:"natural",name:"Естественный стиль"}
];

const CATEGORY_COVERS = {
  "portrait-men":"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  "portrait-women":"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
  "fashion":"https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
  "travel":"https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80",
  "business":"https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80",
  "cars":"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
  "interiors":"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80"
};

function saveFavorites() {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...state.favorites]));
  } catch {}
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  })[char]);
}

function getTemplateId(item, index) {
return String(item.id || item.key || ((item.category || "idea") + "-" + index));
}

function getTemplateCategory(item) {
  return item.category || item.group || "";
}

function getTemplateTitle(item) {
  return item.title || item.name || "Идея";
}

function getTemplatePrompt(item) {
  return item.prompt || item.description || "";
}

function getTemplateModels(item) {
  const value = item.models || item.model || [];
  return Array.isArray(value) ? value : [value];
}

function renderCategories() {
  const root = $("#categories");
  if (!root) return;

root.innerHTML = CATEGORY_INFO.map(category => {
    const active = state.category === category.id ? " active" : "";
    const cover = CATEGORY_COVERS[category.id];

    if (category.id === "all") {
      return \`
        <button class="category-card category-all\${active}" type="button"
          data-category="\${category.id}">
          <span class="category-icon">\${category.icon}</span>
          <b>\${category.name}</b>
        </button>\`;
    }

    return \`
      <button class="category-card\${active}" type="button"
        data-category="\${category.id}">
        <img src="\${cover}" alt="" loading="lazy">
        <span class="category-overlay"></span>
        <span class="category-content">
          <span>\${category.icon}</span>
          <b>\${category.name}</b>
        </span>
      </button>\`;
  }).join("");
}

function renderCollections() {
  const root = $("#collections");
  if (!root) return;

  root.innerHTML = COLLECTIONS.map(collection => \`
    <button class="collection-chip\${state.collection === collection.id ? " active" : ""}"
      type="button" data-collection="\${collection.id}">
      \${escapeHTML(collection.name)}
    </button>
  \`).join("");
}

function matchesCollection(item) {
  if (state.collection === "all") return true;

  const text = [
    item.title,
    item.name,
    item.prompt,
    item.description,
    ...(item.tags || [])
  ].join(" ").toLowerCase();

  const rules = {
    cinematic:["кино","кинемат","cinematic","film","movie","свет","драма"],
    luxury:["люкс","luxury","премиум","дорог","роскош","элит","отель"],
    natural:["естеств","natural","натураль","реалист","мягк","природ"]
  };

  const words = rules[state.collection] || [];
  return words.some(word => text.includes(word));
}

function matchesSearch(item) {
  if (!state.search) return true;

  const text = [
    item.title,
    item.name,
    item.prompt,
    item.description,
    item.category,
    item.group,
    ...(item.tags || [])
  ].join(" ").toLowerCase();

  return text.includes(state.search);
}

function matchesFilter(item, index) {
  const id = getTemplateId(item, index);
  const type = item.type || "photo";

  if (state.filter === "photo" && type !== "photo") return false;
  if (state.filter === "video" && type !== "video") return false;
  if (state.filter === "popular" && !item.popular) return false;
  if (state.filter === "new" && !item.isNew) return false;
  if (state.filter === "favorites" && !state.favorites.has(id)) return false;

  if (state.category !== "all" && getTemplateCategory(item) !== state.category) {
    return false;
  }

  if (state.model !== "all") {
    const models = getTemplateModels(item).map(value => String(value).toLowerCase());
    if (!models.includes(state.model)) return false;
  }

  return matchesCollection(item) && matchesSearch(item);
}

function getCardImage(item) {
  if (item.image) return item.image;
  if (item.cover) return item.cover;
  return CATEGORY_COVERS[getTemplateCategory(item)] ||
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80";
}

function renderCards() {
  const root = $("#cards");
  if (!root) return;

  const filtered = TEMPLATES
    .map((item, index) => ({item,index}))
    .filter(({item,index}) => matchesFilter(item,index));

  const empty = $("#emptyLibrary");
  if (empty) empty.hidden = filtered.length !== 0;

  const count = $("#cardsCount");
if (count) count.textContent = \`\${filtered.length} идей\`;

  const title = $("#cardsTitle");
  if (title) {
    const titles = {
      all:"Все идеи",
      photo:"Фотографии",
      video:"Видео-сценарии",
      popular:"Популярное",
      new:"Новинки",
      favorites:"Избранное"
    };
    title.textContent = titles[state.filter] || "Подборка";
  }

  root.innerHTML = filtered.map(({item,index}) => {
    const id = getTemplateId(item,index);
    const favorite = state.favorites.has(id);
    const video = (item.type || "photo") === "video";
    const image = getCardImage(item);
    const title = escapeHTML(getTemplateTitle(item));
    const description = escapeHTML(item.description || item.prompt || "");
    const category = escapeHTML(item.categoryTitle || item.category || "AI STUDIO");

    return \`
      <article class="template-card" data-id="\${escapeHTML(id)}">
        <div class="template-image">
          <img src="\${escapeHTML(image)}" alt="\${title}" loading="lazy">
          <span class="template-type">\${video ? "VIDEO IDEA" : "PHOTO IDEA"}</span>
          \${item.popular ? '<span class="template-popular">ПОПУЛЯРНОЕ</span>' : ""}
          \${item.isNew ? '<span class="template-new">NEW</span>' : ""}
          <button class="favorite-button\${favorite ? " active" : ""}"
            type="button" data-favorite="\${escapeHTML(id)}"
            aria-label="\${favorite ? "Убрать из избранного" : "Добавить в избранное"}">
            \${favorite ? "♥" : "♡"}
          </button>
        </div>
        <div class="template-info">
          <small>\${category}</small>
          <h4>\${title}</h4>
          <p>\${description}</p>
          <button class="template-use" type="button" data-use="\${escapeHTML(id)}">
            \${video ? "Выбрать сценарий" : "Использовать идею"} <span>↗</span>
          </button>
        </div>
      </article>\`;
  }).join("");
}

function setFilter(value) {
  state.filter = value;
  $$("#filters .filter").forEach(button => {
    button.classList.toggle("active", button.dataset.filter === value);
  });
  renderCards();
}

function setModel(value) {
  state.model = value;
  $$("#modelFilters .model-filter").forEach(button => {
    button.classList.toggle("active", button.dataset.model === value);
  });
  renderCards();
}

function setCategory(value) {
  state.category = value;
  renderCategories();
  renderCards();
}

function setCollection(value) {
  state.collection = value;
  renderCollections();
  renderCards();
}

function openSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  $$(".nav-item").forEach(button => {
    button.classList.toggle("active", button.dataset.target === id);
  });

  target.scrollIntoView({behavior:"smooth",block:"start"});
}

function openStudio() {
  openSection("studio");
}

function useTemplate(id) {
  const item = TEMPLATES.find((template,index) => getTemplateId(template,index) === id);
  if (!item) return;

  if ((item.type || "photo") === "video") {
    const prompt = getTemplatePrompt(item);
    const message = "Это сценарий для будущей видеостудии. Сейчас доступны идеи и подготовка промптов; генерация видео ещё не подключена.";
    if (typeof window !== "undefined") alert(message);
    if (prompt && $("#prompt")) $("#prompt").value = prompt;
    openStudio();
    return;
  }

  const prompt = getTemplatePrompt(item);
  if ($("#prompt")) $("#prompt").value = prompt;
  openStudio();

  if ($("#status")) {
    $("#status").textContent = "Идея добавлена в поле описания. Загрузи фотографию, чтобы продолжить.";
  }
}

$("#filters")?.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (button) setFilter(button.dataset.filter);
});

$("#modelFilters")?.addEventListener("click", event => {
  const button = event.target.closest("[data-model]");
  if (button) setModel(button.dataset.model);
});

$("#categories")?.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (button) setCategory(button.dataset.category);
});

$("#collections")?.addEventListener("click", event => {
  const button = event.target.closest("[data-collection]");
  if (button) setCollection(button.dataset.collection);
});

$("#cards")?.addEventListener("click", event => {
  const favoriteButton = event.target.closest("[data-favorite]");
  if (favoriteButton) {
    const id = favoriteButton.dataset.favorite;

    if (state.favorites.has(id)) state.favorites.delete(id);
    else state.favorites.add(id);

    saveFavorites();
    renderCards();
    return;
  }

  const useButton = event.target.closest("[data-use]");
  if (useButton) useTemplate(useButton.dataset.use);
});

$("#search")?.addEventListener("input", event => {
  state.search = event.target.value.trim().toLowerCase();
  renderCards();
});

$("#clearSearch")?.addEventListener("click", () => {
  if ($("#search")) $("#search").value = "";
  state.search = "";
  renderCards();
});

$$(".nav-item").forEach(button => {
  button.addEventListener("click", () => openSection(button.dataset.target));
});

$("#openStudio")?.addEventListener("click", openStudio);
$("#homePhoto")?.addEventListener("click", openStudio);
$("#promoOpenStudio")?.addEventListener("click", openStudio);

$("#homeVideo")?.addEventListener("click", () => {
  setFilter("video");
  openSection("catalog");
});

$("#vpnButton")?.addEventListener("click", () => {
  alert("Раздел VPN пока находится в разработке. Сейчас это только интерфейсная кнопка — VPN-подключение ещё не реализовано.");
});

$("#profileButton")?.addEventListener("click", () => openSection("profile"));

$$("[data-open-category]").forEach(button => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.openCategory);
    setFilter("all");
    openSection("catalog");
  });
});

renderCategories();
renderCollections();
renderCards();
</script>
<script>

const photoInput = $("#photo");
const previewImage = $("#preview");
const resultImage = $("#result");
const promptInput = $("#prompt");
const runButton = $("#run");
const saveButton = $("#save");
const statusBox = $("#status");
const emptyResult = $("#empty");

const MODE_PROMPTS = {
  background: "Замени фон фотографии на реалистичную профессиональную локацию. Сохрани человека, его лицо, индивидуальные черты, волосы, одежду, позу и пропорции без изменений. Сделай естественное освещение, реалистичные тени и качественное совмещение человека с новым окружением.",
  portrait: "Создай профессиональный портрет высокого качества. Сохрани точную идентичность человека, форму лица, глаза, нос, губы, причёску и индивидуальные черты. Используй красивый объёмный свет, естественную текстуру кожи и реалистичную детализацию.",
  retouch: "Выполни профессиональную деликатную ретушь фотографии. Сохрани индивидуальность человека и все черты лица. Убери только временные несовершенства кожи, сохрани естественные поры, текстуру и реалистичность. Не меняй форму лица и тела.",
  fashion: "Создай стильную профессиональную fashion-фотографию. Сохрани идентичность человека, лицо, пропорции и естественную позу. Улучши стилистику кадра, освещение, композицию и детали одежды без искажения внешности.",
  studio: "Создай эффект профессиональной фотосессии в современной фотостудии. Сохрани точную идентичность человека и естественные черты лица. Добавь мягкий студийный свет, красивый фон, глубину кадра и реалистичную фотографическую детализацию.",
  creative: ""
};

function setStatus(message, type = "") {
  if (!statusBox) return;
  statusBox.textContent = message;
  statusBox.className = "status" + (type ? " " + type : "");
}

function clearPreviousResult() {
  state.resultUrl = null;

  if (resultImage) {
    resultImage.removeAttribute("src");
    resultImage.style.display = "none";
  }

  if (emptyResult) emptyResult.style.display = "grid";
  if (saveButton) saveButton.style.display = "none";
}

function validateImage(file) {
  if (!file) {
    setStatus("Сначала выбери фотографию.", "error");
    return false;
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    setStatus("Поддерживаются только JPG, PNG и WebP.", "error");
    return false;
  }

  if (file.size > 15 * 1024 * 1024) {
    setStatus("Файл слишком большой. Максимальный размер — 15 МБ.", "error");
    return false;
  }

  return true;
}

$$(".mode").forEach(button => {
  button.addEventListener("click", () => {
    $$(".mode").forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    state.mode = button.dataset.mode;

    if (promptInput && !promptInput.value.trim()) {
      promptInput.value = MODE_PROMPTS[state.mode] || "";
    }

    setStatus("");
  });
});

$("#presets")?.addEventListener("click", event => {
  const button = event.target.closest("[data-prompt]");
  if (!button || !promptInput) return;

  promptInput.value = button.dataset.prompt;
  promptInput.focus();
});

photoInput?.addEventListener("change", () => {
  const file = photoInput.files?.[0];

  clearPreviousResult();

  if (!file) {
    state.selectedFile = null;
    if (previewImage) previewImage.style.display = "none";
    return;
  }

  if (!validateImage(file)) {
    photoInput.value = "";
    state.selectedFile = null;
    if (previewImage) previewImage.style.display = "none";
    return;
  }

  state.selectedFile = file;

  const reader = new FileReader();

  reader.onload = () => {
    if (!previewImage) return;

    previewImage.src = reader.result;
    previewImage.style.display = "block";
  };

  reader.onerror = () => {
    setStatus("Не удалось прочитать фотографию. Попробуй другой файл.", "error");
  };

  reader.readAsDataURL(file);

  setStatus("Фото загружено. Теперь опиши желаемый результат.", "success");
});

function getFinalPrompt() {
  const customPrompt = promptInput?.value.trim() || "";
  const modePrompt = MODE_PROMPTS[state.mode] || "";

  if (customPrompt) return customPrompt;

  return modePrompt;
}

// ===== ИСТОРИЯ РАБОТ =====

const HISTORY_KEY = "bratishka_v4_history";
const HISTORY_LIMIT = 5;

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function saveHistoryEntry(image, prompt, mode) {
  try {
    const history = getHistory();

    const entry = {
      id: Date.now(),
      image: image,
      prompt: prompt || "Созданное изображение",
      mode: mode || "creative",
      date: new Date().toISOString()
    };

    history.unshift(entry);

    const limited = history.slice(0, HISTORY_LIMIT);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(limited));

    renderHistory();

    return true;
  } catch (e) {
    console.warn("История не сохранена:", e);
    return false;
  }
}

function renderHistory() {
  const grid = document.getElementById("history-grid");
  const empty = document.getElementById("history-empty");
  const count = document.getElementById("history-count");

  if (!grid) return;

  const history = getHistory();

  grid.innerHTML = "";

  if (count) {
    count.textContent = history.length + " " +
      (history.length === 1 ? "работа" :
       history.length >= 2 && history.length <= 4 ? "работы" : "работ");
  }

  if (empty) {
    empty.style.display = history.length ? "none" : "block";
  }

  history.forEach(function(item) {
    const card = document.createElement("div");
    card.className = "history-card";

    const img = document.createElement("img");
    img.className = "history-card-image";
    img.src = item.image;
    img.alt = "Созданная работа";
    img.loading = "lazy";

    const info = document.createElement("div");
    info.className = "history-card-info";

    const date = document.createElement("div");
    date.className = "history-card-date";

    date.textContent = new Date(item.date).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });

    const prompt = document.createElement("div");
    prompt.className = "history-card-prompt";
    prompt.textContent = item.prompt;

    const actions = document.createElement("div");
    actions.className = "history-card-actions";

    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.textContent = "Открыть";

    openButton.addEventListener("click", function() {
      state.resultUrl = item.image;

      if (resultImage) {
        resultImage.src = item.image;
        resultImage.style.display = "block";
      }

      if (emptyResult) emptyResult.style.display = "none";
      if (saveButton) saveButton.style.display = "block";

      openSection("studio");

      setStatus("Работа открыта из истории.", "success");
    });

    const downloadButton = document.createElement("button");
    downloadButton.type = "button";
    downloadButton.textContent = "Скачать";

    downloadButton.addEventListener("click", function() {
      const link = document.createElement("a");
      link.href = item.image;
      link.download = "bratishka-" + item.id + ".png";
      document.body.appendChild(link);
      link.click();
      link.remove();
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Удалить";

    deleteButton.addEventListener("click", function() {
      const updated = getHistory().filter(function(x) {
        return x.id !== item.id;
      });

      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      renderHistory();
    });

    actions.appendChild(openButton);
    actions.appendChild(downloadButton);
    actions.appendChild(deleteButton);

    info.appendChild(date);
    info.appendChild(prompt);
    info.appendChild(actions);

    card.appendChild(img);
    card.appendChild(info);

    grid.appendChild(card);
  });
}

// Очистка истории

document.getElementById("history-clear")?.addEventListener("click", function() {
  if (!getHistory().length) return;

  if (!confirm("Удалить все работы из истории?")) return;

  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
});

// Переход в студию из пустой истории

document.getElementById("history-go-studio")?.addEventListener("click", function() {
  openSection("studio");
});

// Загружаем историю при открытии приложения

renderHistory();
async function processPhoto() {
  const file = state.selectedFile;
  const prompt = getFinalPrompt();
  const accessKey = $("#access")?.value.trim() || "";

  if (!validateImage(file)) return;

  if (!prompt) {
    setStatus("Опиши, что нужно изменить на фотографии.", "error");
    promptInput?.focus();
    return;
  }

  if (!accessKey) {
    setStatus("Введи тестовый код доступа.", "error");
    $("#access")?.focus();
    return;
  }

  clearPreviousResult();

  setStatus("Отправляем фотографию...", "loading");

  runButton.disabled = true;
  runButton.textContent = "Обрабатываем...";

  let progressTimer = null;
  let progressIndex = 0;

  const progressMessages = [
    "ИИ анализирует фотографию...",
    "Работаем над освещением и деталями...",
    "Формируем результат...",
    "Завершаем обработку..."
  ];

  progressTimer = setInterval(() => {
    if (progressIndex < progressMessages.length) {
      setStatus(progressMessages[progressIndex], "loading");
      progressIndex++;
    }
  }, 8000);

  try {
    const formData = new FormData();

    formData.append("image", file, file.name);
    formData.append("prompt", prompt);
    formData.append("mode", state.mode);

    const response = await fetch("/api/edit", {
      method: "POST",
      headers: {
        "X-V4-Test-Key": accessKey
      },
      body: formData
    });

    let data = {};

    try {
      data = await response.json();
    } catch {
      throw new Error("Сервер вернул некорректный ответ.");
    }

    if (!response.ok) {
      throw new Error(data.error || "Ошибка обработки: " + response.status);
    }

    if (!data.image) {
      throw new Error("Сервер не вернул готовое изображение.");
    }

    const imageData = data.image.startsWith("data:")
      ? data.image
      : "data:image/png;base64," + data.image;

    if (resultImage) {
      resultImage.src = imageData;
      resultImage.style.display = "block";
    }

    if (emptyResult) emptyResult.style.display = "none";
    if (saveButton) saveButton.style.display = "block";

state.resultUrl = imageData;

saveHistoryEntry(imageData, prompt, state.mode);

setStatus("Готово! Результат можно сохранить.", "success");

    if (resultImage) {
      resultImage.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }

  } catch (error) {
    console.error("AI Bratishka V4:", error);

    setStatus(
      error.message || "Не удалось обработать фотографию. Попробуй позже.",
      "error"
    );

  } finally {
    if (progressTimer) clearInterval(progressTimer);

    runButton.disabled = false;
    runButton.textContent = "Обработать фотографию";
  }
}

runButton?.addEventListener("click", processPhoto);

saveButton?.addEventListener("click", () => {
  if (!state.resultUrl) return;

  const link = document.createElement("a");
  link.href = state.resultUrl;
  link.download = "ai-bratishka-" + Date.now() + ".png";

  document.body.appendChild(link);
  link.click();
  link.remove();

  setStatus("Сохранение изображения запущено.", "success");
});

$("#access")?.addEventListener("keydown", event => {
  if (event.key === "Enter") processPhoto();
});

</body>

</html>

`;
function makeHTML() {
  const templateJSON = JSON.stringify(TEMPLATES)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return HTML.replace("__TEMPLATES__", templateJSON);
}

function jsonResponse(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders
    }
  });
}

function secureEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;

  let result = 0;

  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-V4-Test-Key"
  };
}

async function handleEdit(request, env) {
  // Проверяем тестовый код доступа
  const suppliedKey = request.headers.get("X-V4-Test-Key") || "";
  const expectedKey = env.V4_TEST_KEY || "";

  if (!expectedKey || !secureEqual(suppliedKey, expectedKey)) {
    return jsonResponse({
      error: "Неверный тестовый код доступа."
    }, 401);
  }

  // Жёсткая блокировка платных запросов.
  // Без отдельного включения этой переменной API не вызывается.
  if (env.ENABLE_PAID_IMAGE_API !== "true") {
    return jsonResponse({
      error: "Платная обработка отключена. Запросы к платной модели не отправляются."
    }, 403);
  }

  // Проверяем наличие API-ключа только после защитного переключателя
  if (!env.OPENAI_API_KEY) {
    return jsonResponse({
      error: "API-ключ не настроен."
    }, 503);
  }

  let formData;

  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({
      error: "Не удалось прочитать загруженные данные."
    }, 400);
  }

  const image = formData.get("image");
  const prompt = formData.get("prompt");
  const mode = formData.get("mode") || "creative";

  if (!(image instanceof File)) {
    return jsonResponse({
      error: "Не найдена фотография."
    }, 400);
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];

  if (!allowedTypes.includes(image.type)) {
    return jsonResponse({
      error: "Поддерживаются только JPG, PNG и WebP."
    }, 400);
  }

  if (image.size === 0 || image.size > MAX_FILE_SIZE) {
    return jsonResponse({
      error: "Размер фотографии должен быть от 1 байта до 15 МБ."
    }, 400);
  }

  if (typeof prompt !== "string" || !prompt.trim()) {
    return jsonResponse({
      error: "Необходимо описать желаемый результат."
    }, 400);
  }

  if (prompt.length > 4000) {
    return jsonResponse({
      error: "Описание слишком длинное. Максимум 4000 символов."
    }, 400);
  }

  const allowedModes = [
    "background",
    "portrait",
    "retouch",
    "fashion",
    "studio",
    "creative"
  ];

  if (!allowedModes.includes(mode)) {
    return jsonResponse({
      error: "Неизвестный режим обработки."
    }, 400);
  }

  // Дополнительная проверка размера перед отправкой
  if (image.size > MAX_FILE_SIZE) {
    return jsonResponse({
      error: "Фотография превышает допустимый размер."
    }, 413);
  }

  const apiForm = new FormData();

  apiForm.append("model", MODEL);
  apiForm.append("image", image, image.name || "photo.png");
  apiForm.append("prompt", prompt.trim());

  let apiResponse;

  try {
    apiResponse = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`
      },
      body: apiForm
    });
  } catch (error) {
    console.error("Image API connection error:", error);

    return jsonResponse({
      error: "Не удалось связаться с сервисом обработки изображений."
    }, 502);
  }

  let apiData;

  try {
    apiData = await apiResponse.json();
  } catch {
    return jsonResponse({
      error: "Сервис обработки вернул некорректный ответ."
    }, 502);
  }

  if (!apiResponse.ok) {
    console.error("Image API error:", apiData);

    return jsonResponse({
      error: apiData?.error?.message ||
        "Сервис не смог обработать фотографию."
    }, apiResponse.status >= 400 && apiResponse.status < 600
      ? apiResponse.status
      : 502);
  }

  const imageBase64 = apiData?.data?.[0]?.b64_json;

  if (!imageBase64 || typeof imageBase64 !== "string") {
    return jsonResponse({
      error: "Сервис не вернул готовое изображение."
    }, 502);
  }

  return jsonResponse({
    image: imageBase64
  });
}
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    const securityHeaders = {
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Frame-Options": "DENY",
      "Cache-Control": "no-store"
    };

    // Предварительная обработка CORS-запросов
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          ...getCorsHeaders(),
          ...securityHeaders
        }
      });
    }

    // Главная страница Worker
    if (method === "GET" && path === "/") {
      return Response.redirect(
        new URL("/app", request.url).toString(),
        302
      );
    }

    // Веб-приложение AI Bratishka V4
    if (method === "GET" && path === "/app") {
      try {
        return new Response(makeHTML(), {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            ...securityHeaders
          }
        });
      } catch (error) {
        console.error("HTML rendering error:", error);

        return new Response("Не удалось открыть AI Bratishka Studio.", {
          status: 500,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            ...securityHeaders
          }
        });
      }
    }

    // Обработка фотографии
    if (method === "POST" && path === "/api/edit") {
      try {
        const response = await handleEdit(request, env);

        const headers = new Headers(response.headers);

        for (const [key, value] of Object.entries(securityHeaders)) {
          headers.set(key, value);
        }

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers
        });
      } catch (error) {
        console.error("Worker processing error:", error);

        return jsonResponse({
          error: "Внутренняя ошибка сервера. Попробуй позже."
        }, 500, securityHeaders);
      }
    }

    return jsonResponse({
      error: "Страница не найдена."
    }, 404, securityHeaders);
  }
};