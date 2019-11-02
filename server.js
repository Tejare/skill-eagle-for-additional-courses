
$(function () {
    console.log("Jquery")
            $("#input").on("change", function () {
                var excelFile,
                    fileReader = new FileReader();
                    console.log("FIle Loaded");

                $("#result").hide();
        
                fileReader.onload = function (e) {
                    var buffer = new Uint8Array(fileReader.result);
                    console.log(buffer);
                    $.ig.excel.Workbook.load(buffer, function (workbook) {
                        console.log("HERE")
                        var column, row, newRow, cellValue, columnIndex, i,
                            worksheet = workbook.worksheets(0),
                            columnsNumber = 0,
                            gridColumns = [],
                            data = [],
                            worksheetRowsCount;
        
                        // Both the columns and rows in the worksheet are lazily created and because of this most of the time worksheet.columns().count() will return 0
                        // So to get the number of columns we read the values in the first row and count. When value is null we stop counting columns:
                        while (worksheet.rows(0).getCellValue(columnsNumber)) {
                            columnsNumber++;
                        }
        
                        // Iterating through cells in first row and use the cell text as key and header text for the grid columns
                        for (columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
                            column = worksheet.rows(0).getCellText(columnIndex);
                            gridColumns.push({ headerText: column, key: column });
                        }
        
                        // We start iterating from 1, because we already read the first row to build the gridColumns array above
                        // We use each cell value and add it to json array, which will be used as dataSource for the grid
                        for (i = 1, worksheetRowsCount = worksheet.rows().count() ; i < worksheetRowsCount; i++) {
                            newRow = {};
                            row = worksheet.rows(i);
        
                            for (columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
                                cellValue = row.getCellText(columnIndex);
                                newRow[gridColumns[columnIndex].key] = cellValue;
                            }
        
                            data.push(newRow);
                        }
        
                        // we can also skip passing the gridColumns use autoGenerateColumns = true, or modify the gridColumns array
                        createGrid(data, gridColumns);
                    }, function (error) {
                        $("#result").text("The excel file is corrupted.");
                        $("#result").show(1000);
                    });
                }
        
                if (this.files.length > 0) {
                    excelFile = this.files[0];
                    if (excelFile.type === "application/vnd.ms-excel" || excelFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || (excelFile.type === "" && (excelFile.name.endsWith("xls") || excelFile.name.endsWith("xlsx")))) {
                        fileReader.readAsArrayBuffer(excelFile);
                    } else {
                        $("#result").text("The format of the file you have selected is not supported. Please select a valid Excel file ('.xls, *.xlsx').");
                        $("#result").show(1000);
                    }
                }
        
            })
        });
        
        function createGrid(data, gridColumns) {
            if ($("#grid1").data("igGrid") !== undefined) {
                $("#grid1").igGrid("destroy");
            }
        
            $("#grid1").igGrid({
                columns: gridColumns,
                autoGenerateColumns: true,
                dataSource: data,
                width: "100%"
            });
            console.log(data);
            console.log(gridColumns);
        }
        function transpose(a) {
        return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) { return r[c]; });
        });
        }
        
        function check(){
           var grid = document.getElementById("grid1");
           var gfg = new Array(grid.rows.length); 
           //console.log(gfg.length);
            for(i=0;i<grid.rows.length;i++){
                var colno=grid.rows[i].cells.length;
                gfg[i]=new Array(colno);
                //console.log(gfg[i].length);
                for(j=0;j<colno;j++){
                    if(grid.rows[i].cells[j]){
                        gfg[i][j]=grid.rows[i].cells[j].innerText;
                        //console.log(gfg[i][j]);
                    }
                }    
        }
        var mat=transpose(gfg); 
        console.log(mat);
        var Select = document.getElementById("val");
        var val = Select.options[Select.selectedIndex].value;
        console.log(val);parseInt(x)
        if(val>0){
            for(k=0;k<10;k++){
                if(mat[val][k]=""){
                    if(k+1<10 && !mat[val][k+1])
                    document.getElementById("timing").innerHTML=mat[0][k+2];
                    break;
                }
            }
            if(k==10){	
                var x=document.getElementById("dur").value;
                var start=mat[0][k-1];
                console.log(start[2]);
                var time=parseInt(start[2])+parseInt(x);
                document.getElementById("timing").innerHTML="time is "+start[2]+".00"+-+time%12+".00";
            }
        }
        else{
            var x=document.getElementById("dur").value;
            var time=9+parseInt(x);
                console.log(x);
                document.getElementById("timing").innerHTML="time is "+"9.00"+-+time%12+".00";
        }       
        }
        
        
        function myFunction() {
        var x = document.getElementById("slot");
        if (x.style.display === "none") {
        x.style.display = "block";
        } else {
        x.style.display = "none";
        }
        }
        
        
        function show() {
        var x = document.getElementById("view");
        if (x.style.display === "none") {
        x.style.display = "block";
        } else {
        x.style.display = "none";
        }
        }