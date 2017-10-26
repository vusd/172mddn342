/*
 * name: Michael Kelly
 * github: Michael-Kelly-Digital-Design
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

function FaceMap() {
    this.hairColor = 50;
    this.wrinkleWeight = 50;
    this.skinColor = 50;

    this.draw = function(positions) {
        var base_tone1 = color("#ffcfaf"); //light color
        var base_tone2 = color("#a56e48"); //dark color
        var blush_base = color("#701702");
        var nose_pos = average_point(positions.nose_bridge);
        var eye1_pos = average_point(positions.left_eye);
        var eye2_pos = average_point(positions.right_eye);
        var half_height = positions.chin[7][1] - nose_pos[1];
        var face_width = positions.chin[positions.chin.length - 1][0] - positions.chin[0][0];

        //mine
        var chin_R = positions.chin[positions.chin.length - 1];
        var chin_L = positions.chin[0];
        var chin_center = positions.chin[8];
        var eyecorner_L = positions.left_eye[0];
        var eyecorner_R = positions.right_eye[3];

        var x = nose_pos[0];
        var y = nose_pos[1];
        var w = 2 * face_width;
        var h = 2.5 * half_height;

       // var curHairLength = map(this.hairLength, 0, 100, 0, 3);
        var curHairColor = map(this.hairColor, 0, 120, 255, 20);
        var curWrinkleWeight = map(this.wrinkleWeight, 0, 100, 0.0001, 0.065);
        var curSpots = map(this.spots, 0, 100, 0, 1);
        var curSkincolor = map(this.skinColor, 0, 100, 0, 1);

        var skin_tone = lerpColor(base_tone1,base_tone2,curSkincolor);
        var blush_color = lerpColor(blush_base,skin_tone,0.55); 
        var extent = 0;
        if (h < w) {
            extent = h / 2;
        } else {
            extent = w / 2;
        }
        var scale = extent / 220.0;

        var eyeShift = 0.35;
        for (var i = positions.left_eye.length - 1; i >= 0; i--) {
            positions.left_eye[i][1]+=eyeShift;
            positions.right_eye[i][1]+=eyeShift;
        }
        eye1_pos = average_point(positions.left_eye);
        eye2_pos = average_point(positions.right_eye);
        var eye3_pos = average_point([eye1_pos,eye2_pos]);



        //head
        var foreheadCenter = average_point([chin_L, chin_R]);
        var face_height = distanceBetween(foreheadCenter, chin_center);

        push();
        noFill();
        stroke(blush_color);
        fill(skin_tone);
        strokeWeight(0.07);

        //head outline
        beginShape();
        curveVertex(-1.5, -2);

        curveVertex(chin_L[0], chin_L[1]);
        curveVertex(positions.chin[2][0], positions.chin[2][1]);
        curveVertex(positions.chin[4][0], positions.chin[4][1]);
        curveVertex(positions.chin[6][0], positions.chin[6][1]);
        curveVertex(chin_center[0], chin_center[1]);
        curveVertex(positions.chin[10][0], positions.chin[10][1]);
        curveVertex(positions.chin[12][0], positions.chin[12][1]);
        curveVertex(positions.chin[14][0], positions.chin[14][1]);
        curveVertex(chin_R[0], chin_R[1]);
        //forehead
        curveVertex(chin_R[0] - 0.5, chin_R[1] - face_height * 0.45);
        curveVertex(foreheadCenter[0], foreheadCenter[1] - face_height * 0.65);
        curveVertex(chin_L[0] + 0.5, chin_L[1] - face_height * 0.45);
        //close
        curveVertex(chin_L[0], chin_L[1]);
        curveVertex(positions.chin[1][0], positions.chin[1][1]);
        endShape();
        pop();

        //wrinkels
        var wrink_width = face_width*0.2;
        var wrink_stroke = curWrinkleWeight;

        if (wrink_stroke > 0.0001) {

            push();
            translate(eye3_pos[0],face_height*-0.65);
            rotate(angleBetween(eye1_pos,eye2_pos));
            noFill();
            stroke(blush_color);
            strokeWeight(wrink_stroke);
            line(-wrink_width,0,wrink_width , 0);

            strokeWeight(wrink_stroke);            
            beginShape();
            curveVertex( - 1, + 0.3 + wrink_stroke);
            curveVertex( - wrink_width * 0.8, 0.11 );
            curveVertex( + wrink_width * 0.8, 0.11 );
            curveVertex( + 1, + 0.3 + wrink_stroke);
            endShape();

            beginShape();
            curveVertex( - 1, - 0.3 - wrink_stroke);
            curveVertex( - wrink_width * 0.8, -0.11 );
            curveVertex( + wrink_width * 0.8, -0.11);
            curveVertex( + 1, - 0.3 - wrink_stroke);
            endShape();
            pop();
        }

        //brows 
        var brow_outer_l = positions.left_eyebrow[0];
        var brow_inner_l = positions.left_eyebrow[4];
        var brow_upper_l = positions.left_eyebrow[2];
        var brow_outer_r = positions.right_eyebrow[4]
        var brow_inner_r = positions.right_eyebrow[0];
        var brow_upper_r = positions.right_eyebrow[2];

        var brow_height_left = (distanceBetween(brow_outer_l, brow_upper_l) + distanceBetween(brow_inner_l, brow_upper_l)) / 4;
        var brow_height_right = (distanceBetween(brow_outer_r, brow_upper_r) + distanceBetween(brow_inner_r, brow_upper_r)) / 4;
        var brow_width_right = distanceBetween(brow_outer_r, brow_inner_r) * 0.7;
        var brow_width_left = distanceBetween(brow_outer_l, brow_inner_l) * 0.7;
        console.log(curHairColor);
        var brow_color = curHairColor;
        var brow_outline = curHairColor*0.95;
        push();
        fill(brow_color);
        stroke(brow_outline);
        //left brow
        translate(brow_upper_l[0], brow_upper_l[1]);
        rotate(angleBetween(brow_inner_l, brow_outer_l));
        ellipse(0, brow_height_left / 4 - eyeShift, brow_width_left, brow_height_left);
        pop();

        push();
        //right brow
        fill(brow_color);
        stroke(brow_outline);
        translate(brow_upper_r[0], brow_upper_r[1]);
        rotate(angleBetween(brow_outer_r, brow_inner_r));
        ellipse(0, brow_height_right / 4 - eyeShift, brow_width_right, brow_height_left);
        pop();


        //eyes
        //eyes are drawn always closed, with glasses

        var blink_weight_L = Math.abs(average_point([positions.left_eye[1], positions.left_eye[2]])[1] - average_point([positions.left_eye[4], positions.left_eye[5]])[1]) / 3;
        var blink_weight_R = Math.abs(average_point([positions.right_eye[1], positions.right_eye[2]])[1] - average_point([positions.right_eye[4], positions.right_eye[5]])[1]) / 3;

        push();
        stroke(blush_color);
        noFill();
        strokeWeight(blink_weight_L);

        beginShape(); //left eye
        curveVertex(positions.left_eye[5][0], positions.left_eye[4][1]);
        curveVertex(positions.left_eye[0][0], positions.left_eye[0][1]);
        curveVertex(positions.left_eye[1][0], positions.left_eye[1][1]);
        curveVertex(positions.left_eye[2][0], positions.left_eye[2][1]);
        curveVertex(positions.left_eye[3][0], positions.left_eye[3][1]);
        curveVertex(positions.left_eye[4][0], positions.left_eye[4][1]);
        endShape();

        strokeWeight(blink_weight_R);

        beginShape(); //right eye
        curveVertex(positions.right_eye[5][0], positions.right_eye[4][1]);
        curveVertex(positions.right_eye[0][0], positions.right_eye[0][1]);
        curveVertex(positions.right_eye[1][0], positions.right_eye[1][1]);
        curveVertex(positions.right_eye[2][0], positions.right_eye[2][1]);
        curveVertex(positions.right_eye[3][0], positions.right_eye[3][1]);
        curveVertex(positions.right_eye[4][0], positions.right_eye[4][1]);
        endShape();
        pop();

        // lens size calculated from average distance between each outer point in positions.eye(l/r) and "eye_pos" center
        var l_lens_size;
        var r_lens_size;
        var frame_color = '#494c56';
        var lens_color = color(255, 90);
        for (var i = 0; i < positions.left_eye.length; i++) {
            l_lens_size = distanceBetween(positions.left_eye[i], eye1_pos);
            r_lens_size = distanceBetween(positions.right_eye[i], eye2_pos);
        }

        l_lens_size /= positions.left_eye.length;
        r_lens_size /= positions.right_eye.length;
        l_lens_size = 0.4 + l_lens_size * 30;
        r_lens_size = 0.4 + r_lens_size * 30;

        push();
        fill(lens_color);
        strokeWeight(0.095);
        stroke(frame_color);
        //lenses
        ellipse(eye1_pos[0], eye1_pos[1], l_lens_size, l_lens_size);
        ellipse(eye2_pos[0], eye2_pos[1], r_lens_size, r_lens_size);

        //glasses legs (called 'temples')
        var temple_connect_angle = -TWO_PI / 32;
        var temple_connect_l = rim_vert(eye1_pos, l_lens_size / 2, PI - temple_connect_angle);
        var temple_connect_r = rim_vert(eye2_pos, r_lens_size / 2, temple_connect_angle);

        noFill();
        var bridge_control_offset = distanceBetween(eye1_pos, eye2_pos) - (l_lens_size / 2) - (r_lens_size / 2);

        beginShape();
        curveVertex(positions.nose_bridge[3][0] * -0.30, (positions.nose_bridge[3][1] + bridge_control_offset) / 2);
        curveVertex(eye1_pos[0] + (l_lens_size / 2), eye1_pos[1]);
        curveVertex(eye2_pos[0] - (r_lens_size / 2), eye2_pos[1]);
        curveVertex(positions.nose_bridge[3][0] * -0.30, (positions.nose_bridge[3][1] + bridge_control_offset) / 2);
        endShape();

        if (temple_connect_l[0] > chin_L[0]) {
            line(chin_L[0], chin_L[1], temple_connect_l[0], temple_connect_l[1]);
        }
        if (temple_connect_r[0] < chin_R[0]) {
            line(chin_R[0], chin_R[1], temple_connect_r[0], temple_connect_r[1]);
        }

        pop();
        //mouth

        // for positions.top_lip & positions.bottom_lip: inside = 8,9,10 | outside = 2,3,4 | end = 11
        // top_lip[0] is in left mouth corner
        // bottom_lip[0] is in right mouth corner
        // bottom[0] + top[6] || bottom[6] + top[0] will always intersect

        var top_lip_outside = [positions.top_lip[2], positions.top_lip[3], positions.top_lip[4]];
        var bottom_lip_outside = [positions.bottom_lip[2], positions.bottom_lip[3], positions.bottom_lip[4]];
        var mouthCorner_LT = positions.top_lip[0]; // Left/Top
        var mouthCorner_RB = positions.bottom_lip[0]; // Right/Bottom
        var top_lip_inside = [positions.top_lip[8], positions.top_lip[9], positions.top_lip[10]];
        var bottom_lip_inside = [positions.bottom_lip[8], positions.bottom_lip[9], positions.bottom_lip[10]];

        //  var mouth_angle = angleBetween(positions.bottom_lip[0], positions.top_lip[0]);
        var mouth_width = distanceBetween(positions.bottom_lip[0], positions.top_lip[0]);

        var smile;
        var lip_thickness = 0;
        var mouth_open = 0;
        var innverAv = [];

        for (var i = 2; i > 0; i--) {

            mouth_open += distanceBetween(top_lip_inside[i], bottom_lip_inside[i]);
            lip_thickness += distanceBetween(top_lip_inside[i], top_lip_outside[i]);
            lip_thickness += distanceBetween(bottom_lip_inside[i], bottom_lip_outside[i]);
            innverAv.push(top_lip_inside[i]);
            innverAv.push(bottom_lip_inside[i]);
        }

        innverAv = average_point(innverAv);
        cornerAv = average_point([mouthCorner_LT, mouthCorner_RB]);
        mouth_open /= 3;
        lip_thickness /= 6;
        smile = cornerAv[1] - innverAv[1];

        push();

        strokeWeight(lip_thickness * 0.75);
        stroke(blush_color);
        noFill();
        beginShape();
        curveVertex(mouthCorner_LT[0] - smile, mouthCorner_LT[1] + smile * 2);
        curveVertex(mouthCorner_LT[0] + mouth_width * 0.15, mouthCorner_LT[1] - smile);
        curveVertex(mouthCorner_RB[0] - mouth_width * 0.15, mouthCorner_RB[1] - smile);
        curveVertex(mouthCorner_RB[0] - smile, mouthCorner_RB[1] + smile * 2);
        endShape();
        pop();



        fill('red');
        stroke('red');
        //  debugShowPoints(positions.left_eye);
        //debugShowPoints(hair_L);


        function toms_face() {

            // head
            stroke(stroke_color);
            fill(fg_color);
            beginShape();
            for (var i = 0; i < positions.chin.length; i++) {
                vertex(positions.chin[i][0], positions.chin[i][1]);
            }
            for (var i = positions.right_eyebrow.length - 1; i >= 0; i--) {
                vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]);
            }
            for (var i = positions.left_eyebrow.length - 1; i >= 0; i--) {
                vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]);
            }
            endShape(CLOSE);

            // mouth
            noStroke();
            fill(bg_color);
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
            beginShape();
            vertex(positions.nose_bridge[0][0], positions.nose_bridge[0][1]);
            for (var i = 0; i < positions.nose_tip.length; i++) {
                vertex(positions.nose_tip[i][0], positions.nose_tip[i][1]);
            }
            endShape(CLOSE);

            // eyes
            beginShape();
            for (var i = 0; i < positions.left_eye.length; i++) {
                vertex(positions.left_eye[i][0], positions.left_eye[i][1]);
            }
            endShape(CLOSE);
            beginShape();
            for (var i = 0; i < positions.right_eye.length; i++) {
                vertex(positions.right_eye[i][0], positions.right_eye[i][1]);
            }
            endShape(CLOSE);

            fill(fg_color);
            ellipse(eye1_pos[0], eye1_pos[1], 16 * scale, 16 * scale);
            ellipse(eye2_pos[0], eye2_pos[1], 16 * scale, 16 * scale);

            fill(stroke_color);
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
            strokeWeight(1);
        }
    }

    /* set internal properties based on list numbers 0-100 */
    this.setProperties = function(settings) {
        this.hairColor = settings[0];
        this.wrinkleWeight = settings[1];
        this.skinColor = settings[2];
    }

    /* get internal properties as list of numbers 0-100 */
    this.getProperties = function() {
        properties = new Array(3);
        properties[0] = this.hairColor;
        properties[1] = this.wrinkleWeight;
        properties[2] = this.skinColor;
        return properties;
    }
}

// given a point, return the average
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

function rim_vert(vert, rad, angl) { //find the co-oridnates for a point on a circle
    var x = Math.cos(angl) * rad;
    var y = Math.sin(angl) * rad;

    return [x + vert[0], y + vert[1]];
}

function angleBetween(p1, p2) {
    //angle given with reference to horizon line 
    var c;
    c = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180 / Math.PI;
    return c;
}

function distanceBetween(p1, p2) {
    var a = p1[0] - p2[0];
    var b = p1[1] - p2[1];
    var c = Math.abs(Math.sqrt(a * a + b * b));
    return c;
}

function debugShowPoints(arr, txtsiz) {
    push();
    textSize(0.25);
    if (txtsiz) {
        textSize(txtsiz);
    }
    noStroke();
    for (var i = arr.length - 1; i >= 0; i--) {
        text(i, arr[i][0], arr[i][1]);
    }

    pop();
}