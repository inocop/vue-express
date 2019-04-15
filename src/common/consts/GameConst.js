module.exports = class GameConst {
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
  static get SOCKET_CHANGE_ROOMS_NOTIFY() {
    return "SOCKET_CHANGE_ROOMS_NOTIFY"
  }
  /** マルバツの状態変更通知 */
  static get SOCKET_CHANGE_GAME_NOTIFY() {
    return "SOCKET_CHANGE_GAME_NOTIFY"
  }


  /**
   *  Gameステータス
   */
  static get STATE_STANDBY() {
    return "STATE_STANDBY"
  }
  static get STATE_PLAYING() {
    return "STATE_PLAYING"
  }
  static get STATE_WIN_MARU() {
    return "STATE_WIN_MARU"
  }
  static get STATE_WIN_BATSU() {
    return "STATE_WIN_BATSU"
  }
  static get STATE_DRAW() {
    return "STATE_DRAW"
  }

  static STATE_END(state) {
    return (state === this.STATE_WIN_MARU || state === this.STATE_WIN_BATSU || state === this.STATE_DRAW)
  }
}
