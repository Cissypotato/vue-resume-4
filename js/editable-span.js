Vue.component('editable-span',{
    props:['value','disabled'],
    data:function(){
        return{
            editing:false,
        }
    },
   
    template:`
    <span class="editableSpan">
        <span  v-show="!eidting">{{value}}</span>
        <input v-show="editing"  type="text" v-bind:value='value'  v-on:input="$emit('edit',$event.target.value)" >
        <button v-on:click="editing=!editing" v-if="!disabled">编辑</button>
    </span>
    `,
    
   
})

////