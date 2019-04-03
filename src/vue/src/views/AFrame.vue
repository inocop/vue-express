<template>
  <a-scene>
    <a-assets>
      <img src="/static/images/tile.png" id="square">
      <img src="/static/images/maru.png" id="circle">
      <img src="/static/images/batsu.png" id="cross">
    </a-assets>

    <a-camera position="0 1.6 -4" rotation="0 180 0" id="player1">
      <a-cursor fuse=true fuse-timeout=1000></a-cursor>
      <a-box color="#998877"></a-box>
      <a-text position="0 1 0" scale="3 3 0" rotation="0 0 0" value="Player1" color="black"></a-text>
    </a-camera>

    <a-camera position="0 1.6 4" id="player2">
      <a-cursor fuse=true fuse-timeout=1000></a-cursor>
      <a-cylinder color="#114499" ></a-cylinder>
      <a-text position="0 1 0" scale="3 3 0" rotation="0 180 0" value="Player2" color="black"></a-text>
    </a-camera>

    <a-entity id="square">
      <a-plane id="square0" @click="postInput(0, 0, $event)" src="#square" position="-1 0 -1" rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square1" @click="postInput(0, 1, $event)" src="#square" position="-1 0 0" rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square2" @click="postInput(0, 2, $event)" src="#square" position="-1 0 1" rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square3" @click="postInput(1, 0, $event)" src="#square" position="0 0 -1" rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square4" @click="postInput(1, 1, $event)" src="#square" position="0 0 0" rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square5" @click="postInput(1, 2, $event)" src="#square" position="0 0 1" rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square6" @click="postInput(2, 0, $event)" src="#square" position="1 0 -1" rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square7" @click="postInput(2, 1, $event)" src="#square" position="1 0 0" rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square8" @click="postInput(2, 2, $event)" src="#square" position="1 0 1" rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
    </a-entity>

    <a-sky color="#ECECEC"></a-sky>
  </a-scene>
</template>

<script>
import 'aframe';

export default {
  data: () => ({
  }),
  methods: {
    postInput(y, x, event) {
      event.target.setAttribute("src", "#circle")
    },
  },
  mounted(){
  }
}
</script>