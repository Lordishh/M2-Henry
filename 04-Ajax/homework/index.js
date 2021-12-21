var showFriend = function () {
  $("#lista").empty();
  $.get("http://localhost:5000/amigos", function (data) {
    data.forEach((amigo) => {
      $("#lista").append(
        "<li>" +
          amigo.name +
          ' <botton onclick="deleteFriend(' +
          amigo.id +
          ')">X</botton></li>'
      );
    });
  });
};

$("#boton").click(showFriend);

$("#search").click(function () {
  var id = $("#input").val();
  if (id) {
    $.get("http://localhost:5000/amigos/" + id, function (data) {
      $("#amigo").text(data.name);
      $("#input").val("");
    });
  } else {
    $("#amigo").text("");
    alert("Debe ingresar un id");
  }
});

var deleteFriend = function (idAmigo) {
  var id;
  if (typeof idAmigo === "number") {
    id = idAmigo;
  } else {
    id = $("#inputDelete").val();
  }
  $.ajax({
    url: "http://localhost:5000/amigos/" + id,
    type: "DELETE",
    success: function (data) {
      $("#success").text("El amigo fue borrado");
      $("#inputDelete").val("");
      showFriend();
    },
  });
};

$("#delete").click(deleteFriend);
