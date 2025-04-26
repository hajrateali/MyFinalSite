let body = document.querySelector("body");
let slide = document.querySelector(".slide");
let left = document.querySelector(".left");
left.addEventListener('click', function(e) {
  e.stopPropagation();
  slide.classList.toggle("active");
})
body.addEventListener('click', function(e) {
  slide.classList.remove("active");
})

function imgshow() {
  window.location.href = "index 1.html";
}
function imgshow1() {
  window.location.href = "index 2.html";
}
//------------------------------------//

function imgshow2() {
  const thumbs = document.getElementById("thumbs");
  thumbs.innerHTML = "";

  fetch('https://api.github.com/repos/Shamaali86055/Videos/contents')
    .then(r => r.json())
    .then(d => {
      d.forEach(f => {
        if (f.name.endsWith(".mp4")) {
          let video = document.createElement("video");
          video.src = f.download_url;
          video.crossOrigin = "anonymous";
          video.muted = true;
          video.playsInline = true;
          video.load();

          video.addEventListener('loadeddata', () => {
            video.currentTime = 1;
          });

          video.addEventListener('seeked', () => {
            let canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            let thumbnailUrl = canvas.toDataURL("image/jpeg");

            // --- Container bana rahe hain ek item ka
            let container = document.createElement("div");
            container.style.width = "100%";
            container.style.maxWidth = "100%";
            container.style.margin = "auto";
            container.style.marginBottom = "20px";
            container.style.cursor = "pointer";

            let img = document.createElement("img");
            img.src = thumbnailUrl;
            img.style.width = "100%";

            img.onclick = () => {
              window.location.href = `video.html?url=${encodeURIComponent(f.download_url)}`;
            };

            // --- Title text
            let title = document.createElement("div");
            title.textContent = f.name.replace(".mp4", ""); // .mp4 hata diya
            title.style.fontSize = "16px";
            title.style.fontWeight = "bold";
            title.style.textAlign = "left"; 
            title.style.whiteSpace = "nowrap";
            title.style.overflow = "hidden";
            title.style.textOverflow = "ellipsis";

            container.appendChild(img);
            container.appendChild(title);
            thumbs.appendChild(container);

            video.remove();
            canvas.remove();
          });
        }
      });
    });
}