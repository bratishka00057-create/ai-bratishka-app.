
const MODEL = "@cf/black-forest-labs/flux-2-klein-4b";
const MAX_PROMPT = 1200;

const APP = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<meta name="theme-color" content="#111318">
<script src="https://telegram.org/js/telegram-web-app.js"><\/script>
<title>AI Bratishka Studio v4 Test</title>
<style>
*{box-sizing:border-box}
body{margin:0;padding:18px;background:#111318;color:white;font-family:-apple-system,Arial,sans-serif}
.container{max-width:600px;margin:auto}
.logo{font-size:28px;font-weight:800;padding:12px 0}
.subtitle{color:#9da3b2;font-size:14px;margin-bottom:18px}
.panel{background:#20232b;border:1px solid #303541;border-radius:18px;padding:17px;margin-top:14px}
label{display:block;font-size:13px;color:#b9bfca;margin:15px 0 8px}
textarea{width:100%;height:110px;background:#151820;color:white;border:1px solid #414653;border-radius:12px;padding:12px;font-size:15px}
input{width:100%;color:white}
button{width:100%;padding:15px;border:0;border-radius:12px;background:#7968f5;color:white;font-size:16px;font-weight:700;margin-top:14px}
button:disabled{opacity:.5}
.secondary{background:#303541}
img{width:100%;max-height:520px;object-fit:contain;border-radius:12px;margin-top:12px}
#preview,#result{display:none}
#status{font-size:14px;line-height:1.5;color:#c6bdff;margin-top:14px}
.hint{font-size:12px;color:#9299a8;line-height:1.5;margin-top:9px}
</style>
</head>
<body>
<div class="container">
<div class="logo">✨ AI Bratishka</div>
<div class="subtitle">Studio v4 · тест замены фона</div>

<div class="panel">
<label>Фотография</label>
<input id="photo" type="file" accept="image/jpeg,image/png,image/webp">
<img id="preview">

<label>Новый фон</label>
<label>Код доступа для теста</label>

<input id="accessCode" type="password" autocomplete="current-password" placeholder="Введи тестовый код">
<textarea id="prompt" maxlength="1200" placeholder="Например: роскошный ночной город, красивые огни, кинематографический свет..."></textarea>

<div class="hint">
Тест сохраняет исходные пиксели человека и создаёт новый фон отдельно.
Модель сегментации загружается при первом запуске и может занимать около 16 МБ.
</div>

<button id="go">Заменить фон</button>
<div id="status"></div>
<img id="result">
<button id="share" class="secondary" style="display:none">Поделиться / сохранить</button>
</div>
</div>

<script type="module">
import {FilesetResolver,ImageSegmenter} from
"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";

const tg=window.Telegram?.WebApp;
if(tg){tg.ready();tg.expand();}

const photo=document.getElementById("photo");
const prompt=document.getElementById("prompt");
const accessCode=document.getElementById("accessCode");
const button=document.getElementById("go");
const status=document.getElementById("status");
const preview=document.getElementById("preview");
const result=document.getElementById("result");
const share=document.getElementById("share");

let file=null;
let segmenter=null;
let resultBlob=null;

photo.addEventListener("change",()=>{
 file=photo.files?.[0]||null;
 result.style.display="none";
 share.style.display="none";
 if(!file)return;
 if(!["image/jpeg","image/png","image/webp"].includes(file.type)){
  status.textContent="Выбери JPG, PNG или WEBP.";
  file=null;return;
 }
 if(file.size>15*1024*1024){
  status.textContent="Фотография должна быть меньше 15 МБ.";
  file=null;return;
 }
 preview.src=URL.createObjectURL(file);
 preview.style.display="block";
});

async function loadSegmenter(){
 if(segmenter)return segmenter;
 status.textContent="Загружаю MediaPipe и модель сегментации...";
 const vision=await FilesetResolver.forVisionTasks(
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
 );
 segmenter=await ImageSegmenter.createFromOptions(vision,{
  baseOptions:{
   modelAssetPath:"https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_multiclass_256x256/float32/latest/selfie_multiclass_256x256.tflite",
   delegate:"CPU"
  },
  runningMode:"IMAGE",
  outputCategoryMask:true,
  outputConfidenceMasks:false
 });
 return segmenter;
}

function canvasBlob(canvas){
 return new Promise((resolve,reject)=>{
  canvas.toBlob(b=>b?resolve(b):reject(new Error("Не удалось подготовить изображение")),"image/jpeg",0.94);
 });
}

async function makeComposite(source,maskData,maskW,maskH,bgBlob){
 const bg=await createImageBitmap(bgBlob);
 const w=source.width,h=source.height;

 const bgCanvas=document.createElement("canvas");
 bgCanvas.width=w;bgCanvas.height=h;
 const bc=bgCanvas.getContext("2d");
 bc.drawImage(bg,0,0,w,h);

 const maskCanvas=document.createElement("canvas");
 maskCanvas.width=maskW;maskCanvas.height=maskH;
 const mc=maskCanvas.getContext("2d");
 const pixels=mc.createImageData(maskW,maskH);

 for(let i=0;i<maskData.length;i++){
  const category=maskData[i];
  const keep=category>=1&&category<=5;
  const p=i*4;
  pixels.data[p]=255;
  pixels.data[p+1]=255;
  pixels.data[p+2]=255;
  pixels.data[p+3]=keep?255:0;
 }
 mc.putImageData(pixels,0,0);

 const smooth=document.createElement("canvas");
 smooth.width=w;smooth.height=h;
 const sc=smooth.getContext("2d");
 sc.imageSmoothingEnabled=true;
 sc.drawImage(maskCanvas,0,0,w,h);

 const subject=document.createElement("canvas");
 subject.width=w;subject.height=h;
 const sx=subject.getContext("2d");
 sx.drawImage(source,0,0,w,h);
 sx.globalCompositeOperation="destination-in";
 sx.drawImage(smooth,0,0,w,h);

 bc.drawImage(subject,0,0,w,h);
 bg.close();

 return canvasBlob(bgCanvas);
}

async function generate(){
 if(!file){status.textContent="Сначала выбери фотографию.";return;}
 const text=prompt.value.trim();
 if(!text){status.textContent="Опиши новый фон.";return;}

 button.disabled=true;
 share.style.display="none";
 result.style.display="none";

 try{
  const bitmap=await createImageBitmap(file);
  const maxSide=1024;
  const scale=Math.min(1,maxSide/Math.max(bitmap.width,bitmap.height));
  const w=Math.max(256,Math.round(bitmap.width*scale));
  const h=Math.max(256,Math.round(bitmap.height*scale));

  const sourceCanvas=document.createElement("canvas");
  sourceCanvas.width=w;sourceCanvas.height=h;
  sourceCanvas.getContext("2d").drawImage(bitmap,0,0,w,h);
  bitmap.close();

  status.textContent="1/3 · Выделяю человека и волосы...";
  const task=await loadSegmenter();

  const imageBitmap=await createImageBitmap(sourceCanvas);
  const segmentation=await new Promise((resolve,reject)=>{
   try{task.segment(imageBitmap,resolve);}
   catch(e){reject(e);}
  });
  imageBitmap.close();

  const mask=segmentation.categoryMask;
  if(!mask)throw new Error("MediaPipe не вернул маску.");

  const maskData=mask.getAsUint8Array();
  const maskW=mask.width;
  const maskH=mask.height;

  let subjectPixels=0;
  for(let i=0;i<maskData.length;i++){
   if(maskData[i]>=1&&maskData[i]<=5)subjectPixels++;
  }
  if(subjectPixels<maskData.length*0.01){
   throw new Error("Не удалось выделить человека. Попробуй другое фото.");
  }

  status.textContent="2/3 · Создаю новый фон через FLUX...";
  const backgroundResponse=await fetch("/api/background",{
   method:"POST",
   headers:{
    "Content-Type":"application/json",
"X-V4-Test-Key":accessCode.value.trim()
   },
   body:JSON.stringify({prompt:text,width:w,height:h})
  });

  const background=await backgroundResponse.json();
  if(!backgroundResponse.ok)throw new Error(background.error||"Ошибка создания фона");
  if(!background.image)throw new Error("Фон не получен.");

  status.textContent="3/3 · Соединяю оригинального человека с новым фоном...";
  const binary=atob(background.image);
  const bytes=new Uint8Array(binary.length);
  for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
  const bgBlob=new Blob([bytes],{type:"image/png"});

  resultBlob=await makeComposite(sourceCanvas,maskData,maskW,maskH,bgBlob);
  result.src=URL.createObjectURL(resultBlob);
  result.style.display="block";
  share.style.display="block";
  status.textContent="Готово! Проверь волосы и края фигуры.";
 }catch(e){
  status.textContent="Ошибка: "+e.message;
 }finally{
  button.disabled=false;
 }
}

button.addEventListener("click",generate);

share.addEventListener("click",async()=>{
 if(!resultBlob)return;
 const f=new File([resultBlob],"AI-Bratishka-v4.jpg",{type:"image/jpeg"});
 try{
  if(navigator.canShare?.({files:[f]})){
   await navigator.share({files:[f],title:"AI Bratishka"});
  }else{
   const a=document.createElement("a");
   a.href=URL.createObjectURL(resultBlob);
   a.download="AI-Bratishka-v4.jpg";
   a.click();
  }
 }catch(e){
  if(e.name!=="AbortError")status.textContent="Не удалось открыть меню сохранения.";
 }
});
</script>
</body>
</html>`;

export default {
 async fetch(request,env){
  const url=new URL(request.url);

  if(request.method==="GET"&&url.pathname==="/"){
   return new Response("AI Bratishka Studio v4 TEST",{headers:{"Content-Type":"text/plain; charset=utf-8"}});
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

  if(request.method==="POST"&&url.pathname==="/api/background"){
   return createBackground(request,env);
  }

  return new Response("Not found",{status:404});
 }
};

async function createBackground(request,env){
const auth=await checkV4TestKey(request,env);
 if(auth)return auth;

 if(!env.AI){
  return Response.json({error:"Не настроена модель Cloudflare AI"},{status:503});
 }

 try{
  const body=await request.json();
  const prompt=String(body.prompt||"").trim();
  let width=Number(body.width);
  let height=Number(body.height);

  if(!prompt||prompt.length>MAX_PROMPT){
   return Response.json({error:"Проверь описание фона"},{status:400});
  }

  if(!Number.isInteger(width)||!Number.isInteger(height)||
     width<256||height<256||width>1920||height>1920){
   return Response.json({error:"Неверный размер изображения"},{status:400});
  }

  const form=new FormData();
  form.append("prompt",
   "Create a photorealistic background environment only. Do not include any people, persons, faces, bodies, silhouettes or human figures. The scene must be a clean background plate suitable for placing a real photographed person in front. User request: "+prompt
  );
  form.append("width",String(width));
  form.append("height",String(height));
  form.append("guidance","4");

  const serialized=new Response(form);
  const result=await env.AI.run(MODEL,{
   multipart:{
    body:serialized.body,
    contentType:serialized.headers.get("content-type")
   }
  });

  if(!result||typeof result.image!=="string"){
   throw new Error("FLUX не вернул изображение");
  }

  return Response.json({image:result.image});
 }catch(error){
  console.error("Background generation:",error);
  return Response.json({error:"Не удалось создать фон. Попробуй ещё раз."},{status:500});
 }
}

async function checkV4TestKey(request,env){
 const expected=env.V4_TEST_KEY;
 const supplied=request.headers.get("X-V4-Test-Key")||"";

 if(!expected){
  return Response.json({error:"Не настроен тестовый ключ V4_TEST_KEY в Cloudflare"},{status:503});
 }

 if(!supplied||supplied.length!==expected.length){
  return Response.json({error:"Неверный код доступа"},{status:401});
 }

 let difference=0;
 for(let i=0;i<expected.length;i++){
  difference|=expected.charCodeAt(i)^supplied.charCodeAt(i);
 }

 if(difference!==0){
  return Response.json({error:"Неверный код доступа"},{status:401});
 }

 return null;
}
async function checkTelegram(request,env){
 if(!env.BOT_TOKEN){
  return Response.json({error:"Не настроен BOT_TOKEN"},{status:503});
 }
 const initData=request.headers.get("X-Telegram-Init-Data");
 if(!await verifyTelegram(initData,env.BOT_TOKEN)){
  return Response.json({error:"Проверка Telegram не пройдена. Открой приложение заново."},{status:401});
 }
 return null;
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
   "raw",encoder.encode("WebAppData"),
   {name:"HMAC",hash:"SHA-256"},false,["sign"]
  );
  const secret=await crypto.subtle.sign("HMAC",secretKey,encoder.encode(botToken));
  const hmacKey=await crypto.subtle.importKey(
   "raw",secret,{name:"HMAC",hash:"SHA-256"},false,["sign"]
  );
  const signature=await crypto.subtle.sign("HMAC",hmacKey,encoder.encode(checkString));
  const calculated=[...new Uint8Array(signature)]
   .map(b=>b.toString(16).padStart(2,"0")).join("");

  if(calculated.length!==receivedHash.length)return false;
  let difference=0;
  for(let i=0;i<calculated.length;i++){
   difference|=calculated.charCodeAt(i)^receivedHash.toLowerCase().charCodeAt(i);
  }
  return difference===0;
 }catch{return false;}
}
