customUI = function () {
    var Tab = function () {
        $('#tab a:first').tab('show');
        $('#tab a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        });
    }

    var sideNav = function () {

        /* var sidebarHeight;
        if ($(window).height() < $(document).height()) {
        sidebarHeight = $(document).height();
        }
        else {
        sidebarHeight = $(window).height();
        }*/

        //set sidebar Height
        var leftSideBar_Height = $(window).height();
     //   var leftSideBar_Height = $(window).height() - ($('header').outerHeight() + 1);
        $('.left-sidebar').css('height', leftSideBar_Height);
        // var menuHolderHeight = leftSideBar_Height - (75 + $('aside.left-sidebar > h3').outerHeight() + $('aside.left-sidebar > footer').outerHeight());
        var menuHolderHeight = leftSideBar_Height - ( 52 + $('aside.left-sidebar > h3').outerHeight() + $('aside.left-sidebar > footer').outerHeight());
        $('nav.left-menu').css({ 'height': menuHolderHeight });
        var menuInnerHeight = $('nav.left-menu').find('ul').outerHeight();
        //alert($('nav.left-menu').scrollTop(100));

        $(document).on("click", 'i.arrow.fa-caret-down', function () {
            var heightTemp = $('nav.left-menu').scrollTop() + menuHolderHeight;
            // alert(heightTemp);
            if (menuInnerHeight > heightTemp) {
                heightTemp = $('nav.left-menu').scrollTop() + 41;
                $('nav.left-menu').scrollTop(heightTemp);
            }
        });

        $(document).on("click", 'i.arrow.fa-caret-up', function () {
            //  var heightTemp = $('nav.left-menu').scrollTop() + menuHolderHeight;
            if ($('nav.left-menu').scrollTop() > 0) {
                heightTemp = $('nav.left-menu').scrollTop() - 41;
                $('nav.left-menu').scrollTop(heightTemp);
            }

        });

        //alert(menuHolderHeight);

        $(document).on("click", '.sub-menu a', function () {
            $(this).parents('.sub-menu').css('display', 'none');
        });

        $(document).on("mouseenter", '.left-menu li.hasChild', function () {

            $('.left-menu').css('width', '1000px');
            $('.left-menu li').find('.sub-menu').css('display', 'none');
            $(this).find('.sub-menu').css('display', 'inherit');
        });

        $(document).on("mouseleave", '.left-menu li.hasChild', function () {
            $('.left-menu li').find('.sub-menu').css('display', 'none');
            $(this).find('.sub-menu').css('display', 'none');
             $('.left-menu').css('width', 'auto');
        });

        $('.close-menu').click(function (e) {
            e.preventDefault();
            $('.sub-menu').css('display', 'none');
            $(this).toggleClass('collapse');
            if ($(this).hasClass('collapse')) {
                $(this).next().css('visibility', 'hidden');
                $('.left-menu').toggleClass('collapse1');
               $('.left-menu li').find('.menu-icon').next().fadeOut(100);
              //  $('li.hasChild > a').toggleClass('noarrow');
                $('aside.left-sidebar').animate({ 'width': '59px' }, 500);
                $('.left-sidebar').find('footer').fadeOut(100);
                $('.left-sidebar').parent().animate({ 'padding-left': '60px' }, 500, function () { });
                $('.widgets-notifications').animate({ 'width': ($(window).width() - 160) }, 500);
            }
            else {
                $('.left-menu').toggleClass('collapse1');
                $('aside.left-sidebar').animate({ 'width': '250px' }, 500);
              //  $('li.hasChild > a').toggleClass('noarrow');
                $('.left-sidebar').parent().animate({ 'padding-left': '250px' }, 500, function () {
				$('.left-menu li').find('.menu-icon').next().fadeIn(400);
				$('.close-menu').next().css('visibility', 'visible');
				$('.left-sidebar').find('footer').fadeIn(400); });
                $('.widgets-notifications').animate({ 'width': ($(window).width() - 350) }, 500);

            }

        })

        $(document).on("mouseover", '.left-menu li', function (e) {
            var subMenuHeight = $(this).find('.sub-menu').height();
            var menuTopPosition = $('header').outerHeight() + $(this).position().top;
            var menuY_position = e.clientY;
            var diffValue = $(window).height() - menuY_position;
            if (subMenuHeight > diffValue)
                $(this).find('.sub-menu').css({ top: 'auto', bottom: '0px' });


            //subMenuHeight


        });
        $(document).on("mouseleave", '.left-menu li', function (e) {
            $(this).find('.sub-menu').attr("style", "");
        });

		$('#collapseOne').on('shown.bs.collapse', function () {
		   $(".fa").removeClass("fa-caret-right").addClass("fa-caret-down");
		});

		$('#collapseOne').on('hidden.bs.collapse', function () {
		   $(".fa").removeClass("fa-caret-down").addClass("fa-caret-right");
		});
    }
  /*  var $scrollbar = $("#scrollbar1");
	$scrollbar.tinyscrollbar();*/
    var init = function () {

        if ($('#tab').length != 0)
            Tab();
        sideNav();



        $('.widgets-notifications').css('width', $('.right-inner-content').innerWidth());

        $(window).resize(function () {
            //       $('.left-sidebar').delay(5000).css('height', (sidebarHeight - ($('header').outerHeight() + 1)));
            $('.left-sidebar').css('height', ($(window).height()));
       });



        var s = $(".left-sidebar");
        var pos = s.position();

        $(window).scroll(function () {

            var windowpos = $(window).scrollTop();
            if (windowpos > 66) {  //?
                s.addClass("stick");
                $('.left-sidebar').css('height', ($(window).height()));

                var leftSideBar_Height = $(window).height();
                $('.left-sidebar').css('height', leftSideBar_Height);
                //  var menuHolderHeight = leftSideBar_Height - (75 + $('aside.left-sidebar > h3').outerHeight() + $('aside.left-sidebar > footer').outerHeight());
                var menuHolderHeight = leftSideBar_Height - (52 + $('aside.left-sidebar > h3').outerHeight() + $('aside.left-sidebar > footer').outerHeight());
                $('nav.left-menu').css({ 'height': menuHolderHeight });
                var menuInnerHeight = $('nav.left-menu').find('ul').outerHeight();

                $('.widgets-notifications').css('top', '0');
            } else {
                s.removeClass("stick");
            //   $('.left-sidebar').css('height', ($(window).height() - ($('header').innerHeight() + 1))); //?

             //   var leftSideBar_Height = $(window).height() - ($('header').outerHeight() + 1);
                var leftSideBar_Height = $(window).height();
                $('.left-sidebar').css('height', leftSideBar_Height);
                // var menuHolderHeight = leftSideBar_Height - (75 + $('aside.left-sidebar > h3').outerHeight() + $('aside.left-sidebar > footer').outerHeight());
                var menuHolderHeight = leftSideBar_Height - (52 + $('aside.left-sidebar > h3').outerHeight() + $('aside.left-sidebar > footer').outerHeight());
                $('nav.left-menu').css({ 'height': menuHolderHeight });
                var menuInnerHeight = $('nav.left-menu').find('ul').outerHeight();
                $('.widgets-notifications').css('top', '113px');
            }
        });
    }

    init();

    return {
        init: init
    }
} ();




function openNav() {
    document.getElementById("mySidenav").style.width = "100%";    
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


$(document).ready(function() {
    $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
    $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});
});


