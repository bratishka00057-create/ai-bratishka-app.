
const MODEL = "@cf/black-forest-labs/flux-2-klein-4b";

const APP = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<meta name="theme-color" content="#111318">
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<title>AI Bratishka</title>
<style>
*{box-sizing:border-box}
body{margin:0;padding:20px;background:#111318;color:#fff;font-family:-apple-system,BlinkMacSystemFont,Arial,sans-serif}
.container{max-width:600px;margin:auto}
.header{padding:12px 0 20px}
.logo{font-size:29px;font-weight:800;letter-spacing:-1px}
.subtitle{color:#9da3b2;margin-top:7px;font-size:14px}
.panel{background:#20232b;border:1px solid #303541;border-radius:20px;padding:18px;margin-top:14px}
h2{font-size:18px;margin:0 0 15px}
label{display:block;font-size:13px;color:#b9bfca;margin:15px 0 8px}
textarea{width:100%;height:120px;background:#151820;color:white;border:1px solid #414653;border-radius:13px;padding:13px;font-size:15px;resize:vertical;outline:none}
textarea:focus,select:focus{border-color:#8278ff}
input[type=file]{width:100%;font-size:13px;color:#c6cad3}
select{width:100%;padding:13px;background:#151820;color:white;border:1px solid #414653;border-radius:13px;font-size:15px}
button{width:100%;padding:16px;border:0;border-radius:13px;background:linear-gradient(120deg,#7167ff,#9b62e8);color:white;font-size:16px;font-weight:700;margin-top:17px}
button:disabled{opacity:.5}
.hint{font-size:12px;color:#89909e;line-height:1.5;margin-top:9px}
#status{margin-top:14px;color:#c1bbff;font-size:14px;line-height:1.5}
#result{width:100%;margin-top:16px;border-radius:14px;display:none}
#preview{display:none;width:100%;max-height:300px;object-fit:contain;border-radius:12px;margin-top:12px}
.secondary{background:#303541;margin-top:10px}
</style>
</head>
<body>
<div class="container">
 <div class="header">
  <div class="logo">✨ AI Bratishka</div>
  <div class="subtitle">Твоя личная AI-фотостудия</div>
 </div>

 <div class="panel">
  <h2>🎨 Создать или изменить фото</h2>

  <label for="prompt">Что нужно сделать?</label>
  <textarea id="prompt" maxlength="1200" placeholder="Например: замени фон на ночной город, сохрани лицо и внешность человека, добавь кинематографичный свет..."></textarea>

  <label for="photo">Добавить фотографию</label>
  <input id="photo" type="file" accept="image/jpeg,image/png,image/webp">
  <img id="preview" alt="Предпросмотр фотографии">

  <label for="model">Выбери модель</label>
  <select id="model">
   <option value="flux">FLUX — Cloudflare</option>
   <option value="sunburst">Sunburst — OpenAI (редактирование фото)</option>
  </select>
  <div class="hint">FLUX работает с текстом и фотографиями. Sunburst требует загруженную фотографию.</div>

  <button id="go">✨ Создать изображение</button>
  <div id="status"></div>
  <img id="result" alt="Готовое изображение">
  <button id="again" class="secondary" style="display:none">Создать ещё</button>
 </div>
</div>

<script>
const tg = window.Telegram && window.Telegram.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor("#111318");
  tg.setBackgroundColor("#111318");
}

const button = document.getElementById("go");
const statusBox = document.getElementById("status");
const result = document.getElementById("result");
const photoInput = document.getElementById("photo");
const preview = document.getElementById("preview");
const again = document.getElementById("again");
const modelSelect = document.getElementById("model");
const promptInput = document.getElementById("prompt");

let selectedFile = null;
let busy = false;
let previewUrl = null;

photoInput.addEventListener("change", () => {
  selectedFile = photoInput.files[0] || null;

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = null;
  }

  preview.style.display = "none";

  if (!selectedFile) return;

  if (!["image/jpeg","image/png","image/webp"].includes(selectedFile.type)) {
    statusBox.textContent = "Поддерживаются JPG, PNG и WEBP.";
    photoInput.value = "";
    selectedFile = null;
    return;
  }

  if (selectedFile.size > 20 * 1024 * 1024) {
    statusBox.textContent = "Исходная фотография слишком большая. Выбери файл до 20 МБ.";
    photoInput.value = "";
    selectedFile = null;
    return;
  }

  previewUrl = URL.createObjectURL(selectedFile);
  preview.src = previewUrl;
  preview.style.display = "block";
});

async function resizeImage(file) {
  const bitmap = await createImageBitmap(file);
  const maxSide = 1024;
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));

  const context = canvas.getContext("2d");

  if (!context) {
    bitmap.close();
    throw new Error("Не удалось обработать фотографию");
  }

  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise(resolve =>
    canvas.toBlob(resolve, "image/jpeg", 0.92)
  );

  if (!blob) {
    throw new Error("Не удалось обработать фотографию");
  }

  return blob;
}

async function runGeneration() {
  if (busy) return;

  const prompt = promptInput.value.trim();
  const selectedModel = modelSelect.value;

  if (!prompt) {
    statusBox.textContent = "Напиши, какое изображение нужно создать.";
    return;
  }

  if (!tg || !tg.initData) {
    statusBox.textContent = "Открой фотостудию через Telegram.";
    return;
  }

  if (selectedModel === "sunburst" && !selectedFile) {
    statusBox.textContent = "Для Sunburst необходимо загрузить фотографию.";
    return;
  }

  busy = true;
  button.disabled = true;
  again.disabled = true;
  again.style.display = "none";
  result.style.display = "none";

  statusBox.textContent = selectedModel === "sunburst"
    ? "✨ Sunburst редактирует фотографию..."
    : "🎨 Создаю изображение...";

  try {
    const data = new FormData();
    data.append("prompt", prompt);

    if (selectedFile) {
      const resized = await resizeImage(selectedFile);
      data.append("input_image_0", resized, "photo.jpg");
    }

    const endpoint = selectedModel === "sunburst"
      ? "/api/openai-test"
      : "/api/generate";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-Telegram-Init-Data": tg.initData
      },
      body: data
    });

    const answer = await response.json();

    if (!response.ok) {
      throw new Error(answer.error || "Ошибка генерации");
    }

    if (!answer.image) {
      throw new Error("Изображение не получено");
    }

    result.src = "data:image/png;base64," + answer.image;
    result.style.display = "block";
    statusBox.textContent = "✨ Готово! Изображение создано.";
    again.style.display = "block";

  } catch (error) {
    statusBox.textContent = "Не получилось: " + error.message;
  } finally {
    busy = false;
    button.disabled = false;
    again.disabled = false;
  }
}

button.addEventListener("click", runGeneration);
again.addEventListener("click", runGeneration);
</script>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return new Response("AI Bratishka Studio is running!", {
        headers: {"Content-Type": "text/plain; charset=utf-8"}
      });
    }

    if (request.method === "GET" && url.pathname === "/app") {
      return new Response(APP, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff"
        }
      });
    }

    if (request.method === "POST" && url.pathname === "/api/generate") {
      return generateImage(request, env);
    }

    if (request.method === "POST" && url.pathname === "/api/openai-test") {
      return generateOpenAIImage(request, env);
    }

    return new Response("Not found", {status: 404});
  }
};

