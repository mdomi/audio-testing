define([
    'Underscore', 'Backbone', 'Handlebars', 'text!templates/audioview.html'
], function (_, Backbone, Handlebars, audioViewTemplate) {

    var stepSize = 0.25;
    
    function formatTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);
        return _.str.sprintf('%s:%s', minutes, _.str.pad(seconds, 2, '0'));
    }
    
    var AudioView = Backbone.View.extend({
        template : Handlebars.compile(audioViewTemplate),
        events : {
            'click .play': 'play',
            'click .pause': 'pause',
            'click .stop': 'stop',
            'click .volume.louder': 'volumeUp',
            'click .volume.softer': 'volumeDown',
            'timeupdate audio': 'updateTime'
        },
        render : function () {
            var view = this;
            view.$el.html(view.template(view.model.toJSON()));
            view.$audioElement = view.$el.find('audio').on('timeupdate', function () {
                view.updateTime();
            });
            view.audioElement = view.$audioElement[0];
            return this.updateTime();
        },
        updateTime: function () {
            this.$el.find('.time').html(
                formatTime(this.audioElement.currentTime) + ' / '
                + formatTime(this.audioElement.duration));
            return this;
        },
        play : function (event) {
            this.audioElement.play();
        },
        pause : function (event) {
            this.audioElement.pause();
        },
        stop : function (event) {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
            this.updateTime();
        },
        volumeUp : function (event) {
            this.alterVolume(stepSize);
        },
        volumeDown : function (event) {
            this.alterVolume(-stepSize);
        },
        alterVolume : function (amount) {
            var newVolume = this.audioElement.volume + amount;
            this.audioElement.volume = Math.min(Math.max(newVolume, 0), 1);
        }
    });
    
    return AudioView;
    
});