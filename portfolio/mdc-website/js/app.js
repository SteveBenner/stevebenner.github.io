$(function(){var t="#f8f8f8",e="#e5765b",a="#A3CEDA",s="#bbbbbb",o="#67696B";vex.defaultOptions.className="vex-theme-flat-attack",$("html").width()<=768?$(".features > button").click(function(){$(this).siblings("button").not(":focus").animate({backgroundColor:s}),$(this).animate({backgroundColor:a})}):($(".features > button").hover(function(){$(this).is(":focus")||($(this).find("p.text").fadeOut(),$(this).find("p.title").fadeIn())},function(){$(this).stop(!0,!0),$(this).is(":focus")||($(this).find("p.title").fadeOut(),$(this).find("p.text").fadeIn())}),$(".features > button").click(function(){$(this).siblings("button").not(":focus").animate({backgroundColor:s}),$(this).animate({backgroundColor:a}),$(this).find("p.text").fadeOut(),$(this).find("p.title").fadeIn(),$(this).siblings("button").find("p.text").fadeIn(),$(this).siblings("button").find("p.title").fadeOut(),$(".phone > .overlay > p").text($(this).attr("data-soundbyte"))})),$(".features > button").click(function(){$(this).hasClass("active")||($(this).siblings(".active").toggleClass("active"),$(this).toggleClass("active"),$(".phone .viewport").attr("data-feature",$(this).attr("data-feature")).siblings().removeAttr("data-feature"),$(".product > .description").text($(this).attr("data-subtitle")))}),$(".features > button").first().click(),$("form.subscribe > button").click(function(){$(this).siblings("button").not(":focus").animate({color:s}),$(this).animate({color:e}),$(this).toggleClass("selected").siblings("button.selected").removeClass("selected")});var i={apiKey:"api-key",bugReports:"bugreports@xfactorapps.com",preOrders:"pre-orders@xfactorapps.com",host:"smtp.mandrillapp.com",port:587},n="";$("form.subscribe").submit(function(e){e.preventDefault(),0==$(this).find("button.selected").length&&(alert("Select an option."),e.preventDefault);var a={request:$(this).find("button.selected").attr("data-req"),message:$(this).find("button.selected").attr("data-msg"),email:$("#email-field").val(),phone:$("#phone-field").val(),name:$("#name-field").val(),date:new Date};if("pre-order"==a.request){$.ajax({type:"POST",url:"https://mandrillapp.com/api/1.0/messages/send.json",data:{key:i.apiKey,message:{from_email:a.email,from_name:name,to:[{email:i.preOrders,type:"to"}],autotext:"true",subject:"MDC Pre-order information request",html:'<h2>"'+a.name+'" has requested information about a MDC pre-order.</h2><h3>Email: '+a.email+"</h3><h3>Phone number: "+a.phone+"</h3><h3>Note from the customer:</h3><p>"+n+"</p><p>This message was created and sent using Mandrill.</p>",headers:{"Reply-To":a.email},important:!0,metadata:{website:"www.mydentalcompanion.com"}}}})}$.ajax({type:"POST",contentType:"application/json; charset=utf-8",dataType:"json",processData:"false",url:dbURL,data:JSON.stringify(a)}).done(function(t){console.log(t)}).fail(function(t,e,s){var o={jqXHRObject:t,status:e,error:s};console.log(o),alert("shit");$.ajax({type:"POST",url:"https://mandrillapp.com/api/1.0/messages/send.json",data:{key:i.apiKey,message:{from_email:a.email,to:[{email:i.bugReports,type:"to"}],autotext:"true",subject:"ERROR:MDC-PRODUCT-PAGE-SUBSCRIBE-FAILURE",html:"<h2>Subscription form on MDC product site failed to process.</h2><p>Form data:</p><div>"+a.data+"</div><p>Error data:</p><div>"+res.error+"</div><p>Reponse:</p><div>"+o+"</div><p>This message was created and sent using Mandrill.</p>",headers:{"Reply-To":a.email},important:!0,metadata:{website:"www.mydentalcompanion.com"}}}})}).always(function(){vex.open({content:'<h1>Thank You</h1><span class="line"></span><p class="msg">'+a.message+"</p>",showCloseButton:!1,overlayClosesOnClick:!0,contentClassName:"vex-styles",contentCSS:{boxShadow:"rgba(0,0,0,0.4), 0px, 0px, 12px, 4px",backgroundColor:o,color:t,padding:"1em 2em"}}),$("form.subscribe")[0].reset()})})});