async function checkRequest(request, env) {
  if (!env.BOT_TOKEN) {
    return Response.json(
      {error: "Не настроена проверка Telegram"},
      {status: 503}
    );
  }

  const contentLength = Number(request.headers.get("Content-Length") || 0);

  if (contentLength > 8 * 1024 * 1024) {
    return Response.json(
      {error: "Запрос слишком большой"},
      {status: 413}
    );
  }

  const initData = request.headers.get("X-Telegram-Init-Data");

  if (!await verifyTelegram(initData, env.BOT_TOKEN)) {
    return Response.json(
      {error: "Не удалось проверить Telegram. Открой приложение заново."},
      {status: 401}
    );
  }

  return null;
}

async function generateImage(request, env) {
  if (!env.AI) {
    return Response.json(
      {error: "Не настроена модель Cloudflare AI"},
      {status: 503}
    );
  }

  const authError = await checkRequest(request, env);
  if (authError) return authError;

  try {
    const data = await request.formData();
    const prompt = String(data.get("prompt") || "").trim();
    const photo = data.get("input_image_0");

    if (!prompt) {
      return Response.json(
        {error: "Напиши описание изображения"},
        {status: 400}
      );
    }

    if (prompt.length > 1200) {
      return Response.json(
        {error: "Описание слишком длинное"},
        {status: 400}
      );
    }

    const form = new FormData();
    form.append("prompt", prompt);
    form.append("width", "1024");
    form.append("height", "1024");

    if (photo && typeof photo.arrayBuffer === "function" && photo.size > 0) {
      if (photo.size > 5 * 1024 * 1024) {
        return Response.json(
          {error: "Фотография слишком большая"},
          {status: 413}
        );
      }

      const type = photo.type || "";

      if (!["image/jpeg", "image/png", "image/webp"].includes(type)) {
        return Response.json(
          {error: "Поддерживаются JPG, PNG и WEBP"},
          {status: 400}
        );
      }

      const bytes = await photo.arrayBuffer();
      form.append("input_image_0", new Blob([bytes], {type}), "photo.jpg");
    }

    const serialized = new Response(form);

    const result = await env.AI.run(MODEL, {
      multipart: {
        body: serialized.body,
        contentType: serialized.headers.get("content-type")
      }
    });

    if (!result || typeof result.image !== "string" || !result.image.length) {
      throw new Error("Модель не вернула изображение");
    }

    return Response.json({image: result.image});

  } catch (error) {
    console.error("Cloudflare generation error:", error.message);

    return Response.json(
      {error: "Не удалось создать изображение. Попробуй ещё раз."},
      {status: 500}
    );
  }
}

