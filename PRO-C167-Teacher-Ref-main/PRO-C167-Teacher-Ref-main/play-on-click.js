AFRAME.registerComponent("play-on-click", {
  schema: {
    isPlaying: { type: "boolean", default: false }
  },

  init: function() {
    this.videoEl = this.el.getAttribute("material").src;
    this.onClick = this.onClick.bind(this);    
  },

  play: function() {
    window.addEventListener("click", this.onClick);
  },
  onClick: function(evt) {
    if (!this.videoEl) {
      return;
    }

    var isPlaying = this.el.getAttribute("play-on-click").isPlaying;

    this.el.object3D.visible = true;

    if (!isPlaying) {
      this.el.setAttribute("play-on-click", {
        isPlaying: true
      });
      this.videoEl.play();
    } else {
      this.el.setAttribute("play-on-click", {
        isPlaying: false
      });
      this.videoEl.pause();
    }
  }
});
