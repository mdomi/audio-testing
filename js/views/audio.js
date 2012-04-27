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
            'click .volume.softer': 'volumeDown'
        },
        render : function () {
            var view = this;
            view.$el.html(view.template(view.model.toJSON()));
            view.$audioElement = view.$el.find('audio').on('loadeddata timeupdate volumechange', function () {
                view.updateDisplay();
            }).on('loadeddata', function() {
                view.$el.find('.play, .volume').removeAttr('disabled');
            }).on('play', function () {
                view.$el.find('.play').attr('disabled', true);
                view.$el.find('.stop, .pause').removeAttr('disabled');
            }).on('pause', function () {
                view.$el.find('.play').removeAttr('disabled');
                view.$el.find('.pause, .stop').attr('disabled', true);
            });
            view.audioElement = view.$audioElement[0];
            return this;
        },
        updateDisplay: function () {
            this.$el.find('.time').html(
                formatTime(this.audioElement.currentTime) + ' / '
                + formatTime(this.audioElement.duration));
            this.$el.find('.volumelevel').html(
                _.str.sprintf('Volume %u%%', this.audioElement.volume * 100)
            );
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
            this.updateDisplay();
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