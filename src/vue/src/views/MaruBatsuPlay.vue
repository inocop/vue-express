<template>
<div>

  <p>{{id}}</p>
  <button class="button is-primary" type="button" @click="postMaru">〇</button>
  <button class="button is-primary" type="button" @click="postBatsu">×</button>


  <!-- 〇× -->
  <div v-for="row in room_details" :key="row.id">
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
      room_details: [],
    }),
    methods: {
      postMaru(e) {
        this.$socket.emit('POST_ROOM_DETAIL', this.id, "maru");
      },
      postBatsu(e){
        this.$socket.emit('POST_ROOM_DETAIL', this.id, "batsu");
      }
    },
    beforeRouteLeave (to, from, next) {
      console.log("LEAVE_ROOM : " + this.id)
      this.$socket.emit('LEAVE_ROOM', this.id);
      next();
    },
    mounted(){
      // レシーバー登録
      this.$socket.on('POST_ROOM_DETAIL_RECEIVER', (room_detail) => {
        this.room_details = [...this.room_details, room_detail]
        console.log(this.room_details)
      })

      this.$socket.emit('GET_ROOM_DETAIL', this.id, (error, room_details) => {
        if (!error) this.room_details = room_details;
        console.log(this.room_details)
      })
    }
  }
</script>