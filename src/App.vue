<template>
    <section class="todoapp">
        <header class="header">
            <h1>Vue3 todos</h1>
            <input class="new-todo" placeholder="想干的事" v-model="newTodo" @keyup.enter="addTodo" />
        </header>
        <section class="main" v-show="todos.length">
            <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                <li v-for="todo in todos" class="todo" :key="todo.id">
                    <div class="view">
                        <input class="toggle" type="checkbox" v-model="todo.completed" >
                        <label>{{ todo.title }}</label>
                        <button class="destroy" @click="removeTodo(todo)"></button>
                    </div>
                </li>
            </ul>
        </section>
        <footer class="footer" v-show="todos.length" v-cloak>
            <span class="todo-count">
                <strong>{{ remaining }}</strong> left
            </span>
            <button
                class="clear-completed"
                @click="removeCompleted"
                v-show="todos.length > remaining"
            >Clear completed</button>
        </footer>
    </section>
</template>

<script>
import { ref, reactive, toRefs, computed } from "vue";
export default {
    setup() {
        const state = reactive({
            newTodo: "",
            todos: [
                { id: "1", title: "吃饭", completed: false },
                { id: "2", title: "睡觉", completed: false }
            ]
        });
        function addTodo() {
            var value = state.newTodo && state.newTodo.trim();
            if (!value) {
                return;
            }
            state.todos.push({
                id: state.todos.length + 1,
                title: value,
                completed: false
            });
            state.newTodo = "";
        }

        const remaining = computed(
            () => state.todos.filter(todo => !todo.completed).length
        );
        const allDone = computed({
            get: function() {
                return remaining.value === 0;
            },
            set: function(value) {
                state.todos.forEach(function(todo) {
                    todo.completed = value;
                });
            }
        });
        function removeCompleted() {
            state.todos = state.todos.filter(todo => !todo.completed);
        }
        return {
            ...toRefs(state),
            addTodo,
            removeCompleted,
            allDone,
            remaining
        };
    }
};
</script>