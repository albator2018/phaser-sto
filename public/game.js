bootState = {
  init: function() {
    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  },
  preload: function() {
    game.load.image("progressBar", "assets/sprites/preloader.png"),
    game.load.image("progressBarBg", "assets/sprites/preloaderbg.png"),
    game.load.image("loader", "assets/sprites/loader.png")
  },
  create: function() {
    game.state.start("load")
  }
},
loadState = {
  preload: function() {
    var a = game.add.image(game.world.centerX, 150, "loader");
    a.anchor.setTo(.5, .5);
    var b = game.add.sprite(game.world.centerX, 200, "progressBarBg");
    b.anchor.setTo(.5, .5);
    var c = game.add.sprite(game.world.centerX, 200, "progressBar");
    c.anchor.setTo(.5, .5),
    game.load.setPreloadSprite(c),

    game.load.image('logo', 'assets/sprites/logo.jpg'),
    game.load.audio("viewscreen", "assets/audio/tos_main_viewing_screen.mp3"),
    game.load.image('sto', 'assets/pics/sto.jpg'),
    game.load.image('start', 'assets/buttons/button_start.png'),
    game.load.image('settings', 'assets/buttons/button_settings.png'),
    game.load.image('credits', 'assets/buttons/button_credits.png'),
    game.load.spritesheet("soundButton", "assets/buttons/soundButton.png", 38, 38, 2);
  },
  create: function() {
    game.state.start("splash")
  }
},
splashState = {
  create: function() {
    var logo = game.add.image(game.world.centerX, game.world.centerY, 'logo');
    logo.anchor.set(0.5);
    logo.alpha = 0.1;
    //  This tween will wait 0 seconds before starting
    var tween = game.add.tween(logo).to( { alpha: 1 }, 3000, "Linear", true, 0);
    tween.onComplete.add(this.startMenu, this)
  },
  startMenu: function() {
    game.state.start("menu")
  }
},
menuState = {
  create: function() {
    var sto = game.add.sprite(game.world.centerX, 125, 'sto');
    sto.anchor.set(0.5);

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    var start = game.add.button(game.world.centerX, game.world.centerY, 'start', this.startOnClick, this);
    start.anchor.setTo(0.5, 0.5);
    var settings = game.add.button(game.world.centerX, game.world.centerY + 70, 'settings', this.settingsOnClick, this);
    settings.anchor.setTo(0.5, 0.5);
    var credits = game.add.button(game.world.centerX, game.world.centerY + 140, 'credits', this.creditsOnClick, this);
    credits.anchor.setTo(0.5, 0.5);

    var s = game.add.audio('viewscreen');
    s.loop = true;
    s.play();

    var sound = localStorage.getItem("sound") || localStorage.setItem("sound", 1);
    game.sound.mute = sound;

  },
  update: function() {
    if (spaceKey.isDown){
      console.log("spacebar");
      game.state.start('play');
    }
  },
  startOnClick: function() {
    game.state.start('play');
  },
  settingsOnClick: function() {
    game.state.start('settings');
  }
},
playState = {
  create: function() {
    console.log("Are you playing STO ?");
  }
},
settingsState = {
  create: function() {
    this.soundButton = game.add.button(game.world.centerX, game.world.centerY + 70, "soundButton", this.toggleSound);
    this.soundButton.frame = game.sound.mute ? 1 : 0;
    console.log("Are you playing STO ?");
  },
  toggleSound: function() {
    game.sound.mute = !game.sound.mute;
    this.soundButton.frame = game.sound.mute ? 1 : 0;
    console.log(game.sound.mute);
    localStorage.setItem("sound", game.sound.mute);
  }
},
creditsState = {
  create: function() {
    console.log("Are you playing STO ?");
  }
};
game = new Phaser.Game(640, 480);
game.state.add("boot", bootState),
game.state.add("load", loadState),
game.state.add("splash", splashState),
game.state.add("menu", menuState),
game.state.add("play", playState),
game.state.add("settings", settingsState),
game.state.add("credits", creditsState),
game.state.start("boot");
