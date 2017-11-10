/*
 * name: Christina Petris
 * github: christinapetris
 * release form confirmed by Tom White 26 Oct 2017
 */

var fireMove = 1;
function FaceMap_christinapetris() {
    this.bg_color = 0;
    
    this.hairOpacity = 50;
    this.bodyColourR = 255;
    this.bodyColourG = 50;
    this.bodyColourB = 50;
    this.skinOpacity = 50;
    this.eyeHue = 0;
    this.hairLength = 0;
    this.eyeBrightness = 0;
    this.skinSaturation = 50;
    
  this.draw = function(positions) {
    var nose_pos = average_point(positions.nose_bridge);
    var eye1_pos = average_point(positions.left_eye);
    var eye2_pos = average_point(positions.right_eye);
    var eyebrow1_pos = average_point(positions.left_eyebrow);
    var eyebrow2_pos = average_point(positions.right_eyebrow);
    var half_height = positions.chin[7][1] - nose_pos[1];
    var face_width = positions.chin[positions.chin.length-1][0] - positions.chin[0][0];
    var fire_pos=[[positions.chin[0][0],positions.chin[0][1]], 
                   [positions.chin[16][0],positions.chin[16][1]],
                   [positions.chin[3][0],positions.chin[3][1]],
                   [positions.chin[13][0],positions.chin[13][1]],
                   [positions.chin[6][0],positions.chin[6][1]],
                    [positions.chin[10][0],positions.chin[10][1]],
                     [positions.chin[8][0],positions.chin[8][1]]]
    var fire_pos2=[[positions.chin[0][0],positions.chin[0][1]], 
                   [positions.chin[16][0],positions.chin[16][1]],
                   [positions.chin[4][0],positions.chin[4][1]],
                   [positions.chin[12][0],positions.chin[12][1]],
                    [positions.chin[8][0],positions.chin[8][1]]]
    var x = nose_pos[0];
    var y = nose_pos[1];
    var w = 2 * face_width;
    var h = 2.5 * half_height;


    noStroke();
         //make fire animate
     fireMove = fireMove+0.05;
function occilation(n){return Math.sin(fireMove+n)*0.1}
      
      
    var extent = 0;
    if(h < w) {
      extent = h / 2;
    }
    else {
      extent = w / 2;
    }
    var scale2 = extent / 220.0;

    var curHairLength = map(this.hairLength, 0, 100, -0.5, 1.5);

      //fire1 (back layer of fire it is like the hair)
    var fh=[-2, -2.2, -3.2,-3.2,-3.9,-3.8,-4.5]  
    var fw=[-0.6, 0.6, -0.4,0.4, -0.2,0.2,0]
    var curHairOpacity = map(this.hairOpacity, 0, 100, 180, 30);
    var curRed = map(this.bodyColourR, 0, 100, 0, 255);
    var curGreen = map(this.bodyColourG, 0, 100, 0, 180);
    var curBlue = map(this.bodyColourB, 0, 100, 0, 180);

    fill(curRed, curGreen, curBlue, curHairOpacity);
    push();
    scale(1.05,1);
    translate(0,-0.3);
      
    for(var n=0; n<fw.length;n++) {
        beginShape();
      
        for(var i=1; i<positions.chin.length-8;i++) {
            vertex(positions.chin[i][0]-0.15, positions.chin[i][1]);
        }
        for(var i=8; i<positions.chin.length-1;i++) {
            vertex(positions.chin[i][0]+0.15, positions.chin[i][1]);
        }
        vertex(fire_pos[n][0]+fw[n]+occilation(n), fh[n]+curHairLength);
        endShape(CLOSE);
      }
    pop();
      //fire2
    var fh=[ -2,-2.2,-3,-3,-3.3]  
    var fw=[ -0.4,0.4, -0.2,0.2,0]
    var curHairOpacity = map(this.hairOpacity, 0, 100, 180, 30);
    var curRed = map(this.bodyColourR, 0, 100, 0, 255);
    var curGreen = map(this.bodyColourG, 0, 100, 0, 230);
    var curBlue = map(this.bodyColourB, 0, 100, 0, 230);

    fill(curRed, curGreen, curBlue, curHairOpacity);
    push();
    translate(0,-0.3);
    for(var n=0; n<fw.length;n++) {
            beginShape();
        for(var i=0; i<positions.chin.length-8;i++) {
              vertex(positions.chin[i][0]-0.15, positions.chin[i][1]);
        }
         for(var i=8; i<positions.chin.length;i++) {
              vertex(positions.chin[i][0]+0.15, positions.chin[i][1]);
        }
            vertex(fire_pos2[n][0]+fw[n]+occilation(n), fh[n]+curHairLength/2);
           endShape(CLOSE);
          }
pop();
      
      //face 
    push();
      translate(0,-0.4);
      var curSkinOpacity = map(this.skinOpacity, 0, 100, 1, 0);
      var curSkinSaturation = map(this.skinSaturation, 0, 100, 0,100);
  
      colorMode(HSB);
      fill(34, curSkinSaturation, 100, curSkinOpacity);
    beginShape();
    for(var i=1; i<positions.chin.length-1;i++) {
      vertex(positions.chin[i][0], positions.chin[i][1]);
    }
        vertex(positions.chin[16][0]-0.2, -0.8);
        vertex(positions.chin[16][0]-0.5, -1.3);
        vertex(positions.chin[16][0]-1, -1.8);
        vertex(0+occilation(n), -2.3);
        vertex(positions.chin[0][0]+1, -1.8);
        vertex(positions.chin[0][0]+0.5, -1.3);
        vertex(positions.chin[0][0]+0.2, -0.8);
    
    endShape(CLOSE);
      
      pop();
      
    // mouth
    noStroke();
    fill(34, curSkinSaturation,100,curSkinOpacity);
    beginShape();
    for(var i=0; i<positions.top_lip.length;i++) {
      vertex(positions.top_lip[i][0], positions.top_lip[i][1]);
    }
    endShape(CLOSE);
    beginShape();
    for(var i=0; i<positions.bottom_lip.length;i++) {
      vertex(positions.bottom_lip[i][0], positions.bottom_lip[i][1]);
    }
    endShape(CLOSE);
 colorMode(RGB);
    // inside of mouth
fill(this.bg_color);
    beginShape();
    for(var i=6; i<positions.bottom_lip.length;i++) {
      vertex(positions.bottom_lip[i][0], positions.bottom_lip[i][1]);
    }
    for(var i=6; i<positions.top_lip.length;i++) {
      vertex(positions.top_lip[i][0], positions.top_lip[i][1]);
    }
    endShape(CLOSE);
    fill(this.bg_color);

    // nose
    beginShape();
    for(var i=0; i<positions.nose_tip.length;i++) {
      vertex(positions.nose_tip[i][0], positions.nose_tip[i][1]);
    }
    endShape(CLOSE);

    // eyes

    fill(255);
    ellipse(eye1_pos[0], eye1_pos[1]+0.6, 0.8, 0.8);
    ellipse(eye2_pos[0], eye2_pos[1]+0.6, 0.8, 0.8);
      //pupil
       colorMode(HSB);
    var curEyeHue = map(this.eyeHue, 0, 100, 0, 360);
     var curEyeBrightness = map(this.eyeBrightness, 0, 100, 0, 100);
    fill(curEyeHue,50,curEyeBrightness);
    ellipse(eye1_pos[0], eye1_pos[1]+0.6, 0.6,  0.6);
    ellipse(eye2_pos[0], eye2_pos[1]+0.6,  0.6,  0.6);
      colorMode(RGB);
    fill(0);
    ellipse(eye1_pos[0], eye1_pos[1]+0.6, 0.4,  0.4);
    ellipse(eye2_pos[0], eye2_pos[1]+0.6,  0.4,  0.4);
     fill(255);
    ellipse(eye1_pos[0]+0.17, eye1_pos[1]+0.53, 0.15,  0.14);
    ellipse(eye2_pos[0]+0.17, eye2_pos[1]+0.53,  0.15,  0.14);
    
//eyebrows
      colorMode(HSB);
      fill(34, curSkinSaturation, 100, curSkinOpacity);
push();
      translate(0,0.5);
    beginShape();
    for(var i=0; i<positions.right_eyebrow.length; i++) {
      vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]);
    }
    vertex(positions.right_eyebrow[3][0], positions.right_eyebrow[3][1]+0.08);
    vertex(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1]+0.1); vertex(positions.right_eyebrow[1][0], positions.right_eyebrow[1][1]+0.11);
    vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1]+0.12);
    endShape(CLOSE);
    beginShape();
    for(var i=0; i<positions.left_eyebrow.length; i++) {
      vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]);
    }
    vertex(positions.left_eyebrow[4][0], positions.left_eyebrow[4][1]+0.12);
    vertex(positions.left_eyebrow[3][0], positions.left_eyebrow[3][1]+0.11);
    vertex(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1]+0.1); 
    vertex(positions.left_eyebrow[1][0], positions.left_eyebrow[1][1]+0.08);
    endShape(CLOSE);
