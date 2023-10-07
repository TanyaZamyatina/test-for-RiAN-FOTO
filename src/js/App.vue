<template>
    <div class="wrapper">
        <router-view></router-view>
    </div>
</template>

<script>

</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');  

* {
    margin: 0;
    padding: 0;
}

body {
    background: #fff;
    color: #000;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-size: 1em;
}

.wrapper {
    overflow: hidden;
}

.wrapper {
    @media(min-width: 1700px) {
        width: 1500px;
        margin: 0 auto;
    }
    @media(max-width: 1700px) and (min-width: 900px) {
        width: 80%;
        margin: 0 10%;
    }
    @media(max-width: 900px) {
        width: 90%;
        margin: 0 5%;
    }
}

</style>