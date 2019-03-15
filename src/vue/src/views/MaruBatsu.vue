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

      <div class="field is-grouped">
        <div class="control" style="padding-top: 0.375em">
          <label class="label">Room名</label>
        </div>
        <p class="control is-expanded">
          <input class="input" type="text" placeholder="" v-model="message">
        </p>
        <p class="control">
          <a class="button is-primary" @click="sendMessage">登録</a>
        </p>
      </div>


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

      <h2 style="margin-top: 2rem">Maru Batsu Rooms</h2>

      <!-- チャットの表示 -->
      <div v-for="(row, index) in messages" :key="index">
        <router-link to="/marubatsu/1">{{ row.message }}</router-link>
      </div>

    </div>
  </div>
</template>

<script>
  import io from 'socket.io-client';
 
  export default {
    name: 'Index',
    data: () => ({
      name: '',
      message: '',
      messages: [],
      socket : io('localhost:8989/marubatsu/'),
    }),
    methods: {
      // チャットを投稿する処理
      sendMessage(e) {
        e.preventDefault();
        this.socket.emit('POST_MESSAGE', {
            name: this.name,
            message: this.message
        });
        this.message = ''
      },
    },
    mounted(){
      // 投稿されたデータの取得
      this.socket.on('MESSAGE', (data) => {
        console.log(data);
        this.messages = [...this.messages, data];
      })
    },
}
</script>
 
<style scoped>
</style>
