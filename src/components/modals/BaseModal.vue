<template>
    <div
        class="modal fade"
        :id="id"
        tabindex="-1"
        :aria-labelledby="id + 'Label'"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title" :id="id + 'Label'">
                        <b>{{ title }}</b>
                    </h5>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <slot name="body"></slot>
                </div>

                <div class="modal-footer border-0">
                    <slot name="footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" class="btn btn-primary">
                            Save changes
                        </button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['id', 'title'],
}
</script>

<style lang="scss" scoped></style>
