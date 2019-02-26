<template>
  <div>
    <h2>Maru Batsu Rooms</h2>

    <div class="columns">
      <div class="column is-8 is-offset-2">
        <!-- 投稿フォーム -->
        <form>
          <div class="field">
            <label class="label">名前</label>
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
      </div>
    </div>

    <!-- チャットの表示 -->
    <div v-for="(row,index) in messages" :key="index">{{ row.name }}: {{ row.message }}</div>
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
