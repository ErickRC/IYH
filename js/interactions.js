$(document).ready(function() {
	document.addEventListener("deviceready", onDeviceReady, true);
	$.mobile.loading( 'show', {
		text: 'Loading',
		textVisible: true,
		theme: 'e',
		html: ""
	});
	$('#categories').live('pageshow',function(event, ui){
		if($('#categories .content').html() != ''){
			//cargaremos todas las categorias
			$.mobile.loading( 'show', {
				text: 'Loading',
				textVisible: true,
				theme: 'e',
				html: ""
			});
			main.listingCategories();
		}
	});
	$('#allCategories').live('pageshow',function(event, ui){
		if($('#allCategories .content .categoriesContent').html() != ''){
			//cargaremos todas las categorias
			$.mobile.loading( 'show', {
				text: 'Loading',
				textVisible: true,
				theme: 'e',
				html: ""
			});
			main.listingAllCategories();
		}
	});
	if($('#search form .typeSearch input[type="checkbox"]').size()>0){
		$('#search form .typeSearch input[type="checkbox"]').checkboxradio()
		$('#search form .typeSearch input[type="checkbox"]').attr("checked",false).checkboxradio("refresh");
		$('#search form .typeSearch input[type="checkbox"]').eq(0).attr("checked",true).checkboxradio("refresh");
	}
	$('#search form .typeSearch .ui-checkbox').on( "change", function(event, ui) {
		$('#search form .typeSearch input[type="checkbox"]').attr("checked",false).checkboxradio("refresh");
		$(event.target).attr("checked",true).checkboxradio("refresh");
	});
	main.init();
	$('#search form').submit(function(){
		var keyword = $(this).find('#keyword').val();
		controler = $(this).find('input[type="checkbox"]:checked').val()
		main.searchListing(keyword,controler,false,'');
		$.mobile.loading( 'show', {
			text: 'Loading',
			textVisible: true,
			theme: 'e',
			html: ""
		});
		return false;
	});
	$('#categories .categories .ui-link, #allCategories .categoriesContent .categoryButton, #allCategories .categoriesContent .category .subcategories li .ui-link-inherit').live('click',function(e){
		e.preventDefault();
		var cat = $(this).attr('href').replace('#','');
		main.searchListing('','N',false,cat);
		$.mobile.loading( 'show', {
			text: 'Loading',
			textVisible: true,
			theme: 'e',
			html: ""
		});
	});
	$('#ListingResults .content ul li .ui-link-inherit').live('click',function(e){
		e.preventDefault;
		var id = $(this).attr('href');
		id = id.split('#');
		if(id[1] != null){
			id = id[1];
			$.mobile.loading( 'show', {
				text: 'Loading',
				textVisible: true,
				theme: 'e',
				html: ""
			});
			main.listingIndividual(id);
		}else{
			//no hay id del listado
		}
	});
	$('#EventResults .content ul li .ui-link-inherit').live('click',function(e){
		e.preventDefault;
		var id = $(this).attr('href');
		id = id.split('#');
		if(id[1] != null){
			id = id[1];
			$.mobile.loading( 'show', {
				text: 'Loading',
				textVisible: true,
				theme: 'e',
				html: ""
			});
			main.EventIndividual(id);
		}else{
			//no hay id del listado
		}
	});
	$('#ClasifiedResults .content ul li .ui-link-inherit').live('click',function(e){
		e.preventDefault;
		var id = $(this).attr('href');
		id = id.split('#');
		if(id[1] != null){
			id = id[1];
			$.mobile.loading( 'show', {
				text: 'Loading',
				textVisible: true,
				theme: 'e',
				html: ""
			});
			main.ClasifiedIndividual(id);
		}else{
			//no hay id del listado
		}
	});
	$('.container .details .links .ui-link').live('click',function(e){
		e.preventDefault;
		e.stopPropagation();
		console.log($(this).attr('href'));
		var link = $(this).attr('href');
		var name = $(this).attr('name');
		if( link == '#void'){
			//do nothing
		}else{
			var split = link.split('!')[0];
			var link = link.split('!')[1];
			if(split == '#mail'){
				window.location = 'mailto:' + name;
				//console.log('link: ' + name);
			}else if(split == '#fotos'){
				//console.log('ver fotos: ' + link);
				var action = link.split('_')[0];
				var id = link.split('_')[1];
				var level = link.split('_')[2];
				console.log(action + ' // ' + id + ' // ' + level);
				main.getGallery(action,id,level);
			}else if( split == '#link'){
				window.location = name;
				//console.log('ver fotos: ' + link);
			}
		}
	});
});
function carrouselStart(e){ 
	if(typeof e.touches != 'undefined'){
		point = e.touches[0]; 
		pointStartX = point.pageX; 
		pointStartY = point.pageY; 
		null; 
	}
 }
function carrouselMove(e){
	if(typeof point != 'undefined'){
		deltaX = Math.abs(point.pageX - pointStartX); 
		deltaY = Math.abs(point.pageY - pointStartY); 
		if (deltaX >= deltaY) { 
			e.preventDefault(); 
		} else { 
			null; 
		} 
	}
}
var onDeviceReady = function(){
};