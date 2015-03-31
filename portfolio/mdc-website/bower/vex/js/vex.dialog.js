(function(){var e;e=function(e,t){var n,i;return null==t?e.error("Vex is required to use vex.dialog"):(n=function(t){var n;return n={},e.each(t.serializeArray(),function(){return n[this.name]?(n[this.name].push||(n[this.name]=[n[this.name]]),n[this.name].push(this.value||"")):n[this.name]=this.value||""}),n},i={},i.buttons={YES:{text:"OK",type:"submit",className:"vex-dialog-button-primary"},NO:{text:"Cancel",type:"button",className:"vex-dialog-button-secondary",click:function(e){return e.data().vex.value=!1,t.close(e.data().vex.id)}}},i.defaultOptions={callback:function(){},afterOpen:function(){},message:"Message",input:'<input name="vex" type="hidden" value="_vex-empty-value" />',value:!1,buttons:[i.buttons.YES,i.buttons.NO],showCloseButton:!1,onSubmit:function(a){var o,u;return o=e(this),u=o.parent(),a.preventDefault(),a.stopPropagation(),u.data().vex.value=i.getFormValueOnSubmit(n(o)),t.close(u.data().vex.id)},focusFirstInput:!0},i.defaultAlertOptions={message:"Alert",buttons:[i.buttons.YES]},i.defaultConfirmOptions={message:"Confirm"},i.open=function(n){var a;return n=e.extend({},t.defaultOptions,i.defaultOptions,n),n.content=i.buildDialogForm(n),n.beforeClose=function(e){return n.callback(e.data().vex.value)},a=t.open(n),n.focusFirstInput&&a.find('input[type="submit"], textarea, input[type="date"], input[type="datetime"], input[type="datetime-local"], input[type="email"], input[type="month"], input[type="number"], input[type="password"], input[type="search"], input[type="tel"], input[type="text"], input[type="time"], input[type="url"], input[type="week"]').first().focus(),a},i.alert=function(t){return"string"==typeof t&&(t={message:t}),t=e.extend({},i.defaultAlertOptions,t),i.open(t)},i.confirm=function(t){return"string"==typeof t?e.error("dialog.confirm(options) requires options.callback."):(t=e.extend({},i.defaultConfirmOptions,t),i.open(t))},i.prompt=function(t){var n;return"string"==typeof t?e.error("dialog.prompt(options) requires options.callback."):(n={message:'<label for="vex">'+(t.label||"Prompt:")+"</label>",input:'<input name="vex" type="text" class="vex-dialog-prompt-input" placeholder="'+(t.placeholder||"")+'"  value="'+(t.value||"")+'" />'},t=e.extend({},n,t),i.open(t))},i.buildDialogForm=function(t){var n,a,o;return n=e('<form class="vex-dialog-form" />'),o=e('<div class="vex-dialog-message" />'),a=e('<div class="vex-dialog-input" />'),n.append(o.append(t.message)).append(a.append(t.input)).append(i.buttonsToDOM(t.buttons)).bind("submit.vex",t.onSubmit),n},i.getFormValueOnSubmit=function(e){return e.vex||""===e.vex?"_vex-empty-value"===e.vex?!0:e.vex:e},i.buttonsToDOM=function(n){var i;return i=e('<div class="vex-dialog-buttons" />'),e.each(n,function(a,o){return i.append(e('<input type="'+o.type+'" />').val(o.text).addClass(o.className+" vex-dialog-button "+(0===a?"vex-first ":"")+(a===n.length-1?"vex-last ":"")).bind("click.vex",function(n){return o.click?o.click(e(this).parents("."+t.baseClassNames.content),n):void 0}))}),i},i)},"function"==typeof define&&define.amd?define(["jquery","vex"],e):"object"==typeof exports?module.exports=e(require("jquery"),require("vex")):window.vex.dialog=e(window.jQuery,window.vex)}).call(this);