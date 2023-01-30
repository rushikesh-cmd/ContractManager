import { ApiService } from './../../../services/api.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog'



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
contractForm !: FormGroup;
actionBtn : string = "Save"

constructor(private formBuilder : FormBuilder,
  private api : ApiService,
  @Inject(MAT_DIALOG_DATA) public editData : any,
  private dialogRef : MatDialogRef<DialogComponent>,){}

ngOnInit():void{
  this.contractForm = this.formBuilder.group({
    contractName : ['',Validators.required],
    projectName : ['',Validators.required],
    managerName : ['',Validators.required],
    startDate : ['',Validators.required],
    endDate : ['',Validators.required],
    resources : ['',Validators.required],
    status : ['',Validators.required]
  });

    if(this.editData){
      this.actionBtn = "Update";
      this.contractForm.controls['contractName'].setValue(this.editData.contractName);
      this.contractForm.controls['projectName'].setValue(this.editData.projectName);
      this.contractForm.controls['managerName'].setValue(this.editData.managerName);
      this.contractForm.controls['startDate'].setValue(this.editData.startDate);
      this.contractForm.controls['endDate'].setValue(this.editData.endDate);
      this.contractForm.controls['resources'].setValue(this.editData.resources);
      this.contractForm.controls['status'].setValue(this.editData.status);
    }

  }
    onSubmit(){
      if(!this.editData){
      if(this.contractForm.valid){
      this.api.postContract(this.contractForm.value)
      .subscribe({
        next:(res)=>{
          alert("Contract Added Succesfully");
          this.contractForm.reset();
          this.dialogRef.close();
        },
        error:()=>{
          alert("Error While Adding Contract")
        }
      })
    }

  }else {
        this.updateContract()
      }
    
  }
  updateContract(){
    this.api.putContract(this.contractForm.value,this.editData.id)
    .subscribe({
      next : (res)=>{
        alert("Product Update Successfully");
        this.contractForm.reset();
        this.dialogRef.close('Update');
      },
      error:()=>{
        alert("Error While Updating Record");
      }
    })
  }
}