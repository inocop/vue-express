<template>
<div>

  <p>{{id}}</p>
  <button class="button is-primary" type="button" @click="postMaru">〇</button>
  <button class="button is-primary" type="button" @click="postBatsu">×</button>

  <table class="table is-fullwidth is-bordered">
    <tbody>
      <tr>
        <td @click="postMaru(0, 0, $event)">&nbsp;</td>
        <td @click="postMaru(0, 1, $event)">&nbsp;</td>
        <td @click="postMaru(0, 2, $event)">&nbsp;</td>
      </tr>
      <tr>
        <td @click="postMaru(1, 0, $event)">&nbsp;</td>
        <td @click="postMaru(1, 1, $event)">&nbsp;</td>
        <td @click="postMaru(1, 2, $event)">&nbsp;</td>
      </tr>
      <tr>
        <td @click="postMaru(2, 0, $event)">&nbsp;</td>
        <td @click="postMaru(2, 1, $event)">&nbsp;</td>
        <td @click="postMaru(2, 2, $event)">&nbsp;</td>
      </tr>
    </tbody>
  </table>

  <!-- 〇× -->
  <div v-for="(row, index) in playdata" :key="index">
    {{ row }}
  </div>
</div>
</template>


<script>
  export default {
    props: {
      id: Number
    },
    data: () => ({
      playdata: [],
    }),
    methods: {
      postMaru(y, x, event) {
        event.target.innerText = "maru"
        this.$socket.emit('POST_ROOM_DETAIL', this.id, {y: y, x: x, value: "maru"});
      },
      postBatsu(y, x){
        this.$socket.emit('POST_ROOM_DETAIL', this.id, {y: y, x: x, value: "batsu"});
      }
    },
     beforeRouteLeave (to, from, next) {
       this.$socket.off('POST_ROOM_DETAIL_RECEIVER')
       this.$socket.emit('LEAVE_PLAY_ROOM');
       next();
    },
    mounted(){
      // レシーバー登録
      this.$socket.on('POST_ROOM_DETAIL_RECEIVER', (playdata) => {
        this.playdata = [...this.playdata, playdata]
        console.log(playdata)
      })

      this.$socket.emit('GET_ROOM_DETAIL', this.id, (error, playdata) => {
        if (!error) {
          this.playdata = playdata;
        }else{
          console.log(error.message)
        }

        console.log(this.playdata)
      })
    }
  }
</script>