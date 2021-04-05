var vm = new Vue({

    el: '#app',
    data: {
        showModal: false,
        attemptToFillName: false,
        attemptToFillPhone: false,
        attemptToFillWhatdo: false,
        attemptToFillSubject: false,
        message: 'message test',
        name: '',
        phone: '',
        what_do: '',
        subject: ''
    },
    computed: {
      showError() {
          return (this.name.length === 0 || this.what_do.length === 0 || this.subject.length > 0) && (this.attemptToFillName || this.attemptToFillPhone || this.attemptToFillWhatdo)
      }
    },
    methods: {
        get_data() {
            let mess = `<i>Имя:</i> ${this.name}%0AТелефон: ${this.phone}%0AЧто делаем: ${this.what_do}%0AЧто слушаем/анализируем: ${this.subject}`
            axios.get('https://api.telegram.org/bot1614392093:AAFrk6arbH9l2nnT8aNHRmgQBPEI5divFoA/sendMessage?chat_id=@analog_music&parse_mode=HTML&text='+mess)
                .then(function (response) {
                    console.log(response)
                })
                .finally(()=>{
                    this.showModal = true
                })
        },
        scroll() {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    }
})
