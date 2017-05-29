(function ($) {
	'use strict';

    // btn more
    $(document).on('click.site', '.btn-more', function(e) {
			var temp = $(this).next();
			//console.log(temp.attr('id'));
			var tempId = temp.attr('id');

			var nameIdString;
			var artistIdString;
			if (tempId.substring(5,6) != "0" && tempId.substring(5,6) != "1" && tempId.substring(5,6) != "2" && tempId.substring(5,6) != "3" && tempId.substring(5,6) != "4" && tempId.substring(5,6) != "5" && tempId.substring(5,6) != "6" && tempId.substring(5,6) != "7" && tempId.substring(5,6) != "8" && tempId.substring(5,6) != "9") {
				nameIdString = "song" + tempId.substring(4,5) + "-title";
				artistIdString = "song" + tempId.substring(4,5) + "-artist";
			}
			else if (tempId.substring(6,7) != "0" && tempId.substring(6,7) != "1" && tempId.substring(6,7) != "2" && tempId.substring(6,7) != "3" && tempId.substring(6,7) != "4" && tempId.substring(6,7) != "5" && tempId.substring(6,7) != "6" && tempId.substring(6,7) != "7" && tempId.substring(6,7) != "8" && tempId.substring(6,7) != "9") {
				nameIdString = "song" + tempId.substring(4,6) + "-title";
				artistIdString = "song" + tempId.substring(4,6) + "-artist";
			}
			else {
				nameIdString = "song" + tempId.substring(4,7) + "-title";
				artistIdString = "song" + tempId.substring(4,7) + "-artist";
			}

			console.log(nameIdString);
			nameIdString = "#" + nameIdString;
			var nameString = $( nameIdString ).html();
			console.log(nameString);

			//var artistIdString = "song" + tempId.substring(4,5) + "-artist";
			console.log(artistIdString);
			artistIdString = "#" + artistIdString;
			var artistString = $( artistIdString ).html();
			console.log(artistString);




			var hrefString = "http://localhost:3000/downloadSong?name=" + nameString + "&artist=" + artistString;
			console.log(hrefString);

			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var resp = JSON.parse(this.responseText);
					console.log(resp);
				}
			};

			xmlhttp.open("GET", hrefString);
			xmlhttp.send();

			//send get request

      var $dp = $(this).next('.dropdown-menu');
      if( $dp.html() == "" ){
        $dp.append('<a class="dropdown-item" href=""><i class="fa fa-download fa-fw text-left"></i> Download</a><a class="dropdown-item" href="#"><i class="fa fa-music fa-fw text-left"></i> Add to Playlist</a><div class="dropdown-divider"></div><a class="dropdown-item" href="#"><i class="fa fa-share-alt fa-fw text-left"></i> Share</a>');
      }

      if( (e.pageY + $dp.height() + 60) > $('body').height() ){
        $dp.parent().addClass('dropup');
      }

      if( e.pageX < $dp.width() ){
        $dp.removeClass('pull-right');
      }

    });

    $(document).on('click.site', '#search-result a', function(e) {
      $(this).closest('.modal').modal('hide');
    });

})(jQuery);
