import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  dataSet :any = []
  ordering :any;
  searchFilter = null;
  isDrawerVisible = false;
  public userForm: FormGroup = new FormGroup({});
  constructor(private userService:UserService){
    this.getData()
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
      website: new FormControl('',[Validators.required])  
    })
  }
  // dataSet :any= [
  //   {
  //     key: '1',
  //     name: 'John Doe',
  //     age: 32,
  //     address: 'New York, USA'
  //   },
  //   {
  //     key: '2',
  //     name: 'Jane Smith',
  //     age: 28,
  //     address: 'London, UK'
  //   },
  //   {
  //     key: '3',
  //     name: 'Michael Johnson',
  //     age: 35,
  //     address: 'Sydney, Australia'
  //   }
  // ];
  addConsole(){
    console.log('btn clicked')
  }

  getData(){
      this.userService
        .getPost()
        .subscribe({
          next: (res) => {
            this.dataSet = res;
          },
          error: (err) => {},
        });
  }

  onSortChange(sortEvent: any, columnName:any) {
    if (sortEvent === 'ascend') {
      this.ordering =  columnName
    }
    else if (sortEvent === 'descend') {
      this.ordering = `-${columnName}`
    }
    else{
      this.ordering = null
    }
    this.getData()
  }
  searchFunction(event:any){
    if (event.target.value.length > 3){
      this.searchFilter = event.target.value 
      this.getData()
    }else{
      if (this.searchFilter){
        this.searchFilter = null
        this.getData()
      }
    }
  }

  openDrawer(): void {
    this.isDrawerVisible = true;
  }

  closeDrawer(): void {
    this.isDrawerVisible = false;
  }

  submitForm(): void {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
      this.closeDrawer(); // Close drawer after submission
    } else {
      console.log('Invalid Form');
      this.userForm.markAllAsTouched();
    }
  }
}
