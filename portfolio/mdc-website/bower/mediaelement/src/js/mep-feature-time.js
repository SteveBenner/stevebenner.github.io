!function(o){o.extend(mejs.MepDefaults,{duration:-1,timeAndDurationSeparator:"<span> | </span>"}),o.extend(MediaElementPlayer.prototype,{buildcurrent:function(e,t,n,i){var s=this;o('<div class="mejs-time"><span class="mejs-currenttime">'+(e.options.alwaysShowHours?"00:":"")+(e.options.showTimecodeFrameCount?"00:00:00":"00:00")+"</span></div>").appendTo(t),s.currenttime=s.controls.find(".mejs-currenttime"),i.addEventListener("timeupdate",function(){e.updateCurrent()},!1)},buildduration:function(e,t,n,i){var s=this;t.children().last().find(".mejs-currenttime").length>0?o(s.options.timeAndDurationSeparator+'<span class="mejs-duration">'+(s.options.duration>0?mejs.Utility.secondsToTimeCode(s.options.duration,s.options.alwaysShowHours||s.media.duration>3600,s.options.showTimecodeFrameCount,s.options.framesPerSecond||25):(e.options.alwaysShowHours?"00:":"")+(e.options.showTimecodeFrameCount?"00:00:00":"00:00"))+"</span>").appendTo(t.find(".mejs-time")):(t.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container"),o('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">'+(s.options.duration>0?mejs.Utility.secondsToTimeCode(s.options.duration,s.options.alwaysShowHours||s.media.duration>3600,s.options.showTimecodeFrameCount,s.options.framesPerSecond||25):(e.options.alwaysShowHours?"00:":"")+(e.options.showTimecodeFrameCount?"00:00:00":"00:00"))+"</span></div>").appendTo(t)),s.durationD=s.controls.find(".mejs-duration"),i.addEventListener("timeupdate",function(){e.updateDuration()},!1)},updateCurrent:function(){var o=this;o.currenttime&&o.currenttime.html(mejs.Utility.secondsToTimeCode(o.media.currentTime,o.options.alwaysShowHours||o.media.duration>3600,o.options.showTimecodeFrameCount,o.options.framesPerSecond||25))},updateDuration:function(){var o=this;o.container.toggleClass("mejs-long-video",o.media.duration>3600),o.durationD&&(o.options.duration>0||o.media.duration)&&o.durationD.html(mejs.Utility.secondsToTimeCode(o.options.duration>0?o.options.duration:o.media.duration,o.options.alwaysShowHours,o.options.showTimecodeFrameCount,o.options.framesPerSecond||25))}})}(mejs.$);