<template>
  <a-scene>
    <a-assets>
      <img src="/static/images/tile.png" id="square">
      <img src="/static/images/maru.png" id="circle">
      <img src="/static/images/batsu.png" id="cross">
      <img src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg" id="city">
    </a-assets>

    <a-camera
       id="player1"
       wasd-controls-enabled="false"
      :camera="player1.camera"
      :look-controls="player1.lookControls"
      :position="player1.position"
      :rotation="player1.rotation">
      <a-cursor fuse=false fuse-timeout=1000></a-cursor>
      <a-box color="#998877"></a-box>
      <a-text position="1 1 0" rotation="0 180 0" scale="3 3 0" value="Player1" color="black"></a-text>
    </a-camera>

    <a-camera
      id="player2"
      wasd-controls-enabled="false"
      :camera="player2.camera"
      :look-controls="player2.lookControls"
      :position="player2.position"
      :rotation="player2.rotation">
      <a-cursor fuse=false fuse-timeout=1000></a-cursor>
      <a-cylinder color="#114499"></a-cylinder>
      <a-text position="1 1 0" rotation="0 180 0" scale="3 3 0" value="Player2" color="black"></a-text>
    </a-camera>

    <a-entity id="square">
      <a-plane id="square0" @click="postInput(0, 0, $event)" src="#square" position="-1 0 -1" rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square1" @click="postInput(0, 1, $event)" src="#square" position="-1 0 0"  rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square2" @click="postInput(0, 2, $event)" src="#square" position="-1 0 1"  rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square3" @click="postInput(1, 0, $event)" src="#square" position="0 0 -1"  rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square4" @click="postInput(1, 1, $event)" src="#square" position="0 0 0"   rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square5" @click="postInput(1, 2, $event)" src="#square" position="0 0 1"   rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square6" @click="postInput(2, 0, $event)" src="#square" position="1 0 -1"  rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square7" @click="postInput(2, 1, $event)" src="#square" position="1 0 0"   rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
      <a-plane id="square8" @click="postInput(2, 2, $event)" src="#square" position="1 0 1"   rotation="-90 0 0" width="1" height="1" color="#EEEEEE"></a-plane>
    </a-entity>

    <a-sky color="#ECECEC" src="#city"></a-sky>
  </a-scene>
</template>

<script>
import 'aframe';

export default {
  data: () => ({
    player1: { camera: { active: false },
               lookControls: { enabled: false },
               position: {x: 0,   y: 1.5, z: -4},
               rotation: {x: -20, y: 180, z: 0},
             },
    player2: { camera: { active: false },
               lookControls: { enabled: false },
               rotation: {x: -20, y: 0,   z: 0},
               position: {x: 0,   y: 1.5, z: 4},
               rotation: {x: -20, y: 0,   z: 0},
             },
  }),
  methods: {
    postInput(y, x, event) {
      event.target.setAttribute("src", "#circle")
    },
  },
  mounted() {
    const targetCamera = this.player2
    this.$set(targetCamera, "camera", {active: true})
    this.$set(targetCamera, "lookControls", {enabled: true})
  },
}
</script>