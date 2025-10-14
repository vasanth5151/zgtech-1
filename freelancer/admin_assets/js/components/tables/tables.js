(function ($) {

	'use strict';

	// ------------------------------------------------------- //
	// Auto Hide
	// ------------------------------------------------------ //	

	$(function () {
		$('#sorting-table').DataTable({
			"pageLength": 25,
			"lengthMenu": [
				[25, 50, 100, -1],
				[25, 50, 100, "All"]
			],
			"order": []
		});
	});

	$(function () {
		$('#export-table').DataTable({
			dom: 'Bfrtip',
			"order": [],
			"pageLength": 25,
			buttons: {
				buttons: [{
					extend: 'copy',
					text: 'Copy',
					title: $('h1').text(),
					exportOptions: {
						columns: ':not(.noprint)'
					},
					footer: true
				},{
					extend: 'excel',
					text: 'Excel',
					title: $('h1').text(),
					exportOptions: {
						columns: ':not(.noprint)'
					},
					footer: true
				},{
					extend: 'csv',
					text: 'Csv',
					title: $('h1').text(),
					exportOptions: {
						columns: ':not(.noprint)'
					},
					footer: true
				},{
					extend: 'pdf',
					text: 'Pdf',
					title: $('h1').text(),
					exportOptions: {
						columns: ':not(.noprint)'
					},
					footer: true
				},{
					extend: 'print',
					text: 'Print',
					title: $('h1').text(),
					exportOptions: {
						columns: ':not(.noprint)'
					},
					footer: true,
					autoPrint: true
				}],
				dom: {
					container: {
						className: 'dt-buttons'
					},
					button: {
						className: 'btn btn-primary'
					}
				}
			}
		});
	});

})(jQuery);