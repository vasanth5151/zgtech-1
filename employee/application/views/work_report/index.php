<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Website Title -->
    <title>Work Report</title>
    
    <!-- Styles -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:400,400i,600,700,700i&amp;subset=latin-ext" rel="stylesheet">

    <link href="<?php echo base_url('admin_assets/client/css/bootstrap.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('admin_assets/client/css/fontawesome-all.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('admin_assets/client/css/swiper.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('admin_assets/client/css/magnific-popup.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('admin_assets/client/css/styles.css?v='.time()); ?>" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.min.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">
    <link rel="stylesheet" href="<?php echo base_url('assets/css/chosen.css')?>"> 
    <link rel="icon" href="<?= base_url('admin_assets/img/favcon.png')?>" type="image/gif" sizes="16x16">
    <link rel="stylesheet" href="<?php echo base_url('assets/css/style.css')?>">
    <style>
        .turquoise {color: #f70580;}
        label {
            display: contents;
        }
        span{
            font-size: 17px;
        }
        h5{color: #E92D96;}
        .red{
            color: red;
            font-size: 30px;
        }
        .header .header-content {
           padding-top: 2rem;
            padding-bottom: 8rem;
        }
        .form-1 {
            background-color: white;
            padding-top: 0.5rem;
            padding-bottom: 2.25rem;
        }
        .form-control-input, .form-control-select {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
        }
        input[type="text"]
        {
            padding:5px 0 5px 10px;
        }
        .select2-container--default .select2-selection--single {            
            
            border-radius: 0px !important;
            height: 38px !important;
            padding-top: 7px !important;
        }
        
        .btn-solid-reg {
            
            border: 0.125rem;
            background-color:#00bfd8;
        }
        .btn-save {
            
            border: 0.125rem;
            background-color:#f70580;
        }
        .btn-save:hover {
            background-color:#f70580;            
            color: #00bfd8;
            text-decoration: none;
        }
        .avatar
        {
            width: 100px;
            margin-top: -15px;
            margin-left: -70px;
        }
        /**
        {
            overflow-x: hidden !important;        }*/
    </style>
</head>

<body data-spy="scroll" data-target=".fixed-top">
    <header id="header" class="">
        <div class="header-content">
            <div class="container">
                <div class="row">
                    <div class="12">
                        
                    </div>
                    
                </div> <!-- end of row -->
            </div> <!-- end of container -->
        </div> <!-- end of header-content -->
    </header>
    <!-- Request -->
    <div id="request" class="form-1">
        <div class="container-fluid">
            <div class="row">
                
                <div class="col-md-8">
                    
                    <div class="text-container" style="text-align: left; margin-top: 45px; margin-left: 2rem;">

                                <h1><span class="turquoise" style="font-size: 35px;">Work</span>Report 
                                <?php
                                if($this->session->userdata('true_message')!=NULL)
                                {
                                    ?>
                                    <span style="color:green;">
                                        <?php
                                    echo $this->session->userdata('true_message'); $this->session->unset_userdata('true_message');
                                    ?>
                                    
                                    <?php
                                }
                                ?>
                                <?php
                                if($this->session->userdata('false_message')!=NULL)
                                {
                                    ?><span style="color:red;">
                                        <?php
                                    echo $this->session->userdata('false_message'); $this->session->unset_userdata('false_message');
                                    ?>
                                    <?php
                                }
                                ?>
                                </span></h1>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="text-container" style="text-align: right;">
                        <a id="user" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link"><img src="<?php echo base_url('admin_assets/img/logo.png')?>" alt="..." class="avatar"></a>
                    </div>
                </div>
            </div>
            <div class="row" style="margin-top: 20px">
                <div class="col-lg-12">
                   
                                        <div class="widget-body">
                                        <?php $attr=array("class"=>"needs-validation form-horizontal","method"=>"post","autocomplete"=>"off");echo form_open('',$attr); ?>
                                            <div class="col-md-12">
                                                <div class="row">
                                                    
                                                    <div class="col-md-4">
                                                        <label>Date<span class="red">*</span></label>
                                                        <input type="text" placeholder="DD/MM/YYYY" required="required" name="date" class="form-control date datepicker">
                                                        <div class="invalid-feedback">Enter Date</div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <label>Select Employee<span class="red">*</span></label>
                                                        <select name="employee" required="required" class="form-control custom-select selecttwo selectEmployee" data-live-search="true">
                                                            <option value=""></option>
                                                            <?php

                                                        if($employee!=false)

                                                        foreach($employee as $c)

                                                        {

                                                            ?>

                                                            <option value="<?= $c['id'] ?>"><?= $c['name'] ?></option>

                                                            <?php

                                                        }

                                                        ?>
                                                        </select>
                                                        <div class="invalid-feedback">Select Employee</div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <label>Select Project<span class="red">*</span></label>
                                                        <select name="project" required class="form-control custom-select selecttwo selectProject">
                                                            <option value=""></option>
                                                        <?php

                                                        if($project!=false)

                                                        foreach($project as $c)

                                                        {

                                                            ?>

                                                            <option value="<?= $c['fld_id'] ?>"><?= $c['fld_name'] ?></option>

                                                            <?php

                                                        }

                                                        ?>
                                                        </select>
                                                        <div class="invalid-feedback">Select Project</div>
                                                    </div>
                                                    <div class="col-md-12 form-group">
                                                        <label for="message">Work Details <span class="red">*</span></label>
                                                        <textarea required="required" name="descreption" id="message" class="form-control" rows="2"></textarea> 
                                                        <div class="invalid-feedback">Enter Work Details</div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <label>From<span class="red">*</span></label>
                                                        <input type="time" required="required" name="from" class="form-control time1 timepicker" id="time1">
                                                        <div class="invalid-feedback">Enter From</div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <label>To<span class="red">*</span></label>
                                                        <input type="time" required="required" name="to" class="form-control time2 timepicker" id="time2">
                                                        <div class="invalid-feedback">Enter To</div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <label>Total Hours<span class="red">*</span></label>
                                                        <input type="text" required="required" name="total_hours" class="form-control hours" >
                                                        <div class="invalid-feedback">Enter Total Hours</div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <label>Status<span class="red">*</span></label>
                                                        <select  name="status" class="form-control" required>
                                                            <option>-----</option>
                                                            <option value="0">Pending</option>
                                                            <option value="1">Completed</option>
                                                        </select>
                                                        <div class="invalid-feedback">Select Status</div>
                                                    </div>
                                                </div>
                                                <div class="em-separator separator-dashed">
                                                    <br>
                                                </div>
                                                <div class="text-right" style="margin-top: 93px">
                                                    <input type="submit" name="send" value="Submit" class="btn btn-gradient-01 btn-save btn-solid-reg">
                                                    <button class="btn btn-shadow btn-solid-reg" type="reset">Reset</button>
                                                </div>
                                            </div>
                                        <?= form_close() ?>
                                    </div>
                                </div>
                                       
                </div> <!-- end of col -->               
            </div> <!-- end of row -->
        </div> <!-- end of container -->
    </div> <!-- end of form-1 -->
    
    
    <!-- Scripts -->
    

    <script src="<?php echo base_url('admin_assets/client/js/jquery.min.js') ?>"></script> <!-- jQuery for Bootstrap's JavaScript plugins -->
    <script src="<?php echo base_url('admin_assets/client/js/popper.min.js') ?>"></script> <!-- Popper tooltip library for Bootstrap -->
    <script src="<?php echo base_url('admin_assets/client/js/bootstrap.min.js') ?>"></script> 
    <!-- Bootstrap framework -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
    <script src="<?php echo base_url('admin_assets/client/js/jquery.easing.min.js') ?>"></script> <!-- jQuery Easing for smooth scrolling between anchors -->
    <script src="<?php echo base_url('admin_assets/client/js/swiper.min.js') ?>"></script> <!-- Swiper for image and text sliders -->
    <script src="<?php echo base_url('admin_assets/client/js/jquery.magnific-popup.js') ?>"></script> <!-- Magnific Popup for lightboxes -->
    <script src="<?php echo base_url('admin_assets/client/js/validator.min.js') ?>"></script> <!-- Validator.js - Bootstrap plugin that validates forms -->
    <script src="<?php echo base_url('admin_assets/client/js/scripts.js') ?>"></script> <!-- Custom scripts -->
    <script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>
      <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    
    <script src="<?php echo base_url('admin_assets/js/script.js?v='.time()); ?>"></script>
    <script src="<?php echo base_url('admin_assets/js/differenceHours.js?v='.time()); ?>"></script>
    <script>
       /* $(function () {
            function calculate() {
                 var hours = ( new Date(.date + .Time2) - new Date(.date + .Time1) ) / 1000 / 60 / 60; 
                 $(".Hours").val(hours);
             }
             $(".Time1,.Time2").change(calculate);
             calculate();

        });*/
        $(document).ready(function() {
            $('.datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
            /*$('.timepicker').timepicker({
                timeFormat: 'h:mm a',
                interval: 5,
                dynamic: false,
                dropdown: true,
                scrollbar: true,
                change: calctimeduri
            });*/
            $('.time1').on('keyup change',function () {
                //alert($(".time1").val());
                //alert($(".time2").val());
                differenceHours.diff_hours('time1', 'time2', 'hours');
            });
            $('.time2').on('keyup change',function () {
                //alert($(".time1").val());
                //alert($(".time2").val());
                differenceHours.diff_hours('time1', 'time2', 'hours');
            });


/*function timeobject(t){
  a = t.replace('AM','').replace('PM','').split(':');
  h = parseInt(a[0]);
  m = parseInt(a[1]);
  ampm = (t.indexOf('AM') !== -1 ) ? 'AM' : 'PM';
  return {hour:h,minute:m,ampm:ampm};
}

function timediff(s,e){
  s = timeobject(s);
  e = timeobject(e);
  //e.hour = (e.ampm === 'PM' &&  s.ampm !== 'PM' && e.hour < 12) ? e.hour + 12 : e.hour;
  hourDiff = Math.abs(e.hour-s.hour);
  minuteDiff = e.minute - s.minute;

  if(minuteDiff < 0){
    minuteDiff = Math.abs(60 + minuteDiff);
    hourDiff = hourDiff - 1;
  }
  minuteDiffString = minuteDiff.toString();
    if(minuteDiffString.length < 2)
    {
        minuteDiff = "0"+minuteDiff;
    }
  return hourDiff+':'+minuteDiff;
}*/


            function calctimeduri()
            {
                alert($(".time1").val());
                alert($(".time2").val());
                differenceHours.diff_hours('time1', 'time2', 'hours');
                /*var starttime=$(".time1").val();
                var endtime=$(".time2").val();
                difference = timediff(starttime,endtime);
                if(difference!='NaN:NaN')
                {
                    //alert(difference);
                    $(".hours").val(difference);
                }*/               
            }
        });
    </script>
    
</body>
</html>