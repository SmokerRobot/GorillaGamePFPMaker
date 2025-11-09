const canvas = document.getElementById("avatar");
const ctx = canvas.getContext("2d");
const downloadBtn = document.getElementById("download");

const parts = {
  base: ["assets/base/base1.png", "assets/base/base2.png"],
  hair: ["assets/hair/hair1.png", "assets/hair/hair2.png", "assets/hair/hair3.png"],
  eyes: ["assets/eyes/eyes1.png", "assets/eyes/eyes2.png"],
  clothes: ["assets/clothes/shirt1.png", "assets/clothes/shirt2.png"]
};

const indices = { base: 0, hair: 0, eyes: 0, clothes: 0 };

function drawCharacter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let part in parts) {
    const img = new Image();
    img.src = parts[part][indices[part]];
    img.onload = () => ctx.drawImage(img, 0, 0, 300, 300);
  }
}

function changePart(part, direction) {
  indices[part] = (indices[part] + direction + parts[part].length) % parts[part].length;
  drawCharacter();
}

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "character.png";
  link.href = canvas.toDataURL();
  link.click();
});

drawCharacter();
