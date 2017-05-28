(function ($) {
	'use strict';

    // btn more
    $(document).on('click.site', '.btn-more', function(e) {
			var temp = $(this).next();
			//console.log(temp.attr('id'));
			var tempId = temp.attr('id');

			var nameIdString = "song" + tempId.substring(4,5) + "-title";
			//console.log(nameIdString);
			nameIdString = "#" + nameIdString;
			var nameString = $( nameIdString ).html();
			console.log(nameString);

			var artistIdString = "song" + tempId.substring(4,5) + "-artist";
			//console.log(nameIdString);
			artistIdString = "#" + artistIdString;
			var artistString = $( artistIdString ).html();
			console.log(artistString);


			var hrefString = "http://localhost:3000/downloadSong?name=" + nameString + "&artist=" + artistString;
			console.log(hrefString);



			//send get request


      var $dp = $(this).next('.dropdown-menu');
      if( $dp.html() == "" ){
        $dp.append('<a class="dropdown-item" href="' + hrefString + '"><i class="fa fa-download fa-fw text-left"></i> Download</a><a class="dropdown-item" href="#"><i class="fa fa-music fa-fw text-left"></i> Add to Playlist</a><div class="dropdown-divider"></div><a class="dropdown-item" href="#"><i class="fa fa-share-alt fa-fw text-left"></i> Share</a>');
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
