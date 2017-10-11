<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
import ENV from './config/ENV'
export default {
    data:function() {
        return {
            // mes: "world"
        }
    },
    created: function() {
        this.test();
        console.log(ENV.home);
    },
    methods: {
        test: function() {

        }
    }
}
</script>
<style scoped>

</style>

