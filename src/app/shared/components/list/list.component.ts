import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { INotes } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class NoteComponent implements OnInit {
  @Input() note?:INotes
  @Output() onEdit = new EventEmitter<string>()
  @Output() onDelete = new EventEmitter<INotes>()
  constructor() { }

  ngOnInit(): void {
  }

  handleDelete(note:INotes){
    console.log(this.note);
    this.onDelete.emit(note)
  }
  handleEdit(id:string){
    this.onEdit.emit(id)
  }


}
