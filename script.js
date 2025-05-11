// CUSTOM CURSOR
const ball = new Cotton("#ball", {
    speed: 1, 
    models: ["a", "label", "button", "#load_enter"]
  });
  const ballRing = new Cotton("#ball_ring", {
    speed: 0.25, 
    models: ["a", "label", "button", "#load_enter"]
  });
  

// CUSTOM TOOLTIPS BY TIPPY.JS
tippy("[title]", {
  theme: "custom",
  duration: 0,
  arrow: false,
  animation: "shift-toward-subtle",
  followCursor: true,
  zIndex: 9999999999,
  content(reference) {
    const title = reference.getAttribute("title");
    reference.removeAttribute("title");
    return title;
  },
});
  
  
// HOWLER.JS 
// Background music
// const sound = new Howl({
//   src: "Assets/Audio/Ambient/Chronicler Background.mp3",
//   autoplay: true,
//   loop: true,
//   volume: 0.5, 
//   onplayerror: function() {
//     sound.once("unlock", function() {
//     sound.play();
//     });
//   }
// });

const playAudio = document.getElementById("play");
const pauseAudio = document.getElementById("pause");

playAudio.addEventListener("click", function() {
    sound.play();
    playAudio.style.display = "none";
    pauseAudio.style.display = "flex";
});
pauseAudio.addEventListener("click", function() {
    sound.stop();
    pauseAudio.style.display = "none";
    playAudio.style.display = "flex";
});

// FX music
const soundHover = new Howl({
  src: "Assets/Audio/FX/Notification.wav",
  autoplay: false,
  loop: false,
  volume: 0.75,
});
const soundClick = new Howl({
  src: "Assets/Audio/FX/Click.wav",
  autoplay: false,
  loop: false,
  volume: 0.75,
});

const hoverAudio = document.querySelectorAll("button");

hoverAudio.forEach(button => {
  button.addEventListener("mouseover", function() {
      soundHover.play();
  });
  button.addEventListener("mouseleave", function() {
    soundHover.stop();
  });
  button.addEventListener("click", function() {
    soundClick.play();
});
});


// POWERGLITCH
PowerGlitch.glitch("#load_bg", { 
  playMode: "always",
  hideOverflow: false,
  glitchTimeSpan: {
    start: 0,
    end: 0.5,
  },
  shake: {
    velocity: 10,
    amplitudeX: 0.4,
    amplitudeY: 0.4,
  },
  slice: {
    count: 4,
    velocity: 5,
    minHeight: 0.02,
    maxHeight: 0.40,
    hueRotate: true,
  },
  "timing": {
    "iterations": 1,
  }
});


// PERCENTAGE LOADER
loading();

function loading(_success) {
  inner = document.querySelector("#load_text");
  var w = 0,
    t = setInterval(function() {
      w = w + 1;
      inner.textContent = w+"%";
      if (w === 100) {
        clearInterval(t);
        w = 0;
      }
    }, 60);
};


// GSAP
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TextPlugin, ScrambleTextPlugin, Draggable, InertiaPlugin);

// On load
let loader = gsap.timeline({
  ease: "power4.inOut"
});

loader.to(".load_title h1", {
  duration: 2.5, 
  scrambleText: "Chronicler"
});
loader.fromTo(".load_title h2", {
  autoAlpha: 0
}, {
  autoAlpha: 1,
  duration: 1.5, 
  scrambleText: "History is a choice."
}, 1.5);

loader.fromTo(".load_bar", {
  autoAlpha: 0,
  scaleX: 0, 
  transformOrigin:"center", 
  duration: 0.5, 
}, {
  autoAlpha: 1,
  scaleX: 1,
}, 3.5);
loader.fromTo("#load_text", {
  autoAlpha: 0
}, {
  autoAlpha: 1
}, 3.5)
loader.from("#bar_move", {
  scaleX: 0, 
  transformOrigin: "left center", 
  duration: 2.5
}, 4);
loader.fromTo(".load_bar", {
  autoAlpha: 1,
}, {
  autoAlpha: 0,
}, 7.5);

