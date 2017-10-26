/*
 * name: Henry Liang
 * github: HenryLeungVuw
 * release form confirmed by Tom White 26 Oct 2017
 */

/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// other variables can be in here too
// these control the colors used
bg_color = [100, 100, 100];
fg_color = [255, 255, 255];
stroke_color = [95, 52, 8];

function FaceMap() {
	/*
	 * Draw a face with position lists that include:
	 *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
	 *    bottom_lip, top_lip, nose_tip, nose_bridge, 
	 */
	this.draw = function (positions) {
			var nose_pos = average_point(positions.nose_bridge);
			var eye1_pos = average_point(positions.left_eye);
			var eye2_pos = average_point(positions.right_eye);
			var half_height = positions.chin[7][1] - nose_pos[1];
			var face_width = positions.chin[positions.chin.length - 1][0] - positions.chin[0][0];

			var x = nose_pos[0];
			var y = nose_pos[1];
			var w = 2 * face_width;
			var h = 2.5 * half_height;

			var curEyeSize = map(this.eyeSize, 0, 100, 10, 30);
			var curFaceGap = map(this.faceGap, 0, 100, 20, 8);
			var curNoseSize = map(this.noseSize, 0, 100, 30, 70);
			var curLipColor = map(this.lipColor, 0, 100, 0, 255);
			var curHairColor = map(this.hairColor, 0, 100, 0, 100);
			var curHair = map(this.hair, 0, 100, 0, 90);

			var extent = 0;
			h < w ? extent = h / 2 : extent = w / 2;
			var scale = extent / 220.0;

			// Uncomment to see drawing area
			// fill(255);
			// stroke(0);
			// rect(x-w/2, y-h/2, w, h);
			// fill(0)
			// ellipse(x, y, w, h);

			angleMode(DEGREES);

			// head
			stroke(fg_color);
			noFill();
			var box = bounding_box(positions);
			strokeWeight(box[3] / curFaceGap);
			strokeCap(PROJECT);
			var centreX = positions.nose_bridge[0][0];
			for (var i = 0; i * box[2] / 8 < box[2]; i++) {
				line(positions.chin[i][0], positions.chin[i][1], positions.chin[positions.chin.length - 1 - i][0], positions.chin[positions.chin.length - 1 - i][1]);
			}
			var topPosL = min_point(positions.left_eyebrow);
			var topPosR = max_point(positions.right_eyebrow);

			var hasHair = 50;
			curHair < 10 ? hasHair = false : hasHair = true;

			if (hasHair) {
				colorMode(HSB);
				noStroke();
				fill(43, 87, curHairColor);
				for (var x = topPosL[0] + box[2] / 10; x < topPosR[0] - box[2] / 10; x += box[2] / 10) {
					ellipse(x, topPosL[1] - box[2] / 8, curHair * scale, curHair * scale);
				}
				for (var x = topPosL[0] + box[2] / 5; x < topPosR[0] - box[2] / 5; x += box[2] / 5)
					ellipse(x, topPosR[1] - box[2] / 4, curHair * scale, curHair * scale);
				colorMode(RGB);
				noFill();
				stroke(fg_color);
			} else {
				line(topPosL[0] + box[2] / 5, topPosL[1] - box[2] / 5, topPosR[0] - box[2] / 5, topPosR[1] - box[2] / 5);
				line(topPosL[0] + box[2] / 10, topPosL[1] - box[2] / 10, topPosR[0] - box[2] / 10, topPosR[1] - box[2] / 10);
			}

			line(topPosL[0], topPosL[1], topPosR[0], topPosR[1]);
			line((topPosL[0] + positions.chin[0][0]) / 2, (topPosL[1] + positions.chin[0][1]) / 2, (topPosR[0] + positions.chin[positions.chin.length - 1][0]) / 2, (topPosR[1] + positions.chin[positions.chin.length - 1][1]) / 2);

			strokeWeight(1);


			// mouth
			noStroke();
			fill(curLipColor, 0, 0);
			beginShape();
			for (var i = 0; i < positions.top_lip.length; i++) {
				vertex(positions.top_lip[i][0], positions.top_lip[i][1]);
			}
			endShape(CLOSE);
			beginShape();
			for (var i = 0; i < positions.bottom_lip.length; i++) {
				vertex(positions.bottom_lip[i][0], positions.bottom_lip[i][1]);
			}
			endShape(CLOSE);

			// nose
			fill(255, 30, 10);
			var nosePosBridge = average_point(positions.nose_bridge);
			var nosePosTip = average_point(positions.nose_tip);
			var nosePos = [(nosePosBridge[0] + nosePosTip[0]) / 2, (nosePosBridge[1] + nosePosTip[1]) / 2]

			ellipse(nosePos[0], nosePos[1], curNoseSize * scale, curNoseSize * scale);
			fill(255, 240, 230);
			ellipse(nosePos[0], nosePos[1] + curNoseSize * scale / 4, curNoseSize * scale / 2, curNoseSize * scale / 5);

			// eyes
			var maxHeightL = 0;
			var minHeightL = positions.left_eye[0][1];
			for (var i = 0; i < positions.left_eye.length; i++) {
				if (positions.left_eye[i][1] > maxHeightL) maxHeightL = positions.left_eye[i][1];
				if (positions.left_eye[i][1] < minHeightL) minHeightL = positions.left_eye[i][1];
			}
			var maxHeightR = 0;
			var minHeightR = positions.right_eye[0][1];
			for (var i = 0; i < positions.right_eye.length; i++) {
				if (positions.right_eye[i][1] > maxHeightR) maxHeightR = positions.right_eye[i][1];
				if (positions.right_eye[i][1] < minHeightR) minHeightR = positions.right_eye[i][1];
			}

			if (scale > .5) scale = .1 //fix bug for image 0

			fill(0);
			ellipse(eye1_pos[0], eye1_pos[1], (maxHeightL - minHeightL) * curEyeSize * scale, (maxHeightL - minHeightL) * curEyeSize * scale);

			ellipse(eye2_pos[0], eye2_pos[1], (maxHeightR - minHeightR) * curEyeSize * scale, (maxHeightR - minHeightR) * curEyeSize * scale);

			fill(fg_color);
			ellipse(eye1_pos[0], eye1_pos[1], (maxHeightL - minHeightL) * curEyeSize * scale / 4, (maxHeightL - minHeightL) * curEyeSize * scale / 4);

			ellipse(eye2_pos[0], eye2_pos[1], (maxHeightR - minHeightR) * curEyeSize * scale / 4, (maxHeightR - minHeightR) * curEyeSize * scale / 4);

			colorMode(HSB);
			fill(43, 87, curHairColor);
			beginShape();
			for (var i = 0; i < positions.right_eyebrow.length; i++) {
				vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]);
			}
			endShape(CLOSE);

			beginShape();
			for (var i = 0; i < positions.left_eyebrow.length; i++) {
				vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]);
			}
			endShape(CLOSE);
			colorMode(RGB);
		}
		/* set internal properties based on list numbers 0-100 */
	this.setProperties = function (settings) {
		this.eyeSize = settings[0];
		this.faceGap = settings[1];
		this.noseSize = settings[2];
		this.lipColor = settings[3];
		this.hairColor = settings[4];
		this.hair = settings[5];
	}

	/* get internal properties as list of numbers 0-100 */
	this.getProperties = function () {
		properties = new Array(6);
		properties[0] = this.eyeSize;
		properties[1] = this.faceGap;
		properties[2] = this.noseSize;
		properties[3] = this.lipColor;
		properties[4] = this.hairColor;
		properties[5] = this.hair;

		return properties;
	}
}

