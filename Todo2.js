$(".fa-pencil").click(function() {
    $("input[type='text']").fadeToggle();
  });
  
  $("input[type='text']").keypress(function(e) {
    if (e.which === 13) {     // 13 is the enter key
      var toDoText = $(this).val();
      $(this).val("");
      $("ul").append("<li><span><i class='fa fa-eraser' aria-hidden='true' title='erase'></i></span> " + toDoText + "</li>");
    }
  });
  
  $("ul").on("click", "li", function() {
    $(this).toggleClass("completed");
  });
  
  $("ul").on("click", "span", function(e) {
    $(this).parent().fadeOut(500, function() {
      $(this).remove();
    });
    e.stopPropagation();
  });
  