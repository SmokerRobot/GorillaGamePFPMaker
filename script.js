const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const circleBtn = document.getElementById("circle");
const filterBtn = document.getElementById("filter");
const downloadBtn = document.getElementById("download");

let img = new Image();
let filtered = false;

upload.addEventListener("change", e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

img.onload = () => {
  canvas.width = 300;
  canvas.height = 300;
  ctx.drawImage(img, 0, 0, 300, 300);
};

circleBtn.addEventListener("click", () => {
  const temp = document.createElement("canvas");
  temp.width = 300;
  temp.height = 300;
  const tctx = temp.getContext("2d");

  tctx.beginPath();
  tctx.arc(150, 150, 150, 0, Math.PI * 2);
  tctx.closePath();
  tctx.clip();
  tctx.drawImage(img, 0, 0, 300, 300);

  ctx.clearRect(0, 0, 300, 300);
  ctx.drawImage(temp, 0, 0);
});

filterBtn.addEventListener("click", () => {
  filtered = !filtered;
  ctx.filter = filtered ? "contrast(1.3) saturate(1.5)" : "none";
  ctx.drawImage(img, 0, 0, 300, 300);
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "pfp.png";
  link.href = canvas.toDataURL();
  link.click();
});