pop();
      colorMode(RGB);
        var curHairOpacity = map(this.hairOpacity, 0, 100, 0, 255);
    fill(0, curHairOpacity);
push();
      translate(0,0.5);
    beginShape();
    for(var i=0; i<positions.right_eyebrow.length; i++) {
      vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]);
    }
    vertex(positions.right_eyebrow[3][0], positions.right_eyebrow[3][1]+0.08);
    vertex(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1]+0.1); vertex(positions.right_eyebrow[1][0], positions.right_eyebrow[1][1]+0.11);
    vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1]+0.12);
    endShape(CLOSE);
    beginShape();
    for(var i=0; i<positions.left_eyebrow.length; i++) {
      vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]);
    }
    vertex(positions.left_eyebrow[4][0], positions.left_eyebrow[4][1]+0.12);
    vertex(positions.left_eyebrow[3][0], positions.left_eyebrow[3][1]+0.11);
    vertex(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1]+0.1); 
    vertex(positions.left_eyebrow[1][0], positions.left_eyebrow[1][1]+0.08);
    endShape(CLOSE);
pop();
    strokeWeight(1);  

      pop();
  }
  this.randomize = function(values, size) {

  
  
  this.fireOpacity = focusedRandom(0, 250, 5);
 this.flameSpread=focusedRandom(0,0);
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.hairOpacity = settings[0];
    this.bodyColourR = settings[1];
    this.bodyColourG = settings[2];
   this.bodyColourB = settings[3];
   this.skinOpacity = settings[4];
   this.eyeHue = settings[5];
   this.eyeBrightness = settings[6];
   this.hairLength = settings[7];
 this.skinSaturation  = settings[8];
   
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    properties = new Array(8);
    properties[0] = this.hairOpacity;
    properties[1] = this.bodyColourR;
      properties[2] = this.bodyColourG;
      properties[3] = this.bodyColourB;
      properties[4] = this.skinOpacity;
      properties[5] = this.eyeHue;
      properties[6]= this.eyeBrightness;
      properties[7]= this.hairLength;
      properties[8]= this.skinSaturation;
    return properties;
  }
}

// given a point, return the average
function average_point(list) {
  var sum_x = 0;
  var sum_y = 0;
  var num_points = 0;
  for(var i=0; i<list.length; i++) {
    sum_x += list[i][0];
    sum_y += list[i][1];
    num_points += 1; 
  }
  return [sum_x / num_points, sum_y / num_points];
}

