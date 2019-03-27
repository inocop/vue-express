module.exports = class MarubatsuConst {
  /** socket.io用定数 */

  /**
   * ルーム作成
   */
  static get SOCKET_CREATE_ROOM() {
    return "CREATE_ROOM"
  }
  /**
   * ルーム作成通知
   */
  static get SOCKET_CREATE_ROOM_RECEIVER() {
    return "CREATE_ROOM_RECEIVER"
  }
  /**
   * ルーム一覧取得
   */
  static get SOCKET_GET_ROOMS() {
    return "GET_ROOMS"
  }
  /**
   * ルーム入室
   */
  static get SOCKET_GET_ROOM_DETAIL() {
    return "GET_ROOM_DETAIL"
  }
  /**
   * マルバツ送信
   */
  static get SOCKET_POST_ROOM_DETAIL() {
    return "POST_ROOM_DETAIL"
  }
  /**
   * マルバツ送信通知
   */
  static get SOCKET_POST_ROOM_DETAIL_RECEIVER() {
    return "POST_ROOM_DETAIL_RECEIVER"
  }
  /**
   * マルバツルーム退出
   */
  static get SOCKET_LEAVE_PLAY_ROOM() {
    return "LEAVE_PLAY_ROOM"
  }
}
