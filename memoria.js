const memoria = new Vue({
    el: '#memoria',
    data() {
        return {
            msg: 'Juego de memoria',
            baseList: [
                './assets/black_sheep.png',
                './assets/black_sheep.png',
                './assets/cat.png',
                './assets/cat.png',
                './assets/chiken.png',
                './assets/chiken.png',
                './assets/cow.png',
                './assets/cow.png',
                './assets/hippo.png',
                './assets/hippo.png',
                './assets/penguin.png',
                './assets/penguin.png',
                './assets/sheeep.png',
                './assets/sheeep.png',
                './assets/pig.png',
                './assets/pig.png',
            ],
            gameList: [],
            tryA: 0,
            tryB: 0,
            acierto: false,
            fallos: 0,
            final: false
        }
    },
    created() {
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.acierto=false;
            this.fallos=0;
            this.final=false;
            this.gameList = [...this.arrayShuffle(this.baseList)];
            this.gameList.map((e, i) => {
                this.gameList[i] = {
                    valor: e,
                    visible: true
                }
            })
            setTimeout(this.ocultaTodo, 3000)
            this.refreshList()
        },
        arrayShuffle(arr) {
            return arr.sort(() => Math.random() - 0.5)
        },
        tirada(index) {
            if (!this.tryB) {
                if (!this.tryA) {
                    this.tryA = index + 1;  //avoid value of 0
                    this.ver(index, true);
                } else {
                    this.tryB = index + 1;  //avoid value of 0
                    this.ver(index, true);
                    this.compare(this.tryA - 1, this.tryB - 1);
                }
            }
        },
        ver(i, visible) {
            this.gameList[i].visible = visible;
            this.gameList = [...this.gameList]
        },
        compare(i, j) {
            if (this.gameList[i].valor !== this.gameList[j].valor) {
                setTimeout(this.oculta, 1000)
                this.fallos++;
                this.acierto = false
            } else {
                this.acierto = true;
                this.terminado()
                this.refreshList()
                this.tryA = 0;
                this.tryB = 0;
            }
        },
        refreshList() {
            this.gameList = [...this.gameList];
        },
        oculta() {
            this.gameList[this.tryA - 1].visible = false;
            this.gameList[this.tryB - 1].visible = false;
            this.tryA = 0;
            this.tryB = 0;
        },
        terminado() {
            this.gameList.map((e, i) => console.log('gameList visible', i, e.visible))
            this.final = this.gameList.reduce((acc, act) => {
                return act.visible && acc
            }, true)
        },
        ocultaTodo() {
            this.gameList.map(e => {
                e.visible = false
            }
            )
        }
    }
})