loader.fromTo(".load_enter", {
  autoAlpha: 0,
}, {
  autoAlpha: 1,
}, 8.5);
loader.to("#begin", {
  duration: 1.5,
  scrambleText: "Begin?"
}, 8.5);

// Click to begin
let begin = gsap.timeline({
  ease: "expo.inOut",
  duration: 1
});

document.querySelector("#begin").addEventListener("click", e => {
  begin.to(".load_wrap", {
    autoAlpha: 0
  }, 1);
  begin.fromTo(".narration_wrap", {
    autoAlpha: 0
  }, {
    autoAlpha: 1
  }, 2);

  const contCh1 = document.getElementById("cont_ch1");
  const contCh2 = document.getElementById("cont_ch2");
  const contCh3 = document.getElementById("cont_ch3");
  const contDevice = document.getElementById("device");
  
  let typewriter = gsap.timeline({
    delay: 1
  });
  var charsPerSecond = 25;

  function typing(target, content) {
  typewriter.to(target, {
      duration: content.length / charsPerSecond,
      text: content,
      ease: "none"
    });
  }

  document.querySelector("#intro .time_icon").style.display = "flex";

  typing("#log_time_intro", "The time is 09:04 Earth Standard Time.");
  typing("#log_text_intro_1", "ASSIGNMENT LOG.");
  typing("#log_text_intro_2", "My spacecraft has just landed on CERACUS IV. No technical difficulties as had been seen with CERACUS III. Wind speed is much less of a concern here, though upon entering the atmosphere, I was immediately met with heavy rainfall.");
  typing("#log_text_intro_3", "Initial reports by H.U.G.O. show significant ocean on this moon, with three medium-sized landmasses. No activity suggests intelligent life can be found here anymore, though significant urban ruin has led me to the current landing point on the moon’s largest continent. I did have to maneuver manually during descent in order to avoid the remains of what appears to have once been a large dome, which has shattered outward. Potentially used to keep out the rain.");
  typing("#log_text_intro_4", "The current plan is similar to my original CERACUS III plan before that all went to shit. Censor for the record. If Imperial architecture remains consistent, using records from my journey last month through the KORMENA SYSTEM, then the archives should be at the urban center.");

  contCh1.addEventListener("click", e => {
    contCh1.style.display = "none";
    contCh2.style.display = "flex";
    contCh3.style.display = "none";
    contDevice.style.display = "none";
    
    document.querySelector("#ch1 .time_icon").style.display = "flex";

    typing("#log_time_ch1", "12:43 E.S.T");
    typing("#log_text_ch1_1", "Rain shows no sign of slowing, but I have hiked through much of the destroyed settlement. H.U.G.O. has been collecting samples along the way. Levels of sodium chloride are strangely high for rainwater, though flora so far has been recorded by H.U.G.O.’s comparison system as indicative of marine life. Let the record show I’m walking on land. It’s not what I was expecting for the heart of the Imperial historia.");
    typing("#log_text_ch1_2", "[…]");
    typing("#log_text_ch1_3", "Then again, I’ve been nothing if not frequently surprised in these last eight years.");
  });

  contCh2.addEventListener("click", e => {
    contCh1.style.display = "none";
    contCh2.style.display = "none";
    contCh3.style.display = "flex";
    contDevice.style.display = "none";

    document.querySelector("#ch2 .time_icon").style.display = "flex";

    typing("#log_time_ch2", "13:38 E.S.T");
    typing("#log_text_ch2_1", "I’ve made it what should be the central archive. The greatest archive. It’s intensely strange. Let the record recall description from DANNA X and ROMMUS II.");

    document.querySelector("#ch2 aside .time_icon").style.display = "flex";
    typewriter.fromTo("#ch2 aside", {
      autoAlpha: 0
    }, {
      autoAlpha: 1
    });

    typing("#log_text_ch2_2", "c;/files/archive_id_08071081/");
    typing("#log_text_ch2_3", "Archives were once the very heart of Imperial society and function. These histories were detailed, complex, and for much of the later life of the Empire recorded using especially convoluted devices. We know the devices were convoluted because the drives the information is stored on are also especially convoluted. No one on Earth has been able to uncover their meanings. It would help, of course, if we had ever been able to find one of these devices.");
    typing("#log_text_ch2_4", "Usually, archives are filled with drives, stacked like the spines of books along narrow alcoves, but this one doesn’t even look like it has space for them.");
    typing("#log_text_ch2_5", "[The crunching of glass underfoot.]");
    typing("#log_text_ch2_6",  "This room is mostly rubble, which isn’t exactly conducive, but I’ll try to sift through some of it. If that doesn’t work—");
    typing("#log_text_ch2_7", "[...]");
    typing("#log_text_ch2_8", "I’ve found something. It looks like a tablet. If tablets were, you know, made of iron. There looks to be a slot on the side that…could this…?");
  });

  contCh3.addEventListener("click", e => {
    contCh1.style.display = "none";
    contCh2.style.display = "none";
    contCh3.style.display = "none";
    contDevice.style.display = "flex";

    typing("#log_text_ch3_1", "I can’t believe it. After years of searching. H.U.G.O., translate what you can.");
    typing("#log_text_ch3_2", "This thing is a mess. Probably the age of it. But my God the amount of information this holds. It goes back centuries. This is incredible. I <i>think</i>.");
    typing("#log_text_ch3_3", "Let the record show I’m going to attempt to sort the data out—if I make sense of it, that may just mean assignment complete. I may just be able to go home.");
  });
});

