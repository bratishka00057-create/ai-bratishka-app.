
const MODEL = "gpt-image-2.6-sunburst";
const MAX_FILE_SIZE = 15 * 1024 * 1024;

const HTML = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#111318">
<title>AI Bratishka Studio</title>
<style>
*{box-sizing:border-box}
body{margin:0;padding:20px;background:#111318;color:white;font-family:Arial,sans-serif}
main{max-width:600px;margin:auto}
h1{font-size:27px}
p{color:#aeb4c2}
.panel{background:#20232b;border:1px solid #353a47;border-radius:18px;padding:18px}
label{display:block;margin:16px 0 8px;color:#c4c9d4}
input,textarea{width:100%;padding:13px;border-radius:10px;border:1px solid #454b59;background:#151820;color:white}
textarea{height:120px;resize:vertical}
button{width:100%;padding:15px;margin-top:16px;border:0;border-radius:11px;background:#7968f5;color:white;font-size:16px;font-weight:bold}
button:disabled{opacity:.5}
img{display:none;width:100%;margin-top:18px;border-radius:12px}
#status{margin-top:14px;line-height:1.5}
</style>
</head>
<body>
<main>
<h1>✨ AI Bratishka Studio</h1>
<p>Профессиональное редактирование фотографий</p>
<div class="panel">
<label>Исходная фотография</label>
<input id="photo" type="file" accept="image/jpeg,image/png,image/webp">
<label>Что изменить на фотографии?</label>
<textarea id="prompt" maxlength="4000" placeholder="Например: замени фон на роскошный интерьер пятизвёздочного отеля. Сохрани моё лицо, внешность, волосы, одежду и позу без изменений."></textarea>
<label>Тестовый код</label>
<input id="access" type="password" placeholder="Код доступа">
<button id="run">Обработать фотографию</button>
<div id="status"></div>
<img id="result">
<button id="save" style="display:none">Сохранить результат</button>
</div>
</main>
<script>
const photo=document.getElementById("photo");
const promptBox=document.getElementById("prompt");
const access=document.getElementById("access");
const run=document.getElementById("run");
const statusBox=document.getElementById("status");
const result=document.getElementById("result");
const save=document.getElementById("save");
let outputUrl="";

run.onclick=async()=>{
 const file=photo.files[0];
 const prompt=promptBox.value.trim();
 if(!file){statusBox.textContent="Выбери фотографию.";return;}
 if(file.size>15*1024*1024){statusBox.textContent="Файл больше 15 МБ.";return;}
 if(!prompt){statusBox.textContent="Опиши нужное изменение.";return;}
 if(!access.value.trim()){statusBox.textContent="Введи тестовый код.";return;}
 run.disabled=true;
 statusBox.textContent="Проверяю настройки...";
 result.style.display="none";
 save.style.display="none";
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
  save.style.display="block";
  statusBox.textContent="Готово!";
 }catch(e){statusBox.textContent="Ошибка: "+e.message;}
 finally{run.disabled=false;}
};
save.onclick=()=>{
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
        { image: `data:image/png;base64,${imageBase64}` },
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