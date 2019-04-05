module.exports = class MarubatsuConst {
  /**
   * Client -> Server用socket.io定数
   */

  /** ルーム作成 */
  static get SOCKET_CREATE_ROOM() {
    return "SOCKET_CREATE_ROOM"
  }
  /** ルーム一覧取得 */
  static get SOCKET_GET_ROOMS() {
    return "SOCKET_GET_ROOMS"
  }
  /** マルバツゲーム入室 */
  static get SOCKET_ENTRY_GAME() {
    return "SOCKET_ENTRY_GAME"
  }
  /** マルバツの入力送信 */
  static get SOCKET_INPUT_GAME() {
    return "SOCKET_INPUT_GAME"
  }
  /** マルバツ退出 */
  static get SOCKET_LEAVE_GAME() {
    return "SOCKET_LEAVE_GAME"
  }


  /**
   * Server -> Client用socket.io定数
   */

  /** ルーム一覧変更通知 */
  static get SOCKET_CHANGE_ROOMS_EVENT() {
    return "SOCKET_CHANGE_ROOMS_EVENT"
  }
  /** マルバツの状態変更通知 */
  static get SOCKET_CHANGE_GAME_EVENT() {
    return "SOCKET_CHANGE_GAME_EVENT"
  }

  /** イベント種別 */
  static get EVENT_CREATED() {
    return "created"
  }
  static get EVENT_UPDATED() {
    return "updated"
  }
  static get EVENT_DELETED() {
    return "deleted"
  }

  /**
   *  Gameステータス
   */
  static get STATE_STANDBY() {
    return "standby"
  }
  static get STATE_PLAYING() {
    return "playing"
  }
  static get STATE_WIN_MARU() {
    return "win_maru"
  }
  static get STATE_WIN_BATSU() {
    return "win_batsu"
  }
  static get STATE_DRAW() {
    return "draw"
  }

  static STATE_END(state) {
    return (state === this.STATE_WIN_MARU || state === this.STATE_WIN_BATSU || state === this.STATE_DRAW)
  }
}
