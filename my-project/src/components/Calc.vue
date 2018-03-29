<template>
<div>
<div v-if="episod == 'first'" class="main_content_wrapper centred_wrapper">
    <div class="plain_content_wrapper">
        <a class="container_4"></a>
        <h2>Выберите модель</h2>
        <ul class="bodycalc_model_list clearfix">
            <li v-for="(item, key, index) in items" :key="item.id" class="bodycalc_model_item"
                v-on:mouseover="mause=true" v-on:mouseout="mause=false">
                <div class="bodycalc_model_wrapper" v-on:click="shagTwo(item.id)">
                    <div class="bodycalc_model_block" :style="mause ? 'border-color: #05040e;':''">
                        <img class="bodycalc_model_list_img"
                             :src="'static' + item.img" alt="">
                        <span class="bodycalc_model_list_title">{{item.mark}}</span>
                        <div v-if="item.models != '' && mause">
                            <select class="" v-model="modelsel">
                              <option disabled selected value="">Выберите модель</option>
                              <option v-for="model in item.models" :value="model.id">{{model.model}}</option>
                            </select>
                         </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
    <transition name="fade">
            <div  v-if="episod == 'two'" class="main_content_wrapper centred_wrapper">
                <div>
                    <div v-on:click="episod = 'first'" style="color: blue">Назад</div>
                    <div>
                        <h3>RAPID</h3>
                    </div>
                    <div style="margin: auto;">
                        <h2>
                            Шаг 1. Выберите город и дилерский центр
                        </h2>
                        <div style="float: left;">
                            <label>Город</label>
                            <select style="width: 300px;" class="" v-model="modelsselect">
                                <option selected disabled value="">Выберите город</option>
                                <option v-for="city in cities" :value="city.id">{{city.name}}</option>
                            </select>
                        </div>
                        <div style="margin-left: 20px;">
                            <label>Дилер</label>
                            <select style="width: 300px;" class="" v-model="modelsselect2">
                                <option selected disabled value="">Выберите диллера</option>
                                <option v-for="dill in diller" :value="dill.id">{{dill.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <h2 >Шаг 2. Выберите необходимые детали</h2>
                        <div>
                            <transition name="fade">
                                <!--<img v-if="modelsselect2" :src="'static' + '/img/roomster.png'"/>-->
                                <div v-if="modelsselect2">
                                <!--<img  :src="'static' + '/svg/car_scheme_1-01.svg'" width="400px" style="text-align: right"/>-->
                                <!--<img  :src="'static' + '/svg/car_scheme_2-01.svg'" width="400px" style="text-align: left"/>-->

                                    <object type="image/svg+xml" data="static/svg/car_scheme_2-01.svg"  width="500px"></object>
                                    <!--<iframe src="static/svg/car_scheme_2-01.svg">Your browser does not support iframes</iframe>-->



                                </div>
                                <!--<img src="/static/svg/car_scheme_1-01.svg" alt="Breaking Borders Logo" height="65" width="68">-->
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
    </transition>
</div>
</template>

<script>
import items from '../components/lists/auto'
import cities from '../components/lists/city'
import diller from '../components/lists/diller'

export default {
  name: 'HelloWorld',
  data () {
    return {
      items: items,
      episod: 'first',
      mause: false,
      mauses: "style='border-color: #dc3545;'",
      modelsel: {},
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
    shagTwo(id) {
      // this.$router.push({path: `/item/${id}/`});
      this.episod='two';
    },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.main_content_wrapper {
    position: relative;
    z-index: 2;
}

.centred_wrapper {
    width: 900px;
    margin: 0 auto;
}

.plain_content_wrapper {
    background: #fff;
    padding: 22px 20px;
    min-height: 100px;
}

.container_4 {
    width: 916px;
    position: relative;
    margin-left: -4px;
    margin-right: -4px;
}

a {
    color: #4ba82e;
    cursor: pointer;
    text-decoration: none;
    outline: none !important;
}

.bodycalc_model_list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.bodycalc_model_list .bodycalc_model_item {
    float: left;
    width: 33.333335%;
    height: 250px;
    padding: 0 10px;
    margin-bottom: 5px;
    text-align: center;
    font-family: 'skodapro', sans-serif;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.bodycalc_model_wrapper {
    height: 100%;
}

.bodycalc_model_block {
    cursor: pointer;
}

.bodycalc_model_block {
    display: block;
    height: 100%;
    padding: 10px;
    border: 1px solid transparent;
    transition: .3s border, background ease;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.bodycalc_model_list_img {
    display: block;
    margin: 20px auto 15px;
    max-width: 100%;
}

.bodycalc_model_list_title {
    text-transform: uppercase;
    display: block;
    font-family: 'skodapro_bold', sans-serif;
    color: #4ba82e;
    font-size: 12px;
    margin-bottom: 5px;
}

select {
    width: 100%;
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

.svg_part:hover {
    fill: #4ba82e;
    fill-opacity: 0.2;
}

.active {
    fill: #398124!important;
    fill-opacity: 0.75!important;
}
.selected {
    fill: #4ba82e;
    fill-opacity: 0.3!important;
}
</style>
