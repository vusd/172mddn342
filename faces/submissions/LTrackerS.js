/*
 * name: Hamzah Ali
 * github: LTrackerS
 * release form confirmed by Tom White 26 Oct 2017
 */

/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// other variables can be in here too
// these control the colors used
var bg_color = [225, 206, 187];
var fg_color = [255,255,245];
stroke_color = [95, 52, 8];

var bg_color = "grey";
var fg_color1 = "rgb(177,215,151)";
var ZamasuFaceColor1 = "rgb(177,215,151)";
var ZamasuFaceColor2 = "rgb(157,195,131)";
var ZamasuFaceColor3 = "rgba(0,0,0, 0.2)";
var ZamasuFaceColor4 = "rgba(0,0,0,0.15)";

var ZamasuHairColor1 = "rgb(232,236,236)";
var ZamasuHairColor2 = "rgb(169,176,175)";
var ZamasuHairColor3 = "rgb(252,256,256)";
var ZamasuHairColor4 = "rgb(212,216,216)";

var ZamasuPotEaringColor1 = "rgb(243,255,84)";
var ZamasuPotEaringColor2 = "rgb(145,157,0)";
var ZamasuPotEaringColor3 = "rgb(18,223,42)";
var fg_color2 = "#999999";

var stroke_color = "black";
var eyecolor1 = "rgb(158,160,160)";
var eyecolor2 = "rgb(15,15,15)";
var eyecolor3 = "rgb(255,255,255";
var eyecolor4 = "rgb(211,198,213)";

var ShinFaceColor1 = "rgb(233,145,239)";
var ShinFaceColor2 = "rgb(203,115,209)";

var FaceColor1 = "rgb(86,147,255)";
var FaceColor2 = "rgb(66,127,235)";

var FaceColor3 = "rgb(255,253,109)";
var FaceColor4 = "rgb(225,223,89)";

