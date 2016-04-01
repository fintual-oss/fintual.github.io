const DEFAULT_AMOUNT_VALUE = -1;
var amountValue;

$(document).ready(function(){
  $('#subscription-form').submit(function(event) {
    event.preventDefault(event);
    if(inputIsValid()) {
      loadAmountValueFromForm();
      sendFormData();
    }
  });
});

function inputIsValid() {
  var nameIsValid = checkNameValidityAndDisplayMessage();
  var emailIsValid = checkEmailValidityAndDisplayMessage();
  var amountIsValid = checkAmountValidityAndDisplayMessage();
  return nameIsValid && emailIsValid && amountIsValid;
}

function checkNameValidityAndDisplayMessage() {
  var name = $("#name1").val();
  $(document).trigger("clear-alert-id.name");
  if (!name) {
    $(document).trigger("set-alert-id-name", [
      {
        message: "Debes ingresar tu nombre.",
        priority: "error"
      }
    ]);
    return false;
  }
  return true;
}

function checkEmailValidityAndDisplayMessage() {
  var email = $("#email1").val();
  $(document).trigger("clear-alert-id.email");
  if (!email || !emailFormatIsCorrect(email)) {
    $(document).trigger("set-alert-id-email", [
      {
        message: "Debes ingresar tu email y éste debe ser válido.",
        priority: "error"
      }
    ]);
    return false;
  }
  return true;
}

function emailFormatIsCorrect(email) {
  var mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return mailRegex.test(email);
}

function checkAmountValidityAndDisplayMessage() {
  var amount = $("#amount1").val();
  $(document).trigger("clear-alert-id.amount");
  if (amount && (!$.isNumeric(amount) || amount <= 0)) {
    $(document).trigger("set-alert-id-amount", [
      {
        message: "El monto es opcional, pero si ingresas algo debe ser un número positivo.",
        priority: "error"
      }
    ]);
    return false;
  }
  return true;
}

function loadAmountValueFromForm(){
  amountValue = DEFAULT_AMOUNT_VALUE;
  if($('#amount1').val()){
    amountValue = $('#amount1').val();
  }
}

function sendFormData() {
  $.ajax({
    url: 'https://api.airtable.com/v0/appOpQ8GCbqjZ2Rl9/Inscritos',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer keyUQGqomy6yoWSrP');
    },
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    data: '{"fields": {' +
    '"Name": "' + $('#name1').val() + '", ' +
    '"Comments": "' + $('#comment1').val().replace(/\n/g,"\\n") + '", ' +
    '"Email": "' + $('#email1').val() + '", ' +
    '"Amount": ' + amountValue + ',' +
    '"Time": "' + $('#time1').val() + '"' +
    '}}',
    dataType: 'json',
    success: function() {
      BootstrapDialog.show({
        title: 'Éxito',
        message: 'Datos enviados exitosamente.',
        buttons: [{
          label: 'OK',
          action: function (dialog) {
            dialog.close();
          }
        }]
      });
      deleteFormData();
    },
    error: function(error) {
      console.log(error);
      BootstrapDialog.show({
        title: 'Error',
        message: 'Error al enviar los datos, por favor intenta nuevamente. Cualquier duda o problema, envíanos un ' +
        'correo a hola@fininci.com.',
        buttons: [{
          label: 'OK',
          action: function (dialog) {
            dialog.close();
          }
        }]
      });
    }
  });
}

function deleteFormData() {
  $(':input','#subscription-form')
    .not(':button, :submit, :reset, :hidden')
    .val('')
    .removeAttr('checked')
    .removeAttr('selected');
}
