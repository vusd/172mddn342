/*
 * name: Zachary Thompson
 * github: tyrannowar
 * release form confirmed by Tom White 26 Oct 2017
 */

/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// other variables can be in here too
// these control the colors used

var ezv = 1;

var bakg_color1 = ["#B2A054"];
var bakg_color2 = ["#578783"];
var bakg_color3 = ["#4B4D99"];

var fg_color1 = ["#FFE991"];
var fg_color2 = ["#559ACC"];
var fg_color3 = ["#7F4B31"];

var stroke_color1 = ["#AAFFF6"];
var stroke_color2 = ["#D492CD"];
var stroke_color3 = ["#CC9378"];

function FaceMap() {
	this.eyebrowSkew = 0;
	this.colorChoice = 1;
	this.scaleA = 1;
	this.squishY = 1;
	this.squishX = 1;
  this.hairLength = 1;

	this.draw = function(positions) {
		var eyeSkew = map(this.eyebrowSkew, 0, 100, -10, 10);
		var chosenColor = int(map(this.colorChoice, 0, 100, 1, 3));
		var ScA = map(this.scaleA, 0, 100, 1, 3);
		var sqshY = map(this.squishY, 0, 100, 0.5, 1);
		var sqshX = map(this.squishX, 0, 100, 0.5, 1.3);
    var hairL = map (this.hairLength,0,100,-20, 400);
  /*
   * Draw a face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
   if (chosenColor == 1) {
   	var foreground = bakg_color1;
   	var strakC = stroke_color1;
   	var bakg = fg_color1;
   }

   if (chosenColor == 2) {
   	var foreground = fg_color2;
   	var strakC = stroke_color2;
   	var bakg = bakg_color2;
   }

   if (chosenColor == 3) {
   	var foreground = fg_color3;
   	var strakC = stroke_color3;
   	var bakg = bakg_color3;
   }
   var nose_pos = average_point(positions.nose_bridge);
   var eye1_pos = average_point(positions.left_eye);
   var eye2_pos = average_point(positions.right_eye);
   var half_height = positions.chin[7][1] - nose_pos[1];
   var face_width = positions.chin[positions.chin.length-1][0] - positions.chin[0][0];

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
   var scales = extent / 220.0;
   var randome = random (4, 20);
    // Uncomment to see drawing area
    // fill(255);
    // stroke(0);
    // rect(x-w/2, y-h/2, w, h);
    // fill(0)
    // ellipse(x, y, w, h);
    scale (ScA);
    // head
    stroke(strakC);
    fill(strakC);
    //hair
    triangle ((positions.right_eyebrow[4][0]-(positions.chin[16][0]-positions.right_eyebrow[4][0])), (positions.right_eyebrow[4][1]), positions.chin[16][0], (-200+hairL-random(4,20))*scales, positions.right_eyebrow[4][0], positions.right_eyebrow[4][1]);
    triangle ((positions.chin[16][0]), (positions.chin[16][1]), positions.chin[16][0] + (positions.chin[16][0]-positions.right_eyebrow[4][0]), (-200+hairL-random(4,20))*scales, (positions.right_eyebrow[4][0]), positions.right_eyebrow[4][1]);
    triangle (positions.right_eyebrow[4][0]+(positions.chin[16][0]-positions.right_eyebrow[4][0]), positions.right_eyebrow[4][1]+(positions.chin[16][1]-positions.right_eyebrow[4][1]), positions.right_eyebrow[4][0], (-200+hairL-random(4,50))*scales, positions.right_eyebrow[3][0], positions.right_eyebrow[3][1]);
    triangle (positions.right_eyebrow[0][0], positions.right_eyebrow[0][1], positions.right_eyebrow[3][0], (-200+hairL-random(4,50))*scales, positions.right_eyebrow[2][0], positions.right_eyebrow[2][1]);


    triangle ((positions.left_eyebrow[4][0]), (positions.left_eyebrow[4][1]), positions.chin[0][0], (-200+hairL-random(4,20))*scales, positions.left_eyebrow[4][0], positions.left_eyebrow[4][1]);
    triangle ((positions.chin[0][0]), (positions.chin[0][1]), positions.chin[0][0] , (-200+hairL-random(4,20))*scales, (positions.left_eyebrow[4][0]), positions.left_eyebrow[4][1]);
    triangle (positions.left_eyebrow[4][0], positions.left_eyebrow[4][1], positions.left_eyebrow[4][0], (-200+hairL-random(4,50))*scales, positions.left_eyebrow[3][0], positions.left_eyebrow[3][1]);
    triangle (positions.left_eyebrow[0][0], positions.left_eyebrow[0][1], positions.left_eyebrow[3][1], (-200+hairL-random(4,50))*scales, positions.left_eyebrow[2][0], positions.left_eyebrow[2][1]);





    fill (foreground);
    beginShape();
    for(var i=0; i<positions.chin.length;i++) {
    	vertex(positions.chin[i][0], positions.chin[i][1]);
    }
    for(var i=positions.right_eyebrow.length-1; i>=0;i--) {
    	vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]+(eyeSkew*scales));
    }
    for(var i=positions.left_eyebrow.length-1; i>=0;i--) {
    	vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]-(eyeSkew*scales));
    }
    endShape(CLOSE);

    fill (strakC);
    if (positions.chin[0][0]>=-2.61){
      triangle ((positions.chin[16][0]), (positions.chin[16][1]), positions.chin[16][0] + (positions.chin[16][0]-positions.right_eyebrow[4][0]), (-200+hairL-random(4,20))*scales, (positions.right_eyebrow[4][0]), positions.right_eyebrow[4][1]);
    }
    if (positions.chin[0][0]<=2.1){
      triangle ((positions.chin[0][0]), (positions.chin[0][1]), positions.chin[0][0] , (-200+hairL-random(4,20))*scales, (positions.left_eyebrow[0][0]), positions.left_eyebrow[0][1]);
    }
    push();
    noFill();
    strokeWeight(2*scales);
    beginShape();
    for(var i=0; i<positions.chin.length;i++) {
    	vertex(positions.chin[i][0]+random (0, 5)*scales, positions.chin[i][1]+random (0, 5)*scales);
    }
    for(var i=positions.right_eyebrow.length-1; i>=0;i--) {
    	vertex(positions.right_eyebrow[i][0]+random (0, 5)*scales, positions.right_eyebrow[i][1]+random (0, 5)*scales+(eyeSkew*scales));
    }
    for(var i=positions.left_eyebrow.length-1; i>=0;i--) {
    	vertex(positions.left_eyebrow[i][0]+random (0, 5)*scales, positions.left_eyebrow[i][1]+random (0, 5)*scales-(eyeSkew*scales));
    }
    endShape(CLOSE);

    beginShape();
    for(var i=0; i<positions.chin.length;i++) {
    	vertex(positions.chin[i][0]+random (0, 5)*scales, positions.chin[i][1]+random (0, 5)*scales);
    }
    for(var i=positions.right_eyebrow.length-1; i>=0;i--) {
    	vertex(positions.right_eyebrow[i][0]+random (0, 5)*scales, positions.right_eyebrow[i][1]+random (0, 5)*scales+(eyeSkew*scales));
    }
    for(var i=positions.left_eyebrow.length-1; i>=0;i--) {
    	vertex(positions.left_eyebrow[i][0]+random (0, 5)*scales, positions.left_eyebrow[i][1]+random (0, 5)*scales-(eyeSkew*scales));
    }
    endShape(CLOSE);
    pop();

    // mouth
    fill(bakg);

    strokeWeight (1.5*scales);
    scale(sqshX, sqshY);
    beginShape();
    for(var i=0; i<positions.bottom_lip.length;i++) {
    	vertex(positions.bottom_lip[i][0], positions.bottom_lip[i][1]);
    }
    endShape(CLOSE);
    noFill()
    beginShape();
    for(var i=0; i<positions.bottom_lip.length;i++) {
    	vertex(positions.bottom_lip[i][0]+random (0, 2)*scales, positions.bottom_lip[i][1]+random (0, 2)*scales);
    }
    endShape(CLOSE);  
    endShape(CLOSE);
    beginShape();
    for(var i=0; i<positions.bottom_lip.length;i++) {
    	vertex(positions.bottom_lip[i][0]+random (0, 2)*scales, positions.bottom_lip[i][1]+random (0, 2)*scales);
    }
    endShape(CLOSE);
    
    fill(bakg);
    beginShape();
    for(var i=0; i<positions.top_lip.length;i++) {
    	vertex(positions.top_lip[i][0], positions.top_lip[i][1]);
    }
    endShape(CLOSE);
    noFill()
    beginShape();
    for(var i=0; i<positions.top_lip.length;i++) {
    	vertex(positions.top_lip[i][0]+random (0, 2)*scales, positions.top_lip[i][1]+random (0, 2)*scales);
    }
    endShape(CLOSE);
    
    beginShape();
    for(var i=0; i<positions.top_lip.length;i++) {
    	vertex(positions.top_lip[i][0]+random (0, 2)*scales, positions.top_lip[i][1]+random (0, 2)*scales);
    }


    // nose

    fill(bakg);
    stroke(strakC);
    beginShape();
    vertex(positions.nose_bridge[0][0], positions.nose_bridge[0][1]);
    for(var i=0; i<positions.nose_tip.length;i++) {
    	vertex(positions.nose_tip[i][0], positions.nose_tip[i][1]);
    }
    endShape(CLOSE);

    noFill ();
    beginShape();
    vertex(positions.nose_bridge[0][0]+random (0, 5)*scales, positions.nose_bridge[0][1]+random (0, 5)*scales);
    for(var i=0; i<positions.nose_tip.length;i++) {
    	vertex(positions.nose_tip[i][0]+random (0, 5)*scales, positions.nose_tip[i][1]+random (0, 5)*scales);
    }
    endShape(CLOSE);

    beginShape();
    vertex(positions.nose_bridge[0][0]+random (0, 5)*scales, positions.nose_bridge[0][1]+random (0, 5)*scales);
    for(var i=0; i<positions.nose_tip.length;i++) {
    	vertex(positions.nose_tip[i][0]+random (0, 5)*scales, positions.nose_tip[i][1]+random (0, 5)*scales);
    }

    endShape(CLOSE);


    // eyes

    ellipse(eye1_pos[0]+random (0, 2)*scales, eye1_pos[1]+random (0, 2)*scales, 16 * scales+random (0, 5)*scales, 16 * scales+random (0, 5)*scales);
    ellipse(eye1_pos[0]+random (0, 2)*scales, eye1_pos[1]+random (0, 2)*scales, 16 * scales+random (0, 5)*scales, 16 * scales+random (0, 5)*scales);
    ellipse(eye1_pos[0]+random (0, 2)*scales, eye1_pos[1]+random (0, 2)*scales, 16 * scales+random (0, 5)*scales, 16 * scales+random (0, 5)*scales);


    ellipse(eye2_pos[0]+random (0, 2)*scales, eye2_pos[1]+random (0, 2)*scales, 16 * scales+random (0, 5)*scales, 16 * scales+random (0, 5)*scales);
    ellipse(eye2_pos[0]+random (0, 2)*scales, eye2_pos[1]+random (0, 2)*scales, 16 * scales+random (0, 5)*scales, 16 * scales+random (0, 5)*scales);
    ellipse(eye2_pos[0]+random (0, 2)*scales, eye2_pos[1]+random (0, 2)*scales, 16 * scales+random (0, 5)*scales, 16 * scales+random (0, 5)*scales);

    fill(strakC);
    beginShape();
    for(var i=0; i<positions.right_eyebrow.length; i++) {
    	vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]+(eyeSkew*scales));
    }
    endShape(CLOSE);
    beginShape();
    for(var i=0; i<positions.left_eyebrow.length; i++) {
    	vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]-(eyeSkew*scales));
    }
    endShape(CLOSE);

    noFill();
    beginShape();
    for(var i=0; i<positions.right_eyebrow.length; i++) {
    	vertex(positions.right_eyebrow[i][0]+random (0, 5)*scales, positions.right_eyebrow[i][1]+random (0, 5)*scales+(eyeSkew*scales));
    }
    endShape(CLOSE);
    beginShape();
    for(var i=0; i<positions.left_eyebrow.length; i++) {
    	vertex(positions.left_eyebrow[i][0]+random (0, 5)*scales, positions.left_eyebrow[i][1]+random (0, 5)*scales-(eyeSkew*scales));
    }
    endShape(CLOSE);
    beginShape();
    for(var i=0; i<positions.right_eyebrow.length; i++) {
    	vertex(positions.right_eyebrow[i][0]+random (0, 5)*scales, positions.right_eyebrow[i][1]+random (0, 5)*scales+(eyeSkew*scales));
    }
    endShape(CLOSE);
    beginShape();
    for(var i=0; i<positions.left_eyebrow.length; i++) {
    	vertex(positions.left_eyebrow[i][0]+random (0, 5)*scales, positions.left_eyebrow[i][1]+random (0, 5)*scales-(eyeSkew*scales));
    }
    endShape(CLOSE);
    strokeWeight(1); 
}


this.setProperties = function(settings) {
	this.eyebrowSkew = settings[0];
	this.colorChoice = settings[1];
	this.scaleA = settings[2];
	this.squishY = settings[3];
	this.squishX = settings [4];
  this.hairLength = settings [5];
}

/* get internal properties as list of numbers 0-100 */
this.getProperties = function() {
	properties = new Array(6);
	properties[0] = this.eyebrowSkew;
	properties[1] = this.colorChoice;
	properties[2] = this.scaleA;
	properties[3] = this.squishY;
	properties[4] = this.squishX;
  properties[5] = this.hairLength;
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