function buildrows(d){if(d){rj=d.paginator;if(d.items.length){last_ts=d.items[0].timestamp}var e;var b;rows=[];len=d.items.length;len--;count=0;$("#smailtotal").empty().append(d.status.baruwa_mail_total);$("#sspamtotal").empty().append(d.status.baruwa_spam_total);$("#svirustotal").empty().append(d.status.baruwa_virus_total);$("#inq").empty().append(d.status.baruwa_in_queue);$("#outq").empty().append(d.status.baruwa_out_queue);if(d.status.baruwa_status){simg="active.png";alt="OK"}else{simg="inactive.png";alt="FAULTY"}var a=media_url+"mail/imgs/"+simg;$("#statusimg").attr("src",a).attr("alt",alt);$.each(d.items,function(g,k){e="";c="LightBlue";b=k.to_address.split(",");for(itr=0;itr<b.length;itr++){e+=b[itr]+"<br />"}if(k.from_address.length>30){var j=k.from_address.substring(0,29)+"..."}else{var j=k.from_address}s=stripHTML(k.subject);if(s.length>38){re=/\s/g;if(re.test(s)){subject=wordwrap(s,45)}else{subject=s.substring(0,44)+"..."}}else{subject=s}var f="";if(k.spam&&!(k.virusinfected)&&!(k.nameinfected)&&!(k.otherinfected)){f=gettext("Spam");if(k.highspam){c="highspam"}else{c="spam"}}if(k.virusinfected||k.nameinfected||k.otherinfected){f=gettext("Infected");c="infected"}if(!(k.spam)&&!(k.virusinfected)&&!(k.nameinfected)&&!(k.otherinfected)){f=gettext("Clean")}if(k.whitelisted&&!(k.virusinfected)&&!(k.nameinfected)&&!(k.otherinfected)){f="WL";c="whitelisted"}if(k.blacklisted){f="BL";c="blacklisted"}if(!k.scaned){f="NS";c="LightGray"}rows[count++]='<div class="'+stripHTML(c)+'_div">';rows[count++]='<div class="quaran_select_row"><input type="checkbox" name="message_id" value="'+k.id+'" class="selector" /></div>';rows[count++]='<div class="quaran_date_time_row"><a href="'+messages_base_url+"view/"+k.id+'/">'+k.timestamp+"</a></div>";rows[count++]='<div class="quaran_from_row"><a href="'+messages_base_url+"view/"+k.id+'/">'+j+"</a></div>";rows[count++]='<div class="quaran_to_row"><a href="'+messages_base_url+"view/"+k.id+'/">'+e+"</a></div>";rows[count++]='<div class="quaran_subject_row"><a href="'+messages_base_url+"view/"+k.id+'/">'+subject+"</a></div>";rows[count++]='<div class="quaran_score_row"><a href="'+messages_base_url+"view/"+k.id+'/">'+k.sascore+"</a></div>";rows[count++]='<div class="quaran_status_row"><a href="'+messages_base_url+"view/"+k.id+'/">'+f+"</a></div>";rows[count++]="</div>"});if(!rows.length){rows='<div class="spanrow">'+gettext("No records returned")+"</div>";$("div.Grid_heading ~ div").remove();$("div.Grid_heading").after(rows)}else{$("div.Grid_heading ~ div").remove();$("div.Grid_heading").after(rows.join(""))}}else{$("#my-spinner").empty().append(gettext("Empty response from server. check network!"))}}function toplinkize(e,d,a){var b="";if(e=="dsc"){b=' <a href="'+messages_base_url+"quarantine/asc/"+d+'/">&uarr;</a>'}else{b=' <a href="'+messages_base_url+"quarantine/dsc/"+d+'/">&darr;</a>'}if(a){b=b.replace(/quarantine\//g,"quarantine/"+a+"/")}return b}function en_history(){url=$(this).attr("href").replace(/\//g,"-").replace(/^-/,"").replace(/-$/,"");$.address.value("?u="+url);$.address.history($.address.baseURL()+url);window.scrollTo(0,0);if(url=="messages-quarantine"){$("#sub-menu-links ul li").remove();var a=[messages_base_url+"quarantine/",messages_base_url+"quarantine/spam/",messages_base_url+"quarantine/policyblocked/"];var e=[gettext("Full quarantine"),gettext("Spam"),gettext("Non Spam")];var d=[];for(var b=0;b<a.length;b++){d[b]='<li><a href="'+a[b]+'">'+e[b]+"</a></li>"}$("#sub-menu-links ul").append(d.join(""))}$("#Footer_container").after(loading_msg);$.getJSON($(this).attr("href"),buildrows);return false}function handlextern(){page=$.address.parameter("u");if(page){page=$.trim(page);re=/^mail\-messages\-quarantine|full|quarantine\-spam|quarantine\-policyblocked\-[0-9]+|last\-dsc|asc\-timestamp|to_address|from_address|subject|size|sascore$/;if(re.test(page)){page=page.replace(/-/g,"/");url="/"+page+"/";window.scrollTo(0,0);$("#Footer_container").after(loading_msg);$.getJSON(url,buildrows);return false}}}function paginate(){fmt=gettext("Showing page %(page)s of %(pages)s pages.");data={page:rj.page,pages:rj.pages};tmp=interpolate(fmt,data,true);li="",col="",tmpl="";if(rj.show_first){if(rj.direction){li=messages_base_url+"quarantine/"+rj.direction+"/"+rj.order_by+"/"}else{li=messages_base_url+"quarantine/"+rj.order_by+"/"}if(rj.quarantine_type){li=li.replace(/quarantine\//g,"quarantine/"+rj.quarantine_type+"/")}tmp+='<span><a href="'+li+'"><img src="'+media_url+'common/imgs/first_pager.png" alt="First"/></a></span>';tmp+="<span>.....</span>"}if(rj.has_previous){if(rj.direction){li=messages_base_url+"quarantine/"+rj.previous+"/"+rj.direction+"/"+rj.order_by+"/"}else{li=messages_base_url+"quarantine/"+rj.previous+"/"+rj.order_by+"/"}if(rj.quarantine_type){li=li.replace(/quarantine\//g,"quarantine/"+rj.quarantine_type+"/")}tmp+='<span><a href="'+li+'"><img src="'+media_url+'common/imgs/previous_pager.png" alt="Previous"/></a></span>'}$.each(rj.page_numbers,function(a,b){if(rj.page==b){tmp+="<span><b>"+b+"</b>&nbsp;</span>"}else{if(rj.direction){li=messages_base_url+"quarantine/"+b+"/"+rj.direction+"/"+rj.order_by+"/"}else{li=messages_base_url+"quarantine/"+b+"/"+rj.order_by+"/"}if(rj.quarantine_type){li=li.replace(/quarantine\//g,"quarantine/"+rj.quarantine_type+"/")}tmp+='<span><a href="'+li+'">'+b+"</a>&nbsp;</span>"}});if(rj.has_next){if(rj.direction){li=messages_base_url+"quarantine/"+rj.next+"/"+rj.direction+"/"+rj.order_by+"/"}else{li=messages_base_url+"quarantine/"+rj.next+"/"+rj.order_by+"/"}if(rj.quarantine_type){li=li.replace(/quarantine\//g,"quarantine/"+rj.quarantine_type+"/")}tmp+='<span><a href="'+li+'"><img src="'+media_url+'common/imgs/next_pager.png" alt="Next"/></a></span>'}if(rj.show_last){if(rj.direction){li=messages_base_url+"quarantine/last/"+rj.direction+"/"+rj.order_by+"/"}else{li=messages_base_url+"quarantine/last/"+rj.order_by+"/"}if(rj.quarantine_type){li=li.replace(/quarantine\//g,"quarantine/"+rj.quarantine_type+"/")}tmp+="<span>......</span>";tmp+='<a href="'+li+'"><img src="'+media_url+'common/imgs/last_pager.png" alt="Last"/></a></span>'}columns="timestamp from_address to_address subject sascore";linfo=gettext("Date/Time")+"#"+gettext("From")+"#"+gettext("To")+"#"+gettext("Subject")+"#"+gettext("Score");style=".quaran_date_time_heading .quaran_from_heading .quaran_to_heading .quaran_subject_heading .quaran_score_heading";carray=columns.split(" ");larray=linfo.split("#");styles=style.split(" ");for(i=0;i<carray.length;i++){h=larray[i];if(carray[i]==rj.order_by){tmpl=toplinkize(rj.direction,carray[i],rj.quarantine_type);$(styles[i]).empty().html(h).append(tmpl)}else{ur='<a href="'+messages_base_url+"quarantine/"+rj.direction+"/"+carray[i]+'/">'+h+"</a>";if(rj.quarantine_type){ur=ur.replace(/quarantine\//g,"quarantine/"+rj.quarantine_type+"/")}$(styles[i]).empty().html(ur)}}pf=$("#heading small").html();fmt=gettext("Showing page %(page)s of %(pages)s pages.");transdata={page:rj.page,pages:rj.pages};translted=interpolate(fmt,transdata,true);if(pf){$("#heading").html(translted+" (<small>"+pf+"</small>)")}else{$("#heading").html(translted)}$.address.title(".:. Baruwa :: "+translted);$(this).html(tmp);$("#allchecker").attr("checked",false);$("#paginator a").bind("click",en_history);$(".Grid_heading div a").bind("click",en_history);$("#sub-menu-links ul li a").bind("click",en_history);$("#loading_message").remove()}function jsize_page(){$("#fhl").before($("<a/>").attr({href:"#",id:"filter-toggle"}).html("&darr;&nbsp;"+gettext("Show filters")));$("#fhl").hide();$("#filter-toggle").bind("click",function(a){a.preventDefault();$("#fhl").toggle();if($("#fhl").css("display")=="inline"){$(this).html("&uarr;&nbsp;"+gettext("Hide filters")).blur()}else{$(this).html("&darr;&nbsp;"+gettext("Show filters")).blur()}});$("#allchecker").attr("checked",false);$("#allchecker").bind("click",function(){$(".selector").attr("checked",this.checked)});$("#paginator a").bind("click",en_history);$(".Grid_heading div a").bind("click",en_history);$("#sub-menu-links ul li a").bind("click",en_history);$("#paginator").ajaxStop(paginate).ajaxError(function(d,b,a){if(b.status==200){location.href=a.url}else{$("#loading_message").remove()}});$.address.externalChange(handlextern)}var loading_msg='<div id="loading_message"><div id="loading"><img src="'+media_url+'common/imgs/ajax-loader.gif" alt="loading"/><br/><b>'+gettext("Loading")+"</b></div></div>";$(document).ready(jsize_page);