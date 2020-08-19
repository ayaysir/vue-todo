<template>
    <section>
        <transition-group name="list" tag="ul">
            <li v-for="(todoItem, index) in propsData" :key="todoItem.key" class="shadow">
                <i class="check-btn fa fa-check" aria-hidden="true"></i>
                {{todoItem.value}}&nbsp;<span class="text-muted">{{formatDate(todoItem.createdDate)}}</span>
                <span class="edit-btn" type="button" @click="editTodo(todoItem.key, index)">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </span>
                <span class="remove-btn" type="button" @click="removeTodo(todoItem.key, index)">
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                </span>
            </li>
        </transition-group>

        <modal v-if="editModal" @close="editModal = false">
            <h3 slot="header">경고</h3>
            <span slot="footer" >
                다음 내용을 수정합니다: {{currentTodo.value}} <input type="text" v-model="editTodoObj.text" onfocus="this.select()" v-on:keypress.enter="editTodoAction()"><button type="button" @click="editTodoAction()">수정</button>
                <i class="close-modal-btn fa fa-times" aria-hidden="true" @click="editModal = false"></i>
            </span>
        </modal>
    </section>


    <!--

-->

</template>

<script>
    import Modal from './common/Modal.vue'
    export default {

        props: ["propsData"],

        data() {
            return {
                editModal: false,
                currentTodo: "",
                editTodoObj: {
                    key: "",
                    index: "",
                    text: "def"
                }
            }
        },

        methods: {
            removeTodo(keyOfTodoItem, index) {
                console.log(keyOfTodoItem, index)
                this.$emit("removeTodo", keyOfTodoItem, index)
            },

            editTodo(keyOfTodoItem, index) {
                
                this.editTodoObj.index = index
                this.currentTodo = this.propsData[index]
                console.log(this.currentTodo, this.currentTodo.value)
                this.editTodoObj.text = this.currentTodo.value
                this.editTodoObj.key = keyOfTodoItem
                this.editModal = !this.editModal
                
            },
            
            editTodoAction(keyOfTodoItem, index, editText){
                const obj = this.editTodoObj
                console.log(obj, obj.key)
                this.$emit("editTodo", obj.key, obj.index, obj.text, new Date().getTime())
                this.editModal = false
                
            },

            formatDate(date) {
                const d = new Date(date)
                let month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear(),
                    hour = '' + d.getHours(),
                    minute = '' + d.getMinutes(),
                    second = '' + d.getSeconds()

                if (month.length < 2) 
                    month = '0' + month;
                if (day.length < 2) 
                    day = '0' + day;
                if (hour.length < 2) 
                    day = '0' + day;
                if (minute.length < 2) 
                    day = '0' + day;
                if (second.length < 2) 
                    day = '0' + day;

                return [year, month, day].join('-') + " " + [hour, minute, second].join(":")
            }
         },
        components: {
            Modal: Modal
        }
    }

</script>

<style>
    ul {
        list-style-type: none;
        padding-left: 0px;
        margin-top: 0px;
        text-align: left;
    }

    li {
        display: flex;
        min-height: 50px;
        height: 50px;
        line-height: 50px;
        margin: 0.5rem 0;
        padding: 0 0.9rem;
        background: white;
        border-radius: 5px;
    }

    .check-btn {
        line-height: 45px;
        color: #62acde;
        margin-right: 5px;
    }

    .edit-btn {
        margin-left: auto;
        color: forestgreen;

        cursor: pointer;
    }

    .remove-btn {
        margin-left: 10px;
        color: #de4343;

        cursor: pointer;
    }


    /* list animation */
    .list-item {
        display: inline-block;
        margin-right: 10px;
    }

    .list-move {
        transition: transform 1s;
    }

    .list-enter-active,
    .list-leave-active {
        transition: all 1s;
    }

    .list-enter,
    .list-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }

    .text-muted {
        color: gray;
        font-size: 0.6em;
    }

</style>
