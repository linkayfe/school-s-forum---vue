<template>
  <div class="panel-comment container">
    <div class="comment-size panel panel-info">
      <div class="panel-heading"><span class="glyphicon glyphicon-tag"></span>
        <a>This is a title</a>
        <small>
          <span class="glyphicon glyphicon-time time"></span>
          <span class="time"><a>作者</a></span>
        </small>
      </div>
      <div class="panel-body">
        the comment:
        There are many dogs,There are many dogs,There are many dogs,There are many dogs,There are many dogs,There are many dogs,There are many dogs,There are many dogs,
        There are many dogs,There are many dogs,There are many dogs,There are many dogs,There are many dogs,There are many dogs,There are many dogs,There are many dogs
      </div>
      <div class="panel-footer"><small>评论所在楼数:<span class="badge">4</span></small></div>
    </div>

    <div class="comment-size panel panel-info">
      <div class="panel-heading"><span class="glyphicon glyphicon-tag"></span>
        <a>This is a title</a>
        <small>
          <span class="glyphicon glyphicon-time time"></span>
          <span class="time"><a>作者</a></span>
        </small>
      </div>
      <div class="panel-body">
        the comment:
        There are some comments
      </div>
      <div class="panel-footer"><small>评论所在楼数:<span class="badge">4</span></small></div>
  </div>
  </div>
</template>

<script>
export default {
  name: "PersonalComment"
}
</script>

<style scoped>
.time{
  float: right;
}
a{
  cursor: pointer;
}
</style>