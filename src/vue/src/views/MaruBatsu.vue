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

      <!-- チャットの表示 -->
      <div v-for="(row, index) in rooms" :key="index">
        <router-link to="/marubatsu/1">{{ row.name }}</router-link>
      </div>

    </div>
  </div>
</template>

<script>
  import io from 'socket.io-client';
 
  export default {
    name: 'Index',
    data: () => ({
      rooms: [],
      name: '',
      invalid_name: '',
      socket : io('localhost:8989/marubatsu/'),
    }),
    methods: {
      createRoom(e) {
        e.preventDefault();
        if (!this.name) {
          this.invalid_name = "Room名を入力してください"
          return
        }

        // 新規Roomの登録リクエスト
        this.socket.emit('CREATE_ROOM', {
          name: this.name,
        });
        this.name = ''
        this.invalid_name = ''
      }
    },
    mounted(){
      // CREATE_ROOMのレシーバー
      this.socket.on('CREATED', (room) => {
        this.rooms = [...this.rooms, room];
      })
      // GET_ROOMSのレシーバー
      this.socket.on('MESSAGE', (rooms) => {
        this.rooms = rooms;
      })

      // Roomリストをリクエスト
      this.socket.emit('GET_ROOMS')
    },
}
</script>
 
<style scoped>
</style>