function FaceMap() {
  this.faceColor_value = 50;
  this.hairColor_value = 50;
  this.faceColor2_value = 50;
  this.earring_value = 1;
  this.hairSegment1_value = 1;
  this.hairSegment2_value = 1;
  this.hairSegment3_value = 1;

  /*
   * Draw a face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {

    // Creating the lerp colours for sliders.
    var c1 = color(ZamasuFaceColor1);
    var c2 = color(ShinFaceColor1);
    var faceColorBlend = lerpColor(c1, c2, this.faceColor_value/100);

    var c3 = color(ZamasuFaceColor2);
    var c4 = color(ShinFaceColor2);
    var faceColorBlend2 = lerpColor(c3, c4, this.faceColor_value/100);

    var c9 = color(eyecolor1);
    var c10 = color(eyecolor4);
    var eyeColorBlend = lerpColor(c9, c10, this.faceColor2_value/100);

    var c11 = color(ZamasuHairColor3);
    var c12 = color(ZamasuHairColor4);
    var hairColorBlend = lerpColor(c11, c12, this.hairColor_value/100);


    // Average positions of facial feature points
    var nose_pos = average_point(positions.nose_bridge);
    var eye1_pos = average_point(positions.left_eye);
    var eye2_pos = average_point(positions.right_eye);

	var eyebrowLeft_pos = average_point(positions.left_eyebrow);
    var eyebrowRight_pos = average_point(positions.right_eyebrow);

    var mouthTop_pos = average_point(positions.top_lip);
	var mouthBottom_pos = average_point(positions.bottom_lip);

	var noseTip_pos = average_point(positions.nose_tip);
	var noseBridge_pos = average_point(positions.nose_bridge);

    var half_height = positions.chin[7][1] - nose_pos[1];
    var face_width = positions.chin[positions.chin.length-1][0] - positions.chin[0][0];

    var leftEarLength = positions.left_eye[0][0] - positions.chin[0][0];
    var rightEarLength = positions.right_eye[3][0] - positions.chin[16][0];

    var x = nose_pos[0];
    var y = nose_pos[1];
    var w = 2 * face_width;
    var h = 2.5 * half_height;

    var extent = 0;
    if(h < w) {
      extent = h / 2;
    }
    else {
      extent = w / 2;
    }
    var scale = extent / 220.0;


    // Ears
    noStroke();
    fill(faceColorBlend2);

    // Left Ear
    beginShape();
    	vertex(positions.chin[1][0] + (20 * scale), positions.chin[1][1]);
    	vertex(positions.chin[3][0] + (20 * scale), positions.chin[3][1]);
    	vertex(positions.chin[2][0] - (25 * scale * leftEarLength), positions.chin[3][1] - (6 * scale * leftEarLength));
    	vertex(positions.chin[1][0] - (80 * scale * leftEarLength), positions.chin[1][1] - (20 * scale * leftEarLength));
    endShape();

    // Right Ear
    beginShape();
    	vertex(positions.chin[15][0] - (20 * scale), positions.chin[15][1]);
    	vertex(positions.chin[13][0] - (20 * scale), positions.chin[13][1]);
    	vertex(positions.chin[14][0] + (25 * scale * -rightEarLength), positions.chin[13][1] + (6 * scale * rightEarLength));
    	vertex(positions.chin[15][0] + (80 * scale * -rightEarLength), positions.chin[15][1] + (20 * scale * rightEarLength));
    endShape();


    // Ear Shading
    noStroke();
    fill(ZamasuFaceColor4);

    if (leftEarLength < -rightEarLength) {
	    // Left Ear
	    beginShape();
	    	vertex(positions.chin[1][0] + (20 * scale), positions.chin[1][1]);
	    	vertex(positions.chin[3][0] + (20 * scale), positions.chin[3][1]);
	    	vertex(positions.chin[2][0] - (25 * scale * leftEarLength), positions.chin[3][1] - (6 * scale * leftEarLength));
	    	vertex(positions.chin[1][0] - (80 * scale * leftEarLength), positions.chin[1][1] - (20 * scale * leftEarLength));
	    endShape();
	}

	if (-rightEarLength < leftEarLength) {
	    // Right Ear
	    beginShape();
	    	vertex(positions.chin[15][0] - (20 * scale), positions.chin[15][1]);
	    	vertex(positions.chin[13][0] - (20 * scale), positions.chin[13][1]);
	    	vertex(positions.chin[14][0] + (25 * scale * -rightEarLength), positions.chin[13][1] + (6 * scale * rightEarLength));
	    	vertex(positions.chin[15][0] + (80 * scale * -rightEarLength), positions.chin[15][1] + (20 * scale * rightEarLength));
	    endShape();
	}

	// Potara Earrings


    if (this.earring_value <= 50) {
    	fill(ZamasuPotEaringColor1);
        ellipse(positions.chin[2][0] + 0.1 - (10 * scale * leftEarLength), positions.chin[3][1] + 0.1 - (6 * scale * leftEarLength), 8 * scale, 8 * scale);
        fill(ZamasuPotEaringColor3);
        ellipse(positions.chin[2][0] + 0.1 - (10 * scale * leftEarLength), positions.chin[3][1] + 0.2 - (6 * scale * leftEarLength), 15 * scale, 15 * scale);
        fill(ZamasuPotEaringColor1);
        ellipse(positions.chin[2][0] + 0.1 - (10 * scale * leftEarLength), positions.chin[3][1] - (6 * scale * leftEarLength), 10 * scale, 10 * scale);

        fill(ZamasuPotEaringColor1);
        ellipse(positions.chin[14][0] - 0.1 + (10 * scale * -rightEarLength), positions.chin[13][1] + 0.1 - (6 * scale * -rightEarLength), 8 * scale, 8 * scale);
        fill(ZamasuPotEaringColor3);
        ellipse(positions.chin[14][0] - 0.1 + (10 * scale * -rightEarLength), positions.chin[13][1] + 0.2 - (6 * scale * -rightEarLength), 15 * scale, 15 * scale);
        fill(ZamasuPotEaringColor1);
        ellipse(positions.chin[14][0] - 0.1 + (10 * scale * -rightEarLength), positions.chin[13][1] - (6 * scale * -rightEarLength), 10 * scale, 10 * scale);

        // Potara Earring Shading
        noStroke();
        fill(ZamasuFaceColor4);

        if (leftEarLength < -rightEarLength) {
            ellipse(positions.chin[2][0] + 0.1 - (10 * scale * leftEarLength), positions.chin[3][1] + 0.1 - (6 * scale * leftEarLength), 8 * scale, 8 * scale);
            ellipse(positions.chin[2][0] + 0.1 - (10 * scale * leftEarLength), positions.chin[3][1] + 0.2 - (6 * scale * leftEarLength), 15 * scale, 15 * scale);
            ellipse(positions.chin[2][0] + 0.1 - (10 * scale * leftEarLength), positions.chin[3][1] - (6 * scale * leftEarLength), 10 * scale, 10 * scale);
        }

        if (-rightEarLength < leftEarLength) {
            ellipse(positions.chin[14][0] - 0.1 + (10 * scale * -rightEarLength), positions.chin[13][1] + 0.1 - (6 * scale * -rightEarLength), 8 * scale, 8 * scale);
            ellipse(positions.chin[14][0] - 0.1 + (10 * scale * -rightEarLength), positions.chin[13][1] + 0.2 - (6 * scale * -rightEarLength), 15 * scale, 15 * scale);
            ellipse(positions.chin[14][0] - 0.1 + (10 * scale * -rightEarLength), positions.chin[13][1] - (6 * scale * -rightEarLength), 10 * scale, 10 * scale);
        }
    }

    // head
    noStroke();
    fill(faceColorBlend);
    beginShape();
    for(var i=0; i<positions.chin.length;i+=4) {
      vertex(positions.chin[i][0], positions.chin[i][1]);
    }

    for(var i=positions.right_eyebrow.length-1; i>=0;i-=4) {
      vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1] - (50 * scale));
    }

    vertex(positions.right_eyebrow[0][0] - (20 * scale), positions.right_eyebrow[0][1] - (45 * scale));

    for(var i=positions.left_eyebrow.length-1; i>=0;i-=4) {
      vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1] - (50 * scale));
    }
    endShape(CLOSE);


    // Mouth shapes
    noStroke();
    fill(faceColorBlend2);
    beginShape();
        vertex(mouthTop_pos[0] - (20 * scale), mouthTop_pos[1]);
        vertex(mouthBottom_pos[0] - (20 * scale), mouthBottom_pos[1]);
        vertex(mouthBottom_pos[0] + (20 * scale), mouthBottom_pos[1]);
        vertex(mouthTop_pos[0] + (20 * scale), mouthTop_pos[1]);
    endShape();

    beginShape();
        vertex(mouthBottom_pos[0] + (20 * scale), mouthBottom_pos[1]);
        vertex(mouthTop_pos[0] + (20 * scale), mouthTop_pos[1]);
        vertex(positions.top_lip[6][0], positions.top_lip[6][1]);
    endShape();

    beginShape();
        vertex(mouthTop_pos[0] - (20 * scale), mouthTop_pos[1]);
        vertex(mouthBottom_pos[0] - (20 * scale), mouthBottom_pos[1]);
        vertex(positions.top_lip[0][0], positions.top_lip[0][1]);
    endShape();


    // nose
    noStroke();
    fill(faceColorBlend2);

    if (-rightEarLength < leftEarLength) {
        beginShape();
            vertex(positions.nose_bridge[0][0], positions.nose_bridge[0][1]);
            vertex(positions.nose_tip[4][0], positions.nose_tip[4][1]);
            vertex(positions.nose_tip[2][0], positions.nose_tip[2][1]);
        endShape(CLOSE);
    }

    if (leftEarLength < -rightEarLength) {
        beginShape();
            vertex(positions.nose_bridge[0][0], positions.nose_bridge[0][1]);
            vertex(positions.nose_tip[0][0], positions.nose_tip[0][1]);
            vertex(positions.nose_tip[2][0], positions.nose_tip[2][1]);
        endShape(CLOSE);
    }


    beginShape();
        vertex(positions.nose_tip[4][0], positions.nose_tip[4][1]);
        vertex(positions.nose_tip[2][0], positions.nose_tip[2][1]);
        vertex(positions.nose_tip[0][0], positions.nose_tip[0][1]);
        vertex(positions.nose_bridge[3][0], positions.nose_bridge[3][1]);
    endShape();



    // eyes
    noStroke();
    fill(eyecolor3);

    // Left eye
    beginShape();
        vertex(positions.left_eye[0][0] - (10 * scale), positions.left_eye[0][1] - (10 * scale));
        vertex(positions.left_eye[2][0], positions.left_eye[2][1] - (10 * scale));
        vertex(positions.left_eye[3][0] + (10 * scale), positions.left_eye[3][1]);
        vertex(positions.left_eye[5][0], positions.left_eye[5][1]);
    endShape();

    // Right eye
    beginShape();
        vertex(positions.right_eye[0][0] - (10 * scale), positions.right_eye[0][1]);
        vertex(positions.right_eye[1][0], positions.right_eye[1][1] - (10 * scale));
        vertex(positions.right_eye[3][0] + (10 * scale), positions.right_eye[3][1] - (10 * scale));
        vertex(positions.right_eye[4][0], positions.right_eye[4][1]);
    endShape();

    fill(eyeColorBlend);
    ellipse(eye1_pos[0] + (5 * scale), eye1_pos[1] - (5 * scale), 22 * scale, 22 * scale);
    ellipse(eye2_pos[0] - (5 * scale), eye2_pos[1] - (5 * scale), 22 * scale, 22 * scale);

    fill('black');
    ellipse(eye1_pos[0] + (5 * scale), eye1_pos[1] - (5 * scale), 6 * scale, 6 * scale);
    ellipse(eye2_pos[0] - (5 * scale), eye2_pos[1] - (5 * scale), 6 * scale, 6 * scale);



    // right eyebrow
    noStroke();
    fill(hairColorBlend);
    beginShape();
    	vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1]);
    	vertex(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1]);
    	vertex(positions.right_eyebrow[4][0], positions.right_eyebrow[4][1]);
    	vertex(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1]+ 8 * scale);
    endShape(CLOSE);

    // left eyebrow
    noStroke();
    fill(hairColorBlend);
    beginShape();
    	vertex(positions.left_eyebrow[0][0], positions.left_eyebrow[0][1]);
    	vertex(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1]);
    	vertex(positions.left_eyebrow[4][0], positions.left_eyebrow[4][1]);
    	vertex(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1]+ 8 * scale);
    endShape(CLOSE);
    strokeWeight(1);  

    

    //test Section

    // Hair
    noStroke();
    fill(hairColorBlend);

    // Middle left segment
    if (this.hairSegment2_value <= 50) {
        beginShape();
            vertex(positions.right_eyebrow[0][0] - (20 * scale), positions.right_eyebrow[0][1] - (45 * scale));
            vertex(positions.left_eyebrow[4][0] - (10 * scale), positions.left_eyebrow[4][1] - (90 * scale));
            vertex(positions.left_eyebrow[3][0] - (12 * scale), positions.left_eyebrow[3][1] - (80 * scale));
            vertex(positions.left_eyebrow[2][0] - (25 * scale), positions.left_eyebrow[2][1] - (80 * scale));
            vertex(positions.left_eyebrow[1][0] - (50 * scale), positions.left_eyebrow[1][1] - (80 * scale));
            vertex(positions.left_eyebrow[0][0] - (100 * scale), positions.left_eyebrow[0][1] - (80 * scale));
        endShape();
    }
    // Primary left segment
    if (this.hairSegment1_value <= 50) {
        beginShape();
            vertex(positions.right_eyebrow[0][0] - (20 * scale), positions.right_eyebrow[0][1] - (45 * scale));
            vertex(positions.left_eyebrow[4][0] - (10 * scale), positions.left_eyebrow[4][1] - (60 * scale));
            vertex(positions.left_eyebrow[3][0] - (12 * scale), positions.left_eyebrow[3][1] - (50 * scale));
            vertex(positions.left_eyebrow[2][0] - (25 * scale), positions.left_eyebrow[2][1] - (40 * scale));
            vertex(positions.left_eyebrow[1][0] - (50 * scale), positions.left_eyebrow[1][1] + (70 * scale));
            vertex(positions.left_eyebrow[0][0] - (50 * scale), positions.left_eyebrow[0][1] + (120 * scale));
            vertex(positions.left_eyebrow[3][0] + (12 * scale), positions.left_eyebrow[3][1] - (10 * scale));
        endShape();
    }

    // middle segment
    if (this.hairSegment3_value <= 50) {
        beginShape();
            vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1] - (50 * scale));
            vertex(positions.right_eyebrow[0][0] - (20 * scale), positions.right_eyebrow[0][1] - (45 * scale));
            vertex(positions.left_eyebrow[4][0], positions.left_eyebrow[4][1] - (50 * scale));
            vertex(positions.left_eyebrow[4][0], positions.left_eyebrow[4][1] - (110 * scale));
            vertex(positions.right_eyebrow[0][0] - (5 * scale), positions.right_eyebrow[0][1] - (145 * scale));
        endShape();

        beginShape();
            vertex(positions.left_eyebrow[4][0], positions.left_eyebrow[4][1] - (108 * scale));
            vertex(positions.right_eyebrow[0][0] - (5 * scale), positions.right_eyebrow[0][1] - (143 * scale));
            vertex(positions.right_eyebrow[0][0] - (75 * scale), positions.right_eyebrow[0][1] - (155 * scale));
        endShape();
    }

  }

    

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.faceColor_value = settings[0];
    this.hairColor_value = settings[1];
    this.faceColor2_value = settings[2];
    this.earring_value = settings[3];
    this.hairSegment1_value = settings[4];
    this.hairSegment2_value = settings[5];
    this.hairSegment3_value = settings[6];
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    properties = new Array(7);
    properties[0] = this.faceColor_value;
    properties[1] = this.hairColor_value;
    properties[2] = this.faceColor2_value;
    properties[3] = this.earring_value;
    properties[4] = this.hairSegment1_value;
    properties[5] = this.hairSegment2_value;
    properties[6] = this.hairSegment3_value;
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