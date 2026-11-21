
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
.download{background:linear-gradient(120deg,#168b66,#24a77c)}
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

<label for="mode">Режим фотостудии</label>
<select id="mode">
<option value="precise">Точное редактирование</option>
<option value="creative">Новые образы и стили</option>
</select>

<label for="prompt">Что нужно сделать?</label>
<textarea id="prompt" maxlength="1200"
placeholder="Например: замени фон на роскошный ночной город, сохрани лицо, внешность и одежду..."></textarea>

<label for="photo">Исходная фотография</label>
<input id="photo" type="file" accept="image/jpeg,image/png,image/webp">
<img id="preview" alt="Предпросмотр">

<div class="hint">
Для точного редактирования загрузи фотографию.
Входное изображение обрабатывается с сохранением пропорций.
</div>

<button id="go">✨ Создать изображение</button>

<div id="status"></div>

<img id="result" alt="Готовая фотография">

<button id="download" class="download" style="display:none">
⬇️ Скачать фотографию
</button>

<button id="share" class="secondary" style="display:none">
Поделиться / сохранить
</button>

<button id="again" class="secondary" style="display:none">
Создать ещё
</button>
</div>
</div>

<script>
const tg=window.Telegram&&window.Telegram.WebApp;

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
const download=document.getElementById("download");
const share=document.getElementById("share");
const promptInput=document.getElementById("prompt");
const modeSelect=document.getElementById("mode");

let selectedFile=null;
let busy=false;
let previewUrl=null;
let resultBlob=null;
let resultUrl=null;

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
statusBox.textContent="Выбери фотографию до 20 МБ.";
photoInput.value="";
selectedFile=null;
return;
}

previewUrl=URL.createObjectURL(selectedFile);
preview.src=previewUrl;
preview.style.display="block";
});

async function prepareImage(file){
const bitmap=await createImageBitmap(file);

const maxInput=496;
const scale=Math.min(1,maxInput/Math.max(bitmap.width,bitmap.height));

const canvas=document.createElement("canvas");
canvas.width=Math.max(1,Math.round(bitmap.width*scale));
canvas.height=Math.max(1,Math.round(bitmap.height*scale));

const context=canvas.getContext("2d");

if(!context){
bitmap.close();
throw new Error("Ошибка обработки фотографии");
}

context.drawImage(bitmap,0,0,canvas.width,canvas.height);

const originalWidth=bitmap.width;
const originalHeight=bitmap.height;
bitmap.close();

const blob=await new Promise(resolve=>
canvas.toBlob(resolve,"image/jpeg",0.90)
);

if(!blob)throw new Error("Не удалось подготовить фотографию");

const outputScale=Math.min(
1,
1024/Math.max(originalWidth,originalHeight)
);

const outputWidth=Math.max(256,Math.round(originalWidth*outputScale/16)*16);
const outputHeight=Math.max(256,Math.round(originalHeight*outputScale/16)*16);

return {
blob,
width:outputWidth,
height:outputHeight
};
}

function clearResult(){
result.style.display="none";
download.style.display="none";
share.style.display="none";
again.style.display="none";

if(resultUrl){
URL.revokeObjectURL(resultUrl);
resultUrl=null;
}

resultBlob=null;
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
clearResult();

statusBox.textContent="🎨 AI Bratishka создаёт фотографию...";

try{
const data=new FormData();

let finalPrompt=prompt;

if(modeSelect.value==="precise"&&selectedFile){
finalPrompt=
"Edit the supplied photograph. Preserve the original person's identity, face, facial features, hairstyle, body proportions, clothing and pose as faithfully as possible. Do not redesign or replace the person. Change only what the user explicitly requests. Keep all other details unchanged. Make the result photorealistic. User instruction: "+
prompt;
}

if(modeSelect.value==="creative"&&selectedFile){
finalPrompt=
"Use the supplied photograph as a visual reference. Create the requested artistic transformation while maintaining recognizable identity and natural anatomy where possible. User instruction: "+
prompt;
}

data.append("prompt",finalPrompt);

if(selectedFile){
statusBox.textContent="🖼️ Подготавливаю фотографию...";

const prepared=await prepareImage(selectedFile);

if(prepared.blob.size>5*1024*1024){
throw new Error("Подготовленная фотография слишком большая");
}

data.append("input_image_0",prepared.blob,"photo.jpg");
data.append("width",String(prepared.width));
data.append("height",String(prepared.height));
}else{
data.append("width","1024");
data.append("height","1024");
}

statusBox.textContent="✨ Модель обрабатывает изображение...";

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

const binary=atob(answer.image);
const bytes=new Uint8Array(binary.length);

for(let i=0;i<binary.length;i++){
bytes[i]=binary.charCodeAt(i);
}

resultBlob=new Blob([bytes],{type:"image/png"});
resultUrl=URL.createObjectURL(resultBlob);

result.src=resultUrl;
result.style.display="block";

download.style.display="block";
share.style.display="block";
again.style.display="block";

statusBox.textContent="✨ Готово! Фотография создана.";

}catch(error){
statusBox.textContent="Не получилось: "+error.message;
}finally{
busy=false;
button.disabled=false;
again.disabled=false;
}
}

