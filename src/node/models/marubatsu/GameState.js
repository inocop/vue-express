const INPUT_MARU   = "maru"
const INPUT_BATSU  = "batsu"
const INPUT_VALUES = [ INPUT_MARU, INPUT_BATSU ]

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

    this.gameEnd = false
    this.message = null
    this.winner  = null
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
    if (!value || !INPUT_VALUES.includes(value)) {
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

    if (this.gameEnd) {
      console.log(this.message)
      return
    }

    // 未決着で空白が無ければ引き分け
    for (var y=0; y<this.inputMap.length; y++){
      for (var x=0; x<this.inputMap[y].length; x++){
        if (this.inputMap[y][x] === "") {
          this.gameEnd = false
          this.message = "プレイ継続"
          return
        }
      }
    }
    this.gameEnd = true;
    this.message = "引き分け";
    console.log(this.message)
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
    if (this.gameEnd) return

    if (lineValue.length === lineValue.filter(value => value === INPUT_MARU).length) {
      this.gameEnd = true
      this.message = "maruの勝ち"
      this.winner = INPUT_MARU
    }
    else if (lineValue.length === lineValue.filter(value => value === INPUT_BATSU).length) {
      this.gameEnd = true
      this.message = "batsuの勝ち"
      this.winner = INPUT_BATSU
    }
  }
}