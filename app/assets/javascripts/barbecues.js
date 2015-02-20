// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$('#addBbqCancel').click( function (event){
  window.location.href = '/';
});

(function main () {
  var isJoining = false

  $('[data-hook~=join-bbq]').on('click', function (event) {
    if (isJoining) {
      return
    }

    isJoining = true
    var $button = $(event.target)
    var bbqLI = $button.closest('[data-bbq]')
    var bbqId = $(bbqLI).data('bbq')

    var request = $.post('/api/barbecues/' + bbqId + '/join')

    request.fail(function () {
      alert('Couldn’t join the barbecue. Try again later.')
      isJoining = false
    })

    request.done(function (data) {
      $button.fadeOut()
      isJoining = false

      bringing(data)
    })

    function bringing(data){
        var popup = prompt("What are you bringing?", "Steak");
        if (popup != null) {
          console.log(popup);
          data.appt.bringing = popup;

          var bring_request = $.post('/api/appointments/' + data.appt.id + '/bring' + popup);

          bring_request.fail(function () {
            alert('Not allowed to bring anything. Try again later.');
          })

          bring_request.done(function (data) {
            addAppointment(data);
          })
        }
    }

    function addAppointment(data){
        var apptList = $(bbqLI).find('.js-appointments')

        var newDT = document.createElement('dt');
        newDT.text = data.user.name;
        $(apptList).append(newDT);

        var newDD = document.createElement('dt');
        newDD.text = data.user.name;
        $(apptList).append(newDD);

        console.log(bbqId,data);
    }


  })

  if ($('[data-hook~=controller-barbecues][data-hook~=action-show]').length) {
    var $bbqContainer = $('[data-hook=bbq-info]')
    var bbqId = $bbqContainer.data('bbq')
    var request = $.get('/api/barbecues/' + bbqId)

    request.fail(function () {
      var htmlParts = [
        '<div class="alert alert-danger" role="alert">',
        '  There was a problem retrieving the BBQ info. Try again later.',
        '</div>'
      ]
      $bbqContainer.append(htmlParts.join('\n'))
    })

    request.done(function (bbq) {
      var htmlParts = [
        '<h2>' + bbq.title + '</h2>',
        '<dl>',
        '  <dt>Date:</dt>',
        '  <dd>' + bbq.date + '</dd>',
        '  <dt>Venue:</dt>',
        '  <dd>' + bbq.venue + '</dd>',
        '</dl>'
      ]
      $bbqContainer.append(htmlParts.join('\n'))
      $bbqContainer.append(bbq)
    })
  }
})()
