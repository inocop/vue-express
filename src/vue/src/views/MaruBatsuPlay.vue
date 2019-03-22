<template>
<div>

  <p>{{id}}</p>
  <button class="button is-primary" type="button" @click="postMaru">〇</button>
  <button class="button is-primary" type="button" @click="postBatsu">×</button>


  <!-- 〇× -->
  <div v-for="row in playdata" :key="row.id">
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
      postMaru(e) {
        this.$socket.emit('POST_ROOM_DETAIL', this.id, {y: 0, x: 0, value: "maru"});
      },
      postBatsu(e){
        this.$socket.emit('POST_ROOM_DETAIL', this.id, {y: 1, x: 1, value: "batsu"});
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