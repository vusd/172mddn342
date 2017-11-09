/*
 * name: Hannah Dockerty
 * github: hannahdockerty
 * release form confirmed by Tom White 26 Oct 2017
 */

/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

//color variables 

skinMidtone_color = ["#ffd5be","#ebcebb", "#ffd5be", "#CAA288", "#8c6652"];
skinLowlight_color = ["#f4c4b0", "#e5bbac","#e5b6a2", "#b78c79", "#775041"]


n1= [244, 200, 176, 50];
n2= [229, 187, 172, 50];
n3 = [232, 188, 169, 40];
n4 = [188, 149, 126, 50];
n5 = [124, 84, 68, 50];
noseColor = [n1, n2,n3, n4, n5];

h1= [255, 255, 255, 10];
h2= [249, 245, 239, 10];
h3 = [249, 245, 239, 10];
h4 = [255, 231, 216, 10];
h5 = [255, 231, 216, 10];

noseHighlight = [h1, h2, h3, h4, h5];
skinShadow_color = ["#d6a995", "#d6a995","#ba9584", "#9b7768", "#725241"]
stroke_color = [skinLowlight_color[1]];

upperLip_color = ["#ba8080", "#d1a3a1", "#dba69b", "#a5776b","#6d453d", "#54322b"]; // 1 longer than the rest for stroke
lowerLip_color = ["#db9d9d", "#ebbdbb", "#ffc9be", "#ca9588", "#8c5c52"];

teeth_color = ["#fcfaf4", "#fff", "#f2ece3", "#f7f2ea",  "#efe6da"];

eye_color = ["#3e7191", "#22323d", "#3d4722", "#543f14", "#493127", "#000"];

pupil_color = "#000";