download.addEventListener("click",()=>{
if(!resultBlob)return;

const url=URL.createObjectURL(resultBlob);
const link=document.createElement("a");

link.href=url;
link.download="AI-Bratishka-"+Date.now()+".png";
document.body.appendChild(link);
link.click();
link.remove();

setTimeout(()=>URL.revokeObjectURL(url),60000);
});

share.addEventListener("click",async()=>{
if(!resultBlob)return;

try{
const file=new File(
[resultBlob],
"AI-Bratishka.png",
{type:"image/png"}
);

if(navigator.canShare&&navigator.canShare({files:[file]})){
await navigator.share({
files:[file],
title:"AI Bratishka"
});
}else{
statusBox.textContent="Нажми «Скачать фотографию» или открой изображение.";
}
}catch(error){
if(error.name!=="AbortError"){
statusBox.textContent="Не удалось открыть меню отправки. Попробуй скачать фотографию.";
}
}
});

button.addEventListener("click",runGeneration);
again.addEventListener("click",runGeneration);

</script>
</body>
</html>`;

export default {
async fetch(request,env){
const url=new URL(request.url);

if(request.method==="GET"&&url.pathname==="/"){
  return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
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

return new Response("Not found",{status:404});
}
};

async function checkRequest(request,env){
if(!env.BOT_TOKEN){
return Response.json(
{error:"Не настроена проверка Telegram"},
{status:503}
);
}

const length=Number(request.headers.get("Content-Length")||0);

if(length>8*1024*1024){
return Response.json(
{error:"Запрос слишком большой"},
{status:413}
);
}

const initData=request.headers.get("X-Telegram-Init-Data");

if(!await verifyTelegram(initData,env.BOT_TOKEN)){
return Response.json(
{error:"Не удалось проверить Telegram. Открой приложение заново."},
{status:401}
);
}

return null;
}

async function generateImage(request,env){
const auth=await checkRequest(request,env);
if(auth)return auth;

if(!env.AI){
return Response.json(
{error:"Не настроена модель Cloudflare AI"},
{status:503}
);
}

try{
const data=await request.formData();

const prompt=String(data.get("prompt")||"").trim();
const photo=data.get("input_image_0");

if(!prompt){
return Response.json(
{error:"Напиши описание изображения"},
{status:400}
);
}

if(prompt.length>MAX_PROMPT+500){
return Response.json(
{error:"Описание слишком длинное"},
{status:400}
);
}

let width=Number(data.get("width")||1024);
let height=Number(data.get("height")||1024);

if(
!Number.isInteger(width)||
!Number.isInteger(height)||
width<256||width>1920||
height<256||height>1920
){
return Response.json(
{error:"Неверный размер изображения"},
{status:400}
);
}

const form=new FormData();

form.append("prompt",prompt);
form.append("width",String(width));
form.append("height",String(height));
form.append("guidance","4");

if(photo&&typeof photo.arrayBuffer==="function"&&photo.size>0){
if(photo.size>MAX_IMAGE_SIZE){
return Response.json(
{error:"Фотография слишком большая"},
{status:413}
);
}

const type=photo.type||"";

if(!["image/jpeg","image/png","image/webp"].includes(type)){
return Response.json(
{error:"Поддерживаются JPG, PNG и WEBP"},
{status:400}
);
}

const bytes=await photo.arrayBuffer();

form.append(
"input_image_0",
new Blob([bytes],{type}),
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
console.error("FLUX generation error:",error.message);

return Response.json(
{error:"Не удалось создать изображение. Попробуй ещё раз."},
{status:500}
);
}
}

async function verifyTelegram(initData,botToken){
if(!initData||!botToken||initData.length>10000){
return false;
}

try{
const params=new URLSearchParams(initData);

const receivedHash=params.get("hash");
const authDate=Number(params.get("auth_date"));

if(!receivedHash||!/^[a-f0-9]{64}$/i.test(receivedHash)){
return false;
}

if(!Number.isFinite(authDate)){
return false;
}

const now=Math.floor(Date.now()/1000);

if(authDate>now+60||now-authDate>3600){
return false;
}

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

if(calculated.length!==receivedHash.length){
return false;
}

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
