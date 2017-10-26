/*
 * name: Susan Williams
 * github: S-Williams42
 * release form confirmed by Tom White 26 Oct 2017
 */

/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// other variables can be in here too
// these control the colors used
//times
  times = 30;
bg_color = [225, 206, 187];
fg_color = [255,0,0];
stroke_color = [95, 52, 8];
mC = null;
hairC = null
bgC = null;
function FaceMap(slids) {

  this.hairLength = 50*times;
  this.hairColor = 50*times;
  //the scale amount for all the tiny variables
  //skin tones
  this.skinRed = 0;
this.skinGreen = 0;
this.skinBlue = 0;
  this.slids = slids;

  //set up the graphics objects for masking
  //graphics width
  this.gW = 400;
  mC = createGraphics(this.gW,this.gW);
bgC = createGraphics(this.gW,this.gW);
hairC = createGraphics(this.gW,this.gW);
mC.translate(100,100);
bgC.translate(100,100);
hairC.translate(100,100);
 this.slids.randomSliders(focusedRandom(0,100), focusedRandom(0,100),focusedRandom(0,100),focusedRandom(0,100),focusedRandom(0,100),focusedRandom(0,100),focusedRandom(0,100));

  /*
   * Draw a face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    mC.background(0,0,155);
    bgC.background(0,155,0);
    hairC.background(0,155,0);
    hairC.strokeWeight(3);
    hairC.stroke(122,0,200);
    //hair colour
    this.hCol=slids.scaleSliders(10,50,200,true);
    hairC.fill(this.hCol,0,this.hCol);

    for(this.count = 0; this.count<200; this.count++){
     hairC.bezier(focusedRandom(-95,95),focusedRandom(-90,100),focusedRandom(-95,95),focusedRandom(-90,100),focusedRandom(-95,95),focusedRandom(-90,100),focusedRandom(-95,95),focusedRandom(-90,100));}
    
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
    var scale = extent / 220.0;

    // Uncomment to see drawing area
    // fill(255);
    // stroke(0);
    // rect(x-w/2, y-h/2, w, h);
    // fill(0)
    // ellipse(x, y, w, h);

    // head
    mC.stroke(stroke_color);
    mC.fill(254,0,0);
    //hair
    this.dotScale= slids.scaleSliders(7,0.5,1.5);
    this.hairDot = slids.scaleSliders(6,10,120,true);
    for(this.i = 0;this.i<this.hairDot;this.i++){
      mC.ellipse(focusedRandom(-80,80,3,-10), focusedRandom(-80,80,2,-60),focusedRandom(20,40)*this.dotScale,focusedRandom(20,50)*this.dotScale);

    }
    mC.fill(fg_color);
mC.noStroke();


    mC.beginShape();
    for(var i=0; i<positions.chin.length;i++) {
      mC.vertex((positions.chin[i][0])*times, (positions.chin[i][1])*times);
    }
    for(var i=positions.right_eyebrow.length-1; i>=0;i--) {
      mC.vertex((positions.right_eyebrow[i][0])*times, (positions.right_eyebrow[i][1])*times);
    }
    for(var i=positions.left_eyebrow.length-1; i>=0;i--) {
      mC.vertex((positions.left_eyebrow[i][0])*times, (positions.left_eyebrow[i][1])*times);
    }
    mC.endShape(CLOSE);

    // mouth
    mC.noStroke();
    mC.fill(bg_color);
    mC.beginShape();
    for(var i=0; i<positions.top_lip.length;i++) {
      mC.vertex((positions.top_lip[i][0])*times, (positions.top_lip[i][1])*times);
    }
    mC.endShape(CLOSE);
    mC.beginShape();
    for(var i=0; i<positions.bottom_lip.length;i++) {
      mC.vertex((positions.bottom_lip[i][0])*times, (positions.bottom_lip[i][1])*times);
    }
    mC.endShape(CLOSE);

    mC.strokeWeight(1);  

    imageMode(CENTER);
   //image(this.img,0,0,w,h);

    //ellipse(0,0,w*2,h*2.5);
   
    mC.fill(255,0,0);
    mC.ellipse(0,0,1.2,0.2);
    this.skinPattern(bgC);
    this.basicMask(mC,bgC,hairC);
   image(mC,0,0,10,10);







  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.hairLength = settings[0];
    this.hairColor = settings[1];
  }

this.skinPattern = function(skinC){
  
  //selects a skin color based on slider 2
  this.check = this.slids.scaleSliders(2,1,5,true);
  if(this.check == 3){
    this.skinRed = 167;
    this.skinGreen = 202;
    this.skinBlue = 219;
  }
  
  else if(this.check == 4){
    this.skinRed = 151;
    this.skinGreen = 102;
    this.skinBlue = 52;
  }
  //else if(this.check == 3){
   // this.skinRed = 200;
  //  this.skinGreen = 0;
  //  this.skinBlue = 200;
 // }

  else if(this.check == 1){ 
    this.skinRed = 244;
    this.skinGreen = 222;
    this.skinBlue = 216;
  }

  else{
    this.skinRed = 171;
    this.skinGreen = 225;
    this.skinBlue = 171;
  }

  skinC.background(this.skinRed,this.skinGreen,this.skinBlue);
 
  

  //draws a scattering of flowers accross the face
    for(this.num = 0; this.num < this.slids.scaleSliders(4,0,70,true); this.num ++){
     skinC.push();
      //creates a random shade of the skin tone for the flower
      this.flowerTone = focusedRandom(-70,100);

      skinC.fill(this.skinRed + this.flowerTone, this.skinGreen + this.flowerTone, this.skinBlue + this.flowerTone);
      skinC.translate(focusedRandom(-50,40),focusedRandom(-30,65));
      this.flower(focusedRandom(2,4), focusedRandom(6,10), skinC);

      skinC.pop();
    }

    //draws a large black flower on right cheeck
    skinC.fill(1);
    skinC.noStroke();
    skinC.push();
    skinC.translate(35,20);
    this.flower(5,13, skinC);
    skinC.pop();
    //eyes
    //whites
    skinC.fill(this.skinRed+150,this.skinGreen+150,this.skinBlue+150);
    skinC.push();
    skinC.stroke(1);
    skinC.translate(-25,-15);
    skinC.ellipse(0,0, 35,25);
    skinC.fill(this.skinRed-100,this.skinGreen-100,this.skinBlue-100);
    skinC.ellipse(0,0,25,25);
    skinC.fill(1)
    skinC.ellipse(0,0,20,20);
    skinC.pop();
    //right eye
    skinC.push();
    skinC.stroke(1);
    skinC.translate(25,-15);
    skinC.ellipse(0,0, 35,25);
    skinC.fill(this.skinRed-100,this.skinGreen-100,this.skinBlue-100);
    skinC.ellipse(0,0,25,25);
    skinC.fill(1)
    skinC.ellipse(0,0,20,20);
    skinC.pop();
  }
  //draws a flower at point 0,0 on bgC
  this.flower = function(petalW, petalGap, skinC){
  skinC.noStroke();
  skinC.ellipse(0,0,petalW,petalW);
  skinC.angleMode(DEGREES);
  for(this.count = 0;this.count<5 ; this.count++){
   skinC.rotate(360/5);
  skinC.ellipse(0,-petalGap,petalW,petalW+(petalW/2));}
}



//takes 2 canvases a  mask canvas mC
  //a patterned canvas bgC
  //draws the shape of the mask, in the patten, onto the main canvas c

this.basicMask = function(shape, pattern,hairPat){
  //loads the pixels of the mask and background into arrays
  shape.loadPixels(); 
  pattern.loadPixels();
  hairPat.loadPixels();
  //the colour of the mask shape
  this.mask = color(255, 0, 0);
  this.mask2 = color(254, 0, 0);
  //calculates the length of the array
  this.d =pixelDensity();
  this.halfImage = 4 * (this.gW*4 * this.d) * (this.gW/2 * this.d);
  //if the pixel is the mask colour, set it to the rgb value of the corresponding patterned pixel
  for (this.i = 0; this.i < this.halfImage; this.i+=4){
    //the red value of the pixel
    this.checkVal = mC.pixels[this.i];
    //check for if the red value matches the mask value
    if( this.checkVal== red(this.mask)) {
      //take the colour values from the pattern array
      //put them in the mask array
      shape.pixels[this.i] = pattern.pixels[this.i];
      shape.pixels[this.i+1] = pattern.pixels[this.i+1];
      shape.pixels[this.i+2] = pattern.pixels[this.i+2];
    
    //if not one of the mask values being searched for, set the pixel to clear
    }
    else   if( this.checkVal== red(this.mask2)) {
      //take the colour values from the pattern array
      //put them in the mask array
      shape.pixels[this.i] = pattern.pixels[this.i];
      shape.pixels[this.i+1] = hairPat.pixels[this.i+1];
      shape.pixels[this.i+2] = hairPat.pixels[this.i+2];
    
    //if not one of the mask values being searched for, set the pixel to clear
    }
    else{
      shape.pixels[this.i+3] = 0;
    }
  }
  //draw the patterned shape onto the canvas
  shape.updatePixels();
  image(shape,0,0,10, 10);

  }


  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    properties = new Array(2);
    properties[0] = this.hairLength;
    properties[1] = this.hairColor;
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

  return [(sum_x / num_points)*times, (sum_y / num_points)*times];
}