<template>
    <div>
        <transition name="fade">
        <div class="main_content_wrapper centred_wrapper">
            <div class="plain_content_wrapper">
                <a class="container_4"></a>
                <h2>Выберите модель</h2>
                <ul class="bodycalc_model_list clearfix">
                    <li v-for="(item, key, index) in items" :key="item.id" class="bodycalc_model_item">
                        <div v-if="item.models == ''" class="bodycalc_model_wrapper"
                             v-on:click="shagTwo(item.mark,item.id)">
                            <div class="bodycalc_model_block">
                                <img class="bodycalc_model_list_img"
                                     :src="'static' + item.img" alt="">
                                <span class="bodycalc_model_list_title">{{item.mark}}</span>
                            </div>
                        </div>
                        <div v-if="item.models != ''" class="bodycalc_model_wrapper">
                            <div class="bodycalc_model_block">
                                <img class="bodycalc_model_list_img"
                                     :src="'static' + item.img" alt="">
                                <span class="bodycalc_model_list_title">{{item.mark}}</span>
                                <div>
                                    <!--<select class="bodycalc_model_list_drop" v-model="modelsel">-->
                                        <!--<option value="0">Выберите модель</option>-->
                                        <!--<option v-for="model in item.models" :value="model">{{model.model}}</option>-->
                                    <!--</select>-->
                                  <div class="vuselect" v-for="(model, key) in item.models" v-on:click="shagTwo(item.mark)">
                                    <div style="padding: 5px; float:left; text-align: left;"  >{{model.class}} {{model.year}} {{model.modif}}</div>
                                    <div style=" text-align:right; ">
                                      <i style="font-weight: 900;color: #c3002f; " class="fa fa-angle-right fa-2x" aria-hidden="true"></i></div>
                                  </div>

                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
import items from '../components/lists/auto'

export default {
  name: 'calc',
  data () {
    return {
      items: items,
      modelsel: '0',
      models: '',
      mark: '',
      mark_id: '',
      model_id: '',
      itemid: ''
    }
  },
  // раскомитить если брать данные из бд
  // created: function () {
  //   // this.getCity(); // import cities from '../components/lists/city'
  // },

  methods: {
    shagTwo (mark, mark_id, id) {
      this.mark = mark
      this.mark_id = mark_id
      this.model_id = id
      this.episod = 'two'
      this.$router.push({ name: 'CalcTwo', params: { names: mark }})
    },
    // запрос списка авто
    // getCity() {
    //   this.axios.get(`/api/auto/`).then((response) => {
    //     this.items = response.data;
    //   });
    // },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
        height: 390px;
        padding: 0 10px;
        margin-bottom: 5px;
        text-align: center;
        font-family: 'skodapro', sans-serif;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .bodycalc_model_block {
      border: 1px solid #eee;
        display: block;
        height: 100%;
        padding: 10px;

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
        /*margin: 20px auto 15px;*/
        margin-bottom: 15px;
        max-width: 100%;
    }

    .bodycalc_model_list_title {
      font-size: 1.25em;
      line-height: 1;
      color: #c3002f;
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
        color: #363636;
        cursor: pointer;
        max-width: 100%;
        outline: none;
        width: 100%;
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
        padding: 2px; /* Поля вокруг текста */
        cursor: pointer;

    }

    .form_border_list:hover {
        border: 1px solid #000;
        background: #f5f5f5;
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
    .bodycalc_table_headline {
        font-family: skodapro, sans-serif;
        font-size: 24px;
        margin-bottom: 26px;
        line-height: 1;
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
        margin-left: 20px;
        font-size: 12px;
        font-family: skodapro, sans-serif;
        background: rgb(232, 244, 228);
        padding: 25px 20px;
    }

    .bodycalc_client_title {
        font-size: 17px;
        margin-bottom: 10px;
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
        box-shadow: inset 0 1px 2px hsla(0,0%,4%,.1);
        max-width: 100%;
    }

    .cta-explore  {
      border: 1px solid #eee;
      background: #eee;
      color: #343434;
      font-family: "Nissan Regular",Verdana,Arial,sans-serif;
      text-transform: uppercase;
      padding: .8571428571em 20px;
    }
    .secondary-cta::after {
      font-size: .7857142857rem;
      content: "";
      color: #c3002f;
      right: 20px;
      top: 50%;
      overflow: hidden;
      margin-top: -.5em;
      position: absolute;
    }

  .vuselect {
    border: 1px solid #eee;
    background: #eee;
    color: #343434;
    margin-top: 10px;
    text-transform: uppercase;
  }

    .vuselect:hover {
      background-color: #ccc;;
      color: #c3002f;
    }
</style>
