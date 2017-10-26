/*
 * name: Camden Wright
 * github: CamdenWright
 * release form confirmed by Tom White 26 Oct 2017
 */

/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// other variables can be in here too
// these control the colors used
bg_color = [225, 206, 187];
fg_color = [151, 102, 52];
stroke_color = [95, 52, 8];

function FaceMap() {
  this.skinColour = 0;
  this.hairColor = 0;
  this.eye_size = 0;
  this.colour_value = 0;
  this.mouth_size = 0;
  this.smile_size = 0;
  this.stroke_color = [95, 52, 8];

  /*
   * Draw a face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    var eyebrow1_size = positions.right_eyebrow[4][0] - positions.right_eyebrow[0][0]
    var eyebrow2_size = positions.left_eyebrow[4][0] - positions.right_eyebrow[0][0]


    var chin_pos = positions.chin[9];

    var bread_pos = positions.chin[0];
    var bread_height = positions.right_eyebrow[0]
    var mouth_pos = average_point(positions.bottom_lip)

    var nose_pos = average_point(positions.nose_bridge);

    var eye1_pos = average_point(positions.left_eye);
    var eye2_pos = average_point(positions.right_eye);

    var half_height = positions.chin[7][1] - nose_pos[1];
    var face_width = positions.chin[positions.chin.length-1][0] - positions.chin[0][0];

    var top_right = bread_pos[0] + (face_width/4)
    var top_left = bread_pos[0] + (face_width - face_width/4)


    var x = nose_pos[0];
    var y = nose_pos[1];
    var w = 2 * face_width;
    var h = 2.5 * half_height;



    var mapEyeSize = map(this.eye_size, 0, 100, 0, .3);
    var mapMouthSize = map(this.mouth_size, 0, 100, 0, .3);
    var mapSmileSize = map(this.smile_size, 0, 100, 0, .2);
    var mapColourValue = map(this.colour_value, 0, 100, 0, 2)

    var mapSkinColour = map(this.skinColour, 0, 100, -10, 90);
    var mapHairColor = map(this.hairColor, 0, 100, 10, 50);

    var extent = 0;
    if(h < w) {
      extent = h / 2;
    }
    else {
      extent = w / 2;
    }
    var scale = extent / 220.0;

    // Hair Crust

    noStroke();
    fill(176 - (mapHairColor * 2), 137 - (mapHairColor * 1.5), 97 - mapHairColor);
    rect(bread_pos[0], bread_height[1], face_width, chin_pos[1] - bread_height[1], .2);

    ellipse(top_right,bread_pos[1], 195 * scale, 135 * scale);
    ellipse(top_left,bread_pos[1], 195 * scale, 135 *scale);

    // Face Bread
   
     fill(214 - (mapSkinColour * 1.9),170 - (mapSkinColour * 1.5),107 - (mapSkinColour * 0.9));

     rect(bread_pos[0] + .2, bread_height[1] + .2, face_width - .4, (chin_pos[1] - bread_height[1] - .4), .1);


     ellipse(top_right,bread_pos[1], 170 * scale, 110 * scale);
     ellipse(top_left,bread_pos[1], 170* scale, 110 *scale);



    // Avocado Mouth
    angleMode(RADIANS);
    stroke(70, 145, 31);
    fill(219, 200, 124);
    arc(mouth_pos[0], mouth_pos[1], (90 * scale) + mapMouthSize, (50 * scale) + mapSmileSize, 0 , PI);
    angleMode(DEGREES);


    noStroke();
    fill(214 - (mapSkinColour * 1.9),170 - (mapSkinColour * 1.5),107 - (mapSkinColour * 0.9));

    ellipse(mouth_pos[0] + (10 * scale), mouth_pos[1], 30 * scale, 20 * scale);

    // Tomato Eyes

    noStroke();

    fill(176, 36, 26);
    ellipse(eye1_pos[0], eye1_pos[1], (50 * scale) + mapEyeSize , (50 * scale) + mapEyeSize);
    ellipse(eye2_pos[0], eye2_pos[1], (50 * scale) + mapEyeSize , (50 * scale) + mapEyeSize);

    fill(240,82,67);
    ellipse(eye1_pos[0], eye1_pos[1], (40 * scale)+ mapEyeSize, (40 * scale)+ mapEyeSize);
    ellipse(eye2_pos[0], eye2_pos[1], (40 * scale)+ mapEyeSize, (40 * scale)+ mapEyeSize);

    fill(255,128,125)
    ellipse(eye1_pos[0], eye1_pos[1], (20 * scale)+ mapEyeSize, 10 * scale);
    ellipse(eye1_pos[0], eye1_pos[1], 10 * scale, (20 * scale)+ mapEyeSize);


    ellipse(eye2_pos[0], eye2_pos[1], (20 * scale)+ mapEyeSize, 10 * scale);
    ellipse(eye2_pos[0], eye2_pos[1], 10 * scale, (20 * scale)+ mapEyeSize);


    push();
    translate(eye1_pos[0], eye1_pos[1]);
    rotate(45);
    ellipse(0, 0, 10 * scale, (20 * scale)+ mapEyeSize);
    rotate(90);
    ellipse(0, 0, 10 * scale, (20 * scale)+ mapEyeSize);
    pop();
    push();
    translate(eye2_pos[0], eye2_pos[1]);
    rotate(45);
    ellipse(0, 0, 10 * scale, (20 * scale)+ mapEyeSize);
    rotate(90);
    ellipse(0, 0, 10 * scale, (20 * scale)+ mapEyeSize);
    pop();
    strokeWeight(1);  


    // Cheese Nose, not in use

    // fill(204,194,74);
    // triangle(positions.nose_bridge[0][0], positions.nose_bridge[0][1], positions.nose_tip[0][0],positions.nose_tip[0][1], positions.nose_tip[4][0],positions.nose_tip[4][1]);
    // fill(222,206,140);
    // triangle(positions.nose_bridge[0][0], positions.nose_bridge[0][1]+(15*scale), positions.nose_tip[0][0]+(5*scale),positions.nose_tip[0][1]-(5*scale), positions.nose_tip[4][0]-(5*scale),positions.nose_tip[4][1]-(5*scale));



  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.skinColour = settings[0];
    this.hairColor = settings[1];
    this.eye_size = settings[2];
    this.mouth_size = settings[3];
    this.smile_size = settings[4]; 
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    properties = new Array(2);
    properties[0] = this.skinColour;
    properties[1] = this.hairColor;
    properties[2] = this.eye_size;
    properties[3] = this.mouth_size;
    properties[4] = this.smile_size
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