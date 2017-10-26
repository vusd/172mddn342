/*
 * name: Jack Upton
 * github: ElectricPowerHouse
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


// global variables for colors
var white = [255,255,255];
var lightGray = [220,220,220];
var shadow = [0,30];
var shadowLight = [255,65];

//color schemes
//KEY: background, face, pupil, horns, nose, mouth
// light blue
var scheme2 = [[191,210,251],[132,130,237],[34,28,234],[255,255,255],[83,85,227],[39,36,226]];
//orange
var scheme3 = [[255,209,48],[254,150,48],[255,81,0],[255,255,255],[249,118,67],[241,45,43]];
//green
var scheme4 = [[160,231,139],[63,161,77],[255,161,143],[255,255,255],[156,153,154],[30,84,36]];
//red
var scheme5 = [[248,130,78],[248,39,34],[129,105,95],[255,255,255],[126,102,91],[123,106,106]];

//contains all schemes
var schemes = [scheme2,scheme3];


var hornColors = [[255,255,255],[209,209,209],[150,150,150]];


var radius = 4.5;
var radius2 = 3;
var faceOffset;

function FaceMap() {
  this.colorScheme = 2;
  this.eyeNum = 2;
  this.noseType = 1;
  this.mouthType = 1;
  this.hornType = 1;
  this.hornColor = 1;



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
    var mouth_pos = average_point(positions.top_lip);
    var leftBrow = average_point(positions.left_eyebrow);
    var rightBrow = average_point(positions.right_eyebrow);
    var face = Math.floor(map(this.faceType,0,100,1,4));
    var eyeNum = Math.floor(map(this.eyeNum,0,100,2,4));
    var noseType = Math.floor(map(this.noseType,0,100,1,3));
    var mouthType = Math.floor(map(this.mouthType,0,100,1,3));
    var hornType = Math.floor(map(this.hornType,0,100,1,3));
    var hornColorNum = Math.floor(map(this.hornColor,0,100,0,hornColors.length-1));
    var scheme = schemes[Math.floor(map(this.colorScheme,0,100,0,schemes.length-1))];
    //print(Math.floor(map(this.colorScheme,0,100,0,schemes.length-1)));
    if(scheme == null){
      scheme = schemes[0];
    }

    var w = 2.5 * face_width;
    var h = 2.8 * half_height;
    var x = nose_pos[0]-(w*0.5);
    var y = nose_pos[1]-(h*0.45);

    faceOffset = -(h*0.05);



    var extent = 0;
    if(h < w) {
      extent = h / 2;
    }
    else {
      extent = w / 2;
    }
    var scale = extent / 220.0;

    resetFocusedRandom(curRandomSeed);

    var data = faceData[curFaceIndex];
    var mode = faceSelector.value();

    if(millis() > lastSwapTime + millisPerSwap) {
    //  changeRandomSeed();
    }

    //var scheme = schemes[Math.floor(random(0,schemes.length))];

    noStroke();

    drawMonster(positions,x,y,w,h,face,eyeNum,eye1_pos,eye2_pos,noseType,mouthType,hornType,mouth_pos,leftBrow,rightBrow,hornColorNum,scheme);

  }

  this.getColors=function(){
    return schemes;
  }

  function drawMonster(positions,x,y,w,h,face,eyeNum,eye1_pos,eye2_pos,noseType,mouthType,hornType,mouth_pos,leftBrow,rightBrow,hornColorNum,scheme){

    drawMainFace(positions,scheme[1],h);
    drawEyes(x,y,eye1_pos[0],eye1_pos[1],eye2_pos[0],eye2_pos[1],w,h,scheme[2],eyeNum);

    if(noseType==1){
      drawNose1(positions.nose_tip[0][0],positions.nose_tip[0][1],w,h,scheme[4]);
    }
    else if(noseType==2){
      drawNose2(positions.nose_tip[0][0],positions.nose_tip[0][1],w,h,scheme[4]);
    }
    else{
      drawNose3(positions.nose_tip[0][0],positions.nose_tip[0][1],w,h,scheme[4]);
    }

    if(mouthType == 1){
        drawMouth1(mouth_pos[0],mouth_pos[1],w,h,scheme[5]);
    }
    else if(mouthType==2){
        drawMouth2(mouth_pos[0],mouth_pos[1],w,h,scheme[5]);
    }
    else{
        drawMouth3(mouth_pos[0],mouth_pos[1],w,h,scheme[3],scheme[5]);
    }

    var hColor = hornColors[hornColorNum];
    if(hColor == undefined){
      hColor = color(255);
    }

    if(hornType == 1){
      drawHorns1(leftBrow[0],leftBrow[1],rightBrow[0],rightBrow[1],w,h,hColor);
    }
    else if(hornType == 2){
     drawHorns2(leftBrow[0],leftBrow[1],rightBrow[0],rightBrow[1],w,h,hColor);
    }
    else{
      drawHorns3(leftBrow[0],leftBrow[1],rightBrow[0],rightBrow[1],w,h,hColor);
    }


  }

  function drawMainFace(positions,scheme,h){

    var yChange1 = h*0.06;
    var yChange2 = h*0.15;
    var skip1 = 3;
    var skip2 = 2;

    var centerBrowX = (positions.left_eyebrow[positions.left_eyebrow.length-1][0]+positions.right_eyebrow[0][0])/2;
    var centerBrowY = positions.left_eyebrow[positions.left_eyebrow.length-1][1]-(yChange2);


   fill(scheme);
   beginShape();
   for(var i=0; i<positions.chin.length;i+=skip1) {
     vertex(positions.chin[i][0], positions.chin[i][1]);
   }
   for(var i=positions.right_eyebrow.length-1; i>=skip2;i-=skip2) {
     vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]-yChange1);
   }
     vertex(centerBrowX,centerBrowY);
   for(var i=positions.left_eyebrow.length-1-skip2; i>=0;i-=skip2) {
     vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]-yChange1);
   }
   endShape(CLOSE);


  }




/*

//faceType 1: Polygonal, weighted towards bottom
function drawFace1(x,y,faceWidth,faceHeight,color){

  push();
  translate(x,y);

  fill(color);
  //face
  beginShape();
  //lefttop
  vertex(faceWidth*0.3,faceHeight*0.35);
  //top
  vertex(faceWidth*0.5,faceHeight*0.1);
  //righttop
  vertex(faceWidth*0.7,faceHeight*0.35);
  //rightbottom
  vertex(faceWidth*0.75,faceHeight*0.7);
  //bottom
  vertex(faceWidth*0.5,faceHeight*0.9);
  //leftbottom
  vertex(faceWidth*0.25,faceHeight*0.7);

  endShape();


//shadow
  fill(shadow);
  beginShape();
  //top
  vertex(faceWidth*0.5,faceHeight*0.1);
  //righttop
  vertex(faceWidth*0.7,faceHeight*0.35);
  //rightbottom
  vertex(faceWidth*0.75,faceHeight*0.7);
  //bottom
  vertex(faceWidth*0.5,faceHeight*0.9);
  //leftbottom
  vertex(faceWidth*0.7,faceHeight*0.7);
  //lefttop
  vertex(faceWidth*0.64,faceHeight*0.35);
  endShape();

pop();
}

//faceType 2: similar to a deer
function drawFace2(x,y,faceWidth,faceHeight,color){

  push();
  translate(x,y);

//fill(100,50);
  fill(color);
  //face
  beginShape();
  //lefttop1
  vertex(faceWidth*0.3,faceHeight*0.25);
  //lefttop2
  vertex(faceWidth*0.4,faceHeight*0.1);
  //righttop1
  vertex(faceWidth*0.6,faceHeight*0.1);
  //righttop2
  vertex(faceWidth*0.7,faceHeight*0.25);
  //right
  vertex(faceWidth*0.69,faceHeight*0.5);
  //bottomright
  vertex(faceWidth*0.6,faceHeight*0.8);
  //bottomleft
  vertex(faceWidth*0.4,faceHeight*0.8);
  //left
  vertex(faceWidth*0.3,faceHeight*0.5);

  endShape();

  //shadow
  fill(shadow);
  beginShape();
  //top
  vertex(faceWidth*0.55,faceHeight*0.1);
  //rightTop
  vertex(faceWidth*0.6,faceHeight*0.1);
  //righttop2
  vertex(faceWidth*0.7,faceHeight*0.25);
  //right
  vertex(faceWidth*0.69,faceHeight*0.5);
  //bottomright
  vertex(faceWidth*0.6,faceHeight*0.8);
  //bottom
  vertex(faceWidth*0.55,faceHeight*0.8);
  //right
  vertex(faceWidth*0.64,faceHeight*0.5);
  //righttop2
  vertex(faceWidth*0.64,faceHeight*0.25);
  endShape();

  pop();
}

//faceType 3: Similar to an ogre
function drawFace3(x,y,faceWidth,faceHeight,color){

  push();
  translate(x,y);

  //fill(100,50);
  fill(color);
  //face
  beginShape();
  //lefttop
  vertex(faceWidth*0.35,faceHeight*0.2);
  //top
  vertex(faceWidth*0.5,faceHeight*0.1);
  //righttop
  vertex(faceWidth*0.65,faceHeight*0.2);
  //right
  vertex(faceWidth*0.7,faceHeight*0.5);
  //rightbottom
  vertex(faceWidth*0.65,faceHeight*0.8);
  //bottom
  vertex(faceWidth*0.5,faceHeight*0.9);
  //leftbottom
  vertex(faceWidth*0.35,faceHeight*0.8);
  //left
  vertex(faceWidth*0.3,faceHeight*0.5);
  endShape();

  //shadow
  fill(shadow);
  beginShape();
  //top
  vertex(faceWidth*0.5,faceHeight*0.1);
  //righttop
  vertex(faceWidth*0.65,faceHeight*0.2);
  //right
  vertex(faceWidth*0.7,faceHeight*0.5);
  //rightbottom
  vertex(faceWidth*0.65,faceHeight*0.8);
  //bottom
  vertex(faceWidth*0.5,faceHeight*0.9);
  //rightbottom
  vertex(faceWidth*0.62,faceHeight*0.8);
  //right
  vertex(faceWidth*0.67,faceHeight*0.5);
  //righttop
  vertex(faceWidth*0.62,faceHeight*0.2);

  endShape();

  pop();
}



//faceType 4: looks like a diamond
function drawFace4(x,y,faceWidth,faceHeight,color){

  push();
  translate(x,y);

  fill(color);
  //face
  beginShape();
  //lefttop
  vertex(faceWidth*0.3,faceHeight*0.3);
  //top
  vertex(faceWidth*0.5,faceHeight*0.15);
  //righttop
  vertex(faceWidth*0.7,faceHeight*0.3);
  //rightbottom
  vertex(faceWidth*0.7,faceHeight*0.7);
  //bottom
  vertex(faceWidth*0.5,faceHeight*0.9);
  //leftbottom
  vertex(faceWidth*0.3,faceHeight*0.7);

  endShape();

  //shadow
  fill(shadow);
  beginShape();
  //top
  vertex(faceWidth*0.5,faceHeight*0.15);
  //righttop
  vertex(faceWidth*0.7,faceHeight*0.3);
  //rightbottom
  vertex(faceWidth*0.7,faceHeight*0.7);
  //bottom
  vertex(faceWidth*0.5,faceHeight*0.9);
  //leftbottom
  vertex(faceWidth*0.65,faceHeight*0.7);
  //lefttop
  vertex(faceWidth*0.64,faceHeight*0.3);
  endShape();

  pop();

}

*/

