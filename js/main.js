var main = {
	init : function(){
		$.ajax({
			url: 'http://www.inyourhands.com.mx/appFunctions/?controler=app_main&action=verifyConnection',
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res==true){
					$.mobile.loading( 'hide' );
					$.mobile.changePage($("#search"),{transition:"fade"});
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
	},
	searchListing : function(keyword,controler,load,categoryID){
		if(controler == 'N'){//listing
			var c = 'app_listing';
			var action = listing;
			var page = '#ListingResults';
		}else if(controler == 'E'){//evento
			var c = 'app_event';
			var action = event;
			var page = '#EventResults';
		}else if(controler == 'C'){//clasificado
			var c = 'app_clasified';
			var action = clasified;
			var page = '#ClasifiedResults';
		}
		if(!load){
			$( page + ' .pagination').val('1');
			var dataGET = 'keyword='+keyword+'&where=&match=exactmatch&category_id='+categoryID+'&location_1=&location_3=&location_4=&dist=&';
			var pagination = 'page=' + $( page + ' .pagination').val() + '&';
			$( page + ' input.searching_').val(dataGET);
			dataGET += pagination;
		}else{
			var pagination = parseInt($( page + ' .pagination').val()) + 1;
			$( page + ' .pagination').val(pagination);
			var pagination = 'page=' + pagination + '&';
			var keyword = $( page + ' .searching_' ).val();
			var dataGET = keyword + pagination;
			//console.log(dataGET);
		}
		$.ajax({
			url: 'http://www.inyourhands.com.mx/appFunctions/?controler=' + c + '&action=search&' + dataGET,
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				/*if(res==false){
					alert('favor de intentar más tarde');
				}else{*/
					$.mobile.changePage($(page),{transition:"slide"});
					action.printListings(res,load);
				//}
			},
			error:function(){
				alert('error');
			}
		});
	},
	listingIndividual : function (id){
		if(id!='load'){
		$.ajax({
			url: 'http://www.inyourhands.com.mx/appFunctions/?controler=app_listing&action=getIndividual&id=' + id,
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					$.mobile.loading( 'hide' );
					$.mobile.changePage($("#ListingIndiv"),{transition:"slide"});
					listing.printIndividual(res);
					//console.log(res);
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
		}else{
			//cargamos otra página
			this.searchListing(false,'N',true,'');
		}
	},
	EventIndividual : function (id){
		if(id!='load'){
		$.ajax({
			url: 'http://www.inyourhands.com.mx/appFunctions/?controler=app_event&action=getIndividual&id=' + id,
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					$.mobile.loading( 'hide' );
					$.mobile.changePage($("#EventIndiv"),{transition:"slide"});
					event.printIndividual(res);
					//console.log(res);
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
		}else{
			//cargamos otra página
			this.searchListing(false,'E',true,'');
		}
	},
	ClasifiedIndividual : function (id){
		if(id!='load'){
		$.ajax({
			url: 'http://www.inyourhands.com.mx/appFunctions/?controler=app_clasified&action=getIndividual&id=' + id,
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					$.mobile.loading( 'hide' );
					$.mobile.changePage($("#ClasifiedIndiv"),{transition:"slide"});
					clasified.printIndividual(res);
					//console.log(res);
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
		}else{
			//cargamos otra página
			this.searchListing(false,'C',true,'');
		}
	},
	listingCategories : function(){
		$.ajax({
			url: 'http://www.inyourhands.com.mx/appFunctions/?controler=app_listing&action=getCategories&',
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					$.mobile.loading( 'hide' );
					listing.chargeCategories(res);
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
	},
	listingAllCategories : function(){
		$.ajax({
			url: 'http://www.inyourhands.com.mx/appFunctions/?controler=app_listing&action=getAllCategories&',
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					$.mobile.loading( 'hide' );
					listing.chargeAllCategories(res);
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
	},
	getGallery : function(action,id,level){
		var newaction = '';
		if(action == 'N'){
			newaction = 'app_listing';
			actionObject = listing;
			var page = '#ListingGallery';
		}else{
			newaction = 'app_event';
			actionObject = event;
			var page = '#EventGallery';
		}
		$.ajax({
			url: 'http://www.inyourhands.com.mx/appFunctions/?controler='+newaction+'&action=getGallery&id='+id+'&',
			type: 'GET',
			dataType: 'jsonp',
			success: function(res) {
				if(res!=false){
					//$.mobile.loading( 'hide' );
					$.mobile.changePage($(page),{transition:"slide"});
					actionObject.chargeGallery(res);
				}else{
					alert('favor de intentar más tarde');
				}
			},
			error:function(){
				alert('error');
			}
		});
	}
}