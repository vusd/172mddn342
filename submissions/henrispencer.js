/*
 * name: Henri Spencer
 * github: henrispencer
 * release form confirmed by Tom White 26 Oct 2017
 */

/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// other variables can be in here too
// these control the colors used
fg_color = [55, 65, 64];
bg_color = [217, 203, 158];
hr_color  = [42, 44, 43]
stroke_color = [220, 53, 34];

function FaceMap() {
  this.hairLength = 50;
  this.hairColor = 50;
  this.hornColor = 220, 53, 34;

  this.hornLength = 2;
  this.mouthSize = 50;
  this.hairSize = 50;
  this.eyeSize = 50;
  this.moustache = 50;
  this.eyeDirection = 0;

  /*
   * Draw a face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, as well as centering the
   * 	face and altering mouth size, hair size, eye direction and adding horns.
   *  This is to apply cartoon styled devil masks over images of people, in particular, well known dictators.
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



    // Hair

    fill(curHairColor); /* Hair Colour Slider */
    ellipseMode(CENTER);
    noStroke();
    ellipse(1 + this.hairSize/100, eye1_pos[1] - scale * this.hairSize, this.hairSize * scale * 4, this.hairSize * scale * 4);
    ellipse(-0.5, eye2_pos[1] - scale * this.hairSize, this.hairSize * scale * 4, this.hairSize * scale * 4);

    //Hair Shadow
    fill(10, 10);
    ellipse(-0.7, eye2_pos[1] + 0.5 - scale * this.hairSize, this.hairSize * scale * 4, this.hairSize * scale * 4);
    fill(curHairColor);

    //Extra Hair if high hair value
    if (this.hairSize > 80) {
    	ellipse(0 + (random(0, 0.5)) , eye2_pos[0] - scale * this.hairSize + (random(0, 0.5)), this.hairSize * scale * 4, this.hairSize * scale * 4);
     	}

    // Devil Horns

    //White Horns Behind
	
	  fill(bg_color);

    triangle(1, -1, 0.75, -2.2 - this.hornLength/50, -0.5, -1);
    triangle(-1, -1, -0.75, -2.2 - this.hornLength/50, 0.5, -1);

    triangle(1, -1, 1, -2 - this.hornLength/50, -1.35, -1);
    triangle(-1, -1, -1, -2 - this.hornLength/50, 1.35, -1);

    //Red Horns

	  fill(stroke_color);
	  fill(220 - this.hornColor, 53, 34);

    triangle(1, -1, 0.75, -2 - this.hornLength/50, -0.5, -1);
    triangle(-1, -1, -0.75, -2 - this.hornLength/50, 0.5, -1);

    triangle(1, -1, 1, -2 - this.hornLength/50, 0.25, -1);
    triangle(-1, -1, -1, -2 - this.hornLength/50, -0.25, -1);

	  ellipseMode(CENTER);

    // Head

    stroke(stroke_color);
    fill(fg_color);
    beginShape();

    //Using original code with Random values added to create sharper, less natural edge.

    for(var i=0; i<positions.chin.length;i++) {
      vertex(positions.chin[i][0]+(random(0, 0.1)), positions.chin[i][1] +(random(0, 0.1)));
    }
    
    for(var i=positions.right_eyebrow.length-1; i>=0;i--) {
      vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]);
    }
    for(var i=positions.left_eyebrow.length-1; i>=0;i--) {
      vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]);

    }
    endShape(CLOSE);

    // Cheeks

    noStroke();
    fill(255, 5);
	  ellipse(eye1_pos[0] - 0.4 * scale, eye1_pos[1] + 1, this.eyeSize * scale * 2, this.eyeSize * scale * 2);
    fill(255, 10);
    ellipse(eye2_pos[0] + 0.4 * scale, eye2_pos[1] + 1, this.eyeSize * scale * 2, this.eyeSize * scale * 2);

 


    // Mouth
    
    //Round base/Lips

    ellipseMode(CENTER);
    fill(bg_color);
    beginShape();
    ellipse(0, 1.1, this.mouthSize * scale * 2, this.mouthSize * scale);
    fill(stroke_color);
    ellipse(0, 1.1, this.mouthSize * scale * 1.5, this.mouthSize * scale * 0.75);
    noStroke();

    //Back of Mouth/Tongue Triangles

    fill(stroke_color);
    triangle(0, 0.8, -0.5 - this.mouthSize/200, 1.2, 0.5 + this.mouthSize/200, 1.2);
    
    fill(bg_color);
    triangle(0, 1.1, 0.25  + this.mouthSize/200, 1.1, 0.25, 1.5  + this.mouthSize/200);
    triangle(0, 1.1, -0.25  - this.mouthSize/200, 1.1, -0.25, 1.5  + this.mouthSize/200);
    
    //Teeth

    fill(fg_color);
    noStroke();
    triangle(0, 0.8, -0.4 - this.mouthSize/200, 1.2, 0.4 + this.mouthSize/200, 1.2);
    fill(220, 0 + this.mouthSize/2);
    triangle(0, 0.8, -0.05 - this.mouthSize/300, 1.2, 0.05 + this.mouthSize/300, 1.2);
    endShape(CLOSE);

 	  //Moustache if image is a male 

    if (this.moustache > 50) {
    	fill(42, 44, 43);
    	stroke(stroke_color);
    	beginShape();
    		for(var i=0; i<positions.top_lip.length;i++) {
     			vertex(positions.top_lip[i][0], positions.top_lip[i][1] - 0.2);
   			}
    	endShape(CLOSE);
	  }

    // Nose

    //Triangle shade behind main nose ellipses

    fill(10, 50);
    noStroke();
    triangle(0, -1, -0.5, 0.2, 0.5, 0.2);

    //Circular shapes main part of nose.

    fill(bg_color);
	  ellipse(nose_pos[0] + scale, nose_pos[1] + scale * 30, 56 * scale + this.hairLength/400, 46 * scale + this.hairLength/400);
    fill(fg_color);
    ellipse(nose_pos[0]  - scale * 20, nose_pos[1] + scale * 45, 16 * scale + this.hairLength/500, 16 * scale + this.hairLength/500);
    ellipse(nose_pos[0] + scale * 20, nose_pos[1] + scale * 45, 16 * scale + this.hairLength/500, 16 * scale + this.hairLength/500);

    noFill();
    stroke(stroke_color);
    ellipse(nose_pos[0] + scale, nose_pos[1] + scale * 30, 56 * scale + this.hairLength/400, 46 * scale + this.hairLength/400);
   
    noStroke();
   
  

    // Eyebrows


  	//White Base 

    fill(bg_color);
    beginShape();
    for(var i=0; i<positions.right_eyebrow.length; i++) {
      ellipse(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1], 10 * scale, 20 * scale + this.eyeSize/300);
    }
    endShape(CLOSE);
    beginShape();
 
    for(var i=0; i<positions.left_eyebrow.length; i++) {
      ellipse(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1], 10 * scale, 20 * scale + this.eyeSize/300);
    }
    endShape(CLOSE);
    strokeWeight(1);  


    //Cross-Over
    fill(bg_color);
    beginShape();
    for(var i=0; i<positions.right_eyebrow.length; i++) {
      ellipse(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1], 20 * scale + this.eyeSize/300, 10 * scale);
    }
    endShape(CLOSE);
    beginShape();

    for(var i=0; i<positions.left_eyebrow.length; i++) {
      ellipse(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1], 20 * scale + this.eyeSize/300, 10 * scale);
    }
    endShape(CLOSE);
    strokeWeight(1); 

    //Eyebrow Inner Detail

    fill(stroke_color);
    beginShape();
    for(var i=0; i<positions.right_eyebrow.length; i++) {
      ellipse(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1], 5 * scale, 10 * scale + this.eyeSize/300);
    }
    endShape(CLOSE);
    beginShape();
    for(var i=0; i<positions.left_eyebrow.length; i++) {
      ellipse(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1], 5 * scale, 10 * scale + this.eyeSize/300);
    }
    endShape(CLOSE);
     
    //Cross-Over

    beginShape();
    for(var i=0; i<positions.right_eyebrow.length; i++) {
      ellipse(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1], 10 * scale + this.eyeSize/300, 5 * scale);
    }
    endShape(CLOSE);
    beginShape();
    
    for(var i=0; i<positions.left_eyebrow.length; i++) {
      ellipse(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1], 10 * scale + this.eyeSize/300, 5 * scale);
    }
    endShape(CLOSE);
 

    // Eyes

	  fill(bg_color);
    ellipse(eye1_pos[0], eye1_pos[1], this.eyeSize * scale, this.eyeSize * scale);
    ellipse(eye2_pos[0], eye2_pos[1], this.eyeSize * scale, this.eyeSize * scale);

    //Outer Pupil
    fill(fg_color);
    ellipse(eye1_pos[0] - 0.15 + this.eyeDirection/300, eye1_pos[1], this.eyeSize / 2 * scale, this.eyeSize / 2 * scale);
    ellipse(eye2_pos[0] - 0.15 + this.eyeDirection/300, eye2_pos[1], this.eyeSize / 2 * scale, this.eyeSize / 2 * scale);

    //Pupil
    fill(0);
    ellipse(eye1_pos[0] - 0.15 + this.eyeDirection/300, eye1_pos[1], this.eyeSize / 3 * scale, this.eyeSize / 3 * scale);
    ellipse(eye2_pos[0] - 0.15 + this.eyeDirection/300, eye2_pos[1], this.eyeSize / 3 * scale, this.eyeSize / 3 * scale);

    //Light in Eye
    fill(bg_color);
    ellipse(eye1_pos[0] - 0.15 + scale * 2+ this.eyeDirection/300, eye1_pos[1] + scale * 2, this.eyeSize / 15 * scale, this.eyeSize / 15 * scale);
    ellipse(eye2_pos[0] - 0.15 + scale * 2+ this.eyeDirection/300, eye2_pos[1] + scale * 2, this.eyeSize / 15 * scale, this.eyeSize / 15 * scale);

   } 
   

  

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.hairLength = settings[0];
    this.hairColor = settings[1];
    this.hornColor = settings[2];
    this.hornLength = settings[3];
  	this.mouthSize = settings[4];
 	  this.hairSize = settings[5];
 	  this.eyeSize = settings[6];
 	  this.moustache = settings[7];
 	  this.eyeDirection = settings[8];
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    properties = new Array(2);
    properties[0] = this.hairLength;
    properties[1] = this.hairColor;
    properties[2] = this.hornColor;
    properties[3] = this.hornLength;
    properties[4] = this.mouthSize;
    properties[5] = this.hairSize;
    properties[6] = this.eyeSize;
    properties[7] = this.moustache;
    properties[8] = this.eyeDirection;
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