//hornType1: normal horns
function drawHorns1(leftX,leftY,rightX,rightY,faceWidth,faceHeight,color){

  drawLeftHorn1(leftX,leftY,faceWidth,faceHeight,color);
  drawRightHorn1(rightX,rightY,faceWidth,faceHeight,color);


}

function drawLeftHorn1(x,y,faceWidth,faceHeight,color){

  push();
  translate(x,y);

  //left horn
  fill(color);
  beginShape();//-20
  //1
  vertex(-faceWidth*0.07,faceHeight*0.1);
  //2
  vertex(-faceWidth*0.22,faceHeight*0.05);
  //3
  vertex(-faceWidth*0.24,-faceHeight*0.12);
  //4
  vertex(-faceWidth*0.20,-faceHeight*0.18);
  //5
  vertex(-faceWidth*0.21,-faceHeight*0.12);
  //6
  vertex(-faceWidth*0.16,-faceHeight*0.05);
  //7
  vertex(faceWidth*0,faceHeight*0);
  endShape();


  //shadow left horn
  fill(shadow);
  beginShape();
  //1
  vertex(faceWidth*0,faceHeight*0.0);
  //2
  vertex(-faceWidth*0.07,faceHeight*0.1);
  //3
  vertex(-faceWidth*0.22,faceHeight*0.05);
  //4
  vertex(-faceWidth*0.24,-faceHeight*0.12);
  //5
  vertex(-faceWidth*0.20,faceHeight*0.0);
  //6
  vertex(-faceWidth*0.06,faceHeight*0.05);
  endShape();

  pop();

}

