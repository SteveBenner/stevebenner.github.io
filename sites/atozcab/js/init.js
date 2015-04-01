$( init );

function init() {
    $('#submitLink').click( function() {
        var submitForm = $('#bookForm');
        if ( !$('#name').val() || !$('#phone').val() || !$('#destination').val() || !$('#pickup').val() || !$('#time').val() || !$('#email').val()) {
            alert('All fields with a * are required to be filled out');
        } else {
            $.ajax( {
                url: submitForm.attr( 'action' ) + "?ajax=true",
                type: submitForm.attr( 'method' ),
                data: submitForm.serialize(),
                success: submitFinished
            });
        }
    });
}

function submitFinished( response ) {
    response = $.trim( response );
    if ( response == "success" ) {
        alert('Your request has been processed!');
    } else {
        alert('Delivery Failure =(');
    }
}