window.addEventListener('load', function() {
    var numerodepagina = 1 //aranca desde la pagina 1
  
    function isScrolledIntoView(el) {
      var rect = el.getBoundingClientRect();
      var elemTop = rect.top;
      var elemBottom = rect.bottom;
      // Only completely visible elements return true:
      var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
      // Partially visible elements return true:
      //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
      return isVisible;
    }
  
    function debounce(unaFuncion, tiempo) {
      let timeoutId;
      return function() {
        if(timeoutId) {
          clearTimeout(timeoutId);
        }
        const context = this;
        const args = arguments;
        timeoutId = setTimeout(function() {
          unaFuncion.apply(context, args);
        }, tiempo);
      }
    }
  
    var elTrigger = document.querySelector('#trigger');
    console.log(isScrolledIntoView(elTrigger));
  
    function detectarScroll() {
      console.log("Hay scroll bro!");
      if (numerodepagina < 500) { //va a funcionar siempre que la pagina sea menor a 500.
        var contenedorseries = document.querySelector("#trigger")
        if (isScrolledIntoView(contenedorseries)) {
          console.log("scroller");
          numerodepagina++ //esto es numero de pagina mas 1. esto es SI scroll la pagina hasta el final le se le suma la siguiente pagina
          fetch("https://api.themoviedb.org/3/discover/tv?api_key=a6f60714320c532cb6f1c6ddeef46bac&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&page="+numerodepagina)
          .then(function(response) {
            return response.json();
          })
          .then(function (respuesta) {
            console.log(respuesta);
            for (var i = 0; i < respuesta.results.length; i++) {
              if(respuesta.results[i].poster_path != null) { //Esto quiere decir SI el poster es DISTINTO a Null pone la imagen.
                document.querySelector("div#busqueda").innerHTML += "<div class='pelis'><a href='/veoVeo/infoxserie?id=" + respuesta.results[i].id + "'><img src='http://image.tmdb.org/t/p/w300" + respuesta.results[i].poster_path + "'></a></div>"
              } else { //sino pone esta.
                document.querySelector("div#busqueda").innerHTML += "<div class='pelis'id='errores'><img src='/images/newError.jpeg'></div>";
              }
            }
          })
        }
      }
    }
    let debDetectarScroll = debounce(detectarScroll, 300); //esto es que esperas 3 segundo para que aparezca la segunda pagina.
    window.addEventListener('scroll', function() {
      debDetectarScroll();
    })
  });
  