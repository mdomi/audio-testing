define([
    'models/audio', 'views/audio'
], function (AudioModel, AudioView) {
    
    var app = {
        models : {
            AudioModel: AudioModel
        },
        views : {
            AudioView: AudioView
        }
    };
    
    return app;
});