// given a point, return the averageW
function average_point(list) {
	var sum_x = 0;
	var sum_y = 0;
	var num_points = 0;
	for (var i = 0; i < list.length; i++) {
		sum_x += list[i][0];
		sum_y += list[i][1];
		num_points += 1;
	}
	return [sum_x / num_points, sum_y / num_points];
}

function max_point(list) {
	var maxX = list[0][0];
	var maxY = list[0][1];
	for (var i = 0; i < list.length; i++) {
		if (list[i][0] > maxX) maxX = list[i][0];
		if (list[i][1] < maxY) maxY = list[i][1];
	}
	return [maxX, maxY];
}

function min_point(list) {
	var minX = list[0][0];
	var minY = list[0][1];
	for (var i = 0; i < list.length; i++) {
		if (list[i][0] < minX) minX = list[i][0];
		if (list[i][1] < minY) minY = list[i][1];
	}
	return [minX, minY];
}

function bounding_box(positions) {
	var xmin = null,
		xmax = null,
		ymin = null,
		ymax = null;
	for (var key in positions) {
		var part = positions[key];
		for (var i = 0; i < part.length; i++) {
			if (xmin == null || xmin < part[i][0]) {
				xmin = part[i][0];
			}
			if (ymin == null || ymin < part[i][1]) {
				ymin = part[i][1];
			}
			if (xmax == null || xmax > part[i][0]) {
				xmax = part[i][0];
			}
			if (ymax == null || ymax > part[i][1]) {
				ymax = part[i][1];
			}
		}
	}

	// return [x1, y1, x2, y2];
	return [xmax, ymax, xmin - xmax, ymin - ymax];
}