function FaceMap_hannahdockerty() {
  this.lookPos = 50;
  this.eyeAngle = 100;
  this.skinColor = 50;
  this.eyeColor = 50;
  this.eyeSize = 50;
 
  this.draw = function(positions) {
    var nose_pos = average_point(positions.nose_bridge);
    var eye1_pos = average_point(positions.left_eye);
    var eye2_pos = average_point(positions.right_eye);
    var half_height = positions.chin[7][1] - nose_pos[1];
    var face_width = positions.chin[positions.chin.length-1][0] - positions.chin[0][0];
    var eye_squish = map(this.eyeAngle, 0, 100, 50, 100);
    var skin_color_value = int(map(this.skinColor, 0, 100, 2, 4.9));
    var eye_color_value = int(map(this.eyeColor, 0, 100, 0, 5.9));
    var eye_size = map(this.eyeSize, 0, 100, 0.7, 1.5);

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
    var size = extent / 220.0;


    // head
    stroke(0, 0, 0, 100);
    fill(skinMidtone_color[skin_color_value]);
    beginShape();
    curveVertex(positions.left_eyebrow[0][0], positions.left_eyebrow[0][1]);
    for(var i=0; i<positions.chin.length;i++) {

      curveVertex(positions.chin[i][0], positions.chin[i][1]);
    }
    for(var i=positions.right_eyebrow.length-1; i>=0;i--) {
      curveVertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]);
    }
    for(var i=positions.left_eyebrow.length-1; i>=0;i--) {
      curveVertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]);
    }
    curveVertex(positions.chin[0][0], positions.chin[0][1]);

    endShape(CLOSE);

    /////////////////////////////////////////// mouth
    //inner mouth
    stroke(upperLip_color[skin_color_value+1]);
    strokeWeight(0.005);

    fill(teeth_color[skin_color_value]);
     beginShape();
     for(var i=0; i<positions.top_lip.length/2;i++) {
      vertex(positions.top_lip[i][0], positions.top_lip[i][1]);
    }
      for(var i=0; i<6;i++) {
    		if (i!=3 && i!=9){
      vertex(positions.bottom_lip[i][0], positions.bottom_lip[i][1]);
 	  }
    }
    endShape(CLOSE);

    //lips
    fill(upperLip_color[skin_color_value]);
    beginShape();
     for(var i=0; i<positions.top_lip.length;i++) {
      curveVertex(positions.top_lip[i][0], positions.top_lip[i][1]);
    }
    endShape(CLOSE);

        fill(lowerLip_color[skin_color_value]);
    beginShape();
           for(var i=0; i<positions.bottom_lip.length;i++) {
    	if (i!=3 && i!=9){
      curveVertex(positions.bottom_lip[i][0], positions.bottom_lip[i][1]);
  	}
    }
    endShape(CLOSE);
    noStroke();



    ///////////////////////////////////////////left eye
    eyeball_color = teeth_color[skin_color_value];
    iris_color = eye_color[eye_color_value];

    push();
    scale(1.4);
    translate(0.2, 0.4);

    //eyeball
    beginShape();
    fill(eyeball_color)
    for(var i=0; i<positions.left_eye.length;i++) {
      curveVertex(positions.left_eye[i][0], positions.left_eye[i][1]);
    }
    endShape(CLOSE);

    //eye center
    push();
    translate((eye1_pos[0]-0.1)+(this.lookPos/500), eye1_pos[1]-0.03);
    scale(eye_squish/100, 1);

    fill(iris_color);

    ellipse(0, 0, 20 * size *eye_size, 20 * size*eye_size);

    
    if (eye_color_value == 5){
    	 fill(255, 144, 96, 20);
    } else if (eye_color_value == 4){
    	 fill(255, 183, 96, 20);
    }else {
    	fill(230, 250, 200, 20);
    }
    for(var i=0; i<8;i++) {
      ellipse(0, 0, (12+i) * size*eye_size, (12+i) * size*eye_size);
    }
     fill(pupil_color);
    ellipse(0, 0, 8 * size*eye_size, 8 * size*eye_size);
  pop();

  //eye highlights

     fill(255, 255, 255, 5);
    for (var i=4; i>0;i-=0.02) {
    	ellipse((eye1_pos[0]-0.03), eye1_pos[1]-0.07, i * size, i* size)
 	 }
 	 push();

 	 translate(eye1_pos[0], eye1_pos[1]);
    rotate(-30);
    for (var i=6; i>0;i-=0.02) {
      ellipse(0, 0, i * (size/2), i*size);
    }
  pop();

  //lower lid shadow

       for(var j=0.04; j>0; j-= 0.02){
    push();
    translate(-0.02, -j);
    scale(0.98, 1)
    fill(0, 0, 0, (20/(j*30)));
    beginShape();
    	curveVertex(positions.left_eye[0][0], positions.left_eye[0][1]);
  	 	for(var i=5; i>=3;i--) {
        	curveVertex(positions.left_eye[i][0], positions.left_eye[i][1]);
    	}
    	for(var i=3; i<=5;i++) {
        	curveVertex(positions.left_eye[i][0], (positions.left_eye[i][1])+0.1);
 
    	}
    endShape(CLOSE);
    pop();
    }

    //lower lid shape

beginShape();
	fill(skinMidtone_color[skin_color_value]);
    curveVertex(positions.left_eye[0][0], positions.left_eye[0][1]);
  	 	for(var i=5; i>=3;i--) {
        	curveVertex(positions.left_eye[i][0], positions.left_eye[i][1]);
    	}
    	for(var i=3; i<=5;i++) {
        	curveVertex(positions.left_eye[i][0], (positions.left_eye[i][1])+0.15);
 
    	}
endShape(CLOSE);

//eyelid shadow
    for(var j=0.01; j<0.1; j+= 0.01){
    push();
    translate(-0.02, j);
    scale(0.98, 1)
     beginShape();
     fill(0, 0, 0, (20/(j*20)));
 		curveVertex((positions.left_eye[0][0]), (positions.left_eye[0][1]));  
       for(var i=0; i<4;i++) {
        var eyelid_value_y = ((positions.left_eye[i][1] + positions.left_eyebrow[i+1][1])/2.2);
        var eyelid_value_x = ((positions.left_eye[i][0] + positions.left_eyebrow[i][0])/2.3);
        curveVertex((eyelid_value_x), (eyelid_value_y));
    }
     for(var i=3; i>=0;i--) {
        curveVertex((positions.left_eye[i][0]), (positions.left_eye[i][1]));   
      }
    endShape(CLOSE);
    pop();
}
//eyelid shape
    beginShape();

     fill(skinLowlight_color[skin_color_value]);
 		curveVertex((positions.left_eye[0][0]), (positions.left_eye[0][1]));  
       for(var i=0; i<4;i++) {
        var eyelid_value_y = ((positions.left_eye[i][1] + positions.left_eyebrow[i+1][1])/2.2);
        var eyelid_value_x = ((positions.left_eye[i][0] + positions.left_eyebrow[i][0])/2.3);
        curveVertex((eyelid_value_x), (eyelid_value_y));
    }
     for(var i=3; i>=0;i--) {
        curveVertex((positions.left_eye[i][0]), (positions.left_eye[i][1]));   
      }

    endShape(CLOSE);   

