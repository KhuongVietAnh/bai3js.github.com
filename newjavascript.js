window.onload = eventWindowLoaded;

function eventWindowLoaded() {
    /*
     * Create value of colum 
     */
    function createValueCol() {
        this.nameCol = "";
        this.levelCol = "";
        this.setInfo = function (nameCol, levelCol) {
            this.nameCol = nameCol;
            this.levelCol = levelCol;
        };
        return this;
    }
    ;
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    //Height Text left
    var heightLeft;
    //data of chart
    var datas = data;
    //array
    var col = [];
    //max value colums
    var maxLevelCol;
    //max Level of chart
    var maxLevelChart = level;
    //Height total of chart
    var totalHeightChart;
    drawChart();
    /*
     * Call funtion to draw chart
     */
    function drawChart() {
        setValueCol();
        maxLevelCol = isMaxLevel();
        drawLevel();
        drawRow();
        drawCol();
        drawTitle();
        drawColName();
        drawText();

    }
    //Set value colums
    function setValueCol() {
        var i = 0;
        for (var item in datas) {
            col[i] = new createValueCol();
            col[i].setInfo(item, datas[item]);
            i++;
        }
    }
    ;
    // Find max value of colums
    function isMaxLevel() {
        var max = 0;
        for (var i = 0; i < col.length; i++) {
            var a = col[i].levelCol;
            if (a > max)
                max = a;
        }
        return max;
    }
    ;
    //Draw level 0 1 2 3 4...
    function drawLevel() {
        var heightCV = height;
        for (var i = 0; i <= maxLevelChart; i++) {
            ctx.beginPath();
            ctx.font = fontOther;
            ctx.fillText(i, widthLevel, heightCV + 5);
            heightCV = heightCV - heightCol;
        }
        ctx.restore();
    }
    ; 
    // Draw rows
    function drawRow() {
        var heightRows = height;
        for (var i = 0; i <= maxLevelChart; i++) {
            ctx.beginPath();
            if (i === 0)
            {
                ctx.strokeStyle = 'black';
            } else {
                ctx.strokeStyle = 'gray';
            }
            ctx.moveTo(widthRow, heightRows);
            ctx.lineTo(widthRow + 600, heightRows);
            ctx.stroke();
            heightRows = heightRows - heightCol;
        }
        heightLeft = heightRows;
        ctx.restore();
    }
    ;
    // Draw colums
    function drawCol() {
        totalHeightChart = (heightCol * maxLevelChart);
        var width = widthRow;
        ctx.fillStyle = 'blue';
        ctx.save();
        for (var i = 0; i < col.length; i++) {
            var valueCol = (totalHeightChart * col[i].levelCol) / maxLevelCol;
            ctx.fillRect(width, height - valueCol, widthCol, valueCol);
            width = width + 120;
        }
        ctx.restore();
    }
    // Draw Title
    function drawTitle() {
        ctx.beginPath();
        ctx.font = fontTitle;
        ctx.fillStyle = 'black';
        ctx.fillText(title, widthTitle, heightTitle);
        ctx.save();
        ctx.restore();
        ctx.beginPath();
        ctx.font = fontOther;
        ctx.fillStyle = 'gray';
        ctx.fillText(name, 400, height + 100);
        ctx.restore();
    }
    // Draw name colums
    function drawColName() {
        var width = widthRow;
        for (var i = 0; i < col.length; i++)
        {
            ctx.beginPath();
            ctx.font = fontOther;
            ctx.fillText(col[i].nameCol, width + 25, height + 40);
            width = width + 120;
        }
        ctx.restore();
    }
    ;
    //draw texct left right of chart
    function drawText() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(790, heightLeft + heightCol, widthCol, 30);
        ctx.font = fontOther;
        ctx.fillStyle = 'black';
        ctx.fillText("LEVEL", 790, 290);
        ctx.fillText("OF", 790, 335);
        ctx.fillText("POSITION", 790, 375);
        ctx.beginPath();
        ctx.translate(0, 520);
        ctx.font = fontOther;
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = 'gray';
        ctx.fillText(tileOther, 10, 30);
        ctx.restore();
    }
}