function drawRightHorn1(x,y,faceWidth,faceHeight,color){

  push();
  translate(x,y);

  //right horn
  fill(color);
  beginShape(); // -18

  //1
  vertex(faceWidth*0.07,faceHeight*0.1);
  //2
  vertex(faceWidth*0.22,faceHeight*0.05);
  //3
  vertex(faceWidth*0.24,-faceHeight*0.12);
  //4
  vertex(faceWidth*0.20,-faceHeight*0.18);
  //5
  vertex(faceWidth*0.21,-faceHeight*0.12);
  //6
  vertex(faceWidth*0.16,-faceHeight*0.05);
  //7
  vertex(faceWidth*0,faceHeight*0);
  endShape();

  //shadow right horn
  fill(shadow);
  beginShape();
  //1
  vertex(faceWidth*0,faceHeight*0.0);
  //2
  vertex(faceWidth*0.07,faceHeight*0.1);
  //3
  vertex(faceWidth*0.22,faceHeight*0.05);
  //4
  vertex(faceWidth*0.24,-faceHeight*0.12);
  //5
  vertex(faceWidth*0.20,faceHeight*0.0);
  //6
  vertex(faceWidth*0.06,faceHeight*0.05);
  endShape();

  pop();

}

//hornType2: spikey
function drawHorns2(leftX,leftY,rightX,rightY,faceWidth,faceHeight,color){

  drawLeftHorn2(leftX,leftY,faceWidth,faceHeight,color);
  drawRightHorn2(rightX,rightY,faceWidth,faceHeight,color);

}

