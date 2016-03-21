$(document).ready(function(){
  $('#subscription-form').submit(function(event) {
    event.preventDefault(event);
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
      '"Amount": ' + $('#amount1').val() + ',' +
      '"Time": "' + $('#time1').val() + '"' +
      '}}',
      dataType: 'json',
      success: function (data) {
        console.info(data);
      }
    });
  });
});


