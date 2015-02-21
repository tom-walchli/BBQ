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
    console.log($button);
    var bbqLI = $button.closest('[data-bbq]')
    console.log(bbqLI);
    var bbqId = $(bbqLI).data('bbq')
    console.log(bbqId);

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
        var popup = prompt("What are you bringing?", "e.g. Steak, Beer, Salad, etc.");
        if (popup !== null && popup !== "") {

          var bring_request = $.post('/api/appointments/' + data.appt.id + '/bring/' + popup);
                                         
          bring_request.fail(function () {
            alert("You're not allowed to bring anything. Try again later.");
            addAppointment_bringNothing(data);
          });

          bring_request.done(function (data) {
            addAppointment(data);
          });
        } else {
          addAppointment_bringNothing(data);
        }
    }

    function addAppointment(data){
        var apptList = $(bbqLI).find('[data-appt]').first();
        $(apptList).append("<dt>" + data.user.name + "</dt>");
        $(apptList).append("<dd>&rarr; bringing: " + data.appt.bringing + "</dd>");
    }

    function addAppointment_bringNothing(data){
        var apptList = $(bbqLI).find('[data-appt]').first();
        $(apptList).append("<dt>" + data.user.name + "</dt>");
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
