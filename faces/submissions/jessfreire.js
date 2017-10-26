/*
 * name: Jessica Monteiro Freire
 * github: jessfreire
 * release form confirmed by Tom White 26 Oct 2017
 */

// color variables
bg_color = [225, 206, 187];
fg_color = [174, 110, 108];
stroke_color = [95, 52, 8];


//functions
function FaceMap() {
  this.hairLength = 50;
  this.hairColor = 50;
  this.cheeks = 50;
  this.noselenght = 0;
  this.eyecolor1 = 0;
  this.eyecolor2 = 50;
  this.eyebrowcolor = 50;
  this.hasEyeshadow = 50;
  this.lipcolor = 50;
  this.facepaint = 50;
  this.cheekPosition = 50;

 //draw variables
  this.draw = function(positions) {
    var nose_pos = average_point(positions.nose_bridge);
    var eye1_pos = average_point(positions.left_eye);
    var eye2_pos = average_point(positions.right_eye);
    var half_height = positions.chin[7][1] - nose_pos[1];
    var face_width = positions.chin[positions.chin.length-1][0] - positions.chin[0][0];
    
    var x = nose_pos[0];
    var y = nose_pos[1];
    var w = 2 * face_width;
    var h = 2.5 * half_height;

    var cheeks = map(this.cheeks, 0, 100, 0, 225);
    var noselenght = map(this.noselenght, 0, 100, 0, 2);
    var eyecolor1 = map(this.eyecolor1, 0, 100, 255, 0);
    var eyecolor2 = map(this.eyecolor2, 0, 100, 0, 255);
    var eyebrowcolor = map(this.eyebrowcolor, 0, 100, 50, 100);
    var hasEyeshadow = map(this.hasEyeshadow, 0,100);
    var lipcolor = map(this.lipcolor, 0, 100, 0, 255);
    var facepaint = map(this.facepaint,0, 100, 0, 255);
    var cheekPosition = map(this.cheekPosition, 0, 100, 0, 2);
    //fill(cheeks);
    //var cheeks = map(this.cheeks, 0, 10, 0, 3);
    //rect(-3, -2*curHairLength, 6, 3*curHairLength);

    var extent = 0;
    if(h < w) {
      extent = h / 2;
    }
    else {
      extent = w / 2;
    }
    var scale = extent / 220.0;

  
    // face
    
    fill(174, facepaint, facepaint);
    beginShape();
    for(var i=0; i<positions.chin.length;i++) {
      vertex(positions.chin[i][0], positions.chin[i][1]);
    }
    for(var i=positions.right_eyebrow.length-1; i>=0;i--) {
      vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]-1);
    }
    for(var i=positions.left_eyebrow.length-1; i>=0;i--) {
      vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]-1);
    }
    endShape(CLOSE);

    // mouth
    noStroke();
    fill(lipcolor,0,0);
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

    //cheeks
   if (this.cheekPosition > 50){ 
    fill(213,cheeks,151);
    ellipse(eye1_pos[0], eye1_pos[1]+1, 80 * scale, 40 * scale);
    ellipse(eye2_pos[0], eye2_pos[1]+1, 80 * scale, 40 * scale);
  }
  else{
    fill(213,cheeks,151);
    ellipse(eye1_pos[0], eye1_pos[1]+0.7, 80 * scale, 40 * scale);
    ellipse(eye2_pos[0], eye2_pos[1]+0.7, 80 * scale, 40 * scale);
  }

    // nose
    fill(161,facepaint,facepaint);
    beginShape();
    vertex(positions.nose_bridge[0][0], positions.nose_bridge[0][noselenght]);
    for(var i=0; i<positions.nose_tip.length;i++) {
      vertex(positions.nose_tip[i][0], positions.nose_tip[i][1]);
    }
    endShape(CLOSE);

    fill(12,0,0);
    ellipse(nose_pos[0]-0.1, nose_pos[1]+0.6, 8 * scale, 4 * scale);
    ellipse(nose_pos[0]+0.1, nose_pos[1]+0.6, 8 * scale, 4 * scale);

    //eyeshadow
if(this.hasEyeshadow > 50){
    fill(152,103,96);
    ellipse(eye1_pos[0], eye1_pos[1]-0.1, 50 * scale, 20 * scale);
    ellipse(eye2_pos[0], eye2_pos[1]-0.1, 50 * scale, 20 * scale);

    fill(0,0,0)
    beginShape();
    for(var i=0; i<positions.left_eye.length;i++) {
      vertex(positions.left_eye[i][0]-0.07, positions.left_eye[i][1]-0.03);
    }
    endShape(CLOSE);
    beginShape();
    for(var i=0; i<positions.right_eye.length;i++) {
      vertex(positions.right_eye[i][0]+0.07, positions.right_eye[i][1]);
    }
    endShape(CLOSE);
}
    // eyes

    fill(eyecolor1);
    stroke(0,0,0);
    beginShape();
    for(var i=0; i<positions.left_eye.length;i++) {
      vertex(positions.left_eye[i][0], positions.left_eye[i][1]);
    }
    endShape(CLOSE);
    beginShape();
    for(var i=0; i<positions.right_eye.length;i++) {
      vertex(positions.right_eye[i][0], positions.right_eye[i][1]);
    }
    endShape(CLOSE);

    fill(0,eyecolor2,0);
    noStroke();
    ellipse(eye1_pos[0], eye1_pos[1], 15 * scale, 15 * scale);
    ellipse(eye2_pos[0], eye2_pos[1], 15 * scale, 15 * scale);

    fill(0,0,0);
    noStroke();
    ellipse(eye1_pos[0], eye1_pos[1], 5 * scale, 5 * scale);
    ellipse(eye2_pos[0], eye2_pos[1], 5 * scale, 5 * scale);

    //eyebrows 

    fill(95, eyebrowcolor, eyebrowcolor);
    beginShape();
    for(var i=0; i<positions.right_eyebrow.length; i++) {
      vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]-0.1);
    }
    endShape(CLOSE);
    beginShape();
    for(var i=0; i<positions.left_eyebrow.length; i++) {
      vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]-0.1);
    }
    endShape(CLOSE);
    


  //ears
  fill(174, facepaint, facepaint);
  stroke(0,0,0);
  triangle(-1.5, -4, -1.5, -3.1, -0.5, -3.4);
  triangle(-1.4,-4.1,-1.8,-3.8,-1.4,-3.5);
  triangle(1.5, -4, 1.5, -3.1, 0.5, -3.4);
  triangle(1.4,-4.1,1.8,-3.8,1.4,-3.5);

   
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.cheeks = settings[0];
    this.noselenght = settings[1];
    this.eyecolor1 = settings[2];
    this.eyecolor2 = settings[3];
    this.eyebrowcolor = settings[4];
    this.hasEyeshadow = settings[5];
    this.lipcolor = settings[6];
    this.facepaint = settings[7];
    this.cheekPosition = settings[8];

  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    properties = new Array(2);
    properties[0] = this.cheeks;
    properties[1] = this.noselenght;  
    properties[2] = this.eyecolor1;
    properties[3] = this.eyecolor2;
    properties[4] = this.eyebrowcolor;
    properties[5] = this.hasEyeshadow;
    properties[6] = this.lipcolor;
    properties[7] = this.facepaint;
    properties[8] = this.cheeksPosition;
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