//hornType 2: spikey
function drawRightHorn2(x,y,faceWidth,faceHeight,color){

  push();
  translate(x,y);

  //left horn
  fill(color);
  beginShape();//-35 -30
  //1
  vertex(-faceWidth*0.0,faceHeight*0);
  //2
  vertex(faceWidth*0.07,-faceHeight*0.18);
  //3
  vertex(-faceWidth*0.07,-faceHeight*0.1);
  endShape();

  //shadow left horn
  fill(shadow);
  beginShape();
  //1
  vertex(-faceWidth*0.0,faceHeight*0.0);
  //2
  vertex(faceWidth*0.07,-faceHeight*0.18);
  //3
  vertex(-faceWidth*0.03,-faceHeight*0.035);
  endShape();

  pop();



}

function drawLeftHorn2(x,y,faceWidth,faceHeight,color){

  push();
  translate(x,y);

  //left horn
  fill(color);
  beginShape();//-35 -30
  //1
  vertex(faceWidth*0.0,faceHeight*0);
  //2
  vertex(-faceWidth*0.07,-faceHeight*0.18);
  //3
  vertex(faceWidth*0.07,-faceHeight*0.1);
  endShape();

  //shadow left horn
  fill(shadow);
  beginShape();
  //1
  vertex(faceWidth*0.0,faceHeight*0.0);
  //2
  vertex(-faceWidth*0.07,-faceHeight*0.18);
  //3
  vertex(faceWidth*0.03,-faceHeight*0.035);
  endShape();

  pop();

}

//hornType 3: flat horns
function drawHorns3(leftX,leftY,rightX,rightY,faceWidth,faceHeight,color){

  drawLeftHorn3(leftX,leftY,faceWidth,faceHeight,color);
  drawRightHorn3(rightX,rightY,faceWidth,faceHeight,color);

}

//hornType 3: flat horns
function drawLeftHorn3(x,y,faceWidth,faceHeight,color){

  push();
  translate(x,y);

  //left horn
  fill(color);
  beginShape(); //-42,-30
  //1
  vertex(-faceWidth*0.10,faceHeight*0.0);
  //2
  vertex(-faceWidth*0.09,-faceHeight*0.1);
  //3
  vertex(-faceWidth*0.05,-faceHeight*0.16);
  //4
  vertex(faceWidth*0.0,-faceHeight*0.11);
  endShape();

  //shadow left horn
  fill(shadow);
  beginShape();
  //1
  vertex(-faceWidth*0.10,faceHeight*0.0);
  //2
  vertex(-faceWidth*0.09,-faceHeight*0.1);
  //3
  vertex(-faceWidth*0.0,-faceHeight*0.11);
  endShape();

  pop();

}


