/*
 * name: Nathan Larson
 * github: NZNathan
 * release form confirmed by Tom White 26 Oct 2017
 */

/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// other variables can be in here too
// these control the colors used
bg_color = [225, 206, 187];
fg_color = [254, 244, 110];
stroke_color = [146, 147, 3];


function FaceMap() {
  this.headHeight = 20;
  this.headWidth = 10;
  this.toothSize = 0.2;
  this.mouthValue = 5;
  this.eyeHeight = 5;
  this.eyeRotation = 0;
  this.eyeColor = 0;
  this.cheeks = 0;
  this.strokeValue = .05;

  /*
   * Draw a face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
	
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

    var iris_colors = ["#43c6f2","#6fa511","#cc6d6d","#ff3300","#ffff00","#7d9a68","#dadada","#ec1313","#201b1f","#6b492d", "#1ecc6f"];
    var smiling = true;

    var lookingLeft = false;
    var lookingRight = false;

    if(Math.abs(positions.nose_bridge[3][0] - positions.nose_bridge[0][0]) > 0.052){
    	if(positions.nose_bridge[3][0] < positions.nose_bridge[0][0])
    		lookingLeft = true;

    	if(positions.nose_bridge[3][0] > positions.nose_bridge[0][0])
    		lookingRight = true;
	}

    //Sponged Variables
    var eye_size = 67;
    var iris_size = 27;
    var pupil_size = 10;
    var iris_color = iris_colors[this.eyeColor];
    var pupil_color = "#000000";
    var mouth_color = "#773536";
    var tongue_color = "#dd9c98"
    var tongue_outine = "#ca2931";

    var curHairColor = map(this.hairColor, 0, 100, 200, 20);
    fill(curHairColor);
    var curHairLength = map(this.hairLength, 0, 100, 0, 3);

    var extent = 0;
    if(h < w) {
      extent = h / 2;
    }
    else {
      extent = w / 2;
    }
    var scale = extent / 220.0;

    // head
    var head_size = 1;
    stroke(stroke_color);
    fill(fg_color);
    beginShape();
    curveVertex(positions.chin[0][0], positions.chin[0][1]);
    for(var i=0; i<positions.chin.length;i++) {
      curveVertex(positions.chin[i][0], positions.chin[i][1]);
    }
    curveVertex(positions.chin[positions.chin.length-1][0], positions.chin[positions.chin.length-1][1]);
    endShape();

    curve(positions.chin[0][0]+this.headWidth, positions.chin[0][1]+.05+this.headHeight, 
    	  positions.chin[0][0], positions.chin[0][1]+.05, 
    	  positions.chin[positions.chin.length-1][0], positions.chin[positions.chin.length-1][1]+.05, 
    	  positions.chin[positions.chin.length-1][0]-this.headWidth, positions.chin[positions.chin.length-1][1]+.05 + this.headHeight);

  //CHEEKS
  fill(fg_color);
  stroke(stroke_color);
  strokeWeight(.05);

  //LEFT CHEEK
  var x = positions.top_lip[0][0] - 0.42;
  var y = positions.top_lip[0][1]-0.15;

  if(this.cheeks > 50 && positions.top_lip[0][0] - .3 > positions.chin[4][0])
    curve(x+0.5, y+2, x, y, x + .44, y, x+.44-0.4, y+2);


  //RIGHT CHEEK
  x = positions.top_lip[6][0] + 0.42;
  y = positions.top_lip[6][1]-0.15;

  if(this.cheeks > 50 && positions.top_lip[6][0] + .3 < positions.chin[12][0])
    curve(x-0.5, y+2, x, y, x - .44, y, x-.44+0.4, y+2);

  fill(stroke_color);
  strokeWeight(0);
  var dimble_size = 0.07;
  //Dimbles Left
  if(positions.top_lip[0][0] - .1 > positions.chin[4][0])
     ellipse(positions.top_lip[0][0] - .1, positions.top_lip[0][1] - .18, dimble_size, dimble_size);
  if(positions.top_lip[0][0] - .2 > positions.chin[4][0])
     ellipse(positions.top_lip[0][0] - .2, positions.top_lip[0][1] - .28, dimble_size, dimble_size);
  if(positions.top_lip[0][0] - .3 > positions.chin[4][0])
     ellipse(positions.top_lip[0][0] - .3, positions.top_lip[0][1] - .18, dimble_size, dimble_size);

  //Dimbles Right
  if(positions.top_lip[6][0] + .1 < positions.chin[12][0])
  	ellipse(positions.top_lip[6][0] + .1, positions.top_lip[6][1] - .18, dimble_size, dimble_size);
  if(positions.top_lip[6][0] + .2 < positions.chin[12][0])
  	ellipse(positions.top_lip[6][0] + .2, positions.top_lip[6][1] - .28, dimble_size, dimble_size);
  if(positions.top_lip[6][0] + .3 < positions.chin[12][0])
  	ellipse(positions.top_lip[6][0] + .3, positions.top_lip[6][1] - .18, dimble_size, dimble_size);

    //MOUTH
    //Inside of mouth
    strokeWeight(this.strokeValue);
	  fill(mouth_color);
	  stroke(0,0,0);
    curve(positions.bottom_lip[0][0], positions.bottom_lip[0][1]-this.mouthValue, positions.bottom_lip[0][0], positions.bottom_lip[0][1], positions.bottom_lip[6][0], positions.bottom_lip[6][1], positions.bottom_lip[6][0], positions.bottom_lip[6][1]-this.mouthValue);
    line(positions.bottom_lip[0][0], positions.bottom_lip[0][1], positions.bottom_lip[6][0], positions.bottom_lip[6][1]);
	 
	  strokeWeight(this.strokeValue);
	  fill(0,0,0, 0);
	  stroke(0,0,0);
	
  	// mouth-hole with background color
  	stroke(0,0,0);
  	fill(255,255,255);
  	for(var i = 0.2; i < 0.9; i += 0.4){

  	var teethX = positions.bottom_lip[6][0] + (Math.abs(positions.bottom_lip[6][0] - positions.bottom_lip[0][0]) * i);
  	var teethY = 0;
  	if(positions.bottom_lip[6][1] > positions.bottom_lip[0][1])
  		teethY = positions.bottom_lip[6][1] -  (Math.abs(positions.bottom_lip[6][1] - positions.bottom_lip[0][1]) * i);
  	else
  		teethY = positions.bottom_lip[6][1] +  (Math.abs(positions.bottom_lip[6][1] - positions.bottom_lip[0][1]) * i);

  	var teethX2 = positions.bottom_lip[6][0] + (Math.abs(positions.bottom_lip[6][0] - positions.bottom_lip[0][0]) * (i+0.2));
  	var teethY2 = 0;
  	if(positions.bottom_lip[6][1] > positions.bottom_lip[0][1])
  		teethY2 = positions.bottom_lip[6][1] -  (Math.abs(positions.bottom_lip[6][1] - positions.bottom_lip[0][1]) * (i+0.2));
  	else
  		teethY2 = positions.bottom_lip[6][1] +  (Math.abs(positions.bottom_lip[6][1] - positions.bottom_lip[0][1]) * (i+0.2));
  	beginShape();
  	vertex(teethX, teethY);
  	vertex(teethX2 , teethY2);
  	vertex(teethX2, teethY2 + this.toothSize);
  	vertex(teethX, teethY + this.toothSize);
  	vertex(teethX, teethY);
  	endShape();
    }

  	fill(fg_color);

  //Eyes
  strokeWeight(this.strokeValue);
  stroke(0,0,0);

	//LEFT EYE --our left not the faces left
  //WHITE PART
  fill(255,255,255);
  ellipse(eye1_pos[0], eye1_pos[1], eye_size * scale, eye_size * scale * this.eyeHeight);
  //IRIS
  fill(iris_color);
  strokeWeight(this.strokeValue);
  ellipse(eye1_pos[0], eye1_pos[1], iris_size * scale, iris_size * scale);
  //PUPIL
  fill(pupil_color);
  strokeWeight(this.strokeValue);
  ellipse(eye1_pos[0], eye1_pos[1], pupil_size * scale, pupil_size * scale);

  //RiGHT EYE --Our right
  strokeWeight(this.strokeValue);
  //WHITE PART
  fill(255,255,255);
  ellipse(eye2_pos[0], eye2_pos[1], eye_size * scale, eye_size * scale * this.eyeHeight);
  //IRIS
  fill(iris_color);
  strokeWeight(this.strokeValue);
  ellipse(eye2_pos[0], eye2_pos[1], iris_size * scale, iris_size * scale);
  //PUPIL
  fill(pupil_color);
  strokeWeight(this.strokeValue);
  ellipse(eye2_pos[0], eye2_pos[1], pupil_size * scale, pupil_size * scale);
    

    // nose
    var nose_size = 0.25;
    var nose_dir = 1;
    if(!lookingLeft)
    	nose_dir = -1;

    fill(fg_color);
    strokeWeight(this.strokeValue);
    stroke(0,0,0);
    if(lookingLeft || lookingRight){
    beginShape();
    curveVertex(positions.nose_bridge[1][0], eye1_pos[1] + eye_size * scale / 2);
    curveVertex(positions.nose_bridge[1][0], eye1_pos[1] + eye_size * scale / 2);

    curveVertex(positions.nose_bridge[1][0] - (0.25 * nose_dir), eye1_pos[1] + eye_size * scale / 2);
	  curveVertex(positions.nose_bridge[1][0] - (1 * nose_dir), eye1_pos[1] + eye_size * scale / 2 - 0.05);

    curveVertex(positions.nose_bridge[1][0] - (1.5 * nose_dir), eye1_pos[1] + eye_size * scale / 2 - 0.15);
    curveVertex(positions.nose_bridge[1][0] - (1.4 * nose_dir), eye1_pos[1] + eye_size * scale / 2 + nose_size - 0.05);

    curveVertex(positions.nose_bridge[1][0] - (.75 * nose_dir), eye1_pos[1] + eye_size * scale / 2 + nose_size + 0.05);

    curveVertex(positions.nose_bridge[1][0] - (.1 * nose_dir), eye1_pos[1] + eye_size * scale / 2 + nose_size);

    curveVertex(positions.nose_bridge[1][0], eye1_pos[1] + eye_size * scale / 2 + nose_size - 0.01);
    curveVertex(positions.nose_bridge[1][0], eye1_pos[1] + eye_size * scale / 2 + nose_size - 0.01);
    endShape();

    curve(positions.nose_bridge[1][0], eye1_pos[1] + eye_size * scale / 2, positions.nose_bridge[1][0] - (1.5 * nose_dir), eye1_pos[1] + eye_size * scale / 2 - 0.15, positions.nose_bridge[1][0] - (1.4 * nose_dir), eye1_pos[1] + eye_size * scale / 2 + nose_size - 0.05, positions.nose_bridge[1][0], eye1_pos[1] + eye_size * scale / 2 + nose_size - 0.01);
	}
	else{ //Looking straight
		var noseY = eye2_pos[1] + 0.9;
		curve(positions.nose_bridge[1][0]+4,noseY+3, positions.nose_bridge[1][0] - 0.15, noseY - 0.1, positions.nose_bridge[1][0] + 0.15, noseY, positions.nose_bridge[1][0] - 4,noseY+4)

	}
    //EYEBROWS Yellow Outline
    stroke(fg_color);
    strokeWeight(this.strokeValue*4);
    var eyebrowLength;
    var offset = 0.12;
    noFill();
    //LEFT EYEBROW
    eyebrowLength = positions.left_eyebrow.length;
    beginShape();
    curveVertex(positions.left_eyebrow[0][0], positions.left_eyebrow[0][1] - offset);
    for(var i = 0; i < eyebrowLength-1; i++){
    	curveVertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1] - offset);
	}

	if(eye1_pos[0] + (eye_size*scale)/2 > positions.left_eyebrow[positions.left_eyebrow.length-1][0]){
    	curveVertex(eye1_pos[0] + (eye_size*scale)/2, positions.left_eyebrow[positions.left_eyebrow.length-1][1] - offset);
    	curveVertex(eye1_pos[0] + (eye_size*scale)/2, positions.left_eyebrow[positions.left_eyebrow.length-1][1] - offset);
	}
	else{
    	curveVertex(positions.left_eyebrow[eyebrowLength-1][0], positions.left_eyebrow[eyebrowLength-1][1] - offset);
    	curveVertex(positions.left_eyebrow[eyebrowLength-1][0], positions.left_eyebrow[eyebrowLength-1][1] - offset);
	}
    endShape();
    //RIGHT EYEBROW
    eyebrowLength = positions.right_eyebrow.length;
    beginShape();
    if(eye2_pos[0] - (eye_size*scale)/2 < positions.right_eyebrow[0][0]){
    	curveVertex(eye2_pos[0] - (eye_size*scale)/2, positions.right_eyebrow[0][1] - offset);
    	curveVertex(eye2_pos[0] - (eye_size*scale)/2, positions.right_eyebrow[0][1] - offset);
	}
	else{
    	curveVertex(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1] - offset);
    	curveVertex(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1] - offset);
	}
    for(var i = 1; i < eyebrowLength; i++){
    	curveVertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1] - offset);
	}
	curveVertex(positions.right_eyebrow[eyebrowLength-1][0], positions.right_eyebrow[eyebrowLength-1][1] - offset);
    endShape();

    

    //EYEBROWS black outline
    stroke(0,0,0);
    strokeWeight(this.strokeValue);
    var eyebrowLength;

    noFill();
    //LEFT EYEBROW
    eyebrowLength = positions.left_eyebrow.length;
    beginShape();
    curveVertex(positions.left_eyebrow[0][0], positions.left_eyebrow[0][1]);
    for(var i = 0; i < eyebrowLength-1; i++){
    	curveVertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]);
	}

	if(eye1_pos[0] + (eye_size*scale)/2 > positions.left_eyebrow[positions.left_eyebrow.length-1][0]){
    	curveVertex(eye1_pos[0] + (eye_size*scale)/2, positions.left_eyebrow[positions.left_eyebrow.length-1][1]);
    	curveVertex(eye1_pos[0] + (eye_size*scale)/2, positions.left_eyebrow[positions.left_eyebrow.length-1][1]);
	}
	else{
    	curveVertex(positions.left_eyebrow[eyebrowLength-1][0], positions.left_eyebrow[eyebrowLength-1][1]);
    	curveVertex(positions.left_eyebrow[eyebrowLength-1][0], positions.left_eyebrow[eyebrowLength-1][1]);
	}
    endShape();
    //RIGHT EYEBROW
    eyebrowLength = positions.right_eyebrow.length;
    beginShape();
    if(eye2_pos[0] - (eye_size*scale)/2 < positions.right_eyebrow[0][0]){
    	curveVertex(eye2_pos[0] - (eye_size*scale)/2, positions.right_eyebrow[0][1]);
    	curveVertex(eye2_pos[0] - (eye_size*scale)/2, positions.right_eyebrow[0][1]);
	}
	else{
    	curveVertex(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1]);
    	curveVertex(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1]);
	}
    for(var i = 1; i < eyebrowLength; i++){
    	curveVertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]);
	} 
	curveVertex(positions.right_eyebrow[eyebrowLength-1][0], positions.right_eyebrow[eyebrowLength-1][1]);
  endShape();

  strokeWeight(1);  
	
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.headHeight  = settings[0]/10 + 10;
    this.headWidth   = settings[1]/10;
    this.toothSize   = settings[2]/200;
    this.mouthValue  = settings[3]/15;
    this.eyeHeight   = ((settings[4]/100)/2)+0.5;
    this.eyeColor    = Math.floor(settings[5]/10);
    this.cheeks      = settings[6];
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    properties = new Array(8);
    properties[0] = this.headHeight*10 - 100;
    properties[1] = this.headWidth*10;
    properties[2] = this.toothSize*200;
    properties[3] = this.mouthValue*15;
    properties[4] = ((this.eyeHeight-0.5)*2)*100;
    properties[5] = this.eyeColor*10;
    properties[6] = this.cheeks;
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