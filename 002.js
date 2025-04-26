function imgshowin1() {
  let oldDiv = document.querySelector(".imgdiv");
  if (oldDiv) oldDiv.innerHTML = "";

  let imgdiv = document.createElement("div");
  imgdiv.className = "imgdiv1";
  document.body.appendChild(imgdiv);

  fetch('https://api.github.com/repos/Shamaali86055/PicAl/contents')
    .then(r => r.json())
    .then(d => {
      d.forEach(f => {
        if (f.name.endsWith(".jpg")) {
          let img = new Image();
          img.src = f.download_url;
          imgdiv.appendChild(img);
        }
      });
    });
}
imgshowin1();