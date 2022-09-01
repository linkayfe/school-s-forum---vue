<template>
  <div id="carousel" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
      <li data-target="#carousel-example-generic" data-slide-to="1"></li>
      <li data-target="#carousel-example-generic" data-slide-to="2"></li>
      <li data-target="#carousel-example-generic" data-slide-to="3"></li>
      <li data-target="#carousel-example-generic" data-slide-to="4"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">
      <div class="item active">
        <a href="#"><img src="../assets/xyfj.jpg" alt=""></a>
      </div>
      <div class="item">
        <a href="#"><img src="../assets/wsxdz.jpg" alt=""></a>
      </div>
      <div class="item">
        <a href="#"><img src="../assets/pufa.jpg" alt=""></a>
      </div>
      <div class="item">
      <a href="#"><img src="../assets/f.png" alt=""></a>
      </div>
      <div class="item">
      <a href="#"><img src="../assets/xms.jpg" alt=""></a>
      </div>
    </div>


    <!-- Controls -->
    <a class="left carousel-control" href="#carousel" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#carousel" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "Carousel"
}
</script>

<style scoped>
#carousel{
  display: inline;
}
#carousel img{
  width: 100%;
  height: 245px;
}

</style>