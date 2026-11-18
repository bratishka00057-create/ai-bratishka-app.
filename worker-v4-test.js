
const MODEL = "gpt-image-2.6-sunburst";
const MAX_FILE_SIZE = 15 * 1024 * 1024;

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
button,input,textarea{font:inherit}
button{cursor:pointer}
.shell{max-width:1120px;margin:auto;padding:22px 18px 60px}
.top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:28px}
.brand{display:flex;align-items:center;gap:11px}
.logo{width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,#a99bff,#5e50cf);display:grid;place-items:center;font-size:22px}
.brand b{font-size:16px}
.brand small{display:block;color:var(--muted);font-size:11px;margin-top:3px}
.status-pill{font-size:11px;color:#c9c2ff;border:1px solid #514a7b;background:#28233e;padding:8px 11px;border-radius:99px}
.hero{margin:0 0 22px}
.eyebrow{color:#b8adff;font-size:11px;font-weight:700;letter-spacing:1.7px}
.hero h1{font-size:clamp(28px,5vw,43px);line-height:1.08;letter-spacing:-1.5px;margin:9px 0}
.hero p{color:var(--muted);max-width:650px;line-height:1.6;margin:0;font-size:14px}
.layout{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(300px,.85fr);gap:18px;align-items:start}
.panel{background:linear-gradient(180deg,#191e29,#121620);border:1px solid var(--line);border-radius:20px;padding:19px;box-shadow:0 18px 55px #0003}
.section-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:15px}
.section-head h2{font-size:15px;margin:0}
.hint{color:var(--muted);font-size:11px}
.modes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-bottom:20px}
.mode{border:1px solid var(--line);background:#171c26;border-radius:13px;padding:12px 9px;text-align:left;color:var(--text);min-height:82px}
.mode span{display:block;font-size:21px;margin-bottom:7px}
.mode b{font-size:11px}
.mode.active{border-color:var(--accent);background:#292441;box-shadow:inset 0 0 0 1px #9b8cff33}
.field-label{display:block;font-size:12px;color:#d7dbea;font-weight:650;margin:15px 0 8px}
.upload{border:1px dashed #555d72;background:#10141d;border-radius:15px;padding:17px;text-align:center}
.upload input{display:none}
.upload label{display:block;cursor:pointer;margin:0}
.upload-icon{font-size:27px;margin-bottom:7px}
.upload b{font-size:13px}
.upload small{display:block;color:var(--muted);font-size:11px;margin-top:5px}
.preview{display:none;width:100%;max-height:370px;object-fit:contain;background:#090b10;border-radius:12px;margin-top:12px}
.textarea{width:100%;min-height:116px;resize:vertical;border:1px solid var(--line);border-radius:12px;background:#0e121a;color:white;padding:13px;line-height:1.5;font-size:13px;outline:none}
.textarea:focus,.input:focus{border-color:var(--accent)}
.presets{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}
.preset{border:1px solid #394052;border-radius:99px;background:#1b202c;color:#d8dced;padding:8px 10px;font-size:11px}
.preset:hover{border-color:var(--accent);color:white}
.input{width:100%;border:1px solid var(--line);border-radius:11px;background:#0e121a;color:white;padding:12px;font-size:13px}
.primary{width:100%;border:0;border-radius:12px;padding:14px;background:linear-gradient(110deg,#9d8cff,#6858df);color:white;font-weight:750;margin-top:15px;box-shadow:0 8px 24px #7968f533}
.primary:disabled{opacity:.55;cursor:wait}
.secondary{width:100%;border:1px solid var(--line);background:#1a202b;color:#e9ecf5;border-radius:11px;padding:12px;margin-top:10px}
.note{font-size:11px;color:var(--muted);line-height:1.5;margin:11px 0 0}
.result-wrap{min-height:250px;border:1px dashed #343c4c;border-radius:15px;background:#0e1219;display:grid;place-items:center;padding:14px;text-align:center}
.result-wrap img{display:none;max-width:100%;max-height:500px;object-fit:contain;border-radius:10px}
.empty-icon{font-size:32px;opacity:.8}
.empty-text{font-size:12px;color:var(--muted);line-height:1.5;margin-top:9px}
.status{font-size:12px;line-height:1.5;margin-top:12px;color:#d8d2ff;overflow-wrap:anywhere}
.safe{border:1px solid #315c4d;background:#14251f;border-radius:12px;padding:12px;margin-top:15px;color:#b8e7d2;font-size:11px;line-height:1.5}
.safe b{display:block;color:#d4f6e6;margin-bottom:3px}
.footer{text-align:center;color:#697386;font-size:10px;margin-top:22px}
@media(max-width:760px){
.shell{padding:16px 13px 42px}
.layout{grid-template-columns:1fr}
.panel{padding:15px}
.top{margin-bottom:22px}
.hero{margin-bottom:17px}
.modes{gap:7px}
.mode{padding:10px 7px;min-height:76px}
.mode b{font-size:10px}
}
@media(max-width:370px){.modes{grid-template-columns:repeat(2,minmax(0,1fr))}}
.library-categories {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.library-categories .mode {
  cursor: pointer;
  min-height: 76px;
}
</style>
</head>
<body>
<div class="shell">
<header class="top">
<div class="brand"><div class="logo">✦</div><div><b>AI BRATISHKA</b><small>STUDIO · IMAGE LAB</small></div></div>
<div class="status-pill">V4 · TEST MODE</div>
</header>

<section class="hero">
<div class="eyebrow">ТВОЯ AI-ФОТОСТУДИЯ</div>
<h1>Создавай фотографии<br>нового уровня</h1>
<p>Выбери задачу, загрузи снимок и опиши желаемый результат. Профессиональные инструменты редактирования в едином пространстве.</p>
</section>

<section class="panel" style="margin-bottom:18px">

  <div class="section-head">

    <h2>✦ Тренды и шаблоны</h2>

    <span class="status-pill">STUDIO LIBRARY</span>

  </div>

  <p class="hint">Популярные идеи и готовые сценарии для творчества</p>

  <div class="presets" style="margin:16px 0">

<button class="preset library-filter" data-filter="photo">📸 Фото</button>

<button class="preset library-filter" data-filter="video">🎬 Видео</button>

<button class="preset library-filter" data-filter="popular">🔥 Популярное</button>

<button class="preset library-filter" data-filter="new">🆕 Новинки</button>

  </div>

  <div class="section-head">

    <h2>Популярные категории</h2>

  </div>



<div class="modes library-categories">

  <button class="mode"><span>✨</span><b>Портреты</b></button>

  <button class="mode"><span>👗</span><b>Мода</b></button>

  <button class="mode"><span>🌍</span><b>Путешествия</b></button>

  <button class="mode"><span>💼</span><b>Бизнес</b></button>

  <button class="mode"><span>🚘</span><b>Автомобили</b></button>

  <button class="mode"><span>🏡</span><b>Интерьеры</b></button>

</div>

<div id="libraryCards" class="presets" style="margin-top:16px">

  <button class="preset template-card"

    data-type="photo"

    data-category="portrait"

    data-prompt="Создай профессиональную портретную фотосессию, сохранив внешность и черты лица человека.">

    ✨ Профессиональный портрет

  </button>

  <button class="preset template-card"

    data-type="photo"

    data-category="travel"

    data-prompt="Создай реалистичную фотографию в красивой локации для путешествий, сохранив внешность человека.">

    🌍 Путешествие мечты

  </button>

  <button class="preset template-card"

    data-type="photo"

    data-category="fashion"

    data-prompt="Создай стильную журнальную fashion-фотосессию с профессиональным светом, сохранив лицо и внешность человека.">

    👗 Fashion-фотосессия

  </button>

  <button class="preset template-card"

    data-type="video"

    data-category="popular"

    data-prompt="Подготовь идею кинематографичного короткого видео на основе загруженной фотографии.">

    🎬 Кинематографичное видео

  </button>

</div>

<div class="safe">

    <b>🔄 Автообновление трендов</b>

    Каталог будет регулярно получать новые подборки после подключения источников трендов и расписания обновления.

  </div>

</section>
<div class="layout">
<section class="panel">
<div class="section-head"><h2>01 · Выбери режим</h2><span class="hint">Режим обработки</span></div>

<div class="modes" id="modes">
<button class="mode active" data-mode="background"><span>🏙️</span><b>Замена фона</b></button>
<button class="mode" data-mode="portrait"><span>✨</span><b>Портрет</b></button>
<button class="mode" data-mode="retouch"><span>💎</span><b>Ретушь</b></button>
<button class="mode" data-mode="fashion"><span>👗</span><b>Образ и стиль</b></button>
<button class="mode" data-mode="studio"><span>📸</span><b>Фотосессия</b></button>
<button class="mode" data-mode="creative"><span>🎨</span><b>Своя идея</b></button>
</div>

<div class="section-head"><h2>02 · Исходное фото</h2><span class="hint">До 15 МБ</span></div>
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
<textarea id="prompt" class="textarea" maxlength="4000" placeholder="Напиши, что нужно изменить. Укажи желаемый фон, освещение, атмосферу и детали."></textarea>

<div class="presets" id="presets">
<button class="preset" data-prompt="Замени только фон на роскошный современный интерьер пятизвёздочного отеля. Сохрани человека, лицо, волосы, одежду, позу и пропорции без изменений. Реалистичное освещение и естественные края волос.">Люкс-интерьер</button>
<button class="preset" data-prompt="Создай профессиональный студийный портрет с мягким объёмным светом и нейтральным фоном. Сохрани точную идентичность лица, возраст, черты, причёску и естественную текстуру кожи.">Студийный портрет</button>
<button class="preset" data-prompt="Выполни деликатную профессиональную ретушь: выровняй тон кожи, сохрани поры и естественную текстуру, аккуратно улучши свет и цвет. Не меняй черты лица и внешность.">Естественная ретушь</button>
<button class="preset" data-prompt="Создай кинематографичный editorial-образ с выразительным, но реалистичным освещением и дорогой цветокоррекцией. Сохрани лицо, личность, волосы, одежду и позу без изменений.">Кинематографичный стиль</button>
</div>

<label class="field-label" for="access">Тестовый код доступа</label>
<input id="access" class="input" type="password" autocomplete="current-password" placeholder="Введи тестовый код">

<button id="run" class="primary">Обработать фотографию</button>
<p class="note">Реальная генерация пока отключена до отдельного согласования платного теста.</p>
</section>

<aside class="panel">
<div class="section-head"><h2>04 · Результат</h2><span class="hint">Предпросмотр</span></div>
<div class="result-wrap">
<div id="empty"><div class="empty-icon">✧</div><div class="empty-text">Здесь появится готовая фотография после обработки</div></div>
<img id="result" alt="Результат обработки">
</div>
<div id="status" class="status" aria-live="polite"></div>
<button id="save" class="secondary" style="display:none">Сохранить результат</button>
<div class="safe"><b>🔒 Безопасный тестовый режим</b>Платная обработка выключена на сервере. Пока защита активна, запросы к платной модели не отправляются и списаний нет.</div>
</aside>
</div>

<div class="footer">AI BRATISHKA STUDIO · V4 TEST BUILD</div>
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
let outputUrl="";
let previewUrl="";
let selectedMode="background";
let currentModePrompt="";
const libraryFilters=document.querySelectorAll(".library-filter");


const libraryFilters=document.querySelectorAll(".library-filter");
const templateCards=document.querySelectorAll(".template-card");

libraryFilters.forEach(btn=>{
  btn.addEventListener("click",()=>{
    libraryFilters.forEach(item=>item.classList.remove("active"));
    btn.classList.add("active");

    const filter=btn.dataset.filter;

    templateCards.forEach(card=>{
      const type=card.dataset.type;
      const show=
        filter==="photo" ? type==="photo" :
        filter==="video" ? type==="video" :
        filter==="popular" ? card.dataset.category==="popular" :
        filter==="new" ? true : true;

      card.style.display=show ? "" : "none";
    });

    const names={
      photo:"Открыта подборка фотошаблонов",
      video:"Открыта подборка видеошаблонов",
      popular:"Открыта подборка популярных трендов",
      new:"Открыта подборка новинок"
    };

    statusBox.textContent=names[filter] || "Открыта библиотека";
  });
});

templateCards.forEach(card=>{
  card.addEventListener("click",()=>{
    promptBox.value=card.dataset.prompt;
    statusBox.textContent="Шаблон выбран. Можно запускать обработку.";
    promptBox.focus();
  });
});

const libraryFilters=document.querySelectorAll(".library-filter");

const modePrompts={
background:"Замени только фон на роскошную современную локацию. Сохрани человека, лицо, волосы, одежду, позу и пропорции без изменений. Сделай реалистичное освещение и естественные края волос.",
portrait:"Создай профессиональный портрет с мягким объёмным светом. Сохрани точную идентичность лица, возраст, черты, причёску и естественную текстуру кожи.",
retouch:"Выполни деликатную профессиональную ретушь, сохрани естественную текстуру кожи, поры и все индивидуальные черты лица. Не меняй внешность.",
fashion:"Создай стильный fashion-образ с профессиональной журнальной подачей. Сохрани идентичность человека и меняй только те элементы образа, которые указаны в запросе.",
studio:"Преврати снимок в профессиональную фотосессию с тщательно выстроенным светом и выразительной композицией. Сохрани узнаваемость человека.",
creative:"Опиши свою идею. Укажи, что именно нужно изменить и какие детали фотографии должны остаться нетронутыми."
};

document.querySelectorAll("#modes .mode").forEach(btn=>btn.addEventListener("click",()=>{
document.querySelectorAll(".mode").forEach(x=>x.classList.remove("active"));
btn.classList.add("active");

selectedMode=btn.dataset.mode;
currentModePrompt=modePrompts[selectedMode];

promptBox.placeholder=currentModePrompt;
promptBox.value=currentModePrompt;
}));

document.querySelectorAll(".preset").forEach(btn=>btn.addEventListener("click",()=>{
promptBox.value=btn.dataset.prompt;
}));

photo.addEventListener("change",()=>{
const file=photo.files[0];
if(!file)return;
if(file.size>15*1024*1024){
statusBox.textContent="Файл больше 15 МБ. Выбери фотографию до 15 МБ.";
photo.value="";
return;
}
if(previewUrl)URL.revokeObjectURL(previewUrl);
previewUrl=URL.createObjectURL(file);
preview.src=previewUrl;
preview.style.display="block";
statusBox.textContent="Фотография загружена. Выбери режим и уточни задачу.";
});

run.onclick=async()=>{
const file=photo.files[0];
const prompt=promptBox.value.trim();
if(!file){statusBox.textContent="Сначала выбери фотографию.";return;}
if(!prompt){statusBox.textContent="Опиши желаемый результат или выбери готовую подсказку.";return;}
if(!access.value.trim()){statusBox.textContent="Введи тестовый код доступа.";return;}

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
if(!response.ok)throw new Error(answer.error||"Ошибка обработки");
const bytes=Uint8Array.from(atob(answer.image),c=>c.charCodeAt(0));
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const headers = {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    };

    if (request.method === "GET" && url.pathname === "/") {
      return new Response("AI Bratishka Studio V4 is running", {
        headers: {
          ...headers,
          "Content-Type": "text/plain; charset=utf-8"
        }
      });
    }

    if (request.method === "GET" && url.pathname === "/app") {
      return new Response(HTML, {
        headers: {
          ...headers,
          "Content-Type": "text/html; charset=utf-8"
        }
      });
    }

    if (request.method !== "POST" || url.pathname !== "/api/edit") {
      return Response.json(
        { error: "Страница не найдена." },
        { status: 404, headers }
      );
    }

    try {
      // 1. Проверка тестового кода доступа
      const expectedKey = env.V4_TEST_KEY || "";
      const suppliedKey = request.headers.get("X-V4-Test-Key") || "";

      let keyMatches = expectedKey.length > 0 &&
        expectedKey.length === suppliedKey.length;

      if (keyMatches) {
        let difference = 0;

        for (let i = 0; i < expectedKey.length; i++) {
          difference |= expectedKey.charCodeAt(i) ^ suppliedKey.charCodeAt(i);
        }

        keyMatches = difference === 0;
      }

      if (!keyMatches) {
        return Response.json(
          { error: "Неверный тестовый код доступа." },
          { status: 401, headers }
        );
      }

      // 2. Двойная блокировка платной обработки.
      // По умолчанию платные запросы полностью выключены.
      if (env.ENABLE_PAID_IMAGE_API !== "true") {
        return Response.json(
          {
            error: "Платная обработка выключена. Запрос к OpenAI не отправлялся и списаний нет."
          },
          { status: 403, headers }
        );
      }

      if (!env.OPENAI_API_KEY) {
        return Response.json(
          { error: "API-ключ не настроен." },
          { status: 503, headers }
        );
      }

      // 3. Проверка входных данных
      if (!request.headers.get("Content-Type")?.includes("multipart/form-data")) {
        return Response.json(
          { error: "Неверный формат запроса." },
          { status: 400, headers }
        );
      }

      const form = await request.formData();
      const image = form.get("image");
      const userPrompt = String(form.get("prompt") || "").trim();

      if (
        !image ||
        typeof image !== "object" ||
        typeof image.arrayBuffer !== "function"
      ) {
        return Response.json(
          { error: "Загрузи фотографию." },
          { status: 400, headers }
        );
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
      ];

      if (!allowedTypes.includes(image.type)) {
        return Response.json(
          { error: "Поддерживаются только JPG, PNG и WebP." },
          { status: 400, headers }
        );
      }

      if (image.size > MAX_FILE_SIZE) {
        return Response.json(
          { error: "Размер фотографии не должен превышать 15 МБ." },
          { status: 413, headers }
        );
      }

      if (userPrompt.length < 5 || userPrompt.length > 4000) {
        return Response.json(
          { error: "Описание должно содержать от 5 до 4000 символов." },
          { status: 400, headers }
        );
      }

      // 4. Подготовка профессионального задания для редактирования
      const professionalPrompt = `
Edit the exact uploaded photograph. This is a professional photo editing task,
not a request to create a replacement image.

Apply only the changes explicitly requested by the user.

PRESERVE THE ORIGINAL PERSON:
Keep the person's identity, facial geometry, eyes, nose, mouth, facial
expression, skin tone, apparent age, hairstyle, and distinctive features.
Preserve body proportions, pose, clothing, accessories and original
composition unless the user explicitly requests a change.

PHOTOGRAPHIC REALISM:
Create a coherent, natural-looking photograph.
Match lighting direction, exposure, color temperature, perspective,
depth of field, reflections and shadows.
Maintain realistic textures, fine details and natural transitions.
Avoid artificial cutout edges, pasted-on subjects, halos, blur around hair,
distorted anatomy, duplicated objects and plastic-looking skin.

BACKGROUND AND SCENE:
When changing the background, make the new environment look as though
the original photograph was genuinely taken there.
Ensure the subject and environment share consistent lighting, perspective,
color and depth.

IMPORTANT:
Do not redesign the person's face.
Do not replace the person with a similar-looking generated person.
Do not make unrelated changes.
Do not add elements that the user did not request.

USER'S EDITING INSTRUCTIONS:
${userPrompt}
      `.trim();

      // 5. Формирование запроса к модели.
      // Этот участок выполняется только после обеих проверок выше.
      const apiForm = new FormData();

      apiForm.append("model", MODEL);
      apiForm.append("image[]", image, image.name || "photo.jpg");
      apiForm.append("prompt", professionalPrompt);
      apiForm.append("quality", "max");
      apiForm.append("complexity", "high");
      apiForm.append("output_format", "png");

      const apiResponse = await fetch(
        "https://api.openai.com/v1/images/edits",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.OPENAI_API_KEY}`
          },
          body: apiForm
        }
      );

      // 6. Безопасная обработка ответа API
      if (!apiResponse.ok) {
        let errorMessage = "Сервис обработки изображения временно недоступен.";

        try {
          const errorData = await apiResponse.json();
          const code = errorData?.error?.code;

          if (code === "insufficient_quota") {
            errorMessage = "На API-аккаунте недостаточно средств или доступной квоты.";
          } else if (code === "invalid_api_key") {
            errorMessage = "API-ключ не принят. Проверь настройки доступа.";
          } else if (apiResponse.status === 429) {
            errorMessage = "Слишком много запросов. Попробуй позже.";
          }
        } catch (_) {}

        console.error("Image API error status:", apiResponse.status);

        return Response.json(
          { error: errorMessage },
          { status: 502, headers }
        );
      }

      const result = await apiResponse.json();
      const imageBase64 = result?.data?.[0]?.b64_json;

      if (!imageBase64) {
        return Response.json(
          { error: "Модель не вернула готовое изображение." },
          { status: 502, headers }
        );
      }

      // 7. Возвращаем результат фотостудии
      return Response.json(
{ image: imageBase64 },
        { headers }
      );

    } catch (error) {
      console.error("Studio V4 error:", error?.message || "Unknown error");

      return Response.json(
        { error: "Не удалось обработать фотографию. Попробуй ещё раз." },
        { status: 500, headers }
      );
    }
  }
};