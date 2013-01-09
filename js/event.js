var event = {
	printListings : function(Listings,load){
		if(load)
			$('#EventResults .content ul .loadMore').remove();
		else
			$('#EventResults .content ul').html('');
		if(Listings != null && Listings != false){
		$.each(Listings,function(index,value){
			var link = parseInt(value.event.level)>=50?'href="#'+value.event.id+'"':'';
			var icon = parseInt(value.event.level)>=50?'data-icon="arrow-r"':'data-icon=false';
			var time = value.event.start_date?'<p>'+value.event.start_date.replace(/-/g,'/') + '</p>':'';
			var phone = value.event.phone?'<p class="yellow">Tel. '+value.event.phone + '</p>':'';
			var address = value.event.address?'<p>'+value.event.address + '</p>':'';
			var image = value.img!=false?value.img:'';
			var listingData = '<li class="event lv'+value.event.level+'" ' + icon + ' ><a ' + link + '>'+image+'<h1>' + value.event.title + '</h1>' + time + address + phone + '</a></li>';
			$('#EventResults .content ul').append(listingData);
			$('#EventResults .content ul').listview('refresh');
		})
		$('#EventResults .content ul').append('<li class="loadMore"><a href="#load">Load More Events</a></li>');
		$('#EventResults .content ul').listview('refresh');
		}else{
			$('#EventResults .content ul').append('<li data-icon=false class="loadMore"><a>No More Results</a></li>');
			$('#EventResults .content ul').listview('refresh');
		}
		$.mobile.loading( 'hide' );
	},
	printIndividual : function(results){
		//console.log(results);
		$('#EventIndiv .container .details').html('');
		var toAppend = '<div class="blacBox first">' + results.img;
		toAppend += '<h1>'+results.name+'</h1><p class="date">'+results.date+'</p><div class="division"></div>';
		toAppend += '<p>'+results.address+'</p>';
		toAppend += results.phone?'<a href="tel:'+results.phone+'" class="phone_button" data-role="button">TEL. '+results.phone+'</a></div>':'</div>';
		$('#EventIndiv .container .details').append(toAppend);
		
		toAppend = '<fieldset class="ui-grid-c links">';
		toAppend += '<div class="ui-block-a link"><a href="#fotos!E_'+results.id+'_'+results.level+'" class="ui-link"><div class="borderIco on"><img class="glow" alt="" src="../img/icon_glow.png"/><img class="action_ico" alt="" src="../img/photos.png" /></div></a><span>Ver Fotos</span><div class="clear"></div></div>';
		toAppend += '<div class="ui-block-b link"><a href="#void" class="ui-link"><div class="borderIco"><img class="glow" alt="" src="../img/icon_glow.png"/><img class="action_ico" alt="" src="../img/checkin.png" /></div></a><span>Check-In Aquí</span><div class="clear"></div></div>';
		var email = results.email?'#mail':'#void';
		toAppend += '<div class="ui-block-c link"><a href="'+email+'" name="'+results.email+'" class="ui-link"><div class="borderIco on"><img class="glow" alt="" src="../img/icon_glow.png"/><img class="action_ico" alt="" src="../img/mail.png" /></div></a><span>Mail</span><div class="clear"></div></div>';
		toAppend += '<div class="ui-block-d link"><a href="#void" class="ui-link"><div class="borderIco"><img class="glow" alt="" src="../img/icon_glow.png"/><img class="action_ico" alt="" src="../img/comollegar.png" /></div></a><span>Cómo llegar</span><div class="clear"></div></div>';
		toAppend += '</fieldset>';
		$('#EventIndiv .container .details').append(toAppend);
		
		$('#EventIndiv .container .details .phone_button').button();
		$('#EventIndiv .container .details').append('<div class="blacBox"><div class="description">'+results.description+'</div></div>');
		
		var height = $('#EventIndiv .container .details .links .link .borderIco').width();
		$('#EventIndiv .container .details .links .link .borderIco').css('height',height+'px');
	},
	chargeGallery : function(results){
		console.log(results);
		var last = 0;
		$('#EventGallery .content .gallery .slider ul').html('');
		$.each(results,function(index,value){
			$('#EventGallery .content .gallery .slider ul').append('<li><a class="wrap_img"><img alt="" src="'+value+'"/></a></li>');
			last = index;
		});
		$('#EventGallery .content .gallery .slider ul').css('width',((last+1)*550)+'px')
		if($("#EventGallery .content .gallery #gallery-slider2").length){
			var width = $('#EventGallery .content .gallery').width();
			$('#EventGallery .content .gallery .slider ul li').css('width',width+'px');
			$('#EventGallery .content .gallery .slider ul img').css('width',(width-25)+'px');
			galleryscroll2 = new iScroll('gallery-slider2',{
				snap:'li',momentum:false,
				hScrollbar:false,vScrollbar:false,vScroll:false,hScroll:true,
				onBeforeScrollStart:carrouselStart,onBeforeScrollMove:carrouselMove
			});
		}
		//console.log(results);
	}
}