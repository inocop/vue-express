<template>
  <div class="columns">
    <div class="column is-4 is-offset-4">
<!--
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Room名</label>
        </div>

        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Room名">
            </div>
            <p class="help is-danger"></p>
          </div>
          <div class="field is-narrow">
            <p class="control">
                <a class="button is-info">登録</a>
            </p>
          </div>
        </div>
      </div>
 -->

      <form>
        <div class="field is-grouped">
          <p class="control" style="padding-top: 0.375em">
            <label class="label">Room名</label>
          </p>
          <p class="control is-expanded">
            <input class="input" type="text" placeholder="" v-model="name">
          </p>
          <p class="control">
            <button class="button is-primary" type="submit" @click="createRoom">登録</button>
          </p>
        </div>
        <p class="help is-danger is-marginless">{{ invalid_name }} &nbsp;</p>
      </form>

      <!-- 投稿フォーム -->
<!--
      <form>
        <div class="field">
          <label class="label">Room名</label>
          <div class="control">
            <input class="input" type="text" v-model="name" />
          </div>
        </div>

        <div class="field">
          <label class="label">投稿内容</label>
          <div class="control">
            <input class="input" type="text" v-model="message" />
          </div>
        </div>

        <button class="button is-primary" type="submit" @click="sendMessage">送信</button>
      </form>
-->

      <h2 style="margin-top: 1rem">Maru Batsu Rooms</h2>

      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Room名</th>
            <th>ステータス</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <!-- Room一覧の表示 -->
          <tr v-for="(room, index) in gameRooms" :key="index">
            <th>{{ room.name }}</th>
            <th>新規</th>
            <th><router-link :to="{name: 'marubatsu_play', params: { id: room.id }}">入室</router-link></th>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      gameRooms: [],
      name: '',
      invalid_name: '',
    }),
    methods: {
      createRoom(e) {
        e.preventDefault()

        if (!this.name) {
          this.invalid_name = "Room名を入力してください"
          return
        }

        // 新規Roomの登録リクエスト
        this.$socket.emit('CREATE_ROOM', { name: this.name });
        this.name = ''
        this.invalid_name = ''
      }
    },
    mounted(){
      // レシーバー登録
      this.$socket.on('CREATE_ROOM_RECEIVER', (error, room) => {
        if (!error){
          this.gameRooms = [...this.gameRooms, room]
        } else {
          this.invalid_name = error.message
        }
      })

      // Roomリストをリクエスト
      this.$socket.emit('GET_ROOMS', (error, gameRooms) => {
        if (!error) this.gameRooms = gameRooms
      })
    },
}
</script>

<style scoped>
</style>
