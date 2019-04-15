<template>
<div>
  <p>{{id}}</p>
  <button class="button is-primary" type="button">〇</button>
  <button class="button is-primary" type="button">×</button>

  <!-- 〇× -->
  <table class="table is-fullwidth is-bordered" style="table-layout: fixed;">
    <tbody>
      <tr v-for="(row, index) in playdata" :key="index">
        <td style="height:50px" @click="postInput(index, 0, $event)">{{ row[0] }}</td>
        <td style="height:50px" @click="postInput(index, 1, $event)">{{ row[1] }}</td>
        <td style="height:50px" @click="postInput(index, 2, $event)">{{ row[2] }}</td>
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
          this.$socket.emit(this.$GameConst.SOCKET_INPUT_GAME, this.id, {y: y, x: x});
        }
      }
    },
     beforeRouteLeave (to, from, next) {
       this.$socket.off(this.$GameConst.SOCKET_CHANGE_GAME_NOTIFY)
       this.$socket.emit(this.$GameConst.SOCKET_LEAVE_GAME);
       next();
    },
    mounted(){
      // レシーバー登録
      this.$socket.on(this.$GameConst.SOCKET_CHANGE_GAME_NOTIFY, (notify, playdata) => {
        if (notify.type === this.$NotifyConst.NOTIFY_CREATED) {
          this.playdata = JSON.parse(playdata)
          console.log(playdata)
        }
        else if (notify.type === this.$NotifyConst.NOTIFY_UPDATED) {
          this.playdata = JSON.parse(playdata)

          setTimeout(() => {
            // ゲーム終了
            alert(notify.message);
            this.$router.push({ path: '/marubatsu' });
          }, 500)
        }
      })

      this.$socket.emit(this.$GameConst.SOCKET_ENTRY_GAME, this.id, (error, playdata) => {
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