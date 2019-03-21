module.exports = class GameState {

  constructor () {
    // 3x3の二次元配列を生成
    for (var y=0; y < 3; y++) {
      for (var x=0; x < 3; x++) {
        this.inputMap[y][x] = ""
      }
    }

    this.allowValues = [ "maru", "batsu" ];
    this.state = "play" /* play, end, draw */
    this.stateMessage = ""
  }

  // 入力値を登録
  addInput({y, x, value = ""} = {}) {
    if ((y < 0 || 3 < y) && (x < 0 || 3 < x)) {
      //throw new ArgumentOutOfRangeException("positionは0から8の間を指定してください。");
      return
    }
    if (!this.inputMap[y][x]) {
      //throw new ArgumentException("既に入力済みのpositionを指定しています。");
      return
    }

    if (!value || !this.allowValues.includes(value)) {
      //throw new ArgumentException("maru、またはbatsu以外は入力できません。");
      return
    }

    this.inputMap[y][x] = value;
    judgeState();
  }

  // 〇×ゲームの状態判定
  judgeState() {
    _judgeHorizontal()
    _judgeVertical()
    _judgeDiagonal()

    if (this.state === "end") {
      return
    }

    // 未決着で空白が無ければ引き分け
    if (this.inputMap.Count(p => p.Value == "") == 0) {
      // this.state = "draw";
      // this.stateMessage = "引き分け";
    }
    else {
      // this.state = "play";
      // this.stateMessage = "プレイ継続";
    }
  }

  /**
   * 横ラインの勝敗判定
   */
  _judgeHorizontal() {
    for (y=0; y<this.inputMap.length; y++){

      var lineValue = []
      for (x=0; x<this.inputMap[y].length; x++){
        lineValue.push(this.inputMap[y][x])
      }
      _judgeWinner(lineValue)
    }
  }

  /**
   * 縦ラインの勝敗判定
   */
  _judgeVertical() {
    for (x=0; x<this.inputMap[0].length; x++){

      var lineValue = []
      for (y=0; y<this.inputMap[x].length; y++){
        lineValue.push(this.inputMap[y][x])
      }
      _judgeWinner(lineValue)
    }
  }

  /**
   * 斜めラインの勝敗判定
   */
  _judgeDiagonal() {
    // 右下がり
    var lineValue = []
    for (i=0; i<this.inputMap.length; i++) {
      lineValue.push(this.inputMap[i][i])
    }
    _judgeWinner(lineValue)

    // 右上がり
    var lineValue = []
    for (i=0; i<this.inputMap.length; i++){
      lineValue.push(this.inputMap[this.inputMap.length - i][i])
    }
    _judgeWinner(lineValue)
  }

  /**
   * 
   * @param {*} lineValue
   */
  _judgeWinner(lineValue = []) {
    if (this.state !== "play") return
  }
}