import { Component, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-save-lead',
  templateUrl: './dialog-save-lead.component.html',
  styleUrls: ['./dialog-save-lead.component.scss']
})
export class DialogSaveLeadComponent {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogSaveLeadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close();
      this.router.navigate(['/management']).then(r => console.log(r));
    }, 1500);
  }

}
