<template>
    <div class="button-container">
        <div class="clear-all-container">
            <span class="clear-all-btn" @click="clearTodo">모든 일정 삭제</span>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            clearTodo() {
                //localStorage.clear()
                const isAllRemover = confirm("정말 모든 일정을 삭제하시겠습니까?")
                if(isAllRemover) {
                    this.$emit("removeAllOfChild")
                }
            },

        }
    }
</script>

<style>
    .clear-all-container, .order-reverse-container {
        width: 10rem;
        height: 50px;
        line-height: 50px;
        background-color: white;
        border-radius: 5px;
        margin: 0 auto;
    }

    .button-container {
        margin: 0 auto;
        cursor: pointer;
    }
    
    .clear-all-btn {
        color: #e20303;
        display: black;
    }


</style>