//hornType 3: flat horns
function drawRightHorn3(x,y,faceWidth,faceHeight,color){

  push();
  translate(x,y);

  //right horn
  fill(color);
  beginShape(); //-42,-30
  //1
  vertex(faceWidth*0.10,faceHeight*0.0);
  //2
  vertex(faceWidth*0.09,-faceHeight*0.1);
  //3
  vertex(faceWidth*0.05,-faceHeight*0.16);
  //4
  vertex(faceWidth*0.0,-faceHeight*0.11);
  endShape();

  //shadow right horn
  fill(shadow);
  beginShape();
  //1
  vertex(faceWidth*0.10,faceHeight*0.0);
  //2
  vertex(faceWidth*0.09,-faceHeight*0.1);
  //3
  vertex(faceWidth*0.0,-faceHeight*0.11);
  endShape();

  pop();

}



//method that controls getting the correct positions for eyes and
//making sure the correct amount of eyes is displayed
function drawEyes(x,y,x2,y2,x3,y3,faceWidth,faceHeight,color,eyeNum){

//x2 = left eye
//y2 = left eye
//x3 = right eye
//y3 = right eye


  var eyeSize = faceWidth*0.1;
  var eyeDiff = faceWidth*0.05;
  var color1 = white;
  var color2 = color;

  //draw eyes
  //one eye
  if(eyeNum==1){
    push();
    translate(x,y);
  drawEye(faceWidth*0.5,faceHeight*0.35,eyeSize,color1,color2);
  pop();
  return;
  }
  //2 eyes
  if(eyeNum>=2){
  drawEye(x2,y2,eyeSize,color1,color2);
  drawEye(x3,y3,eyeSize,color1,color2);
  }
  //4 eyes
  if(eyeNum>=3){
  drawEye(x2+eyeDiff,y2-eyeDiff,eyeSize,color1,color2);
  drawEye(x3-eyeDiff,y3-eyeDiff,eyeSize,color1,color2);
  }
  //6 eyes
  if(eyeNum>=4){
  drawEye(x2+eyeDiff,y2+eyeDiff,eyeSize,color1,color2);
  drawEye(x3-eyeDiff,y3+eyeDiff,eyeSize,color1,color2);
  }



}

//draws a single eye,
//looks at mouse using x and y coords
function drawEye(x,y,size,color1,color2){

  mouseXPos = map(mouseX+x,0,width,-size/7,size/7);
  mouseYPos = map(mouseY+y,0,height,-size/7,size/7);

fill(color1);
ellipse(x,y,size,size);
fill(color2);
ellipse(x+mouseXPos,y+mouseYPos,size*0.6,size*0.6);


}

//nose type 1: like a dog nose
function drawNose1(x,y,faceWidth,faceHeight,color){
  fill(color);

  push();
  translate(x,y);

  //draw nose
  var noseWidth =faceWidth*0.1;
  var noseHeight = faceHeight*0.1;
  var noseX = x;
  var noseY = y;

  translate(noseWidth*0.2,-noseHeight/2);

  ellipse(0,0-noseHeight*0.3,noseWidth,noseHeight/2);
  ellipse(0,0,noseWidth/4,noseHeight);

  pop();

}

//nose type 2: triangle
function drawNose2(x,y,faceWidth,faceHeight,color){



  var noseDiff = faceWidth*0.05;

  push();
  translate(x,y);
  translate(noseDiff/2,0);

  fill(color);
  //draw nose
  var noseX1 = -noseDiff;
  var noseY1 = -noseDiff;
  var noseX2 = 0;
  var noseY2 = noseDiff*0.1;
  var noseX3 = noseDiff;
  var noseY3 = -noseDiff;

  triangle(noseX1,noseY1,noseX2,noseY2,noseX3,noseY3);

  pop();

}

// nose type 3: polygon thing
function drawNose3(x,y,faceWidth,faceHeight,color){

  noseWidth = (faceWidth*0.15);
  noseHeight = (faceHeight*0.15);

  push();
  translate(x,y);
  translate(noseWidth*0.2,-noseHeight*0.4);

  fill(color);
  //draw nose

  beginShape()

  //1
  vertex(noseWidth*0.3,0);
  //2
  vertex(-noseWidth*0.3,0);
  //3
  vertex(-noseWidth*0.2,noseHeight*0.24);
  //4
  vertex(noseWidth*0.2,noseHeight*0.24);

  endShape();
  pop();

}


