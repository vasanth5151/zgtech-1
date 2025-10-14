$(document).ready(function() {
	$(".la.la-close.delete").bind('contextmenu', function(e) {
		return false;
	});
	$(".selecttwo").select2(
	{
		placeholder: "Select",
  		allowClear: true
	});
	$(".selecttwomodal").select2({
		dropdownParent: $('.modal'),
		placeholder: "Select",
  		allowClear: true
	});
	$(document).on("click",".link_open",function(e){
		var link=$(this).attr('data-href');
		window.location.replace(link); 
	});
	$(document).on("click",".shipping_address",function(e){
		if($(this).val()=='Bride')
		{
			$(".s_street").val($(".b_street").val());
			$(".s_address").val($(".b_line").val());
			$(".s_city").val($(".b_city").val());
			$(".s_stste").val($(".b_state").val());
			$(".s_zip").val($(".b_zip").val());
			$(".s_country").val($(".b_country").val());
		}
		else
		{
			$(".s_street").val($(".g_street").val());
			$(".s_address").val($(".g_line").val());
			$(".s_city").val($(".g_city").val());
			$(".s_stste").val($(".g_state").val());
			$(".s_zip").val($(".g_zip").val());	
			$(".s_country").val($(".g_country").val());	
		}
	});
	$("#export-table_filter input").addClass('form-control');
	$("#sorting-table_filter input").addClass('form-control');
	$("#sorting-table_wrapper").addClass('row').addClass('mx-0');
	$("#sorting-table_length").addClass('col-md-6');
	$("#sorting-table_filter").addClass('col-md-6');
	$(document).on("change",".renum_employee",function(){
		if($(this).val()!='')
		{
			$.post($('#site_url').val()+"admin/get_empDesignation", { id : $(this).val()  } , function(data){
				//$('.renum_designation').removeClass('selecttwomodal').removeClass('selecttwo');
				if(data==null || data=='')
				{
					$('select.renum_designation').val('').selectpicker('refresh');
				}
				else
				{
					$('select.renum_designation').val(data).selectpicker('refresh');
				}
			});
		}
	});
	
	$(document).on("change",".dash_company",function(){
		dash_sale($(this).val(),$(".dash_branch").find(":selected").val(),$(".dash_year").val());
	});
	$(document).on("change",".dash_branch",function(){
		dash_sale($(".dash_company").val(),$(this).val(),$(".dash_year").val());
	});
	$(document).on("keyup",".dash_year",function(){
		dash_sale($(".dash_company").val(),$(".dash_branch").find(":selected").val(),$(this).val());
	});
	function dash_sale(cid,bid,year)
	{
		
		$.post($('#site_url').val()+"admin/sale_trans", { cid : cid , bid : bid , year : year } , function(data){
			$(".dsah_sale_trans").empty().append(data);		
		});
		
	}
	$(document).on("change",".ccremselect",function(e){
		e.stopImmediatePropagation();
		if($(this).val()!='')
		{
			$.post($('#site_url').val()+"admin/rem_client", { id : $(this).val()  } , function(data){
				if(data==null || data=='')
				{
					$('.ccphone').val('');
					$('.ccemail').val('');
					$('.ccid').val('');
					
				}
				else
				{
					var obj = jQuery.parseJSON(data);
					$('.ccphone').val(obj.phone);
					$('.ccemail').val(obj.email);
					$('.ccid').val(obj.id);
				}
			});
		}
		else
		{
			$('.ccphone').val('');
			$('.ccemail').val('');
		}
	});
	$(document).on("change",".onlybillCC",function(e){
		e.stopImmediatePropagation();
		var name=$('.debit_entry').find(":selected").text();
		if(name.toLowerCase()=='shoot & travel expense')
		{
			getallbills($(this).find(":selected").val());
		}
	});
	$(document).on("select",".onlybillCC",function(e){
		e.stopImmediatePropagation();
		var name=$('.debit_entry').find(":selected").text();
		if(name.toLowerCase()=='shoot & travel expense')
		{
			getallbills($(this).find(":selected").val());
		}
	});
	function getallbills(client)
	{
		var branch=$('.selectCompany').find(":selected").val();
		var page=$("#uri2").val();
		$.post($('#site_url').val()+"admin/pendingsaleonly", { id : branch , client : client , page : page } , function(data){
			$('.tsbill').empty().append(data).attr("required","required").select2();
		});
	}
	if($('.selectCompany > option').length==1)
	{
		if($(".pagetype").val()!='edit')
		{
			getBranch($(".selectCompany").val());
			getClient($(".selectCompany").val());
			if($(".cc").val()=='cc')
			{
				getClientCC($(".selectCompany").val());
			}
			if($("#uri2").val()=='credit_entry' || $("#uri2").val()=='cheque_entry')
			{
				$('.refno').empty().selectpicker('refresh');
			}
			createQcode($(".selectCompany").val());
		}
	}
	$(document).on("change",".usercompaney",function(e){
		e.stopImmediatePropagation();
		getallBranchs($(this).val());
	});
	function getallBranchs(id)
	{
		if(id!='')
		{
			$.post($('#site_url').val()+"admin/get_branchs", { id : id  } , function(data){
				$('select.branches').empty().append(data).selectpicker('refresh');
			});
		}
		else
		{
			$('select.branches').empty().selectpicker('refresh');
		}
	}
	$(document).on("change",".eusercompaney",function(e){
		e.stopImmediatePropagation();
		getallBranchsedit($(this).val(),$(this).attr('data-bid'));
	});
	function getallBranchsedit(id,lbid)
	{
		if(id!='')
		{
			var branches=$(".oldBranchs"+lbid).val();
			$.post($('#site_url').val()+"admin/get_branchs", { id : id, branches : branches  } , function(data){
				$('select.ebranches'+lbid).empty().append(data).selectpicker('refresh');
			});
		}
		else
		{
			$('select.branches').empty().selectpicker('refresh');
		}
	}
	$(document).on("change",".selectCompany",function(e){
		e.stopImmediatePropagation();
		getBranch($(this).val());
		getClient($(this).val());
		if($(".cc").val()=='cc')
		{
			getClientCC($(this).val());
		}
		if($("#uri2").val()=='credit_entry' || $("#uri2").val()=='cheque_entry')
		{
			$('.refno').empty().selectpicker('refresh');
		}
		if($("#uri2").val()=='sale' && $("#uri3").val()=='new')
		{
			$('input[name="clientType"]:checked').each(function() 
			{
				createCardcode($('.selectCompany').val(),$(this).val());
			});
			createQcode($('.selectCompany').val());
		}
	});
	function getClientCC(id)
	{
		if(id!='')
		{
			$.post($('#site_url').val()+"admin/get_clientCC", { id : id  } , function(data){
				$('select.selectClientCC').empty().append(data).selectpicker('refresh');
			});
		}
		else
		{
			$('select.selectClientCC').empty().selectpicker('refresh');
		}
	}
	$(document).on("change",".tsbill",function(e){
		e.stopImmediatePropagation();
		$(".billdetails").html('');
		var name=$('.debit_entry').find(":selected").text();
		if(name.toLowerCase()!='shoot & travel expense')
		{
			getcardCodeqts($(this).find(":selected").val());
		}
	});
	$(document).on("select",".tsbill",function(e){
		e.stopImmediatePropagation();
		$(".billdetails").html('');
		var name=$('.debit_entry').find(":selected").text();
		if(name.toLowerCase()!='shoot & travel expense')
		{
			getcardCodeqts($(this).find(":selected").val());
		}
	});
	function getcardCodeqts(bill)
	{
		$.post($('#site_url').val()+"admin/getcardCodeqts", { refno : bill } , function(data){
			$('select.selectClientCC').val(data).trigger('change');
		});
	}
	$(document).on("select",".selectCompany",function(e){
		e.stopImmediatePropagation();
		getBranch($(this).val());
		getClient($(this).val());
		if($(".cc").val()=='cc')
		{
			getClientCC($(this).val());
		}
		if($("#uri2").val()=='credit_entry' || $("#uri2").val()=='cheque_entry')
		{
			$('.refno').empty().selectpicker('refresh');
		}
	});
	$(document).on("change",".selectBranch",function(e){
		e.stopImmediatePropagation();
		getEmployee($(this).val());
		if($("#uri2").val()=='credit_entry' || $("#uri2").val()=='cheque_entry')
		{
			getduepayment($(this).val(),$('.creditorType').find(":selected").val());
		}
	});
	$(document).on("select",".selectBranch",function(e){
		e.stopImmediatePropagation();
		getEmployee($(this).val());
		if($("#uri2").val()=='credit_entry' || $("#uri2").val()=='cheque_entry')
		{
			getduepayment($(this).val(),$('.creditorType').find(":selected").val());
		}
	});
	$(document).on("change",".selectClientCC",function(e){
		e.stopImmediatePropagation();
		if($("#uri2").val()=='credit_entry' || $("#uri2").val()=='cheque_entry')
		{
			getduepayment($('.selectBranch').val(),$('.creditorType').find(":selected").val());
		}
		if($("#uri2").val()=='pre_production' || $("#uri2").val()=='post_production')
		{
			getduepaymentPrePost();
		}
	});
	$(document).on("select",".selectClientCC",function(e){
		e.stopImmediatePropagation();
		if($("#uri2").val()=='credit_entry' || $("#uri2").val()=='cheque_entry')
		{
			getduepayment($('.selectBranch').val(),$('.creditorType').find(":selected").val());
		}
		if($("#uri2").val()=='pre_production' || $("#uri2").val()=='post_production')
		{
			getduepaymentPrePost();
		}
	});
	$(document).on("click",".existingClient",function(e){
		e.stopImmediatePropagation();
		validateClient($(this).val());
	});
	$(document).on("change",".debit_entry",function(e){
		e.stopImmediatePropagation();
		getdebit_entry($(this).find(":selected").text());
	});
	$(document).on("select",".debit_entry",function(e){
		e.stopImmediatePropagation();
		getdebit_entry($(this).find(":selected").text());
	});
	getdebit_entry($(".debit_entry").find(":selected").text());
	function getdebit_entry(name)
	{
		$(".billdetails").html('');
		if(name.toLowerCase()=='pre production')
		{
			$(".prePDiv").show();
			$(".prePDiv select").attr("required","required");
			$(".postPDiv").hide();
			$(".postPDiv select").val('').removeAttr("required").select2();
			$(".tsPDiv").hide();
			$(".tsPDiv select").val('').removeAttr("required").select2();
			$(".cardcodeDiv").show();
			$(".cardcodeDiv select").attr("required","required");
			$(".noextra").show();
			//if($("#uri2").val()=='account_debit_entry')
			//{
				$("input[name='amount']").addClass("validateAmt");
			//}
		}
		else if(name.toLowerCase()=='post production')
		{
			$(".prePDiv").hide();
			$(".prePDiv select").val('').removeAttr("required").select2();
			$(".postPDiv").show();
			$(".postPDiv select").attr("required","required");
			$(".tsPDiv").hide();
			$(".tsPDiv select").val('').removeAttr("required").select2();
			$(".cardcodeDiv").show();
			$(".cardcodeDiv select").attr("required","required");
			$(".noextra").show();
			//if($("#uri2").val()=='account_debit_entry')
			//{
				$("input[name='amount']").addClass("validateAmt");
			//}
		}
		else if(name.toLowerCase()=='shoot & travel expense')
		{
			$(".prePDiv").hide();
			$(".prePDiv select").removeAttr("required").select2();
			$(".postPDiv").hide();
			$(".postPDiv select").removeAttr("required").select2();
			$(".tsPDiv").show();
			$(".tsPDiv select").attr("required","required");
			$(".cardcodeDiv").show();
			$(".cardcodeDiv select").attr("required","required");
			$(".noextra").show();
			$("input[name='amount']").removeClass("validateAmt");
		}
		else
		{
			$(".prePDiv").hide();
			$(".prePDiv select").val('').removeAttr("required").select2();
			$(".postPDiv").hide();
			$(".postPDiv select").val('').removeAttr("required").select2();
			$(".tsPDiv").hide();
			$(".tsPDiv select").val('').removeAttr("required").select2();
			$(".cardcodeDiv").hide();
			$(".cardcodeDiv select").val('').removeAttr("required").select2();
			$(".noextra").hide();
			$("input[name='amount']").removeClass("validateAmt");
		}
	}
	$(document).on("change",".creditorType",function(e){
		e.stopImmediatePropagation();
		getcreditor_entry($(this).find(":selected").val());
	});
	$(document).on("select",".creditorType",function(e){
		e.stopImmediatePropagation();
		getcreditor_entry($(this).find(":selected").val());
	});
	getcreditor_entry($(".creditorType").find(":selected").val());
	function getduepayment(branch,type)
	{
		var client=$('.selectClientCC').find(":selected").val();
		var branch=$('.selectCompany').find(":selected").val();
		var page=$("#uri2").val();
		if(+type==1 && branch!='')
		{
			if(client!='')
			{
				$.post($('#site_url').val()+"admin/pendingsale", { id : branch , client : client , page : page } , function(data){
					$('.quotationnoDiv select').empty().append(data).attr("required","required").select2();
					$("input[name='amount']").addClass("validateAmt");
				});
			}
			else
			{
				$('.paybal').html('');
				$(".selectClientCC").val('');
				$(".paysaleQno").val('');
				$("input[name='amount']").removeClass("validateAmt");
			}
		}
		else
		{
			$('.paybal').html('');
			$(".selectClientCC").val('');
			$(".paysaleQno").val('');
		}
	}
	function getduepaymentPrePost()
	{
		var client=$('.selectClientCC').find(":selected").val();
		var branch=$('.selectCompany').find(":selected").val();
		var page=$("#uri2").val();
		if(branch!='' && client!='')
		{
			$.post($('#site_url').val()+"admin/pendingsaleonly", { id : branch , client : client, page : page } , function(data){
				$('.saleQuoteNo').empty().append(data).select2();
			});
		}
		else
		{
			$('.saleQuoteNo').empty().select2();
		}
	}
	function getcreditor_entry(id)
	{
		getduepayment($(".selectBranch").find(":selected").val(),id);
		if(id=='1')
		{
			$(".clientDiv").show();
			$(".clientDiv select").attr("required","required");
			$(".creditorDiv").hide();
			$(".creditorDiv select").val("").removeAttr("required");
			//$(".creditorDiv select").select2();
			$(".quotationnoDiv").show();
		}
		else if(id=='2')
		{
			$(".clientDiv").hide();
			$(".clientDiv select").val("").removeAttr("required");
			//$(".clientDiv select").select2();
			$(".creditorDiv").show();
			$(".creditorDiv select").attr("required","required");
			$(".quotationnoDiv").hide();
			$(".quotationnoDiv select").val("").removeAttr("required");
		}
		else
		{
			$(".clientDiv").hide();
			$(".clientDiv select").val("").removeAttr("required");
			$(".clientDiv select").select2();
			$(".creditorDiv").hide();
			$(".creditorDiv select").val("").removeAttr("required");
			$(".creditorDiv select").select2();
			$(".quotationnoDiv").hide();
			$(".quotationnoDiv select").val("").removeAttr("required");
			$(".quotationnoDiv select").select2();
		}
	}
	$(document).on("click",".sptAddPt",function(){
		var date=$(".sptDate").val();
		var days=$(".sptNDays").val();
		var amount=$(".sptAmount").val();
		var terms=$(".sptTerms").val();
		var regEx = /^\d{2}\/\d{2}\/\d{4}$/;
		if(date!='')
		{
			if(!date.match(regEx))
			{
				failure_notice('Enter Valid Date (DD/MM/YYYY)');
			}
			else if(date=='' && days=='')
			{
				failure_notice('Enter Date or No. Of Dates');
			}
			else if(amount=='')
			{
				failure_notice('Enter Amount');
			}
			else
			{
				var tr='';
				if(days!='')
				{
					$.post($('#site_url').val()+"admin/get_date", { days : days  } , function(data){
						tr='<tr><td><input type="text" name="dates[]" class="form-control" value="'+data+'" readonly tabindex="-1" /></td><td><input type="text" name="amounts[]" class="form-control amounts" value="'+amount+'" readonly tabindex="-1" /><td><input type="text" name="terms[]" class="form-control" value="'+terms+'" readonly tabindex="-1" /></td><td><i class="la la-close red spteRemove"></i></td></tr>';
						$('tbody.salepayterm').append(tr);
					});
				}
				else
				{
					tr='<tr><td><input type="text" name="dates[]" class="form-control" value="'+date+'" readonly tabindex="-1" /></td><td><input type="text" name="amounts[]" class="form-control amounts" value="'+amount+'" readonly tabindex="-1" /><td><input type="text" name="terms[]" class="form-control" value="'+terms+'" readonly tabindex="-1" /></td><td><i class="la la-close red spteRemove"></i></td></tr>';
					$('tbody.salepayterm').append(tr);
				}
				hideshowsale();
				$(".sptDate").val('');
				$(".sptNDays").val('');
				$(".sptAmount").val('');
				$(".sptTerms").val('').select2();
			}
		}
		else if(date=='' && days=='')
		{
			failure_notice('Enter Date or No. Of Dates');
		}
		else if(amount=='')
		{
			failure_notice('Enter Amount');
		}
		else
		{
			var tr='';
			if(days!='')
			{
				$.post($('#site_url').val()+"admin/get_date", { days : days  } , function(data){
					tr='<tr><td><input type="text" name="dates[]" class="form-control" value="'+data+'" readonly tabindex="-1" /></td><td><input type="text" name="amounts[]" class="form-control amounts" value="'+amount+'" readonly tabindex="-1" /><td><input type="text" name="terms[]" class="form-control" value="'+terms+'" readonly tabindex="-1" /></td><td><i class="la la-close red spteRemove"></i></td></tr>';
					$('tbody.salepayterm').append(tr);
				});
			}
			else
			{
				tr='<tr><td><input type="text" name="dates[]" class="form-control" value="'+date+'" readonly tabindex="-1" /></td><td><input type="text" name="amounts[]" class="form-control amounts" value="'+amount+'" readonly tabindex="-1" /><td><input type="text" name="terms[]" class="form-control" value="'+terms+'" readonly tabindex="-1" /></td><td><i class="la la-close red spteRemove"></i></td></tr>';
				$('tbody.salepayterm').append(tr);
			}
			hideshowsale();
			$(".sptDate").val('');
			$(".sptNDays").val('');
			$(".sptAmount").val('');
			$(".sptTerms").val('').select2();
		}
	});
	$(document).on("click",".spteRemove",function(){
		$(this).parent().parent().remove();
		hideshowsale();
	});
	/*function hideshowsale()
	{
		setTimeout(function() {
			var sum = 0;
			if($('.amounts').length==0)
			{
				var sum = 0;
			}
			$('.amounts').each(function(){
				sum += parseFloat(this.value);
			});
			if(+sum==+$(".totalpackage").val())
			{
				$(".btn-save").removeAttr("disabled");
			}
			else
			{
				$(".btn-save").attr("disabled","disabled");
			}
		}, 1000);
	}*/
	$(".newClient").hide();
	function validateClient(val)
	{
		if(+val==0)
		{
			//$('.newClient select').removeClass('selecttwomodal').removeClass('selecttwo');
			$(".newClient select").val('').removeAttr("required").selectpicker('refresh');
			//$('.newClient select').select2( { placeholder: "Select", allowClear: true });
			$(".newClient input").val('').removeAttr("required");
			$(".newClient textarea").val('').removeAttr("required");
			$(".newcustemail").val('').removeAttr("required");
			$(".newClient").hide();
			$(".exitClient select").attr("required","required");
			$(".exitClient input").attr("required","required");
			$(".exitClient textarea").attr("required","required");
			$(".exitClient").show();
		}
		else
		{	
			//$('.exitClient select').removeClass('selecttwomodal').removeClass('selecttwo');
			$(".exitClient select").val('').removeAttr("required").selectpicker('refresh');
			//$('.exitClient select').select2( { placeholder: "Select", allowClear: true });
			$(".exitClient input").val('').removeAttr("required");
			$(".exitClient textarea").val('').removeAttr("required");
			$(".exitClient").hide();
			$(".newClient input").attr("required","required");
			$(".newClient select").attr("required","required");
			$(".newClient textarea").attr("required","required");
			$(".newcustemail").attr("required","required");
			$("#newClientaltphone").removeAttr("required");
			$(".newClient").show();
			
		}
		createCardcode($(".selectCompany").val(),val)
	}
	$(document).on("change",".adcompany",function(){
		createCardcode($(this).val(),1);
	});
	$(document).on("select",".adcompany",function(){
		createCardcode($(this).val(),1);
	});
	function createCardcode(company,chk)
	{
		if(company!='' && +chk==1)
		{
			$.post($('#site_url').val()+"admin/createCardcode", { company : company  } , function(data){
				if(data=='')
				{
					$('#newClientCode').val('').removeAttr("readonly").removeAttr("tabindex");
				}
				else
				{
					$('#newClientCode').val(data).attr("readonly","readonly").attr("tabindex","-1");
				}
			});
		}
		else
		{
			$('#newClientCode').val('').removeAttr("readonly").removeAttr("tabindex");
		}
	}
	$(document).on("keyup",'input[name="quotationNo"]',function(e){
		e.stopImmediatePropagation();
		$.post($('#site_url').val()+"admin/validateqno", { qno : $(this).val()  } , function(data){
			if(data!='')
			{
				$('input[name="quotationNo"]').val('');
				failure_notice('Quotation No already exist');
			}
		});
	});
	$(document).on("keyup",'input[name="newClientCode"]',function(e){
		e.stopImmediatePropagation();
		$.post($('#site_url').val()+"admin/validnccode", { ccode : $(this).val()  } , function(data){
			if(data!='')
			{
				$('input[name="newClientCode"]').val('');
				failure_notice('Card Code already exist');
			}
		});
	});
	$(document).on("change",".rm_lmt",function(e)
    {
        var id=$(this).attr('data-id');
        var limit=$(this).val();
        if($.isNumeric(limit))
        {
	        $.post($('#site_url').val()+'admin/c_rem', { id : id , limit : limit} , function(data)
	        {
	        	success_notice('Limit Updated.');
	        });
    	}
    	else
    	{
    		failure_notice('Enter Numeric Value');
    		$(this).val('').focus();
    	}
    });
	function createQcode(company)
	{
		if(company!='')
		{
			$.post($('#site_url').val()+"admin/createQcode", { company : company  } , function(data){
				if(data=='')
				{
					$('input[name="quotationNo"]').val('').removeAttr("readonly").removeAttr("tabindex");
				}
				else
				{
					$('input[name="quotationNo"]').val(data).attr("readonly","readonly").attr("tabindex","-1");
				}
			});
		}
		else
		{
			$('input[name="quotationNo"]').val('').removeAttr("readonly").removeAttr("tabindex");
		}
	}
	function getEmployee(id)
	{
		if(id!='')
		{
			$.post($('#site_url').val()+"admin/get_employee", { id : id  } , function(data){
				$('select.selectEmployee').empty().append(data).selectpicker('refresh');
			});
		}
		else
		{
			$('select.selectEmployee').empty().selectpicker('refresh');
		}
	}
	function getBranch(id)
	{
		if(id!='')
		{
			$.post($('#site_url').val()+"admin/get_branch", { id : id  } , function(data){
				$('select.selectBranch').empty().append(data).selectpicker('refresh');
			});
		}
		else
		{
			$('select.selectBranch').empty().selectpicker('refresh');
		}
	}
	function getClient(id)
	{
		if(id!='')
		{
			$.post($('#site_url').val()+"admin/get_client", { id : id  } , function(data){
				$('select.selectClient').empty().append(data).selectpicker('refresh');
			});
		}
		else
		{
			$('select.selectClient').empty().selectpicker('refresh');
		}
	}
	function getService(id)
	{
		if(id!='')
		{
			$.post($('#site_url').val()+"admin/get_service", { id : id  } , function(data){
				$('select.selectService').empty().append(data).selectpicker('refresh');
			});
		}
		else
		{
			$('select.selectService').empty().selectpicker('refresh');
		}
	}
	$(document).on("change",".eventYear",function(){
		getEventDates($(this).val(),$(".eventMonth").val());
	});
	$(document).on("select",".eventYear",function(){
		getEventDates($(this).val(),$(".eventMonth").val());
	});
	$(document).on("change",".eventMonth",function(){
		getEventDates($(".eventYear").val(),$(this).val());
	});
	$(document).on("select",".eventMonth",function(){
		getEventDates($(".eventYear").val(),$(this).val());
	});
	function getEventDates(year,month)
	{
		if(year!='' && month!='')
		{
			$.post($('#site_url').val()+"admin/get_event_dates", { year : year, month : month  } , function(data){
				if(data!='')
				{
					//$('.eventDates').removeClass('selecttwo');
					$('select.eventDates').empty().append(data).selectpicker('refresh');
				}
				else
				{
					//$('.eventDates').removeClass('selecttwo');
					$("select.eventDates").empty().selectpicker('refresh');
				}
			});
		}
		else
		{
			//$('.eventDates').removeClass('selecttwo');
			$("select.eventDates").empty().selectpicker('refresh');
		}
	}
	$(document).on("change",".agent_fill",function(){
		agent_fillr($(this).val());
	});
	$(document).on("select",".agent_fill",function(){
		agent_fillr($(this).val());
	});
	function agent_fillr(id)
	{
		if(id!='')
		{
			$.post($('#site_url').val()+"admin/agent_fill", { id : id  } , function(data){
				var obj = jQuery.parseJSON(data);
				$('.fill_return_client').html('<center>'+obj.bokountn+'</center>');
				$('.fill_return_currency').html('<center>'+obj.totalCredit+'</center>');
			});
		}	
	}
	$(document).on("change",".selectClient",function(){
		selectClientOrder($(this).val());
	});
	$(document).on("select",".selectClient",function(){
		selectClientOrder($(this).val());
	});
	function selectClientOrder(id)
	{
		if(id!='')
		{
			$.post($('#site_url').val()+"admin/selectClientOrder", { id : id  } , function(data){
				if(data!='')
				{
					var obj=jQuery.parseJSON(data);
					$(".clientName").val(obj.clientName);
					$(".brideClientName").val(obj.brideClientName);
					$(".phone").val(obj.phone);
					$(".address").val(obj.address);
				}
				else
				{
					$(".clientName").val('');
					$(".brideClientName").val('');
					$(".phone").val('');
					$(".address").val('');
				}
			});
		}
	}
	$(document).on("change",".selectTravelPurpose",function(){
		if($(this).val()=='1')
		{
			$(".cardcodeDivTS").hide();
			$(".cardcodeDivTS select").removeAttr("required");
		}
		else
		{
			$(".cardcodeDivTS").show();
			$(".cardcodeDivTS select").attr("required","required");
		}
	});
	$(document).on("change",".save_branch",function(e){
		e.stopImmediatePropagation();
		var code=$(this).find(":selected").attr('data-code');
		$(this).parents('.modal-body').children().children().children().children().children('#code').val(code);
	});
	$(document).on("select",".save_branch",function(e){
		e.stopImmediatePropagation();
		var code= $(this).find(":selected").attr('data-code');
		$(this).parents('.modal-body').children().children().children().children().children('#code').val(code);
	});
	$(document).on("change",".billno",function(e){
		e.stopImmediatePropagation();
		getcardCode($(this).find(":selected").val(),$('.debit_entry').find(":selected").text());
	});
	$(document).on("select",".billno",function(e){
		e.stopImmediatePropagation();
		getcardCode($(this).find(":selected").val(),$('.debit_entry').find(":selected").text());
	});
	function getcardCode(bill,text)
	{
		$.post($('#site_url').val()+"admin/getcardCode", { refno : bill , type : text } , function(data){
			$('select.selectClientCC').val(data).trigger('change');
		});
		$.post($('#site_url').val()+"admin/getcardCodeQuotNo", { refno : bill , type : text } , function(data){
			$('.billdetails').html(data);
		});
	}
	$(document).on("change",".expense_type",function(e){
		e.stopImmediatePropagation();
		show_expense_type($(this).find(":selected").val());
	});
	$(document).on("select",".expense_type",function(e){
		e.stopImmediatePropagation();
		show_expense_type($(this).find(":selected").val());
	});
	function show_expense_type(val)
	{
		if(+val==2)
		{
			$(".MpDiv").show();
		}
		else
		{
			$(".MpDiv").hide();
			$(".MpDiv select").val('').select2();
		}
	}
	$(document).on("change",".pre_vendor",function(e){
		e.stopImmediatePropagation();
		getpre_bill($(this).val());
	});
	$(document).on("select",".pre_vendor",function(e){
		e.stopImmediatePropagation();
		getpre_bill($(this).val());
	});
	function getpre_bill(ven)
	{
		$('.billdetails').html('');
		var page=$("#uri2").val();
		$.post($('#site_url').val()+"admin/getpre_bill", { id : ven, page : page } , function(data){
			$('select.pre_bill').empty().append(data);
		});
	}
	$(document).on("change",".cevendor",function(e){
		e.stopImmediatePropagation();
		getvendor_bill($(this).val());
	});
	$(document).on("select",".cevendor",function(e){
		e.stopImmediatePropagation();
		getvendor_bill($(this).val());
	});
	function getvendor_bill(ven)
	{
		$('.billdetails').html('');
		if(ven!='0')
		{
			$.post($('#site_url').val()+"admin/getvendor_bill", { id : ven } , function(data){
				$('select.venbillno').empty().append(data);
			});
		}
		else
		{
			$('select.billno').empty();
		}
	}
	$(document).on("change",".post_vendor",function(e){
		e.stopImmediatePropagation();
		getpost_bill($(this).val());
	});
	$(document).on("select",".post_vendor",function(e){
		e.stopImmediatePropagation();
		getpost_bill($(this).val());
	});
	function getpost_bill(ven)
	{
		$('.billdetails').html('');
		var page=$("#uri2").val();
		$.post($('#site_url').val()+"admin/getpost_bill", { id : ven, page : page } , function(data){
			$('select.post_bill').empty().append(data);
		});
	}
	$(document).on("change",".paysaleQno",function(e){
		e.stopImmediatePropagation();
		getpaysaleQno($(this).val());
	});
	$(document).on("select",".paysaleQno",function(e){
		e.stopImmediatePropagation();
		getpaysaleQno($(this).val());
	});
	if($(".ccproedit").val()=='ccedit')
	{
		$('select.selectClientCC').val($(".ccode").val());
	}
	function getpaysaleQno(ven)
	{
		if(ven!='')
		{
			$.post($('#site_url').val()+"admin/getbal_quotationNo", { id : ven } , function(data){
				$('.paybal').html('').html(data);
				$("input[name='amount']").addClass("validateAmt");
			});
		}
		else
		{
			$('.paybal').html('');
			$("input[name='amount']").removeClass("validateAmt");
		}
	}
	$(document).on("change",".postserviceAlbum",function(e){
		e.stopImmediatePropagation();
		postserviceAlbum($(this).find(":selected").text());
	});
	$(document).on("select",".postserviceAlbum",function(e){
		e.stopImmediatePropagation();
		postserviceAlbum($(this).find(":selected").text());
	});
	$(document).on("keyup",".validateAmt",function(e){
		e.stopImmediatePropagation();
		var pay=$(this).val();
		var bal=$('.pbl').text();
		if(+pay>+bal)
		{
			failure_notice('Entered amount is greater than balance');
			$(this).val('').focus();
		}
	});
	$(document).on("keyup",".validateAmtpay",function(e){
		e.stopImmediatePropagation();
		var pay=$(this).val();
		var bal=$(this).parent().parent().children().children('.pbl').val();
		if(+pay>+bal)
		{
			failure_notice('Entered amount is greater than balance');
			$(this).val('').focus();
		}
	});
	$(document).on("change",".venbillno",function(e){
		e.stopImmediatePropagation();
		venbillnoBal($(this).val());
	});
	$(document).on("select",".venbillno",function(e){
		e.stopImmediatePropagation();
		venbillnoBal($(this).val());
	});
	function venbillnoBal(bill)
	{
		$.post($('#site_url').val()+"admin/venbillnoBal", { refno : bill } , function(data){
			$('.billdetails').html(data);
		});
	}
	function postserviceAlbum(val)
	{
		if(val!='')
		{
			var string=val.toLowerCase();
			var sub_string='album';
			var result=string.includes(sub_string);
			if(result==true || result==='true')
			{
				$(".DivSheets").show();
				$(".DivSheets select").attr("required","required");
			}
			else
			{
				$(".DivSheets").hide();
				$(".DivSheets select").removeAttr("required");
			}
		}
		else
		{
			$(".DivSheets").hide();
			$(".DivSheets select").removeAttr("required");
		}
	}
	$(document).on("change",".termsType",function(e){
		e.stopImmediatePropagation();
		termsType($(this).val(),$("input[name='termsMonth']").val());
	});
	$(document).on("select",".termsType",function(e){
		e.stopImmediatePropagation();
		termsType($(this).val(),$("input[name='termsMonth']").val());
	});
	$(document).on("keyup",".termsMonthVal",function(e){
		e.stopImmediatePropagation();
		if($.isNumeric($(this).val()))
		{
			termsType($(".termsType").val(),$(this).val());
		}
		else
		{
			$(this).val('');
			$(".payments_terms table tbody").empty();
			failure_notice('Enter Numeric Value');
		}
	});
	$(document).on("keyup","input[name='amount']",function(e){
		e.stopImmediatePropagation();
		if($.isNumeric($(this).val()))
		{
			termsType($(".termsType").val(),$('.termsMonthVal').val());
		}
		else
		{
			$(this).val('');
			$(".payments_terms table tbody").empty();
			failure_notice('Enter Numeric Value');
		}
	});
	function termsType(val,terms)
	{
		var date=$("input[name='date']").val();
		var amount=$("input[name='amount']").val();
		if(+val==0)
		{
			$(".termsMonth").hide();
			$(".termsMonthVal").val('').removeAttr("required");
		}
		else
		{
			$(".termsMonth").show();
			$(".termsMonthVal").attr("required","required");
		}
		if(val!='')
		{
			$.post($('#site_url').val()+"admin/salaryAdvanceTerms", { type : val, terms : terms, date : date, amount : amount } , function(data){
				$(".payments_terms").show();
				$(".payments_terms table tbody").empty().append(data);
				$(".payments_terms table td select.selecttwo").select2();
			});
		}
	}
	$(document).on("click",".printBtn",function(e){
		e.preventDefault();
		var sURL=$(this).attr('href');
		printPage(sURL);
	});
	$(document).on("change",".payrollMonth",function(e){
		e.stopImmediatePropagation();
		payrollCheck($(this).find(":selected").val(),$(".payrollYear").val());
	});
	$(document).on("select",".payrollMonth",function(e){
		e.stopImmediatePropagation();
		payrollCheck($(this).find(":selected").val(),$(".payrollYear").val());
	});
	$(document).on("keyup",".payrollYear",function(e){
		e.stopImmediatePropagation();
		payrollCheck($(".payrollMonth").find(":selected").val(),$(this).val());
	});
	function payrollCheck(month,year)
	{
		if(month!='' && year!='')
		{
			$.post($('#site_url').val()+"admin/payrollcheck", { month : month , year : year } , function(data){
				if(data!='')
				{
					$(".fileFld").hide();
					$(".fileDelete").show();
				}
				else
				{
					$(".fileFld").show();
					$(".fileDelete").hide();
				}
			});
		}
	}
	$(document).on("click",".deleteOld",function(e){
		e.stopImmediatePropagation();
		var month = $(".payrollMonth").find(":selected").val();
		var year = $(".payrollYear").val();
		$.post($('#site_url').val()+"admin/payrolldelete", { month : month , year : year } , function(data){
			if(data=='yes')
			{
				$(".fileFld").show();
				$(".fileDelete").hide();
				success_notice('Old Data Deleted, Please Upload!');
			}
		});
	});
	function printPage(sURL)
	{
		var oHiddFrame = document.createElement("iframe");
		oHiddFrame.onload = setPrint;
		oHiddFrame.style.visibility = "hidden";
		oHiddFrame.style.position = "fixed";
		oHiddFrame.style.right = "0";
		oHiddFrame.style.bottom = "0";
		oHiddFrame.src = sURL;
		document.body.appendChild(oHiddFrame);
	}
	function setPrint()
	{
		this.contentWindow.__container__ = this;
		this.contentWindow.onbeforeunload = closePrint;
		this.contentWindow.onafterprint = closePrint;
		this.contentWindow.focus();
		this.contentWindow.print();
	}
	function closePrint()
	{
		document.body.removeChild(this.__container__);
	}
	function failure_notice(msg)
	{
		new Noty({
			type: 'error',
			layout: 'topRight',
			text: msg,
			progressBar: true,
			timeout: 5000,
			animation: {
				open: 'animated bounceInRight',
				close: 'animated bounceOutRight'
			}
		}).show();
	}
	function success_notice(msg)
	{
		new Noty({
			type: 'success',
			layout: 'topRight',
			text: msg,
			progressBar: true,
			timeout: 5000,
			animation: {
				open: 'animated bounceInRight',
				close: 'animated bounceOutRight'
			}
		}).show();
	}
});
function delete_confirm()
{
	return confirm('Are you sure want to delete?');
}