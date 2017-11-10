
function FaceMap_hannahdockerty2() {

  this.draw = function() {
    this.skinColors = ["#ffe4d6", "#ffd5be", "#CAA288", '#91654d'];


     this.sCol_val = int(map(this.skinTone, 0, 100, 0, 2.9));
     this.smile_val = map(this.smile, 0, 100, -0.1, 0.2);
     this.eyeCol_val = int(map(this.eyeCol, 0, 100, 0, 255));

     
     this.cheekWidth_val = map(this.smile, 0, 100, 0.95, 1.1);
     this.facialHair_val = int(map(this.facialHair, 0, 100, 5, 255));
     this.browPos_val = map(this.browPosition, 0, 100, -0.1, 0.2);
     this.browRot_val = map(this.browPosition, 0, 100, 0, -8);
     this.profile_val = int(map(this.profile, 0, 100, 0.5, 2.5));
     this.squint_val = map(this.squint, 0, 100, -0.02, 0.12);
    this.lookPos_val = map(this.lookPosition, 0, 100, -0.12, 0.12); 
    this.mouthOpen = map(this.mouth_open, 0, 100, -0.05, 0.5);


    this.brow_thickness = 0.06;
    this.lipThickness = 0.15;
    if (this.feminine <= 50){
      this.brow_thickness = 0.1;
      this.lipThickness = 0.1;
    }


        //point postitions
  this.chin = [0, 1.8+this.mouthOpen];
  this.jaw = [-1, 1.2+this.mouthOpen/2];
  this.cheek = [-1.6*this.cheekWidth_val, -0.1];
  this.eyeDent = [-1.5, -1];
  this.temple = [-1.2, -2.5];
  this.top = [0, -3];


  this.jaw_r = [1, 1.2+this.mouthOpen/2];
  this.cheek_r = [1.6*this.cheekWidth_val, -0.2];
  this.eyeDent_r = [1.5, -1];
  this.temple_r = [1.2, -2.5];


  this.eyePos = [0.8, -0.8];
  this.mouthPos = [-0.55, 1.1];


  if (this.profile_val == 0){
    this.chin = [-1, 2];
    this.jaw = [-1.7, 1];
    this.cheek = [-2*this.cheekWidth_val, 0];
    this.eyeDent = [-1.95, -0.8];
    this.temple = [-1.7, -2.5];
    this.top = [0, -3];


    this.jaw_r = [1.3, 1];
    this.cheek_r = [1.7];
    this.eyeDent_r = [1.7, -0.8];
    this.temple_r = [1.3, -2.5];
  } else  if (this.profile_val == 2){
    this.chin = [1, 2];
    this.jaw = [1.7, 1];
    this.cheek = [2*this.cheekWidth_val, 0];
    this.eyeDent = [1.95, -0.8];
    this.temple = [1.7, -2.5];
    this.top = [0, -3];


    this.jaw_r = [-1.3, 1];
    this.cheek_r = [-1.7];
    this.eyeDent_r = [-1.7, -0.8];
    this.temple_r = [-1.3, -2.5];
  }
  
  //draw background
  // noStroke();
  // rectMode(CENTER);
  // colorMode(HSB);
  // fill(200, 20, this.backgroundCol);
  // rect(0, -1, 5, 8);
  // colorMode(RGB);


  //draw face shape
  stroke(this.skinColors[this.sCol_val+1]);
  strokeWeight(0.015);

  fill(this.skinColors[this.sCol_val]);
  
    beginShape(); 
    curveVertex(-this.jaw[0], this.jaw[1]);

  curveVertex(this.chin[0], this.chin[1]); 
  curveVertex(this.jaw[0], this.jaw[1]);
  curveVertex(this.cheek[0], this.cheek[1]); 
  curveVertex(this.eyeDent[0], this.eyeDent[1]); 
  curveVertex(this.temple[0], this.temple[1]); 
  curveVertex(this.top[0], this.top[1]); 
  curveVertex(this.temple_r[0], this.temple[1]); 
  curveVertex(this.eyeDent_r[0], this.eyeDent[1]); 
  curveVertex(this.cheek_r[0], this.cheek[1]);
  curveVertex(this.jaw_r[0], this.jaw[1]);

  curveVertex(this.chin[0], this.chin[1]); 
  curveVertex(this.jaw[0], this.jaw[1]);
  endShape();



    
    //draw eyes
    if (this.profile_val == 0){
          var profileOffset_r = (-1.5+this.profile/25);
          var profileOffset_l = (-1+this.profile/25);
          var profileOffset_n = profileOffset_r;
          var profileScaleOffset_l = (-0.3*(this.profile/20+1));
          var profileScaleOffset_n = profileScaleOffset_l;

    }else if (this.profile_val == 2){  ////////////////fix me
        var profileFix = map(this.profile, 0, 100, -50, 50);

          var profileOffset_r = (-1+profileFix/25);
          var profileOffset_l = (-0.5+profileFix/25);
          var profileOffset_n = profileOffset_l;
          var profileScaleOffset_l = -1.3;
          var profileScaleOffset_r = (0.003*(this.profile));
          var profileScaleOffset_n= (0.003*(this.profile));
        
    } else{
          var profileOffset_r = 0;
          var profileOffset_l = 0;
          var profileOffset_n = 0;
          var profileScaleOffset_l = -1.3;
          var profileScaleOffset_r = 1.3;
          var profileScaleOffset_n = 1;

      
    }
    

      push(); //right eye

      translate(this.eyePos[0] + profileOffset_r, this.eyePos[1]);
      scale(profileScaleOffset_r, 1.3);
      drawEye(this.eyeCol_val, this.skinColors, this.feminine, this.browPos_val, this.sCol_val, this.squint_val, this.lookPos_val);
        //eye highlight
      for (var i = 0.08; i > 0; i-=0.01){
        fill(255, 255, 255, 50);
        ellipse(-0.05, -0.05, i);
      }
      if (this.feminine > 50){
      drawCheeks(-this.eyePos[0]+0.5, this.cheek[1]);
      }

      rotate(this.browRot_val);
      translate(-this.browPos_val/3, 0);
      drawEyeBrows(this.browPos_val, this.brow_thickness);
      pop();

      push(); //left eye
      
      translate(-this.eyePos[0] + profileOffset_l, this.eyePos[1]);

      scale(profileScaleOffset_l, 1.3);
      drawEye(this.eyeCol_val, this.skinColors, this.feminine, this.browPos_val, this.sCol_val, this.squint_val, -this.lookPos_val);
        //eye highlight
      for (var i = 0.08; i > 0; i-=0.01){
        fill(255, 255, 255, 50);
        ellipse(0.05, -0.05, i);
      }
        if (this.feminine > 50){
      drawCheeks(this.eyePos[0]-1.1, this.cheek[1]);
      }
      rotate(this.browRot_val);
      translate(-this.browPos_val/3, 0);
      drawEyeBrows(this.browPos_val, this.brow_thickness);
      pop();
    

      
        
      translate(profileOffset_n, -0.3); 
      scale(profileScaleOffset_n, 1);

      //draw mouth
      drawMouth(this.smile_val, this.mouthPos[0], this.mouthPos[1], this.lipThickness, this.mouthOpen, this.sCol_val, this.feminine);

      //draw nose();
      beginShape();
      noStroke();
      fill(0, 0, 0, 30);
      vertex(this.mouthPos[0]+0.2, this.mouthPos[1]-0.6);
      vertex(0, this.mouthPos[1]-0.65);
      vertex(-this.mouthPos[0]-0.2, this.mouthPos[1]-0.6);
      endShape();

      

      pop();
  






  function drawEye(eyeColor, skinColors, feminine, grumpiness, eyelidCol, squint, lookPos){

    push();
    scale(1.2);
    noStroke();

    fill(255);


    beginShape();
    curveVertex(-0.1, 0.08 - squint);

    curveVertex(-0.3, 0);
    curveVertex(0, -0.15 + squint);
    curveVertex(0.3, -0.02);
    curveVertex(0.1, 0.08 - squint);
    curveVertex(-0.1, 0.08 - squint);


    curveVertex(-0.3, 0);
    curveVertex(0, -0.15 + squint);
    endShape();
    
    

    //draw iris
    colorMode(HSB);
    strokeWeight(0.02);
    stroke(eyeColor, 50, 30);
    fill(eyeColor, 50, 40);
    ellipse(0+ lookPos, -0.025, 0.23, 0.23);
    

    //draw pupil
    for (var i = 0.1; i > 0; i-=0.01){
      strokeWeight(i);
      stroke(eyeColor, 40/(i*4+1), 70/(i*10+1));
      fill(0);
      ellipse(0 + lookPos, -0.025, 0.1, 0.1);
    }
        //rest styling
    noStroke();
    colorMode(RGB);





  
    //drawEyelid
    fill(skinColors[eyelidCol+1]);
    
    beginShape();
  
    curveVertex(0.3, -0.02);
    curveVertex(0.3, -0.02);
    curveVertex(0, -0.15 + squint);
    curveVertex(-0.3, 0);

    curveVertex(-0.2, -0.12);
    curveVertex(0, -0.2);
    curveVertex(0.24, -0.1);

    curveVertex(0.3, -0.02);
    curveVertex(0.3, -0.02);
    curveVertex(0, -0.15 + squint);
  

    endShape();

    //draw eye liner

    stroke(0);
    strokeWeight(0.002);
    if (feminine > 50){
      strokeWeight(0.006);  
    }
    
    
    noFill();

    beginShape();

    curveVertex(0.3, -0.02);
  
    curveVertex(0.3, -0.02);
    curveVertex(0, -0.15 + squint);
    curveVertex(-0.3, 0);
    curveVertex(-0.1, 0.08-squint);
    curveVertex(0.1, 0.08-squint);
    curveVertex(0.3, -0.02);

    curveVertex(0.3, -0.02);
    curveVertex(0, -0.15 + squint);
    endShape();

    fill(skinColors[eyelidCol]);
    noStroke();

  

    //lowerLid
    beginShape();
    curveVertex(0.3, -0.02);
    curveVertex(0.3, -0.02);
    curveVertex(0.1, 0.08-squint);
    curveVertex(-0.1, 0.08-squint);
    curveVertex(-0.3, 0);

    curveVertex(-0.3, 0.2);

    curveVertex(0.3, 0.22);
    curveVertex(0.3, -0.02);

    curveVertex(0.3, -0.02);
    curveVertex(0.1, 0.08-squint);
    
    endShape();
    pop();
    noStroke();

  }

  function drawMouth(smile_val, mouthPosX, mouthPosY, lip_thickness, mouth_open, lipColor, feminine){
    var open_mouthPosY = mouthPosY + mouth_open;

    var lipRed = 226;

    var upperLipFill = [226-(lipColor*30), 175-(lipColor*30), 180-(lipColor*30)];
    var upperLipStroke = [206-(lipColor*30), 165-(lipColor*30), 170-(lipColor*30)];

    var lowerLipFill = [236-(lipColor*30), 185-(lipColor*30), 190-(lipColor*30)];
    var lowerLipStroke = [216-(lipColor*30), 175-(lipColor*30), 180-(lipColor*30)];

    if (feminine < 50){
      var upperLipFill = [240-(lipColor*30), 195-(lipColor*30), 190-(lipColor*30)];
      var upperLipStroke = upperLipFill;

      var lowerLipFill = [250-(lipColor*30), 205-(lipColor*30), 200-(lipColor*30)];
      var lowerLipStroke = lowerLipFill;
    }


    //draw teeth
    fill(255);
    noStroke();

    beginShape();
    curveVertex(-mouthPosX+smile_val,mouthPosY-smile_val);

    curveVertex(-mouthPosX+smile_val,mouthPosY-smile_val);
    curveVertex(0,mouthPosY);
    curveVertex(mouthPosX-smile_val,mouthPosY-smile_val);

    curveVertex(mouthPosX/2,open_mouthPosY);
    curveVertex(-mouthPosX/2,open_mouthPosY);
    curveVertex(-mouthPosX+smile_val,mouthPosY-smile_val);

    
    curveVertex(0,mouthPosY);
    endShape();

    fill(upperLipFill);
    stroke(upperLipStroke);
    //top lip
    beginShape();

    curveVertex(mouthPosX/4,mouthPosY-lip_thickness);

    curveVertex(mouthPosX-smile_val,mouthPosY-smile_val);
    curveVertex(0,mouthPosY);
    curveVertex(-mouthPosX+smile_val,mouthPosY-smile_val);
    curveVertex(-mouthPosX/4,mouthPosY-lip_thickness);
    curveVertex(0,mouthPosY-(lip_thickness/1.1)-smile_val/20);
    curveVertex(mouthPosX/4,mouthPosY-lip_thickness);

    curveVertex(mouthPosX-smile_val,mouthPosY-smile_val);
    curveVertex(0,mouthPosY);
  
    endShape();



    //bottom lip
    fill(lowerLipFill);
    stroke(lowerLipStroke);
    beginShape();
    
    curveVertex(-mouthPosX/2,open_mouthPosY);

    curveVertex(-mouthPosX+smile_val,mouthPosY-smile_val);
    curveVertex(-mouthPosX/2,open_mouthPosY+lip_thickness*1.2);
    curveVertex(mouthPosX/2,open_mouthPosY+lip_thickness*1.2);
    curveVertex(mouthPosX-smile_val,mouthPosY-smile_val);
    curveVertex(mouthPosX/2,open_mouthPosY);
    curveVertex(-mouthPosX/2,open_mouthPosY);
  
    curveVertex(-mouthPosX+smile_val,mouthPosY-smile_val);
    curveVertex(-mouthPosX/2,open_mouthPosY+lip_thickness*1.2);
    endShape();
    
  }

  function drawCheeks(cheekPosX, cheekPosY){
    for (var i=0; i < 20; i+=2){
      fill(255, 0, 0, i/10);
      ellipse(cheekPosX+0.5, cheekPosY + 0.5, i/30, i/30);
    }
  }


  function drawEyeBrows(grumpiness, brow_thickness){
    noStroke();

    fill(79, 60, 40, 20);
    translate(0, -0.12+(grumpiness/4));
    for (var i = 0; i < 0.15; i+=0.01){
      beginShape();
      
      curveVertex(0.5, -0.15);

      curveVertex(0.1, -0.3-brow_thickness+(grumpiness/4));
      curveVertex(-0.2-i, -0.32-brow_thickness+grumpiness);
      curveVertex(-0.2-i, -0.32+grumpiness);
      curveVertex(0.1, -0.3+(grumpiness/4));
      curveVertex(0.45, -0.15);

      curveVertex(0.1, -0.3-brow_thickness+(grumpiness/4));
      curveVertex(-0.4, -0.4+grumpiness);
      endShape();
    }
  }
}


  /*// set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.skinTone = settings[0];
    this.feminine = settings[1];
    this.mouth_open = settings[2];
    this.smile = settings[3];
    this.browPosition = settings[4];
    this.profile = settings[5];
    this.eyeCol = settings[6];
    this.squint = settings[7];
    this.lookPosition = settings[8];
    this.backgroundCol = settings[9];

  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    properties = new Array(10);
    properties[0] = this.skinTone;
    properties[1] = this.feminine;
    properties[2] = this.mouth_open;
    properties[3] = this.smile;
    properties[4] = this.browPosition;
    properties[5] = this.profile;
    properties[6] = this.eyeCol;
    properties[7] = this.squint;
    properties[8] = this.eyePosition;
    properties[9] = this.backgroundCol;


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