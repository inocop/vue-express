<template>
<div>
  <p>{{id}}</p>
  <button class="button is-primary" type="button">〇</button>
  <button class="button is-primary" type="button">×</button>

  <!-- 〇× -->
  <table class="table is-fullwidth is-bordered">
    <tbody>
      <tr v-for="(row, index) in playdata" :key="index">
        <td @click="postInput(index, 0, $event)">{{ row[0] }}</td>
        <td @click="postInput(index, 1, $event)">{{ row[1] }}</td>
        <td @click="postInput(index, 2, $event)">{{ row[2] }}</td>
      </tr>
    </tbody>
  </table>

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
      postInput(y, x, event) {
        if (!event.target.innerText) {
          this.$socket.emit(this.$Const.SOCKET_INPUT_GAME, this.id, {y: y, x: x});
        }
      }
    },
     beforeRouteLeave (to, from, next) {
       this.$socket.off(this.$Const.SOCKET_CHANGE_GAME_STATE_EVENT)
       this.$socket.emit(this.$Const.SOCKET_LEAVE_GAME);
       next();
    },
    mounted(){
      // レシーバー登録
      this.$socket.on(this.$Const.SOCKET_CHANGE_GAME_STATE_EVENT, (playdata) => {
        this.playdata = JSON.parse(playdata)
        console.log(playdata)
      })

      this.$socket.emit(this.$Const.SOCKET_ENTRY_GAME, this.id, (error, playdata) => {
        if (!error) {
          this.playdata = JSON.parse(playdata)
        }else{
          console.log(error.message)
        }
        console.log(this.playdata)
      })
    }
  }
</script>