// Switch to device
let device = gsap.timeline({
  ease: "expo.inOut",
  duration: 1
});

document.querySelector("#exitDirection").addEventListener("click", e => {
  device.fromTo(".device_direction", {
    autoAlpha: 1
  }, {
    autoAlpha: 0
  });

  const soundFlicker = new Howl({
    src: "Assets/Audio/FX/Load.wav",
    autoplay: true,
    loop: false,
    volume: 0.75,
  });
  soundFlicker.play();

  let deviceStagger = gsap.utils.toArray([".weather_title", ".weather_info .info", ".keys_inacitve_head h3", ".head_data", ".head_connect", ".foot_buttons", ".foot .id", ".node.one", ".game_insert"]);
  device.fromTo(deviceStagger, {
    autoAlpha: 0, 
  }, {
    autoAlpha: 1, 
    stagger: {
      amount: 0.25,
      from: "random",
      repeat: 1, 
      ease: "power4.inOut"
    },
    delay: 1,
  }, 2.5);

  let keysStagger = gsap.utils.toArray(".key");
  device.fromTo(keysStagger, {
    autoAlpha: 0
  }, {
    autoAlpha: 1, 
    stagger: {
      amount: 0.5,
      ease: "power4.inOut"
    },
  }, 3.5);
});


// gsap.fromTo("#node", {
//   scale: 1
// }, {
//   scale: 1.25,
//   duration: 2.5, 
//   repeat: -1, 
//   ease: "power4.inOut"
// });

document.querySelector("#enterDirection").addEventListener("click", e => {
  device.fromTo(".device_direction", {
    autoAlpha: 0
  }, {
    autoAlpha: 1
  });
});

document.querySelector("#device").addEventListener("click", e => {
  device.fromTo(".narration_wrap", {
    autoAlpha: 1
  }, {
    autoAlpha: 0
  }, 1);
  device.fromTo(".device_wrap", {
    autoAlpha: 0
  }, {
    autoAlpha: 1
  }, 2);
});

// Draggable keys
function addClass(el, className) {
  el.classList.add(className);
}
function removeClass(el, className) {
  el.classList.remove(className);
}
const hitArea = document.querySelector(".game_insert");

