<template>
  <div>
    <div class="main_content_wrapper centred_wrapper">
      <router-link style="color: blue; text-align:left" to="/">Назад</router-link>
      <div>
        <div>
          <h3 style="text-transform: uppercase; margin-bottom: 10px">{{$route.params.names}}</h3>
        </div>
        <div class="col" style="margin: auto; margin-bottom: 20px">
          <h2>
            Шаг 1. Выберите город и дилерский центр
          </h2>
          <div style="display: flex; align-items: right; justify-content: space-around; margin-top: 25px">
            <select style="width: 300px;margin-right: 10px;" class="" v-model="modelsselect">
              <option selected disabled value="">Выберите город</option>
              <option v-for="city in cities" :value="city">{{city.name}}</option>
            </select>

            <select style="width: 300px;" class="" v-model="modelsselect2">
              <option selected disabled value="">Выберите диллера</option>
              <option v-if="modelsselect" v-for="dill in diller" :value="dill.name">{{dill.name}}
              </option>
            </select>
          </div>
        </div>
        <div class="col-sm-12">
          <h2>Шаг 2. Выберите необходимые детали</h2>
          <div>
            <div style="height: 350px">
              <div v-if="!modelsselect2" class="iamblocker"></div>
              <div v-on:click="clickSlide(1)" class="buttonyard" style="float: left;"><i style="font-weight: 900;color: #c3002f; " class="fa fa-angle-left fa-2x" aria-hidden="true"></i></div>
              <object id="svgobj" type="image/svg+xml" :data="svgone.url" width="60%" ></object>
              <div v-on:click="clickSlide(0)" class="buttonyard" style="float: right; margin-left: 800px"><i style="font-weight: 900;color: #c3002f; " class="fa fa-angle-right fa-2x" aria-hidden="true"></i></div>
            </div>
            <div style="margin-top: 20px">
            <img v-for="image in svg" class="form_border_list" :src="image.url" alt="lists"
                 width="100"
                 v-on:click="clickImage(image)">
              </div>
          </div>
        </div>
        <transition name="fade">
          <div style="margin-top: 25px" v-show="modelsselect2 && detal.name">
          <!--<div class="col" style="margin-top: 25px">-->
            <div class="col-sm-12 col-lg-6" style="float: left;  text-align: left;" >
              <div class="bodycalc_table_headline">Калькуляция</div>

<div class="uk-container">

<div class="uk-form">
  <div id="range"></div>
  <input type="hidden" id="slider-range-value"  name="summa" />
  </div>
<div style=" background-color: red;"  class="" id="myvalue"></div>
  </div>
              <br/>
              <b>Деталь:</b> {{detal.name}}
              <br/>
              <b>Состояние:</b> <span style="color: green">{{slidermess}}</span>
              <br/>
              <b>Цена: </b> <span v-if="sliderprice"
                                  style="color: blue">{{Number(detal.price) + Number(sliderprice)}} P.</span>
              <br/>
              <br/>
              <button  class="is-primary" v-on:click="addDetal(detal.name,(Number(detal.price) + Number(sliderprice)))">
                Добавить деталь <i style="margin-left: 15px" class="fa fa-plus" aria-hidden="true"></i>
              </button>

              <button class="is-warning" v-on:click="clear">Сбросить все</button>
              <br/>
              <br/>
              <table class="my_table" style="width:100%">
                <tr style="background-color: #80808047;">
                  <th>Наименование</th>
                  <th>Цена</th>
                  <th>Описание</th>
                  <th >Удалить</th>
                </tr>
                <tr v-if="rables" v-for="(rable, key) in rables">
                  <td>{{rable.name}}</td>
                  <td>{{rable.price}} р.</td>
                  <td>заглушка{{rable.key}}</td>
                  <td class="delete" v-on:click="del(key)"><i class="fa fa-times" aria-hidden="true"></i></td>
                </tr>
                <tr>
                  <td colspan="3" style="text-align:right">ИТОГО:</td>
                  <td style=" color: #c3002f;">{{detalsum}} р.</td><!-- Задаем количество ячеек по горизонтали для объединения-->
                </tr>
              </table>
            </div>
            <div class="col-sm-12 col-lg-6" style="float: right;"    >
              <div class="upload_bodycalc_form">
                <div class="bodycalc_client_section">
                  <div class="bodycalc_client_title">Оформление заявки</div>
                  <form name="BODY_CALC" action="/" method="POST"
                        enctype="multipart/form-data"><input type="hidden" name="sessid"
                                                             id="sessid"
                                                             value="7745929c6b0698f527dd8f1f87eab6fc"><input
                    type="hidden" name="WEB_FORM_ID" value="3">
                    <div
                      class="row">
                    </div>
                    <div class="row">
                      <input class="forms" type="text" id="user_name" name="form_text_27"
                             value="" placeholder="ФИО">
                    </div>
                    <div class="row">
                      <input type="text" id="user_phone" class="forms" name="form_text_28"
                             value="" placeholder="Телефон">
                    </div>
                    <div class="row">
                      <input class="forms" type="text" id="user_email"
                             name="form_email_29" value="" placeholder="E-mail">
                    </div>
                    <input type="hidden" name="city" :value="modelsselect">
                    <input type="hidden" name="diller" :value="modelsselect2">


                    <div class="row clearfix">

                      <button class="is-primary" style="margin-left: 70px">Отправить</button>
                      <input class="forms" type="hidden" value="Отправить"
                             name="web_form_submit">
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </transition>

      </div>
    </div>
  </div>
