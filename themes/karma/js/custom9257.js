jQuery(document).ready(function($) {
  jQuery('.fixed--nav a[href^="#"]').click(function() {
      var target = jQuery(this.hash);
      if (target.length == 0) target = jQuery('a[name="' + this.hash.substr(1) + '"]');
      if (target.length == 0) target = jquery('html');
      if(jQuery(window).scrollTop() <= 199) {
        jQuery('html, body').animate({ scrollTop: target.offset().top - 300 }, 1000);
      }
      else {
        jQuery('html, body').animate({ scrollTop: target.offset().top - 180 }, 1000);
      }
      return false;
  });
  jQuery('a[href^="#"].btn.get').click(function() {
      var target = jQuery(this.hash);
      if (target.length == 0) target = jQuery('a[name="' + this.hash.substr(1) + '"]');
      if (target.length == 0) target = jquery('html');
        jQuery('html, body').animate({ scrollTop: target.offset().top - 180 }, 1000);
      return false;
  });
  var head = $("#iframe").contents().find("head");
  var css = '<style type="text/css">' +
  '.ndfHFb-c4YZDc-Wrql6b{display:none}; ' +
  '</style>';
  $(head).append(css);
  if(window.location.hash) {
        // smooth scroll to the anchor id
        jQuery('html, body').animate({
            scrollTop: jQuery(window.location.hash).offset().top - 300
        }, 1000, 'swing');
    }
}(jQuery));


/*********** for spy scroll ***********/
var topMenu = jQuery(".fixed--nav"),
    topMenuHeight = topMenu.outerHeight()+180,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = jQuery(jQuery(this).attr("href"));
      if (item.length) { return item; }
    });
jQuery(window).scroll(function(){
   // Get container scroll position
   var fromTop = jQuery(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if (jQuery(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   // Set/remove active class
   menuItems
     .parent().removeClass("active")
     .end().filter("[href='#"+id+"']").parent().addClass("active");
});
