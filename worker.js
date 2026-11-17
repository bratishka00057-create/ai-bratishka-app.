
const MODEL = "@cf/black-forest-labs/flux-2-klein-4b";
const WEBHOOK_SECRET = "bratishka_tg_2026_secure_7f9c2a81";

const APP = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<style>
*{box-sizing:border-box}
body{margin:0;padding:20px;background:#111318;color:white;font-family:Arial,sans-serif}
h1{font-size:27px;margin:12px 0}
p{color:#aeb4c0}
.panel{background:#20232b;border-radius:18px;padding:18px;margin-top:18px}
textarea{width:100%;height:110px;background:#151820;color:white;border:1px solid #414653;border-radius:12px;padding:12px;font-size:16px;resize:vertical}
button{width:100%;padding:16px;border:0;border-radius:12px;background:#6d63f5;color:white;font-size:17px;font-weight:bold;margin-top:14px}
input{width:100%;margin-top:12px;color:white}
#result{width:100%;margin-top:18px;border-radius:14px;display:none}
#status{margin-top:14px;color:#b9b6ff}
</style>
</head>
<body>
<h1>✨ AI Bratishka</h1>
<p>Твоя личная AI-фотостудия</p>
<div class="panel">
<h3>🎨 Создать или изменить фото</h3>
<textarea id="prompt" placeholder="Например: создай кинематографичный портрет на фоне ночного города..."></textarea>
<input id="photo" type="file" accept="image/*">
<button id="go">Создать изображение</button>
<div id="status"></div>
<img id="result">
</div>
<script>
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const button = document.getElementById("go");
const statusBox = document.getElementById("status");
const result = document.getElementById("result");

async function resizeImage(file) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 500 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return await new Promise(resolve =>
    canvas.toBlob(resolve, "image/png")
  );
}

button.onclick = async () => {
  const prompt = document.getElementById("prompt").value.trim();
  const file = document.getElementById("photo").files[0];

  if (!prompt) {
    statusBox.textContent = "Напиши, что нужно создать.";
    return;
  }

  if (!tg.initData) {
    statusBox.textContent = "Открой студию через Telegram.";
    return;
  }

  button.disabled = true;
  statusBox.textContent = "🎨 Создаю изображение...";
  result.style.display = "none";

  try {
    const data = new FormData();
    data.append("prompt", prompt);

    if (file) {
      data.append("input_image_0", await resizeImage(file), "photo.png");
    }

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {"X-Telegram-Init-Data": tg.initData},
      body: data
    });

    const answer = await response.json();
    if (!response.ok) throw new Error(answer.error || "Ошибка генерации");

    result.src = "data:image/png;base64," + answer.image;
    result.style.display = "block";
    statusBox.textContent = "✨ Готово!";
  } catch (error) {
    statusBox.textContent = "Не получилось: " + error.message;
  } finally {
    button.disabled = false;
  }
};
</script>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response("AI Bratishka is running!");
    }

    if (url.pathname === "/app") {
      return new Response(APP, {
        headers: {"Content-Type": "text/html; charset=utf-8"}
      });
    }

    if (url.pathname === "/setup") {
      const result = await telegram(env, "setWebhook", {
        url: url.origin + "/webhook",
        secret_token: WEBHOOK_SECRET
      });
      return Response.json(result);
    }

    if (url.pathname === "/webhook" && request.method === "POST") {
      if (request.headers.get("X-Telegram-Bot-Api-Secret-Token") !== WEBHOOK_SECRET) {
        return new Response("Forbidden", {status: 403});
      }
      const update = await request.json();
      await handleUpdate(update, env, url.origin);
      return new Response("OK");
    }

    if (url.pathname === "/api/generate" && request.method === "POST") {
      if (!await verifyTelegram(request.headers.get("X-Telegram-Init-Data"), env.BOT_TOKEN)) {
        return Response.json({error: "Не удалось проверить Telegram"}, {status: 401});
      }

      try {
        const data = await request.formData();
        const prompt = String(data.get("prompt") || "").trim();
        const photo = data.get("input_image_0");

        if (!prompt) {
          return Response.json({error: "Пустое описание"}, {status: 400});
        }

        const form = new FormData();
        form.append("prompt", prompt);
        form.append("width", "1024");
        form.append("height", "1024");

        if (photo && typeof photo.arrayBuffer === "function") {
          form.append("input_image_0", photo, "photo.png");
        }

        const encoded = new Response(form);
        const result = await env.AI.run(MODEL, {
          multipart: {
            body: encoded.body,
            contentType: encoded.headers.get("content-type")
          }
        });

        if (!result || !result.image) {
          throw new Error("Модель не вернула изображение");
        }

        return Response.json({image: result.image});
      } catch (error) {
        console.error(error);
        return Response.json({error: "Ошибка генерации. Попробуй ещё раз."}, {status: 500});
      }
    }

    return new Response("Not found", {status: 404});
  }
};

async function telegram(env, method, body) {
  const response = await fetch(
    "https://api.telegram.org/bot" + env.BOT_TOKEN + "/" + method,
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    }
  );
  return response.json();
}

async function handleUpdate(update, env, origin) {
  const message = update.message;
  if (!message || !message.chat) return;

  const keyboard = {
    inline_keyboard: [[
      {text: "✨ Открыть AI-фотостудию", web_app: {url: origin + "/app"}}
    ]]
  };

  await telegram(env, "sendMessage", {
    chat_id: message.chat.id,
    text: "Привет! Я AI Bratishka 🤖\n\nОткрывай фотостудию и создавай или редактируй изображения.",
    reply_markup: keyboard
  });
}

async function verifyTelegram(initData, botToken) {
  if (!initData || !botToken) return false;

  try {
    const params = new URLSearchParams(initData);
    const receivedHash = params.get("hash");
    if (!receivedHash) return false;

    params.delete("hash");
    const checkString = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => key + "=" + value)
      .join("\n");

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw", encoder.encode("WebAppData"),
      {name: "HMAC", hash: "SHA-256"}, false, ["sign"]
    );

    const secret = await crypto.subtle.sign(
      "HMAC", key, encoder.encode(botToken)
    );

    const hmacKey = await crypto.subtle.importKey(
      "raw", secret,
      {name: "HMAC", hash: "SHA-256"}, false, ["sign"]
    );

    const signature = await crypto.subtle.sign(
      "HMAC", hmacKey, encoder.encode(checkString)
    );

    const calculatedHash = [...new Uint8Array(signature)]
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");

    return calculatedHash === receivedHash;
  } catch {
    return false;
  }
}