async function generateOpenAIImage(request, env) {
  if (!env.OPENAI_API_KEY) {
    return Response.json(
      {error: "Не настроен ключ OpenAI"},
      {status: 503}
    );
  }

  const authError = await checkRequest(request, env);
  if (authError) return authError;

  try {
    const data = await request.formData();
    const prompt = String(data.get("prompt") || "").trim();
    const photo = data.get("input_image_0");

    if (!prompt) {
      return Response.json(
        {error: "Напиши описание редактирования"},
        {status: 400}
      );
    }

    if (prompt.length > 1200) {
      return Response.json(
        {error: "Описание слишком длинное"},
        {status: 400}
      );
    }

    if (!photo || typeof photo.arrayBuffer !== "function" || photo.size === 0) {
      return Response.json(
        {error: "Загрузи фотографию для редактирования"},
        {status: 400}
      );
    }

    if (photo.size > 5 * 1024 * 1024) {
      return Response.json(
        {error: "Фотография слишком большая"},
        {status: 413}
      );
    }

    const type = photo.type || "";

    if (!["image/jpeg", "image/png", "image/webp"].includes(type)) {
      return Response.json(
        {error: "Поддерживаются JPG, PNG и WEBP"},
        {status: 400}
      );
    }

    const bytes = await photo.arrayBuffer();
    const form = new FormData();

    form.append("model", "gpt-image-2.6-sunburst");
    form.append("prompt", prompt);
    form.append("image", new Blob([bytes], {type}), "photo.jpg");
    form.append("quality", "medium");
    form.append("size", "1024x1024");
    form.append("output_format", "png");

    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + env.OPENAI_API_KEY
      },
      body: form
    });

    const responseText = await response.text();
    let result;

    try {
      result = JSON.parse(responseText);
    } catch {
      result = {};
    }

    if (!response.ok) {
      const code = result.error?.code || "";

      console.error(
        "OpenAI API error:",
        response.status,
        code
      );

      if (response.status === 401 || response.status === 403) {
        return Response.json(
          {error: "OpenAI отклонил доступ. Проверь настройки API-ключа."},
          {status: 502}
        );
      }

      if (
        response.status === 429 &&
        (code.includes("quota") || code.includes("billing"))
      ) {
        return Response.json(
          {error: "Недостаточно средств или не настроен биллинг OpenAI."},
          {status: 502}
        );
      }

      if (response.status === 429) {
        return Response.json(
          {error: "OpenAI временно ограничил запросы. Попробуй позже."},
          {status: 502}
        );
      }

      return Response.json(
        {error: "OpenAI не выполнил редактирование. Проверь доступность модели."},
        {status: 502}
      );
    }

    const image = result?.data?.[0]?.b64_json;

    if (!image) {
      throw new Error("OpenAI не вернул изображение");
    }

    return Response.json({image});

  } catch (error) {
    console.error("OpenAI generation error:", error.message);

    return Response.json(
      {error: "Не удалось выполнить редактирование через OpenAI."},
      {status: 500}
    );
  }
}

async function verifyTelegram(initData, botToken) {
  if (!initData || !botToken || initData.length > 10000) {
    return false;
  }

  try {
    const params = new URLSearchParams(initData);
    const receivedHash = params.get("hash");
    const authDate = Number(params.get("auth_date"));

    if (!receivedHash || !/^[a-f0-9]{64}$/i.test(receivedHash)) {
      return false;
    }

    if (!Number.isFinite(authDate)) {
      return false;
    }

    const now = Math.floor(Date.now() / 1000);

    if (authDate > now + 60 || now - authDate > 3600) {
      return false;
    }

    params.delete("hash");

    const checkString = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => key + "=" + value)
      .join("\n");

    const encoder = new TextEncoder();

    const secretKey = await crypto.subtle.importKey(
      "raw",
      encoder.encode("WebAppData"),
      {name: "HMAC", hash: "SHA-256"},
      false,
      ["sign"]
    );

    const secret = await crypto.subtle.sign(
      "HMAC",
      secretKey,
      encoder.encode(botToken)
    );

    const hmacKey = await crypto.subtle.importKey(
      "raw",
      secret,
      {name: "HMAC", hash: "SHA-256"},
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign(
      "HMAC",
      hmacKey,
      encoder.encode(checkString)
    );

    const calculatedHash = [...new Uint8Array(signature)]
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");

    let difference = 0;

    for (let i = 0; i < calculatedHash.length; i++) {
      difference |=
        calculatedHash.charCodeAt(i) ^
        receivedHash.toLowerCase().charCodeAt(i);
    }

    return difference === 0;

  } catch {
    return false;
  }
}
