/* if (window.attachEvent) {
    window.attachEvent('onload', initialize());
} else {
    if (window.addEventListener) { 
        window.addEventListener('load', initialize(), false);
    } else {
        document.addEventListener('load', initialize(), false);
    }
} */
    
// Using jQuery
$(document).ready(initialize);

// Defaults
var canvasID = 'panelCanvas';
var buttonID = 'faqButton';
var arcSize = 12; // Panel corner size
var offsetLeft = 30; // Pushes the panel to the left
var offsetTop = 30; // Pushes the panel down
var shadowPaddingX = 3; // X offset for border shadow
var shadowPaddingY = 2; // Y offset for border shadow
var borderColor = 'rgba(56,56,57,1)';
var fillColor = 'rgba(25,25,27,.7)';

function initialize() {
    panel_Left(canvasID, buttonID, arcSize, offsetLeft, offsetTop, shadowPaddingX, shadowPaddingY, borderColor, fillColor);
}

function panel_Left(canvasID, buttonID, arcSize, offsetLeft, offsetTop, shadowPaddingX, shadowPaddingY, borderColor, fillColor) {
    if ($('#'+canvasID)) {
        canvas = $('#'+canvasID);
    } else { alert('Error: element with ID \''+canvasID+'\' not found'); }
    if ($('#'+buttonID)) {
        var button = $('#'+buttonID);
    } else { alert('Error: element with ID \''+buttonID+'\' not found'); }
    var ctx = canvas[0].getContext('2d');
        
    /* read CSS layout values */
    var width = parseInt(canvas.css('width'), 10);
    var height = parseInt(canvas.css('height'), 10);
    var buttonWidth = parseInt(button.css('width'), 10);
    var buttonHeight = parseInt(button.css('height'), 10);
    var buttonRadius = 4;
    
    /* re-position to accomidate for offset */
    var newTop = parseInt(canvas.css('top')-2, 10)-arcSize*2-offsetTop+1+'px';
    var newLeft = parseInt(canvas.css('left')-2, 10)+buttonWidth-width+shadowPaddingX+2+'px';
        top: newTop,
    $('#panel').css({
        left: newLeft
    });
    canvas.css({
        top: newTop,
        left: newLeft
    });
    
    // draw points
    var pos1X=pos14X=width-buttonWidth;
    var pos1Y=pos18Y=((height>offsetTop)&&(offsetTop>0))?offsetTop:(offsetTop>height)?height-buttonHeight-shadowPaddingY:0;
    var pos1Y=pos18Y+=arcSize*2;
    var pos2X=pos13X=(offsetLeft>0)?pos1X-offsetLeft:pos1X;
    var pos2Y=pos1Y;
    var pos3X=pos4X=pos11X=pos12X=pos2X-arcSize;
    var pos3Y=pos2Y-arcSize;
    var pos4Y=pos7Y=arcSize;
    var pos5X=pos10X=pos4X-arcSize;
    var pos5Y=pos6Y=pos4Y-arcSize;
    var pos6X=pos9X=arcSize;
    var pos7X=pos8X=0;
    var pos8Y=pos11Y=height-arcSize-shadowPaddingY;
    var pos9Y=pos10Y=height-shadowPaddingY-1;
    var pos12Y=pos1Y+buttonHeight+arcSize;
    var pos13Y=pos14Y=pos15Y=pos1Y+buttonHeight+shadowPaddingY;
    var pos15X=pos18X=width-shadowPaddingX-buttonRadius;
    var pos16X=pos17X=width-shadowPaddingX;
    var pos16Y=pos15Y-buttonRadius;
    var pos17Y=pos1Y+buttonRadius;    
        
    /* draw */
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pos1X,pos1Y);
    ctx.lineTo(pos2X,pos2Y); 
    ctx.quadraticCurveTo(pos3X,pos2Y,pos3X,pos3Y);
    ctx.lineTo(pos4X,pos4Y);
    ctx.quadraticCurveTo(pos4X,pos5Y,pos5X,pos5Y);
    ctx.lineTo(pos6X,pos6Y);
    ctx.quadraticCurveTo(pos7X,pos6Y,pos7X,pos7Y);        
    ctx.lineTo(pos8X,pos8Y);
    ctx.quadraticCurveTo(pos8X,pos9Y,pos9X,pos9Y);
    ctx.lineTo(pos10X,pos10Y);
    ctx.quadraticCurveTo(pos11X,pos10Y,pos11X,pos11Y);
    ctx.lineTo(pos12X,pos12Y);
    ctx.quadraticCurveTo(pos12X,pos13Y,pos13X,pos13Y);
    ctx.lineTo(pos15X,pos15Y);
    ctx.quadraticCurveTo(pos16X,pos15Y,pos16X,pos16Y);
    ctx.lineTo(pos17X,pos17Y);
    ctx.quadraticCurveTo(pos17X,pos18Y,pos18X,pos18Y); 
    
    /* troubleshooting data
    console.log(pos1X,pos1Y,pos2X,pos2Y,pos3X,pos3Y,pos4X,pos4Y,pos5X,pos5Y,pos6X,pos6Y,pos7X,pos7Y,pos8X,pos8Y,pos9X,pos9Y);    console.log(pos10X,pos10Y,pos11X,pos11Y,pos12X,pos12Y,pos13X,pos13Y,pos14X,pos14Y,pos15X,pos15Y,pos16X,pos16Y);
    */
    
    ctx.closePath();
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = shadowPaddingX;
    ctx.shadowOffsetY = shadowPaddingY;
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.stroke();
}