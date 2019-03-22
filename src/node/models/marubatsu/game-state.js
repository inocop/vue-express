module.exports = class GameState {

  constructor () {
    // 3x3の二次元配列を生成
    this.inputMap = []
    for (var y=0; y < 3; y++) {
      this.inputMap[y] = []
      for (var x=0; x < 3; x++) {
        this.inputMap[y][x] = ""
      }
    }

    this.allowValues = [ "maru", "batsu" ];
    this.state = "play" /* play, end, draw */
    this.stateMessage = ""
    this.winner = null
  }

  // 入力値を登録
  addInput({y, x, value = ""} = {}) {
    if ((y < 0 || 3 <= y) && (x < 0 || 3 <= x)) {
      console.log("3x3の範囲を指定してください。")
      return false
    }
    if (this.inputMap[y][x]) {
      console.log("既に入力済みの(y, x)を指定しています。")
      return false
    }
    if (!value || !this.allowValues.includes(value)) {
      console.log("maru、またはbatsu以外は入力できません。")
      return false
    }

    this.inputMap[y][x] = value;
    this.judgeState();
    return true
  }

  // 〇×ゲームの状態判定
  judgeState() {
    this._judgeHorizontal()
    this._judgeVertical()
    this._judgeDiagonal()

    if (this.state === "end") {
      return
    }

    // 未決着で空白が無ければ引き分け
    for (var y=0; y<this.inputMap.length; y++){
      for (var x=0; x<this.inputMap[y].length; x++){
        if (this.inputMap[y][x] === "") {
          this.state = "play";
          this.stateMessage = "プレイ継続";
          return
        }
      }
    }
    this.state = "draw";
    this.stateMessage = "引き分け";
  }

  /**
   * 横ラインの勝敗判定
   */
  _judgeHorizontal() {
    for (var y=0; y<this.inputMap.length; y++){

      var lineValue = []
      for (var x=0; x<this.inputMap[y].length; x++){
        lineValue.push(this.inputMap[y][x])
      }
      this._judgeWinner(lineValue)
    }
  }

  /**
   * 縦ラインの勝敗判定
   */
  _judgeVertical() {
    for (var x=0; x<this.inputMap[0].length; x++){

      var lineValue = []
      for (var y=0; y<this.inputMap[x].length; y++){
        lineValue.push(this.inputMap[y][x])
      }
      this._judgeWinner(lineValue)
    }
  }

  /**
   * 斜めラインの勝敗判定
   */
  _judgeDiagonal() {
    // 右下がり
    var lineValue = []
    for (var i=0; i<this.inputMap.length; i++) {
      lineValue.push(this.inputMap[i][i])
    }
    this._judgeWinner(lineValue)

    // 右上がり
    var lineValue = []
    for (var i=0; i<this.inputMap.length; i++){
      lineValue.push(this.inputMap[this.inputMap.length - (1 + i)][i])
    }
    this._judgeWinner(lineValue)
  }

  /**
   * 
   * @param {*} lineValue
   */
  _judgeWinner(lineValue = []) {
    if (this.state !== "play") return

    if (lineValue.length === lineValue.filter(value => value === "maru").length) {
      this.state = "end"
      this.stateMessage = "maruの勝ち";
      this.winner = "maru"
    }
    else if (lineValue.length === lineValue.filter(value => value === "batsu").length) {
      this.state = "end"
      this.stateMessage = "batsuの勝ち";
      this.winner = "batsu"
    }
  }
}