//browbone shape
        beginShape();

     fill(skinMidtone_color[skin_color_value]);
 		vertex((positions.left_eye[0][0]), (positions.left_eye[0][1]));  
       for(var i=0; i<4;i++) {
        var eyelid_value_y = ((positions.left_eye[i][1] + positions.left_eyebrow[i+1][1])/2.2);
        var eyelid_value_x = ((positions.left_eye[i][0] + positions.left_eyebrow[i][0])/2.3);
        curveVertex((eyelid_value_x), (eyelid_value_y));
    }
curveVertex((positions.left_eyebrow[4][0]+positions.left_eyebrow[3][0])/2.5, (positions.left_eyebrow[3][1]+0.2)); 

   curveVertex((positions.left_eyebrow[1][0]+0.2), (positions.left_eyebrow[1][1])+0.1);

  	
        

    endShape(CLOSE);  
     
   	pop(); 


    //////////////////////////////////////////////////right eye
    push();
    scale(1.4);
    translate(-0.2, 0.4);

    //eyeball
    beginShape();
    fill(eyeball_color)
    for(var i=0; i<positions.right_eye.length;i++) {
      curveVertex(positions.right_eye[i][0], positions.right_eye[i][1]);
    }

    endShape(CLOSE);

    push();
    translate((eye2_pos[0]-0.1)+(this.lookPos/500), eye2_pos[1]-0.03);
    scale(eye_squish/100, 1);

    //iris
       fill(iris_color);
    ellipse(0, 0, 20 * size*eye_size, 20 * size*eye_size);

        if (eye_color_value == 5){
    	 fill(255, 144, 96, 20);
    } else if (eye_color_value == 4){
    	 fill(255, 183, 96, 20);
    }else {
    	fill(230, 250, 200, 20);
    }
    for(var i=0; i<8;i++) {
      ellipse(0, 0, (12+i) * size*eye_size, (12+i) * size*eye_size);
    }
    //pupil
        fill(pupil_color);
    ellipse(0, 0, 8 * size*eye_size, 8 * size*eye_size);

  pop();

  //eye highlights
      fill(255, 255, 255, 5);
    for (var i=4; i>0;i-=0.02) {
    ellipse((eye2_pos[0]-0.1)+0.07, eye2_pos[1]-0.07, i * size, i* size)
  }
  push();

  translate(eye2_pos[0], eye2_pos[1]);
    rotate(-30);
      for (var i=6; i>0;i-=0.01) {
    ellipse(0, 0, i * (size/2), i*size);
  }
  pop();

  //lower lid shadow

       for(var j=0.04; j>0; j-= 0.02){
    push();
    translate(0.02, -j);
    scale(0.98, 1)
    fill(0, 0, 0, (20/(j*30)));
    beginShape();
    	curveVertex(positions.right_eye[0][0], positions.right_eye[0][1]);
  	 	for(var i=5; i>=3;i--) {
        	curveVertex(positions.right_eye[i][0], positions.right_eye[i][1]);
    	}
    	for(var i=3; i<=5;i++) {
        	curveVertex(positions.right_eye[i][0], (positions.right_eye[i][1])+0.1);
 
    	}
    endShape(CLOSE);
    pop();
    }

//lower lid shape
beginShape();
	fill(skinMidtone_color[skin_color_value]);
    curveVertex(positions.right_eye[0][0], positions.right_eye[0][1]);
  	 	for(var i=5; i>=3;i--) {
        	curveVertex(positions.right_eye[i][0], positions.right_eye[i][1]);
    	}
    	for(var i=3; i<=5;i++) {
        	curveVertex(positions.right_eye[i][0], (positions.right_eye[i][1])+0.15);
 
    	}
