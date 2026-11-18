
const MODEL = "@cf/black-forest-labs/flux-2-klein-4b";

const MAX_PROMPT = 1200;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const APP = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<meta name="theme-color" content="#111318">
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<title>AI Bratishka Studio</title>
<style>
*{box-sizing:border-box}
body{margin:0;padding:20px;background:#111318;color:white;font-family:-apple-system,BlinkMacSystemFont,Arial,sans-serif}
.container{max-width:600px;margin:auto}
.header{padding:12px 0 20px}
.logo{font-size:29px;font-weight:800;letter-spacing:-1px}
.subtitle{color:#9da3b2;margin-top:7px;font-size:14px}
.panel{background:#20232b;border:1px solid #303541;border-radius:20px;padding:18px;margin-top:14px}
h2{font-size:18px;margin:0 0 15px}
label{display:block;font-size:13px;color:#b9bfca;margin:15px 0 8px}
textarea{width:100%;height:125px;background:#151820;color:white;border:1px solid #414653;border-radius:13px;padding:13px;font-size:15px;resize:vertical;outline:none}
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
<textarea id="prompt" maxlength="1200"
placeholder="Например: замени фон на роскошный ночной город, сохрани лицо, прическу, одежду и внешность человека, добавь профессиональный кинематографичный свет..."></textarea>

<label for="photo">Исходная фотография</label>
<input id="photo" type="file" accept="image/jpeg,image/png,image/webp">
<img id="preview" alt="Предпросмотр">

<label for="model">Режим работы</label>
<select id="model">
<option value="flux">FLUX 2 Klein — бесплатный режим</option>
<option value="openrouter" disabled>OpenRouter — пока отключён</option>
</select>

<div class="hint">
FLUX поддерживает генерацию изображений и редактирование по фотографии.
Платные модели пока отключены.
</div>

<button id="go">✨ Создать изображение</button>
<div id="status"></div>
<img id="result" alt="Результат">
<button id="again" class="secondary" style="display:none">Создать ещё</button>
</div>
</div>

<script>
const tg = window.Telegram && window.Telegram.WebApp;

if(tg){
tg.ready();
tg.expand();
tg.setHeaderColor("#111318");
tg.setBackgroundColor("#111318");
}

const button=document.getElementById("go");
const statusBox=document.getElementById("status");
const result=document.getElementById("result");
const photoInput=document.getElementById("photo");
const preview=document.getElementById("preview");
const again=document.getElementById("again");
const promptInput=document.getElementById("prompt");

let selectedFile=null;
let busy=false;
let previewUrl=null;

photoInput.addEventListener("change",()=>{
selectedFile=photoInput.files[0]||null;

if(previewUrl)URL.revokeObjectURL(previewUrl);
previewUrl=null;
preview.style.display="none";

if(!selectedFile)return;

if(!["image/jpeg","image/png","image/webp"].includes(selectedFile.type)){
statusBox.textContent="Поддерживаются JPG, PNG и WEBP.";
photoInput.value="";
selectedFile=null;
return;
}

if(selectedFile.size>20*1024*1024){
statusBox.textContent="Фотография должна быть меньше 20 МБ.";
photoInput.value="";
selectedFile=null;
return;
}

previewUrl=URL.createObjectURL(selectedFile);
preview.src=previewUrl;
preview.style.display="block";
});

async function resizeImage(file){
const bitmap=await createImageBitmap(file);
const maxSide=512;
const scale=Math.min(1,maxSide/Math.max(bitmap.width,bitmap.height));

const canvas=document.createElement("canvas");
canvas.width=Math.max(1,Math.round(bitmap.width*scale));
canvas.height=Math.max(1,Math.round(bitmap.height*scale));

const context=canvas.getContext("2d");
if(!context){
bitmap.close();
throw new Error("Не удалось обработать фотографию");
}

context.drawImage(bitmap,0,0,canvas.width,canvas.height);
bitmap.close();

const blob=await new Promise(resolve=>
canvas.toBlob(resolve,"image/jpeg",0.90)
);

if(!blob)throw new Error("Ошибка обработки фотографии");
return blob;
}

async function runGeneration(){
if(busy)return;

const prompt=promptInput.value.trim();

if(!prompt){
statusBox.textContent="Напиши, что нужно создать или изменить.";
return;
}

if(!tg||!tg.initData){
statusBox.textContent="Открой фотостудию через Telegram.";
return;
}

busy=true;
button.disabled=true;
again.disabled=true;
again.style.display="none";
result.style.display="none";

statusBox.textContent="🎨 AI Bratishka работает над изображением...";

try{
const data=new FormData();
data.append("prompt",prompt);

if(selectedFile){
const resized=await resizeImage(selectedFile);
data.append("input_image_0",resized,"photo.jpg");
}

const response=await fetch("/api/generate",{
method:"POST",
headers:{"X-Telegram-Init-Data":tg.initData},
body:data
});

const answer=await response.json();

if(!response.ok){
throw new Error(answer.error||"Ошибка генерации");
}

if(!answer.image)throw new Error("Изображение не получено");

result.src="data:image/png;base64,"+answer.image;
result.style.display="block";
statusBox.textContent="✨ Готово! Изображение создано.";
again.style.display="block";

}catch(error){
statusBox.textContent="Не получилось: "+error.message;
}finally{
busy=false;
button.disabled=false;
again.disabled=false;
}
}

button.addEventListener("click",runGeneration);
again.addEventListener("click",runGeneration);
</script>
</body>
</html>`;

export default {
async fetch(request,env){
const url=new URL(request.url);

if(request.method==="GET"&&url.pathname==="/"){
return new Response("AI Bratishka Studio v2 is running!",{
headers:{"Content-Type":"text/plain; charset=utf-8"}
});
}

if(request.method==="GET"&&url.pathname==="/app"){
return new Response(APP,{
headers:{
"Content-Type":"text/html; charset=utf-8",
"Cache-Control":"no-store",
"X-Content-Type-Options":"nosniff"
}
});
}

if(request.method==="POST"&&url.pathname==="/api/generate"){
return generateImage(request,env);
}

if(request.method==="POST"&&url.pathname==="/api/openrouter"){
return generateOpenRouterImage(request,env);
}

return new Response("Not found",{status:404});
}
};

async function checkRequest(request,env){
if(!env.BOT_TOKEN){
return Response.json({error:"Не настроена проверка Telegram"},{status:503});
}

const length=Number(request.headers.get("Content-Length")||0);

if(length>8*1024*1024){
return Response.json({error:"Запрос слишком большой"},{status:413});
}

const initData=request.headers.get("X-Telegram-Init-Data");

if(!await verifyTelegram(initData,env.BOT_TOKEN)){
return Response.json({
error:"Не удалось проверить Telegram. Открой приложение заново."
},{status:401});
}

return null;
}

async function readInput(request){
const data=await request.formData();
const prompt=String(data.get("prompt")||"").trim();
const photo=data.get("input_image_0");

if(!prompt)return {error:"Напиши описание изображения"};

if(prompt.length>MAX_PROMPT)return {error:"Описание слишком длинное"};

let bytes=null;
let type=null;

if(photo&&typeof photo.arrayBuffer==="function"&&photo.size>0){
if(photo.size>MAX_IMAGE_SIZE){
return {error:"Фотография слишком большая"};
}

type=photo.type||"";

if(!["image/jpeg","image/png","image/webp"].includes(type)){
return {error:"Поддерживаются JPG, PNG и WEBP"};
}

bytes=await photo.arrayBuffer();
}

return {prompt,bytes,type};
}

async function generateImage(request,env){
const auth=await checkRequest(request,env);
if(auth)return auth;

if(!env.AI){
return Response.json({error:"Не настроена модель Cloudflare AI"},{status:503});
}

try{
const input=await readInput(request);
if(input.error)return Response.json({error:input.error},{status:400});

const form=new FormData();
form.append("prompt",input.prompt);
form.append("width","1024");
form.append("height","1024");
form.append("guidance","4");

if(input.bytes){
form.append(
"input_image_0",
new Blob([input.bytes],{type:input.type}),
"photo.jpg"
);
}

const serialized=new Response(form);

const result=await env.AI.run(MODEL,{
multipart:{
body:serialized.body,
contentType:serialized.headers.get("content-type")
}
});

if(!result||typeof result.image!=="string"||!result.image.length){
throw new Error("Модель не вернула изображение");
}

return Response.json({image:result.image});

}catch(error){
console.error("FLUX error:",error.message);
return Response.json({
error:"Не удалось создать изображение. Попробуй ещё раз."
},{status:500});
}
}

async function generateOpenRouterImage(request,env){
const auth=await checkRequest(request,env);
if(auth)return auth;

// Дополнительная блокировка платных запросов.
// По умолчанию OpenRouter отключён.
if(env.OPENROUTER_ENABLED!=="true"){
return Response.json({
error:"OpenRouter отключён. Платные запросы не разрешены."
},{status:403});
}

if(!env.OPENROUTER_API_KEY||!env.OPENROUTER_IMAGE_MODEL){
return Response.json({
error:"Не настроены параметры OpenRouter"
},{status:503});
}

try{
const input=await readInput(request);
if(input.error)return Response.json({error:input.error},{status:400});

const body={
model:env.OPENROUTER_IMAGE_MODEL,
prompt:input.prompt
};

if(input.bytes){
const base64=arrayBufferToBase64(input.bytes);
body.input_references=[
"data:"+input.type+";base64,"+base64
];
}

const response=await fetch("https://openrouter.ai/api/v1/images",{
method:"POST",
headers:{
"Authorization":"Bearer "+env.OPENROUTER_API_KEY,
"Content-Type":"application/json"
},
body:JSON.stringify(body),
signal:AbortSignal.timeout(120000)
});

const result=await response.json();

if(!response.ok){
console.error("OpenRouter error:",response.status);
return Response.json({
error:"OpenRouter не выполнил запрос. Проверь модель и баланс."
},{status:502});
}

const image=result?.data?.[0]?.b64_json;

if(!image){
throw new Error("OpenRouter не вернул изображение");
}

return Response.json({image});

}catch(error){
console.error("OpenRouter generation error:",error.message);
return Response.json({
error:"Ошибка подключения к OpenRouter"
},{status:502});
}
}

function arrayBufferToBase64(buffer){
const bytes=new Uint8Array(buffer);
const chunkSize=0x8000;
let binary="";

for(let i=0;i<bytes.length;i+=chunkSize){
binary+=String.fromCharCode(...bytes.subarray(i,i+chunkSize));
}

return btoa(binary);
}

async function verifyTelegram(initData,botToken){
if(!initData||!botToken||initData.length>10000)return false;

try{
const params=new URLSearchParams(initData);
const receivedHash=params.get("hash");
const authDate=Number(params.get("auth_date"));

if(!receivedHash||!/^[a-f0-9]{64}$/i.test(receivedHash))return false;
if(!Number.isFinite(authDate))return false;

const now=Math.floor(Date.now()/1000);

if(authDate>now+60||now-authDate>3600)return false;

params.delete("hash");

const checkString=[...params.entries()]
.sort(([a],[b])=>a.localeCompare(b))
.map(([key,value])=>key+"="+value)
.join("\n");

const encoder=new TextEncoder();

const secretKey=await crypto.subtle.importKey(
"raw",
encoder.encode("WebAppData"),
{name:"HMAC",hash:"SHA-256"},
false,
["sign"]
);

const secret=await crypto.subtle.sign(
"HMAC",
secretKey,
encoder.encode(botToken)
);

const hmacKey=await crypto.subtle.importKey(
"raw",
secret,
{name:"HMAC",hash:"SHA-256"},
false,
["sign"]
);

const signature=await crypto.subtle.sign(
"HMAC",
hmacKey,
encoder.encode(checkString)
);

const calculated=[...new Uint8Array(signature)]
.map(byte=>byte.toString(16).padStart(2,"0"))
.join("");

let difference=0;

for(let i=0;i<calculated.length;i++){
difference|=
calculated.charCodeAt(i)^receivedHash.toLowerCase().charCodeAt(i);
}

return difference===0;

}catch{
return false;
}
}
