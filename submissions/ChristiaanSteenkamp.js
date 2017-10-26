/*
 * name: Tiaan Steenkamp
 * github: ChristiaanSteenkamp
 * release form confirmed by Tom White 26 Oct 2017
 */

/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// other variables can be in here too
// these control the colors used
bg_color = "#ffffff";
stroke_color = "#000000";
fg_color = "#96C195";
horn_color = "";

function FaceMap() {
  this.color = 50;
  this.hairColor = 50;
  this.hornLeftHeight = 50;
  this.hornRightHeight = 50;
  this.hornLeftAngel = 50;
  this.hornRightAngel = 50;
  this.pupileXaxis = 50;
  this.pupileYaxis = 50;
  this.hornColor = 50;
 
  /*
   * Draw a face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    this.eyes_pos = positions.right_eye.concat(positions.left_eye);
    var eye3 = average_point(this.eyes_pos);
    var nose_pos = average_point(positions.nose_bridge);
    var eye1_pos = average_point(positions.left_eye);
    var eye2_pos = average_point(positions.right_eye);
    var half_height = positions.chin[7][1] - nose_pos[1];
    var face_width = positions.chin[positions.chin.length-1][0] - positions.chin[0][0];

    var x = nose_pos[0];
    var y = nose_pos[1];
    var w = 2 * face_width;
    var h = 2.5 * half_height;

    var hornLeftLength = map(this.hornLeftHeight, 0, 100, 0 , 2);
    var hornRightLength = map(this.hornRightHeight, 0, 100, 0 , 2);
    var rightHornAngel = map(this.rightHornAngel, 0, 100, -1 , 1);
    var leftHornAngel = map(this.leftHornAngel, 0, 100, -1 , 1);
    var eyeX = map(this.pupileXaxis, 0, 100, -0.4, 0.4);
    var eyeY = map(this.pupileYaxis, 0, 100, -0.4, 0.4);
    var colorCount = map(this.color, 0, 100, 0, 100);
    var hornCount = map(this.hornColor, 0, 100, 0, 100);

    var extent = 0;
    if(h < w) {
      extent = h / 2;
    }
    else {
      extent = w / 2;
    }
    var scale = extent / 220.0;

    //skin color
    if (colorCount < 25){
      fg_color = "#96C195";
    }
    else if (colorCount <75){
      fg_color = "#6E8E6E";
    }
    else{
      fg_color = "#57B555";
      
    }   

    //horn color
    if (hornCount < 50){
      horn_color = "#B2B3B0";
    }
    else{
      horn_color = "#727871";
      
    }


    // head
    stroke(stroke_color);
    beginShape();

    fill(horn_color);
    triangle (positions.right_eyebrow[0][0], positions.right_eyebrow[0][1], positions.right_eyebrow[2][0] + rightHornAngel, positions.right_eyebrow[2][1] - hornRightLength, positions.right_eyebrow[4][0], positions.right_eyebrow[4][1]);
    triangle (positions.left_eyebrow[0][0], positions.left_eyebrow[0][1], positions.left_eyebrow[2][0] + leftHornAngel, positions.left_eyebrow[2][1] - hornLeftLength, positions.left_eyebrow[4][0], positions.left_eyebrow[4][1]);
    print(leftHornAngel);

    fill(fg_color);
    for(var i=0; i<positions.chin.length;i++) {
      vertex(positions.chin[i][0], positions.chin[i][1]);
    }
    for(var i=positions.right_eyebrow.length-1; i>=0;i--) {
      vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]);
    }
    for(var i=positions.left_eyebrow.length-1; i>=0;i--) {
      vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]);
    }
    endShape(CLOSE);

    //eye
    fill("#ffffff");
    ellipse(eye3[0], eye3[1]/2 + scale, 128 * scale, 128 * scale);
    fill(fg_color);
    ellipse(eye3[0] + eyeY, eye3[1]/2 + eyeX + scale, 64 * scale, 64 * scale);
    fill("#000000");
    ellipse(eye3[0] + eyeY, eye3[1]/2 + eyeX + scale, 32 * scale, 32 * scale);

    // mouth
    fill(bg_color);
    beginShape();
    for(var i=0; i<positions.bottom_lip.length;i++) {
      vertex(positions.bottom_lip[i][0], positions.bottom_lip[i][1]*1.25);
    }
    endShape(CLOSE);
    strokeWeight(1);  
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.color = settings[0];
    this.hornLeftHeight = settings[1];
    this.hornRightHeight = settings[2];
    this.leftHornAngel = settings[3];
    this.rightHornAngel = settings[4];
    this.pupileXaxis = settings[5];
    this.pupileYaxis = settings[6];
    this.hornColor = settings[7];
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    properties = new Array(8);
    properties[0] = this.color
    properties[1] = this.hornLeftHeight;
    properties[2] = this.hornRightHeight;
    properties[3] = this.leftHornAngel
    properties[4] = this.rightHornAngel
    properties[5] = this.pupileXaxis;
    properties[6] = this.pupileYaxis;
    properties[7] = this.hornColor;
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