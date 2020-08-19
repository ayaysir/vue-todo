<template>
    <div id="app">
        <TodoHeader></TodoHeader>
        <TodoInput v-on:addTodo="addTodo"></TodoInput>
        <TodoList v-bind:propsData="todoItems" @removeTodo="removeTodo" @editTodo="editTodo"></TodoList>
        <TodoFooter v-on:removeAllOfChild="removeAllOfParents"></TodoFooter>

    </div>

</template>

<script>
    import TodoHeader from './components/TodoHeader.vue'
    import TodoInput from './components/TodoInput.vue'
    import TodoList from './components/TodoList.vue'
    import TodoFooter from './components/TodoFooter.vue'
    
    export default {
        data() {
            return {
                todoItems: []
            }
        },
        created() {
            if (localStorage.getItem("vue-todo")) {
                // for (var i = 0; i < localStorage.length; i++) {
                //     localStorage.key(i).indexOf("vue-todo") == 0 && this.todoItems.push({
                //         key: localStorage.key(i),
                //         value: localStorage.getItem(localStorage.key(i))
                //     })
                // }

                this.todoItems = JSON.parse(localStorage.getItem("vue-todo"))

                this.todoItems.sort(function(a, b) {
                    return a.key < b.key ? -1 : a.key > b.key ? 1 : 0
                })

                
            }
        },
        methods: {
            addTodo(key, value, date) {
                this.todoItems.push({
                    key,
                    value,
                    createdDate: date,
                    modifiedDate: date
                })
                localStorage.setItem("vue-todo", JSON.stringify(this.todoItems))
            },
            removeAllOfParents() {
                this.todoItems = []
                localStorage.setItem("vue-todo", JSON.stringify(this.todoItems))
            },
            removeTodo(keyOfTodoItem, index) {
                this.todoItems.splice(index, 1)
                localStorage.setItem("vue-todo", JSON.stringify(this.todoItems))
            },
            editTodo(keyOfTodoItem, index, editText, modifiedDate) {

                // console.log(keyOfTodoItem, index, editText, modifiedDate)
                const item = this.todoItems[index]
                this.todoItems.splice(index, 1, {
                    key: keyOfTodoItem,
                    value: editText,
                    createdDate: item.createdDate,
                    modifiedDate: modifiedDate
                })
                localStorage.setItem("vue-todo", JSON.stringify(this.todoItems))
            }
         },

        components: {
            'TodoHeader': TodoHeader,
            'TodoInput': TodoInput,
            'TodoList': TodoList,
            'TodoFooter': TodoFooter
        }
    }

</script>

<style>
    body {
        text-align: center;
        background-color: #F6F6F8;
    }

    input {
        border-style: groove;
        width: 200px;
    }

    button {
        border-style: groove;
    }

    .shadow {
        box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
    }

</style>
