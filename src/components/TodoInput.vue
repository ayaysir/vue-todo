<template>
    <div class="input-box shadow">
        <input type="text" v-focus v-model="newTodoItem" v-on:keypress.enter="addTodo" placeholder="해야할 일을 입력하세요.">
<!--        <button v-on:click="addTodo">추가</button>-->
       <span class="add-container" v-on:click="addTodo">
          <i class="add-btn fa fa-plus" aria-hidden="true"></i>
       </span>
       
       <modal v-if="showModal" @close="showModal = false">
           <h3 slot="header">경고</h3>
           <span slot="footer" @click="showModal = false">
                할 일을 입력하세요.
                <i class="close-modal-btn fa fa-times" aria-hidden="true"></i>
           </span>
       </modal>
    </div>
</template>

<script>
    import Modal from './common/Modal.vue'
    
    export default {
        data(){
            return {
                newTodoItem: '',
                showModal: false
            }
        },
        // v-focus 디렉티브
        directives: {
            focus: {
                // directive definition
                inserted: function (el) {
                el.focus()
                }
            }
        },
        methods: {
            addTodo() {
                // alert(this.newTodoItem)
                if(this.newTodoItem !== ""){
                    const value = this.newTodoItem && this.newTodoItem.trim()
                    const key = "vue-todo-" + new Date().getTime()
                    this.$emit("addTodo", key, value, new Date().getTime())
                    this.clearInput()
                } else {
                    this.showModal = !this.showModal;
                }
            },
            clearInput(){
                this.newTodoItem = ""
            }
        },
        components: {
            Modal: Modal
        }
    }
</script>

<style scoped>
    input:focus {
        outline: none;
    }
    .input-box {
        background: white;
        height: 50px;
        line-height: 50px;
        border-radius: 5px;
    }
    .input-box input {
        border-style: none;
        font-size: 0.9rem;
    }
    .add-container {
        float: right;
        background: linear-gradient(to right, #6478FB, #8763FB);
        display: inline-block;
        width: 3rem;
        border-radius: 0 5px 5px 0;

        cursor: pointer;
    }
    .add-btn {
        color: white;
        vertical-align: middle;
    }
</style>