endShape(CLOSE);


//eyelid shadow
    for(var j=0.01; j<0.1; j+= 0.02){
    push();
    translate(0.02, j);
    scale(0.98, 1)
     beginShape();
     fill(0, 0, 0, (20/(j*20)));	 
 		curveVertex((positions.right_eye[0][0]), (positions.right_eye[0][1]));  
       for(var i=0; i<4;i++) {
        var eyelid_value_y = ((positions.right_eye[i][1] + positions.right_eyebrow[i][1])/2.2);
        var eyelid_value_x = ((positions.right_eye[i][0] + positions.right_eyebrow[i+1][0])/2.3);
        curveVertex((eyelid_value_x), (eyelid_value_y));
    }
     for(var i=3; i>=0;i--) {
        curveVertex((positions.right_eye[i][0]), (positions.right_eye[i][1]));   
      }

    endShape(CLOSE);   

    endShape(CLOSE);   
    pop();
}

//eyelid shape

  beginShape();

     fill(skinLowlight_color[skin_color_value]);
 		curveVertex((positions.right_eye[0][0]), (positions.right_eye[0][1]));  
       for(var i=0; i<4;i++) {
        var eyelid_value_y = ((positions.right_eye[i][1] + positions.right_eyebrow[i][1])/2.2);
        var eyelid_value_x = ((positions.right_eye[i][0] + positions.right_eyebrow[i+1][0])/2.3);
        curveVertex((eyelid_value_x), (eyelid_value_y));
    }
     for(var i=3; i>=0;i--) {
        curveVertex((positions.right_eye[i][0]), (positions.right_eye[i][1]));   
      }

    endShape(CLOSE);      

//browbone shape
        beginShape();

     fill(skinMidtone_color[skin_color_value]);
       for(var i=3; i>=0;i--) {
        var eyelid_value_y = ((positions.right_eye[i][1] + positions.right_eyebrow[i][1])/2.2);
        var eyelid_value_x = ((positions.right_eye[i][0] + positions.right_eyebrow[i+1][0])/2.3);
        curveVertex((eyelid_value_x), (eyelid_value_y));
    }
	curveVertex((positions.right_eyebrow[0][0]+0.15), (positions.right_eyebrow[0][1])+0.1);
  	curveVertex((positions.right_eyebrow[1][0]+0.15), (positions.right_eyebrow[1][1])+0.1);
        curveVertex((positions.right_eyebrow[2][0]+positions.right_eyebrow[3][0])/2.5, (positions.right_eyebrow[2][1]+0.15));   
   
    endShape(CLOSE);  

   	pop(); 

   	////////////////////////////////////////eyebrows
   	//left eyebrow
     	var browScale = 0.2
    for (var j=0; j<10; j++){
    	browScale-=0.02;
        beginShape();
	    
	    fill(0, 0, 0, 30);
	    
    for(var i=1; i<3;i++) {
        vertex((positions.left_eyebrow[i+1][0]), (positions.left_eyebrow[i+1][1]+0.2));   
    }
    vertex((positions.left_eyebrow[4][0]-browScale), (positions.left_eyebrow[4][1]+0.2)-(browScale/2));  
	vertex((positions.left_eyebrow[4][0]-browScale), (positions.left_eyebrow[4][1])-(browScale/2));   
    for(var i=3; i>=0;i--) {
    	if (i!=1){
        vertex((positions.left_eyebrow[i][0]), (positions.left_eyebrow[i][1]));   
    }
    }
    endShape(CLOSE);
}


    //right eyebrow
 	var browScale = 0
    for (var j=0; j<10; j++){
    	browScale-=0.02;
        beginShape();
	    
	
	    vertex((positions.right_eyebrow[0][0]-browScale), (positions.right_eyebrow[0][1]+0.2)+(browScale/2));
	    for(var i=1; i<4;i++) {
	        vertex((positions.right_eyebrow[i-1][0]), (positions.right_eyebrow[i-1][1]+0.2));   
	    }
	    for(var i=4; i>=0;i--) {
	    	if (i!= 3){
	        vertex((positions.right_eyebrow[i][0]), (positions.right_eyebrow[i][1]));   
	    }
	    }
	    vertex((positions.right_eyebrow[0][0]-browScale), (positions.right_eyebrow[0][1])+(browScale/2));

	    endShape(CLOSE);
	  
	}

	    ////////////////////////////////////////////// nose

	 //bottom of nose

    beginShape();
    fill(skinShadow_color[skin_color_value]);
    stroke(0, 0, 0, 80)
    strokeWeight(0.02);
    vertex(positions.nose_tip[positions.nose_tip.length-1][0], positions.nose_tip[positions.nose_tip.length-1][1]);
     vertex(positions.nose_bridge[positions.nose_bridge.length-1][0], positions.nose_bridge[positions.nose_bridge.length-1][1]);
    for(var i=0; i<positions.nose_tip.length;i++) {
      vertex(positions.nose_tip[i][0], positions.nose_tip[i][1]);
    }
	vertex(positions.nose_bridge[positions.nose_bridge.length-1][0], positions.nose_bridge[positions.nose_bridge.length-1][1]);
    endShape(CLOSE);

    //nose bridge