Draggable.create(".fake_key", {
  bounds: window,
  type: "x,y",
  force3D: true,
  onPress: function(){
    console.log(this.origX, this.origY);
    if(!this.origX || !this.origY){
      this.origX = this.startX;
      this.origY = this.startY;
    }
  },
  onDragEnd:function(pointerEvent) {
    const hit = this.hitTest(hitArea);
    if(!hit) {
      removeClass(this.target, "highlight");
      document.querySelector(".game_insert").style.visibility = "visible";

      gsap.to(this.target,{ 
        x: 0, 
        y: 0, 
        duration: 0.35, 
        ease: "back.out(1.7)" 
      });
    } else {
      addClass(this.target, "highlight");
      document.querySelector(".game_insert").style.visibility = "hidden";

      const soundInsert = new Howl({
        src: "Assets/Audio/FX/Click_Robot.wav",
        autoplay: false,
        loop: false,
        volume: 0.75,
      });
      soundInsert.play();

      const a = hitArea.getBoundingClientRect();
      const b = this.target.getBoundingClientRect();
      
      gsap.to(this.target, {
        x: this.x - (b.left - a.left),
        y: this.y - (b.top - a.top), 
      });
      gsap.to(this.target, {
        duration: 0.5,
      }, 0);

      gsap.fromTo(".fake_key_read_wrap", {
        autoAlpha: 0
      }, {
        autoAlpha: 1
      });
      gsap.to(".fake_key_read_scramble", {
        duration: 1.5, 
        scrambleText: "Reading Key..."
      });
      gsap.fromTo(".fake_key_read_wrap", {
        autoAlpha: 1
      }, {
        autoAlpha: 0, 
        delay: 2
      });
      gsap.fromTo(".artifact_wrap", {
        autoAlpha: 0
      }, {
        autoAlpha: 1, 
        delay: 3
      });
    }
  }
});

document.querySelector("#close").addEventListener("click", e => {
  gsap.fromTo(".artifact_wrap", {
    autoAlpha: 1
  }, {
    autoAlpha: 0
  });
  removeClass(this.target, "highlight");
  document.querySelector(".game_insert").style.visibility = "visible";

  gsap.to(this.target,{ 
    x: 0, 
    y: 0, 
    duration: .35, 
    ease: "back.out(1.7)" 
  });
});

document.querySelector("#sort").addEventListener("click", e => {
  gsap.fromTo(".artifact_wrap", {
    autoAlpha: 1
  }, {
    autoAlpha: 0
  });
  gsap.fromTo(".artifact_drag", {
    autoAlpha: 0
  }, {
    autoAlpha: 1
  });
});

// Draggable to nodes
const hitNode = document.querySelector(".node");

Draggable.create(".artifact_drag", {
  bounds: ".device",
  dragResistance: 0,
  type: "x,y",
  inertia: false,
  force3D: true,
  edgeResistance: 0.65,
  throwResistance: 1000,
  overshootTolerance: 0,
  onDragEnd:function(pointerEvent) {
    const hit = this.hitTest(hitNode);
    if(!hit) {
      gsap.to(this.target,{ 
        x: 0, 
        y: 0, 
        duration: 0.35, 
        ease: "back.out(1.7)" 
      });
    } else {
      document.querySelector(".game_insert").style.visibility = "visible";

      const a = hitNode.getBoundingClientRect();
      const b = this.target.getBoundingClientRect();
      
      gsap.to(this.target, {
        x: this.x - (b.left - a.left),
        y: this.y - (b.top - a.top), 
      });
      gsap.fromTo(".fake_key", {
        autoAlpha: 1
      }, {
        autoAlpha: 0
      });
      gsap.fromTo(".node_connect", {
        ease: "power4.inOut",
        autoAlpha: 0,
        scaleX: 0, 
        transformOrigin: "left center", 
        duration: 7.5
      }, {
        autoAlpha: 1,
        scaleX: 1,
      });
      gsap.fromTo(".node.two", {
        autoAlpha: 0
      }, {
        autoAlpha: 1, 
      });
    }
  }
});