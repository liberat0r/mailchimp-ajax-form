Mailchimp AJAX Form
===================

Transforms a Mailchimp form to AJAX instead of post without using any of mailchimp's default JS code. If parsley is enabled for this form, it will also check validity before submitting.

__Attributes__
- [data-mailchimp-ajax-form] to init the plugin for a form element
- [data-mailchimp-ajax-message-timeout] sets the timeout for a message (default: 50000ms).
- [data-mailchimp-ajax-message-class-error] the classes used for an error message (default: alert alert-danger).
- [data-mailchimp-ajax-message-class-success] the classes used for an success message (default: alert alert-success).

__Example__
```
<form class="o-footer-block__form"
      action="http://hypermetron.us11.list-manage.com/subscribe/post"
      method="POST"
      data-parsley-validate
      data-mailchimp-ajax-form>
    <input type="hidden" name="u" value="930e5a3f530522342d668937d">
    <input type="hidden" name="id" value="392f34aab0">

    <div class="form-group">
        <input placeholder="Please enter your Email Address"
               autocapitalize="off"
               autocorrect="off"
               name="MERGE0"
               data-parsley-required="true"
               data-parsley-type="email"
               type="text"
               class="form-control"/>
    </div>
    <div class="sr-only"><input type="text"
                                name="b_930e5a3f530522342d668937d_392f34aab0"
                                tabindex="-1" value=""></div>
    <button class="btn btn-footer-newsletter" type="submit">Subscribe Now!</button>
</form>
```