noStroke();
    fill(skinMidtone_color[skin_color_value]);
    beginShape();
    vertex(((positions.nose_bridge[0][0]+positions.right_eye[4][0])/2)-0.3, positions.nose_bridge[0][1]);
    vertex(((positions.nose_bridge[0][0]+positions.left_eye[4][0])/2)+0.3, positions.nose_bridge[0][1]);
	vertex(positions.nose_tip[0][0], positions.nose_tip[0][1]);
	vertex(positions.nose_tip[2][0], positions.nose_bridge[positions.nose_bridge.length-1][1]+0.3);
     vertex(positions.nose_tip[4][0], positions.nose_tip[4][1]);
    endShape(CLOSE);
     
    fill(noseColor[skin_color_value]);
    var noseWidth = 0;
    for (var j=0; j<20; j++){
    	noseWidth+=0.02
    beginShape();
    vertex(((positions.nose_bridge[0][0]+positions.right_eye[4][0])/2)-0.3, positions.nose_bridge[0][1]+noseWidth);
    vertex(((positions.nose_bridge[0][0]+positions.left_eye[4][0])/2)+0.3, positions.nose_bridge[0][1]+noseWidth);
	vertex(positions.nose_tip[0][0]+noseWidth, positions.nose_tip[0][1]);
	vertex(positions.nose_tip[2][0], positions.nose_bridge[positions.nose_bridge.length-1][1]+0.3);
     vertex(positions.nose_tip[4][0]-noseWidth, positions.nose_tip[4][1]);
    endShape(CLOSE);
}

	//nose highlight
     fill(noseHighlight[skin_color_value]);
     var highlightWidth = 0.2;
     for (var j=0; j<20; j++){
     	highlightWidth -= 0.01;
    beginShape();
  vertex(((positions.nose_bridge[1][0]+positions.right_eye[4][0])/2)-0.4, positions.nose_bridge[1][1]+highlightWidth);
    vertex(((positions.nose_bridge[1][0]+positions.left_eye[4][0])/2)+0.4, positions.nose_bridge[1][1]+highlightWidth);
  vertex(positions.nose_tip[1][0]+highlightWidth, positions.nose_bridge[positions.nose_bridge.length-1][1]+0.2);
        vertex(positions.nose_tip[2][0], positions.nose_bridge[positions.nose_bridge.length-1][1]+0.3);
      
      vertex(positions.nose_tip[3][0]-highlightWidth, positions.nose_bridge[positions.nose_bridge.length-1][1]+0.2);
    endShape(CLOSE);
}
}


  /*// set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.lookPos = settings[0];
    this.eyeAngle = settings[1];
    this.skinColor = settings[2];
    this.eyeColor = settings[3];
    this.eyeSize = settings[4];
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    properties = new Array(4);
    properties[0] = this.lookPos;
    properties[1] = this.eyeAngle;
    properties[2] = this.skinColor;
    properties[3] = this.eyeColor;
    properties[4] = this.eyeSize;
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