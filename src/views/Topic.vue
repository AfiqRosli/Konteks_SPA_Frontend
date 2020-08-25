<template>
    <div>
        <div class="header-height_mt-5 row mb-5">
            <div class="col-12 col-sm-6">
                <h1>I want to talk about</h1>
            </div>
            <div class="search col-12 col-sm-6 text-right">
                <input
                    class="search__input"
                    type="text"
                    placeholder="Search topics..."
                />
                <span class="search__icon"><i class="fas fa-search"></i></span>
            </div>
        </div>

        <div class="row">
            <div
                class="col-12 col-sm-6 col-lg-3 mb-4 d-flex justify-content-center"
            >
                <div
                    class="card-topic d-flex align-items-end"
                    :style="{
                        'background-image':
                            'url(' +
                            require('@/assets/img/topic/myself.jpg') +
                            ')',
                    }"
                >
                    <div class="card-topic__button py-3 text-center w-100">
                        <a href="" class="card-topic__link">
                            Myself
                        </a>
                    </div>
                </div>
            </div>
            <div
                class="col-12 col-sm-6 col-lg-3 mb-4 d-flex justify-content-center"
            >
                <div
                    class="card-topic d-flex align-items-end"
                    :style="{
                        'background-image':
                            'url(' +
                            require('@/assets/img/topic/hobbies.jpg') +
                            ')',
                    }"
                >
                    <div class="card-topic__button py-3 text-center w-100">
                        Hobbies
                    </div>
                </div>
            </div>
            <div
                class="col-12 col-sm-6 col-lg-3 mb-4 d-flex justify-content-center"
            >
                <div
                    class="card-topic d-flex align-items-end"
                    :style="{
                        'background-image':
                            'url(' +
                            require('@/assets/img/topic/travelling.jpg') +
                            ')',
                    }"
                >
                    <div class="card-topic__button py-3 text-center w-100">
                        Travelling
                    </div>
                </div>
            </div>
            <div
                class="col-12 col-sm-6 col-lg-3 mb-4 d-flex justify-content-center"
            >
                <div
                    class="card-topic d-flex align-items-end"
                    :style="{
                        'background-image':
                            'url(' +
                            require('@/assets/img/topic/food_drink.jpg') +
                            ')',
                    }"
                >
                    <div class="card-topic__button py-3 text-center w-100">
                        Food &amp; Drinks
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
