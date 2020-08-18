<template>
<div>
    <h4>カートに追加しました。</h4>
    <div id="btn_home">
        <b-button size="lg" pill href="/" variant="primary">ホームに戻る</b-button>
    </div>
</div>
</template>

<script>
export default {
    name: 'BuyItem',
}
</script>

<style>
h4 {
    text-align: center;
}

#btn_home {
    text-align: center;
    margin-top: 4rem;
}
</style>