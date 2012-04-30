function ajax_start(){$(this).append("&nbsp;"+gettext("Processing...")).show();if($("#in-progress").length){$("#in-progress").remove()}}function ajax_stop(){$(this).empty().hide()}function ajax_error(c,b,a){if(b.status==200){if(a.url=="/mail/lists/add/"){location.href="/mail/lists/"}else{location.href=a.url}}else{$(this).empty().append('<span class="ajax_error">'+gettext("Error connecting to server. check network!")+"</span>").show();$(".Grid_heading").before('<div id="ajax-error-msg" class="ui-state-highlight">'+gettext("Server error")+"</div>");setTimeout(function(){$("#ajax-error-msg").empty().remove()},3900)}}function toplinkize(a,d,c){var b="";if(d=="dsc"){b=' <a href="/mail/lists/'+a+"/asc/"+c+'/">&uarr;</a>'}else{b=' <a href="/mail/lists/'+a+"/dsc/"+c+'/">&darr;</a>'}return b}function paginate(){if(rj.list_kind==1){lt="Whitelist :: "}else{lt="Blacklist :: "}fmt=gettext("Showing page %(page)s of %(pages)s pages.");data={page:rj.page,pages:rj.pages};tmp=interpolate(fmt,data,true);$("#heading").empty().append(lt+tmp);$.address.title("Baruwa :: "+gettext("List management ")+tmp);li="";if(rj.show_first){tmp+='<span><a href="/mail/lists/'+rj.list_kind+"/1/"+rj.direction+"/"+rj.order_by+'/"><img src="'+media_url+'common/imgs/first_pager.png" alt="First"/></a></span>';tmp+="<span>.....</span>"}if(rj.has_previous){tmp+='<span><a href="/mail/lists/'+rj.list_kind+"/"+rj.previous+"/"+rj.direction+"/"+rj.order_by+'/"><img src="'+media_url+'common/imgs/previous_pager.png" alt="Previous"/></a></span>'}$.each(rj.page_numbers,function(a,b){li="/mail/lists/"+rj.list_kind+"/"+b+"/"+rj.direction+"/"+rj.order_by+"/";if(rj.page==b){tmp+="<span><b>"+b+"</b>&nbsp;</span>"}else{tmp+='<span><a href="'+li+'">'+b+"</a>&nbsp;</span>"}});if(rj.has_next){tmp+='<span><a href="/mail/lists/'+rj.list_kind+"/"+rj.next+"/"+rj.direction+"/"+rj.order_by+'/"><img src="'+media_url+'common/imgs/next_pager.png" alt="Next"/></a></span>'}if(rj.show_last){tmp+="<span>......</span>";tmp+='<a href="/mail/lists/'+rj.list_kind+"/last/"+rj.direction+"/"+rj.order_by+'/"><img src="'+media_url+'common/imgs/last_pager.png" alt="Last"/></a></span>'}columns="id to_address from_address";linfo="hash To From";carray=columns.split(" ");larray=linfo.split(" ");for(i=0;i<carray.length;i++){if(larray[i]=="hash"){h="#"}else{h=larray[i]}if(rj.order_by==carray[i]){tmpl=toplinkize(rj.list_kind,rj.direction,carray[i]);$(".Lists_grid_"+larray[i]).empty().html(gettext(h)).append(tmpl);$("#lists_filter_form").attr("action","/mail/lists/"+rj.list_kind+"/"+rj.direction+"/"+carray[i]+"/")}else{ur='<a href="/mail/lists/'+rj.list_kind+"/"+rj.direction+"/"+carray[i]+'/">'+gettext(h)+"</a>";$(".Lists_grid_"+larray[i]).empty().html(ur)}}$("#paginator").html(tmp);$("#paginator span a").bind("click",list_nav);$("div.Grid_heading div a").bind("click",list_nav)}function lists_from_json(a){if(a){rj=a.paginator;tti=[];count=0;css="LightGray";list_type="1";$.each(a.items,function(b,c){list_type=rj.list_kind;if(c.from_address=="any"){from_address=gettext("Any address")}else{from_address=c.from_address}if(c.to_address=="any"){to_address=gettext("Any address")}else{to_address=c.to_address}link='<a href="/mail/lists/delete/'+c.id+'/"><img src="'+media_url+'common/imgs/action_delete.png" title="Delete" alt="Delete" /></a>';if(c.from_address=="127.0.0.1"){if(c.to_address=="any"){link="=builtin="}}if(css=="LightBlue"){css="LightGray"}else{css="LightBlue"}tti[count++]='<div id="list-id-'+c.id+'" class="'+css+'_div">';tti[count++]='<div class="Lists_hash">'+c.id+"</div>";tti[count++]='<div class="Lists_to">'+to_address+"</div>";tti[count++]='<div class="Lists_from">'+from_address+"</div>";tti[count++]='<div class="Lists_action">'+link+"</div>";tti[count++]="</div>"});if(tti.length){$("div.Grid_heading").siblings("div").remove();$("div.Grid_heading").after(tti.join(""))}else{$("div.Grid_heading").siblings("div").remove();$("div.Grid_heading").after('<div class="LightBlue_div"><div class="spanrow">'+gettext("No items at the moment")+"</div></div>")}if(rj.order_by=="id"){$("#filterbox").hide("fast")}else{$("#filterbox").show("fast");if(rj.order_by=="to_address"){$("#filterlabel").html("<b>"+gettext("To:")+"</b>")}else{$("#filterlabel").html("<b>"+gettext("From:")+"</b>")}}$("div.Grid_heading ~ div a").bind("click",confirm_delete);paginate()}}function fetchPage(b,a){$.get(b,function(c){lists_from_json(c);if(a=="1"){lt=gettext("Blacklist");ll="/mail/lists/2/";ct=gettext("Whitelist :: ")}else{lt=gettext("Whitelist");ll="/mail/lists/1/";ct=gettext("Blacklist :: ")}$("#heading").empty().html(ct);$("#sub-menu-links ul li:first a").attr({id:"list-link",href:ll,innerHTML:lt})},"json")}function getPage(a){a.preventDefault();re=/\/mail\/lists\/([1-2])/;link=$(this).attr("href");f=link.match(re);if(f){fetchPage(link,f[1]);url=link.replace(/\//g,"-").replace(/^-/,"").replace(/-$/,"");$.address.value("?u="+url);$.address.history($.address.baseURL()+url)}}function submitForm(a){$("#id_lists_filter_submit").attr({disabled:"disabled",value:gettext("Loading")});a.preventDefault();filter_request={query_type:$("#id_query_type").val(),search_for:$("#id_search_for").val()};lk=$("#lists_filter_form").attr("action");$.post(lk,filter_request,function(b){lists_from_json(b);url=lk.replace(/\//g,"-").replace(/^-/,"").replace(/-$/,"");$.address.value("?u="+url);$.address.history($.address.baseURL()+url)},"json");$("#id_lists_filter_submit").removeAttr("disabled").attr("value",gettext("Go"))}function confirm_delete(a){a.preventDefault();$(this).blur();re=/\/mail\/lists\/delete\/([0-9]+)/;l=$(this).attr("href");m=l.match(re);if(m){del_warning=[];count=0;del_warning[count++]='<div id="confirm-del-msg">';del_warning[count++]='<div id="confirm-del-info">';del_warning[count++]=gettext("This will delete the item ");del_warning[count++]=gettext("from the list. This action is not reversible");del_warning[count++]='</div><div id="confirm-del-buttons">';del_warning[count++]=gettext("Do you wish to continue ?");del_warning[count++]='&nbsp;<input type="button" value="Yes" id="yes_del" />&nbsp;';del_warning[count++]='<input type="button" value="No" id="no_del" />';del_warning[count++]="</div>";del_warning[count++]="</div>";if($("#confirm-del-msg").length){$("#confirm-del-msg").remove()}$("#list-id-"+m[1]).after(del_warning.join(""));$("#no_del").bind("click",function(b){b.preventDefault();$("#confirm-del-msg").remove()});$("#yes_del").bind("click",function(b){b.preventDefault();$("#confirm-del-msg").remove();$.post(l,{list_item:m[1]},function(c){if(c.success){$("#list-id-"+m[1]).remove();$(".Grid_content").before('<div id="in-progress">'+gettext("List item deleted")+"</div>");$("#in-progress").append('<div id="dismiss"><a href="#">'+gettext("Dismiss")+"</a></div>");ip=setTimeout(function(){$("#in-progress").remove()},15050)}else{$(".Grid_content").before('<div id="in-progress">'+gettext("List item could not be deleted")+"</div>");$("#in-progress").append('<div id="dismiss"><a href="#">'+gettext("Dismiss")+"</a></div>");ip=setTimeout(function(){$("#in-progress").remove()},15050)}$("#dismiss a").click(function(d){d.preventDefault();clearTimeout(ip);$("#in-progress").empty().remove()})},"json")})}}function handlextern(){page=$.address.parameter("u");if(page){window.scrollTo(0,0);page=$.trim(page);re=/^mail\-lists\-[1-2]\-[0-9]+\-dsc|asc\-id|to_address|from_address$/;if(re.test(page)){re=/^mail\-lists\-([1-2])\-[0-9]+\-dsc|asc\-id|to_address|from_address$/;f=page.match(re);page=page.replace(/-/g,"/");url="/"+page+"/";fetchPage(url,f[1]);return false}else{page=$.trim(page);re=/^mail\-lists\-([1-2])$/;f=page.match(re);if(f){page=page.replace(/-/g,"/");url="/"+page+"/";fetchPage(url,f[1]);url=url.replace(/\//g,"-").replace(/^-/,"").replace(/-$/,"");$.address.value("?u="+url);$.address.history($.address.baseURL()+url);return false}}}}function list_nav(){window.scrollTo(0,0);url=$(this).attr("href").replace(/\//g,"-").replace(/^-/,"").replace(/-$/,"");$.address.value("?u="+url);$.address.history($.address.baseURL()+url);$.getJSON($(this).attr("href"),lists_from_json);return false}function jsize_lists(){$("#my-spinner").ajaxStart(ajax_start).ajaxStop(ajax_stop).ajaxError(ajax_error);$("#add-item").hide();$("#paginator span a").bind("click",list_nav);$.address.externalChange(handlextern);$("div.Grid_heading ~ div a").bind("click",confirm_delete);$("div.Grid_heading div a").bind("click",list_nav);$("#list-link").bind("click",getPage);$("#lists_filter_form").submit(submitForm)}$(document).ready(jsize_lists);