<template>
    <div class="main_content_wrapper centred_wrapper">
        <div>
            <div>
                <h3>RAPID</h3>
            </div>
            <div style="margin: auto;">
                <h2>
                    Шаг 1. Выберите город и дилерский центр
                </h2>
                <div style="float: left; width: 300px;">
                    <label>Город</label>
                    <select class="" v-model="modelsselect">
                        <option selected disabled value="">Выберите город</option>
                        <option v-for="city in cities" :value="city.id">{{city.name}}</option>
                    </select>
                </div>
                <div style="margin-left: 20px;width: 540px;">
                    <label>Дилер</label>
                    <select class="" v-model="modelsselect2">
                        <option selected disabled value="">Выберите диллера</option>
                        <option v-for="dill in diller" :value="dill.id">{{dill.name}}</option>
                    </select>
                </div>
            </div>
            <div>
                <h2 >Шаг 2. Выберите необходимые детали</h2>
                    <div>
                        <transition name="fade">
                            <img v-if="modelsselect2" :src="'static' + '/img/roomster.png'"/>
                        </transition>
                    </div>
            </div>
            <div>
                <div>
                    <div>Калькуляция</div>
                    <div>Сбросить все</div>
                    <div class="bodycalc_disclaimer">
                        Калькулятор расчёта стоимости работ носит ознакомительный характер и позволяет рассчитать
                        предварительную стоимость предстоящего кузовного ремонта. Точную стоимость Вы сможете получить
                        только после проведения оценки в выбранном дилерском центре.
                    </div>
                </div>

                <div id="bodycalc_form_wrapper" class="bodycalc_form">
                    <div class="upload_bodycalc_form">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import cities from '../components/lists/city'
  import diller from '../components/lists/diller'

  export default {
    name: "select-market",
    data() {
      return {
        cities: cities,
        diller: diller,
        modelsselect: '',
        modelsselect2: '',
      }
    },
    created: function () {
      // this.getCity(); // import cities from '../components/lists/city'
    },
    // watch: {
    // modelsselect: function (newQuestion, oldQuestion) {
    // this.getDiller(this.modelsselect) // import diller from '../components/lists/diller'
    // },
    // },
    methods: {
      getDiller: function (id) {
        let uri = `/api/diller/${id}/`;
        this.axios.get(uri).then((response) => {
          this.diller = response.data;
        });
      },
      getCity: function () {
        let uri = `/api/cities/`;
        this.axios.get(uri).then((response) => {
          this.cities = response.data;
        });
      }
    }
  }
</script>

<style scoped>
    select {
        width: 200px;
        height: 100%;
        cursor: pointer;
        text-align: center;
        padding: 7px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>