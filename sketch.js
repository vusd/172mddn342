var canvasWidth = 960;
var canvasHeight = 500;
var button;
var curRandomSeed;
var mainFace;
var faceImages = [];
var curFaceIndex = 0;
var main_canvas;
var faceSelector;
var facelist = [];
var NUMFACES = 6*9;

var faceData = [
  {
  "url": "z_face1.jpg",
  "embedding": [null],
  "landmarks": [
      {
          "bottom_lip":
              [[219, 206], [208, 221], [194, 226], [185, 227], [175, 227], [164, 221], [154, 208], [158, 209], [176, 218], [185, 219], [194, 218], [217, 207]],
          "nose_tip":
              [[169, 189], [176, 191], [184, 192], [191, 190], [200, 189]],
          "nose_bridge":
              [[183, 141], [183, 154], [183, 167], [183, 180]],
          "top_lip":
              [[154, 208], [165, 205], [176, 202], [185, 204], [193, 202], [207, 204], [219, 206], [217, 207], [193, 208], [185, 210], [176, 209], [158, 209]],
          "right_eyebrow":
              [[195, 125], [208, 120], [222, 119], [235, 122], [245, 131]],
          "left_eye":
              [[144, 143], [151, 139], [159, 139], [166, 146], [159, 147], [150, 146]],
          "left_eyebrow":
              [[131, 132], [138, 123], [149, 120], [161, 121], [172, 125]],
          "chin":
              [[122, 151], [121, 168], [123, 185], [127, 202], [133, 219], [143, 233], [154, 247], [167, 258], [185, 262], [203, 259], [221, 251], [237, 238], [250, 224], [256, 207], [259, 189], [261, 170], [261, 152]],
          "right_eye":
              [[205, 146], [212, 139], [221, 138], [228, 143], [221, 145], [212, 146]]
      }
    ]
  },
  {
  "url": "z_face2.jpg",
  "embedding": [null],
  "landmarks": [
    {"nose_tip": [[258, 199], [266, 200], [274, 201], [282, 199], [289, 197]], "left_eye": [[216, 159], [226, 152], [239, 152], [250, 161], [239, 164], [225, 164]], "right_eyebrow": [[286, 130], [300, 123], [315, 121], [330, 125], [338, 137]], "right_eye": [[291, 159], [300, 148], [313, 147], [323, 154], [315, 160], [302, 161]], "left_eyebrow": [[197, 144], [206, 132], [221, 126], [237, 127], [253, 131]], "bottom_lip": [[310, 217], [297, 229], [286, 234], [277, 235], [268, 235], [255, 232], [239, 221], [245, 222], [268, 225], [276, 226], [285, 224], [304, 218]], "chin": [[185, 160], [189, 180], [194, 199], [200, 216], [209, 233], [222, 246], [238, 257], [256, 265], [276, 267], [295, 263], [311, 252], [325, 240], [336, 226], [343, 209], [345, 190], [346, 172], [347, 153]], "nose_bridge": [[271, 152], [272, 164], [273, 175], [274, 186]], "top_lip": [[239, 221], [255, 218], [268, 215], [276, 216], [284, 214], [296, 216], [310, 217], [304, 218], [284, 220], [276, 221], [268, 221], [245, 222]]}
    ]
  },
  {
  "url": "z_face3.jpg",
  "embedding": [null],
  "landmarks": [
    {"bottom_lip": [[253, 150], [244, 153], [237, 153], [232, 152], [228, 150], [224, 147], [221, 142], [224, 142], [230, 144], [234, 146], [238, 146], [250, 149]], "nose_tip": [[231, 128], [234, 131], [237, 133], [242, 133], [246, 132]], "top_lip": [[221, 142], [226, 139], [232, 139], [235, 141], [240, 141], [246, 145], [253, 150], [250, 149], [239, 146], [235, 145], [231, 144], [224, 142]], "left_eye": [[221, 97], [226, 95], [232, 96], [236, 102], [231, 102], [225, 101]], "right_eye": [[258, 107], [264, 104], [271, 105], [275, 110], [270, 111], [263, 110]], "right_eyebrow": [[255, 94], [264, 92], [272, 93], [281, 96], [287, 101]], "chin": [[209, 96], [206, 107], [205, 118], [204, 129], [205, 140], [208, 150], [214, 159], [220, 167], [231, 172], [243, 173], [257, 171], [270, 166], [281, 160], [288, 151], [293, 139], [297, 128], [300, 116]], "left_eyebrow": [[215, 86], [221, 84], [228, 85], [235, 87], [241, 92]], "nose_bridge": [[245, 102], [243, 109], [240, 117], [238, 124]]}
    ]
  }
]

