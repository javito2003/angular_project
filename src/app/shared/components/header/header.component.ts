import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service:NotesService, public userData:UserDataService) { }

  ngOnInit(): void {
    this.getNotes()
  }

  getNotes() {
    this.service.getNotes().subscribe(
      (res) => {
        this.service.notes = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
