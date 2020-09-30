<template>
    <div>
        <radial-progress-bar
            class="radial-progress position-absolute"
            :diameter="40"
            :completed-steps="30"
            :total-steps="100"
            :strokeWidth="3"
            :innerStrokeColor="'transparent'"
            :startColor="color"
            :stopColor="color"
        >
        </radial-progress-bar>
    </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'

export default {
    props: ['diameter', 'completedSteps'],
    data() {
        return {
            color: '#53c269',
        }
    },
    components: {
        RadialProgressBar,
    },
}
</script>

<style lang="scss" scoped>
.radial-progress {
    top: -10px;
    right: 0;
}
</style>
