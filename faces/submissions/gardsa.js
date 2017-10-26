/*
 * name: Samantha Gard
 * github: gardsa
 * release form confirmed by Tom White 26 Oct 2017
 */

/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// other variables can be in here too
// these control the colors used
bg_color = [225,206,187];
fg_color = [151,102,52];
fill_color = [255,255,255];
stroke_color = [30,30,30];

function FaceMap() {
  this.jawShape = 50;
  this.headShape = 50;
  this.mouthShape = 50;
  this.cheekColor = 50;

  /*
   * Draw a face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge,
   */

  this.draw = function(positions) {
    //console.log(positions);
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

    // calculating chin coords
    var chin_max_x = positions.chin[0][0],
        chin_max_y = positions.chin[0][1];

    for(var i=0; i<positions.chin.length; i++){
      if (positions.chin[i][0] > chin_max_x){
        chin_max_x = positions.chin[i][0];
      }
      if (positions.chin[i][1] > chin_max_y){
        chin_max_y = positions.chin[i][1];
      }
    }
    var chin_height = chin_max_y - positions.chin[0][1];
    var chin_width = chin_max_x - positions.chin[0][0];

    // calculating brow coords
    var left_eyebrow_max_y = positions.left_eyebrow[0][1];

    for(var i=0; i<positions.left_eyebrow.length; i++){
      if (positions.left_eyebrow[i][1] > left_eyebrow_max_y){
        left_eyebrow_max_y = positions.left_eyebrow[i][1];
      }
    }

    // calculating mouth coords
    var top_lip_max_y = positions.top_lip[0][1],
        bottom_lip_max_y = positions.bottom_lip[0][1],
        top_lip_max_x,
        bottom_lip_max_x;
    for(var i=0; i<positions.top_lip.length; i++){
      if (positions.top_lip[i][1] < top_lip_max_y){
        top_lip_max_y = positions.top_lip[i][1];
        top_lip_max_x = positions.top_lip[i][0];
      }
    }
    for(var i=0; i<positions.bottom_lip.length; i++){
      if (positions.bottom_lip[i][1] > bottom_lip_max_y){
        bottom_lip_max_y = positions.bottom_lip[i][1];
        bottom_lip_max_x = positions.bottom_lip[i][0];
      }
    }

    var top_lip_height = positions.top_lip[0][1] - top_lip_max_y;
    var bottom_lip_height = bottom_lip_max_y - positions.bottom_lip[0][1];

    // calculating eye coords
    // left eye coords
    var left_eye_max_x = positions.left_eye[0][0],
        left_eye_top_y = positions.left_eye[0][1],
        left_eye_bottom_y = positions.left_eye[0][1];

    for(var i=0; i<positions.left_eye.length; i++){
      if (positions.left_eye[i][0] > left_eye_max_x){
        left_eye_max_x = positions.left_eye[i][0];
      }
      if (positions.left_eye[i][1] < left_eye_top_y){
        left_eye_top_y = positions.left_eye[i][1];
      }
      if (positions.left_eye[i][1] > left_eye_bottom_y){
        left_eye_bottom_y = positions.left_eye[i][1];
      }
    }

    // right eye coords
    var right_eye_max_x = positions.right_eye[0][0],
        right_eye_top_y = positions.right_eye[0][1],
        right_eye_bottom_y = positions.right_eye[0][1];

    for(var i=0; i<positions.right_eye.length; i++){
      if (positions.right_eye[i][0] > right_eye_max_x){
        right_eye_max_x = positions.right_eye[i][0];
      }
      if (positions.right_eye[i][1] < right_eye_top_y){
        right_eye_top_y = positions.right_eye[i][1];
      }
      if (positions.right_eye[i][1] > right_eye_bottom_y){
        right_eye_bottom_y = positions.right_eye[i][1];
      }
    }

    strokeWeight(2*scale);

    // drawing head shapes with fill
    if(this.headShape < 33) {
      noStroke();
      fill(fill_color);
      quad(positions.left_eye[0][0]+(20*scale),left_eye_top_y-(50*scale),positions.right_eye[0][0],right_eye_top_y-(75*scale),chin_max_x-(20*scale),positions.chin[positions.chin.length-4][1],positions.left_eye[0][0],positions.chin[positions.chin.length-4][1]+(20*scale));
    }
    else if(this.headShape >= 33 && this.headShape < 66) {
      noStroke();
      fill(fill_color);
      beginShape();
      vertex(positions.left_eye[0][0]+(20*scale),left_eye_top_y-(70*scale));
      vertex(right_eye_max_x+(10*scale),left_eye_top_y-(70*scale));
      vertex(chin_max_x-(40*scale),right_eye_bottom_y+(50*scale));
      vertex(positions.nose_tip[0][0],positions.nose_tip[0][1]+(50*scale));
      vertex(positions.chin[0][0]+(10*scale),left_eye_bottom_y+(30*scale));
      vertex(positions.left_eye[0][0]+(20*scale),left_eye_top_y-(70*scale));
      endShape();
    }
    else if(this.headShape >=67) {
      noStroke();
      fill(fill_color);
      beginShape();
      vertex(positions.left_eye[0][0]-(5*scale),left_eye_top_y-(30*scale));
      vertex(left_eye_max_x+(15*scale),left_eye_top_y-(80*scale));
      vertex(positions.right_eye[0][0]+(25*scale),right_eye_top_y-(10*scale));
      vertex(positions.nose_bridge[2][0]+(5*scale),positions.nose_bridge[3][1]+(30*scale));
      vertex(positions.left_eye[0][0]-(15*scale),left_eye_bottom_y+(30*scale));
      vertex(positions.left_eye[0][0]-(5*scale),left_eye_top_y-(30*scale));
      endShape();
    }

    // drawing jaw shapes with fill
    if(this.jawShape < 33) {
      noStroke();
      fill(fill_color);
      quad(positions.chin[0][0]+(chin_width/2)-(60*scale),positions.chin[0][1],chin_max_x,positions.chin[0][1]+(chin_height/2),positions.chin[0][0]+(chin_width/2),chin_max_y,positions.chin[0][0],positions.chin[0][1]+(chin_height/2)+(40*scale));
    }
    else if(this.jawShape >= 33 && this.jawShape < 66) {
      noStroke();
      fill(fill_color);
      beginShape();
      vertex(positions.chin[0][0]+(chin_width/2)+(20*scale),positions.chin[0][1]+(10*scale));
      vertex(chin_max_x-(30*scale),positions.chin[0][1]+(chin_height/2)+(20*scale));
      vertex(positions.chin[0][0]+(chin_width/1.5),chin_max_y);
      vertex(positions.chin[0][0]+(chin_width/2.5),chin_max_y);
      vertex(positions.chin[0][0]+(40*scale),positions.chin[0][1]+(chin_height/2)+(40*scale));
      vertex(positions.chin[0][0]+(chin_width/2)+(20*scale),positions.chin[0][1]+(10*scale));
      endShape();
    }
    else if(this.jawShape >=67){
      noStroke();
      fill(fill_color);
      beginShape();
      vertex(positions.chin[0][0]+(chin_width/2.5),left_eyebrow_max_y-(35*scale));
      vertex(chin_max_x-(chin_width/4),right_eye_bottom_y+(30*scale));
      vertex(chin_max_x-(chin_width/2.5),chin_max_y);
      vertex(positions.chin[0][0]+(chin_width/3),chin_max_y-40*scale);
      vertex(positions.chin[0][0]+(chin_width/4),left_eye_top_y-(25*scale));
      vertex(positions.chin[0][0]+(chin_width/2.5),left_eyebrow_max_y-(35*scale));
      endShape();
    }

    // drawing cheeks
    var cheek_color,
        c1 = color(224,80,111),
        c2 = color(71,26,35),
        inter = map(this.cheekColor,0,100,0,1);

    cheek_color = lerpColor(c1, c2, inter);

    fill(cheek_color);

    rotate(-35);
    ellipse(positions.chin[0][0]+(30*scale),positions.nose_tip[0][1]-(20*scale),60*scale,90*scale);

    rotate(55);
    ellipse(chin_max_x-(30*scale),positions.nose_tip[0][1]+(10*scale),50*scale,80*scale);

    // reset rotation
    rotate(-20);


    // drawing head shapes with stroke
    if(this.headShape < 33) {
      noFill();
      stroke(stroke_color);
      quad(positions.left_eye[0][0]+(20*scale),left_eye_top_y-(50*scale),positions.right_eye[0][0],right_eye_top_y-(75*scale),chin_max_x-(20*scale),positions.chin[positions.chin.length-4][1],positions.left_eye[0][0],positions.chin[positions.chin.length-4][1]+(20*scale));

      translate(2*scale,-2*scale);
      rotate(2);
      strokeWeight(1*scale);

      quad(positions.left_eye[0][0]+(20*scale),left_eye_top_y-(50*scale),positions.right_eye[0][0],right_eye_top_y-(75*scale),chin_max_x-(20*scale),positions.chin[positions.chin.length-4][1],positions.left_eye[0][0],positions.chin[positions.chin.length-4][1]+(20*scale));

      translate(-2*scale,2*scale);
      rotate(-2);
      strokeWeight(2*scale);
    }
    else if(this.headShape >= 33 && this.headShape < 66) {
      noFill();
      stroke(stroke_color);
      beginShape();
      vertex(positions.left_eye[0][0]+(20*scale),left_eye_top_y-(70*scale));
      vertex(right_eye_max_x+(10*scale),left_eye_top_y-(70*scale));
      vertex(chin_max_x-(40*scale),right_eye_bottom_y+(50*scale));
      vertex(positions.nose_tip[0][0],positions.nose_tip[0][1]+(50*scale));
      vertex(positions.chin[0][0]+(10*scale),left_eye_bottom_y+(30*scale));
      vertex(positions.left_eye[0][0]+(20*scale),left_eye_top_y-(70*scale));
      endShape();

      translate(2*scale,-2*scale);
      rotate(2);
      strokeWeight(1*scale);

      beginShape();
      vertex(positions.left_eye[0][0]+(20*scale),left_eye_top_y-(70*scale));
      vertex(right_eye_max_x+(10*scale),left_eye_top_y-(70*scale));
      vertex(chin_max_x-(40*scale),right_eye_bottom_y+(50*scale));
      vertex(positions.nose_tip[0][0],positions.nose_tip[0][1]+(50*scale));
      vertex(positions.chin[0][0]+(10*scale),left_eye_bottom_y+(30*scale));
      vertex(positions.left_eye[0][0]+(20*scale),left_eye_top_y-(70*scale));
      endShape();

      translate(-2*scale,2*scale);
      rotate(-2);
      strokeWeight(2*scale);
    }
    else if(this.headShape >=67) {
      noFill();
      stroke(stroke_color);
      beginShape();
      vertex(positions.left_eye[0][0]-(5*scale),left_eye_top_y-(30*scale));
      vertex(left_eye_max_x+(15*scale),left_eye_top_y-(80*scale));
      vertex(positions.right_eye[0][0]+(25*scale),right_eye_top_y-(10*scale));
      vertex(positions.nose_bridge[2][0]+(5*scale),positions.nose_bridge[3][1]+(30*scale));
      vertex(positions.left_eye[0][0]-(15*scale),left_eye_bottom_y+(30*scale));
      vertex(positions.left_eye[0][0]-(5*scale),left_eye_top_y-(30*scale));
      endShape();

      translate(2*scale,-2*scale);
      rotate(2);
      strokeWeight(1*scale);

      beginShape();
      vertex(positions.left_eye[0][0]-(5*scale),left_eye_top_y-(30*scale));
      vertex(left_eye_max_x+(15*scale),left_eye_top_y-(80*scale));
      vertex(positions.right_eye[0][0]+(25*scale),right_eye_top_y-(10*scale));
      vertex(positions.nose_bridge[2][0]+(5*scale),positions.nose_bridge[3][1]+(30*scale));
      vertex(positions.left_eye[0][0]-(15*scale),left_eye_bottom_y+(30*scale));
      vertex(positions.left_eye[0][0]-(5*scale),left_eye_top_y-(30*scale));
      endShape();

      translate(-2*scale,2*scale);
      rotate(-2);
      strokeWeight(2*scale);
    }


    // drawing jaw shapes with stroke
    if(this.jawShape < 33) {
      noFill();
      stroke(stroke_color);
      quad(positions.chin[0][0]+(chin_width/2)-(60*scale),positions.chin[0][1],chin_max_x,positions.chin[0][1]+(chin_height/2),positions.chin[0][0]+(chin_width/2),chin_max_y,positions.chin[0][0],positions.chin[0][1]+(chin_height/2)+(40*scale));

      translate(2*scale,-2*scale);
      rotate(2);
      strokeWeight(1*scale);

      quad(positions.chin[0][0]+(chin_width/2)-(60*scale),positions.chin[0][1],chin_max_x,positions.chin[0][1]+(chin_height/2),positions.chin[0][0]+(chin_width/2),chin_max_y,positions.chin[0][0],positions.chin[0][1]+(chin_height/2)+(40*scale));

      translate(-2*scale,2*scale);
      rotate(-2);
      strokeWeight(2*scale);
    }
    else if(this.jawShape >= 33 && this.jawShape < 66) {
      noFill();
      stroke(stroke_color);
      beginShape();
      vertex(positions.chin[0][0]+(chin_width/2)+(20*scale),positions.chin[0][1]+(10*scale));
      vertex(chin_max_x-(30*scale),positions.chin[0][1]+(chin_height/2)+(20*scale));
      vertex(positions.chin[0][0]+(chin_width/1.5),chin_max_y);
      vertex(positions.chin[0][0]+(chin_width/2.5),chin_max_y);
      vertex(positions.chin[0][0]+(40*scale),positions.chin[0][1]+(chin_height/2)+(40*scale));
      vertex(positions.chin[0][0]+(chin_width/2)+(20*scale),positions.chin[0][1]+(10*scale));
      endShape();

      translate(2*scale,-2*scale);
      rotate(2);
      strokeWeight(1*scale);

      beginShape();
      vertex(positions.chin[0][0]+(chin_width/2)+(20*scale),positions.chin[0][1]+(10*scale));
      vertex(chin_max_x-(30*scale),positions.chin[0][1]+(chin_height/2)+(20*scale));
      vertex(positions.chin[0][0]+(chin_width/1.5),chin_max_y);
      vertex(positions.chin[0][0]+(chin_width/2.5),chin_max_y);
      vertex(positions.chin[0][0]+(40*scale),positions.chin[0][1]+(chin_height/2)+(40*scale));
      vertex(positions.chin[0][0]+(chin_width/2)+(20*scale),positions.chin[0][1]+(10*scale));
      endShape();

      translate(-2*scale,2*scale);
      rotate(-2);
      strokeWeight(2*scale);
    }
    else if(this.jawShape >=67){
      noFill();
      stroke(stroke_color);
      beginShape();
      vertex(positions.chin[0][0]+(chin_width/2.5),left_eyebrow_max_y-(35*scale));
      vertex(chin_max_x-(chin_width/4),right_eye_bottom_y+(30*scale));
      vertex(chin_max_x-(chin_width/2.5),chin_max_y);
      vertex(positions.chin[0][0]+(chin_width/3),chin_max_y-40*scale);
      vertex(positions.chin[0][0]+(chin_width/4),left_eye_top_y-(25*scale));
      vertex(positions.chin[0][0]+(chin_width/2.5),left_eyebrow_max_y-(35*scale));
      endShape();

      translate(2*scale,-2*scale);
      rotate(2);
      strokeWeight(1*scale);

      beginShape();
      vertex(positions.chin[0][0]+(chin_width/2.5),left_eyebrow_max_y-(35*scale));
      vertex(chin_max_x-(chin_width/4),right_eye_bottom_y+(30*scale));
      vertex(chin_max_x-(chin_width/2.5),chin_max_y);
      vertex(positions.chin[0][0]+(chin_width/3),chin_max_y-40*scale);
      vertex(positions.chin[0][0]+(chin_width/4),left_eye_top_y-(25*scale));
      vertex(positions.chin[0][0]+(chin_width/2.5),left_eyebrow_max_y-(35*scale));
      endShape();

      translate(-2*scale,2*scale);
      rotate(-2);
      strokeWeight(2*scale);
    }

    // set variables for facial components
    fill(fill_color);
    stroke(stroke_color);

    // nose
    triangle(positions.nose_bridge[2][0],positions.nose_bridge[2][1],positions.nose_tip[0][0],positions.nose_tip[0][1],positions.nose_tip[positions.nose_tip.length-1][0],positions.nose_tip[positions.nose_tip.length-1][1]);

    // mouth
    if (this.mouthShape >= 50){
      // draw indifferent mouth
      triangle(positions.top_lip[0][0],positions.top_lip[0][1],positions.bottom_lip[0][0],positions.bottom_lip[0][1],top_lip_max_x,top_lip_max_y);
    }
    else {
      // draw happy mouth
      triangle(positions.top_lip[0][0],positions.top_lip[0][1],positions.bottom_lip[0][0],positions.bottom_lip[0][1],bottom_lip_max_x,bottom_lip_max_y);
    }

    // eye sockets
    fill(fill_color);
    quad(positions.left_eye[0][0]-(7*scale),left_eye_top_y-(10*scale),left_eye_max_x,left_eye_top_y-(10*scale),left_eye_max_x+(15*scale),left_eye_bottom_y+(5*scale),positions.left_eye[0][0]-(7*scale),left_eye_bottom_y+(5*scale));
    quad(positions.right_eye[0][0]-(5*scale),right_eye_top_y-(5*scale),right_eye_max_x+(5*scale),right_eye_top_y-(5*scale),right_eye_max_x,right_eye_bottom_y+(5*scale),positions.right_eye[0][0],right_eye_bottom_y+(5*scale));

    // eyes
    strokeWeight(0.75*scale);
    fill(stroke_color);
    triangle(positions.left_eye[0][0]-(8*scale),left_eye_top_y+(7*scale),left_eye_max_x+(9*scale),left_eye_top_y+(7*scale),(positions.left_eye[0][0]+left_eye_max_x)/2,left_eye_bottom_y+(5*scale));
    triangle(positions.right_eye[0][0]-(4*scale),right_eye_top_y+(7*scale),right_eye_max_x+(4*scale),right_eye_top_y+(7*scale),(positions.right_eye[0][0]+right_eye_max_x)/2,right_eye_bottom_y+(5*scale));

    // pupils
    fill(fill_color);
    ellipse(eye1_pos[0],eye1_pos[1]+(2*scale),19*scale,13*scale);
    ellipse(eye2_pos[0],eye2_pos[1]+(2*scale),19*scale,13*scale)

    // irises
    fill(stroke_color);
    ellipse(eye1_pos[0],eye1_pos[1]+(2*scale),8*scale,8*scale);
    ellipse(eye2_pos[0],eye2_pos[1]+(2*scale),8*scale,8*scale)

    // eyelids
    fill(fill_color);
    triangle(positions.left_eye[0][0]-(8*scale),left_eye_top_y+(7*scale),left_eye_max_x+(9*scale),left_eye_top_y+(7*scale),(positions.left_eye[0][0]+left_eye_max_x)/2,left_eye_top_y-(3*scale));
    triangle(positions.right_eye[0][0]-(4*scale),right_eye_top_y+(7*scale),right_eye_max_x+(4*scale),right_eye_top_y+(7*scale),(positions.right_eye[0][0]+right_eye_max_x)/2,right_eye_top_y-(1*scale));
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.headShape = settings[0];
    this.jawShape = settings[1];
    this.mouthShape = settings[2];
    this.cheekColor = settings[3];
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    properties = new Array(2);
    properties[0] = this.headShape;
    properties[1] = this.jawShape;
    properties[2] = this.mouthShape;
    properties[3] = this.cheekColor;
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