</template>

<script>
  import cities from '../components/lists/city'
  import diller from '../components/lists/diller'
  import svg from '../components/lists/svg'
  import price from '../components/lists/price3'

  import noUiSlider  from 'nouislider';


  export default {
    name: 'calc2',
    data() {
      return {
        svg: svg,
        price: price,
        rables: [],
        svgone: {
            "id": 1,
            "url": "static/svg/scheme1.svg"
        },
        mause: false,
        modelsel: '0',
        mark: '',
        mark_id: '',
        model_id: '',
        slider: 0,
        slidermess: '',
        sliderprice: '',
        cities: cities,
        diller: diller,
        modelsselect: '',
        modelsselect2: '',
        modelsselect3: '1',
        detal: {},
        detalsum: 0,
      }
    },
    mounted: function () {
        this.svgObject();
    //   // this.getCity(); // import cities from '../components/lists/city'
        this.nevSlider();
    },
    watch: {
      // modelsselect: function (newQuestion, oldQuestion) {
      //   this.getDiller(this.modelsselect.id) // import diller from '../components/lists/diller'
      //       this.city = this.modelsselect.name
      // },
      modelsel: function (newQuestion, oldQuestion) {
        this.shagTwo(this.modelsel.model)
      },

      slider: function (newQuestion, oldQuestion) {
        // this.shagTwo(this.modelsel.model)
          this.sliderSwitch(this.slider);

      }
    },
    methods: {
        sliderSwitch(x) {
          if (x < 10000) {
              this.slidermess = 'Легкие потертости по лаку'
              this.sliderprice = '1000'
          } else if (x > 10000 && x < 20000) {
              this.slidermess = 'Потертости по лаку'
              this.sliderprice = '2000'
          } else if (x > 20000 && x < 30000) {
              this.slidermess = 'Царапины до 10% площади'
              this.sliderprice = '3000'
          } else if (x > 30000 && x < 40000) {
              this.slidermess = 'Царапины до 20% площади'
              this.sliderprice = '4000'
          } else if (x > 40000 && x < 60000) {
              this.slidermess = 'Повреждения до 15% площади'
              this.sliderprice = '5000'
          } else if (x > 60000 && x < 70000) {
              this.slidermess = 'Повреждения до 30% площади'
              this.sliderprice = '6000'
          } else if (x > 80000 && x < 100000) {
              this.slidermess = 'Повреждение ребер жесткости, каркаса'
              this.sliderprice = '10000'
          }
      },
      nevSlider() {
          var vm =this;
          var slider = document.getElementById('range');
          slider.style.margin = '20px auto';
          noUiSlider.create(slider, {
              start: 10000,
              step: 5000,
              range: {
                  'min': 5000,
                  'max': 100000
              },
              connect: [true, false],
              tooltips: false,
          });
          var rangeSliderValueElement = document.getElementById('slider-range-value');
          slider.noUiSlider.on('update', function( values, handle ) {
              rangeSliderValueElement.value = values[handle];
              vm.slider = values[handle]
          });

      },
      shagTwo(mark, mark_id, id) {
        // this.$router.push({path: `/item/${id}/`});
        this.mark = mark;
        this.mark_id = mark_id;
        this.model_id = id;
      },
      // getDiller: function (id) {
      //     let uri = `/api/diller/${id}/`;
      //     this.axios.get(uri).then((response) => {
      //         this.diller = response.data;
      //     });
      // },
      // getCity: function () {
      //     let uri = `/api/cities/`;
      //     this.axios.get(uri).then((response) => {
      //         this.cities = response.data;
      //     });
      // },
      clickImage: function (url) {
        this.svgone = url;
      },
        clickSlide: function (x) {
        if(x){
            var sim = -1
        } else {
            var sim = 1
        }
        let svgid = this.svgone.id + sim;
        if (svgid < 5 && svgid > 0) {
            let you = 'static/svg/scheme'+svgid+'.svg'
            this.svgone.id = svgid;
            this.svgone.url = you;
        }
      },
      clear: function () {
        this.slider = '0';
        this.slidermess = '';
        this.rables = [];
        this.detalsum = 0;
      },

      addDetal: function (name, price) {
        let arr = {
          name: name,
          price: price
        };
        this.detalsum += Number(arr.price);
        this.rables.push(arr);
      },
      edit: function (e) {
          console.log(e)
      },
      del: function (e) {
          this.rables.splice(e, 1);
      },
      getValue: function (x) {
        if (this.price[x]) {
          let res = this.price[x];
          this.detal = res;
        }
      },
      svgObject: function () {
        let t = this;
        let object = document.getElementById("svgobj");
        object.onload = function () {
          let svgDoc = object.contentDocument;
          let svgItem = svgDoc.getElementById("line");

          svgItem.addEventListener("click", function (event) {
            t.getValue(event.target.id);
            svgDoc.getElementById(event.target.id).setAttribute("fill", "green");
          });
        }
      },

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

  .plain_content_wrapper h2 {
    padding: 0 10px;
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

  .bodycalc_model_wrapper:hover
  .bodycalc_model_block {
    border: 1px solid #000;
    background: #f5f5f5;
    text-decoration: none;
  }

  .bodycalc_model_list_img {
    display: block;
    margin: 20px auto 15px;
    max-width: 100%;
  }

  .bodycalc_model_list_title {
    display: block;
    font-family: 'skodapro_bold', sans-serif;
    color: #4ba82e;
    font-size: 12px;
    margin-bottom: 5px;
    text-transform: uppercase;
  }

  .bodycalc_model_list_price {
    color: #9f9f9f;
    font-size: 14px;
  }

  .bodycalc_model_item {
    position: relative;
  }

  .bodycalc_model_wrapper {
    height: 100%;
  }

  .bodycalc_model_block {
    cursor: pointer;
  }

  .bodycalc_model_list_drop {
    z-index: 3;
    text-align: left;
    background: #fff;
    font-size: 12px;
    border: 1px solid #f7f7f7;
    /*display: none;*/
    visibility: hidden;
    opacity: 0;
    -webkit-transition: opacity 300ms;
    -moz-transition: opacity 300ms;
    -ms-transition: opacity 300ms;
    -o-transition: opacity 300ms;
    transition: opacity 300ms ease;
  }

  .bodycalc_model_wrapper:hover .bodycalc_model_list_drop {
    visibility: visible;
    opacity: 1;
  }

  .bodycalc_model_list_drop a {
    display: block;
    padding: 10px;
    color: #000;
    text-decoration: none;
  }

  .bodycalc_model_list_drop li {
    border-top: 2px solid #f7f7f7;
  }

  .bodycalc_model_list_drop li a:hover {
    background: #f7f7f7;
  }

  .bodycalc_model_list_select {
    position: relative;
    padding: 0 10px;
    cursor: pointer;
    /*border-bottom: 1px solid #f7f7f7;*/
    height: 30px;
    line-height: 30px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .bodycalc_model_list_select .list_arrow {
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    width: 28px;
    height: 100%;
    background: #4aa82e;

  }

  .bodycalc_model_list_select .list_arrow:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -3px;
    margin-left: -6px;
    width: 12px;
    height: 7px;
  }

  .bodycalc_model_list_drop ul,
  .bodycalc_model_list_drop li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .bodycalc_model_list_drop ul {
    display: none;
  }

  .bodycalc_model_list_drop.dropped ul {
    /*display: block;*/
  }

  .dropped .bodycalc_model_list_select .list_arrow {
    background: #fff;
  }

  .dropped .bodycalc_model_list_select .list_arrow:after {
    background-position: bottom;
  }

  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    -ms-flex-align: center;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: none;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 1rem;
    height: 2.25em;
    -ms-flex-pack: start;
    justify-content: flex-start;
    line-height: 1.5;
    padding: calc(.375em - 1px) calc(.625em - 1px);
    position: relative;
    vertical-align: top;
    background-color: #fff;
    border-color: #dbdbdb;
    color: #363636;
    cursor: pointer;
    display: block;
    font-size: 1em;
    max-width: 100%;
    outline: none;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .svg_part:hover {
    fill: #4ba82e;
    fill-opacity: 0.2;
  }

  .active {
    fill: #398124 !important;
    fill-opacity: 0.75 !important;
  }

  .selected {
    fill: #4ba82e;
    fill-opacity: 0.3 !important;
  }

  .form_border_list {
    color: #0000d0; /* Цвет ссылок */
    /*padding: 2px; !* Поля вокруг текста *!*/
    cursor: pointer;

  }

  .form_border_list:hover {
    /*border: 1px solid transparent;*/
    background: rgb(232, 244, 228);
    /*text-decoration: none;*/
  }

  input[type="range"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 6px;
    background-color: #eee;
    border-radius: 4px;
    width: 300px;
    outline: none;
    -webkit-transition: background-color 1s, height 1s;
    transition: background-color 1s, height 1s;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    display: block;
    border: 2px solid #ccc;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    /*background-color: #42b983;*/
    -webkit-transition: height 1s, width 1s;
    transition: height 1s, width 1s;
  }

  input[type="range"]:active {
    height: 8px;
    background-color: #b1e3cc;
  }

  input[type="range"]:active::-webkit-slider-thumb {
    height: 28px;
    width: 28px;
  }

  /**/
  .bodycalc_info {
    width: 484px;
    float: left;
    position: relative;
  }



  .bodycalc_info .btn_small {
    line-height: 24px;
    position: absolute;
    right: 0px;
    /*top: 0px;*/
    color: rgb(85, 85, 85);
    background: rgb(236, 236, 236);
    padding: 0px 15px;
  }

  .bodycalc_info .btn {
    font-size: 15px;
    line-height: 28px;
    font-family: skodapro, sans-serif;
  }

  .bodycalc_form {
    width: 348px;
    float: right;
  }

  .bodycalc_client_section {
    color: rgb(0, 0, 0);
    text-align: left;
    margin-left: 45px;
    font-size: 17px;
    font-family: skodapro, sans-serif;
    /*background: #d1d1d1;*/
    /*padding: 25px 20px;*/
  }

  .bodycalc_client_title {
    font-family: skodapro, sans-serif;
    font-size: 24px;
    margin-bottom: 26px;
    line-height: 1;
  }

  .bodycalc_client_section .row {
    margin-bottom: 7px;
  }

  .forms {
    -moz-appearance: none;
    -webkit-appearance: none;
    -ms-flex-align: center;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: none;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 1rem;
    -ms-flex-pack: start;
    justify-content: flex-start;
    line-height: 1.5;
    padding: calc(.375em - 1px) calc(.625em - 1px);
    position: relative;
    vertical-align: top;
    background-color: #fff;
    border-color: #dbdbdb;
    color: #363636;
    box-shadow: inset 0 1px 2px hsla(0, 0%, 4%, .1);
    max-width: 100%;
  }

  .is-primary {
    color: #fff;
    border: 1px solid #f5f5f5;
    background: #c3002f;
  }
  .is-primary:hover {
    border: 1px solid #c3002f;

    background-color: #f5f5f5;
    color: #333;
  }
  .is-warning {
    border: 1px solid #eee;
    background: #333;
    color: #fff;
  }
  .is-warning:hover {
    border: 1px solid #333;
    background-color: #f5f5f5;
    color: #333;
  }


  .iamblocker {
    position: absolute;
    /*top: 270px;*/
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #FFF;
    opacity: 0.7;
    z-index: 2;
  }

  button {
    border: 1px solid #c3002f;
    background: #c3002f;
    color: #fff;
    text-transform: uppercase;
    padding: .6071428571em 20px;
  }


  table {
    border: 0px solid #1C6EA4;
    width: 100%;
    text-align: center;
  }
  table td, table th {
    border: 0px solid #AAAAAA;
    padding: 5px;
  }
  table tbody td {
    font-size: 13px;
  }
  table thead {
    background: #DBDBDB;
  }
  table thead th {
    font-size: 15px;
    font-weight: bold;
    color: #000000;
    text-align: center;
  }

  .delete {
    text-align: center;
    color: #c3002f;
    cursor: pointer
  }
  .delete:hover {
    color: #000000;
  }

  .buttonyard {
    position: absolute;
    top: 40%;
    width: 2em;
    text-align: center;
    padding: 2em 0;
    z-index: 1;
    background-color: rgba(238,238,238,.85);
    zoom: 1;
  }
  .buttonyard:hover {

    background-color: rgba(167, 167, 167, 0.85);

  }
</style>
