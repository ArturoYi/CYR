 <template>
    <div class="mytemplate">
       <!-- <h1>{{message}}</h1> -->
    </div>
 </template>
 
 <script>
 export default {
    name:'MyTemplate',
     data(){
        return{
           message:'自定义组件',
        }
     },
 }
 </script>
 
 <style>
 .mytemplate{
    height: 500px;
    width: 100%;
 }
 </style>