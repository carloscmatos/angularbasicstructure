$( document ).ready(function() {
 	// Anima Filtro
 	$('#openfilter').click(function() {
    	$('.filter').addClass('active-filters');
	});
 	$('.lightbox').click(function() {
    	$('.filter').removeClass('active-filters');
	});
 	$('.closefilter').click(function() {
    	$('.filter').removeClass('active-filters');
	});

 	// Anima Header busca
 	$('a#abreBusca').click(function() {
    	$('.form-interna').addClass('form-interna-active');
	});
 	$('a#fechaBusca').click(function() {
    	$('.form-interna').removeClass('form-interna-active');
	});
});