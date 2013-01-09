var listing = {
	printListings : function(Listings,load){
		if(load)
			$('#ListingResults .content ul .loadMore').remove();
		else
			$('#ListingResults .content ul').html('');
		if(Listings != null && Listings != false){
		$.each(Listings,function(index,value){
			var link = parseInt(value.listing.level)>=50?'href="#'+value.listing.id+'"':'';
			var icon = parseInt(value.listing.level)>=50?'data-icon="arrow-r"':'data-icon=false';
			var phone = value.listing.phone?'<p class="yellow">Tel. '+value.listing.phone + '</p>':'';
			var address = value.listing.address?'<p>'+value.listing.address + '</p>':'';
			var cat = '<p>' + value.categories + '</p>';
			var image = value.img!=false?value.img:'';
			var listingData = '<li class="listing lv'+value.listing.level+'" ' + icon + ' ><a '+link+'>'+image+'<h1>'+value.listing.title+'</h1>'+cat+address+phone+'</a></li>';
			$('#ListingResults .content ul').append(listingData);
			$('#ListingResults .content ul').listview('refresh');
			//console.log(value.categories);
		})
			$('#ListingResults .content ul').append('<li class="loadMore" data-icon="search"><a class="yellow" href="#load">Load More Listings</a></li>');
			$('#ListingResults .content ul').listview('refresh');
		}else if(Listings == false){
			$('#ListingResults .content ul').append('<li data-icon=false class="loadMore"><a>No Results</a></li>');
			$('#ListingResults .content ul').listview('refresh');
			console.log('NO results');
		}else{
			$('#ListingResults .content ul').append('<li data-icon=false class="loadMore"><a>No More Results</a></li>');
			$('#ListingResults .content ul').listview('refresh');
			console.log('NO more results');
		}
		$.mobile.loading( 'hide' );
	},
	printIndividual : function(results){
		$('#ListingIndiv .container .details').html('');
		var toAppend = '<div class="blacBox first">' + results.img;
		toAppend += '<h1>'+results.name+'</h1><p class="categories">'+results.categories+'</p><div class="division"></div>';
		toAppend += '<p>'+results.address+'</p>';
		toAppend += '<a href="tel:'+results.phone+'" class="phone_button" data-role="button">TEL. '+results.phone+'</a></div>';
		$('#ListingIndiv .container .details').append(toAppend);
		toAppend = '<fieldset class="ui-grid-c links">';
		toAppend += '<div class="ui-block-a link"><a href="#fotos!N_'+results.id+'_'+results.level+'" class="ui-link"><div class="borderIco on"><img class="glow" alt="" src="../img/icon_glow.png"/><img class="action_ico" alt="" src="../img/photos.png" /></div></a><span>Ver Fotos</span><div class="clear"></div></div>';
		toAppend += '<div class="ui-block-b link"><a href="#void" class="ui-link"><div class="borderIco"><img class="glow" alt="" src="../img/icon_glow.png"/><img class="action_ico" alt="" src="../img/checkin.png" /></div></a><span>Check-In Aquí</span><div class="clear"></div></div>';
		var email = results.email?'#mail':'#void';
		toAppend += '<div class="ui-block-c link"><a href="'+email+'" name="'+results.email+'" class="ui-link"><div class="borderIco on"><img class="glow" alt="" src="../img/icon_glow.png"/><img class="action_ico" alt="" src="../img/mail.png" /></div></a><span>Mail</span><div class="clear"></div></div>';
		toAppend += '<div class="ui-block-d link"><a href="#void" class="ui-link"><div class="borderIco"><img class="glow" alt="" src="../img/icon_glow.png"/><img class="action_ico" alt="" src="../img/comollegar.png" /></div></a><span>Cómo llegar</span><div class="clear"></div></div>';
		toAppend += '</fieldset>';
		$('#ListingIndiv .container .details').append(toAppend);
		toAppend = '<fieldset class="ui-grid-c links">';
		toAppend += '<div class="ui-block-a link"><a href="#void" class="ui-link"><div class="borderIco"><img class="glow" alt="" src="../img/icon_glow.png"/><img class="action_ico" alt="" src="../img/resena.png" /></div></a><span>Escribe una Reseña</span><div class="clear"></div></div>';
		toAppend += '<div class="ui-block-b link"><a href="#void" class="ui-link"><div class="borderIco"><img class="glow" alt="" src="../img/icon_glow.png"/><img class="action_ico" alt="" src="../img/vercheckin.png" /></div></a><span>Ver Check-Ins</span><div class="clear"></div></div>';
		var url = results.url?'#link':'#void';
		toAppend += '<div class="ui-block-c link"><a href="'+url+'" name="'+results.url+'" class="ui-link"><div class="borderIco on"><img class="glow" alt="" src="../img/icon_glow.png"/><img class="action_ico" alt="" src="../img/website.png" /></div></a><span>Ir a su Sitio Web</span><div class="clear"></div></div>';
		toAppend += '<div class="ui-block-d link"><a href="#void" class="ui-link"><div class="borderIco"><img class="glow" alt="" src="../img/icon_glow.png"/><img class="action_ico" alt="" src="../img/address.png" /></div></a><span>Obtener Direciones</span><div class="clear"></div></div>';
		toAppend += '</fieldset>';
		$('#ListingIndiv .container .details').append(toAppend);
		
		$('#ListingIndiv .container .details .phone_button').button();
		$('#ListingIndiv .container .details').append('<div class="blacBox"><div class="description">'+results.description+'</div></div>');
		
		var height = $('#ListingIndiv .container .details .links .link .borderIco').width();
		$('#ListingIndiv .container .details .links .link .borderIco').css('height',height+'px');
	},
	chargeCategories : function(results){
		var aux = '';
		var letter = ['a','b','c'];
		$('#categories .content').html('');
		$.each(results,function(index,value){
			//console.log(value.url);
			if(index%3==0 && index>0){
				$('#categories .content').append('<fieldset class="ui-grid-b categories">' + aux + '</fieldset>');
				aux = '<div class="ui-block-'+letter[index%3]+' category"><a href="#'+value.id+'" class="ui-link"><img class="glow" alt="" src="../img/glow_icon.png"/><img class="cat_ico" alt="" src="../img/cat/'+value.url+'.png" /></a></div>';
			}else{
				aux += '<div class="ui-block-'+letter[index%3]+' category"><a href="#'+value.id+'" class="ui-link"><img class="glow" alt="" src="../img/glow_icon.png"/><img class="cat_ico" alt="" src="../img/cat/'+value.url+'.png" /></a></div>';
			}
		});
		var height = $('#categories .content .categories .category').width()-2;
		$('#categories .content .categories .category').css('height',height+'px');
	},
	chargeAllCategories : function(results){
		$('#allCategories .content .categoriesContent').html('');
		$.each(results,function(index,value){
			if(value.subcategories == null){
				//$('#allCategories .content .categoriesContent').append('<div class="category" data-role="collapsible-set"><div data-role="collapsible" data-theme="a" data-iconpos="right" data-content-theme="a"><h3>'+value.title+'</h3></div></div>')
				$('#allCategories .content .categoriesContent').append('<a class="categoryButton" href="#'+value.id+'" data-role="button" data-icon="arrow-r" data-iconpos="right" data-theme="a">'+value.title+'</a>')
			}else{
				subcatecories = '<ul class="subcategories" data-role="listview">';
				$.each(value.subcategories,function(indexS,valueS){
					subcatecories += '<li><a href="#'+valueS.id+'">'+valueS.title+'</a></li>';
				});
				subcatecories += '</ul>';
				$('#allCategories .content .categoriesContent').append('<div class="category" data-role="collapsible-set"><div data-role="collapsible" data-theme="a" data-iconpos="right" data-content-theme="a"><h3>'+value.title+'</h3><p>'+subcatecories+'</p></div></div>')
				subcatecories = '';
			}
		});
		$('#allCategories .content .categoriesContent .categoryButton').button();
		$('#allCategories .content .categoriesContent .category').collapsibleset();
		$('#allCategories .content .categoriesContent .category .subcategories').listview();
	},
	chargeGallery : function(results){
		var last = 0;
		$('#ListingGallery .content .gallery .slider ul').html('');
		$.each(results,function(index,value){
			$('#ListingGallery .content .gallery .slider ul').append('<li><a class="wrap_img"><img alt="" src="'+value+'"/></a></li>');
			last = index;
		});
		$('#ListingGallery .content .gallery .slider ul').css('width',((last+1)*550)+'px')
		if($("#ListingGallery .content .gallery #gallery-slider").length){
			var width = $('#ListingGallery .content .gallery').width();
			$('#ListingGallery .content .gallery .slider ul li').css('width',width+'px');
			$('#ListingGallery .content .gallery .slider ul img').css('width',(width-25)+'px');
			galleryscroll = new iScroll('gallery-slider',{
				snap:'li',momentum:false,
				hScrollbar:false,vScrollbar:false,vScroll:false,hScroll:true,
				onBeforeScrollStart:carrouselStart,onBeforeScrollMove:carrouselMove
			});
		}
		//console.log(results);
	}
}