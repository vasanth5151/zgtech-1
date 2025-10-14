(function ($) {

    'use strict';
	
    // ------------------------------------------------------- //
    // Datepicker
    // ------------------------------------------------------ //	
	$(function () {
		//default date range picker
		$('#daterange').daterangepicker({
			autoApply:true
		});

		//date time picker
		$('#datetime').daterangepicker({
			timePicker: true,
			timePickerIncrement: 30,
			locale: {
				format: 'MM/DD/YYYY h:mm A'
			}
		});

		//single date
		$('.modal_date').daterangepicker({
			singleDatePicker: true,
			locale: {
				format: 'DD/MM/YYYY',
			}
		});
		$('.date_pick').daterangepicker({
			singleDatePicker: true,
			locale: {
				format: 'DD/MM/YYYY',
			}
		});
		$('.date_picker').daterangepicker({
			singleDatePicker: true,
			locale: {
				format: 'DD/MM/YYYY',
			}
		});
		//datetime
		$('.datetime_single').daterangepicker({
			timePicker: true,
			singleDatePicker: true,
			timePickerIncrement: 5,
			locale: {
				format: 'DD/MM/YYYY h:mm A',
			}
		});
		$('.datetime_single_sec').daterangepicker({
			timePicker: true,
			singleDatePicker: true,
			timePickerIncrement: 1,
			locale: {
				format: 'DD/MM/YYYY h:mm A',
			}
		});
		$('.modal_date').daterangepicker({
			timePicker: true,
			singleDatePicker: true,
			timePickerIncrement: 1,
			locale: {
				format: 'DD/MM/YYYY h:mm A',
			}
		});
		$('.datetime_single_invoice').daterangepicker({
			timePicker: true,
			singleDatePicker: true,
			timePickerIncrement: 5,
			locale: {
				format: 'DD/MM/YYYY h:mm A',
			}
		});
	});
	
})(jQuery);