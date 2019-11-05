import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { UploadService } from '../upload.service';
import { async } from 'q';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  dataForm: FormGroup;
  selectedFile=null;
  csvContent: string;
  
  constructor(private http: HttpClient,
    private router: Router,
    private Upload:UploadService,
    private formBuilder:FormBuilder) { 
    this.dataForm = formBuilder.group({
      uploading:['',Validators.required],
    });
  }
 
  onCSVFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;     
    alert(this.csvContent);
      var lines = this.csvContent.split(/\r\n|\n/);
      var headers = lines[0].split(',');

      console.log(headers);
     for (var i = 1; i < lines.length-1; i++) {
         var obj = {};
         var currentline = lines[i].split(",");
         for (var j = 0; j < headers.length; j++) {
             obj[headers[j]] = currentline[j];
         }
        console.log(obj);
     } 
}

OnSubmit(data){
  const reader = new FileReader();
  function insert(data)
  { 
    reader.onload = function (e:any) {
    var d = e.target.result;
    console.log('d',d);
    d = new Uint8Array(d);
    var workbook = XLSX.read(d, {type: 'array'});
    console.log(workbook);
   
    workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1});
        console.log(roa[2][1]);
        for (var i = 1; i <= roa.length-1; i++) {
          console.log(roa[i]);
          data[i]=roa[i];
          console.log(data[i]);
       }
      });
    
      console.log(data);
      upload(data);
    }
    return data;
}

 const upload=async add=>{
  console.log(this.router.url);
  if(this.router.url == '/teacher'){
    console.log('a');
    this.Upload.PostTeacherDataFile(add);
  }
  else{
    console.log('b');
    this.Upload.PostStudentDataFile(add);
  }
    console.log('I will not wait until promise is resolved..');
  }
 
  reader.readAsArrayBuffer(this.selectedFile);
  const Merge = async () => {
    const a = await insert(data);
   };
  Merge().then(console.log);
}

onFileSelected(event,data){
  var multiple = event.target.files;
    for (var i = 0; i < multiple.length; i++) {
      this.selectedFile=<File>event.target.files[i];
      console.log(this.selectedFile);
      this.OnSubmit(data);
    }
}
 
ngOnInit() {}

}
