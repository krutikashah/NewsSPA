define(['overlay'], function(Overlay) {
    var overlay = {
        overlayModel : new Overlay.Model(),
        overlayView : new Overlay.View()
    }
    overlay.overlayView.show();

});