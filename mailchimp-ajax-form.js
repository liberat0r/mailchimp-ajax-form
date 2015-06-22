/**
 * Mailchimp AJAX Form
 *
 * Transforms a Mailchimp form to AJAX instead of post,
 * if parsley is enabled for this form, it will also check
 * validity before submitting.
 * Add the [data-mailchimp-ajax-form] attribute
 * Optionally, you can change the message timeout
 * using the [data-mailchimp-ajax-message-timeout] attribute,
 * the message success classes using [data-mailchimp-ajax-message-class-success]
 * and finally, the message error classes with [data-mailchimp-ajax-message-class-error].
 *
 * Example of a MC form that will employ this plugin:
 * <form class="o-footer-block__form"
 *         action="http://hypermetron.us11.list-manage.com/subscribe/post"
 *         method="POST"
 *         data-parsley-validate
 *         data-mailchimp-ajax-form>
 *     <input type="hidden" name="u" value="930e5a3f530522342d668937d">
 *     <input type="hidden" name="id" value="392f34aab0">
 *
 *     <div class="form-group">
 *         <input placeholder="Please enter your Email Address"
 *         autocapitalize="off"
 *         autocorrect="off"
 *         name="MERGE0"
 *         data-parsley-required="true"
 *         data-parsley-type="email"
 *         type="text"
 *         class="form-control"/>
 *     </div>
 *     <div class="sr-only"><input type="text"
 *         name="b_930e5a3f530522342d668937d_392f34aab0"
 *         tabindex="-1" value=""></div>
 *     <button class="btn btn-footer-newsletter" type="submit">Subscribe Now!</button>
 * </form>
 */

(function(name, definition) {
    var theModule  = definition(),
        // this is considered "safe":
        hasDefine  = typeof define === "function" && define.amd,
        // hasDefine = typeof define === "function",
        hasExports = typeof module !== "undefined" && module.exports;

    if (hasDefine) { // AMD Module
        define(theModule);
    } else if (hasExports) { // Node.js Module
        module.exports = theModule;
    } else { // Assign to common namespaces or simply the global object (window)
        ( this.jQuery || this.ender || this.$ || this)[name] = theModule;
    }

    // Start
    theModule.init();

})("MailchimpAJAX", function() {
    var module = this;

    // Private variables
    module.$mailchimpForms = $("[data-mailchimp-ajax-form]"); // Elements to be toggled

    // Private methods


    return {

        // Public methods

        // Public method to init all fields
        init: function() {

            // Hook submit on each of the forms
            module.$mailchimpForms.submit(function(e) {
                e.preventDefault();

                var $form = $(this);

                // if is parsley validated or parsley is not available
                if (typeof $form.parsley() === 'undefined' || $form.parsley().isValid()) {

                    var messageTimeout      = $form.data('mailchimp-ajax-message-timeout') ? $form.data('mailchimp-ajax-message-timeout') : 50000;
                    var messageClassError   = $form.data('mailchimp-ajax-message-class-error') ? $form.data('mailchimp-ajax-message-class-error') : 'alert alert-danger';
                    var messageClassSuccess = $form.data('mailchimp-ajax-message-class-success') ? $form.data('mailchimp-ajax-message-class-success') : 'alert alert-success';

                    $.ajax({
                        type       : 'get',
                        url        : $form.attr('action').replace('/post', '/post-json').concat('&c=?').replace('-json&', '-json?'),
                        data       : $form.serialize(),
                        cache      : false,
                        dataType   : 'jsonp',
                        contentType: "application/json; charset=utf-8",
                        error      : function(err) {

                            $form.prepend('<div class="' + messageClassError + ' js-form-validation-' + $(".form-validation").length + '">' + err.msg + '</div>');

                            window.setTimeout(function() {
                                $(".js-form-validation-" + ($(".form-validation").length)).fadeOut(300);
                            }, messageTimeout);
                        },
                        success    : function(data) {

                            if (data.result !== "success") {
                                $form.prepend('<div class="' + messageClassError + ' js-form-validation-' + $(".js-form-validation").length + '">' + data.msg + '</div>');
                            } else {
                                $form.prepend('<div class="' + messageClassSuccess + ' js-form-validation-' + $(".js-form-validation").length + '">' + data.msg + '</div>');
                            }

                            window.setTimeout(function() {
                                $(".js-form-validation-" + ($(".js-form-validation").length)).fadeOut(300);
                            }, messageTimeout);
                        }
                    });

                }
            });
        }
    };

});