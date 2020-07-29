<template>{{count}}</template>

<script>
// import { ref, reactive, toRefs, computed } from "vue";
import { ref, effect } from "@vue/reactivity";
export default {
    setup() {
        let count = ref(1);

        effect(() => {
            console.log("数据变化了,count是" + count.value);
        });
        setInterval(() => {
            count.value++;
        }, 1000);

        return { count };
    },
};
</script>

<style>
</style>