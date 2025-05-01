function imageZoom(imgID, resultID) {
    const img = document.getElementById(imgID);
    const result = document.getElementById(resultID);
    const wrapper = document.getElementById("image-wrapper");

    const lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    wrapper.appendChild(lens);

    function updateZoomRatio() {
      const cx = result.offsetWidth / lens.offsetWidth;
      const cy = result.offsetHeight / lens.offsetHeight;

      result.style.backgroundImage = "url('" + img.src + "')";
      result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

      function moveLens(e) {
        e.preventDefault();
        const pos = getCursorPos(e);
        let x = pos.x - lens.offsetWidth / 2;
        let y = pos.y - lens.offsetHeight / 2;

        if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
        if (x < 0) x = 0;
        if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
        if (y < 0) y = 0;

        lens.style.left = x + "px";
        lens.style.top = y + "px";

        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
      }

      img.addEventListener("pointermove", moveLens);
    }

    function getCursorPos(e) {
      const a = img.getBoundingClientRect();
      const x = e.pageX - a.left - window.pageXOffset;
      const y = e.pageY - a.top - window.pageYOffset;
      return { x, y };
    }

    wrapper.addEventListener("pointerenter", () => {
      lens.style.display = "block";
      result.style.display = "block";
      updateZoomRatio();
    });

    wrapper.addEventListener("pointerleave", () => {
      lens.style.display = "none";
      result.style.display = "none";
    });
  }

  window.onload = () => {
    imageZoom("myimage", "myresult");
  };