const app = Vue.createApp({
  data: () => ({
    items: null, //APIで取得した検索結果を保管する
    keyword: '', //ユーザーが入力したキーワードを保管する
    message: '', //ユーザーに表示するメッセージ
    aaa: '',
  }),

  watch: {
    keyword: function (newKeyword, oldKeyword) {
      console.log(newKeyword)
      this.message = '入力中・・・'
      this.debouncedGetAnswer()
    }
  },

  mounted: function () {
    //lodash
    //_.debouncedは、lodashの関数で、一定の秒数後にイベントが実行される指定を設定
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1500)
  },

  methods: {
    getAnswer: function () {

      // キーワードが空だったら、itemsをnullにして処理をスキップする
      if (this.keyword === '') {
        console.log('karamoji')
        this.items = null
        return
      }

      //ユーザーが検索キーワードを入力している場合は、、
      this.message = 'Lading...'
      const vm = this

      //page:1はページ1ページ目を取得
      //per_page:20は、1ページ辺りの件数を指定
      //queryには、検索キーワードをセットする
      const params = {
        page: 1,
        per_page: 10,
        query: this.keyword
      }

      // axiosの設定
      axios.get('https://qiita.com/api/v2/items', {
          params
        })
        .then(function (response) {
          console.log(response) //検索取得したデータはresponeseに入ってくる
          vm.items = response.data //取得したresponeseデータをitemsに保管する
        })
        .catch(function (error) { //例外処理(エラーが発生した時)の指定
          vm.message = 'Error!' + error
        })
        .finally(function () { //全ての処理が終わったらmessageを空にする
          vm.message = ''
        })
    }
  }
})
app.mount('#app')