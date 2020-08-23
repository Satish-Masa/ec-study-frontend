<template>
    <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">Logo</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-navbar-nav>
            <b-nav-item v-if="!CheckLogin" href="/signup">Sign Up</b-nav-item>
            <b-nav-item v-if="!CheckLogin" href="/signin">Login</b-nav-item>
            
            <b-nav-item v-if="CheckLogin" href="/cart">My Cart</b-nav-item>
            <b-nav-item v-if="CheckLogin" href="/ordered/list">Order History</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  computed: {
    CheckLogin: function() {
      var cookies = document.cookie;
      var cookieArray = cookies.split(';');
      for (var c of cookieArray) {
        var cArray = c.split('=');
        if (cArray[0] == 'token') {
          return true;
        }
      }
      return false;
    }
  }
}
</script>