// mouth type 1: open surprised mouth. Also draws a small tooth
function drawMouth1(x,y,faceWidth,faceHeight,color){



fill(color);
  //draw mouth
  var mouthWidth = faceWidth*0.15;
  var mouthHeight = faceHeight*0.07;
  var mouthX = x;
  var mouthY = y;
  ellipse(mouthX,mouthY,mouthWidth,mouthHeight);

  /*
  //tooth 1
  fill(white);
  rectMode(CORNER);
  var toothWidth = faceWidth*0.1;
  var toothDiff = faceWidth*0.15;
  var toothX1 = (mouthX-toothDiff);
  var toothY1 = mouthY-(mouthHeight/2);
  var toothX2 = (mouthX-toothDiff*2)-toothWidth;
  var toothY2 = mouthY-(mouthHeight/2.5);
  var toothX3 = (mouthX-toothDiff*1.9)+toothWidth;
  var toothY3 = mouthY+toothWidth-(mouthHeight/2);
  triangle(toothX1,toothY1,toothX2,toothY2,toothX3,toothY3);
  */
}

//mouth type 2: upside down triangle mouth
function drawMouth2(x,y,faceWidth,faceHeight,color){


  mouthWidth = faceWidth*0.1;
  mouthHeight = faceHeight*0.05;



  push();
  translate(x,y);

fill(color);
  //draw mouth
  var mouthX1 = -mouthWidth*0.6;
  var mouthY1 = mouthHeight*0.4;
  var mouthX2 = 0;
  var mouthY2 = -mouthHeight*0.5;
  var mouthX3 = mouthWidth*0.6;
  var mouthY3 = mouthHeight*0.4;

  triangle(mouthX1,mouthY1,mouthX2,mouthY2,mouthX3,mouthY3);

  pop();

}

//mouth type 3: mouth that has 2 big teeth
function drawMouth3 (x,y,faceWidth,faceHeight,color1,color2){

  var mouthWidth = faceWidth * 0.1;
  var mouthHeight = faceHeight * 0.5;

  push();
  translate(x,y);

//left tooth
fill(color1);
  //draw mouth
  var toothX1 = -mouthWidth*0.43;
  var toothY1 = -mouthHeight*0.1;
  var toothX2 = -mouthWidth*0.45;
  var toothY2 = mouthHeight*0.05;
  var toothX3 = 0;
  var toothY3 = mouthHeight*0.05;

  triangle(toothX1,toothY1,toothX2,toothY2,toothX3,toothY3);

//right tooth
  fill(color1);
    //draw mouth
    var toothX1 = mouthWidth*0.57;
    var toothY1 = -mouthHeight*0.1;
    var toothX2 = mouthWidth*0.55;
    var toothY2 = mouthHeight*0.05;
    var toothX3 = 0;
    var toothY3 = mouthHeight*0.05;

    triangle(toothX1,toothY1,toothX2,toothY2,toothX3,toothY3);

    //quad for lip
    fill(color2);
    quad(-mouthWidth*0.43,mouthHeight*0.05,mouthWidth*0.57,mouthHeight*0.05,
    mouthWidth*0.57,mouthHeight*0.08,-mouthWidth*0.43,mouthHeight*0.08);

    pop();
}





  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
      this.colorScheme = settings[0];
    this.eyeNum = settings[1];
    this.noseType = settings[2];
    this.mouthType = settings[3];
    this.hornType = settings[4];
    this.hornColor = settings[5];

  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    properties = new Array(6);
    properties[0] = this.colorScheme;
    properties[1] = this.eyeNum;
    properties[2] = this.noseType;
    properties[3] = this.mouthType;
    properties[4] = this.hornType;
    properties[5] = this.hornColor;
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


//gets a distribution of eye numbers
function getEyeNum(){

  randomNum = focusedRandom(0,100);

  if(randomNum<5){
    return 1;
  }
  else if(randomNum < 30){
    return 2;
  }
  else if (randomNum < 80){
    return 3;
  }
  else{
    return 4;
  }

}

//gets a distribution of horn types
function getHornType(){

  randomNum = focusedRandom(0,100);

  if(randomNum<90){
    return 1;
  }
  else{
    return 2;
  }
}

//gets a distribution of face types
function getFaceType(){

  randomNum = focusedRandom(0,100);

  if(randomNum<15){
    return 1;
  }
  else if(randomNum<30){
    return 2;
  }
  else if(randomNum<50){
    return 3;
  }
  else if(randomNum<75){
    return 4;
  }
  else{
    return 5;
  }

}