$(document).ready(function() {
    var win_hgt=$(window).height();
    $('.login_screen').css('min-height',win_hgt+'px');
});


function openNavDetails() {
    document.getElementById("mySidenavDetails").style.width = "50%";
    document.getElementById("maindetails").style.marginLeft = "50%";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNavDetails() {
    document.getElementById("mySidenavDetails").style.width = "0";
    document.getElementById("maindetails").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}

$(document).ready(function() {
	$("input").focus(
	        $("select2-dropdown--above").hide()
	       );
});



//Prevent the backspace key from navigating back.
$(document).unbind('keydown').bind('keydown', function (event) {
	var doPrevent = false;
	if (event.keyCode === 8) {
		var d = event.srcElement || event.target;
		if ((d.tagName.toUpperCase() === 'INPUT' && 
				(
						d.type.toUpperCase() === 'TEXT' ||
						d.type.toUpperCase() === 'PASSWORD' || 
						d.type.toUpperCase() === 'FILE' || 
						d.type.toUpperCase() === 'SEARCH' || 
						d.type.toUpperCase() === 'EMAIL' || 
						d.type.toUpperCase() === 'NUMBER' || 
						d.type.toUpperCase() === 'DATE' )
		) || 
		d.tagName.toUpperCase() === 'TEXTAREA' || (d.tagName.toUpperCase() === 'DIV' && d.contentEditable.toUpperCase() === 'TRUE')) {
			doPrevent = d.readOnly || d.disabled;
		}
		else {
			doPrevent = true;
		}
	}

	if (doPrevent) {
		event.preventDefault();
	}
});




//$(document).ready(function(){
$(document).on("click", ".click_highlight" , function() {
    	$(".click_highlight").find("td").removeClass("intro");
        $(this).find("td").addClass("intro");
    });
//});
$('ul.nav-left-ml').toggle();
$(document).on("click", "div.nav-toggle span" , function () {
  $(this).parent().parent().children('ul.nav-left-ml').toggle(300);
  var cs = $(this).attr("class");
  if(cs == 'nav-toggle-icon glyphicon tree_right_icon') {
    $(this).removeClass('tree_right_icon').addClass('tree_down_icon');
  }
  if(cs == 'nav-toggle-icon glyphicon tree_down_icon') {
    $(this).removeClass('tree_down_icon').addClass('tree_right_icon');
  }
});


$(document).ready(function(){
    $(document).on("click", "button.btn.btn_tree" , function(){
//        $(".tree_edit_options").hide();
//        $(".tree_edit_options").prev().show();
        $(this).parent().hide();
        $(this).parent().next().show(); //$(".tree_edit_options").show(); 
        //$(this).parent().next().flip(true);

    });
    $(document).on("click", ".close_icon",function(){
        //$(".test_plan").show();
        //$(".tree_edit_options").hide();
        $(this).parent().parent().prev().show();
        $(this).parent().parent().hide();
        
    });
});

$(document).ready(function(){
    $(document).on("click", ".Advanced_collapse .fa", function(){
        $(".details_advance_collapse").toggle("slow");
        $(".Advanced_collapse .fa").toggleClass("fa-caret-right").toggleClass("fa-caret-down");
    });  
if($("#tableHeader").length) {
	alert();
	$(window).on("scroll", function(e) {
		console.log("scrolled");
	  if ($("#tableHeader").scrollTop > 112) {
		$("#tableHeader").addClass("fix-header");
	  } else {
		$("#tableHeader").removeClass("fix-header");
	  }
	  
	});	
}	

});









