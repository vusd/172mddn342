/*
 * name: Edward Taylor
 * github: edeetee
 * release form confirmed by Tom White 26 Oct 2017
 */

/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

var rand = new Math.seedrandom(focusedRandom())

function FaceMap() {
  this.age = 20;
  this.hair_puff = 50;
  this.face_hardness = 50;
  this.mouthTimingRand = rand();

  /*
   * Draw a face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    var is_hard = 50 < this.face_hardness;
    
    //i use my variables differently
    angleMode(RADIANS);
    rectMode(CENTER);
    ellipseMode(RADIUS);
    colorMode(HSB);

    strokeCap(ROUND);
    strokeJoin(BEVEL);

    let chinRect = Rect.fromPoints(positions.chin);

    var higher = pos => [pos[0], pos[1] - chinRect.height*0.25];

    positions.left_eyebrow.reverse();
    positions.right_eyebrow.reverse();

    //fro
    if(this.hair_puff != 0){
      var hair_puffiness = (70+this.hair_puff/2)/110
      fill(0, 80+focusedRandom(-10, 10)+map(this.age, 30, 100, 0, -60), 40+focusedRandom(-10, 10));
      noStroke();
      let topY = positions.left_eyebrow.concat(positions.right_eyebrow).map(higher).reduce((sum, pos) => min(sum, pos[1]), canvasHeight);
      let midX = chinRect.x;
      ellipse(midX, topY+0.5, chinRect.width*hair_puffiness+focusedRandom(-.1, .1, 1, 0), chinRect.width*hair_puffiness+focusedRandom(-.1, .1, 1, 0));
    }
    
    //background white on whole face
    let faceList = positions.chin.concat(positions.right_eyebrow.map(higher), positions.left_eyebrow.map(higher));
    strokeWeight(0.15);
    //makes edges curvy 'n' smooth and fills the space
    var faceBackground = color(0, 0, 100);
    drawCurve(faceList, is_hard ? color(0,0,0,0) : faceBackground, true, faceBackground);

    //chin border
    //scale moves it nicely on the edge
    if(!is_hard){
      scale(1/0.96)
      strokeWeight(0.1)
      drawCurve(positions.chin.slice(1, -1), 'black');
      scale(0.96)
    }

    //brows border
    strokeWeight(0.15);
    drawCurve(positions.left_eyebrow, 'black');
    drawCurve(positions.right_eyebrow, 'black');
    
    //mouth paint
    doCentered(positions.top_lip.concat(positions.bottom_lip), function(points){
      scale(1.5, 1.4);
      strokeWeight(0.1);
      var paintColor = color(0, 80, 100);
      drawCurve(hull(points, 0.7), is_hard ? color(0,0,0,0) : paintColor, true, paintColor);
    });

    //lips
    stroke(0, 90, 85);
    strokeWeight(0.05);
    doCentered(positions.top_lip, function(points, mapper){
      fill(0, 5, 100);
      //this map pushes down the positions in the middle of the bottom lip
      let lipRect = Rect.fromPoints(points);
      let interval = focusedRandom(200, 1000, 3, 600);
      drawPolygon(positions.bottom_lip.map(mapper).map(function(val){
        val[1] += map(min(abs(val[0]-lipRect.minX()), abs(lipRect.maxX()-val[0])), 0, lipRect.width/2, 0, 0.15*sin(millis()/interval*TAU));
        return val;
      }), 'red');

      drawPolygon(positions.top_lip.map(mapper), 'red');
    })

    let pupilRadius = [positions.left_eye, positions.right_eye].reduce((tot, val) => tot+Rect.fromPoints(val).height, 0)/10;

    //eyes
    [positions.left_eye, positions.right_eye].forEach(function(eye){
      doCentered(eye, function(points, mapper){
        noStroke();

        let pointsRect = Rect.fromPoints(points);
        
        //eyes
        strokeWeight(0.2);
        if(is_hard)
          scale(1.5);
        var eyeColor = color(50, 98, 95);
        drawCurve(hull(points, 2), is_hard ? color(0,0,0,0) : eyeColor, true, eyeColor);
        if(is_hard)
          scale(1/1.5);

        noStroke();
        fill(0,0,0);
        ellipse(focusedRandom(0, pointsRect.width*0.5, 4)*sin(millis()/focusedRandom(500, 3000)), 
          focusedRandom(0, pointsRect.height*0.4, 3)*sin(millis()/focusedRandom(300, 1000)),
            0.1, 0.1); //black pupil
      })
    })

    //nose
    strokeWeight(0.05);
    drawCurve(positions.nose_bridge, 'red');
    strokeWeight(0.1);
    drawCurve(positions.nose_tip, 'red')

    //reset direction as tom reuses the lists
    positions.left_eyebrow.reverse();
    positions.right_eyebrow.reverse();
    //reset vars back to tom's defaults
    colorMode(RGB);
    ellipseMode(CENTER);
    angleMode(DEGREES);
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.age = settings[0];
    this.hair_puff = settings[1];
    this.face_hardness = settings[2];
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    properties = [];
    properties[0] = this.age;
    properties[1] = this.hair_puff;
    properties[2] = this.face_hardness;
    return properties;
  }
}

function doCentered(points, func){
  push();
  var position = average_point(points);
  translate(position[0], position[1]);
  let centeredMap = point => [point[0]-position[0], point[1]-position[1]];
  func(points.map(centeredMap), centeredMap, position);
  pop();
}

function drawCurve(points, strokeColor, doFill, fillColor){
  let pointMod = i => points[doFill ? i.mod(points.length) : constrain(i, 0, points.length-1)];

  if(doFill){
    noStroke();
    fill(fillColor || strokeColor);
    drawPolygon(points);
    noFill();
  }

  stroke(strokeColor);

  for(let i = 0; i < points.length; i++){
    let controlStart = pointMod(i-1);
    let point = pointMod(i);
    let pointNext = pointMod(i+1);
    let controlEnd = pointMod(i+2);

    if(point != pointNext)
      curve(...controlStart, ...point, ...pointNext, ...controlEnd);
  }
}

function drawPolygon(points){
  beginShape();
  points.forEach(pos => vertex(...pos));
  endShape(CLOSE);
}

class Rect{
  constructor(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(fillColor){
    //white default
    fill(fillColor || color(0, 0, 100));
    rect(this.x, this.y, this.width, this.height);
  }

  minX(){
    return this.x-this.width/2;
  }

  minY(){
    return this.y-this.height/2;
  }

  maxX(){
    return this.x+this.width/2;
  }

  maxY(){
    return this.y+this.height/2;
  }

  static fromPoints(points){
    var minX = canvasWidth;
    var minY = canvasHeight;
    var maxY = 0;
    var maxX = 0;

    points.forEach(point => {
      minX = min(point[0], minX);
      minY = min(point[1], minY);

      maxX = max(point[0], maxX);
      maxY = max(point[1], maxY);
    });

    return this.fromMinMax(minX, minY, maxX, maxY)
  }

  static fromMinMax(minX, minY, maxX, maxY){
    return new Rect(minX+(maxX-minX)/2, minY+(maxX-minX)/2, (maxX-minX), (maxY-minY));
  }
}

function cross(a, b, o) {
   return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
}

//modulus
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};

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