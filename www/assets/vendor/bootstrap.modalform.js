!function ($) {

  "use strict"; // jshint ;_;

  $( function() {
    var modalId = "modal-form-" + parseInt(Math.random() * 1000, 10);
    var $cont = $('<div id="'+modalId+'"></div>');
    $('body').append( $cont );

    $.modalForm = function(options) {
      var fields = options.fields || [];
      var title  = options.title  || options.submit;
      var submit = options.submit || 'submit';
      var $modal, field, type, html = "";

      //html += "<div class=\"modal fade\" id=\"SigninForm\">";
      html += "<div class=\"modal fade\" id=\"SigninForm\">";
      html += " <div class=\"modal-content\">";
      html += "  <form style=\"margin:0\">";
      if (title) {
        html += "    <div class=\"modal-signin-header\">";
        html += "      <h1>";
        html += "      "+title;
        html += "        <button type=\"button\" class=\"closeWider\" data-dismiss=\"modal\" aria-hidden=\"true\">X</button>";
        html += "      </h1>";
        html += "    <\/div>";  
      }
      html += "    <div class=\"modal-signin-body\">";
      while (field = fields.shift()) {
        if (/department/.test(field)) {
          html += '<select id="department-dropwdown" data-optional="true" name="department" class="loginFormDropdown">';
          html += '<option value="">department</option>';
          html += '<option value="1">Admin</option>';
          html += '<option value="7">Community Development</option>';
          html += '<option value="6">Council</option>';
          html += '<option value="3">Education</option>';
          html += '<option value="2">Finance and Planning</option>';
          html += '<option value="4">Health</option>';
          html += '<option value="8">Natural Resources</option>';
          html += '<option value="9">Production</option>';
          html += '<option value="5">Works</option>';
          html += '<option value="10">All</option>';
          html += '</select>		'
        } else if (/site/.test(field)) {
          html += '<br \/><select id="site-dropwdown" data-optional="true" name="site" class="loginFormDropdown">';
          html += '<option value="">site</option>';
          html += '<option value="aru">Arua</option>';
          html += '<option value="kay">Kayunga</option>';
          html += '<option value="gul">Gulu</option>';
          html += '</select>		'
        } else {
          type = /password/.test(field) ? 'password' : 'text';
          html += "      <input class=\"loginForm\" type=\""+type+"\" id=\""+field+"\" name=\""+field+"\" placeholder=\""+field.replace(/_/g, ' ')+"\">";
        }
      }
      html += "    <\/div>";
      html += "    <div class=\"modal-footer\">";
      // html += "      <button type=\"submit\" class=\"menu-blue\">"+submit+"<\/button>";
      // btn btn-primary      menu-blue
      //<button type=\"submit\" class=\"menu-blue\" onclick=\"handleSignInSubmit()\">"+submit+"<\/button>";
      html += "     <button type=\"submit\" class=\"menu-blue\" onclick=\"handleSignInSubmit()\">"+submit+"<\/button>";
      html += "    <\/div>";
      html += "  <\/form>";
      html += " <\/div>";
      html += "<\/div>";

      // make sure that only one modal is visible
      $modal = $( html );
      $cont.html('').append( $modal );

      $modal.modal({
        keyboard: true
      });
      $modal.modal('show');

      $modal.on('submit', 'form', function(event){
        event.preventDefault();
        event.stopPropagation();

        var inputs = {};
        var $form = $(event.target);

        $form.find('[name]').each( function () {
          inputs[this.name] = this.value;
        });

        $modal.trigger('submit', inputs);
      });

      $modal.on('error', function(event, error) {
        $modal.find('.alert').remove();
        $modal.find('.modal-body').before('<div class="alert alert-error"><strong>'+error.error+':</strong> '+error.reason+'</div>');
      });

      $modal.on('shown', function() {
        $modal.find('input').eq(0).focus()
      })

      return $modal;
    };
  })
}( window.jQuery )