mocha.reporter(function(runner) {
  Mocha.reporters.HTML.call(this, runner)

  var unityReady = function() {
    Unity.Launcher.setCount(runner.stats.failures);
    Unity.Launcher.setProgress(runner.stats.tests / runner.total);

    runner.on('test', function() {
      Unity.Launcher.setProgress(this.stats.tests / runner.total);
    });
    runner.on('fail', function() {
      Unity.Launcher.setCount(this.stats.failures);
    });
    runner.on('end', function() {
      Unity.Launcher.setProgress(1.0);
      Unity.Notification.showNotification(
        "Konacha Results",
        "" + this.stats.passes + " passed, " + this.stats.failures + " failures, " + this.stats.pending + " pending",
        null
      );
      Unity.Launcher.clearProgress();
    });
  }

  var Unity = external.getUnityObject(1.0);
  Unity.init({
    name: "Konacha",
    iconUrl: "http://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Konacha.jpg/320px-Konacha.jpg",
    onInit: unityReady
  });
});

