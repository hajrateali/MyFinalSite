function imgshowin() {
  let oldDiv = document.querySelector(".imgdiv1");
  if (oldDiv) oldDiv.innerHTML = "";

  let imgdiv = document.createElement("div");
  imgdiv.className = "imgdiv";
  document.body.appendChild(imgdiv);

  fetch('https://api.github.com/repos/Shamaali86055/Image/contents')
    .then(r => r.json())
    .then(d => {
      d.forEach(f => {
        if (f.name.endsWith(".jpg")) {
          let img = new Image();
          img.src = f.download_url;
          img.onclick = function() {toggleFullScreen(this)};
          imgdiv.appendChild(img);
        }
      });
    });
}
function toggleFullScreen(img) {
    if (!document.fullscreenElement) {
        if (img.requestFullscreen) {
            img.requestFullscreen();
        } else if (img.webkitRequestFullscreen) {
            img.webkitRequestFullscreen();
        } else if (img.msRequestFullscreen) {
            img.msRequestFullscreen();
        }
    } 
}
imgshowin();