var faceMapping = null;

function preload () {
  extraFaceData = loadJSON('face_data.json');
}

function setup () {
  var extraFaceDataArray = Object.values(extraFaceData);
  Array.prototype.unshift.apply(faceData, extraFaceDataArray);
  // create the drawing canvas, save the canvas element
  main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  curRandomSeed = int(focusedRandom(0, 100));

  for(var i=0; i<NUMFACES; i++) {
    var face = new Face();
    facelist.push(face);
  }

  mainFace = new FaceMap();

  for(var i=0; i<faceData.length; i++) {
   var data = faceData[i];
   data.image = loadImage(data.url) 
  }

  faceSelector = createSelect();
  faceSelector.option('Face');
  faceSelector.option('FaceMap');
  faceSelector.value('FaceMap');
  faceSelector.parent('selector1Container');

  // rotation in degrees
  angleMode(DEGREES);
}

// global variables for colors
var bg_color1 = [225, 206, 187];

var lastSwapTime = 0;
var millisPerSwap = 5000;

function changeRandomSeed() {
  curRandomSeed = curRandomSeed + 1;
  lastSwapTime = millis();
}

function mouseClicked() {
  changeRandomSeed();
}

function draw () {
  var data = faceData[curFaceIndex];
  var mode = faceSelector.value();

  if(millis() > lastSwapTime + millisPerSwap) {
    lastSwapTime = millis();
    // changeRandomSeed();
  }

  resetFocusedRandom(curRandomSeed);

  noStroke();
  background(bg_color1);

  if (mode == 'Face') {
    var w = canvasWidth / 10;
    var h = canvasHeight / 6;
    var max_shift = 0.2 * w;
    var cur_face = 0;
    for(var i=0; i<6; i++) {
      for(var j=0; j<9; j++) {
        var face = facelist[cur_face];
        cur_face = cur_face + 1;

        var y = h/2 + h*i;
        var x = w/2 + w*j;

        // shift even rows over by half a face
        if(i%2 == 0) {
          x = x + w/2;
        }

        // noFill();
        // stroke(255, 0, 0);
        // rect(x-w/2, y-w/2, w, h);
        face.randomize();
        face.draw1(x, y, w, h);
        // noStroke();
        // fill(255, 0, 0);
        // ellipse(x-2, y-2, 4, 4);
      }
    }
  }

  else {
    // Displays the image at its actual size at point (0,0)
    var img = data.image
    var x1 = (width/4-400/2);
    var x2 = (3*width/4-400/2);
    var y1 = (height/2-400/2);
    image(img, x1, y1, 400, 400);
    image(img, x2, y1, 400, 400);
    var scale_x = 400.0 / img.width;
    var scale_y = 400.0 / img.height;

    for(var i=0; i<data.landmarks.length; i++) {
      // get array of face marker positions [x, y] format
      var positions = data.landmarks[i];
      var shifted_positions = JSON.parse(JSON.stringify(positions))

      stroke(0);
      fill(255);
      Object.keys(positions).forEach(function(key) {
        var curSection = positions[key];
        var shiftedSection = shifted_positions[key];
        for (var i=0; i<curSection.length; i++) {
          var cur_x = scale_x * curSection[i][0];
          var cur_y = scale_y * curSection[i][1];
          ellipse(x1+cur_x, y1+cur_y, 4, 4);
          // get ready for drawing the face
          shiftedSection[i][0] = cur_x + x2;
          shiftedSection[i][1] = cur_y + y1;
        }
      });

      mainFace.draw(shifted_positions);
    }
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    curFaceIndex = (curFaceIndex + faceData.length - 1) % faceData.length;
  } else if (keyCode === RIGHT_ARROW) {
    curFaceIndex = (curFaceIndex + 1) % faceData.length;
  }
}
