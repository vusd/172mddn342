/*
 * name: Shane Watters
 * github: LABCAT
 * release form confirmed by Tom White 26 Oct 2017
 */

/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

function FaceMap() {
	//variables that can be set by the sliders
    this.eyebrowThickness = 50;
    this.mouthOpenLevel = 50;
    this.eyeBrightness = 50;
    this.hairLength = 50;
    this.skinTone = 50;
    this.hasEarings = 0;
	this.lipVibrancy = 0;
    this.facialHair = 0;
    /*
    * Draw a face with position lists that include:
    *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
    *    bottom_lip, top_lip, nose_tip, nose_bridge,
    */
    this.draw = function(positions, allowRandomize = true) {
        /* most of time a random hue will be used 
		 * however for the TrainQuiz and ValidQuiz modes the hue will be the same 
		 * so that it easier to tell the differences in the four small faces.
		 */
		if(allowRandomize){
            this.randomize();   
        }
		else {
			this.hue = 200;
		}
        var nose_pos = average_point(positions.nose_bridge);
        var eye1_pos = average_point(positions.left_eye);
        var eye2_pos = average_point(positions.right_eye);
        var half_height = positions.chin[7][1] - nose_pos[1];
        var face_width = positions.chin[positions.chin.length-1][0] - positions.chin[0][0];
        var chin_nose_diff_x = positions.chin[8][0] - positions.nose_bridge[0][0];
        var chin_nose_diff_y = positions.chin[8][1] - positions.nose_bridge[0][1];

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

        colorMode(HSB);
        rectMode(CENTER);

		//set some variables that will be used throughout the face 
        var tone = map(this.skinTone, 100, 0, 20, 60);
        var vibrancy = map(this.lipVibrancy, 0, 100, 0, 80);
        var reverseTone = map(this.skinTone, 100, 0, 50, 20);


        /**************************************************/
		/***     draw the neck using the nose data      ***/
		/**************************************************/
        stroke(this.hue, tone, 90);
        fill(this.hue, 90, tone);
        var yPos = positions.nose_bridge[0][1];
        var noseWidth = (positions.nose_tip[4][0] - positions.nose_tip[0][0]) / 4;
        for(var i=0; i < positions.nose_bridge.length; i++){
            if(i == 0){
                yPos = yPos + (8 * scale) + chin_nose_diff_y;
            }
            else {
                yPos = yPos + (8 * scale);
            }
            rect(positions.nose_bridge[i][0] + chin_nose_diff_x, yPos, noseWidth * (i + 1), 8 * scale);
        }

		//set some variables that used to draw the robots antennas and static electricity
        var leftAntennaIndex = 0;
        var rightAntennaIndex = 4;
        var staticElectricityStroke = [this.hue,100,reverseTone];
        var hair = map(this.hairLength, 0, 100, 0, 5);

		/****************************************************/
		/*** if the person has no hair, give them a dome  ***/
		/****************************************************/
        if(!hair){
            leftAntennaIndex = 2;
            rightAntennaIndex = 2;
            staticElectricityStroke = [48,97,100];
            //dome
            fill(193, 18, 95, 0.5);
            stroke(191, 41, 95);
            strokeWeight(0.05);
            beginShape();
            vertex(positions.left_eyebrow[4][0]-(20*scale), positions.left_eyebrow[4][1]-(20*scale));
            vertex(positions.left_eyebrow[0][0]-(20*scale), positions.left_eyebrow[0][1]-(20*scale));
            if((positions.left_eyebrow[0][0] - positions.chin[0][0]) > 0.5){
                vertex(positions.chin[0][0]-(20*scale), positions.chin[0][1]);
                curveVertex(positions.nose_bridge[0][0] - 1.5, positions.nose_bridge[0][1] - 2);
            }
            else {
                curveVertex(positions.nose_bridge[0][0] - 1.2, positions.nose_bridge[0][1] - 2);
            }
            curveVertex(positions.nose_bridge[0][0], positions.nose_bridge[0][1] - 2.5);
            if((positions.chin[16][0] - positions.right_eyebrow[4][0]) > 0.5){
                curveVertex(positions.nose_bridge[0][0] + 1.5, positions.nose_bridge[0][1] - 2);
                vertex(positions.chin[16][0]+(20*scale), positions.chin[16][1]);
            }
            else {
                curveVertex(positions.nose_bridge[0][0] + 1.2, positions.nose_bridge[0][1] - 2);
            }
            vertex(positions.right_eyebrow[4][0]+(20*scale), positions.right_eyebrow[4][1]-(20*scale));
            vertex(positions.right_eyebrow[0][0]+(20*scale), positions.right_eyebrow[0][1]-(20*scale));
            endShape(CLOSE);
        }

		/****************************************************/
		/***      static electricty between antennas      ***/
		/****************************************************/
        noFill();
        var thickness = map(this.eyebrowThickness, 0, 100, 0.11, 0.21);
        stroke(staticElectricityStroke);
        strokeWeight(thickness);
        beginShape();
        vertex(positions.left_eyebrow[leftAntennaIndex][0], positions.left_eyebrow[2][1]-(60*scale));
        vertex(positions.left_eyebrow[leftAntennaIndex][0] + 32 * scale, positions.left_eyebrow[2][1]-(60*scale));
        var x = positions.left_eyebrow[leftAntennaIndex][0] + (32 * scale);
        var limit = positions.right_eyebrow[rightAntennaIndex][0] - (64 * scale);
        var averageY = ((positions.left_eyebrow[2][1]-(60*scale)) + (positions.right_eyebrow[2][1]-(60*scale))) / 2;
        var yIncrement = true;
        while( x < limit){
            x = x + 32 * scale;
            if(yIncrement){
                var yValue =  averageY+(16 * scale);
                yIncrement = false;
            }
            else {
                var yValue =  averageY-(16 * scale);
                yIncrement = true;
            }
            vertex(x,yValue);
        }
        vertex(positions.right_eyebrow[rightAntennaIndex][0] - 32 * scale, positions.right_eyebrow[2][1]-(60*scale));
        vertex(positions.right_eyebrow[rightAntennaIndex][0], positions.right_eyebrow[2][1]-(60*scale));
        endShape();

        /****************************************************/
		/*** static electricity is used to represent hair ***/
		/***     the length of hair determines how much   ***/
		/****************************************************/
		if(hair){
			var from = color(this.hue,100,reverseTone);
			var to = color(48,97,100);
			for( var i=1; i <= hair ; i++){
				stroke(lerpColor(from, to, (.2 * i)));
				strokeWeight(thickness/(i+1) );
				beginShape();
				vertex(positions.left_eyebrow[leftAntennaIndex][0] +((i*10) *scale), positions.left_eyebrow[2][1]-((60 + i*20) *scale));
				vertex(positions.left_eyebrow[leftAntennaIndex][0] + 32 * scale, positions.left_eyebrow[2][1]-((60 + i*20)*scale));
				var x = positions.left_eyebrow[leftAntennaIndex][0] + (32 * scale);
				var limit = positions.right_eyebrow[rightAntennaIndex][0] - (64 * scale);
				var averageY = ((positions.left_eyebrow[2][1]-((60 + i*20)*scale)) + (positions.right_eyebrow[2][1]-((60 + i*20)*scale))) / 2;
				var yIncrement = true;
				while( x < limit){
					x = x + 32 * scale;
					if(yIncrement){
						var yValue =  averageY+(16 * scale);
						yIncrement = false;
					}
					else {
						var yValue =  averageY-(16 * scale);
						yIncrement = true;
					}
					vertex(x,yValue);
				}
				vertex(positions.right_eyebrow[rightAntennaIndex][0] - 32 * scale, positions.right_eyebrow[2][1]-((60 + i*20)*scale));
				vertex(positions.right_eyebrow[rightAntennaIndex][0] - ((i*10) *scale), positions.right_eyebrow[2][1]-((60 + i*20)*scale));
				endShape();
			}
		}

        /**************************************************/
		/*** draw the antennas using the eyebrow data   ***/
		/**************************************************/
        stroke(this.hue, 90, tone);
        strokeWeight(thickness);
        fill(this.hue, tone, 90);
        line(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1], positions.left_eyebrow[leftAntennaIndex][0], positions.left_eyebrow[2][1]-(60*scale));
        ellipse( positions.left_eyebrow[leftAntennaIndex][0], positions.left_eyebrow[2][1]-(60*scale), 16 * scale, 16 * scale);
        line(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1], positions.right_eyebrow[rightAntennaIndex][0], positions.right_eyebrow[2][1]-(60*scale));
        ellipse(positions.right_eyebrow[rightAntennaIndex][0], positions.right_eyebrow[2][1]-(60*scale), 16 * scale, 16 * scale);

		
		/***************************************************/
		/*** extra antennas for faces that have earrings ***/
		/***************************************************/
		var hasEarings = map(this.hasEarings, 0, 100, 0, 1);
        if(hasEarings >= 1){

			//left earings/antenna
			stroke(this.hue, 90, 50);
			fill(this.hue, 50, 90);
			strokeWeight(0);
			rect(positions.chin[2][0]-(40*scale), positions.chin[2][1], 1, 0.05, 20, 20);
			noFill();
			strokeWeight(0.04);
			ellipse(positions.chin[2][0]-(55*scale), positions.chin[2][1], 0.12, 0.5);
			ellipse(positions.chin[2][0]-(75*scale), positions.chin[2][1], 0.08, 0.3);

			//right earings/antenna
			stroke(this.hue, 90, 50);
			fill(this.hue, 50, 90);
			strokeWeight(0);
			rect(positions.chin[14][0]+(40*scale), positions.chin[14][1], 1, 0.1,20, 20);
			noFill();
			strokeWeight(0.04);
			ellipse(positions.chin[14][0]+(55*scale), positions.chin[14][1], 0.12, 0.5);
			ellipse(positions.chin[14][0]+(75*scale), positions.chin[14][1], 0.08, 0.3);
		}
	
        // prepare some values that will be used to draw the head
        var chinValuesX = convertVerticeArrayToAxisArray(positions.chin, 0);
        var chinValuesY = convertVerticeArrayToAxisArray(positions.chin, 1);
        var smallestX = Array.lowest(chinValuesX);
        var biggestX = Array.highest(chinValuesX);
        var smallestY = Array.lowest(chinValuesY);
        var biggestY = Array.highest(chinValuesY);

		/**********************************************************/
		/*** THE HEAD - drawn a bit larger than the actual head ***/
		/**********************************************************/
        strokeWeight(0.02);
        stroke(this.hue, tone, 90);
        fill(this.hue, 90, tone);
        beginShape();
        vertex(positions.left_eyebrow[4][0]-(20*scale), positions.left_eyebrow[4][1]-(20*scale));
        vertex(positions.left_eyebrow[0][0]-(20*scale), positions.left_eyebrow[0][1]-(20*scale));
        for(var i=0; i<positions.chin.length;i++) {
            if(i < 8){
				//left side of the head
                vertex(positions.chin[i][0]-(20*scale), positions.chin[i][1]);
            }
            else if(i > 8){
				//right side of the head
                vertex(positions.chin[i][0]+(20*scale), positions.chin[i][1]);
            }
            else {
				//middle of the chin
                vertex(positions.chin[i][0], positions.chin[i][1]+(10*scale));
            }
        }
        vertex(positions.right_eyebrow[4][0]+(20*scale), positions.right_eyebrow[4][1]-(20*scale));
        vertex(positions.right_eyebrow[0][0]+(20*scale), positions.right_eyebrow[0][1]-(20*scale));
        endShape(CLOSE);


        /* the sorted lips array and following variables will be used to help draw the following facial features:
         *  1. beard/robot grill
         *  2. lips/outer mouth
         *  3. smile/audiowave
         */
		 
        //merge the lips arrays and then sort them on the x-axis
        var lips = positions.top_lip.concat(positions.bottom_lip);
        var sorted_lips = lips.map(
            function(array) {
                return [+array[0], array[1]];
            }
        ).sort(
            function(a, b) {
                return a[0]-b[0];
            }
        );

        //calculate the smallest and biggest y values in sorted_lips array
        var yValues = convertVerticeArrayToAxisArray(sorted_lips, 1);
        var smallestY = Array.lowest(yValues);
        var biggestY = Array.highest(yValues);
        //calculate the distance and midpoint between the above y values
        var yMidPoint = (biggestY + smallestY) / 2;
        var yDistance = biggestY - smallestY;


		/**********************************************************/
		/*** if the person has facial hair, draw a robot grill  ***/
		/**********************************************************/
        if(this.facialHair){

            noFill();
            stroke(this.hue, 30, 90);
            strokeWeight(0.02);
			var facialHairLength = map(this.facialHair, 0, 100, 40, 90);
			
            //grill mid point
            var midPoint = ((sorted_lips[4][0]+(20*scale)) + (sorted_lips[10][0]+(20*scale))) / 2;
            line(midPoint, biggestY+(facialHairLength*scale), midPoint, smallestY+(20*scale));
			
            //left side of grill
            var x = midPoint - 0.02;
            var limit = sorted_lips[0][0]-(20*scale);
            var y = biggestY+(facialHairLength*scale);
            var yDiff = biggestY+(facialHairLength*scale) - biggestY;
            var numOfPoints = (x - limit) / 0.04;
            yDiff = yDiff / numOfPoints;
            while(x > limit){
                line(x, y, x, smallestY+(20*scale));
                x = x - 0.04;
                y = y - yDiff;
            }
			
            //right side of grill
            var x = midPoint + 0.02;
            var yAdjuster = (1*scale);
            var limit = sorted_lips[23][0]+(20*scale);
            var y = biggestY+(facialHairLength*scale);
            var yDiff = biggestY+(facialHairLength*scale) - biggestY;
            var numOfPoints = (limit - x) / 0.04;
            yDiff = yDiff / numOfPoints;
            while(x < limit){
                line(x, y, x, smallestY+(20*scale));
                x = x + 0.04;
                y = y - yDiff;
            }
        }

        /*********************************/
		/*** outer shape of the mouth  ***/
		/*********************************/
        fill(this.hue, 90, reverseTone);
        stroke(this.hue+vibrancy, tone+vibrancy, 90);
        strokeWeight(0.05 + (vibrancy*2/1000));
        translate(0, 5 * scale);
        beginShape();
        vertex(sorted_lips[0][0]-(20*scale), sorted_lips[0][1]-(20*scale));
        vertex(sorted_lips[4][0]+(20*scale), smallestY-(20*scale));
        vertex(sorted_lips[10][0]+(20*scale), smallestY-(20*scale));
        vertex(sorted_lips[23][0]+(20*scale), sorted_lips[23][1]-(20*scale));
        vertex(sorted_lips[23][0]+(20*scale), sorted_lips[23][1]+(20*scale));
        vertex(sorted_lips[10][0]+(20*scale), biggestY+(20*scale));
        vertex(sorted_lips[4][0]+(20*scale), biggestY+(20*scale));
        vertex(sorted_lips[0][0]-(20*scale), sorted_lips[0][1]+(20*scale));
        endShape(CLOSE);
        translate(0, -5 * scale);

		//set up some variables that determine how big the smile will be
        var openLevel = map(this.mouthOpenLevel, 0, 100, 0.9, 0);
        smallestY = smallestY + (yDistance/2 * openLevel);
        biggestY = biggestY - (yDistance/2 * openLevel);
		
        /***********************************/
		/***      audio wave / smile     ***/
		/***********************************/
        strokeWeight(0.01);
        stroke(0,0, 100, 1);
        noFill();
        beginShape();
        for(var i=0; i<sorted_lips.length;i++) {
            var yValue = sorted_lips[i][1];
            if(yValue < yMidPoint){
                yValue = (yValue  + (yDistance/2 * openLevel));
                yValue = (yValue > yMidPoint) ? yMidPoint : yValue;
            }
            else {
                yValue = yValue  - (yDistance/2 * openLevel);
                yValue = (yValue < yMidPoint) ? yMidPoint : yValue;
            }
            if(i == (sorted_lips.length - 1)){
                curveVertex(sorted_lips[i][0],yValue);
            }
            else {
                curveVertex(sorted_lips[i][0],yValue);
                var x = sorted_lips[i][0] + 0.02;
                var limit = sorted_lips[i+1][0] - 0.02;
                while(x < limit){
                    var randomY = random(smallestY, biggestY);
                    curveVertex(x,randomY);
                    x = x + 0.02;
                }
            }
        }
        endShape();
        strokeWeight(0);

		//set up some variables that will be used to draw the eyes
        var xValuesLeft = convertVerticeArrayToAxisArray(positions.left_eye, 0);
        var yValuesLeft = convertVerticeArrayToAxisArray(positions.left_eye, 1);
        var xValuesRight = convertVerticeArrayToAxisArray(positions.right_eye, 0);
        var yValuesRight = convertVerticeArrayToAxisArray(positions.right_eye, 1);

        var smallestXLeft = Array.lowest(xValuesLeft);
        var smallestYLeft = Array.lowest(yValuesLeft);
        var biggestYLeft = Array.highest(yValuesLeft);

        var biggestXRight = Array.highest(xValuesRight);
        var smallestYRight = Array.lowest(yValuesRight);
        var biggestYRight = Array.highest(yValuesRight);

        //first conver the vertices arrays into single axis arrays
        var xValuesLeft = convertVerticeArrayToAxisArray(positions.left_eye, 0);
        var yValuesLeft = convertVerticeArrayToAxisArray(positions.left_eye, 1);
        var xValuesRight = convertVerticeArrayToAxisArray(positions.right_eye, 0);
        var yValuesRight = convertVerticeArrayToAxisArray(positions.right_eye, 1);
        //then get the values we need to draw the visor
        var smallestXLeft = Array.lowest(xValuesLeft);
        var smallestYLeft = Array.lowest(yValuesLeft);
        var biggestYLeft = Array.highest(yValuesLeft);
        var biggestXRight = Array.highest(xValuesRight);
        var smallestYRight = Array.lowest(yValuesRight);
        var biggestYRight = Array.highest(yValuesRight);
		
		translate(0, 20 * scale);
        fill(this.hue, tone, 90);
		
		/****************************/
		/***      outer visor     ***/
		/****************************/
        //outer visor
        beginShape();
        curveVertex(smallestXLeft-(20*scale), smallestYLeft-(20*scale));
        curveVertex(biggestXRight+(20*scale), smallestYRight-(20*scale));
        curveVertex(biggestXRight+(20*scale), biggestYRight+(20*scale));
        curveVertex(smallestXLeft-(20*scale), biggestYLeft+(20*scale));
        endShape(CLOSE);
		
		
        //how bright are the eyes?
        var brightness = map(this.eyeBrightness, 0, 100, 50, 0);
        fill(0, 0, brightness);
		
		/****************************/
		/***      inner visor     ***/
		/****************************/
        beginShape();
        curveVertex(smallestXLeft-(10*scale), smallestYLeft-(10*scale));
        curveVertex(biggestXRight+(10*scale), smallestYRight-(10*scale));
        curveVertex(biggestXRight+(10*scale), biggestYRight+(10*scale));
        curveVertex(smallestXLeft-(10*scale), biggestYLeft+(10*scale));
        endShape(CLOSE);
		
		/*********************/
		/***      EYES     ***/
		/*********************/
        fill(0, 0, 100 - brightness);
        //left eye
        beginShape();
        for(var i=0; i<positions.left_eye.length;i++) {
          curveVertex(positions.left_eye[i][0], positions.left_eye[i][1]);
        }
        endShape(CLOSE);
        //right eye
        beginShape();
        for(var i=0; i<positions.right_eye.length;i++) {
          curveVertex(positions.right_eye[i][0], positions.right_eye[i][1]);
        }
        endShape(CLOSE);
        //irises
        fill(this.hue, 90, tone);
        rect(eye1_pos[0], eye1_pos[1], 6 * scale, 6 * scale);
        rect(eye2_pos[0], eye2_pos[1], 6 * scale, 6 * scale);
        translate(0, -20 * scale);

		//face is now finished drawing
        strokeWeight(0.01);
    }

    /*
	 * randomize function - used to choose a different hue everytime the page is loaded or the mouse is clicked
     */
    this.randomize = function() {
        var randomPointer = floor(random(1, 10));
        this.hue = focusedRandom(this.robotHueRanges[randomPointer][0], this.robotHueRanges[randomPointer][1], 10, this.robotHueRanges[randomPointer][2]);
    }

    /*
    * JSON object consisting of six hue ranges
    * used to ensure each robot has a unique hue
    * the third element of each array is the midpoint of the range
    * which is used to set the mean value for the focusedRandom function
    */
    this.robotHueRanges = {
        1 : [-20, 20, 0],
        2 : [21, 60, 40],
        3 : [61, 100, 80],
        4 : [101, 140, 120],
        5 : [141, 180, 160],
        6 : [181, 220, 200],
        7 : [221, 260, 240],
        8 : [261, 300, 280],
        9 : [301, 340, 320]
    }

    /* set internal properties based on list numbers 0-100 */
    this.setProperties = function(settings) {
        this.eyebrowThickness = settings[0];
        this.mouthOpenLevel = settings[1];
        this.eyeBrightness = settings[2];
        this.hairLength = settings[3];
        this.skinTone = settings[4];
        this.hasEarings = settings[5];
        this.lipVibrancy = settings[6];
        this.facialHair = settings[7];
    }

    /* get internal properties as list of numbers 0-100 */
    this.getProperties = function() {
        properties = new Array();
        properties[0] = this.eyebrowThickness;
        properties[1] = this.mouthOpenLevel;
        properties[2] = this.eyeBrightness;
        properties[3] = this.hairLength;
        properties[4] = this.skinTone;
        properties[5] = this.hasEarings;
        properties[6] = this.lipVibrancy;
        properties[7] = this.facialHair;
        return properties;
    }
}

/**
 * converts an array of vertices into an array of values for a single axis (eg, x or y)
 * @param {Array} oldArray        - the multidimensional array of vertices to convert
 * @param {Number} index          - the index of the inner array containing the calues for the axis you want
 * @return {Array} newArray
 */
function convertVerticeArrayToAxisArray(oldArray, index){
  var newArray = [];
  for(var i=0; i<oldArray.length;i++) {
    newArray[i] = oldArray[i][index];
  }
  return newArray;
}

/**
 * finds the lowest value in an array of numbers
 * @param {Array} array        - an array of numbers
 */
Array.lowest = function( array ){
    return Math.min.apply( Math, array );
};

/**
 * finds the height value in an array of numbers
 * @param {Array} array        - an array of numbers
 */
Array.highest = function( array ){
    return Math.max.apply( Math, array );
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
