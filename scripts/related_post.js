hexo.extend.helper.register('related_posts', function(currentPost, allPosts){
  var relatedPosts = [];
  currentPost.tags.forEach(function (tag) {
    allPosts.forEach(function (post) {
          if (isTagRelated(tag.name, post.tags)) {
              var relatedPost = {
                  title: post.title,
                  path: post.path,
                  cover: post.cover,
                  weight: 1
              };
              var index = findItem(relatedPosts, 'path', post.path);
              if (index != -1) {
                  relatedPosts[index].weight += 1;
              } else{
                  if (currentPost.path != post.path) {
                      relatedPosts.push(relatedPost);
                  };
              };
          };
      });
  });
  if (relatedPosts.length == 0) {return ''};
  var result = '<div class="relatedPosts_headling"><i class="fa fa-thumbs-up" aria-hidden="true"></i><span>&nbsp;相關文章</span></div><div class="relatedPosts_list">';
  relatedPosts = relatedPosts.sort(compare('weight'));
  for (var i = 0; i < Math.min(relatedPosts.length, 6); i++) {

    var cover = relatedPosts[i].cover || hexo.theme.config.default_cover || data.melody.default_cover
    result += '<div class="relatedPosts_item"><a href="/' + relatedPosts[i].path + '">';
    result += '<img class="relatedPosts_cover lozad" data-src="' + cover + '">';
    result += '<div class="relatedPosts_title">' + relatedPosts[i].title + '</div>';
    result += '</a></div>'  
  };
  result += '</div>';
  result += '<div class="clear_both"></div>';
  // console.log(relatedPosts);
  return result;
});
hexo.extend.helper.register('echo', function(path){
return path;
});
function isTagRelated (tagName, TBDtags) {
  var result = false;
  TBDtags.forEach(function (tag) {
      if (tagName == tag.name) {
          result = true;
      };
  })
  return result;
}
function findItem (arrayToSearch, attr, val) {
  for (var i = 0; i < arrayToSearch.length; i++) {
      if (arrayToSearch[i][attr] == val) {
          return i
      };
  };
  return -1;
}
function compare (attr) {
  return function (a, b) {
      var val1 = a[attr];
      var val2 = b[attr];
      return val2 - val1;
  }
}

