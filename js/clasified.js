var clasified = {
	printListings : function(Listings,load){
		if(load)
			$('#ClasifiedResults .content ul .loadMore').remove();
		else
			$('#ClasifiedResults .content ul').html('');
		if(Listings != null && Listings != false){
		$.each(Listings,function(index,value){
			var link = parseInt(value.level)>=50?'href="#'+value.id+'"':'';
			var icon = parseInt(value.level)>=50?'data-icon="arrow-r"':'data-icon=false';
			var phone = value.phone?'<p>Tel. '+value.phone + '</p>':'';
			var address = value.address?'<p>'+value.address + '</p>':'';
			var email = value.email?'<p>'+value.email + '</p>':'';
			var listingData = '<li ' + icon + ' name="'+value.level+'" ><a ' + link + '><h1>' + value.title + '</h1>' + address + phone + email + '</a></li>';
			//console.log(listingData);
			$('#ClasifiedResults .content ul').append(listingData);
			$('#ClasifiedResults .content ul').listview('refresh');
		})
		$('#ClasifiedResults .content ul').append('<li class="loadMore"><a href="#load">Load More Listings</a></li>');
		$('#ClasifiedResults .content ul').listview('refresh');
		}else{
			$('#ClasifiedResults .content ul').append('<li data-icon=false class="loadMore"><a>No More Results</a></li>');
			$('#ClasifiedResults .content ul').listview('refresh');
		}
		$.mobile.loading( 'hide' );
	}
}